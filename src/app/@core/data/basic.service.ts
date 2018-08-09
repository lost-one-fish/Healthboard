import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class BasicService<T> {
  private COUNT = 50;
  URL: string;

  resourceType = '';
  options;

  constructor(resourceType: string, private http: HttpClient) {
    this.URL = environment['apiServer'];
    this.resourceType = resourceType;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.options = {headers: headers};
  }

  count(): Observable<number> {
    return this.executeHttpGet(`${this.URL}/${this.resourceType}`).pipe(
      mergeMap(result => {
        const total: number = result.total;
        return observableOf(total);
      }));
  }

  findOne(id: string): Observable<T> {
    return this.http.get(`${this.URL}/${this.resourceType}/${id}`, this.options).pipe(
      catchError(this.handleError));
  }


  save(resource: T): Observable<any> {
    let observable;
    if (resource['id'] == null) {
      observable = this.http.post(`${this.URL}/${this.resourceType}/`, resource, this.options).pipe(
        catchError(this.handleError));
    } else {
      observable = this.http.put(`${this.URL}/${this.resourceType}/${resource['id']}/`, resource, this.options).pipe(
        catchError(this.handleError));
    }

    return observable;
  }

  protected executeHttpGet(url) {
    return this.http.get(url, this.options).pipe(
      catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
