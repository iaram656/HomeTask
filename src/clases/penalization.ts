export class Penalization {
    id : number;
    reason: string;
    userId: number;
    date: Date;
    points: number;
    penId: number;
    constructor(id: number, reason: string, userId: number, date: Date, points: number, penId: number) {
        this.id = id;
        this.reason = reason;
        this.userId = userId;
        this.date = date;
        this.points = points;
        this.penId = penId;
    }
}
