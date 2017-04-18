import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'rg-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<SignupDialogComponent>,  public snackbar: MdSnackBar, private af: AngularFire) {

  }

  onSubmit(formData) {
    if (formData.valid) {
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
          this.snackbar.open("Sign up was successful!", 'DISMISS', {
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
          else if (err['code'] === 'auth/weak-password') {
            this.snackbar.open('Password should be at least 6 characters.', 'DISMISS', {
              duration: 3000
            })
          }
          else if (err['code'] === 'auth/email-already-in-use') {
            this.snackbar.open('Account with that email already exists.', 'DISMISS', {
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

  ngOnInit() {
  }

}
