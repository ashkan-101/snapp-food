import { ApiProperty } from "@nestjs/swagger"

export class PaginationDTO {
  @ApiProperty({ required: false, type: 'number', example: 1, name: 'page', default: 1 })
  page: number

  @ApiProperty({ required: false, type: 'number', example: 10, name: 'limit', default: 10 })
  limit: number
}