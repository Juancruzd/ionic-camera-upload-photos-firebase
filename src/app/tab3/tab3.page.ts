import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core'; 
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { CrudService } from '../services/crud.service'  
import { Empleado } from '../shared/Empleado'; 
import { AlertController} from '@ionic/angular'; 
import * as Chart from 'chart.js';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit { 
  @ViewChild('barCanvas', null) barCanvas: ElementRef;
  barChart: Chart;
  listaDeEmpleados = [];
  nombres = [];
  objetivos = [];
  constructor(public crud:CrudService,private alertCtrl: AlertController) { 
  }  
  async ngOnInit() {
    await this.cargarColeccion(); 
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
      this.nombres = [];
      this.objetivos = [];
      this.listaDeEmpleados.forEach(empleado => {
        this.nombres.push(empleado['name']);
        this.objetivos.push(parseInt(empleado['objv']));
      });
      this.cargarGrafica(this.nombres, this.objetivos);
    });
  }
  cargarGrafica(nombres, objetivos) {
    if (this.barChart !== undefined) {
      this.barChart.destroy();
    }
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [
          {
            label: 'Objetivo de venta',
            data: objetivos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

}
