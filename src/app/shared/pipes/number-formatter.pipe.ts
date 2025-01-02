import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter',
  standalone: true,
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: any): string {
    // Vérifiez si la valeur est null, undefined ou une chaîne vide
    if (value === null || value === undefined || value === '') {
      return ''; // Retournez une chaîne vide pour les valeurs nulles ou vides
    }

    // Vérifiez si la valeur est une chaîne de caractères
    if (typeof value === 'string') {
      return value; // Retournez la chaîne de caractères telle quelle
    }

    // Assurez-vous que la valeur est convertie en nombre
    const numericValue = Number(value);

    // Si la conversion échoue, retournez la valeur d'origine
    if (isNaN(numericValue)) {
      return value.toString(); // Retournez la valeur telle quelle si ce n'est pas un nombre
    }

    // Appliquez le format personnalisé pour les nombres
    if (numericValue < 999950) {
      return (numericValue / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
    } else if (numericValue < 999950000) {
      return (numericValue / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
    } else {
      return (numericValue / 1000000000).toFixed(1).replace(/\.0$/, '') + ' B';
    }
  }
}
