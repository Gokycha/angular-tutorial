import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  private subject: Subject<any> = new Subject();
  constructor() { }

  public sendData(data: any) {
    this.subject.next(data);
  }

  public giveData() {
    return this.subject.asObservable();
  }
}
