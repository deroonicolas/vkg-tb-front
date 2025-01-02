import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { TranslationService } from '../shared/services/translation.service';
import { HeaderComponent } from '../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe, HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {}

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  onLaw() {
    this.router.navigateByUrl('law');
  }

  onNotation() {
    this.router.navigateByUrl('notation');
  }

  onPresent() {
    this.router.navigateByUrl('present');
  }

  onCrypting() {
    this.router.navigateByUrl('crypting');
  }

  onResearch() {
    this.router.navigateByUrl('research-cost');
  }
}
