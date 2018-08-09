import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/internal/observable/from';
import { SmartContextHandler } from './smart-context-handler';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  private client: FHIR.SMART.Client;

  constructor(@Inject('SmartContextHandler') smartContextHandler: SmartContextHandler) {
    this.client = FHIR.client(smartContextHandler.getContext());
  }

  conformance(input: any) {
    return from(this.client.api.conformance(input));
  }

  create(entity: FHIR.SMART.Entry) {
    return from(this.client.api.create(entity));
  }

  delete(entity: FHIR.SMART.Entry) {
    return from(this.client.api.delete(entity));
  }

  document(entity: FHIR.SMART.Entry) {
    return from(this.client.api.document(entity));
  }

  drain(resource: string, query?: any, patientId?: string, params?: FHIR.SMART.SearchParams) {
    const obj = Object.assign({
      'type': resource,
      'query': query,
      'patient': patientId,
    }, params);
    this.client.api.drain(obj, (entries) => {
    }, () => {
    }, (error) => {
    });
  }

  fetchAll(resource: string, query?: any, patientId?: string, params?: FHIR.SMART.SearchParams)
    : Observable<FHIR.SMART.Entry[]> {
    const obj = Object.assign({
      'type': resource,
      'query': query,
      'patient': patientId,
    }, params);
    return from(this.client.api.fetchAll(obj));
  }

  fetchAllWithReferences(resource: string, params: FHIR.SMART.SearchParams, resolveParams: string[]) {
    return from(this.client.api.fetchAllWithReferences(params, resolveParams));
  }

  history(resource: string, id: string, params?: FHIR.SMART.HistoryParams) {
    const obj = Object.assign({
      'type': resource,
      'id': id,
    }, params);
    return from(this.client.api.history(obj));
  }

  nextPage(bundle: FHIR.SMART.Bundle) {
    return from(this.client.api.nextPage(bundle));
  }

  prevPage(bundle: FHIR.SMART.Bundle) {
    return from(this.client.api.prevPage(bundle));
  }

  profile(resource: string) {
    return from(this.client.api.profile({
      'type': resource,
    }));
  }

  read(resource: string, id: string) {
    return from(this.client.api.read({
      'type': resource,
      'id': id,
    }));
  }

  resolve(params: FHIR.SMART.ResolveParams) {
    return from(this.client.api.resolve(params));
  }

  resourceHistory(resource: string, id: string, params?: FHIR.SMART.HistoryParams) {
    const obj = Object.assign({
      'type': resource,
      'id': id,
    }, params);
    return from(this.client.api.resourceHistory(obj));
  }

  search(resource: string, query?: any, patientId?: string, params?: FHIR.SMART.SearchParams) {
    const obj = Object.assign({
      'type': resource,
      'query': query,
      'patient': patientId,
    }, params);
    return from(this.client.api.search(obj));
  }

  transaction(bundle: FHIR.SMART.Bundle) {
    return from(this.client.api.transaction(bundle));
  }

  typeHistory(resource: string, id: string, params?: FHIR.SMART.HistoryParams) {
    const obj = Object.assign({
      'type': resource,
      'id': id,
    }, params);
    return from(this.client.api.typeHistory(obj));
  }

  update(entity: FHIR.SMART.Entry) {
    return from(this.client.api.update(entity));
  }

  validate(entity: FHIR.SMART.Entry) {
    return from(this.client.api.validate(entity));
  }

  vread(resource: string, id: string, versionId: string) {
    return from(this.client.api.vread({
      'type': resource,
      'id': id,
      'versionId': versionId,
    }));
  }
}
