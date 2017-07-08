import { EscaPage } from './app.po';

describe('esca App', () => {
  let page: EscaPage;

  beforeEach(() => {
    page = new EscaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
