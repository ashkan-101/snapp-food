import { PaginationDTO } from "../dtos/pagination.dto"

export function paginationSolver(pagination: PaginationDTO){
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 100;

  let page = Number(pagination.page)
  let limit = Number(pagination.limit)

  console.log({page});
  console.log({limit});

  if(!page || page < 1 || isNaN(page)){
    page = DEFAULT_PAGE
  }else {
    page = Math.floor(page)
  }
  if(!limit || limit <= 0 || isNaN(limit)){
    limit = DEFAULT_LIMIT
  }else {
    limit = Math.floor(limit)
  }

  if(limit > MAX_LIMIT){
    limit = MAX_LIMIT
  }

  const skip = (page - 1 ) * limit

  return {
    page,
    limit,
    skip
  }
}

export function PaginationGenerator(count: number = 0, page: number = 0, limit: number = 0) {
  const totalPage = Math.ceil(count / limit)

  return {
      totalPage: totalPage,
      totalCount: count,
      page: +page,
      limit: +limit,
      next: page < totalPage,
      back: page > 1
  }
}