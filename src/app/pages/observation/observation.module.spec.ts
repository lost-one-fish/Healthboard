import { ObservationModule } from './observation.module';

describe('ObservationModule', () => {
  let observationModule: ObservationModule;

  beforeEach(() => {
    observationModule = new ObservationModule();
  });

  it('should create an instance', () => {
    expect(observationModule).toBeTruthy();
  });
});
