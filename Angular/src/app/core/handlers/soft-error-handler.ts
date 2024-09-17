import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SoftMessageService } from '../services/soft-message.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SoftErrorHandler implements ErrorHandler {
  constructor(private messageService: SoftMessageService, private zone: NgZone) {}
  handleError(error: any): void {
    if(environment.production == false){
      console.error(error);
    }

    if(error instanceof HttpErrorResponse == false){
      this.messageService.errorMessage(
        $localize`:@@UnexpectedErrorDetails:Our team has been notified, and we're working to fix the issue. Please try again later.`,
        $localize`:@@UnexpectedErrorTitle:Something went wrong.`,
      );
    }

  }
}
