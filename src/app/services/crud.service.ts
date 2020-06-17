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
    //funcion para subir foto
    subirfoto(selectedPhoto){ 
      return firebase.storage().ref().child(`empleados/empleado_${ new Date().getTime() }.jpg`).put(selectedPhoto); 
    }
    //funcion para registrar empleado
    async registrarEmpleado(empleado: Empleado) {
      delete empleado.$key; 
      return this.db.collection('empleados').add(empleado);
    }
    //funcion para obtener empledo por id del documento
    obtenerEmpleado(id) {
      return this.db.collection('empleados').doc(id).snapshotChanges();
    }
    ///actualizar empleado por id con su informacion
    actualizarEmpleado(id, data) {
      return this.db.collection('empleados').doc(id).set(data);
    } 
    ///obtener todos los empleados
    ObtenerEmpleados() {
      return this.db.collection('empleados').snapshotChanges();
    }
}
