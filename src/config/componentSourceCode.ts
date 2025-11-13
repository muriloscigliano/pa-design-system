export const componentSourceCode: Record<string, string> = {
  'pabutton': `<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'action'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  iconPosition?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <button
    :class="[
      'pa-button',
      \`pa-button--\${variant || 'primary'}\`,
      \`pa-button--\${size || 'md'}\`,
      {
        'has-icon-left': iconPosition === 'left',
        'has-icon-center': iconPosition === 'center',
        'has-icon-right': iconPosition === 'right'
      },
      { 
        'is-disabled': disabled || loading,
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="pa-button-loader" aria-hidden="true"></span>
    <slot />
  </button>
</template>`
}

export const getComponentSourceCode = (componentId: string): string => {
  return componentSourceCode[componentId] || ''
}

