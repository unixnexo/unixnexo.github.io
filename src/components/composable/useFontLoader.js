import { ref } from 'vue'

export function useFontLoader() {
  const areFontsLoaded = ref(false)
  const isLoading = ref(true)

  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      console.log('All fonts loaded!')
      areFontsLoaded.value = true
      isLoading.value = false
    }).catch(err => {
      console.error('Font loading failed:', err)
      isLoading.value = false
    })
  } else {
    // Fallback for browsers that don't support the API
    setTimeout(() => {
      areFontsLoaded.value = true
      isLoading.value = false
    }, 100)
  }

  return {
    areFontsLoaded,
    isLoading
  }
}