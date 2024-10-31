import { TranslocoService } from '@jsverse/transloco';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SoftMessageService } from '../services/soft-message.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SoftErrorHandler implements ErrorHandler {
  constructor(private messageService: SoftMessageService, private translocoService: TranslocoService, private zone: NgZone) {}
  handleError(error: any): void {
    if(environment.production == false){
      console.error(error);
    }

    if(error instanceof HttpErrorResponse == false){
      this.messageService.errorMessage(
        this.translocoService.translate('UnexpectedErrorDetails'),
        this.translocoService.translate('UnexpectedErrorTitle'),
      );
    }

  }
}
