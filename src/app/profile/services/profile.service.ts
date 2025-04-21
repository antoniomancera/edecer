import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserRequest } from 'src/app/home/models/user-request.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly USER_REQUEST = '/userRequest';

  constructor(private http: HttpClient) {}

  addUserRequest(userRequest: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(
      environment.BASE_URL +
        this.USER_REQUEST +
        '?email=' +
        userRequest.email +
        '&message=' +
        userRequest.message +
        '&subject=' +
        userRequest.subject,
      {}
    );
  }
}
