import { Injector } from '@angular/core';
import { ResourceService } from './resource.service';
import { Observable } from 'rxjs/Observable';

export class RestService {

  private readonly resource: string;
  private readonly resourceService: ResourceService;

  constructor(resource: string, injector: Injector) {
    this.resource = resource;
    this.resourceService = injector.get(ResourceService);
  }

  conformance(input: any) {
    return this.resourceService.conformance(input);
  }

  create(entity: FHIR.SMART.Entry) {
    return this.resourceService.create(entity);
  }

  delete(entity: FHIR.SMART.Entry) {
    return this.resourceService.delete(entity);
  }

  document(entity: FHIR.SMART.Entry) {
    return this.resourceService.document(entity);
  }

  drain(resource: string, query?: any, patientId?: string, params?: FHIR.SMART.SearchParams) {
    return this.resourceService.drain(resource, query, patientId, params);
  }

  fetchAll(resource: string, query?: any, patientId?: string, params?: FHIR.SMART.SearchParams)
    : Observable<FHIR.SMART.Entry[]> {
    return this.resourceService.fetchAll(resource, query, patientId, params);
  }

  fetchAllWithReferences(resource: string, params: FHIR.SMART.SearchParams, resolveParams: string[]) {
    return this.resourceService.fetchAllWithReferences(resource, params, resolveParams);
  }

  history(resource: string, id: string, params?: FHIR.SMART.HistoryParams) {
    return this.resourceService.history(resource, id, params);
  }

  nextPage(bundle: FHIR.SMART.Bundle) {
    return this.resourceService.nextPage(bundle);
  }

  prevPage(bundle: FHIR.SMART.Bundle) {
    return this.resourceService.prevPage(bundle);
  }

  profile(resource: string) {
    return this.resourceService.profile(resource);
  }

  read(resource: string, id: string) {
    return this.resourceService.read(resource, id);
  }

  resolve(params: FHIR.SMART.ResolveParams) {
    return this.resourceService.resolve(params);
  }

  resourceHistory(resource: string, id: string, params?: FHIR.SMART.HistoryParams) {
    return this.resourceService.resourceHistory(resource, id, params);
  }

  search(resource: string, query?: any, patientId?: string, params?: FHIR.SMART.SearchParams) {
    return this.resourceService.search(resource, query, patientId, params);
  }

  transaction(bundle: FHIR.SMART.Bundle) {
    return this.resourceService.transaction(bundle);
  }

  typeHistory(resource: string, id: string, params?: FHIR.SMART.HistoryParams) {
    return this.resourceService.typeHistory(resource, id, params);
  }

  update(entity: FHIR.SMART.Entry) {
    return this.resourceService.update(entity);
  }

  validate(entity: FHIR.SMART.Entry) {
    return this.resourceService.validate(entity);
  }

  vread(resource: string, id: string, versionId: string) {
    return this.resourceService.vread(resource, id, versionId);
  }
}
