import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations = new BehaviorSubject<any>({});
  currentTranslations = this.translations.asObservable();
  private ready = new BehaviorSubject<boolean>(false);
  isReady = this.ready.asObservable(); // Observable pour indiquer si les traductions sont prêtes
  currentLang = 'en';

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    this.currentLang = savedLang;
    this.loadTranslations(this.currentLang);
  }

  loadTranslations(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe(
      (data) => {
        this.translations.next(data);
        this.currentLang = lang;
        localStorage.setItem('appLanguage', lang);
      },
      (error) => {
        console.error(`Error loading translations for ${lang}:`, error);
      }
    );
  }

  setLanguage(lang: string) {
    if (lang !== this.currentLang) {
      this.ready.next(false); // Marque les traductions comme non prêtes pendant le chargement
      this.loadTranslations(lang);
    }
  }
}
