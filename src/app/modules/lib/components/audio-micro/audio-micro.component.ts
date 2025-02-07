import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-micro',
  standalone: false,

  templateUrl: './audio-micro.component.html',
  styleUrl: './audio-micro.component.scss'
})
export class AudioMicroComponent {
  audioContext!: AudioContext;
  analyser!: AnalyserNode;
  dataArray!: Uint8Array;
  canvas!: HTMLCanvasElement;
  canvasCtx!: CanvasRenderingContext2D;
  stream!: MediaStream;

  async startAudioVisualization() {
    // Yêu cầu quyền truy cập microphone
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Khởi tạo AudioContext
    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaStreamSource(this.stream);

    // Tạo bộ phân tích tần số
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256; // Độ phân giải phân tích

    // Tạo mảng dữ liệu để lưu biên độ
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);

    // Kết nối micro với bộ phân tích
    source.connect(this.analyser);

    // Bắt đầu vẽ animation
    this.draw();
  }

  draw() {
    console.log(this.dataArray);
    
    if (!this.canvas) return;
    requestAnimationFrame(() => this.draw());

    // Lấy dữ liệu biên độ
    this.analyser.getByteFrequencyData(this.dataArray);

    // Xóa canvas
    this.canvasCtx.fillStyle = 'rgba(103, 232, 255, 0.2)';
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Vẽ animation dạng thanh (bar)
    const barWidth = (this.canvas.width / this.dataArray.length) * 2;
    let barHeight;
    let x = 0;

    for (let i = 0; i < this.dataArray.length; i++) {
      barHeight = this.dataArray[i];

      this.canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
      this.canvasCtx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }
  }

  stopVisualization() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.audioContext.close();
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('visualizer') as HTMLCanvasElement;
    this.canvasCtx = this.canvas.getContext('2d')!;
  }
}
