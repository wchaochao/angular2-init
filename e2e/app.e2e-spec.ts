import { Angular2InitPage } from './app.po';

describe('angular2-init App', () => {
  let page: Angular2InitPage;

  beforeEach(() => {
    page = new Angular2InitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
