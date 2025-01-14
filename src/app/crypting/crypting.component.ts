import {
  ChangeDetectorRef,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import * as XLSX from 'xlsx'; // Library to handle Excel files
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataTableComponent } from '../data-table/data-table.component';
import { AuthService } from '../shared/services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-crypting', // Component selector for usage in HTML
  standalone: true, // Marks this as a standalone component
  imports: [TranslatePipe, CommonModule, DataTableComponent], // Imported modules and components
  templateUrl: './crypting.component.html', // Path to the component's HTML template
  styleUrl: './crypting.component.scss', // Path to the component's SCSS stylesheet
})
export class CryptingComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDataFromDb();
  }

  headers: string[] = []; // Stores headers from the Excel file
  data: any[] = []; // Stores data rows from the Excel file
  showComponent: boolean = false;

  selectedTable: string = 'valhalla'; // Table par défaut
  pageTitle: string = 'Valhalla'; // Titre par défaut
  // Stocker la reportDate pour chaque table
  reportDates: { [tableName: string]: { date: string; user: string } } = {};
  // Popup
  selectedPlayer: any = null;
  // Date
  reportDate: string | null = '';
  // Variable pour stocker le fichier
  processedWorkbook: XLSX.WorkBook | null = null;

  private apiUrl = environment.apiUrl; // Base URL of the API

  /**
   * Navigates the user to the home page.
   */
  onHome() {
    this.router.navigateByUrl(''); // Redirects to the home route
  }

  // Méthode pour charger une table spécifique et mettre à jour le titre
  loadTable(tableName: string, title: string): void {
    this.selectedTable = tableName; // Met à jour le nom de la table
    this.pageTitle = title; // Met à jour le titre affiché
    this.getDataFromDb();
  }

  /**
   * Handles the import of an Excel file.
   * Reads the file, extracts headers, and populates data.
   */
  onFileChange(event: any): void {
    this.showComponent = true;
    const target: DataTransfer = <DataTransfer>event.target;

    if (target.files.length !== 1) {
      alert('Veuillez sélectionner un seul fichier Excel.');
      return;
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const arrayBuffer: ArrayBuffer = e.target?.result as ArrayBuffer;

      // Lire le fichier Excel
      const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName: string = workbook.SheetNames[0];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Utiliser la feuille Excel défusionnée pour le traitement
      this.processData(sheet);
    };

    reader.readAsArrayBuffer(target.files[0]);
  }

  processData(sheet: XLSX.WorkSheet): void {
    // Convertir la feuille en données JSON brutes
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
      header: 1, // Extraction brute des lignes
      raw: true, // Préserver les valeurs sans les formater
    });

    if (!jsonData || jsonData.length === 0) {
      alert('Aucune donnée trouvée dans le fichier Excel.');
      return;
    }

    // Vérifier si toutes les lignes ont le même nombre de colonnes
    const maxColumns = Math.max(...jsonData.map((row) => row.length));
    const correctedData = jsonData.map((row) => {
      while (row.length < maxColumns) {
        row.push(''); // Ajouter des colonnes manquantes
      }
      return row.slice(0, maxColumns); // Limiter aux colonnes maximales
    });

    // Nettoyage des en-têtes
    this.headers = (correctedData[1] || []).map((header: any) => {
      return String(header || '')
        .trim()
        .replace(/\s+/g, '_');
    });

    // Extraire les données après la deuxième ligne d'en-têtes
    this.data = correctedData.slice(2);

    // Fonction pour nettoyer et convertir les nombres avec des virgules
    const cleanNumber = (value: any) => {
      if (typeof value === 'string') {
        // Retirer les virgules et convertir en nombre
        const cleanedValue = value.replace(/,/g, '');
        return !isNaN(parseInt(cleanedValue)) ? parseInt(cleanedValue) : value;
      }
      return value;
    };

    // Traiter les données pour nettoyer les nombres
    this.data = this.data.map((row: any[]) => {
      return row.map((cell: any) => cleanNumber(cell)); // Nettoyer chaque cellule
    });
  }

  getDataFromDb(): void {
    const tableName = this.selectedTable; // Nom de la table actuellement sélectionnée
    const action = 'get_report_date';

    this.http
      .get<{ report_date: string; user?: string }>(
        `${this.apiUrl}/save_table.php?table=${tableName}&action=${action}`
      )
      .subscribe({
        next: (response) => {
          if (response.report_date && response.user) {
            // Stocker les informations pour la table en cours
            this.reportDates[tableName] = {
              date: response.report_date,
              user: response.user,
            };
          } else {
            console.error('No data found in the response');
          }
        },
        error: (error) => {
          console.error('Error while getting data', error);
        },
      });
  }

  /**
   * Saves the table (headers and data) to the database using an HTTP POST request.
   */
  saveTableToDatabase(): void {
    this.reportDate = window.prompt(
      'Please enter the CST time (for example : 2024-12-23 04:51:27).\nBy clicking "OK", data will be saved in database',
      ''
    );
    if (this.reportDate !== null && this.isValidDateTime(this.reportDate)) {
      console.log('Date :', this.reportDate);
      const payload = {
        headers: this.headers, // Sends headers extracted from the Excel file
        data: this.data, // Sends data rows
        tableName: this.selectedTable, // Sends table name
        user: this.authService.userName, // Sends user
        reportDate: this.reportDate, // Send report date
      };
      console.log(`${this.apiUrl}/save_table.php`);
      // HTTP POST request to save data
      this.http.post(`${this.apiUrl}/save_table.php`, payload).subscribe({
        next: (response) => {
          this.showComponent = false; // Refresh the component
          this.getDataFromDb(); // Update the table
          alert('Data successfully saved !'); // Displays success message
        },
        error: (error) => {
          alert('Error saving data ' + error); // Displays error message
        },
      });
    } else {
      alert('Date not defined or in the wrong format');
    }
  }

  // Méthode pour afficher la date de rapport de la table sélectionnée
  getFormattedReportDate(): string {
    const report = this.reportDates[this.selectedTable]; // Récupère l'objet { date, user }
    if (report) {
      return `${report.date} CST by ${report.user}`;
    }
    return 'Date non définie';
  }

  downloadReport() {
    // Construire le chemin vers le fichier
    const fileName = `${this.selectedTable}-report.xls`;
    const filePath = `/assets/files/${fileName}`;

    // Créer un lien pour le téléchargement
    const anchor = document.createElement('a');
    anchor.href = filePath;
    anchor.download = fileName;
    anchor.click();
  }

  isValidDateTime(input: string): boolean {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return dateTimeRegex.test(input);
  }
}
