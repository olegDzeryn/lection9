import { ActorDetailsModule } from './actor-details.module';

describe('ActorDetailsModule', () => {
  let actorDetailsModule: ActorDetailsModule;

  beforeEach(() => {
    actorDetailsModule = new ActorDetailsModule();
  });

  it('should create an instance', () => {
    expect(actorDetailsModule).toBeTruthy();
  });
});
