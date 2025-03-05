// src/app/services/text-to-speech.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TextToSpeechService {
    private synth: SpeechSynthesis;
    private voice!: SpeechSynthesisVoice;
    private voices: SpeechSynthesisVoice[] = [];
    private lang: string = "vi-VN";
    private speed: number = 1;
    public onLoad!: Function;

    constructor() {
        this.synth = window.speechSynthesis;
        if (!this.synth) {
            console.error('Web Speech API không được hỗ trợ');
            alert('Web Speech API không được hỗ trợ');
            return;
        }
        const interval = setInterval(() => {
            this.voices = this.synth.getVoices();
            if (!this.voices.length) {
                return;
            }
            clearInterval(interval);
            this.changeLanguage(this.lang);
            this.onLoad();
        }, 10);
    }

    public getLanguageList() {
        return this.voices.map(v => v.name);
    }

    public changeLanguage(lang: string) {
        const voice = this.voices.find(v => v.name == lang);
        if (!voice) {
            console.error('Không hỗ trợ ' + lang);
            alert('Không hỗ trợ ' + lang);
            return;
        }
        this.voice = voice!;
    }

    public changeSpeed(speed: number) {
        this.speed = speed;
    }

    public speak(text: string): void {
        this.stop();
        const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.lang;
        utterance.rate = this.speed;
        utterance.voice = this.voice;
        this.synth.speak(utterance);
    }

    public stop(): void {
        this.synth.cancel();
    }
}
