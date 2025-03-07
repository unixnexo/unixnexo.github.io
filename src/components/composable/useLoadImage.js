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
  img.src = meImage
  
  if (img.complete) {
    console.log('Image was cached')
    isLoaded.value = true
    isLoading.value = false
  }

  return {
    isLoaded,
    isLoading,
    imageUrl: meImage
  }
}