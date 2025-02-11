export interface EmailTemplate {
    id: string;
    name: string;
    category: 'deployment' | 'patch' | 'maintenance' | 'other';
    subject: string;
    template: string;
    fields: {
        name: string;
        key: string;
        type: 'text' | 'textarea' | 'date' | 'richtext';
        placeholder?: string;
    }[];
}

export interface EmailData {
    templateId: string;
    fields: Record<string, string>;
}
