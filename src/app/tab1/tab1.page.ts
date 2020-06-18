import { Component, OnInit} from '@angular/core';   
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
  ////key o id del empleado
  idActual; 
  ////lista de empleados
  listaDeEmpleados = [];
  ///se agregan los imports
  constructor(public crud:CrudService,private alertCtrl: AlertController) { 
  }
  ////funcion de carga  
  async ngOnInit() { 
    ////obtener todos los empleados
    this.cargarEmpleados();  
  }     
  ////Funcion para obtener todos los empleados y  q automaticamente se actulice
  cargarEmpleados() {
    this.crud.ObtenerEmpleados().subscribe((data) => {
      ///ingreso los empleados
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
  ///evento de cambio en select que recibe la key del empleado
  mostrarImagen(value) {
    ///busqueda del usuario por key por medio del arreglo de la lista de empleados
    this.listaDeEmpleados.forEach((empleado) => {
      //si se encuentra una coincidencia en la key con la lista de empleados
      if ( empleado['key'] === value) {
        ///obtengo el empleado y lo guardo como seleccionado mostrando su fotografia
        this.empleadoSeleccionado = empleado;
        ///obtenfo la key para actualizar
        this.idActual = empleado['key'];
      }
    });
  }
  ///funcion para actualizar el objetivo de venta del empleado seleccionado
  async actualizarObjv() {
    ///se actualiza el empleado mandando el id y el empleado seleccionado
    this.crud.actualizarEmpleado(this.idActual, this.empleadoSeleccionado); 
    ///se muestra alerta
    const alert = await this.alertCtrl.create({
      header: 'Objetivo de venta',
      subHeader: `${this.empleadoSeleccionado.name} debe vender:`,
      message: `<b>\$</b>${this.empleadoSeleccionado.objv}`,
      buttons: ['OK'],
    });
    ///se presenta alerta
    await alert.present();
    ///se limpia formulario y se reinicia
    this.empleadoSeleccionado = new Empleado(); 
    this.listaDeEmpleados = null;
    this.cargarEmpleados();  
  }
}
