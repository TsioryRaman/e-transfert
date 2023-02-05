import { Body, Controller, Delete, Get, HttpException, HttpStatus, Injectable, Param, Patch, Post } from '@nestjs/common';
import { CreateArticleDto } from 'src/entity/article/dto/create-article.dto';
import { UpdateArticleDto } from 'src/entity/article/dto/update-article-dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {

    constructor(private readonly articleService:ArticleService){}

    @Post()
    async create(@Body() createArticleDto: CreateArticleDto){
      try{
        return await this.articleService.create(createArticleDto);
      }catch(error){
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    }
  
    @Get()
    async findAll() {
      try{
        return await this.articleService.findAll();
      }catch(error){
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      try{
        const article = await this.articleService.findOne(+id);
        if(!article){
          throw new HttpException('Article introuvable', HttpStatus.NOT_FOUND);
        }
        return article;
      }catch(error){
        throw error;
      }
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
      try{
        console.log(updateArticleDto);
        return this.articleService.update(+id, updateArticleDto);
      }catch(error){
        throw new HttpException('Article non mis a jour', HttpStatus.FORBIDDEN);
      }
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      try{
        const article = await this.articleService.remove(+id);
        if(!article){
          throw new HttpException("Article a supprimer introuvable",HttpStatus.NOT_FOUND);
        }
        return article;
      }catch(error){
        throw error
      }
    }
}
