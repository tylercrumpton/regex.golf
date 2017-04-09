import { Component } from '@angular/core';

@Component({
  selector: 'rg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rg works!';
  matchWords = [
    {word: 'dir', matched: true},
    {word: 'chkdsk', matched: true},
    {word: 'diskpart', matched: true},
    {word: 'run', matched: true},
    {word: 'md', matched: true},
    {word: 'ipconfig', matched: true},
    {word: 'mountvol', matched: true},
    {word: 'nslookup', matched: true},
    {word: 'perfmon', matched: true},
    {word: 'robocopy', matched: true},
    {word: 'taskkill', matched: true},
  ];
  missWords = [
    {word: 'sudo', matched: true},
    {word: 'apt-get', matched: true},
    {word: 'ifconfig', matched: true},
    {word: 'startx', matched: true},
    {word: 'killall', matched: true},
    {word: 'man', matched: true},
    {word: 'tar xzf', matched: true},
    {word: 'cat', matched: true},
    {word: 'tail', matched: true},
    {word: 'whoami', matched: true},
    {word: 'finger', matched: true},
  ];
  regexStringModel = "";

  checkWords() {
    let self = this;
    this.matchWords = this.matchWords.map((word) => {
      let matches = new RegExp(self.regexStringModel).test(word.word);
      return {word: word.word, matched: matches};
    });
    this.missWords = this.missWords.map((word) => {
      let matches = new RegExp(self.regexStringModel).test(word.word);
      return {word: word.word, matched: matches};
    });

  }
}
