export interface Routine {
    _id:    string;
    title:  string;
    active: boolean;
    user:   string;
    __v:    number;
}

export interface RoutineStep {
    rutina: string;
    posicion: number;
    recurso: string;
}