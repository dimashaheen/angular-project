import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Professor } from './professor';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Add prof
  AddProf(data: Professor): Observable<any> {
    let API_URL = `${this.endpoint}/addProfessor`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }
  // Get all Profs
  GetProfs() {
    return this.http.get(`${this.endpoint}`);
  }
  // Get Prof
  GetProf(id:any): Observable<any> {
    let API_URL = `${this.endpoint}/readProfessor/${id}`;
    return this.http.get<Response>(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update Prof
  Updateprof(id:any, data:any): Observable<any> {
    let API_URL = `${this.endpoint}/updateProfessor/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Delete Prof
  DeleteProf(id:any): Observable<any> {
    var API_URL = `${this.endpoint}/deleteProfessor/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}