import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './infrastructure/database/mongo.module';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './api/User/ user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongoModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }