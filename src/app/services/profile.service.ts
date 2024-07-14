import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  api = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.api);
  }

  cadastrar(profile: Profile): Observable<Profile>{
    return this.http.post<Profile>(this.api, profile);
  }

  atualizar(updateProfile: Profile): Observable<Profile>{
    const url = `${this.api}/${updateProfile.id}`;
    return this.http.put<Profile>(url, updateProfile);
  }

  apagarProfile(id: string): Observable<void> {
    const url = `${this.api}/${id}`;
    return this.http.delete<void>(url);
  }
  
  buscarPoId(id: string): Observable<Profile> {
    const url = `${this.api}/${id}`;
    return this.http.get<Profile>(url);
  }
}
