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
  percentageCollection: AngularFirestoreCollection<number>;

  mots: Observable<Mot[]>;
  percentage: Observable<number[]>;

  constructor(private firestore: AngularFirestore) {
    this.motsCollection = firestore.collection<Mot>('mots');
    this.mots = this.motsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Mot;
          return data;
        })
      )
    );

    this.percentageCollection = firestore.collection<number>('percentage');
    this.percentage = this.percentageCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as number;
          const probability = data['probability'];
          return probability;
        })
      )
    );
  }

  getDatabase(): Observable<any> {
    return this.firestore.collection('mots').snapshotChanges();
  }

  getMotId(id: string): Observable<Mot> {
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
