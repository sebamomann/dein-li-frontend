import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-hexagon-loader',
    templateUrl: './hexagon-loader.component.html',
    styleUrls: ['./hexagon-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HexagonLoaderComponent implements OnInit {

  @Input() message: string;
  @Input() reverse: boolean;

  constructor() {

  }

  ngOnInit() {
  }

}
