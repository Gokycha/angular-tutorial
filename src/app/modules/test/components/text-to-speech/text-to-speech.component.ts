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
  lang: string = '';
  langs: string[] = [];

  constructor(
    private textToSpeechService: TextToSpeechService,
  ) { }

  ngAfterViewInit(): void {
    this.textToSpeechService.onLoad = () => {
      this.langs = this.textToSpeechService.getLanguageList();
      this.textToSpeechService.changeLanguage("vi-VN");
      this.textToSpeechService.changeSpeed(0.5);
      this.textToSpeechService.speak("1");
    }
  }

  onSpeak() {
    this.textToSpeechService.speak(this.text);
  }

  onLangChange(lang: string) {
    console.log(lang);
    this.textToSpeechService.changeLanguage(lang);
  }
}
