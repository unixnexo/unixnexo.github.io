<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MainTitle from '../common/MainTitle.vue'

const stackSection = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )

  if (stackSection.value) {
    observer.observe(stackSection.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
    <div id="stack" ref="stackSection" class="mt-8">
        <MainTitle title="Current stack" />

        <div class="mb-[74px] flex flex-wrap justify-center w-full">
            <img v-for="(img, i) in [
                { src: '/javascript.png', alt: 'JavaScript' },
                { src: '/c-sharp.png', alt: 'C#' },
                { src: '/react.png', alt: 'React' },
                { src: '/tailwind.png', alt: 'Tailwind' }
            ]" :key="i" :src="img.src" :alt="img.alt" class="stack-item w-1/2 xsm:w-1/4 object-contain"
                :class="isVisible ? 'animate-stack-item' : ''" :style="{ animationDelay: `${i * 200}ms` }" />
        </div>

    </div>
</template>

<style scoped>
.stack-item {
  opacity: 0;
  transform: translateY(80px) scale(0.8) rotateY(45deg);
  filter: blur(4px);
}

@keyframes stackItemFloat {
  0% {
    opacity: 0;
    transform: translateY(80px) scale(0.8) rotateY(45deg);
    filter: blur(4px);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1.05) rotateY(0deg);
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateY(0deg);
    filter: blur(0px);
  }
}

.animate-stack-item {
  animation: stackItemFloat 1s ease-out forwards;
}

</style>