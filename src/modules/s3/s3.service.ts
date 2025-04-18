import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { extname } from "path";
import { DOT_ENV } from "src/common/enums/dotenv.enum";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
  private readonly s3: S3
  constructor(
    private readonly configService: ConfigService
  ){
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get<string>(DOT_ENV.S3_ACCSESS_KEY) as string,
        secretAccessKey: this.configService.get<string>(DOT_ENV.S3_SECRET_KEY) as string
      },
      endpoint: this.configService.get<string>(DOT_ENV.S3_ENDPOINT),
      region: 'default'
    })

    console.log(this.configService.get<string>(DOT_ENV.S3_ACCSESS_KEY) as string);
  }

  public async uploadFile(file: Express.Multer.File, folderName: string){
    const extName = extname(file.originalname)
    const uploadResult = await this.s3.upload({
      Bucket: this.configService.get<string>(DOT_ENV.S3_BUCKET_NAME) as string,
      Key: `${folderName}/${Date.now()}${extName}`,
      Body: file.buffer
    }).promise()
    
    console.log(uploadResult);

    return uploadResult
  }

  public async deleteFile(key: string){
    const deleteResult = await this.s3.deleteObject({
      Bucket: this.configService.get<string>(DOT_ENV.S3_BUCKET_NAME) as string,
      Key: decodeURI(key)
    }).promise()

    console.log(deleteResult);

    return deleteResult
  }
}