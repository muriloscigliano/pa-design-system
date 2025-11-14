<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  accept?: string
  multiple?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'change': [files: FileList | null]
}>()

const fileInputRef = ref<HTMLInputElement>()

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.files)
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <div
    :class="[
      'pa-file-uploader',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="pa-file-uploader-input"
      aria-label="File upload"
      @change="handleFileChange"
    />
    <div 
      class="pa-file-uploader-dropzone" 
      role="button"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      @click="triggerFileInput"
      @keydown.enter="triggerFileInput"
      @keydown.space.prevent="triggerFileInput"
    >
      <slot>
        <div class="pa-file-uploader-content">
          <span class="pa-file-uploader-icon">📎</span>
          <span class="pa-file-uploader-text">Click to upload or drag and drop</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-file-uploader {
  width: 100%;
}

.pa-file-uploader-input {
  display: none;
}

.pa-file-uploader-dropzone {
  border: var(--pa-file-uploader-dropzone-border-width) dashed var(--pa-file-uploader-dropzone-border-color-default);
  border-radius: var(--pa-file-uploader-dropzone-radius);
  padding: var(--pa-file-uploader-dropzone-padding);
  text-align: center;
  cursor: var(--pa-file-uploader-dropzone-cursor-default);
  transition: all var(--pa-transition-duration-default) var(--pa-transition-easing-default);
  background-color: var(--pa-file-uploader-dropzone-background-default);

  &:hover:not(.is-disabled) {
    border-color: var(--pa-file-uploader-dropzone-border-color-hover);
    background-color: var(--pa-file-uploader-dropzone-background-hover);
  }

  .pa-file-uploader.is-disabled & {
    opacity: calc(var(--pa-opacity-60) / 100);
    cursor: var(--pa-file-uploader-dropzone-cursor-disabled);
  }
}

.pa-file-uploader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--pa-file-uploader-content-gap);
}

.pa-file-uploader-icon {
  font-size: var(--pa-file-uploader-icon-font-size);
}

.pa-file-uploader-text {
  color: var(--pa-file-uploader-text-color);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-file-uploader-text-font-size);
  font-weight: var(--pa-file-uploader-text-font-weight);
}
</style>

