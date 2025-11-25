export class CreateBookDto {
    title: string;
    author: string;
    description?: string;
    isRead?: boolean;
    rating?: number;
}
