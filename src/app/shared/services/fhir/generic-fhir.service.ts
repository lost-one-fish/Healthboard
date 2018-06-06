import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { Observable } from 'rxjs/Observable';
import { Bundle } from './fhir.model';
import { Configuration } from '../../../app-config';

export class GenericFhirService<T> {
  URL: string;
  private COUNT = 50;

  resourceType = '';
  options;

  constructor(resourceType: string, private http: HttpClient) {
    this.URL = Configuration.fhirServer;
    this.resourceType = resourceType;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.options = {headers: headers};
  }

  findAll(page = -1, limit = -1): Observable<any[]> {
    return this.search('', page, limit);
  }

  count(): Observable<number> {
    return this.executeHttpGet(`${this.URL}/${this.resourceType}`)
      .flatMap(result => {
        const total: number = result.total;
        return Observable.of(total);
      });
  }

  findOne(id: string): Observable<T> {
    return this.http.get(`${this.URL}/${this.resourceType}/${id}`, this.options)
      .catch(this.handleError);
  }

  sort(param: string, dir: string, page?: number, limit?: number) {
    return this.search(`_sort:${dir}=${param}`, page, limit);
  }

  save(resource: T, callback: (data) => void) {
    let observable;
    if (resource['id'] == null) {
      observable = this.http.post(`${this.URL}/${this.resourceType}/`, resource, this.options)
        .catch(this.handleError);
    } else {
      observable = this.http.put(`${this.URL}/${this.resourceType}/${resource['id']}`, resource, this.options)
        .catch(this.handleError);
    }

    observable.subscribe(res => {
      const message = res.issue[0].diagnostics;
      if (message.includes(this.resourceType)) {
        const ids = message.substring(message.indexOf(this.resourceType)).split('/');
        if (ids.length > 2 && ids[0] === this.resourceType) {
          callback(ids[1]);
        }
      }
    });
  }

  delete(resource: T): Observable<any> {
    return this.http.delete(`${this.URL}/${this.resourceType}/${resource['id']}`, this.options);
  }

  protected search(params?: string, page = -1, limit = -1): Observable<any[]> {
    if (limit < 0) {
      limit = this.COUNT;
    }
    if (!params) {
      params = '';
    }

    return this.executeHttpGet(`${this.URL}/${this.resourceType}?${params}&_count=${limit}`)
      .flatMap(bundle => {
        const total = bundle.total;
        const next = this.extractNext(bundle);
        const getpages = this.getQueryString('_getpages', next);

        if (!getpages) {
          const bundles = [];
          bundles.push(Observable.of(bundle));
          return Observable.forkJoin(bundles);
        }

        const bundles = [];
        if (page < 0) {
          bundles.push(Observable.of(bundle));
          const batch: number = (total / this.COUNT);
          for (let i = 1; i < batch; i++) {
            const url = `${this.URL}/?_getpages=${getpages}&_getpagesoffset=${i * limit}&_count=${limit}`;
            bundles.push(this.executeHttpGet(url));
          }
        } else {
          const url = `${this.URL}/?_getpages=${getpages}&_getpagesoffset=${page * limit}&_count=${limit}`;
          bundles.push(this.executeHttpGet(url));
        }
        return Observable.forkJoin(bundles);
      });
  }

  private extractNext(body: Bundle) {
    for (const link of body.link) {
      if (link.relation === 'next') {
        return link.url;
      }
    }
    return null;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  executeHttpGet(url) {
    return this.http.get(url, this.options)
      .catch(this.handleError);
  }

  private getQueryString(field: string, url: string) {
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(url);
    return string ? string[1] : null;
  }
}