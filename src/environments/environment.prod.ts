/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  fhirServer: {
    serviceUrl: 'http://localhost:8034/baseDstu3',
    auth: {
      type: 'none',
    },
    patientId: '',
    userId: '',
  },
};
