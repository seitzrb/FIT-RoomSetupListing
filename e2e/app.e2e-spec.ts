import { LCQuickstartPage } from './app.po';

describe('lcquickstart App', () => {
  let page: LCQuickstartPage;

  beforeEach(() => {
    page = new LCQuickstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
