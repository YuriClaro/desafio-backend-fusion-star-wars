import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Module({})
export class SwaggerConfigModule {
  static setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API documentation with Swagger')
      .setVersion('1.0')
      .addTag('API')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
}
