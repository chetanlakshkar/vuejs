<script setup lang="ts">
const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'submit'): void
}>()

const tab = ref<'linkedin' | 'email'>('linkedin')
const search = ref('')
const showCount = ref(10)

interface ProfileRow {
  id: number
  name: string
  avatar: string
  connections: number
  health: number
  invitesPerDay: number
  accountType: 'Premium' | 'Free' | 'Sales Navigator'
  status: 'Connected' | 'Disconnected'
}

const profiles = ref<ProfileRow[]>([
  {
    id: 1,
    name: 'Edgar Jones',
    avatar: 'https://i.pravatar.cc/64?img=47',
    connections: 1250,
    health: 72,
    invitesPerDay: 40,
    accountType: 'Premium',
    status: 'Connected',
  },
])

const selected = ref<number[]>([])

const showOptions = [10, 25, 50]
</script>

<template>
  <div class="d-flex flex-column ga-6">
    <VCard
      rounded="lg"
      elevation="0"
      class="pa-2"
    >
      <div class="d-inline-flex pa-1 align-center sender-tabs">
        <button
          type="button"
          class="sender-tab"
          :class="{ 'sender-tab--active': tab === 'linkedin' }"
          @click="tab = 'linkedin'"
        >
          LinkedIn Profile
        </button>
        <button
          type="button"
          class="sender-tab"
          :class="{ 'sender-tab--active': tab === 'email' }"
          @click="tab = 'email'"
        >
          Email Accounts
        </button>
      </div>
    </VCard>

    <VCard
      rounded="lg"
      elevation="0"
      class="pa-5"
    >
      <div class="d-flex flex-wrap align-start ga-3">
        <div class="flex-grow-1">
          <div class="d-flex align-center ga-2">
            <VIcon
              icon="tabler-brand-linkedin"
              color="primary"
              size="20"
            />
            <span class="text-subtitle-1 font-weight-semibold">
              {{ tab === 'linkedin' ? 'LinkedIn Profile' : 'Email Accounts' }}
            </span>
          </div>
          <div class="text-body-2 text-medium-emphasis mt-1">
            Pick which {{ tab === 'linkedin' ? 'LinkedIn profiles' : 'email accounts' }} you want to use for this campaign.
          </div>
        </div>
        <VBtn
          color="primary"
          prepend-icon="tabler-plus"
        >
          Add Account
        </VBtn>
      </div>

      <VDivider class="my-5" />

      <div class="d-flex flex-wrap align-center ga-3 mb-4">
        <span class="text-body-2 text-medium-emphasis">Show</span>
        <VSelect
          v-model="showCount"
          :items="showOptions"
          density="compact"
          variant="outlined"
          hide-details
          class="show-count-select"
        />
        <VSpacer />
        <VTextField
          v-model="search"
          placeholder="Search"
          prepend-inner-icon="tabler-search"
          density="compact"
          variant="outlined"
          hide-details
          class="profiles-search"
        />
      </div>

      <VTable class="profile-table">
        <thead>
          <tr>
            <th class="ps-3">
              <VCheckbox
                density="compact"
                hide-details
              />
            </th>
            <th class="text-uppercase text-caption font-weight-semibold">
              Name
            </th>
            <th class="text-uppercase text-caption font-weight-semibold">
              Health
            </th>
            <th class="text-uppercase text-caption font-weight-semibold">
              Daily Limits
            </th>
            <th class="text-uppercase text-caption font-weight-semibold">
              Account Type
            </th>
            <th class="text-uppercase text-caption font-weight-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in profiles"
            :key="p.id"
          >
            <td class="ps-3">
              <VCheckbox
                v-model="selected"
                :value="p.id"
                density="compact"
                hide-details
              />
            </td>
            <td>
              <div class="d-flex align-center ga-3">
                <VAvatar
                  :image="p.avatar"
                  size="36"
                />
                <div>
                  <div class="text-body-1 font-weight-medium">
                    {{ p.name }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ p.connections.toLocaleString() }} connections
                  </div>
                </div>
              </div>
            </td>
            <td>
              <VProgressCircular
                :model-value="p.health"
                :size="40"
                :width="4"
                color="warning"
              >
                <span class="text-caption font-weight-semibold">{{ p.health }}</span>
              </VProgressCircular>
            </td>
            <td>
              <VChip
                size="small"
                variant="outlined"
                color="default"
              >
                Invites: {{ p.invitesPerDay }} / day
              </VChip>
            </td>
            <td>
              <div class="d-flex align-center ga-2">
                <VIcon
                  icon="tabler-brand-linkedin"
                  color="warning"
                  size="20"
                />
                <span class="text-body-2">{{ p.accountType }}</span>
              </div>
            </td>
            <td>
              <VChip
                size="small"
                color="success"
                variant="tonal"
                label
              >
                {{ p.status }}
              </VChip>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCard>

    <div class="d-flex align-center justify-end ga-4">
      <VBtn
        variant="text"
        color="primary"
        prepend-icon="tabler-arrow-back-up"
        @click="emit('previous')"
      >
        Previous
      </VBtn>
      <VBtn
        color="primary"
        size="large"
        @click="emit('submit')"
      >
        Submit
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sender-tabs {
  background-color: rgba(var(--v-theme-primary), 0.06);
  border-radius: 8px;
}

.sender-tab {
  background: transparent;
  border: 0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.65);
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;

  &--active {
    background-color: rgb(var(--v-theme-surface));
    color: rgb(var(--v-theme-primary));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }
}

.show-count-select {
  inline-size: 90px;
}

.profiles-search {
  inline-size: 280px;
  max-inline-size: 100%;
}

.profile-table {
  th, td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>
