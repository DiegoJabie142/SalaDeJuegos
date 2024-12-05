import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private db = getFirestore();
  private auth = getAuth();

  // Enviar un mensaje
  async sendMessage(message: string) {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Añadir el mensaje a la colección 'messages' en Firestore
      await addDoc(collection(this.db, 'messages'), {
        user: user.email,
        message: message,
        timestamp: Timestamp.now(), // Hora del mensaje
      });

      console.log('Mensaje enviado');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }

  // Obtener los mensajes en tiempo real
  getMessages(callback: (messages: any[]) => void) {
    const q = query(collection(this.db, 'messages'), orderBy('timestamp'));

    // Escuchar los cambios en la colección en tiempo real
    onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => doc.data());
      callback(messages); // Pasar los mensajes a la función callback
    });
  }
}
