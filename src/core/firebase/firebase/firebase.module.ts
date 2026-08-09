import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (getApps().length > 0) {
          return getApps()[0];
        }

        const base64 = configService.getOrThrow<string>(
          'FIREBASE_SERVICE_ACCOUNT_BASE64',
        );

        const serviceAccount = JSON.parse(
          Buffer.from(base64, 'base64').toString('utf-8'),
        );

        return initializeApp({
          credential: cert(serviceAccount),
        });
      },
    },
  ],
  exports: ['FIREBASE_APP'],
})
export class FirebaseModule {}
