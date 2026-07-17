import type { IConfiguration } from '@cucumber/cucumber/api';

const config: Partial<IConfiguration> = {
  require: [
    'features/support/**/*.ts',
    'features/step-definitions/**/*.ts',
  ],
  paths: ['features/**/*.feature'],
  format: ['progress-bar', 'html:cucumber-report/report.html'],
};

export default config;