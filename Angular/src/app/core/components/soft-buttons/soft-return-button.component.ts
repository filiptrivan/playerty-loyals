import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';
import { CommonModule, Location } from "@angular/common";
import { PrimengModule } from "src/app/layout/modules/primeng.module";

@Component({
  selector: 'soft-return-button',
  templateUrl: './soft-return-button.component.html',
  styles: [],
  imports: [
    CommonModule,
    PrimengModule,
  ],
  standalone: true,
})
export class SoftReturnButtonComponent {
  @Input() navigateUrl: string;

  constructor(private router: Router, private location: Location) {}

  onReturn(){
    if(this.navigateUrl == undefined){
        this.location.back();
    }else{
        this.router.navigate([this.navigateUrl]);
    }
  }
}