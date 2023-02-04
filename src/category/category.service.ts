import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../entity/category/dto/create-category.dto';
import { UpdateCategoryDto } from '../entity/category/dto/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoriesRepository:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find({select:{name:true}});
  }

  findOne(id: number) {
    return this.categoriesRepository.findOneBy({id});
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.save({id:id,...updateCategoryDto});
  }

  async remove(id: number) {
      try{
        const category = await this.categoriesRepository.findOneBy({id:id});
        if(category){
          await this.categoriesRepository.remove(category);
          return category;
        }
      }catch(error){
        throw error;
      }
  }
}
