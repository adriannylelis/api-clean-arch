import { DynamicModule, Module } from '@nestjs/common'
import { EnvConfigService } from './env-config.service'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { join } from 'node:path'

@Module(metadata:{
  providers: [EnvConfigService],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return super.forRoot(options:{
      ...options,
      envFilePath: [
        join(...paths:__dirname, `../../../../.env.${process.env.NODE_ENV}`),
      ],
    })
  }
}
