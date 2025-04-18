import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserInfo } from 'src/app/home/models/user-info.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private readonly USER_INFO = '/userInfo';

  constructor(private http: HttpClient) {}

  getUserInfoBySupabaseId(supabaseId: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(
      `${environment.BASE_URL}${this.USER_INFO}/${supabaseId}`
    );
  }
}
