import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';   
import { CrudService } from '../services/crud.service'  
import { Empleado } from '../shared/Empleado'; 
import { AlertController} from '@ionic/angular'; 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{   
  empleadoSeleccionado: Empleado = new Empleado(); 
  idActual; 
  listaDeEmpleados = [];
  constructor(public crud:CrudService,private alertCtrl: AlertController) { 
  }  
  async ngOnInit() { 
    this.cargarColeccion();  
  }     
  cargarColeccion() {
    this.crud.ObtenerEmpleados().subscribe((data) => {
      this.listaDeEmpleados = data.map((e) => {
        return {
          key: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          lastname: e.payload.doc.data()['lastname'],
          email: e.payload.doc.data()['email'],
          photo: e.payload.doc.data()['photo'],
          objv: e.payload.doc.data()['objv'],
        };
      });
    });
  }
  cargarImagen(value) {
    this.listaDeEmpleados.forEach((empleado) => {
      if ( empleado['key'] === value) {
        this.empleadoSeleccionado = empleado;
        this.idActual = empleado['key'];
      }
    });
  }
  async actualizarObjetivoDeVenta() {
    this.crud.actualizarEmpleado(this.idActual, this.empleadoSeleccionado); 
    
    const alert = await this.alertCtrl.create({
      header: 'Objetivo de venta',
      subHeader: `${this.empleadoSeleccionado.name} debe vender:`,
      message: `<b>\$</b>${this.empleadoSeleccionado.objv}`,
      buttons: ['OK'],
    });
    await alert.present();
    this.empleadoSeleccionado = new Empleado(); 
    this.listaDeEmpleados = null;
    this.cargarColeccion();  
  }
}
