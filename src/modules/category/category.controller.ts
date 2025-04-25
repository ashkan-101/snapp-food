import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dtos/create-category.dto";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MIME_TYPES } from "src/common/enums/mimeTypes.enum";
import { UploadFileS3 } from "src/common/interceptors/upload-file.interceptor";
import { IMAGE_MIME_TYPES } from "src/common/enums/image-mimeTypes";
import { ValidateFile } from "src/common/decorators/validate-file.decorator";

@ApiTags('category')
@Controller('/api/v1/category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ){}

  @ApiOperation({ summary: 'create new category' })
  @ApiConsumes(MIME_TYPES.MULTIPART_FORM_DATA, MIME_TYPES.APPLICATION_JSON)
  @ApiBody({ type: CreateCategoryDTO })
  @ApiResponse({
    status: 201,
    description: 'successfully create category',
  })
  @UseInterceptors(UploadFileS3('image'))
  @Post()
  async create(
    @Body() body: Omit<CreateCategoryDTO, 'image'>,
    @ValidateFile(10, IMAGE_MIME_TYPES.ALL_RegExp) image: Express.Multer.File
  ){
    return await this.categoryService.createNewCategory(body, image)
  }
}

