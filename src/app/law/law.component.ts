import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-law',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './law.component.html',
  styleUrls: ['./law.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LawComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  onHome() {
    this.router.navigateByUrl('');
  }

  ngOnInit() {
    // Désactive le défilement global
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    // Réactive le défilement global lorsque le composant est détruit
    document.body.style.overflow = 'auto';
  }
}
