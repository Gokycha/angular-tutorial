import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, map, pairwise, takeLast, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-ball',
  standalone: false,
  templateUrl: './ball.component.html',
  styleUrl: './ball.component.scss'
})
export class BallComponent implements OnInit, AfterViewInit, OnDestroy {
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
    // khởi tạo ngẫu nhiên các đối tượng
    this.objectList = Array(this.randomInt(5, 10)).fill(0).map((_, i) => {
      const temp = this.randomInt(10, 30);
      return {
        name: `object ${i}`,
        radius: temp,
        color: `rgb(${this.randomInt(0, 255)}, ${this.randomInt(0, 255)}, ${this.randomInt(0, 255)})`,
        mass: temp * 10,
        posX: 90 * i + 50,
        posY: this.randomInt(100, 700),
        velocityX: this.randomInt(-5, 5),
        velocityY: this.randomInt(-5, 5),
        accelerationX: 0,
        accelerationY: 0,
        isBeingHeld: false,
        holdOffsetX: 0,
        holdOffsetY: 0,
      }
    });
  }

  ngAfterViewInit(): void {
    this.cv = this.canvas.nativeElement;
    setTimeout(() => this.onWindowResize(), 100);
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    //
    this.onEvent();
    requestAnimationFrame(() => this.loop());
  }

  ngOnDestroy(): void {
  }

  // vòng lặp chính của trương trình
  loop() {
    this.move();
    this.checkCollision();
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

  // xử lý sự kiện 
  onEvent() {
    // kéo thả đối tượng bằng chuột
    const mapEvent = (event: any) => ({
      x: event.offsetX,
      y: event.offsetY,
      time: Date.now(),
    });
    const mousedown$ = fromEvent(this.cv, "mousedown").pipe(map(mapEvent));
    const mousemove$ = fromEvent(this.cv, "mousemove").pipe(map(mapEvent));
    const mouseup$ = fromEvent(this.cv, "mouseup");
    mousedown$.subscribe((event: any) => {
      // console.log(event, this.x, this.y);
      const heldObject = this.objectList.find((object) => (event.x - object.posX) ** 2 + (event.y - object.posY) ** 2 <= object.radius ** 2);
      if (heldObject) {
        heldObject.isBeingHeld = true;
        heldObject.holdOffsetX = heldObject.posX - event.x;
        heldObject.holdOffsetY = heldObject.posY - event.y;
        // console.log(event);
        mousemove$.pipe(
          tap((e) => {
            if (heldObject.isBeingHeld) {
              heldObject.posX = e.x + heldObject.holdOffsetX;
              heldObject.posY = e.y + heldObject.holdOffsetY;
              // console.log(e);
            }
          }),
          takeUntil(mouseup$),
          takeLast(2),
          pairwise(),
        ).subscribe(([p1, p2]) => {
          if (heldObject.isBeingHeld) {
            heldObject.isBeingHeld = false;
            // console.log(points);
            heldObject.velocityX = (p2.x - p1.x) * 2 / (p2.time - p1.time);
            heldObject.velocityY = (p2.y - p1.y) * 2 / (p2.time - p1.time);
          }
        });
      }
    })

    // thay đổi kích thước màn hình
    window.addEventListener('resize', () => this.onWindowResize());

    // sự kiện bàn phím
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (this.speed >= 0.1) {
            this.speed -= 0.1;
            console.log("speed: ", this.speed);
          }
          break;
        case "ArrowRight":
          if (this.speed <= 4.9) {
            this.speed += 0.1;
            console.log("speed: ", this.speed);
          }
          break;
        default:
      }
    })
  }

  // thay đổi kích thước canvas theo kích thước màn hình
  onWindowResize() {
    if (this.cv) {
      const rect = this.cv.getBoundingClientRect();
      this.cv.width = rect.width;
      this.cv.height = rect.height;
    }
  }

  // kiểm tra sự va chạm giữa các đối tượng
  checkCollision() {
    for (let i = 0; i < this.objectList.length - 1; i += 1) {
      for (let j = i + 1; j < this.objectList.length; j += 1) {
        const objA = this.objectList[i];
        const objB = this.objectList[j];
        let dx = objB.posX - objA.posX;
        let dy = objB.posY - objA.posY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Kiểm tra xem có va chạm không
        if (distance <= objA.radius + objB.radius) {
          // Véc-tơ đơn vị hướng va chạm
          let nx = dx / distance;
          let ny = dy / distance;

          // Tính hiệu vận tốc
          let vxDiff = objA.velocityX - objB.velocityX;
          let vyDiff = objA.velocityY - objB.velocityY;

          // Nếu hai vật thể đang di chuyển rời xa nhau, bỏ qua va chạm
          if (vxDiff * nx + vyDiff * ny < 0) return;

          // Tính toán vận tốc sau va chạm theo bảo toàn động lượng
          let p = (2 * (objA.velocityX * nx + objA.velocityY * ny - objB.velocityX * nx - objB.velocityY * ny)) /
            (objA.mass + objB.mass);

          objA.velocityX -= p * objB.mass * nx;
          objA.velocityY -= p * objB.mass * ny;
          objB.velocityX += p * objA.mass * nx;
          objB.velocityY += p * objA.mass * ny;

          // Đẩy vật thể ra khỏi nhau để tránh bị dính
          let overlap = objA.radius + objB.radius - distance;
          objA.posX -= (overlap / 2) * nx;
          objA.posY -= (overlap / 2) * ny;
          objB.posX += (overlap / 2) * nx;
          objB.posY += (overlap / 2) * ny;
        }
      }
    }
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
