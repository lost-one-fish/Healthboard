import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import notify from '../../../../../node_modules/devextreme/ui/notify';

@Component({
  selector: 'ngx-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss'],
})
export class LabFormComponent implements OnInit, OnChanges {

  @Input()
  classification;

  @Output()
  resource: EventEmitter<any> = new EventEmitter();

  format;
  value;
  now;

  items = [];

  constructor() {
  }

  ngOnInit() {
    this.now = new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['classification'].currentValue;
    this.format = '#0.## ' + value['unit'];

    this.value = 0;
    this.now = new Date();

    this.items = [{
      location: 'before',
      locateInMenu: 'never',
      template: () => {
        return '<div class=\'toolbar-label\'><h2> ' + value['class'] + '</h2></div>';
      },
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'auto',
      options: {
        icon: 'save',
        onClick: () => {
          if (!this.classification['code']) {
            notify('Not Found the code');
            return;
          }
          if (!this.classification['unit']) {
            notify('Not Found the unit');
            return;
          }
          if (this.value <= 0) {
            notify('The value is empty.');
            return;
          }

          const resource = {
            'resourceType': 'Observation',
            'code': {
              'coding': [
                {
                  'code': this.classification['code'],
                },
              ],
            },
            'subject': {},
            'effectiveDateTime': this.now,
            'valueQuantity': {
              'value': this.value,
              'unit': this.classification['unit'],
            },
          };

          this.resource.emit(resource);
        },
      },
    }];
  }
}
