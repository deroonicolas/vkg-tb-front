import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
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
    public authService: AuthService
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
      alert('Please upload only one Excel file.');
      return;
    }

    const reader: FileReader = new FileReader();

    reader.onload = async (e: any) => {
      const arrayBuffer: ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName: string = workbook.SheetNames[0];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Detect range explicitly to include all cells
      const range = XLSX.utils.decode_range(sheet['!ref'] || '');

      // Convert the sheet to JSON, ensuring raw values are retained
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: true,
        range,
      });

      this.headers = jsonData[0] as string[]; // Use the first row for headers

      // Fill in missing headers for columns beyond the first row's length
      while (this.headers.length < range.e.c + 1) {
        this.headers.push(`Column${this.headers.length + 1}`);
      }

      // Extract data rows
      this.data = jsonData.slice(1);

      // Ensure all rows have the same number of columns
      this.data = this.data.map((row) => {
        while (row.length < this.headers.length) {
          row.push(0); // Fill missing values with `null`
        }
        return row;
      });
    };

    reader.readAsArrayBuffer(target.files[0]);
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
