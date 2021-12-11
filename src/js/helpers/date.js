import { format } from 'date-dns';

export function formatDate(str, type) {
    const date = new Date(str);
    return format(date, type);
}