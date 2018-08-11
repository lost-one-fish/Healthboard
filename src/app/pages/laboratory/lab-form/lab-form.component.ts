import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'ngx-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss'],
})
export class LabFormComponent implements OnInit, OnChanges {

  @Input()
  classification;

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
        return '<div class=\'toolbar-label\'><h2> ' + this.classification['class'] + '</h2></div>';
      },
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'auto',
      options: {
        icon: 'save',
        onClick: this.onSave,
      },
    }];
  }

  onSave() {
    notify('Add button has been clicked!');
  }
}
