import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MdDialog, MdDialogRef } from '@angular/material';

import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public signUp(): Observable<SignupDialogComponent> {
    let dialogRef: MdDialogRef<SignupDialogComponent>;

    dialogRef = this.dialog.open(SignupDialogComponent);

    return dialogRef.afterClosed();
  }
}
