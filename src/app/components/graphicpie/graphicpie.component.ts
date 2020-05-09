import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-graphicpie',
  templateUrl: './graphicpie.component.html',
  styles: []
})
export class GraphicpieComponent implements OnInit {

  @Input() pieChartLabels: Label[];
  @Input() pieChartData: number[];
  @Input() pieChartType: ChartType;
  @Input() pieChartLegend = true;

  constructor() { }

  ngOnInit(): void {
  }

}
