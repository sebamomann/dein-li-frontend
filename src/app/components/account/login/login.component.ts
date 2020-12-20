import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {MatSnackBar, MatStepper} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {ValidatorService} from '../../../_helper/validatorService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hidePassword = true;
  public eventUsername = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  public eventPassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });
  public returnUrl = '';
  public sendingRequestEmit = new EventEmitter<boolean>();

  @ViewChild('stepper', {static: true}) private stepper: MatStepper;
  @ViewChild('nameInput', {static: true}) private nameInputRef: ElementRef;
  @ViewChild('passwordInput', {static: true}) private passwordInputRef: ElementRef;

  private changeDate: Date;

  constructor(private router: Router, private route: ActivatedRoute, private validatorService: ValidatorService,
              private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.getUsername().setValue(this.validatorService.emailIsValid(params.mail) ? params.mail : '');
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.nameInputRef.nativeElement.focus();
  }

  async login(): Promise<void> {
    if (this.eventPassword.valid) {

      const username = this.getUsername().value;
      const password = this.getPassword().value;

      const retUrl = decodeURIComponent(this.returnUrl);

      this.sendingRequestEmit.emit(true);
      this.authenticationService
        .login(username, password)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigateByUrl(retUrl)
              .then(() => {
                this.sendingRequestEmit.emit(false);

                this.snackBar.open('Erfolgreich eingeloggt',
                  'OK',
                  {
                    panelClass: 'login-snackbar',
                    duration: 3500,
                  });
              });
          },
          error => {
            this.sendingRequestEmit.emit(false);

            if (error.error.code === 'INVALID_PASSWORD') {
              this.changeDate = new Date(error.error.data);
              this.getPassword().setErrors({isOldPassword: true});
            } else if (error.error.code === 'ACCOUNT_LOCK') {
              //
            } else {
              this.getPassword().setErrors({invalid: true});
            }
          });
    }
  }

  getUsernameErrorMessage(): string {
    if (this.getUsername().hasError('required')) {
      return 'Bitte gebe deine E-Mail/Benutzername ein';
    }
  }

  getPasswordErrorMessage(): string {
    if (this.getPassword().hasError('required')) {
      return 'Bitte gebe dein Passwort ein';
    }

    if (this.getPassword().hasError('invalid')) {
      return 'Benutzername oder Passwort falsch';
    }
  }

  public getUsername() {
    return this.eventUsername.get('username');
  }

  public getPassword() {
    return this.eventPassword.get('password');
  }

  public validateUsername() {
    if (this.eventUsername.valid) {
      this.stepper.next();
      setTimeout(() => {
        this.passwordInputRef.nativeElement.focus();
      }, 500);
    }
  }
}
