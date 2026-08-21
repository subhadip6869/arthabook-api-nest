import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';

// ---------------------------------------------------
// Helper function to apply your global configurations
// ---------------------------------------------------
async function configureApp(app: any) {
  app.enableCors({
    origin: [
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  return app;
}

// ---------------------------------------------------
// 1. Local Development Setup
// ---------------------------------------------------
// Vercel automatically sets the VERCEL environment variable to "1".
// If it's missing, we know we are running locally.
if (!process.env.VERCEL) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await configureApp(app);
    await app.listen(process.env.PORT ?? 8080);
  }
  bootstrap();
}

// ---------------------------------------------------
// 2. Vercel Serverless Setup
// ---------------------------------------------------
let cachedApp: any;

export default async function handler(req: any, res: any) {
  require('pg');
  // Cache the app instance so it doesn't reboot on every single request
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    await configureApp(app);
    await app.init(); // Initialize without binding to a port
    cachedApp = app;
  }

  // Pass the request to the underlying Express instance
  const instance = cachedApp.getHttpAdapter().getInstance();
  return instance(req, res);
}
