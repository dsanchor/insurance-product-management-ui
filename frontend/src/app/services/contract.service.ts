import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductContract, NewContractRequest, UpdateContractRequest } from '../models/contract.model';
import { getRuntimeConfig } from '../runtime-config';

@Injectable({ providedIn: 'root' })
export class ContractService {
    private readonly http = inject(HttpClient);

    private get baseUrl(): string {
        return `${getRuntimeConfig().apiBaseUrl}/contracts`;
    }

    list(): Observable<ProductContract[]> {
        return this.http.get<ProductContract[]>(this.baseUrl);
    }

    get(id: string): Observable<ProductContract> {
        return this.http.get<ProductContract>(`${this.baseUrl}/${id}`);
    }

    create(request: NewContractRequest): Observable<ProductContract> {
        return this.http.post<ProductContract>(this.baseUrl, request);
    }

    update(id: string, request: UpdateContractRequest): Observable<ProductContract> {
        return this.http.put<ProductContract>(`${this.baseUrl}/${id}`, request);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
