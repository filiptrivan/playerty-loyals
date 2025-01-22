import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { PanelBodyComponent } from './panel-body/panel-body.component';
import { PanelFooterComponent } from './panel-footer/panel-footer.component';
import { PanelHeaderComponent } from './panel-header/panel-header.component';
import { SpiderPanelComponent } from './spider-panel/spider-panel.component';
import { SpiderCardComponent } from './spider-card/spider-card.component';

@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
  ],
  exports: [
    PanelHeaderComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    SpiderPanelComponent,
    SpiderCardComponent
  ],
  declarations: [
    PanelHeaderComponent,
    PanelBodyComponent,
    PanelFooterComponent,
    SpiderPanelComponent,
    SpiderCardComponent
  ],
  providers: [
  ]
})
export class SpiderPanelsModule {}