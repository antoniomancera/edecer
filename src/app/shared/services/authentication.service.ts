import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

import {
  BehaviorSubject,
  catchError,
  from,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject(null);

  constructor(private router: Router) {
    console.log('environment.SUPABASE_URL', environment.SUPABASE_URL);
    console.log('environment.SUPABASE_KEY', environment.SUPABASE_KEY);
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    );

    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentUser.next(sess.user);
      } else {
        this.currentUser.next(null);
      }
    });

    this.loadUser();
  }

  loadUser(): Observable<User> {
    return from(this.supabase.auth.getUser()).pipe(
      switchMap((response) => {
        if (response.data.user) {
          this.currentUser.next(response.data.user);
          return of(response.data.user);
        }
        this.currentUser.next(null);
        return of(null);
      }),
      catchError(() => {
        this.currentUser.next(null);
        return of(null);
      })
    );
  }

  signUp(credentials: { email; password }) {
    return this.supabase.auth.signUp(credentials);
  }

  signIn(credentials: { email; password }) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  // sendPwReset(email) {
  //   return this.supabase.auth.resetPasswordForEmail(email);
  // }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable();
  }

  // getCurrentUserId(): string {
  //   if (this.currentUser.value) {
  //     return (this.currentUser.value as User).email;
  //   } else {
  //     return null;
  //   }
  // }

  // signInWithEmail(email: string) {
  //   return this.supabase.auth.signInWithOtp({ email });
  // }
}
