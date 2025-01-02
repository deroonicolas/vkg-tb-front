import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-notation',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './notation.component.html',
  styleUrl: './notation.component.scss',
})
export class NotationComponent implements OnInit {
  constructor(private router: Router) {}

  currentTable: string | null = null; // Gère l'état du tableau visible

  ngOnInit(): void {
    this.currentTable = 'valhalla';
  }

  loadTable(tableName: string): void {
    this.currentTable = tableName; // Affecte le nom du tableau à afficher
  }

  onHome() {
    this.currentTable = null; // Réinitialise l'affichage
    this.router.navigateByUrl('');
  }
}
