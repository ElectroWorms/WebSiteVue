export interface Activity {
    state:   boolean;
    message: string;
    items:   ActivityItem[];
}

export interface ActivityItem {
    _id:      string;
    title:    string;
    user:     string;
    url:      string;
    filename: string;
    active:   boolean;
    __v:      number;
}