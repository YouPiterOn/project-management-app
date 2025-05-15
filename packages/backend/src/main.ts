import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
		new ValidationPipe({
			forbidNonWhitelisted: true,
		}),
	);

  const config = new DocumentBuilder()
    .setTitle('Project Management App API')
    .setDescription('API documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || '3000');
}
bootstrap();
