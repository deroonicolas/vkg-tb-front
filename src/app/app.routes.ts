import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LawComponent } from './law/law.component';
import { NotationComponent } from './notation/notation.component';
import { PresentComponent } from './present/present.component';
import { CryptingComponent } from './crypting/crypting.component';
import { LoginComponent } from './login/login.component';
import { ResearchCostComponent } from './research-cost/research-cost.component';

export const routes: Routes = [
  { path: 'law', component: LawComponent },
  { path: 'present', component: PresentComponent },
  { path: 'notation', component: NotationComponent },
  { path: 'crypting', component: CryptingComponent },
  { path: 'research-cost', component: ResearchCostComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingPageComponent },
];
