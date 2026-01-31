export interface Publication {
    id: number;
    title: string;
    authors: string;
    journal: string;
    year: number;
    link?: string;
}

export interface Forum {
    id: number;
    title: string;
    event_date: string;
    host: string;
    speaker: string;
    description: string;
    bilibili_id: string;
    image_url?: string;
    created_at?: Date;
    updated_at?: Date;
}
