import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {SignupDialogComponent} from './signup-dialog/signup-dialog.component';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {DialogService} from './dialog.service';

@Component({
  selector: 'rg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  puzzleInfo: FirebaseObjectObservable<any>;
  matchWords: FirebaseListObservable<any[]>;
  missWords: FirebaseListObservable<any[]>;
  localMatchWords:any[];
  localMissWords: any[];
  regexStringModel = "";
  badRegex = false;
  puzzleNumber = 0;

  dialogRef: MdDialogRef<any>;

  constructor(public af: AngularFire, public dialog: MdDialog, private dialogService: DialogService, public snackbar: MdSnackBar) {
    this.puzzleInfo = af.database.object('/puzzles/' + this.puzzleNumber);
    af.database.list('/puzzleData/' + this.puzzleNumber + '/matchWords')
      .subscribe(result => this.localMatchWords = result.map(res => {
        let word = res.$value;
        let matches = false;
        if (this.regexStringModel.length !== 0) {
          try {
            matches = new RegExp(this.regexStringModel).test(word);
          } catch (Error) {
            this.badRegex = true;
          }
        }
        return {word: word, matched: matches};
      }));
    af.database.list('/puzzleData/' + this.puzzleNumber + '/missWords')
      .subscribe(result => this.localMissWords = result.map(res => {
          let word = res.$value;
          let matches = false;
          if (this.regexStringModel.length !== 0) {
            try {
              matches = new RegExp(this.regexStringModel).test(word);
            } catch (Error) {
              this.badRegex = true;
            }
          }
          return {word: word, matched: matches};
        }));
  }

  checkWords() {
    let self = this;
    if (self.regexStringModel.length === 0) {
      self.badRegex = false;
      this.unMatchAll();
    }
    else {
      try {
        this.localMatchWords = this.localMatchWords.map((word) => {
          let matches = new RegExp(self.regexStringModel).test(word.word);
          return {word: word.word, matched: matches};
        });
        this.localMissWords = this.localMissWords.map((word) => {
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

    this.localMatchWords = this.localMatchWords.map((word) => {
      return {word: word.word, matched: false};
    });
    this.localMissWords = this.localMissWords.map((word) => {
      return {word: word.word, matched: false};
    });
  }

  openSignupDialog() {
    this.dialogService.signUp().subscribe(result => {
      console.log(result);
    });


    //this.dialogRef = this.dialog.open(SignupDialogComponent);
  }
  openLoginDialog() {
    this.dialogRef = this.dialog.open(LoginDialogComponent);
  }

  signOut() {
    this.af.auth.logout().then(() => {
      this.snackbar.open('Successfully logged out.', 'DISMISS', {
        duration: 3000
      })
  });
}
}
