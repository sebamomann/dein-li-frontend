import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {ILinkStats} from '../../models/ILinkStats.model';
import {Chart} from 'chart.js';
import {LinkService} from '../../services/link.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chart;
  public $totalStats: Observable<ILinkStats>;
  public event: FormGroup;
  public userIsLoggedIn: any;

  constructor(public linkService: LinkService, private formBuilder: FormBuilder,
              private authService: AuthenticationService) {
    this.userIsLoggedIn = this.authService.userIsLoggedIn();
  }

  @ViewChildren('canvas') set content(content: ElementRef) {
    if (content) {
      this.loadChart();
    }
  }

  ngOnInit() {
    this.event = this.formBuilder.group({
      link: new FormControl('', [Validators.required]),
    });

    this.$totalStats = this.linkService.loadLinkStats('all');
  }

  public loadChart() {
    this.$totalStats.subscribe((totalStats) => {

      const d = new Date();
      const currentHours = d.getHours();

      let calls = totalStats.calls;

      calls = [...calls.slice(currentHours + 1), ...calls.slice(0, currentHours + 1)];

      const labels = [];
      const data = [];

      calls.forEach((fCall) => {
        labels.push(fCall.hour + ':00 Uhr');
        data.push(+fCall.calls);
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data,
            borderColor: '#2976c4',
            fill: false
          }],
        },
        options: {
          legend: {
            display: false
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                color: '#3e3e3e'
              },
              ticks: {
                fontColor: 'white',
              },
              scaleLabel: {
                display: true,
                labelString: 'Aufrufe',
                fontSize: 20,
                padding: 10,
              }
            }],
            xAxes: [{
              gridLines: {
                color: '#3e3e3e'
              },
              ticks: {
                fontColor: 'white',
              },
              scaleLabel: {
                display: true,
                labelString: 'Uhrzeit',
                fontSize: 20,
                padding: 10,
              },
            }]
          },
        }
      });
    });
  }

  public getLinkErrorMessage(): string {
    if (this.get('link').hasError('invalid')) {
      return 'Gebe einen gültigen Link ein ';
    } else if (this.get('link').hasError('required')) {
      return 'Bitte gebe einen Link ein';
    }
  }

  saveFnc() {

  }

  private get(str: string) {
    return this.event.get(str);
  }
}
