import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile } from "@nestjs/common";

export function ValidateFile(sizeMB: number, fileTypes_RegExp: string){
  return UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ 
        maxSize: sizeMB * 1024 * 1024, 
        message: `The file must be less than ${sizeMB} MB and ${fileTypes_RegExp} format`
      }),
      new FileTypeValidator({ fileType: fileTypes_RegExp })
    ]
  }))
}