<script setup>
import imagesLoaded from 'imagesloaded';
import { onMounted, ref, watch, nextTick } from 'vue';
import { useGeneralInfoStore } from '@/stores/generalInfo';

const generalInfoStore = useGeneralInfoStore();

const props = defineProps({ isLoaded: Boolean });
const emit = defineEmits(['update:isLoaded']);

const showText = ref(false);

const getData = async () => {
  await generalInfoStore.get();

  // to check if the img is fully loaded
  await nextTick();
  
  imagesLoaded(document.querySelector('#inner-wrapper'), { background: true }, () => {
    emit('update:isLoaded', true);
  });
};
onMounted(getData);

watch(() => props.isLoaded, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showText.value = true;
    }, 1000)
  }
})

</script>

<template>
  <div id="main-wrapper" class="text-white overflow-hidden max-w-[550px] m-auto min-h-[80vh] xsm:min-h-[95vh] flex items-center justify-center">
    <Transition name="reveal" mode="out-in" v-show="isLoaded">
        <div v-if="generalInfoStore.generalInfo && generalInfoStore.generalInfo.imgUrl" id="inner-wrapper" class="w-full overflow-hidden" :style="{ backgroundImage: `url('${generalInfoStore.urlFromEnv}${generalInfoStore.generalInfo.imgUrl}')` }">
          <div id="inner-inner-wrapper" class="flex flex-col m-auto h-full p-4 relative">
            <div :class="{ 'show': showText }" class="mt-auto ml-auto text-4xl sm:text-5xl text-end z-10 animate-text">
                <p v-if="generalInfoStore.generalInfo && generalInfoStore.generalInfo.introText">{{ generalInfoStore.generalInfo.introText }}</p>
            </div>
          </div>
      </div> 
    </Transition>
  </div>
</template>

<style scoped>
#inner-wrapper {
  aspect-ratio: 1 / 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#inner-inner-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.241);
  z-index: 1; 
}

/* text transition */
.animate-text {
  opacity: 0;
  transform: translateY(150px);
  transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.animate-text.show {
  opacity: 1;
  transform: translateY(0);
}

/*
** Vue transition animations 
*/
.reveal-enter-active,
.reveal-leave-active {
  transition: clip-path 1s cubic-bezier(1, 0, 0, 1);
}
.reveal-enter-from,
.reveal-leave-to {
  clip-path: inset(50% 0 50% 0);
}
.reveal-enter-to,
.reveal-leave-from {
  clip-path: inset(0 0 0 0);
}

</style>