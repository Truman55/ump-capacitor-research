import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ump.app',
  appName: 'ump-mobile-app',
  webDir: 'dist',
  plugins: {
    CapacitorUpdater: {
      autoUpdate: false,
    },
    // SafeArea: {
    //   enabled: true,
    //   customColorsForSystemBars: true,
    //   statusBarColor: '#000000',
    //   statusBarContent: 'light',
    //   navigationBarColor: '#000000',
    //   navigationBarContent: 'light',
    //   offset: 0,
    // },
  },
};

export default config;
