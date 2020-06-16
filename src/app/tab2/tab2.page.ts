import { Component, OnInit } from '@angular/core'; 
import {FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms';  
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CrudService } from '../services/crud.service';
import { Empleado } from '../shared/Empleado';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{ 
  Formcreateempleado: FormGroup; 
  captureDataUrl: string;
  myPhotoURL: string;
  constructor(public fb: FormBuilder,private camera: Camera,private crud: CrudService,private alertCtrl: AlertController) {
    //validadors and formcontrolname create user 
   }  


  ngOnInit() { 
  }  
  async takePhoto() {
      const cameraOptions: CameraOptions = { 
        //CALIDAD
        quality: 50, 
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        //DEFINIR EL FORMATO DE LA IMAGEN
        encodingType: this.camera.EncodingType.PNG, 
        //DEFINIMOS QUE ES UNA IMAGEN
        mediaType: this.camera.MediaType.PICTURE  ,
        saveToPhotoAlbum: true
      }
      //se obtiene la foto de la camara y se ingresa ala variable foto
      this.camera.getPicture(cameraOptions)
      .then((captureDataUrl) => {
        this.captureDataUrl =  captureDataUrl;
        this.uploadPhoto();
     }, (err) => {
         console.log(err);
     });
    }  
  
  ///funcion para crear usuario
  async crearusuario() { 
    //creo un objeto tipo user para enviar a registro
    let user: Empleado={  
      $key:"",
      name: this.Formcreateempleado.value.name,
      email: this.Formcreateempleado.value.email,
      lastname: this.Formcreateempleado.value.lastname,
      photo: this.captureDataUrl
    };  
    ///envio la informacion a registro
    this.crud.createEmpleado(user).then(response => {  
      console.log(response);
      })
  }  
  private uploadPhoto(): void { 
    this.myPhotoURL=this.crud.fotoAFirebase(this.captureDataUrl);
  }
 
}




