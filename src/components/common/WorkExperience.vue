<template>
  <div class="bg-white/30 shadow-sm border rounded-md p-6 sm:p-8">
    <div class="flex justify-between items-start mb-2 text-gray-400 dark:text-white/70">
      <p class="text-sm uppercase tracking-wider font-medium">{{ role }}</p>
      <span class="text-sm">{{ timeRange }}</span>
    </div>
    
    <h2 class="text-4xl sm:text-5xl font-bold">{{ companyName }}</h2>
    
  </div>
</template>

<script>
export default {
  name: 'WorkExperience',
  props: {
    companyName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      default: null
    }
  },
  computed: {
    timeRange() {
      return this.endTime ? `${this.startTime} - ${this.endTime}` : `${this.startTime} - Present`;
    }
  }
}
</script>