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
export class FirebaseService {
  motsCollection: AngularFirestoreCollection<Mot>;
  percentageCollection: AngularFirestoreCollection<number>;

  mots: Observable<Mot[]>;

  constructor(private firestore: AngularFirestore) {
    this.motsCollection = firestore.collection<Mot>('mots1');
    this.mots = this.motsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Mot;
          return data;
        })
      )
    );
  }

  getDatabase(): Observable<any> {
    return this.firestore.collection('mots1').get();
  }

  getMotId(id: string): Observable<Mot> {
    return this.firestore
      .collection('mots1')
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
            id: data['id']['stringValue'],
            es: data['es']['stringValue'],
            fr: data['fr']['stringValue'],
            percentage: data['percentage']['stringValue'],
            attemps: data['attemps']['stringValue'],
            success: data['success']['stringValue'],
            errors: data['errors']['stringValue'],
            streak: data['streak']['stringValue'],
          };
          return newMot;
        })
      );
  }

  updateMot(word: Mot, success: boolean, id: string) {
    let successUpdated: number = success ? word.success + 1 : word.success;
    let errorsUpdated: number = success ? word.errors : word.errors + 1;
    let streakUpdated: number = success ? word.streak + 1 : 0;

    const wordUpdated: Mot = {
      id: word.id,
      es: word.es,
      fr: word.fr,
      percentage: word.percentage,
      attemps: word.attemps + 1,
      success: successUpdated,
      errors: errorsUpdated,
      streak: streakUpdated,
    };

    this.firestore.collection('mots1').doc(id).update(wordUpdated);
  }
}
