import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isRead?: boolean;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating?: number;
}
