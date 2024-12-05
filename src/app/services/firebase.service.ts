import { Injectable, inject} from '@angular/core';
import { User } from '../models/user.model';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UtilsService } from './utils.service';
import { doc, getFirestore, setDoc, Timestamp } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { collection, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(){}

  auth = inject(Auth);
  utilsSvc = inject(UtilsService);

  // AUTENTIFICACION
  getAuth() {
    return this.auth;
  }


  async sigIn(user: User) {
    try {
      // Autenticación del usuario
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
  
      await Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: `Bienvenido, ${userCredential.user.email}`,
      });

      // Verificar si el usuario tiene el email específico para asignarle el rol "admin"
      if (userCredential.user.email === 'diegojabie@gmail.com') {
        const db = getFirestore();
        const userRef = doc(db, 'users', userCredential.user.uid); // Referencia al documento del usuario
        await setDoc(userRef, { 
          role: 'admin' }, { merge: true }); // Asignar el rol "admin"
        console.log('Rol de admin asignado correctamente.');
      }
  
      // Registrar el log en Firestore
      const db = getFirestore();
      const userRef = doc(db, 'userLogs', userCredential.user.uid);
      await setDoc(userRef, {
        email: user.email,
        loginDate: Timestamp.now(), // Guarda la fecha y hora de ingreso
      });

    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Verifica tus credenciales o intenta más tarde.',
        footer: `Detalles del error: ${error.message}`, // Opcional para depuración
      });
      throw error; // Propagar el error si es necesario
    }
  }
  
  getUserRole(): Observable<string | null> {
    const user = getAuth().currentUser;
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid); // Referencia al documento del usuario
      return new Observable(observer => {
        getDoc(userRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            observer.next(data?.['role'] || null); // Retorna el rol del usuario, o null si no existe
          } else {
            observer.next(null);
          }
        }).catch(error => {
          observer.error(error);
        });
      });
    }
    return of(null); // Retorna null si no hay usuario autenticado
  }

  // CREAR

  async signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }


  // === ACTUALIZAR USUARIO === //
  async updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, { displayName })
  }

  // ==== CERRAR SESIÓN

  async signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
  }


  // ========== BASE DE DATOS

  // === SETEAR UN DOCUMENTO ====
  async setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }


  //GUARDAR JUEGOS

  async saveGameAdivinaLaBandera(score: number, date: Date): Promise<void> {
    const user = this.getAuth().currentUser;
    if (!user) {
      throw new Error('No hay un usuario autenticado.');
    }

    const partidaData = {
      usuario: user.email,
      fecha: Timestamp.fromDate(date),
      puntaje: score,
    };

    const documentPath = `partidas-adivina-la-bandera/${user.uid}-${date.getTime()}`;

    try {
      await setDoc(doc(getFirestore(), documentPath), partidaData);
      console.log('Partida guardada exitosamente.');
    } catch (error) {
      console.error('Error al guardar la partida:', error);
      throw error;
    }
  }

  async saveGameAhorcado(score: number, date: Date): Promise<void> {
    const user = this.getAuth().currentUser;
    if (!user) {
      throw new Error('No hay un usuario autenticado.');
    }

    const partidaData = {
      usuario: user.email,
      fecha: Timestamp.fromDate(date),
      puntaje: score,
    };

    const documentPath = `partidas-ahorcado/${user.uid}-${date.getTime()}`;

    try {
      await setDoc(doc(getFirestore(), documentPath), partidaData);
      console.log('Partida guardada exitosamente.');
    } catch (error) {
      console.error('Error al guardar la partida:', error);
      throw error;
    }
  }

  async saveGameWordle(score: number, date: Date): Promise<void> {
    const user = this.getAuth().currentUser;
    if (!user) {
      throw new Error('No hay un usuario autenticado.');
    }

    const partidaData = {
      usuario: user.email,
      fecha: Timestamp.fromDate(date),
      puntaje: score,
    };

    const documentPath = `partidas-wordle/${user.uid}-${date.getTime()}`;

    try {
      await setDoc(doc(getFirestore(), documentPath), partidaData);
      console.log('Partida guardada exitosamente.');
    } catch (error) {
      console.error('Error al guardar la partida:', error);
      throw error;
    }
  }

  async saveGameMayorMenor(score: number, date: Date): Promise<void> {
    const user = this.getAuth().currentUser;
    if (!user) {
      throw new Error('No hay un usuario autenticado.');
    }

    const partidaData = {
      usuario: user.email,
      fecha: Timestamp.fromDate(date),
      puntaje: score,
    };

    const documentPath = `partidas-mayor-menor/${user.uid}-${date.getTime()}`;

    try {
      await setDoc(doc(getFirestore(), documentPath), partidaData);
      console.log('Partida guardada exitosamente.');
    } catch (error) {
      console.error('Error al guardar la partida:', error);
      throw error;
    }
  }

  async obtenerPartidasPorJuego(coleccion: string) {
    const db = getFirestore();
    const partidasRef = collection(db, coleccion);
    const q = query(partidasRef, orderBy('puntaje', 'desc')); // Ordenar por puntaje descendente

    let partidas: any[] = [];

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        partidas.push({
          ...doc.data(),
          juego: coleccion.split('-')[1], // Extraer el nombre del juego de la colección
          fecha: doc.data()['fecha'].toDate() // Asegurarse de convertir a tipo Date
        });
      });
    } catch (error) {
      console.error('Error al obtener partidas:', error);
      throw error;
    }

    return partidas;
  }


    // === GUARDAR RESULTADOS DE LA ENCUESTA === //
    async saveEncuesta(resultado: any): Promise<void> {
      const user = this.getAuth().currentUser;
      if (!user) {
        throw new Error('No hay un usuario autenticado.');
      }
  
      // Preparar los datos para guardar
      const encuestaData = {
        usuario: user.email,
        fecha: Timestamp.now(),
        resultado: resultado
      };
  
      // Crear un ID único para la encuesta
      const documentPath = `encuestas/${user.uid}-${new Date().getTime()}`;
  
      try {
        await setDoc(doc(getFirestore(), documentPath), encuestaData);
        console.log('Encuesta guardada exitosamente.');
      } catch (error) {
        console.error('Error al guardar la encuesta:', error);
        throw error;
      }
    }

    async getEncuestas(): Promise<any[]> {
      const db = getFirestore();
      const encuestasRef = collection(db, 'encuestas');
      const q = query(encuestasRef, orderBy('fecha', 'desc')); // Ordenar por fecha descendente
  
      let encuestas: any[] = [];
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          encuestas.push({
            id: doc.id, // Agregar el ID del documento para referencia
            ...doc.data(),
            fecha: doc.data()['fecha'].toDate() // Convertir la fecha a un formato legible
          });
        });
      } catch (error) {
        console.error('Error al obtener encuestas:', error);
        throw error;
      }
  
      return encuestas;
    }
}
