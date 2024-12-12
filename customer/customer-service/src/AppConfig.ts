import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * アプリ設定
 */
@Injectable()
export class AppConfig {
  // キャッシュ
  private readonly appSetting: { [key: string]: any } = {};

  constructor(private readonly configService: ConfigService) {}

  // anyを扱うのはここに限定し、利用側はタイプセーフな実装ができる
  get envName(): string {
    return this.getSetting('ENV_NAME', 'local');
  }

  // 値の取得とキャッシング
  private getSetting = (key: string, defaultValue: any) => {
    if (!(key in this.appSetting)) {
      this.appSetting[key] = this.configService.get(key, defaultValue);
    }
    return this.appSetting[key];
  };
}
