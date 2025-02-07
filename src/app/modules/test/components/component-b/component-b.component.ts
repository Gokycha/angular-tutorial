import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SendDataService } from '../../../../services/send-data.service';

@Component({
  selector: 'app-component-b',
  standalone: false,
  
  templateUrl: './component-b.component.html',
  styleUrl: './component-b.component.scss'
})
export class ComponentBComponent {
  data: string = '';

  constructor(
    private sendDataService: SendDataService,
  ) {
    sendDataService.giveData().subscribe((data: string) => this.data = data);
  }
}
