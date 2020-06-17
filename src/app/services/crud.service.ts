import { Injectable } from '@angular/core'; 
import { Empleado } from '../shared/Empleado';   
import {AngularFirestore } from '@angular/fire/firestore'; 
import { AngularFireStorage} from '@angular/fire/storage'; 
import * as firebase from 'firebase/app'; 
@Injectable({
  providedIn: 'root'
})
export class CrudService {   
    constructor(public db: AngularFirestore,public storage:AngularFireStorage) { 
    }   
    subirfoto(selectedPhoto){ 
      return firebase.storage().ref().child(`empleados/empleado_${ new Date().getTime() }.jpg`).put(selectedPhoto); 
    }
    async registrarEmpleado(empleado: Empleado) {
      delete empleado.$key; 
      return this.db.collection('empleados').add(empleado);
    }
    obtenerEmpleado(id) {
      return this.db.collection('empleados').doc(id).snapshotChanges();
    }
    actualizarEmpleado(uid, data) {
      return this.db.collection('empleados').doc(uid).set(data);
    } 
    ObtenerEmpleados() {
      return this.db.collection('empleados').snapshotChanges();
    }
}
