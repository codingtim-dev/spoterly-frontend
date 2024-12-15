import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RuntimeEnvironmentService {

  private config: { [key: string]: string } = {};

  async loadConfig(): Promise<void> {
    const response = await fetch('assets/config.json');
    if (!response.ok) {
      console.error('Could not load runtime configuration');
      return;
    }
    this.config = await response.json();
  }

  getConfigValue(key: string): string | undefined {
    return this.config[key];
  }
}
