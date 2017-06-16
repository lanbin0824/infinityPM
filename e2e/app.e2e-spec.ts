import { InfinityPMPage } from './app.po';

describe('infinity-pm App', () => {
  let page: InfinityPMPage;

  beforeEach(() => {
    page = new InfinityPMPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
