import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { PrimengModule } from 'src/app/layout/modules/primeng.module';
import { SoftPanelsModule } from "../soft-panels/soft-panels.module";

@Component({
    selector: 'timeline-index-progressbar',
    templateUrl: './timeline-index-progressbar.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SoftPanelsModule
]
})
export class TimelineIndexProgressbarComponent {
    // @Input() last: boolean;
    // @Input() index: number;
    // @Input() header: string;
    // @Input() description: string;
    
    @Input() items: any[];
    @Input() currentItem: any;
    @Input() currentUserPoints: any;
    @Input() connectorMethod: (connector: Element, index: number) => void;
    resizeTimeout;

    constructor(
        protected formBuilder: FormBuilder,
        ) {

        }

    ngOnInit(){
        // console.log(this.last);
    }

    isCurrentItem(item: any){
        if (item.id == this.currentItem.id) {
          return true;
        }
    
        return false;
    }

    isPassed(item: any){
        if (this.currentUserPoints > item.validTo) {
            return true;
        }

        return false;
    }

    ngAfterViewInit() {
        const observer = new MutationObserver((mutations) => {
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = setTimeout(() => {
            const connectors = document.querySelectorAll('.p-timeline-event-connector');
      
            if (connectors.length) {
              connectors.forEach((connector, index) => {
                if (this.connectorMethod != null){
                    this.connectorMethod(connector, index);
                }
              });
            }
          }, 100);
        });
      
        observer.observe(document.body, { childList: true, subtree: true });
    }

}