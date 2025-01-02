import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { NumberFormatterPipe } from '../shared/pipes/number-formatter.pipe';
import { Router } from '@angular/router';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

@Component({
  selector: 'app-research-cost',
  standalone: true,
  imports: [CommonModule, NumberFormatterPipe, TranslatePipe],
  templateUrl: './research-cost.component.html',
  styleUrl: './research-cost.component.scss',
})
export class ResearchCostComponent {
  sheets: string[] = []; // Liste des feuilles
  data: any[][] = []; // Données de la feuille active
  workbook: XLSX.WorkBook | null = null; // Contenu du fichier Excel
  selectedSheet: string | null = null; // Feuille actuellement sélectionnée

  constructor(private router: Router, private http: HttpClient) {}

  onHome() {
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    this.loadExcel();
  }

  loadExcel(): void {
    const filePath = 'assets/files/Academ_Research_Costs.xlsx'; // Chemin du fichier

    // Charger le fichier Excel
    this.http
      .get(filePath, { responseType: 'arraybuffer' })
      .subscribe((data) => {
        this.workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        this.sheets = this.workbook.SheetNames; // Récupérer les noms des feuilles

        // Charger la première feuille par défaut
        if (this.sheets.length > 0) {
          this.loadSheet(this.sheets[0]);
        }
      });
  }

  loadSheet(sheetName: string): void {
    this.selectedSheet = sheetName; // Mémorise la feuille sélectionnée
    if (this.workbook) {
      const worksheet = this.workbook.Sheets[sheetName];
      this.data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1, // Données brutes avec les en-têtes
        defval: '', // Remplir les cellules vides
      }) as any[][];
    }
  }
}
