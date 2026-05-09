<script setup lang="ts">
import emptyArt from '@figma/OBJECT.svg?url'

defineEmits<{
  (e: 'new-campaign'): void
}>()
</script>

<template>
  <VCard
    class="empty-state-card pa-12"
    elevation="0"
  >
    <div class="d-flex flex-column align-center text-center ga-8">
      <img
        :src="emptyArt"
        alt="No campaigns yet"
        class="empty-state-art"
      >

      <VBtn
        size="large"
        color="primary"
        rounded="lg"
        @click="$emit('new-campaign')"
      >
        New Campaign
      </VBtn>
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.empty-state-card {
  background-color: transparent;
  min-block-size: 480px;
}

.empty-state-art {
  inline-size: 360px;
  max-inline-size: 100%;
  block-size: auto;
}
</style>
