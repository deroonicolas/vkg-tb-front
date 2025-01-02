import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

@Component({
  selector: 'app-data-table',
  standalone: true, // Indicates this is a standalone component
  imports: [CommonModule, TranslatePipe], // Importing required modules and pipes
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() tableName: string = ''; // Nom de la table passé par le parent
  data: any[] = []; // Data fetched from the API
  displayedColumns: string[] = []; // Dynamic columns to display
  columnHeaders: { [key: string]: string } = {}; // Dictionary for custom column headers
  sortDirection: { [key: string]: boolean } = {}; // Stores sorting direction for each column
  // Popup
  selectedRow: any = null; // Stocke la ligne sélectionnée
  showPopup = false; // Contrôle l'affichage de la popup

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const tableName = 'valhalla'; // Table name to be sent to the API
    this.dataService.getData(tableName).subscribe((response) => {
      // Filter data: include rows where Might > 0 or PLAYER includes 'TOTALS'
      this.data = response.filter(
        (row: any) =>
          row.Volume > 0 || (row.PLAYER && row.PLAYER.includes('TOTALS'))
      );

      // Dynamically set columns, excluding specific ones
      if (this.data.length > 0) {
        this.displayedColumns = Object.keys(this.data[0]).filter(
          (column) =>
            column !== 'increment' &&
            column !== 'report_date' &&
            column !== 'TLevel' &&
            column !== 'user' &&
            column !== 'QuickMarch'
        );

        // Populate the custom headers dictionary
        this.displayedColumns.forEach((column) => {
          this.columnHeaders[column] = this.getCustomHeader(column);
          this.sortDirection[column] = true; // Default sort direction is ascending
        });
      }
    });
  }

  ngOnChanges(): void {
    if (this.tableName) {
      // Charger les données à chaque changement de table
      this.dataService.getData(this.tableName).subscribe((response) => {
        //Filtrer les données pour inclure les lignes où Might > 0 ou PLAYER inclut 'TOTALS'
        this.data = response.filter(
          (row: any) =>
            row.Volume > 0 || (row.PLAYER && row.PLAYER.includes('TOTALS'))
        );

        // Dynamically set columns, excluding specific ones
        if (this.data.length > 0) {
          this.displayedColumns = Object.keys(this.data[0]).filter(
            (column) =>
              column !== 'increment' &&
              column !== 'report_date' &&
              column !== 'TLevel' &&
              column !== 'user' &&
              column !== 'QuickMarch'
          );

          // Populate the custom headers dictionary
          this.displayedColumns.forEach((column) => {
            this.columnHeaders[column] = this.getCustomHeader(column);
            this.sortDirection[column] = true; // Default sort direction is ascending
          });
        }
      });
    }
  }

  /**
   * Replaces all occurrences in the rows based on a specific regex pattern.
   */
  replaceAllOccurrences(rows: any[]): any[] {
    const regex = /Quick March Chest [01]Ancients' Chest/g; // Pattern for matching '0' or '1'
    const replacementValue = ' / '; // Replacement string

    return rows.map((row) => {
      Object.keys(row).forEach((key) => {
        if (typeof row[key] === 'string' && regex.test(row[key])) {
          row[key] = row[key].replace(regex, replacementValue); // Replace matching pattern
        }
      });
      return row; // Return the modified row
    });
  }

  /**
   * Returns a custom header name for columns.
   */
  getCustomHeader(column: string): string {
    const customHeaders: { [key: string]: string } = {
      CcCr: 'Commons &\nRares',
      CeCi: 'Epics &\nStrongholds',
      co5: '5',
      co10: '10',
      co15: '15',
      co20: '20',
      co25: '25',
      ra10: '10',
      ra15: '15',
      ra20: '20',
      ra25: '25',
      ra30: '30',
      ep15: '15',
      ep20: '20',
      ep25: '25',
      ep30: '30',
      ep35: '35',
      st10: '10',
      st15: '15',
      st20: '20',
      st25: '25',
      st30: '30',
      AncientPoints: 'Ancient\nPoints',
      AncientGuardian: 'Ancient\nGuardian',
      AncientChests: 'Ancient\nChests',
      QuickMarch: 'Quick\nMarch',
    };

    return customHeaders[column] || column; // Return custom name or the original column name
  }

  /**
   * Checks if a value is a number.
   */
  isNumber(value: any): boolean {
    return !isNaN(value) && typeof value === 'number'; // True if value is a valid number
  }

  /**
   * Sorts the data for a given column when the header is clicked.
   */
  sortData(column: string): void {
    // Toggle the sort direction
    this.sortDirection[column] = !this.sortDirection[column];

    // Sort data based on column and direction
    this.data.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) {
        return this.sortDirection[column] ? -1 : 1; // Ascending or descending
      } else if (valA > valB) {
        return this.sortDirection[column] ? 1 : -1;
      }
      return 0; // Values are equal
    });
  }

  /**
   * Formats a cell's value, extracting numbers after specific keywords.
   */
  formatCell(value: any): string {
    // If the value is a string containing "Chest", apply transformation
    if (typeof value === 'string' && value.includes('Chest')) {
      const quickMatch = value.match(/Quick March Chest (\d+)/); // Match "Quick March Chest"
      const ancientMatch = value.match(/Ancients' Chest (\d+)/); // Match "Ancients' Chest"

      const quickMarch = quickMatch ? `- March Chest: ${quickMatch[1]}` : '';
      const ancientsChest = ancientMatch
        ? `- Ancient Chest: ${ancientMatch[1]}`
        : '';

      return [quickMarch, ancientsChest].filter((part) => part).join('<br>'); // Join with line breaks
    }

    // If the value is a number, format it with commas
    if (typeof value === 'number') {
      return value.toLocaleString('en-US'); // Add comma separators
    }

    // Return raw value as a fallback
    return value || '';
  }

  openPopup(row: any): void {
    this.selectedRow = row; // Stocke la ligne cliquée
    this.showPopup = true; // Active l'affichage de la popup
  }

  closePopup(): void {
    this.showPopup = false; // Désactive la popup
  }
}
