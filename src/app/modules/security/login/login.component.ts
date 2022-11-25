import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/security/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  year: Date = new Date();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required, Validators.maxLength(50)]
      ],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  login() {
    if (!this.loginForm.invalid) {
      let user = this.loginForm.value;
      this.loginService.login(user).subscribe((response) => {
        this.router.navigateByUrl("/menu");
      });
    }
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }
}
