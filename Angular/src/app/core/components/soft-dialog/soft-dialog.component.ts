import { ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Component } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { PrimengModule } from 'src/app/layout/modules/primeng.module';

@Component({
  selector: 'soft-dialog',
  templateUrl: './soft-dialog.component.html',
  styles: [],
  standalone: true,
  imports: [
    PrimengModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class SoftDeleteConfirmationComponent {

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private apiService: ApiService) {}


}