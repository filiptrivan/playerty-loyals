import { TranslocoService } from '@jsverse/transloco';
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
  @Input() title: string;
  @Input() bigTitle: boolean;
  @Input() index: number;

  constructor(
    private translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    if (this.title == null)
      this.title = this.translocoService.translate('Details')
  }
}