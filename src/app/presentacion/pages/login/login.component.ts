import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginUseCase } from '../../../dominio/caso-uso/auth/LoginUseCase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  cargando = false;
  errorMensaje = '';

  constructor(
    private fb: FormBuilder,
    private loginUseCase: LoginUseCase,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.cargando = true;
    this.errorMensaje = '';
    const credentials = this.loginForm.value;
    this.loginUseCase.execute({ credentials: credentials }).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.cargando = false;
        this.errorMensaje = 'LOGIN.ERROR_INVALID';
      }
    });
  }
}