export declare const createPatient: (data: {
    nom: string;
    prenom: string;
    sexe?: string | null;
    dateNaissance?: string | null;
    adresse?: string | null;
    telephone: string;
    email?: string | null;
}) => Promise<{
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
}>;
export declare const getPatients: (search?: string) => Promise<{
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
}[]>;
export declare const getPatientById: (id: number) => Promise<({
    consultations: ({
        actes: {
            id: number;
            consultationId: number;
            numeroDent: string | null;
            nomActe: string;
            description: string | null;
            prix: number;
        }[];
        facture: {
            id: number;
            numero: string;
            consultationId: number;
            total: number;
            remise: number;
            montantDu: number;
            statut: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        paiements: {
            id: number;
            consultationId: number;
            datePaiement: Date;
            montant: number;
            modePaiement: string | null;
        }[];
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
    })[];
    rendezVous: {
        id: number;
        patientId: number;
        date: Date;
        heure: string;
        motif: string | null;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
} & {
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
}) | null>;
export declare const deletePatient: (id: number) => Promise<{
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
}>;
export declare const updatePatient: (id: number, data: {
    nom?: string;
    prenom?: string;
    sexe?: string | null;
    dateNaissance?: string | null;
    adresse?: string | null;
    telephone?: string;
    email?: string | null;
}) => Promise<{
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
}>;
//# sourceMappingURL=patient.service.d.ts.map