import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [HeaderComponent, NgIf, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
  encuestaForm: FormGroup;

  juegosList = ['Ahorcado', 'Wordle', 'Adivina la bandera', 'Mayor Menor', 'Ninguno'];

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      comentario: ['', [Validators.required, Validators.minLength(1)]],
      recomendacion: ['', Validators.required],
      juegos: this.fb.array([], Validators.required)  // Aquí iniciamos vacío el FormArray
    });
  }
  
  onCheckboxChange(event: Event, juego: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    
    if (checked) {
      // Si está seleccionado, añadimos el juego al FormArray
      this.juegos.push(this.fb.control(juego));
    } else {
      // Si no está seleccionado, eliminamos el juego del FormArray
      const index = this.juegos.controls.findIndex(x => x.value === juego);
      if (index !== -1) {
        this.juegos.removeAt(index);
      }
    }
  }

  // Getter para acceder al FormArray
  get juegos() {
    return (this.encuestaForm.get('juegos') as FormArray);
  }

  validarCheckboxSeleccionado(control: AbstractControl): ValidationErrors | null {
    if (control.value.length === 0) {
      return { 'checkboxRequired': true };  // Devuelve un error si no se selecciona nada
    }
    return null;  // Si hay al menos una opción seleccionada, es válido
  }

  validarSoloLetras(event: Event): void {
    // Asegurarse de que el evento sea de tipo KeyboardEvent
    const keyboardEvent = event as KeyboardEvent;
  
    // Obtener el valor actual del input
    const input = event.target as HTMLInputElement;
  
    // Reemplazar cualquier carácter no válido (números o caracteres especiales) con nada
    input.value = input.value.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ\s]/g, '');
  }

  validarSoloNumeros(event: Event): void {
    // Asegurarse de que el evento sea de tipo KeyboardEvent
    const keyboardEvent = event as KeyboardEvent;
    
    // Obtener el valor actual del input
    const input = event.target as HTMLInputElement;
  
    // Reemplazar cualquier carácter que no sea un número (0-9)
    input.value = input.value.replace(/[^0-9]/g, '');
  
    // Limitar la longitud a 10 caracteres
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
  }

  // Método de envío del formulario
  submit(): void {
    if (this.encuestaForm.valid) {
      const resultado = this.encuestaForm.value;
  
      // Llamar al servicio para guardar los resultados de la encuesta
      this.firebaseService.saveEncuesta(resultado).then(() => {
        // Mostrar alerta de éxito con Swal.fire
        Swal.fire({
          icon: 'success',
          title: 'Encuesta enviada',
          text: '¡Gracias por completar la encuesta!',
        }).then(() => {
          // Limpiar el formulario después de mostrar el mensaje de éxito
          this.encuestaForm.reset();
        });
      }).catch((error) => {
        // Mostrar alerta de error en caso de que falle el envío
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar la encuesta',
          text: 'Hubo un problema al guardar los datos. Intenta de nuevo más tarde.',
        });
        console.error('Error al guardar la encuesta:', error);
      });
    } else {
      // Si el formulario no es válido, puedes agregar alguna alerta o acción adicional
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos obligatorios.',
      });
    }
  }
}
