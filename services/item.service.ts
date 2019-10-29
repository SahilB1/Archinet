import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/Item';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  itemDoc: AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;
  item: Observable<Item>;
  setSearchItem: string;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items');
   }

   getItems(): Observable<Item[]> {
     // Get items with the id
     this.items = this.itemsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Item;
          data.id = action.payload.doc.id;
          return data;
        })
      })
      return this.items;
   }

   getItem(id: string): Observable<Item> {
     this.itemDoc = this.afs.doc<Item>(`items/${id}`);
     this.item = this.itemDoc.snapshotChanges().map(action => {
       if(action.payload.exists === false) {
         return null;
       } else {
         const data = action.payload.data() as Item;
         data.id = action.payload.id;
         return data;
       }
     })
     return this.item;
   }

   getSearchTerm(item: string) {
     this.setSearchItem = item;
     return item;
   }

}
