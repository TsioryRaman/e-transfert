import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entity/article/article.entity';
import { Category } from 'src/entity/category/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Article,Category])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
