import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { ContractService } from '../../services/contract.service';
import { ProductContract } from '../../models/contract.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
    selector: 'app-contract-list',
    standalone: true,
    imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        DatePipe,
    ],
    templateUrl: './contract-list.html',
    styleUrl: './contract-list.scss',
})
export class ContractListComponent implements OnInit {
    private readonly contractService = inject(ContractService);
    private readonly router = inject(Router);
    private readonly snackBar = inject(MatSnackBar);
    private readonly dialog = inject(MatDialog);

    contracts = signal<ProductContract[]>([]);
    loading = signal(true);
    displayedColumns = ['contractorName', 'contractorId', 'productName', 'contractDate', 'actions'];

    ngOnInit(): void {
        this.loadContracts();
    }

    loadContracts(): void {
        this.loading.set(true);
        this.contractService.list().subscribe({
            next: (data) => {
                this.contracts.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.snackBar.open('Failed to load contracts', 'Close', { duration: 3000 });
                this.loading.set(false);
            },
        });
    }

    createContract(): void {
        this.router.navigate(['/contracts/new']);
    }

    editContract(id: string): void {
        this.router.navigate(['/contracts', id, 'edit']);
    }

    viewContract(id: string): void {
        this.router.navigate(['/contracts', id]);
    }

    deleteContract(contract: ProductContract): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Delete Contract',
                message: `Are you sure you want to delete the contract for "${contract.contractorName}"?`,
            },
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                this.contractService.delete(contract.id).subscribe({
                    next: () => {
                        this.snackBar.open('Contract deleted', 'Close', { duration: 3000 });
                        this.loadContracts();
                    },
                    error: () => {
                        this.snackBar.open('Failed to delete contract', 'Close', { duration: 3000 });
                    },
                });
            }
        });
    }
}
