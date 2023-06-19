import { LoggerService, ModuleMetadata } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { DatabaseTest } from './config.test';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '../../src/logger/logger.module';
import { LOGGER_SERVICE } from '../../src/app.constants';
import { AuthModule } from '../../src/auth/auth.module';

const serviceLog: LoggerService = {
  error(
    message: any,
    trace?: string,
    context?: string,
    meta?: Record<string, unknown>,
  ): any {
    return { message, trace, context, meta };
  },
  log(message: any, context?: string, meta?: Record<string, unknown>): any {
    return { message, context, meta };
  },
  warn(message: any, context?: string, meta?: Record<string, unknown>): any {
    return { message, context, meta };
  },
  debug(message: any, context?: string, meta?: Record<string, unknown>): any {
    return { message, context, meta };
  },
  verbose(message: any, context?: string, meta?: Record<string, unknown>): any {
    return { message, context, meta };
  },
};

export class TestUtil {
  static createTestingModule({
    controllers = [],
    imports = [],
    providers = [],
    exports = [],
  }: ModuleMetadata): TestingModuleBuilder {
    process.env = {
      JWT_SECRET_KEY: '$mocked-token',
    };

    jest.mock('@nestjs/jwt', () => ({
      JwtService: jest.fn().mockImplementation(() => ({
        sign: jest.fn().mockReturnValue('mocked-token'),
        verify: jest.fn().mockReturnValue('mocked-token'),
      })),
    }));

    return Test.createTestingModule({
      imports: [DatabaseTest, AuthModule, ...imports, HttpModule, LoggerModule],
      controllers,
      providers,
      exports,
    })
      .overrideProvider(LOGGER_SERVICE)
      .useValue(serviceLog);
  }
}
