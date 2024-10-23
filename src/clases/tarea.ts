export class Tarea {
    id: number;
    description: string;
    limitDate: Date;
    userId: number;

    constructor(id: number, descripcion: string, fechaLimite: Date, usuarioAsignado: number) {
        this.id = id;
        this.description = descripcion;
        this.limitDate = fechaLimite;
        this.userId = usuarioAsignado;
    }
}
