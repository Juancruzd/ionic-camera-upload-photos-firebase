import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
///se gregan las librerias o complementos de firebase asi como las firebaseConfig del proyecto
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './../environments/environment';  
///agrego la libreria de base de datos de firebase 
 
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';


import{HttpClientModule} from '@angular/common/http'
import { ApiService } from './services/api.service'; 
////import  chartjs-plugin-zoom
import 'chartjs-plugin-zoom';
import { Camera } from '@ionic-native/camera/ngx'; 



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      //inicializar nuestra conexion o aplicacion de firebase con sus configuraciones
      AngularFireModule.initializeApp(environment.firebaseConfig),///configuration firebase
      AngularFireAuthModule,///auth 
      AngularFireAuthModule,///auth
      AngularFireDatabaseModule,///database
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireStorageModule, // imports firebase/storage only needed for storage features 
      HttpClientModule,////import http 
    ],
  providers: [
    ApiService,////provider
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
