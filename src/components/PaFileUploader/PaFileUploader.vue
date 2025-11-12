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
      @change="handleFileChange"
    />
    <div class="pa-file-uploader-dropzone" @click="triggerFileInput">
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
  border: var(--pa-spacing-25, var(--pa-spacing-2, 2px)) dashed var(--pa-color-surface-container-border, var(--pa-gray-300, #dee2e6));
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-32, 32px);
  text-align: center;
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  background-color: var(--pa-color-surface-container-background, var(--pa-gray-white, #ffffff));

  &:hover:not(.is-disabled) {
    border-color: var(--pa-color-action-primary-border-default);
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-100, #f7f7f8));
  }

  .pa-file-uploader.is-disabled & {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}

.pa-file-uploader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
}

.pa-file-uploader-icon {
  font-size: var(--pa-font-size-500, 24px);
}

.pa-file-uploader-text {
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
}
</style>

