import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../entity/category/dto/create-category.dto';
import { UpdateCategoryDto } from '../entity/category/dto/update-category-dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto){
    try{
      return await this.categoryService.create(createCategoryDto);
    }catch(error){
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try{
      return await this.categoryService.findAll();
    }catch(error){
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id(\\d+)')
  async findOne(@Param('id') id: string) {
    try{
      const category = await this.categoryService.findOne(+id);
      if(!category){
        throw new HttpException('Categorie introuvable', HttpStatus.NOT_FOUND);
      }
      return category;
    }catch(error){
      throw error;
    }
  }

  @Patch(':id(\\d+)')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try{
      return this.categoryService.update(+id, updateCategoryDto);
    }catch(error){
      throw new HttpException('Categorie non mis a jour', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id(\\d+)')
  async remove(@Param('id') id: string) {
    try{
      const category = await this.categoryService.remove(+id);
      if(!category){
        throw new HttpException("Categorie a supprimer introuvable",HttpStatus.NOT_FOUND);
      }
      return category;
    }catch(error){
      throw error
    }
  }
}
