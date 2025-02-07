import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var cv: any; // OpenCV.js

@Component({
  selector: 'app-detect-face',
  standalone: false,
  templateUrl: './detect-face.component.html',
  styleUrl: './detect-face.component.scss'
})
export class DetectFaceComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('faceCanvas') faceCanvas!: ElementRef<HTMLCanvasElement>;
  devices: any[] = [];
  cameraId: number = 0;
  openCV: any;
  faceCascade: any;
  faceNumber: number = 0;

  async ngAfterViewInit() {
    await this.getDevices();
    await this.waitOpenCV();
    await this.loadCascade();
    this.startCamera(this.cameraId);
    setInterval(() => {
      this.detectFace();
    }, 150);
  }

  async getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.devices = devices.filter(device => device.kind === 'videoinput');
    // console.log(this.devices); // Danh sách các camera
  }

  // Bật camera
  startCamera(cameraId?: any) {
    const deviceId = this.devices[cameraId].deviceId;
    const constraints: MediaStreamConstraints = {
      video: deviceId ? { deviceId: { exact: deviceId } } : true
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Chụp ảnh từ video
  captureFrame() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = this.video.nativeElement.videoWidth;
    canvas.height = this.video.nativeElement.videoHeight;
    ctx.drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  //wait open CV
  async waitOpenCV() {
    this.openCV = await cv;
  }

  changeCamera() {
    this.cameraId = (this.cameraId + 1) % this.devices.length;
    this.startCamera(this.cameraId);
  }

  // Kiểm tra khuôn mặt có nằm trong elip không
  async detectFace() {
    const canvas = this.captureFrame();

    // Chuyển đổi ảnh sang OpenCV Mat
    const src = this.openCV.imread(canvas);
    const gray = new this.openCV.Mat();
    this.openCV.cvtColor(src, gray, this.openCV.COLOR_RGBA2GRAY, 0);

    // Phát hiện khuôn mặt
    const faces = new this.openCV.RectVector();
    const minSize = new this.openCV.Size(50, 50);
    this.faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, minSize);
    this.displayFace(faces);

    // Dọn dẹp OpenCV
    src.delete();
    gray.delete();
    faces.delete();
  }

  displayFace(faces: any) {
    this.faceNumber = faces.size();
    const canvas = this.faceCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const scale = this.video.nativeElement.getBoundingClientRect().height / this.video.nativeElement.videoHeight;
    canvas.width = this.video.nativeElement.videoWidth * scale;
    canvas.height = this.video.nativeElement.videoHeight * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < faces.size(); i++) {
      const face = faces.get(i);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(face.x * scale, face.y * scale, face.width * scale, face.height * scale);
    }
  }

  async loadCascade() {
    const cascadeFile = 'assets/haarcascade_frontalface_default.xml';
    
    // Fetch file từ thư mục assets
    let response = await fetch(cascadeFile);
    let data = await response.arrayBuffer();
    let uint8Array = new Uint8Array(data); 
  
    // Tạo file trong hệ thống file ảo của OpenCV
    this.openCV.FS_createDataFile('/', 'haarcascade_frontalface_default.xml', uint8Array, true, false, false);
  
    // Load file cascade
    this.faceCascade = new this.openCV.CascadeClassifier();
    this.faceCascade.load('haarcascade_frontalface_default.xml');
  }  
}