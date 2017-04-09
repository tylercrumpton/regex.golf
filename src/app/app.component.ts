import { Component } from '@angular/core';

@Component({
  selector: 'rg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  matchWords = [
    {word: 'dir', matched: false},
    {word: 'chkdsk', matched: false},
    {word: 'diskpart', matched: false},
    {word: 'run', matched: false},
    {word: 'md', matched: false},
    {word: 'ipconfig', matched: false},
    {word: 'mountvol', matched: false},
    {word: 'nslookup', matched: false},
    {word: 'perfmon', matched: false},
    {word: 'robocopy', matched: false},
    {word: 'taskkill', matched: false},
  ];
  missWords = [
    {word: 'sudo', matched: false},
    {word: 'apt-get', matched: false},
    {word: 'ifconfig', matched: false},
    {word: 'startx', matched: false},
    {word: 'killall', matched: false},
    {word: 'man', matched: false},
    {word: 'tar xzf', matched: false},
    {word: 'cat', matched: false},
    {word: 'tail', matched: false},
    {word: 'whoami', matched: false},
    {word: 'finger', matched: false},
  ];
  regexStringModel = "";
  badRegex = false;

  checkWords() {
    let self = this;
    if (self.regexStringModel.length === 0) {
      self.badRegex = false;
      this.unMatchAll();
    }
    else {
      try {
        this.matchWords = this.matchWords.map((word) => {
          let matches = new RegExp(self.regexStringModel).test(word.word);
          return {word: word.word, matched: matches};
        });
        this.missWords = this.missWords.map((word) => {
          let matches = new RegExp(self.regexStringModel).test(word.word);
          return {word: word.word, matched: matches};
        });
        self.badRegex = false;
      } catch (Error) {
        self.badRegex = true;
        this.unMatchAll();
      }
    }
  }

  unMatchAll() {
    this.matchWords = this.matchWords.map((word) => {
      return {word: word.word, matched: false};
    });
    this.missWords = this.missWords.map((word) => {
      return {word: word.word, matched: false};
    });
  }
}
