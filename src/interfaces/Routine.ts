export interface Routine {
    _id:      string;
    user:     string;
    activity: string;
    title:    string;
    active:   boolean;
    steps:    Step[];
    __v:      number;
}

export interface Step {
    _id:         string;
    rutina:      string;
    posicion:    number;
    recurso:     string;
    createdAt:   Date;
    updatedAt:   Date;
    __v:         number;
    recursoItem: ResourceItem;
}

export interface ResourceItem {
    _id:       string;
    filename:  string;
    url:       string;
    user:      string;
    title:     string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
