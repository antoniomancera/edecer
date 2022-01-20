import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mot } from './mot';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  motsCollection: AngularFirestoreCollection<Mot>;
  mots: Observable<Mot[]>;

  constructor(private firestore: AngularFirestore) {
    this.motsCollection = firestore.collection<Mot>('mots');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.mots = this.motsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Mot;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getDatabase(): Observable<any> {
    return this.firestore.collection('mots').snapshotChanges();
  }

  getMotId(id: string): Observable<Mot> {
    let a1: Mot;
    return this.firestore
      .collection('mots')
      .doc(id)
      .get()
      .pipe(
        map(
          (data) =>
            data['_delegate']['_document']['data']['value']['mapValue'][
              'fields'
            ]
        ),
        map((data) => {
          const newMot: Mot = {
            es: data['es']['stringValue'],
            fr: data['fr']['stringValue'],
          };
          return newMot;
        })
      );
  }
}
