import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SendDataService } from '../../../../services/send-data.service';

@Component({
  selector: 'app-component-a',
  standalone: false,
  
  templateUrl: './component-a.component.html',
  styleUrl: './component-a.component.scss'
})
export class ComponentAComponent {
  data: string = '';

  constructor(
    private sendDataService: SendDataService,
  ) {}

  onChange(data: string) {
    this.sendDataService.sendData(data);
  }
}
