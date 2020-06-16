import { Injectable } from '@angular/core'; 
import { Empleado } from '../shared/Empleado';  
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'; 
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'; 
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CrudService {  

  Empleado: Observable<Empleado[]>;
  EmpleadoCollection: AngularFirestoreCollection<Empleado>; 


    constructor(public db: AngularFirestore,public storage:AngularFireStorage,alertCtrl: AlertController) {
      this.EmpleadoCollection = db.collection<Empleado>('empleados');
      this.Empleado = this.EmpleadoCollection.snapshotChanges().pipe(map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }
      ));   
    }
    // CreateUser
    createEmpleado(emp: Empleado) { 
      const id=this.db.createId();
      delete emp.$key;
      const tem=this.EmpleadoCollection.doc(id).set(emp).then(response => {  
        console.log(response);   
        }).catch(error => {
          console.log("error " + error);
        }); 
      
      return tem
    }  
    fotoAFirebase(photo): any{
      const myPhotosRef=this.storage.ref('/empleados/'); 
      myPhotosRef.child(this.generateUUID()).child('empleado.png')
          .putString(photo, 'base64', { contentType: 'image/png' })
          .then((savedPicture) => {
             return savedPicture.downloadURL;
      });  
    }
    private generateUUID(): any {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
    // Get List 
    getUserList() {
      return this.Empleado;
    }
    // Get Single User by Id 
    getUser(id: string) {
      return this.EmpleadoCollection.doc<Empleado>(id).valueChanges();
    }
  
     // Update User by id
    updateUser(id,usr: Empleado) {
      delete usr.$key;
      return this.EmpleadoCollection.doc(id).update(usr);
    } 
    //agregar un nuevo Empleado a la base de datos desde la app
    addTodo(emp: Empleado) {
      return this.EmpleadoCollection.add(emp);
    } 
    // Delete Empleado by id
    deleteUser(id: string) {
      return this.EmpleadoCollection.doc(id).delete();
    }   
 
}
