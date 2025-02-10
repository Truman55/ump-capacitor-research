<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonFooter, IonToolbar, IonTitle } from '@ionic/vue';

const list = [{
  title: '«Недавно переехали из другого региона»: семья с 5 детьми лишилась дома во время пожара в новосибирском селе',
  id: 1,
}, {
  id: 2,
  title: 'Мятные тона и декоративные цветы: 5 трендов этой весны, которые освежат надоевший гардероб'
}, {
  id: 3,
  title: 'Пусть едят бриоши: паназиатское заведение в центре Новосибирска заменили на сетевое кафе',
}, {
  id: 4,
  title: 'Пенсионеров ждет новая индексации: власти хотят повысить выплаты за счет ИПК — что изменится'
}, {
  id: 5,
  title: 'Не смог объяснить произошедшее: в каком состоянии спортивный комментатор Роман Скворцов — мужчина в реанимации'
}]

const store = useRootStore();

const handleRefresh = (event: CustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    // @ts-expect-error ...
    event.target?.complete();
  }, 2000);
};
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <div class="header">
          <img src="@/assets/logo.svg" class="app-logo" />
        </div>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <main>
        <div class="wrapper">
          <h1 class="title">
            Картина дня (10 февраля 2025 г.)
          </h1>

          <ul class="news">
            <li v-for="item in list" :key="item.id">
              <RouterLink class="news-item roboto-700" :to="{ name: 'News', params: { id: item.id } }">
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </main>
    </IonContent>
    <IonFooter>
      <IonToolbar>
        <IonTitle>
          © ShkulevTech {{ store.version }}
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  </IonPage>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 24px;
  color: #1588e2;
  padding: 0 0 8px;
  margin: 0 0 16px;
  text-transform: uppercase;
  border-bottom: 1px solid rgb(208, 208, 208);
}

.wrapper {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.news {
  margin: 0;
  padding: 0;
  list-style: none;
}

.news-item {
  color: #000;
  text-decoration: none;
  margin-bottom: 16px;
  display: block;
}
</style>
