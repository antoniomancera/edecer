import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
  User,
} from '@supabase/supabase-js';

import {
  BehaviorSubject,
  catchError,
  from,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject(null);
  private options: SupabaseClientOptions<'public'> = {
    auth: { persistSession: localStorage.getItem('hasRememberMe') === 'true' },
  };
  private currentAccessToken = new BehaviorSubject<string>(null);

  constructor(
    private router: Router,
    private messagingService: MessagingService
  ) {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
      this.options
    );

    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.currentAccessToken.next(sess.access_token);
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

  sendPasswordReset(email) {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | boolean> {
    return this.currentUser.asObservable();
  }

  async setResetPassword(newPassword: string) {
    await this.supabase.auth.updateUser({ password: newPassword });
  }

  signInGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  getCurrentAccessToken() {
    return this.currentAccessToken.asObservable();
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
