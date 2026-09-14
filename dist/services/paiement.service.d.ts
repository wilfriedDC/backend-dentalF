export declare const createPaiement: (data: {
    consultationId: number;
    montant: number;
    modePaiement?: string;
}) => Promise<{
    id: number;
    consultationId: number;
    datePaiement: Date;
    montant: number;
    modePaiement: string | null;
}>;
export declare const getPaiements: () => Promise<({
    consultation: {
        id: number;
        patientId: number;
        dateConsultation: Date;
        motifConsultation: string;
        observation: string | null;
        prochainRdvDate: Date | null;
        prochainRdvHeure: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: number;
    consultationId: number;
    datePaiement: Date;
    montant: number;
    modePaiement: string | null;
})[]>;
export declare const getPaiementsByConsultation: (consultationId: number) => Promise<{
    id: number;
    consultationId: number;
    datePaiement: Date;
    montant: number;
    modePaiement: string | null;
}[]>;
export declare const getPaiementById: (id: number) => Promise<{
    id: number;
    consultationId: number;
    datePaiement: Date;
    montant: number;
    modePaiement: string | null;
} | null>;
export declare const updatePaiement: (id: number, data: {
    montant?: number;
    modePaiement?: string;
}) => Promise<{
    id: number;
    consultationId: number;
    datePaiement: Date;
    montant: number;
    modePaiement: string | null;
}>;
export declare const deletePaiement: (id: number) => Promise<{
    id: number;
    consultationId: number;
    datePaiement: Date;
    montant: number;
    modePaiement: string | null;
}>;
//# sourceMappingURL=paiement.service.d.ts.map