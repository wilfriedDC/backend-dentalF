interface ActeInput {
    numeroDent?: string | null;
    nomActe: string;
    description?: string | null;
    prix: number;
}
export declare const createConsultation: (data: {
    patientId: number;
    motifConsultation: string;
    observation?: string | null;
    prochainRdvDate?: string | null;
    prochainRdvHeure?: string | null;
    acte?: ActeInput | null;
    actes?: ActeInput[];
    paiement?: {
        montant: number;
        modePaiement?: string | null;
    } | null;
}) => Promise<({
    actes: {
        id: number;
        consultationId: number;
        numeroDent: string | null;
        nomActe: string;
        description: string | null;
        prix: number;
    }[];
    paiements: {
        id: number;
        consultationId: number;
        datePaiement: Date;
        montant: number;
        modePaiement: string | null;
    }[];
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
}) | null>;
export declare const getConsultations: () => Promise<({
    actes: {
        id: number;
        consultationId: number;
        numeroDent: string | null;
        nomActe: string;
        description: string | null;
        prix: number;
    }[];
    paiements: {
        id: number;
        consultationId: number;
        datePaiement: Date;
        montant: number;
        modePaiement: string | null;
    }[];
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
})[]>;
export declare const getConsultationById: (id: number) => Promise<({
    actes: {
        id: number;
        consultationId: number;
        numeroDent: string | null;
        nomActe: string;
        description: string | null;
        prix: number;
    }[];
    paiements: {
        id: number;
        consultationId: number;
        datePaiement: Date;
        montant: number;
        modePaiement: string | null;
    }[];
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
}) | null>;
export declare const updateConsultation: (id: number, data: {
    motifConsultation?: string;
    observation?: string;
    prochainRdvDate?: string;
    prochainRdvHeure?: string;
}) => Promise<{
    id: number;
    patientId: number;
    dateConsultation: Date;
    motifConsultation: string;
    observation: string | null;
    prochainRdvDate: Date | null;
    prochainRdvHeure: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteConsultation: (id: number) => Promise<{
    id: number;
    patientId: number;
    dateConsultation: Date;
    motifConsultation: string;
    observation: string | null;
    prochainRdvDate: Date | null;
    prochainRdvHeure: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getConsultationSummary: (id: number) => Promise<{
    consultation: {
        id: number;
        dateConsultation: Date;
        motifConsultation: string;
        observation: string | null;
        prochainRdvDate: Date | null;
        prochainRdvHeure: string | null;
    };
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
    actes: {
        id: number;
        consultationId: number;
        numeroDent: string | null;
        nomActe: string;
        description: string | null;
        prix: number;
    }[];
    paiements: {
        id: number;
        consultationId: number;
        datePaiement: Date;
        montant: number;
        modePaiement: string | null;
    }[];
    finances: {
        total: number;
        avance: number;
        reste: number;
    };
} | null>;
export declare const getFullConsultation: (id: number) => Promise<({
    actes: {
        id: number;
        consultationId: number;
        numeroDent: string | null;
        nomActe: string;
        description: string | null;
        prix: number;
    }[];
    odontogrammes: {
        id: number;
        consultationId: number;
        numeroDent: string;
        statut: string;
        face: string | null;
        commentaire: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    paiements: {
        id: number;
        consultationId: number;
        datePaiement: Date;
        montant: number;
        modePaiement: string | null;
    }[];
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
}) | null>;
export declare const addPaiement: (consultationId: number, data: {
    montant: number;
    modePaiement?: string | null;
}) => Promise<({
    actes: {
        id: number;
        consultationId: number;
        numeroDent: string | null;
        nomActe: string;
        description: string | null;
        prix: number;
    }[];
    paiements: {
        id: number;
        consultationId: number;
        datePaiement: Date;
        montant: number;
        modePaiement: string | null;
    }[];
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
}) | null>;
export {};
//# sourceMappingURL=consultation.service.d.ts.map