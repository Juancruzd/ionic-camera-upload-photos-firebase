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
  //formulario para el registro del empleado
  Formcreateempleado: FormGroup;  
  ///foto seleccionada para envio a almacenar
  selectedPhoto;
  ///foto seleccionada a mostrar en imagen capturada
  selectedPhotobase64="/assets/img/camera-icon.png";  
  ///set imports
  constructor(public fb: FormBuilder,private camera: Camera,private crud: CrudService,private alertCtrl: AlertController ) {
    //validadors and formcontrolname create Empleado
    this.Formcreateempleado = this.fb.group({ 
      email: ['', [Validators.required, Validators.email]], 
      name: ['', [Validators.required,Validators.maxLength(30)]],
      lastname: ['', [Validators.required,Validators.maxLength(10)]]
    });
   }  
   ///funcio para tomar fotografia atravez de la camara
  tomarfoto() { 
    ///opciones de la camara
    const options: CameraOptions = {
      //calidad
      quality: 100,
      ////dimensiones de la fotografia
      targetHeight: 100,
      targetWidth: 100,
      ///tipo de destino
      destinationType: this.camera.DestinationType.DATA_URL,
      ///tipo de foto
      encodingType: this.camera.EncodingType.JPEG,
      //definir que es una imagen
      mediaType: this.camera.MediaType.PICTURE
    }
    //obtener imagen capturada
    this.camera.getPicture(options).then((imageData) => {  
      ////obtener la foto
      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData); 
      this.selectedPhotobase64='data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('error', err);
    });
  }   
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
    ///se envia la foto para almacenarla
    const subida=this.crud.subirfoto(this.selectedPhoto)
    //se espera a la subida de la fotografia
    await subida.then(snapshot => { 
      snapshot.ref.getDownloadURL().then(async url => {  
        ///se obtiene la url de la fotografia almacenada
        empleado.photo=url;
        ///envio la informacion a registro
        await this.crud.registrarEmpleado(empleado).then(async result => { 
          ///se muestra alerta de registro completo
          const alert = await this.alertCtrl.create({
            header: '¡Empleado registrado!', 
            message: `<b>Nombre:</b><br>${this.Formcreateempleado.value.name}<br><br>
            <b>Apellido:</b><br>${this.Formcreateempleado.value.lastname}<br><br>
            <b>Correo:</b><br>${this.Formcreateempleado.value.email}<br><br>`,
            buttons: ['OK'],
          });
          ///se reinicia el formulario
          this.Formcreateempleado.reset();
          this.selectedPhoto="";
          this.selectedPhotobase64="/assets/img/camera-icon.png";
          //se presenta la alerta 
          await alert.present();
        });
        });
      });
  }  
  ///funcion para convertir de datauri a BLOB
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
}