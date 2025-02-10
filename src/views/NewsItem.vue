<script lang="ts" setup>
import { useRootStore } from '@/stores/root';
import { CapacitorHttp, type HttpResponse } from '@capacitor/core';
import { IonHeader, IonPage, useIonRouter, IonFooter, IonToolbar, IonTitle, IonContent, IonSkeletonText, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const router = useIonRouter();
const route = useRoute()


const store = useRootStore();

const data = ref<Record<string, unknown>>({})

const doGet = async () => {
  const options = {
    url: `https://jsonplaceholder.typicode.com/posts/${route.params.id}`,
    headers: {
      cache: 'no-cache'
    }
  };

  const response: HttpResponse = await CapacitorHttp.get(options);
  console.log(response);

  data.value = response.data
};


const onClick = () => {
  router.back()
}

const handleRefresh = (event: CustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    // @ts-expect-error ...
    event.target?.complete();
  }, 2000);
};

onBeforeMount(() => {
  void doGet()
})
</script>

<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <div class="header">
          <button class="back-button roboto-700" @click="onClick">
            Back</button>
        </div>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <template v-if="Object.keys(data).length">
        <h1>{{ data.title }}</h1>

        <img
          src="https://n1s1.hsmedia.ru/4c/ff/ad/4cffad0b2377455b791b6aaf5f14e501/656x438_1:5593_fb019c828f6c149e352a28082ee42091@5000x3333_0xniUH9asr_0475693133478609232.jpg.webp" />

        <p v-html="data.body" v-for="i in 10" :key="i"></p>


      </template>

      <template v-else>
        <h1>
          <IonSkeletonText animated style="width: 100%; height: 24px;"></IonSkeletonText>
        </h1>

        <p v-for="i in 10" :key="i">
          <IonSkeletonText animated style="width: 100%; height: 16px;"></IonSkeletonText>
          <IonSkeletonText animated style="width: 100%; height: 16px;"></IonSkeletonText>
          <IonSkeletonText animated style="width: 100%; height: 16px;"></IonSkeletonText>
        </p>
      </template>
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
.back-button {
  background: none;
  color: #fff;
}
</style>
