import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'soft-panel',
  templateUrl: './soft-panel.component.html',
  styles: [
  ]
})
export class SoftPanelComponent implements OnInit {
  @Input() isFirstMultiplePanel: boolean = false;
  @Input() isMiddleMultiplePanel: boolean = false;
  @Input() isLastMultiplePanel: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}