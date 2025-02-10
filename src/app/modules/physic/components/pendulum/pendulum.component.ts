import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pendulum',
  standalone: false,
  templateUrl: './pendulum.component.html',
  styleUrl: './pendulum.component.scss'
})
export class PendulumComponent {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;
  cv!: HTMLCanvasElement;
  objectList: {
    // Hiển thị
    name: string, // Tên hiển thị
    radius: number, // Bán kính
    color: string, // Màu sắc

    // Chuyển động
    mass: number, // Khối lượng
    posX: number, // Tọa độ X
    posY: number, // Tọa độ Y
    velocityX: number, // Vận tốc theo X
    velocityY: number, // Vận tốc theo Y
    accelerationX: number, // Gia tốc theo X
    accelerationY: number, // Gia tốc theo Y

    // Giữ vật thể
    isBeingHeld?: boolean, // Đang bị giữ?
    holdOffsetX?: number, // Khoảng cách giữ theo X
    holdOffsetY?: number, // Khoảng cách giữ theo Y
  }[] = [];
  g = -0.3;// gia tốc trọng trường
  isBounce: boolean = true;
  speed = 0.8;// tốc độ chuyển động chung

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cv = this.canvas.nativeElement;
    setTimeout(() => this.onWindowResize(), 100);
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    // khởi tạo ngẫu nhiên các đối tượng
    this.objectList.push({
      name: `object 1`,
      radius: 20,
      color: 'rgb(23, 99, 221)',
      mass: 100,
      posX: 200,
      posY: 200,
      velocityX: 0,
      velocityY: 0,
      accelerationX: 0,
      accelerationY: 0,
      isBeingHeld: false,
      holdOffsetX: 0,
      holdOffsetY: 0,
    });

    //
    this.onEvent();
    requestAnimationFrame(() => this.loop());
  }

  ngOnDestroy(): void {
  }

  // vòng lặp chính của trương trình
  loop() {
    this.move();
    this.checkBorder();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  // xử lý vật thể di chuyển
  move() {
    for (let i = 0; i < this.objectList.length; i += 1) {
      const object = this.objectList[i];
      if (!object.isBeingHeld) {
        object.accelerationX = 0;
        object.accelerationY = this.g;
        object.velocityX += object.accelerationX * this.speed;
        object.velocityY += object.accelerationY * this.speed;
        object.posX += object.velocityX * this.speed;
        object.posY += object.velocityY * this.speed;
      }
    }
  }

  // kiểm tra vật thể chạm vào biên giới
  checkBorder() {
    for (let i = 0; i < this.objectList.length; i += 1) {
      const object = this.objectList[i];
      if (object.posY + object.radius >= this.cv.height) {
        object.posY = this.cv.height - object.radius;
        if (this.isBounce) {
          object.velocityY = - Math.abs(object.velocityY);
        }
      }
      if (object.posY - object.radius <= 0) {
        object.posY = object.radius;
        if (this.isBounce) {
          object.velocityY = Math.abs(object.velocityY);
        }
      }
      if (object.posX + object.radius >= this.cv.width) {
        object.posX = this.cv.width - object.radius;
        if (this.isBounce) {
          object.velocityX = - Math.abs(object.velocityX);
        }
      }
      if (object.posX - object.radius <= 0) {
        object.posX = object.radius;
        if (this.isBounce) {
          object.velocityX = Math.abs(object.velocityX);
        }
      }
    }
  }

  // vẽ các vật thể
  draw() {
    this.ctx.clearRect(0, 0, this.cv.width, this.cv.height);
    for (let i = 0; i < this.objectList.length; i += 1) {
      const object = this.objectList[i];
      this.ctx.beginPath();
      this.ctx.arc(object.posX, object.posY, object.radius, 0, Math.PI * 2);
      const gradient = this.ctx.createRadialGradient(
        object.posX +  object.radius / 2, object.posY +  object.radius / 2, 0, 
        object.posX +  object.radius / 2, object.posY +  object.radius / 2, object.radius * 3
      );
      gradient.addColorStop(0, object.color);   // Màu ở tâm
      gradient.addColorStop(1, "black");  // Màu ở rìa  
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  onEvent() {
    // thay đổi kích thước màn hình
    window.addEventListener('resize', () => this.onWindowResize());
  }

  // thay đổi kích thước canvas theo kích thước màn hình
  onWindowResize() {
    if (this.cv) {
      const rect = this.cv.getBoundingClientRect();
      this.cv.width = rect.width;
      this.cv.height = rect.height;
    }
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
