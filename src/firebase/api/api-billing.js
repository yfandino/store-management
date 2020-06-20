import { Firestore, FieldValue } from '../index';
import { addClient } from './api-clients';

const REACT_APP_TABLE_INVOICE = process.env.REACT_APP_TABLE_INVOICE;
const tableInvoiceRef = Firestore.collection(REACT_APP_TABLE_INVOICE);

export function getInvoices(limit = 10) {
  return tableInvoiceRef
    .limit(limit)
    .orderBy("date", "desc")
    .get()
    .then( querySnapshot => querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() }) ))
}

export function goNextPage(limit = 10, docSnapshot) {
  return tableInvoiceRef
    .startAfter(docSnapshot)
    .limit(limit);
}

export function goPreviousPage (limit = 10, docSnapshot) {
  return tableInvoiceRef
    .endBefore(docSnapshot)
    .limitToLast(limit);
}

export function getLastInvoice() {
  return tableInvoiceRef
    .limitToLast(1)
    .orderBy('desc')
    .then( querySnapshot => querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() })));
}

export function getInvoiceByQuery({ table, query }) {
  return Firestore.collection(table)
    .where(query.field, query.operator, query.value)
    .get()
    .then( querySnapshot => querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() })));
}

/**
 * Add a new invoice. Returns Promise<void>
 * @param {Object} invoice 
 */
export async function addInvoice(invoice) {
  const clientRef = addClient(invoice.client);
  const statsRef = tableInvoiceRef.doc('--stats--');
  const invoiceRef = tableInvoiceRef.doc();

  const stats = await statsRef.get();
  const invoiceCount = stats.exists ? stats.data().invoiceCount : 0;
  
  const increment = FieldValue.increment(1);
  const batch = Firestore.batch();

  invoice.client.ref = clientRef;
  invoice.date = Date.now();
  invoice.invoiceNumber = `FI${new Date().getFullYear()}-${invoiceCount + 1}`;

  batch.set(statsRef, { invoiceCount: increment }, { merge: true });
  batch.set(invoiceRef, invoice);

  return batch.commit();;
}