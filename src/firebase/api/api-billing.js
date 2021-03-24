import { Firestore, FieldValue } from '../index';
import { addClient } from './api-clients';

const REACT_APP_TABLE_INVOICE = process.env.REACT_APP_TABLE_INVOICE;
const tableInvoiceRef = Firestore.collection(REACT_APP_TABLE_INVOICE);

/**
 * Get invoices with pagination. Default limit = 10. Return Promise<QuerySnapshot>
 * @param {int} limit 
 */
export function getInvoices(limit = 10) {
  return tableInvoiceRef
    .limit(limit)
    .orderBy("date", "desc")
    .get();
}

export function goNextPage(limit = 10, docSnapshots) {
  return tableInvoiceRef
    .orderBy("date", "desc")
    .startAfter(docSnapshots[docSnapshots.length - 1])
    .limit(limit);
}

export function goPreviousPage (limit = 10, docSnapshots) {
  return tableInvoiceRef
    .orderBy("date", "desc")
    .endBefore(docSnapshots[0])
    .limitToLast(limit);
}

export function getLastInvoice() {
  return tableInvoiceRef
    .limitToLast(1)
    .orderBy('desc')
    .then( querySnapshot => querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() })));
}

/**
 * Get documents by query. Return Promise<QuerySnapshot>
 * @param {Object} query
 */
export function getInvoiceByQuery(query) {
  return tableInvoiceRef
    .where(query.field, query.operator, query.value)
    .get()
}

/**
 * Add a new invoice. Returns Promise<void>
 * @param {Object} invoice 
 */
export async function addInvoice(invoice) {
  const statsRef = tableInvoiceRef.doc('--stats--');
  const invoiceRef = tableInvoiceRef.doc();

  const stats = await statsRef.get();
  const invoiceCount = stats.exists ? stats.data().invoiceCount : 0;
  
  const increment = FieldValue.increment(1);
  const batch = Firestore.batch();

  invoice.date = Date.now();
  invoice.invoiceNumber = `FI${new Date().getFullYear()}-${invoiceCount + 1}`;

  batch.set(statsRef, { invoiceCount: increment }, { merge: true });
  batch.set(invoiceRef, invoice);

  await batch.commit();

  return invoice;
}