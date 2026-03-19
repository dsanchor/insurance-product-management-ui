export interface ProductContract {
    id: string;
    contractorName: string;
    contractorId: string;
    contactEmail?: string;
    contactPhone?: string;
    productName: string;
    contractDate: string;
}

export interface NewContractRequest {
    contractorName: string;
    contractorId: string;
    contactEmail?: string;
    contactPhone?: string;
    productName: string;
}

export interface UpdateContractRequest {
    contractorName: string;
    contractorId: string;
    contactEmail?: string;
    contactPhone?: string;
    productName: string;
}
