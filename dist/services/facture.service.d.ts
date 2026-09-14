export declare const createFacture: (consultationId: number, remise?: number) => Promise<{
    consultation: {
        patient: {
            id: number;
            nom: string;
            prenom: string;
            sexe: string | null;
            dateNaissance: Date | null;
            adresse: string | null;
            telephone: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
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
    lignes: {
        id: number;
        factureId: number;
        nomActe: string;
        numeroDent: string | null;
        prix: number;
        quantite: number;
        createdAt: Date;
    }[];
} & {
    id: number;
    numero: string;
    consultationId: number;
    total: number;
    remise: number;
    montantDu: number;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getFactures: () => Promise<({
    consultation: {
        patient: {
            id: number;
            nom: string;
            prenom: string;
            sexe: string | null;
            dateNaissance: Date | null;
            adresse: string | null;
            telephone: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
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
    lignes: {
        id: number;
        factureId: number;
        nomActe: string;
        numeroDent: string | null;
        prix: number;
        quantite: number;
        createdAt: Date;
    }[];
} & {
    id: number;
    numero: string;
    consultationId: number;
    total: number;
    remise: number;
    montantDu: number;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getFactureById: (id: number) => Promise<({
    consultation: {
        patient: {
            id: number;
            nom: string;
            prenom: string;
            sexe: string | null;
            dateNaissance: Date | null;
            adresse: string | null;
            telephone: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
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
    lignes: {
        id: number;
        factureId: number;
        nomActe: string;
        numeroDent: string | null;
        prix: number;
        quantite: number;
        createdAt: Date;
    }[];
} & {
    id: number;
    numero: string;
    consultationId: number;
    total: number;
    remise: number;
    montantDu: number;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
//# sourceMappingURL=facture.service.d.ts.map