export declare const createRendezVous: (data: {
    patientId: number;
    date: string;
    heure: string;
    motif?: string;
    statut?: string;
}) => Promise<{
    id: number;
    patientId: number;
    date: Date;
    heure: string;
    motif: string | null;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getRendezVous: () => Promise<({
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
    date: Date;
    heure: string;
    motif: string | null;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const getRendezVousById: (id: number) => Promise<({
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
    date: Date;
    heure: string;
    motif: string | null;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const updateRendezVous: (id: number, data: {
    date?: string;
    heure?: string;
    motif?: string;
    statut?: string;
}) => Promise<{
    id: number;
    patientId: number;
    date: Date;
    heure: string;
    motif: string | null;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteRendezVous: (id: number) => Promise<{
    id: number;
    patientId: number;
    date: Date;
    heure: string;
    motif: string | null;
    statut: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=rendezvous.service.d.ts.map