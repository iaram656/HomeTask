export class PenalizationOrokorra {
    id : number;
    desc: string;
    puntuek: number;
    constructor(id: number, reason: string, userId: number, date: Date, points: number) {
        this.id = id;
        this.desc = reason;
        this.puntuek = points;
    }
}
