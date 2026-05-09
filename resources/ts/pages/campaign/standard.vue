<script setup lang="ts">
definePage({
  name: 'campaign-standard',
  meta: {
    breadcrumbs: [
      { title: 'Campaign', to: '/campaign' },
      { title: 'Standard Campaign' },
    ],
  },
})
</script>

<template>
  <VCard
    class="pa-12 text-center"
    rounded="lg"
    elevation="0"
  >
    <VIcon
      icon="tabler-list-details"
      size="64"
      color="primary"
      class="mb-4"
    />
    <div class="text-h5 font-weight-semibold mb-2">
      Standard Workflow
    </div>
    <div class="text-body-2 text-medium-emphasis">
      Standard campaign builder will be added when its flow is provided.
    </div>
    <VBtn
      class="mt-6"
      color="primary"
      :to="{ name: 'campaign' }"
    >
      Back to Campaigns
    </VBtn>
  </VCard>
</template>
