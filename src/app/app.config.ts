import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// FIREBASE
import { provideAuth, getAuth} from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom(  
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: "AIzaSyBqtDoJ2QXrfl-tFx9mCzHf6Tf-cOgVOiM",
          authDomain: "sala-de-juegos-72757.firebaseapp.com",
          projectId: "sala-de-juegos-72757",
          storageBucket: "sala-de-juegos-72757.appspot.com",
          messagingSenderId: "134746343383",
          appId: "1:134746343383:web:2a359fd493dd07a03b6d92",
          measurementId: "G-8B4HZW3QWK"
        })
      )
    ),
    importProvidersFrom(provideAuth(()=>getAuth())),
    importProvidersFrom(provideFirestore(()=>getFirestore())),
    importProvidersFrom(provideStorage(()=>getStorage())),
    provideHttpClient(),
  ]
};

