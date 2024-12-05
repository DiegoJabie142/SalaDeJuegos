import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordleService {
  private wordsUrl = 'assets/spanish_words.txt'; // Ruta al archivo de texto

  constructor(private http: HttpClient) {}

  // Función para eliminar tildes de las palabras
  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  getWords(): Observable<string[]> {
    return this.http.get(this.wordsUrl, { responseType: 'text' }).pipe(
      map((response: string) => {
        // Separar las palabras por salto de línea, eliminar tildes, convertir a minúsculas y filtrar las de 5 letras
        return response.split('\n')
          .map(word => word.trim())
          .filter(word => word.length === 5)
          .map(word => this.removeAccents(word.toLowerCase())); // Eliminar tildes y convertir a minúsculas
      })
    );
  }
}
