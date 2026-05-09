<script setup lang="ts">
import CampaignStepper, { type StepKey } from '@/views/campaign/standard/CampaignStepper.vue'
import StepLeadsList from '@/views/campaign/standard/StepLeadsList.vue'
import StepTargetAudience from '@/views/campaign/standard/StepTargetAudience.vue'
import StepCampaign from '@/views/campaign/standard/StepCampaign.vue'

definePage({
  name: 'campaign-standard',
  meta: {
    breadcrumbs: [
      { title: 'Campaign', to: '/campaign' },
    ],
  },
})

const router = useRouter()

const activeStep = ref<StepKey>('leads')

const leadsList = ref({
  name: '',
  type: 'linkedin-invitation',
  channel: null as 'email' | 'linkedin' | 'both' | null,
  schedule: '',
})

const targetAudience = ref({
  linkedinUrl: '',
  csvFile: null as File | null,
  useWebhook: false,
})

const campaign = ref({
  connectionMessage: 'Hi  {{first_name}}...',
  followUps: [
    { id: 1, message: 'Hi  {{first_name}}...', delay: { minutes: 3, hour: 3, days: 3 } },
  ],
})

const goPrev = () => {
  if (activeStep.value === 'audience')
    activeStep.value = 'leads'
  else if (activeStep.value === 'campaign')
    activeStep.value = 'audience'
}

const goNext = () => {
  if (activeStep.value === 'leads')
    activeStep.value = 'audience'
  else if (activeStep.value === 'audience')
    activeStep.value = 'campaign'
}

const handleSaveDraft = () => {
  router.push({ name: 'campaign' })
}

const handleLaunch = () => {
  router.push({ name: 'campaign' })
}
</script>

<template>
  <div class="d-flex flex-column ga-6 standard-campaign">
    <CampaignStepper :active="activeStep" />

    <StepLeadsList
      v-if="activeStep === 'leads'"
      v-model="leadsList"
      @continue="goNext"
    />

    <StepTargetAudience
      v-else-if="activeStep === 'audience'"
      v-model="targetAudience"
      @previous="goPrev"
      @continue="goNext"
      @save-draft="handleSaveDraft"
    />

    <StepCampaign
      v-else
      v-model="campaign"
      @previous="goPrev"
      @save-draft="handleSaveDraft"
      @launch="handleLaunch"
    />
  </div>
</template>

<style lang="scss" scoped>
.standard-campaign {
  max-inline-size: 1200px;
  margin-inline: auto;
  inline-size: 100%;
}
</style>
