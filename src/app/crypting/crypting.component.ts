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
  // onFileChange(event: any): void {
  //   this.showComponent = true;
  //   const target: DataTransfer = <DataTransfer>event.target;

  //   if (target.files.length !== 1) {
  //     alert('Please upload only one Excel file.');
  //     return;
  //   }

  //   const reader: FileReader = new FileReader();

  //   reader.onload = async (e: any) => {
  //     const arrayBuffer: ArrayBuffer = e.target.result;
  //     const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
  //     const sheetName: string = workbook.SheetNames[0];
  //     const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  //     // Detect range explicitly to include all cells
  //     const range = XLSX.utils.decode_range(sheet['!ref'] || '');

  //     // Convert the sheet to JSON, ensuring raw values are retained
  //     const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
  //       header: 1,
  //       raw: true,
  //       range,
  //     });

  //     this.headers = jsonData[0] as string[]; // Use the first row for headers

  //     // Fill in missing headers for columns beyond the first row's length
  //     while (this.headers.length < range.e.c + 1) {
  //       this.headers.push(`Column${this.headers.length + 1}`);
  //     }

  //     // Extract data rows
  //     this.data = jsonData.slice(1);

  //     // Ensure all rows have the same number of columns
  //     this.data = this.data.map((row) => {
  //       while (row.length < this.headers.length) {
  //         row.push(0); // Fill missing values with `null`
  //       }
  //       return row;
  //     });
  //   };

  //   reader.readAsArrayBuffer(target.files[0]);
  // }

  // onFileChange(event: any): void {
  //   this.showComponent = true;
  //   const target: DataTransfer = <DataTransfer>event.target;

  //   if (target.files.length !== 1) {
  //     alert('Please upload only one Excel file.');
  //     return;
  //   }

  //   const reader: FileReader = new FileReader();

  //   reader.onload = async (e: any) => {
  //     const arrayBuffer: ArrayBuffer = e.target.result;
  //     const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
  //     const sheetName: string = workbook.SheetNames[0];
  //     const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  //     // Obtenir la plage de cellules
  //     const range = XLSX.utils.decode_range(sheet['!ref'] || '');
  //     const totalColumns = range.e.c + 1; // Nombre total de colonnes
  //     const headersRowIndex = 1; // Ligne des en-têtes (indexée à 0)
  //     const dataStartRowIndex = headersRowIndex + 1; // Première ligne des données

  //     // Générer les en-têtes en excluant la colonne AE (index 30)
  //     const rawHeaders: string[] = [];
  //     const excludedColumnIndex = 30; // Colonne AE (à ignorer)
  //     for (let col = 0; col < totalColumns; col++) {
  //       if (col === excludedColumnIndex) continue; // Ignorer AE
  //       const cellAddress = XLSX.utils.encode_cell({
  //         r: headersRowIndex,
  //         c: col,
  //       });
  //       const cell = sheet[cellAddress];
  //       rawHeaders.push(
  //         (cell?.v || `Column${col + 1}`).toString().replace(/\s+/g, '')
  //       ); // Nettoyer les espaces
  //     }
  //     this.headers = rawHeaders;

  //     // Extraire les données ligne par ligne en excluant la colonne AE
  //     const rawData: any[] = [];
  //     for (
  //       let rowIndex = dataStartRowIndex;
  //       rowIndex <= range.e.r;
  //       rowIndex++
  //     ) {
  //       const row: any[] = [];
  //       for (let col = 0; col < totalColumns; col++) {
  //         if (col === excludedColumnIndex) continue; // Ignorer AE
  //         const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: col });
  //         const cell = sheet[cellAddress];
  //         row.push(cell?.v || 0); // Ajouter la valeur ou 0
  //       }
  //       rawData.push(row);
  //     }

  //     // Associer les données aux en-têtes (et vérifier la cohérence)
  //     this.data = rawData.map((row) => row.slice(0, this.headers.length));

  //     // Logs finaux pour vérification
  //     console.log('En-têtes sans AE :', this.headers);
  //     console.log('Données sans AE :', this.data);
  //   };

  //   reader.readAsArrayBuffer(target.files[0]);
  // }

  // onFileChange(event: any): void {
  //   // Réinitialiser les données existantes
  //   this.headers = [];
  //   this.data = [];
  //   this.showComponent = false;

  //   const target: DataTransfer = <DataTransfer>event.target;

  //   if (target.files.length !== 1) {
  //     alert('Veuillez sélectionner un seul fichier Excel.');
  //     return;
  //   }

  //   const file = target.files[0];

  //   const reader: FileReader = new FileReader();

  //   reader.onload = (e: any) => {
  //     const arrayBuffer: ArrayBuffer = e.target.result;

  //     try {
  //       // Lire le fichier Excel
  //       const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, {
  //         type: 'array',
  //       });
  //       const sheetName: string = workbook.SheetNames[0];
  //       const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  //       // Extraire toutes les données en JSON
  //       const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
  //         header: 1,
  //         raw: true,
  //       });

  //       // Assigner les headers (deuxième ligne)
  //       this.headers = jsonData[1];

  //       // Extraire les données à partir de la troisième ligne
  //       this.data = jsonData.slice(2);

  //       // Compléter les lignes et colonnes manquantes
  //       this.data = this.data.map((row: any) => {
  //         while (row.length < this.headers.length) {
  //           row.push(0); // Remplacer les cellules vides par 0
  //         }
  //         return row;
  //       });

  //       // Afficher le tableau
  //       this.showComponent = true;

  //       // Forcer la détection des changements Angular
  //       this.cdr.detectChanges();

  //       console.log('Headers:', this.headers);
  //       console.log('Data:', this.data);
  //     } catch (error) {
  //       console.error('Erreur lors du traitement du fichier Excel :', error);
  //       alert(
  //         'Erreur lors de la lecture du fichier. Veuillez vérifier son format.'
  //       );
  //     }
  //   };

  //   reader.readAsArrayBuffer(file);

  //   // Réinitialiser le champ fichier pour permettre un nouveau changement
  //   event.target.value = '';
  // }

  // /**
  //  * Handles the import of an Excel file.
  //  * Reads the file, extracts headers from the second row, and populates data.
  //  */
  // onFileChange(event: any): void {
  //   this.showComponent = true;
  //   const target: DataTransfer = <DataTransfer>event.target;

  //   if (target.files.length !== 1) {
  //     alert('Please upload only one Excel file.');
  //     return;
  //   }

  //   const reader: FileReader = new FileReader();

  //   reader.onload = async (e: ProgressEvent<FileReader>) => {
  //     const arrayBuffer: ArrayBuffer = e.target?.result as ArrayBuffer;
  //     const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
  //     const sheetName: string = workbook.SheetNames[0];
  //     const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  //     // Verify and log the range to ensure it includes all columns
  //     const range = XLSX.utils.decode_range(sheet['!ref'] || '');
  //     console.log('Detected range:', range); // Debugging: Check if AF is included

  //     // Convert the sheet to JSON, ensuring raw values are retained
  //     const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
  //       header: 1,
  //       raw: true,
  //       range,
  //     });

  //     // Headers are in the second row (index 1)
  //     const aeIndex = 30; // Column AE corresponds to index 30
  //     this.headers = (jsonData[1] || []) as string[];

  //     // Fill in missing headers if necessary
  //     while (this.headers.length < range.e.c + 1) {
  //       this.headers.push(`Column${this.headers.length + 1}`);
  //     }

  //     // Remove AE from headers
  //     this.headers = this.headers.filter((_, index) => index !== aeIndex);

  //     // Extract data rows starting from the third row (index 2)
  //     this.data = jsonData.slice(2);

  //     // Ensure all rows are consistent in length and exclude AE column
  //     this.data = this.data.map((row: any[]) => {
  //       // Fill missing values up to total column count
  //       while (row.length < range.e.c + 1) {
  //         row.push(null); // Fill with `null` for missing values
  //       }
  //       // Exclude AE column only
  //       return row.filter((_, index) => index !== aeIndex);
  //     });

  //     // Debugging: Log headers and the first few rows to ensure AF is included
  //     console.log('Headers:', this.headers);
  //     console.log('First data rows:', this.data);
  //   };

  //   reader.readAsArrayBuffer(target.files[0]);
  // }

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

      // Convertir la feuille en tableau pour vérifier les colonnes
      const rawData: any[] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: true,
      });

      console.log('Données brutes avant nettoyage :', rawData);

      // Vérifiez et assurez que chaque colonne est bien distincte
      const cleanedData = rawData.map((row) => {
        return row.map((cell: any) => {
          if (typeof cell === 'string') {
            return cell.trim(); // Supprime les espaces accidentels
          }
          return cell;
        });
      });

      // Reconvertir les données nettoyées en feuille Excel
      const cleanedSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(cleanedData);

      // Créer un nouveau classeur propre
      const newWorkbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, cleanedSheet, 'Feuille1');

      // Enregistrer le nouveau fichier dans une variable
      this.processedWorkbook = newWorkbook;

      // Utiliser le nouveau fichier pour le traitement
      this.processData(this.processedWorkbook);
    };

    reader.readAsArrayBuffer(target.files[0]);
  }

  processData(workbook: XLSX.WorkBook): void {
    const sheetName: string = workbook.SheetNames[0]; // Première feuille du nouveau classeur
    const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

    // Convertir la feuille en données JSON
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      raw: true,
      defval: 0, // Remplit les cellules vides avec une valeur par défaut (chaîne vide)
    });

    if (!jsonData || jsonData.length === 0) {
      alert('Aucune donnée trouvée dans le fichier Excel.');
      return;
    }

    // Nettoyage des en-têtes
    this.headers = (jsonData[1] || []).map((header: any) => {
      return String(header || '')
        .trim()
        .replace(/\s+/g, '_');
    });

    // Extraire les données après la deuxième ligne d'en-têtes
    this.data = jsonData.slice(2);

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

    // Vérifier les données nettoyées
    console.log('Données traitées:', this.data);
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
