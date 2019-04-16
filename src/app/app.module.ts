import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { EntradaPage } from '../pages/entrada/entrada';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';

//Importar paginas
import { InicioSesionPageModule } from '../pages/inicioSesion/inicioSesion.module'
import { RegistroPageModule } from '../pages/registro/registro.module'
import { HomePageModule } from '../pages/home/home.module'
import { HomeDPageModule } from '../pages/homeD/homeD.module'
import { FormularioSintomasPageModule } from '../pages/formularioSintomas/formularioSintomas.module'
import { DiagnosticoPageModule } from '../pages/diagnostico/diagnostico.module'

export const fireBaseConfig={
	apiKey: "AIzaSyDR98UZlU2UdyEIxE_Xj_gMnei7AifCduU",
    authDomain: "doctonlinebd.firebaseapp.com",
    databaseURL: "https://doctonlinebd.firebaseio.com",
    projectId: "doctonlinebd",
    storageBucket: "doctonlinebd.appspot.com",
    messagingSenderId: "770817091146"};


@NgModule({
  declarations: [
    MyApp,
    EntradaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
		InicioSesionPageModule,
		RegistroPageModule,
		HomePageModule,
		HomeDPageModule,
		FormularioSintomasPageModule,
		DiagnosticoPageModule,
		AngularFireModule.initializeApp(fireBaseConfig),AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntradaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseDbProvider
  ]
})
export class AppModule {}
