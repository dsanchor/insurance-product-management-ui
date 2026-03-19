import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContractService } from '../../services/contract.service';

@Component({
    selector: 'app-contract-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './contract-form.html',
    styleUrl: './contract-form.scss',
})
export class ContractFormComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly contractService = inject(ContractService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly snackBar = inject(MatSnackBar);

    form!: FormGroup;
    isEditMode = signal(false);
    loading = signal(false);
    contractId = signal<string | null>(null);

    ngOnInit(): void {
        this.form = this.fb.group({
            contractorName: ['', Validators.required],
            contractorId: ['', Validators.required],
            contactEmail: ['', Validators.email],
            contactPhone: [''],
            productName: ['', Validators.required],
        });

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode.set(true);
            this.contractId.set(id);
            this.loadContract(id);
        }
    }

    private loadContract(id: string): void {
        this.loading.set(true);
        this.contractService.get(id).subscribe({
            next: (contract) => {
                this.form.patchValue({
                    contractorName: contract.contractorName,
                    contractorId: contract.contractorId,
                    contactEmail: contract.contactEmail || '',
                    contactPhone: contract.contactPhone || '',
                    productName: contract.productName,
                });
                this.loading.set(false);
            },
            error: () => {
                this.snackBar.open('Contract not found', 'Close', { duration: 3000 });
                this.router.navigate(['/contracts']);
            },
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;

        const data = this.form.value;
        this.loading.set(true);

        if (this.isEditMode()) {
            this.contractService.update(this.contractId()!, data).subscribe({
                next: () => {
                    this.snackBar.open('Contract updated successfully', 'Close', { duration: 3000 });
                    this.router.navigate(['/contracts']);
                },
                error: () => {
                    this.snackBar.open('Failed to update contract', 'Close', { duration: 3000 });
                    this.loading.set(false);
                },
            });
        } else {
            this.contractService.create(data).subscribe({
                next: () => {
                    this.snackBar.open('Contract created successfully', 'Close', { duration: 3000 });
                    this.router.navigate(['/contracts']);
                },
                error: () => {
                    this.snackBar.open('Failed to create contract', 'Close', { duration: 3000 });
                    this.loading.set(false);
                },
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/contracts']);
    }
}
