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

  drain(query?: any, patientId?: string, params?: FHIR.SMART.SearchParams) {
    return this.resourceService.drain(this.resource, query, patientId, params);
  }

  fetchAll(query?: any, patientId?: string, params?: FHIR.SMART.SearchParams)
    : Observable<FHIR.SMART.Entry[]> {
    return this.resourceService.fetchAll(this.resource, query, patientId, params);
  }

  fetchAllWithReferences(params: FHIR.SMART.SearchParams, resolveParams: string[]) {
    return this.resourceService.fetchAllWithReferences(this.resource, params, resolveParams);
  }

  history(id: string, params?: FHIR.SMART.HistoryParams) {
    return this.resourceService.history(this.resource, id, params);
  }

  nextPage(bundle: FHIR.SMART.Bundle) {
    return this.resourceService.nextPage(bundle);
  }

  prevPage(bundle: FHIR.SMART.Bundle) {
    return this.resourceService.prevPage(bundle);
  }

  profile() {
    return this.resourceService.profile(this.resource);
  }

  read(id: string) {
    return this.resourceService.read(this.resource, id);
  }

  resolve(params: FHIR.SMART.ResolveParams) {
    return this.resourceService.resolve(params);
  }

  resourceHistory(id: string, params?: FHIR.SMART.HistoryParams) {
    return this.resourceService.resourceHistory(this.resource, id, params);
  }

  search(query?: any, patientId?: string, params?: FHIR.SMART.SearchParams) {
    return this.resourceService.search(this.resource, query, patientId, params);
  }

  transaction(bundle: FHIR.SMART.Bundle) {
    return this.resourceService.transaction(bundle);
  }

  typeHistory(id: string, params?: FHIR.SMART.HistoryParams) {
    return this.resourceService.typeHistory(this.resource, id, params);
  }

  update(entity: FHIR.SMART.Entry) {
    return this.resourceService.update(entity);
  }

  validate(entity: FHIR.SMART.Entry) {
    return this.resourceService.validate(entity);
  }

  vread(id: string, versionId: string) {
    return this.resourceService.vread(this.resource, id, versionId);
  }
}
