import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function Pagination(page: number = 1, limit: number = 10){
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, example: page, type: 'integer'}),
    ApiQuery({ name: 'limit', required: false, example: limit, type: 'integer'})
  )
}