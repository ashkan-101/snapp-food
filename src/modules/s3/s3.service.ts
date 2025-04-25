import { BadRequestException, Injectable } from "@nestjs/common";
import { extname } from "path";
import { DOT_ENV } from "src/common/enums/dotenv.enum";
import { ConfigService } from "@nestjs/config";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client
  constructor(
    private readonly configService: ConfigService
  ){
    this.s3Client = new S3Client({
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
    const key = `${folderName}/${Date.now()}${extName}`
    try {
      const uploadResult = await this.s3Client.send(
        new PutObjectCommand({
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          Bucket: this.configService.get<string>(DOT_ENV.S3_BUCKET_NAME),
          ACL: 'public-read'
        })
      )
        return {
          url: `https://${this.configService.get<string>(DOT_ENV.S3_BUCKET_NAME)}.storage.c2.liara.space/${key}`,
        };
    } catch (error) {
      console.log('failed to uploaded file' + error.message);
      throw new BadRequestException()
    }
  }

  public async deleteFile(key: string){
    try {
      const deleteResult = await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.get<string>(DOT_ENV.S3_BUCKET_NAME),
          Key: key
        })
      )
      console.log(deleteResult);
      return { 
        success: true,
        message: 'deleted successfully'
      }
    } catch (error) { 
      console.log('failed to deleted file' + error.message);
      throw new BadRequestException()
    }
  }
}