import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-unknown',
    templateUrl: './unknown.component.html',
    styleUrls: ['./unknown.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UnknownComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
