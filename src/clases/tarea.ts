export class Tarea {
    id: number;
    description: string;
    limitDate: Date;
    userId: number;
    status: boolean;
    constructor(id: number, descripcion: string, fechaLimite: Date, usuarioAsignado: number, status: boolean) {
        this.id = id;
        this.description = descripcion;
        this.limitDate = fechaLimite;
        this.userId = usuarioAsignado;
        this.status = status;
    }
}
