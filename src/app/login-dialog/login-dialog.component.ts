import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'rg-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>, public snackbar: MdSnackBar, private af: AngularFire) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
          this.snackbar.open('Successfully signed in!', 'DISMISS', {
            duration: 3000
          });
          this.dialogRef.close("success");
        }).catch(
        (err) => {
          if (err['code'] === "auth/invalid-email") {
            this.snackbar.open('Invalid email address.', 'DISMISS', {
              duration: 3000
            })
          }
          else if (err['code'] === 'auth/user-not-found') {
            this.snackbar.open('User with that email does not exist.', 'DISMISS', {
              duration: 3000
            })
          }
          else if (err['code'] === "auth/wrong-password") {
            this.snackbar.open('Incorrect password.', 'DISMISS', {
              duration: 3000
            })
          }
          else {
            console.log(err);
            this.snackbar.open('Unknown error occurred.', 'DISMISS', {
              duration: 3000
            })
          }
        });
    }
  }

}
