export declare const createActe: (data: {
    consultationId: number;
    numeroDent?: string;
    nomActe: string;
    description?: string;
    prix: number;
}) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string | null;
    nomActe: string;
    description: string | null;
    prix: number;
}>;
export declare const getActes: () => Promise<({
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
    numeroDent: string | null;
    nomActe: string;
    description: string | null;
    prix: number;
})[]>;
export declare const getActesByConsultation: (consultationId: number) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string | null;
    nomActe: string;
    description: string | null;
    prix: number;
}[]>;
export declare const getActeById: (id: number) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string | null;
    nomActe: string;
    description: string | null;
    prix: number;
} | null>;
export declare const updateActe: (id: number, data: {
    numeroDent?: string;
    nomActe?: string;
    description?: string;
    prix?: number;
}) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string | null;
    nomActe: string;
    description: string | null;
    prix: number;
}>;
export declare const deleteActe: (id: number) => Promise<{
    id: number;
    consultationId: number;
    numeroDent: string | null;
    nomActe: string;
    description: string | null;
    prix: number;
}>;
//# sourceMappingURL=acte.service.d.ts.map