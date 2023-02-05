import { Category } from "src/entity/category/category.entity";

export class CreateArticleDto {
    name:string;
    description: string;
    isPublished: boolean;
    category?:Category;
}