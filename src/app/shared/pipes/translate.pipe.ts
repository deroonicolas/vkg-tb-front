import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // Pipe impure pour forcer les mises à jour dynamiques
})
export class TranslatePipe implements PipeTransform {
  private translations: any = {};

  constructor(private translationService: TranslationService) {
    this.translationService.currentTranslations.subscribe((translations) => {
      this.translations = translations;
    });
  }

  transform(key: string): string {
    if (!key || !this.translations) {
      return key; // Si les traductions ne sont pas prêtes, retournez la clé brute
    }

    // Résolution des clés imbriquées
    const translation = this.resolveNestedKey(this.translations, key);
    return translation || key; // Retourne la traduction ou la clé brute si introuvable
  }

  private resolveNestedKey(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : null;
    }, obj);
  }
}
