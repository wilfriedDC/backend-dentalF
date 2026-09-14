export declare const getCabinet: () => Promise<({
    praticiens: {
        id: number;
        cabinetId: number;
        nomComplet: string;
        numeroRPPS: string | null;
        specialite: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
} & {
    id: number;
    nom: string;
    adresse: string | null;
    telephone: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export declare const updateCabinet: (data: {
    nom: string;
    adresse?: string;
    telephone?: string;
    email?: string;
}) => Promise<{
    id: number;
    nom: string;
    adresse: string | null;
    telephone: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getPraticiens: () => Promise<{
    id: number;
    cabinetId: number;
    nomComplet: string;
    numeroRPPS: string | null;
    specialite: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const updatePraticien: (id: number, data: {
    nomComplet: string;
    numeroRPPS?: string;
    specialite?: string;
}) => Promise<{
    id: number;
    cabinetId: number;
    nomComplet: string;
    numeroRPPS: string | null;
    specialite: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const createPraticien: (cabinetId: number, data: {
    nomComplet: string;
    numeroRPPS?: string;
    specialite?: string;
}) => Promise<{
    id: number;
    cabinetId: number;
    nomComplet: string;
    numeroRPPS: string | null;
    specialite: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=settings.service.d.ts.map