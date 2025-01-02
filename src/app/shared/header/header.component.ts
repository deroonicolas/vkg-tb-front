import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private translationService: TranslationService,
    public authService: AuthService
  ) {}

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  onLogin() {
    this.router.navigateByUrl('login');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('');
    alert('You have been successfully logged out');
  }
}
