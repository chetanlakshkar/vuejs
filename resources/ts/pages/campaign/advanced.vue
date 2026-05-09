<script setup lang="ts">
import StepHeaderTabs from '@/views/campaign/advanced/StepHeaderTabs.vue'
import DefineTargetAudienceStep from '@/views/campaign/advanced/DefineTargetAudienceStep.vue'
import SenderProfilesStep from '@/views/campaign/advanced/SenderProfilesStep.vue'

definePage({
  name: 'campaign-advanced',
  meta: {
    breadcrumbs: [
      { title: 'Campaign', to: '/campaign' },
      { title: 'Advance Campaign' },
    ],
  },
})

const router = useRouter()

type StepKey = 'audience' | 'sender'
const activeStep = ref<StepKey>('audience')

const audienceComplete = ref(false)

const goNext = () => {
  if (activeStep.value === 'audience') {
    audienceComplete.value = true
    activeStep.value = 'sender'
  }
}

const goPrev = () => {
  if (activeStep.value === 'sender')
    activeStep.value = 'audience'
}

const handleSubmit = () => {
  router.push({ name: 'campaign' })
}
</script>

<template>
  <div class="d-flex flex-column ga-6 advance-campaign">
    <StepHeaderTabs
      v-model="activeStep"
      :audience-complete="audienceComplete"
    />

    <DefineTargetAudienceStep
      v-show="activeStep === 'audience'"
      @next="goNext"
    />

    <SenderProfilesStep
      v-show="activeStep === 'sender'"
      @previous="goPrev"
      @submit="handleSubmit"
    />
  </div>
</template>

<style lang="scss" scoped>
.advance-campaign {
  max-inline-size: 1280px;
  margin-inline: auto;
  inline-size: 100%;
}
</style>
