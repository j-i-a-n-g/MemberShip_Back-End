import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
const moment = require('moment')

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DATABASE_HOST,
      port: +process.env.MYSQL_DATABASE_PORT,
      username: process.env.MYSQL_DATABASE_USER,
      password: process.env.MYSQL_DATABASE_PASSWORD,
      database: process.env.MYSQL_DATABASE_NAME,
      synchronize: true, // TyperOrmModule实体和数据库同步
      autoLoadEntities: true, // 自动加载模块而不是指定实体数组
    }),
    // 生成请求日志
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('react_project', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('react_project', {
              prettyPrint: true,
            }),
          ),
          filename: join(process.cwd(), `/log/nest-${moment().format('yyyy-MM-DD')}.txt`)
        }),
      ],
    }),
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
