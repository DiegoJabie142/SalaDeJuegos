import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CustomInputComponent } from '../../../shared/components/custom-input/custom-input.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HeaderComponent, CustomInputComponent, LogoComponent, MatButton, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  constructor(private router: Router){}

  private fb = inject(FormBuilder);

  form = this.fb.group({
    uid: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email] ),
    name: new FormControl('',[Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService)


  async submit() {
    if (this.form.valid) {
      try {
        // Intentar registrar al usuario
        const res = await this.firebaseSvc.signUp(this.form.value as User);
  
        // Actualizar la información del usuario
        await this.firebaseSvc.updateUser(this.form.value.name);
  
        let uid = res.user.uid;
  
        // Establecer el UID en el formulario
        this.form.controls.uid.setValue(uid);
  
        // Guardar la información del usuario
        this.setUserInfo(uid);
  
        // Mostrar un mensaje de éxito
        await Swal.fire({
          icon: 'success',
          title: 'Cuenta creada exitosamente',
          text: `Bienvenido, ${res.user.email}`,
        });
  
      } catch (error) {
        // Mostrar un mensaje de error si algo falla
        await Swal.fire({
          icon: 'error',
          title: 'Error al crear la cuenta',
          text: error.message || 'Hubo un problema al intentar crear la cuenta. Por favor, intenta nuevamente más tarde.',
        });
      } finally {
        // Cualquier cosa que quieras ejecutar al final (como limpiar el formulario o redirigir)
        console.log('Proceso finalizado');
      }
    } else {
      // Si el formulario no es válido, mostrar un mensaje
      await Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, revisa los campos e intenta nuevamente.',
      });
    }
  }

  async setUserInfo(uid: string){
    if(this.form.valid){

      let path =  `users/${uid}`;
      delete this.form.value.password;

      await this.firebaseSvc.setDocument(path, this.form.value).then(async res =>{

        this.utilSvc.saveInLocalStorage('user', this.form.value);
        this.form.reset();

      }).catch(error =>{
        console.log(error);
      }).finally(()=>{
        
      })
    }
  }
}
