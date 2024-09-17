import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'soft-card',
  templateUrl: './soft-card.component.html',
  styles: []
})
export class SoftCardComponent implements OnInit {
  @Input() icon: string = 'pi pi-file-edit';
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }
}