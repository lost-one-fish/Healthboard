
export class SmartContextConfig implements FHIR.SMART.Context {

  auth: FHIR.SMART.AuthContext;
  patientId: string;
  serviceUrl: string;
  userId: string;
}
