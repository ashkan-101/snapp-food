import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  @ApiProperty({ type: 'string', description: 'title for category', required: true })
  title: string
  
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'parent id', required: false })
  parent_id: number

  @ApiProperty({ format: 'binary', description: 'accepted file 10 MB or less and mimeTypes image/(png | jpg | jpeg | webp)'})
  // @IsNotEmpty()
  // @ValidationFile(['png', 'jpg', 'jpeg', 'webp'], 10)
  image: string
}