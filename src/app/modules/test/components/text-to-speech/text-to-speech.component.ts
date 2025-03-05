import { AfterViewInit, Component } from '@angular/core';
import { TextToSpeechService } from '../../../../services/text-to-speech.service';

@Component({
  selector: 'app-text-to-speech',
  standalone: false,
  
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.scss'
})
export class TextToSpeechComponent implements AfterViewInit {
  text: string = "";

  constructor(
    private textToSpeechService: TextToSpeechService,
  ) { }

  ngAfterViewInit(): void {
    this.textToSpeechService.onLoad = () => {
      console.log(this.textToSpeechService.getLanguageList());
      this.textToSpeechService.changeLanguage("vi-VN");
      this.textToSpeechService.changeSpeed(0.5);
      this.textToSpeechService.speak("1");
    }
  }

  onSpeak() {
    this.textToSpeechService.speak(this.text);
  }
}
