import { Component } from '@angular/core'; 
import {FormBuilder,FormGroup,Validators} from '@angular/forms';  
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CrudService } from '../services/crud.service';
import { Empleado } from '../shared/Empleado';
import { AlertController} from '@ionic/angular';  
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{ 
  Formcreateempleado: FormGroup;  
  selectedPhoto;
  selectedPhotobase64="/assets/img/camera-icon.png"; 
  currentImage;

  constructor(public fb: FormBuilder,
    private camera: Camera,
    private crud: CrudService,
    private alertCtrl: AlertController ) {
    //validadors and formcontrolname create Empleado
    this.Formcreateempleado = this.fb.group({ 
      email: ['', [Validators.required, Validators.email]], 
      name: ['', [Validators.required,Validators.maxLength(30)]],
      lastname: ['', [Validators.required,Validators.maxLength(10)]]
    });
   }  
  tomarfoto() {

    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {  
      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData); 
      this.selectedPhotobase64='data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('error', err);
    });
  }  
  dataURItoBlob(dataURI) {
      // codej adapted from:
      //  http://stackoverflow.com/questions/33486352/
      //cant-upload-image-to-aws-s3-from-ionic-camera
          let binary = atob(dataURI.split(',')[1]);
          let array = [];
          for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }; 


  ///funcion para crear Empleado
  async crearempleado() { 
    //creo un objeto tipo Empleado para enviar a registro
    let empleado: Empleado={  
      $key:"",
      name: this.Formcreateempleado.value.name,
      email: this.Formcreateempleado.value.email,
      lastname: this.Formcreateempleado.value.lastname,
      photo: this.selectedPhoto,
      objv:"0"
    };  
    ///envio la informacion a registro
    const subida=this.crud.subirfoto(this.selectedPhoto)
    await subida.then(snapshot => { 
      snapshot.ref.getDownloadURL().then(async url => {  
        empleado.photo=url;
        await this.crud.registrarEmpleado(empleado).then(async result => { 
          const alert = await this.alertCtrl.create({
            header: '¡Empleado registrado!', 
            message: `<b>Nombre:</b><br>${this.Formcreateempleado.value.name}<br><br>
            <b>Apellido:</b><br>${this.Formcreateempleado.value.lastname}<br><br>
            <b>Correo:</b><br>${this.Formcreateempleado.value.email}<br><br>`,
            buttons: ['OK'],
          });
          this.Formcreateempleado.reset();
          this.selectedPhoto="";
          this.selectedPhotobase64="/assets/img/camera-icon.png"; 
          await alert.present();
        });
        });
      });
  }  
  async presentAlert(mensaje) {
    const alert = await this.alertCtrl.create({
      header: 'img',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}