import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { S3Service } from "../s3/s3.service";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly s3Service: S3Service
  ){}

  private async slugGenerator(title: string){
    let slug = title
    .toLowerCase()
    .replace(/[^\p{L}0-9\s\u200C-]/gu, '')
    .replace(/[\s_\u200C]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    + '-' + Math.random().toString(36).substring(2, 6);

    const validateUniqueSlug = await this.categoryRepository.existsBy({ slug })

    if(validateUniqueSlug){
      slug = await this.slugGenerator(title)
    }

    return slug
  }

  public async createNewCategory(data: Omit<CreateCategoryDTO, 'image'>, image: Express.Multer.File){
    const slug = await this.slugGenerator(data.title)

    const validateUniqueTitle = await this.categoryRepository.existsBy({ title: data.title })

    if(validateUniqueTitle){
      throw new ConflictException('category already exist')
    }

    const { url } = await this.s3Service.uploadFile(image, 'images')

    const categoryData: Partial<CategoryEntity> = {
      title: data.title,
      parent_id: data.parent_id,
      slug,
      image: url
    }
    const newCategory = this.categoryRepository.create(categoryData)
    return await this.categoryRepository.save(newCategory)
  }
}