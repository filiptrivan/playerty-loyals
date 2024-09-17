import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  public getFileNameFromContentDisposition(
    resp: HttpResponse<Blob>,
    defaultName: string
  ): string {
    let fileName;
    if (resp && resp.headers && resp.headers.get('Content-Disposition')) {
      let val = resp.headers.get('Content-Disposition');
      let start = val.indexOf('filename=');
      if (start != -1) {
        let end = val.indexOf(';', start);
        fileName =
          end != -1 ? val.substring(start + 9, end) : val.substring(start + 9);
        fileName = fileName.split('"').join('');
      }
    }
    return fileName ?? defaultName;
  }
}
