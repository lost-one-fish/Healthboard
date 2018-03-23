///<reference path="./index.d.ts"/>

export class Element implements fhir.Element {

}

export class Identifier extends Element implements fhir.Identifier {
  system: string;
  value: string;
}

export class HumanName extends Element implements fhir.HumanName {
  given: string[];
  family: string;
}

export class Reference extends Element implements fhir.Reference {
  reference: string;
  display: string;
}

export class Quantity extends Element implements fhir.Quantity {
  value;
  unit;
  system;
  code;
}

export class BundleEntry extends Element implements fhir.BundleEntry {
  resource;
}

export class ResourceBase implements fhir.ResourceBase {
  id: string;
  resourceType: string;
  meta;
}

export class DomainResource extends ResourceBase implements fhir.DomainResource {

}

export class Organization extends DomainResource implements fhir.Organization {

}

export class Patient extends DomainResource implements fhir.Patient {
  name: HumanName[];
  identifier: Identifier[];
  managingOrganization: Reference;

  constructor() {
    super();
    this.resourceType = 'Patient';
    this.name = [];
    this.name.push(new HumanName());
    this.name[0].given = [];
    this.name[0].family = '';

    this.identifier = [];
    this.identifier.push(new Identifier());

    this.managingOrganization = new Reference();
  }
}

export class ListEntry extends DomainResource implements fhir.ListEntry {
  date;
  item;
  entry;
  subject;
  code;
  status;

  constructor() {
    super();
    this.resourceType = 'List';
  }
}

export class Observation extends DomainResource implements fhir.Observation {
  status;
  code;
  valueQuantity: Quantity;
  subject;
  issued;

  constructor() {
    super();
    this.resourceType = 'Observation';
    this.valueQuantity = new Quantity();
  }

}

export class Bundle extends ResourceBase implements fhir.Bundle {
  type;
  entry: BundleEntry[];
  link;
}
