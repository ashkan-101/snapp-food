import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TypeormOptions } from 'src/configs/typeorm.config';
import { CategoryModule } from '../category/category.module';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env')
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormOptions
    }),
    CategoryModule, S3Module
  ],
})
export class AppModule {}
