///<reference path="./index.d.ts"/>

export class Element implements fhir.Element {
  id: string;
  extension: fhir.Extension[];
}

export class  BackboneElement extends Element implements fhir.BackboneElement {
  modifierExtension: fhir.Extension[];
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

  constructor(reference?: string, display?: string) {
    super();
    this.reference = reference;
    this.display = display;
  }
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
  implicitRules: fhir.uri;
  language: fhir.code;
  meta;
}

export class DomainResource extends ResourceBase implements fhir.DomainResource {
  text: fhir.Narrative;
  contained: fhir.Resource[];
  extension: fhir.Extension[];
  modifierExtension: fhir.Extension[];
}

export class Organization extends DomainResource implements fhir.Organization {
  identifier: fhir.Identifier[];
  active: boolean;
  type: fhir.CodeableConcept[];
  name: string;
  alias: string[];
  telecom: fhir.ContactPoint[];
  address: fhir.Address[];
  partOf: fhir.Reference;
  contact: fhir.OrganizationContact[];
  endpoint: fhir.Reference[];

  constructor() {
    super();
    this.resourceType = 'Organization';
  }
}

export class Patient extends DomainResource implements fhir.Patient {
  name: HumanName[];
  identifier: Identifier[];
  gender: fhir.code;
  birthDate: fhir.date;
  managingOrganization: Reference;

  constructor() {
    super();
    this.resourceType = 'Patient';
    this.name = [];
    this.name.push(new HumanName());
    this.name[0].given = [''];
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

export class DeviceUdi extends BackboneElement implements fhir.DeviceUdi {
  deviceIdentifier;
  name;

  constructor() {
    super();
  }
}

export class Coding extends Element implements fhir.Coding {
  system: fhir.uri;
  version: string;
  code: fhir.code;
  display: string;
  userSelected: boolean;
}

export class CodeableConcept extends Element implements fhir.CodeableConcept {
  coding: Coding[];
  text: string;

  constructor() {
    super();
    this.coding = [];
  }
}

export class Device extends ResourceBase implements fhir.Device {
  udi;
  manufacturer;
  model;
  type: fhir.CodeableConcept;

  constructor() {
    super();
    this.resourceType = 'Device';
    this.udi = new DeviceUdi();
    this.type = new CodeableConcept();
  }
}

export class Annotation extends Element implements fhir.Annotation {
  authorReference: fhir.Reference;
  authorString: string;
  time: fhir.dateTime;
  text: string;

  constructor() {
    super();
  }
}

export class Media extends ResourceBase implements fhir.Media {
  type: fhir.code;
  content: fhir.Attachment;
  note: Annotation[];

  constructor() {
    super();
    this.resourceType = 'Media';

    this.note = [];
    this.note[0] = new Annotation();
    this.note[1] = new Annotation();
  }
}

export class Person extends ResourceBase implements fhir.Person {
  telecom: fhir.ContactPoint[];
  gender: fhir.code;
  birthDate: fhir.date;
  address: fhir.Address[];
  photo: fhir.Attachment;
  managingOrganization: fhir.Reference;
  active: boolean;
  link: fhir.PersonLink[];
  identifier: fhir.Identifier[];
  name: fhir.HumanName[];

  constructor() {
    super();
    this.resourceType = 'Person';
    this.name = [];
    this.name.push(new HumanName());
    this.name[0].given = [''];
    this.name[0].family = '';

    this.identifier = [];
    this.identifier.push(new Identifier());

    this.managingOrganization = new Reference();
  }
}
