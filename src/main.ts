import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
const path = require('path')
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 安全防护中间件,可以通过设置各种HTTP标题来保护应用程序
  app.use(helmet());
  const options = new DocumentBuilder()
    .setTitle('REACT_NODE 1.0')
    .setDescription('REACT_NODE api for first react project writed by nestjs')
    .setVersion('1.0')
    .addTag('React')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger/index.html', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 过滤掉请求实体中，后端不需要的属性
    // forbidNonWhitelisted: true, // 如果存在后端不需要的属性，返回报错
    transform: true, // 将传入的实体转换成我们需要的类实例
    transformOptions: {
      enableImplicitConversion: true // 不需要使用@Type()显示指定类型，这里会进行默认转换
    }
  }))
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useStaticAssets(path.join(process.cwd(), `/public`), { prefix: '' })
  await app.listen(9981);
}
bootstrap();
