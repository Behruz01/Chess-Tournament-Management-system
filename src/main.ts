import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const PORT = process.env.PORT || 3000;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Article website')
    .setDescription('The article.uz website API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => {
    console.log(`🚀 Server running on PORT: ${PORT}`);
    console.log(`📄 Swagger docs available on http://localhost:${PORT}/docs`);
  });
}
bootstrap();
