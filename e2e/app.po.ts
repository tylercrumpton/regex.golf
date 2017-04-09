import { browser, element, by } from 'protractor';

export class RegexgolfPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rg-root h1')).getText();
  }
}
