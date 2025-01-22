import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';
import { CommonModule, Location } from "@angular/common";
import { PrimengModule } from "src/app/core/modules/primeng.module";
import { getParentUrl } from "../../services/helper-functions";
import { TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: 'spider-return-button',
  templateUrl: './spider-return-button.component.html',
  styles: [],
  imports: [
    CommonModule,
    PrimengModule,
    TranslocoDirective,
  ],
  standalone: true,
})
export class SpiderReturnButtonComponent {
  @Input() navigateUrl: string;

  constructor(private router: Router, private location: Location) {}

  onReturn(){
    if(this.navigateUrl == undefined){
        const currentUrl = this.router.url;
        const parentUrl: string = getParentUrl(currentUrl);
        this.router.navigateByUrl(parentUrl);
        // this.location.back();
    }else{
        this.router.navigate([this.navigateUrl]);
    }
  }
}