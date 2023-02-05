import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article/article.entity';
import { CreateArticleDto } from 'src/entity/article/dto/create-article.dto';
import { UpdateArticleDto } from 'src/entity/article/dto/update-article-dto';
import { Category } from 'src/entity/category/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

    constructor(@InjectRepository(Article) private articleRepository:Repository<Article>,@InjectRepository(Category) private categoryRepository:Repository<Category>){}

    create(createArticleDto:CreateArticleDto){
        const article:Article = this.articleRepository.create(createArticleDto);
        return this.articleRepository.save(article);
    }

    findAll() {
        return this.articleRepository.find({relations:{category:true}});
    }

    findOne(id: number){
        return this.articleRepository.findOneBy({id});
    }

    async update(id:number, updateArticleDto:UpdateArticleDto){
        try{
            if(updateArticleDto.category.id){
                const category:Category = await this.categoryRepository.findOneBy({id:updateArticleDto.category.id});
                return this.articleRepository.save({id:id,category,...updateArticleDto});
            }
            return this.articleRepository.save({id:id,...updateArticleDto});
        }catch(error){
            throw error;
        }
    }

    async remove(id:number){
        try{
            const article:Article = await this.articleRepository.findOneBy({id:id});
            if(article){
              await this.articleRepository.remove(article);
              return article;
            }
          }catch(error){
            throw error;
          }
    }
}
