<script setup lang="ts">
const url = ref('')
const validated = ref(false)

const validate = () => {
  validated.value = url.value.includes('linkedin.com')
}
</script>

<template>
  <VCard
    class="pa-5"
    rounded="lg"
    elevation="0"
    border
  >
    <div class="d-flex flex-wrap align-center ga-3">
      <VIcon
        icon="tabler-brand-linkedin"
        color="primary"
        size="20"
      />
      <span class="text-body-2 text-medium-emphasis">
        Find your target audience with
        <a
          href="#"
          class="text-primary text-decoration-none"
        >LinkedIn Search</a> or
        <a
          href="#"
          class="text-primary text-decoration-none"
        >Sales Navigator</a> or
        <a
          href="#"
          class="text-primary text-decoration-none"
        >Post URL</a> or
        <a
          href="#"
          class="text-primary text-decoration-none"
        >Group URL</a>
      </span>
      <VSpacer />
      <a
        href="#"
        class="text-body-2 text-primary text-decoration-none d-flex align-center ga-1"
      >
        <VIcon
          icon="tabler-info-circle"
          size="16"
        />
        Search Guide
      </a>
    </div>

    <div class="d-flex flex-wrap ga-3 mt-4">
      <VTextField
        v-model="url"
        placeholder="https://www.linkedin.com/search/results/people/?keywords="
        density="comfortable"
        variant="outlined"
        hide-details
        class="flex-grow-1"
      />
      <VBtn
        color="primary"
        size="large"
        @click="validate"
      >
        Validate
      </VBtn>
    </div>

    <div class="d-flex align-center ga-2 text-caption text-medium-emphasis mt-3">
      <span class="paste-dot" />
      Paste the search URL direcly from Linkedin
    </div>

    <div
      v-if="validated"
      class="text-caption text-success mt-2"
    >
      ✓ URL validated. Ready to continue.
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.paste-dot {
  inline-size: 8px;
  block-size: 8px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary));
}
</style>
