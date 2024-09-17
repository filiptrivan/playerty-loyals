import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { PanelBodyComponent } from './panel-body/panel-body.component';
import { PanelFooterComponent } from './panel-footer/panel-footer.component';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { SoftPanelComponent } from './soft-panel/soft-panel.component';
import { SoftCardComponent } from './soft-card/soft-card.component';

@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
  ],
  exports: [
    PanelHeaderComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    SoftPanelComponent,
    SoftCardComponent
  ],
  declarations: [
    PanelHeaderComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    SoftPanelComponent,
    SoftCardComponent
  ],
  providers: [
  ]
})
export class SoftPanelsModule {}