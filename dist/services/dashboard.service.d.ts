export declare const getDashboard: () => Promise<{
    totalPatients: number;
    consultationsToday: number;
    appointmentsToday: ({
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
    })[];
    revenueToday: number;
    totalUnpaid: number;
    upcomingAppointments: ({
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
    })[];
}>;
//# sourceMappingURL=dashboard.service.d.ts.map