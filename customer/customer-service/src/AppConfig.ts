import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  private readonly appSetting: { [key: string]: any } = {};

  constructor(private readonly configService: ConfigService) {}

  get envName(): string {
    return this.getSetting('ENV_NAME', 'local');
  }

  private getSetting = (key: string, defaultValue: any) => {
    if (!(key in this.appSetting)) {
      this.appSetting[key] = this.configService.get(key, defaultValue);
    }
    return this.appSetting[key];
  };
}
