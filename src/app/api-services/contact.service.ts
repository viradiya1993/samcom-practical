import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
   
  //Get All contact
  getAllContacts(search: any, page: any, limit: any): Observable<any> {
    let params = new HttpParams()
      .set('search', search ? search : '')
      .set('page', page)
      .set('per_page', limit)
    return this.http.get(BACKEND_URL + '/users', { params });
  }

  //Add contact
  addContacts(data: any): Observable<any> {
    return this.http.post(BACKEND_URL + '/users', data);
  }
}
