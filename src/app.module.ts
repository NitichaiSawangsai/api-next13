import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import serverConfig from './config/server.config';
import awsConfig from './config/aws.config';
import { ProjectModule } from './project/project.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { LoggerModule } from './logger/logger.module';
import { MasterModule } from './master/master.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, serverConfig, awsConfig],
      cache: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().label('DATABASE_HOST ENV').required(),
        DATABASE_PORT: Joi.number().label('DATABASE_PORT ENV').required(),
        DATABASE_USERNAME: Joi.string()
          .label('DATABASE_USERNAME ENV')
          .required(),
        DATABASE_PASSWORD: Joi.string()
          .label('DATABASE_PASSWORD ENV')
          .required(),
        DATABASE_NAME: Joi.string().label('DATABASE_NAME ENV').required(),
        DATABASE_SYNC: Joi.string().label('DATABASE_SYNC ENV').required(),
        TZ: Joi.string().label('TZ ENV').required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        schema: configService.get('database.schema'),
        autoLoadEntities: true,
        synchronize: configService.get('database.syncEnabled') === 'enable',
        cli: { migrationsDir: 'src/migrations' },
        namingStrategy: new SnakeNamingStrategy(),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthModule,
    UserManagementModule,
    ProjectModule,
    LoggerModule,
    MasterModule,
    EmployeeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((_req, response, next) => {
        response.setHeader('X-XSS-Protection', '1; mode=block');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('X-Frame-Options', 'DENY');
        response.setHeader('Content-Security-Policy', "default-src 'self'");
        response.setHeader(
          'Strict-Transport-Security',
          'max-age=15552000; includeSubDomains',
        );
        response.setHeader('Referrer-Policy', 'no-referrer');
        next();
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
