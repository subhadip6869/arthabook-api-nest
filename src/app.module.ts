import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { FirebaseModule } from './core/firebase/firebase/firebase.module';
import { ProfileModule } from './modules/profile/profile.module';

const envFileMap: Record<string, string> = {
  dev: '.env.dev',
  alpha: '.env.alpha',
  prod: '.env.prod',
};

const environment = process.env.APP_ENV || 'deploy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFileMap[environment] || undefined,
    }),
    FirebaseModule,
    DatabaseModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
