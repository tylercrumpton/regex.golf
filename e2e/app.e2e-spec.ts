import { RegexgolfPage } from './app.po';

describe('regexgolf App', () => {
  let page: RegexgolfPage;

  beforeEach(() => {
    page = new RegexgolfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rg works!');
  });
});
