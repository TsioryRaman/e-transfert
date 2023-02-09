import { Article } from "./article/article.entity";
import { Category } from "./category/category.entity";
import { File } from "./fileTransfert/file.entity";
import { Filetransfert } from "./fileTransfert/filetransfert.entity";
import { User } from "./user/user.entity";

export const entities = [Article, Category, User, Filetransfert, File]