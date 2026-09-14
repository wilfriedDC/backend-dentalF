export declare const createOdontogramme: (data: {
    consultationId: number;
    numeroDent: string;
    statut: string;
    face?: string;
    commentaire?: string;
}) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string;
    statut: string;
    face: string | null;
    commentaire: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getByConsultation: (consultationId: number) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string;
    statut: string;
    face: string | null;
    commentaire: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const getByPatient: (patientId: number) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string;
    statut: string;
    face: string | null;
    commentaire: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const upsertToothForConsultation: (data: {
    consultationId: number;
    numeroDent: string;
    statut: string;
    commentaire?: string;
}) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string;
    statut: string;
    face: string | null;
    commentaire: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getById: (id: number) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string;
    statut: string;
    face: string | null;
    commentaire: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const updateOdontogramme: (id: number, data: {
    numeroDent?: string;
    statut?: string;
    face?: string;
    commentaire?: string;
}) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string;
    statut: string;
    face: string | null;
    commentaire: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteOdontogramme: (id: number) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string;
    statut: string;
    face: string | null;
    commentaire: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=odontogramme.service.d.ts.map