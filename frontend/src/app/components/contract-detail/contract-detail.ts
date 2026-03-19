import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { ContractService } from '../../services/contract.service';
import { ProductContract } from '../../models/contract.model';

@Component({
    selector: 'app-contract-detail',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatListModule,
        DatePipe,
    ],
    templateUrl: './contract-detail.html',
    styleUrl: './contract-detail.scss',
})
export class ContractDetailComponent implements OnInit {
    private readonly contractService = inject(ContractService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly snackBar = inject(MatSnackBar);

    contract = signal<ProductContract | null>(null);
    loading = signal(true);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.contractService.get(id).subscribe({
                next: (data) => {
                    this.contract.set(data);
                    this.loading.set(false);
                },
                error: () => {
                    this.snackBar.open('Contract not found', 'Close', { duration: 3000 });
                    this.router.navigate(['/contracts']);
                },
            });
        }
    }

    edit(): void {
        this.router.navigate(['/contracts', this.contract()!.id, 'edit']);
    }

    back(): void {
        this.router.navigate(['/contracts']);
    }
}
