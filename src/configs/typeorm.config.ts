import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm'
import { DOT_ENV } from 'src/common/enums/dotenv.enum';

@Injectable()
export class TypeormOptions implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService
  ){}

  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions{
    return {
      type: 'postgres',
      host: this.configService.get<string>(DOT_ENV.DB_HOST),
      port: this.configService.get<number>(DOT_ENV.DB_PORT),
      username: this.configService.get<string>(DOT_ENV.DB_USERNAME),
      password: this.configService.get<string>(DOT_ENV.DB_PASSWORD),
      database: 'snapp-food',
      synchronize: true,
      entities: [ 'dist/**/**/*.entity{.ts, .js}' ]
    }
  }  
}