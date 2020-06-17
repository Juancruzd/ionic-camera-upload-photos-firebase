import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';  
import { CrudService } from '../services/crud.service'   
import { AlertController} from '@ionic/angular'; 
import * as Chart from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {  
  ///lista de empleados
  listaEmpleados = [];  
  // Data de grafica 1 serie
  chartData: ChartDataSets[] = [
    { data: [], label: 'Objetivo de ventas' }];
  ///arreglo de labels que en este caso son los nomnbres de los empleados
   chartLabels: Label[]; 
// Options de la grafica
  chartOptions = { 
    responsive: true,
    scaleShowVerticalLines:false,
    ////titulo no mostrado
    title: {
      display: false,
      text: 'Objetivo de venta por empleado'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  ///color de la grafica
  chartColors: Color[] = [ 
    { 
      borderColor: '#4498D6',
      backgroundColor: '#4498D6',
      pointBackgroundColor: '#4498D6'
    }
  ];
  ///tipo de grafica bar
  chartType = 'bar';
  ///legenda visible
  showLegend = true; 
  //set imports
  constructor(public crud:CrudService,private alertCtrl: AlertController) { 
  }  
  ///funcion de carga
  async ngOnInit() {
    ///se obtienen los empleados
    await this.cargarEmpleados(); 
  }
  //funcion para obtener todos los actuales empleados y asi mismo se actualice automaticamente
  cargarEmpleados() {
    this.crud.ObtenerEmpleados().subscribe((data) => {
      ///se guradan los empleados
      this.listaEmpleados = data.map((e) => {
        return {
          key: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          lastname: e.payload.doc.data()['lastname'],
          email: e.payload.doc.data()['email'],
          photo: e.payload.doc.data()['photo'],
          objv: e.payload.doc.data()['objv'],
        };
      });
      //se vacen los arreglos de informacion de la grafica
      this.chartLabels = [];
      this.chartData[0].data = [];
      ///atravez de un for ech se obtiene la informacion del empleado para mostrarla en la grafica 
      this.listaEmpleados.forEach(empleado => { 
        ///se agrega la label 
        this.chartLabels.push(empleado['name']+" "+empleado['lastname']);
        ///se agrega el dato
        this.chartData[0].data.push(parseInt(empleado['objv'])); 
      }); 
    });
  } 

}
