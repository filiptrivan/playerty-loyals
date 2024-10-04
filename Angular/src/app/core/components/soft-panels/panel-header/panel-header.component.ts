import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'panel-header',
  templateUrl: './panel-header.component.html',
  styles: [`
    .p-panel-icons-end {
      font-size: 50px;
    }
  `]
})
export class PanelHeaderComponent implements OnInit {
  @Input() icon: string = 'pi pi-file-edit';
  @Input() title: string = $localize`:@@Details:Details`;
  @Input() bigTitle: boolean;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }
}