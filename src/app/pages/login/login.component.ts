import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from './_services/index';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {

  title = 'Coimco Stats';
  model: any = {};
  loading = false;
  returnUrl: string;

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  submitted: boolean = false;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService ,
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }
  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        )
  }

  onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.login();
    }
  }
}
