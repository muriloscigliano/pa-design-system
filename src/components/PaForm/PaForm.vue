<script setup lang="ts">
defineProps<{
  error?: string | boolean
}>()
</script>

<template>
  <form
    :class="[
      'pa-form',
      {
        'is-error': error
      }
    ]"
    @submit.prevent
  >
    <slot />
    <div v-if="error && typeof error === 'string'" class="pa-form-error">
      {{ error }}
    </div>
  </form>
</template>

<style lang="scss" scoped>
.pa-form {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
  width: 100%;
}

.pa-form-error {
  color: var(--pa-color-status-error-text-default, var(--pa-red-500, #d51e33));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-100, 14px);
  font-weight: var(--pa-font-weight-400, 400);
  margin-top: var(--pa-spacing-8, 8px);
}
</style>

