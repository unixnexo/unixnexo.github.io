import { ref, watch, onUnmounted } from "vue";

export function useIntersectionObserver(targetRef, options = { threshold: 0.4 }) {
  const isVisible = ref(false);
  let observer;

  const startObserving = () => {
    if (!targetRef.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect(); // Stop observing once visible
        }
      },
      options
    );

    observer.observe(targetRef.value);
  };

  watch(targetRef, (newValue) => {
    if (newValue) startObserving();
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return { isVisible };
}

  