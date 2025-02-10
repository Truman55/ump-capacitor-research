
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import './assets/main.css'

import App from './App.vue';
import router from './router';
import { IonicVue, loadingController } from '@ionic/vue';
import { createApp } from 'vue';
import { useRootStore } from './stores/root';
import { createPinia } from 'pinia';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { CapacitorHttp, type HttpResponse, Capacitor } from '@capacitor/core';
const APP_BUNDLE_DOWNLOAD_LINK = 'https://truman55.github.io/ump-mobile-app-test';
const buildVersion = '0.0.9';

const app = createApp(App).use(IonicVue).use(router).use(createPinia());
let loading: HTMLIonLoadingElement | null = null;

const downloadBundle = async (version: string) => {
  const store = useRootStore();
  store.updateInProgress = true;

  loading = loading || await loadingController.create({
    message: 'Приложение обновляется',
  })
  loading.present();

  try {
    const bundleInfo = await CapacitorUpdater.download({
      url: `${APP_BUNDLE_DOWNLOAD_LINK}/${version}/dist.zip`, // Url zip архива бандла, можно скопировать из релиза на github
      version: version, // Версия скачиваемого релиза
    });

    if (Capacitor.getPlatform() === 'web') {
      loading?.dismiss();
    }

    console.log(bundleInfo);
    return true;

  } catch (err) {
    console.error(err);
    store.updateInProgress = false;
    return false;
  }
};

const syncVersion = async () => {
  const options = {
    url: `https://truman55.github.io/ump-mobile-app-test/version.json`,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  };

  const response: HttpResponse = await CapacitorHttp.get(options);
  const serverVersion = response.data.version;

  const store = useRootStore();

  if (store.version !== serverVersion) {
    console.log('NEW VERSION ...', serverVersion)
    const success = await downloadBundle(serverVersion);

    if (success) {
      store.version = serverVersion;
    }
  }
};

const checkNewVersionInterval = () => {
  const store = useRootStore();
  setInterval(() => {

    if (!store.updateInProgress) {
      syncVersion();
    }
  }, 10000)
}

router.isReady().then(() => {
  CapacitorUpdater.notifyAppReady();
  const rootStore = useRootStore();
  rootStore.version = buildVersion;

  checkNewVersionInterval();
  syncVersion();

  CapacitorUpdater.addListener('downloadComplete', async ({ bundle: downloadedBundle }) => {  // Слушатель ивента завершения скачивания бандла
    try {
      await CapacitorUpdater.set(downloadedBundle); // При успешном скачивании заменяет текущий бандл на скачанный
      rootStore.updateInProgress = false; // Закрываем мобальное окно
      loading?.dismiss();
    } catch (e) {
      console.error(e);
      rootStore.updateInProgress = false;
      loading?.dismiss();
    }
  });

  app.mount('#app');
});
