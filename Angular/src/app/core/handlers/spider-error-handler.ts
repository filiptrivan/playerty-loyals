import { TranslocoService } from '@jsverse/transloco';
import { ErrorHandler, Injectable } from '@angular/core';
import { SpiderMessageService } from '../services/spider-message.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SpiderErrorHandler implements ErrorHandler {
  constructor(
    private messageService: SpiderMessageService, 
    private translocoService: TranslocoService, 
  ) {

  }

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
