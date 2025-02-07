import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-element',
  standalone: false,
  
  templateUrl: './wait-element.component.html',
  styleUrl: './wait-element.component.scss'
})
export class WaitElementComponent implements OnInit{
  constructor(
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.waitElement('#test', this.elementRef.nativeElement).then(console.log);
    console.log(document.getElementById('test'));    
    setTimeout(() => {
      const el = document.createElement('div');
      el.id = 'test';
      this.elementRef.nativeElement.appendChild(el);
    }, 5000)
  }

  async waitElement(query: string, parent?: any) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (!parent) {
          parent = document;
        }
        const el = parent.querySelector(query);
        if (el) {
          clearInterval(interval);
          resolve(el);
        }
      }, 100);
    })
  }
}
