export class TareaGeneral {
    id: number;
    desc: string;
    puntuek: number;
    constructor(id: number, descripcion: string, puntos: number) {
        this.id = id;
        this.desc = descripcion;
        this.puntuek = puntos;
    }
}
