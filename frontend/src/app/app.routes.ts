import { Routes } from '@angular/router';
import { ContractListComponent } from './components/contract-list/contract-list';
import { ContractFormComponent } from './components/contract-form/contract-form';
import { ContractDetailComponent } from './components/contract-detail/contract-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'contracts', pathMatch: 'full' },
    { path: 'contracts', component: ContractListComponent },
    { path: 'contracts/new', component: ContractFormComponent },
    { path: 'contracts/:id', component: ContractDetailComponent },
    { path: 'contracts/:id/edit', component: ContractFormComponent },
];
