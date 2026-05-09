<script setup lang="ts">
const emit = defineEmits<{
  (e: 'file-selected', file: File): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const openPicker = () => inputRef.value?.click()

const handleFiles = (files: FileList | null) => {
  if (!files?.length)
    return
  emit('file-selected', files[0])
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  handleFiles(e.dataTransfer?.files ?? null)
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}
</script>

<template>
  <div>
    <div
      class="csv-dropzone"
      :class="{ 'csv-dropzone--active': isDragging }"
      @click="openPicker"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <input
        ref="inputRef"
        type="file"
        accept=".csv"
        class="d-none"
        @change="(e) => handleFiles((e.target as HTMLInputElement).files)"
      >
      <VIcon
        icon="tabler-upload"
        color="primary"
        size="32"
      />
      <div class="text-primary text-subtitle-1 font-weight-medium mt-2">
        Drag a File or click a browse
      </div>
      <div class="text-caption text-medium-emphasis mt-1">
        File with up to 100 rows works best
      </div>
    </div>

    <div class="d-flex align-center ga-2 text-caption text-primary mt-3">
      <VIcon
        icon="tabler-cloud-download"
        size="16"
      />
      <a
        href="#"
        class="text-decoration-none text-primary"
      >Download a sample file</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.csv-dropzone {
  border: 1.5px dashed rgba(var(--v-theme-primary), 0.55);
  border-radius: 10px;
  padding: 3rem 1.5rem;
  text-align: center;
  cursor: pointer;
  background-color: rgba(var(--v-theme-primary), 0.04);
  transition: background-color 0.18s ease, border-color 0.18s ease;

  &--active {
    background-color: rgba(var(--v-theme-primary), 0.08);
    border-color: rgb(var(--v-theme-primary));
  }
}
</style>
