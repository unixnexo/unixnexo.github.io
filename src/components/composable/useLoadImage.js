import { ref } from 'vue'
import meImage from '@/assets/image/meN.webp'

export function useLoadImage() {
  const isLoaded = ref(false)
  const isLoading = ref(true)
  
  const img = new Image()
  
  img.onload = () => {
    console.log('Image loaded via Image object')
    isLoaded.value = true
    isLoading.value = false
  }

  img.onerror = (err) => {
    console.error('Image failed to load:', err)
    isLoading.value = false
  }
  const meImg = img.src = `${meImage}?t=${Date.now()}`; // so the image is not cached
  
  // if (img.complete) {
  //   console.log('Image was cached')
  //   isLoaded.value = true
  //   isLoading.value = false
  // }

  return {
    isLoaded,
    isLoading,
    imageUrl: meImg
  }
}