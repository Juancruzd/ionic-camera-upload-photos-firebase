import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';   
import { ApiService } from '../services/api.service' 
import{HttpClient} from '@angular/common/http';  
import {FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms'; 
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {   
  constructor(public api:ApiService,public http:HttpClient ,public fb: FormBuilder,private datePipe: DatePipe) { 

  }    
  async ngOnInit() {  
  }    
}
