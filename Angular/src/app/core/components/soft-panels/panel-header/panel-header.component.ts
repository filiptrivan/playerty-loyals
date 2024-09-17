import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'panel-header',
  templateUrl: './panel-header.component.html',
  styles: []
})
export class PanelHeaderComponent implements OnInit {
  @Input() icon: string = 'pi pi-file-edit';
  @Input() title: string;
  @Input() bigTitle: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}