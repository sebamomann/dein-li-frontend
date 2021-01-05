import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {IUser} from '../../../../models/IUser.model';
import {ValidatorUtil} from '../../../../_util/validatorUtil.util';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})

export class UserDataComponent implements OnInit {
  @ViewChild('resendButton', {static: true})
  public resendButton: ElementRef;

  @Output() public save = new EventEmitter<any>();
  @Output() public updateParent = new EventEmitter<null>();

  @Input() public isRegister = true;
  @Input() public done = false;
  @Input() public userData$: Observable<IUser> = new Observable<IUser>();

  public userData: IUser;

  public event: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, ValidatorUtil.username()]),
    mail: new FormControl('', [Validators.email, Validators.required]),
    passwords: new FormGroup({
      password: new FormControl(''),
      passwordVerify: new FormControl(''),
    }, ValidatorUtil.password()),
  });
  public hide = true;

  public buttonText: string;
  public tooltip: string;

  public sendingRequestEmit = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    this.buttonText = this.isRegister ? 'Registrieren' : 'Speichern';
    this.tooltip = this.getToolTip();

    if (!this.isRegister) {
      this.event.get('username').disable();
    } else {
      this.setPasswordRequired();
    }

    // listen to change from parent component (@Input)
    this.userData$.subscribe(sUserData => {
      this.userData = sUserData;
      if (this.userData !== undefined) {
        this.parse();
      }
    });
  }

  public saveFnc(): any {
    if (this.event.valid) {
      const data = {
        mail: this.get('mail').value,
        password: this.getPassword().value,
        username: this.get('username').value,
      };

      if (this.isRegister) {
        this.sendingRequestEmit.emit(true);
      }
      this.save.emit(data);
    } else {
      this.getPassword('passwordVerify').setErrors({});
    }
  }

  public getErrorMessage(str: string) {
    if (str !== '') {
      if (this.get(str).hasError('required')) {
        return 'Erforderlich';
      } else if (this.get(str).hasError('inUse')) {
        return 'Bereits in Benutzung';
      } else if (this.get(str).hasError('email')) {
        return 'Diese Email-Adresse hat kein gültiges Format';
      } else if (this.get(str).hasError('invalidUsername')) {
        return 'Invalides Format (i)';
      }
    } else {
      if (this.getPasswordGroup().hasError('mismatch')) {
        return 'Die Passwörter stimmen nicht überein';
      } else if (this.getPasswordGroup().get('password').hasError('required')) {
        return 'Erforderlich';
      }
    }
  }

  public requestSent() {
    this.sendingRequestEmit.emit(false);
  }

  public updateErrors(err) {
    this.get(err.attr).setErrors({[err.error]: true});
  }

  private parse() {
    this.event.setValue({
      username: this.userData.username,
      mail: this.userData.mail,
      passwords: {password: '', passwordVerify: ''},
    });
  }

  private get(str: string) {
    return this.event.get(str);
  }

  private getPasswordGroup() {
    return this.event.get('passwords');
  }

  private getPassword(str = 'password') {
    return this.event.get('passwords').get(str);
  }

  private setPasswordRequired() {
    this.getPassword().setValidators([Validators.required]);
    this.getPassword('passwordVerify').setValidators([Validators.required]);
  }

  private getToolTip() {
    if (this.isRegister) {
      return 'Erlaubte Beispiele: '
        + '\r\n'
        + '\r\n max'
        + '\r\n max123 '
        + '\r\n max_m '
        + '\r\n max_123_muster '
        + '\r\n'
        + '\r\n Keine Großbuchstaben'
        + '\r\n Mindestens 3 Buchstaben. '
        + '\r\n Kein _ am Anfang oder Ende. '
        + '\r\n Nur ein _ in Folge.';
    } else {
      return 'Du kannst deinen Benutzernamen (noch) nicht ändern. Melde dich bei mir!';
    }
  }
}
