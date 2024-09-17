import { Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SoftMessageService { // TODO FT: nece da prikaze poruku ako je neki angular error koji se dogodi tek nakon api poziva
  constructor(private messageService: MessageService, private zone: NgZone) {}

  successMessage(detail: string, title: string = 'Successful action') {
    this.zone.run(()=>{
      this.messageService.add({
        severity: 'success',
        summary: title,
        detail: detail,
        life: 10000,
      });
    });
  }
  warningMessage(detail: string, title: string = 'Warning') {
    this.zone.run(()=>{
      this.messageService.add({
        severity: 'warn',
        summary: title,
        detail: detail,
        life: 10000,
      });
    });
  }
  errorMessage(detail: string, title: string = 'Error') {
    this.zone.run(()=>{
      this.messageService.add({
        severity: 'error',
        summary: title,
        detail: detail,
        life: 10000,
      });
    });
  }
}
