import { Firestore } from '../index';

const REACT_APP_TABLE_CLIENT = process.env.REACT_APP_TABLE_CLIENT;

export function addClient(data) {
  const clientRef = Firestore.collection(REACT_APP_TABLE_CLIENT).doc(data.id);
  clientRef.set(data);
  return clientRef;
}