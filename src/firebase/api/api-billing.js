import { Firestore } from '../index';
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

export function addInvoice(invoice) {
  const clientRef = addClient(invoice.client);

  invoice.client.ref = clientRef;
  invoice.date = Date.now();

  return tableInvoiceRef.add(invoice);
}