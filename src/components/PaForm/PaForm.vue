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
  gap: var(--pa-form-gap);
  width: 100%;
}

.pa-form-error {
  color: var(--pa-form-error-color);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-form-error-font-size);
  font-weight: var(--pa-form-error-font-weight);
  margin-top: var(--pa-form-error-spacing-top);
}
</style>

