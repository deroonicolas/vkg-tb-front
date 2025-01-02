import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

@Component({
  selector: 'app-present',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './present.component.html',
  styleUrl: './present.component.scss',
})
export class PresentComponent {
  constructor(private router: Router) {}
  onHome() {
    this.router.navigateByUrl('');
  }
}
