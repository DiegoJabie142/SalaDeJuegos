import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CustomInputComponent } from '../../shared/components/custom-input/custom-input.component'
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ HeaderComponent, CustomInputComponent, LogoComponent, MatButton, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent {

  constructor(private router: Router){}

  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  })

  
  firebaseSvc = inject(FirebaseService);

  ngOnInit(){
  }
   
  redirectToSignUp(event: Event){
    event?.preventDefault();
    this.router.navigateByUrl('/auth/sign-up');
  }

  async submit() {
    try {
      const res = await this.firebaseSvc.sigIn(this.form.value as User);
      console.log('Sesión iniciada correctamente:', res);
      // Redirigir al usuario después de iniciar sesión
      this.router.navigateByUrl('/main/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  autoComplete(role: string): void {
    event?.preventDefault();
    if (role === 'admin') {
      this.form.controls.email.setValue('diegojabie@gmail.com');
      this.form.controls.password.setValue('123456');
    } else if (role === 'user') {
      this.form.controls.email.setValue('diegos4p3@gmail.com');
      this.form.controls.password.setValue('123456');
    }
  }

}
