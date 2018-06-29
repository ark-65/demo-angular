import { PageloadingModule } from './pageloading.module';

describe('PageloadingModule', () => {
  let pageloadingModule: PageloadingModule;

  beforeEach(() => {
    pageloadingModule = new PageloadingModule();
  });

  it('should create an instance', () => {
    expect(pageloadingModule).toBeTruthy();
  });
});
