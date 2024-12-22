import { ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Component } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'soft-delete-confirmation',
  templateUrl: './soft-delete-confirmation.component.html',
  styles: [],
  standalone: true,
  imports: [
    PrimengModule,
    TranslocoDirective,
  ],
  providers: [
    ConfirmationService
  ]
})
export class SoftDeleteConfirmationComponent {

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private apiService: ApiService) {}

  accept(){
    this.config.data.deleteItemFromTableObservableMethod(this.config.data.id).subscribe({
      next: () => {
        this.ref.close(true) // deleted succesfully
      },
      error: () => {
        this.ref.close(false) // not deleted succesfully
      },
    });
  }

  reject(){
    this.ref.close()
  }
}