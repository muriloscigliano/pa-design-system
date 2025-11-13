export const componentStyleSource: Record<string, string> = {
  'paaccordion': `<style lang="scss" scoped>
.pa-accordion {
  border: var(--pa-Border-width-50, 1px) solid var(--pa-accordion-header-border, var(--pa-color-surface-base-border));
  border-radius: var(--pa-Border-radius-100, 8px);
  overflow: hidden;
}

.pa-accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--pa-accordion-header-background-default, var(--pa-color-surface-base-background));
  color: var(--pa-accordion-header-text, var(--pa-color-surface-base-text));
  padding: var(--pa-accordion-header-padding-y) var(--pa-accordion-header-padding-x);
  border: none;
  cursor: var(--pa-cursor-pointer, pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-500, 500);
  text-align: left;
  transition: all var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, var(--pa-transition-easing-default, ease));

  &:hover {
    background-color: var(--pa-accordion-header-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &:focus-visible {
    outline: var(--pa-outline-width-default, 2px) solid var(--pa-color-action-primary-border-focus);
    outline-offset: var(--pa-outline-offset-default, 2px);
  }
}

.pa-accordion-header-content {
  flex: 1;
}

.pa-accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-accordion-icon, var(--pa-color-surface-container-icon));
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  flex-shrink: 0;
  transition: transform var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, var(--pa-transition-easing-default, ease));

  .pa-accordion.is-open & {
    transform: rotate(180deg);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

.pa-accordion-content {
  background-color: var(--pa-accordion-content-background, var(--pa-color-surface-container-background));
  color: var(--pa-accordion-content-text, var(--pa-color-surface-container-text));
  overflow: hidden;
}

.pa-accordion-content-inner {
  padding: var(--pa-accordion-content-padding-y) var(--pa-accordion-content-padding-x);
}

.pa-accordion-content-enter-active,
.pa-accordion-content-leave-active {
  transition: max-height var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, ease),
    opacity var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, ease);
}

.pa-accordion-content-enter-from,
.pa-accordion-content-leave-to {
  max-height: 0;
  opacity: 0;
}

.pa-accordion-content-enter-to,
.pa-accordion-content-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>`,
  'paactionbuttongroup': `<style lang="scss" scoped>
.pa-action-button-group {
  display: inline-flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  &--gap-sm {
    gap: var(--pa-action-button-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-action-button-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-action-button-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>`,
  'paactiongroup': `<style lang="scss" scoped>
.pa-action-group {
  display: inline-flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  &--gap-sm {
    gap: var(--pa-action-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-action-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-action-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>`,
  'paautocomplete': `<style lang="scss" scoped>
.pa-autocomplete {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-autocomplete-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.pa-autocomplete-input {
  width: 100%;
  background-color: var(--pa-autocomplete-background-default, var(--pa-color-input-background-default));
  color: var(--pa-autocomplete-text-default, var(--pa-color-input-text-default));
  border: var(--pa-autocomplete-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-autocomplete-border-default, var(--pa-color-input-border-default));
  border-radius: var(--pa-autocomplete-border-radius-default, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  transition: all var(--pa-autocomplete-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-autocomplete-transition-easing-default, var(--pa-transition-easing-default, ease));
  outline: none;

  &::placeholder {
    color: var(--pa-autocomplete-text-placeholder, var(--pa-color-input-text-placeholder));
  }

  .pa-autocomplete--sm & {
    padding: var(--pa-autocomplete-size-sm-padding-y) var(--pa-autocomplete-size-sm-padding-x);
    font-size: var(--pa-autocomplete-size-sm-font, var(--pa-font-size-100, 14px));
  }

  .pa-autocomplete--md & {
    padding: var(--pa-autocomplete-size-md-padding-y) var(--pa-autocomplete-size-md-padding-x);
    font-size: var(--pa-autocomplete-size-md-font, var(--pa-font-size-200, 16px));
  }

  .pa-autocomplete--lg & {
    padding: var(--pa-autocomplete-size-lg-padding-y) var(--pa-autocomplete-size-lg-padding-x);
    font-size: var(--pa-autocomplete-size-lg-font, var(--pa-font-size-400, 20px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-autocomplete-background-hover, var(--pa-color-input-background-hover));
    border-color: var(--pa-autocomplete-border-hover, var(--pa-color-input-border-hover));
  }

  &:focus:not(.is-disabled) {
    background-color: var(--pa-autocomplete-background-focus, var(--pa-color-input-background-focus));
    border-color: var(--pa-autocomplete-border-focus, var(--pa-color-input-border-focus));
    outline: var(--pa-autocomplete-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-autocomplete-border-focus, var(--pa-color-input-border-focus));
    outline-offset: var(--pa-autocomplete-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  &.is-error {
    border-color: var(--pa-autocomplete-border-error, var(--pa-color-input-border-error));
  }

  &.is-disabled {
    background-color: var(--pa-autocomplete-background-disabled, var(--pa-color-input-background-disabled));
    color: var(--pa-autocomplete-text-disabled, var(--pa-color-input-text-disabled));
    border-color: var(--pa-autocomplete-border-disabled, var(--pa-color-input-border-disabled));
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-autocomplete-loading {
  position: absolute;
  right: var(--pa-spacing-12, 12px);
  display: flex;
  align-items: center;
}

.pa-autocomplete-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--pa-spacing-4, 4px);
  background-color: var(--pa-autocomplete-menu-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-autocomplete-menu-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-autocomplete-border-radius-default, var(--pa-Border-radius-100, 8px));
  box-shadow: var(--pa-autocomplete-menu-shadow, var(--pa-shadow-md));
  z-index: var(--pa-autocomplete-menu-z-index, var(--pa-z-index-400, 400));
  max-height: var(--pa-spacing-700, var(--pa-spacing-64, 64px));
  overflow-y: auto;
}

.pa-autocomplete-loading-menu {
  padding: var(--pa-spacing-16, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pa-autocomplete-options {
  padding: var(--pa-spacing-4, 4px);
}

.pa-autocomplete-option {
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-12, 12px);
  background-color: var(--pa-autocomplete-option-background-default, transparent);
  color: var(--pa-autocomplete-option-text-default, var(--pa-color-surface-container-text));
  cursor: var(--pa-cursor-pointer, pointer);
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: all var(--pa-autocomplete-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-autocomplete-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-autocomplete-size-md-font, var(--pa-font-size-200, 16px));
  font-weight: var(--pa-font-weight-400, 400);

  &:hover:not(.is-disabled),
  &.is-selected {
    background-color: var(--pa-autocomplete-option-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    pointer-events: none;
  }
}

.pa-autocomplete-empty {
  padding: var(--pa-spacing-16, 16px);
  text-align: center;
  color: var(--pa-gray-500, #adb5bd);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
}

.pa-autocomplete-menu-enter-active,
.pa-autocomplete-menu-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease),
    transform var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-autocomplete-menu-enter-from,
.pa-autocomplete-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>`,
  'pabadge': `<style lang="scss" scoped>
.pa-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--pa-badge-border-radius-default, var(--pa-Border-radius-full, 99999px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-500, 500);
  white-space: nowrap;

  &--default {
    background-color: var(--pa-badge-background-default);
    color: var(--pa-badge-text-default);
  }

  &--success {
    background-color: var(--pa-badge-background-success);
    color: var(--pa-badge-text-success);
  }

  &--warning {
    background-color: var(--pa-badge-background-warning);
    color: var(--pa-badge-text-warning);
  }

  &--error {
    background-color: var(--pa-badge-background-error);
    color: var(--pa-badge-text-error);
  }

  &--sm {
    padding: var(--pa-badge-size-sm-padding-y) var(--pa-badge-size-sm-padding-x);
    font-size: var(--pa-badge-size-sm-font, var(--pa-font-size-75, 12px));
  }

  &--md {
    padding: var(--pa-badge-size-md-padding-y) var(--pa-badge-size-md-padding-x);
    font-size: var(--pa-badge-size-md-font, var(--pa-font-size-100, 14px));
  }

  &--lg {
    padding: var(--pa-badge-size-lg-padding-y) var(--pa-badge-size-lg-padding-x);
    font-size: var(--pa-badge-size-lg-font, var(--pa-font-size-200, 16px));
  }

  &.is-dot {
    padding: 0;
    width: var(--pa-spacing-8, 8px);
    height: var(--pa-spacing-8, 8px);
    min-width: var(--pa-spacing-8, 8px);
  }
}

.pa-badge-content {
  display: inline-flex;
  align-items: center;
}

.pa-badge-dot {
  width: var(--pa-spacing-8, 8px);
  height: var(--pa-spacing-8, 8px);
  border-radius: var(--pa-Border-radius-full, 99999px);
  background-color: currentColor;
}
</style>`,
  'pabreadcrumbs': `<style lang="scss" scoped>
.pa-breadcrumbs {
  display: flex;
  align-items: center;
}

.pa-breadcrumbs-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--pa-breadcrumbs-spacing-item-gap, var(--pa-spacing-8, 8px));
}

.pa-breadcrumbs-item {
  display: flex;
  align-items: center;
  gap: var(--pa-breadcrumbs-spacing-item-gap, var(--pa-spacing-8, 8px));
}

.pa-breadcrumbs-link {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-4, 4px);
  color: var(--pa-breadcrumbs-text-link, var(--pa-color-action-primary-text-default));
  text-decoration: none;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-breadcrumbs-font-size, var(--pa-font-size-200, 16px));
  font-weight: var(--pa-font-weight-400, 400);
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  cursor: var(--pa-cursor-pointer, pointer);

  &:hover:not(.is-active) {
    text-decoration: underline;
  }

  &.is-active {
    color: var(--pa-breadcrumbs-text-default, var(--pa-color-surface-container-text));
    cursor: var(--pa-cursor-default, default);
  }
}

.pa-breadcrumbs-icon {
  display: flex;
  align-items: center;
  font-size: var(--pa-icon-size-200, 20px);
}

.pa-breadcrumbs-separator {
  color: var(--pa-breadcrumbs-text-separator, var(--pa-color-surface-container-icon));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-breadcrumbs-font-size, var(--pa-font-size-200, 16px));
}
</style>`,
  'pabutton': `<style lang="scss" scoped>
.pa-button {
  border: none;
  cursor: var(--pa-button-cursor-default, var(--pa-cursor-pointer, pointer));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  transition: all var(--pa-button-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-button-transition-easing-default, var(--pa-transition-easing-default, ease));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--pa-spacing-8, 8px);
  
  &.has-icon-left {
    justify-content: flex-start;
    gap: var(--pa-spacing-8, 8px);
  }
  
  &.has-icon-center {
    justify-content: center;
  }
  
  &.has-icon-right {
    justify-content: flex-end;
    gap: var(--pa-spacing-8, 8px);
  }

  &--primary {
    background-color: var(--pa-button-primary-background-default);
    color: var(--pa-button-primary-text-default);
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-primary-border-default);
    border-radius: var(--pa-button-primary-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-primary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-primary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-primary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-primary-background-disabled);
      color: var(--pa-button-primary-text-disabled);
      border-color: var(--pa-button-primary-border-disabled);
    }
  }

  &--secondary {
    background-color: var(--pa-button-secondary-background-default);
    color: var(--pa-button-secondary-text-default);
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-secondary-border-default);
    border-radius: var(--pa-button-secondary-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-secondary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-secondary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-secondary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-secondary-background-disabled);
      color: var(--pa-button-secondary-text-disabled);
      border-color: var(--pa-button-secondary-border-disabled);
    }
  }

  &--tertiary {
    background-color: var(--pa-button-tertiary-background-default);
    color: var(--pa-button-tertiary-text-default);
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-tertiary-border-default);
    border-radius: var(--pa-button-tertiary-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-tertiary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-tertiary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-tertiary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-tertiary-background-disabled);
      color: var(--pa-button-tertiary-text-disabled);
      border-color: var(--pa-button-tertiary-border-disabled);
    }
  }

  &--link {
    background-color: transparent;
    color: var(--pa-button-link-text-default, var(--pa-color-action-primary-text-default));
    border: none;
    border-radius: 0;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: var(--pa-spacing-4, 4px);

    &:hover:not(.is-disabled) {
      color: var(--pa-button-link-text-hover, var(--pa-color-action-primary-text-hover));
      text-decoration-thickness: 2px;
    }

    &:active:not(.is-disabled) {
      color: var(--pa-button-link-text-active, var(--pa-color-action-primary-text-active));
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-link-border-focus, var(--pa-color-action-primary-border-focus));
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
      border-radius: var(--pa-Border-radius-50, 4px);
    }

    &.is-disabled,
    &:disabled {
      color: var(--pa-button-link-text-disabled, var(--pa-color-action-primary-text-disabled));
      text-decoration: none;
      opacity: calc(var(--pa-opacity-60, 60) / 100);
    }
  }

  &--action {
    background-color: var(--pa-button-action-background-default);
    color: var(--pa-button-action-text-default);
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-action-border-default);
    border-radius: var(--pa-button-action-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-action-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-action-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-action-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-action-background-disabled);
      color: var(--pa-button-action-text-disabled);
      border-color: var(--pa-button-action-border-disabled);
    }
  }

  &--sm {
    padding: var(--pa-button-size-sm-padding-y) var(--pa-button-size-sm-padding-x);
    font-size: var(--pa-button-size-sm-font);
  }

  &--md {
    padding: var(--pa-button-size-md-padding-y) var(--pa-button-size-md-padding-x);
    font-size: var(--pa-button-size-md-font);
  }

  &--lg {
    padding: var(--pa-button-size-lg-padding-y) var(--pa-button-size-lg-padding-x);
    font-size: var(--pa-button-size-lg-font);
  }

  &.is-disabled,
  &:disabled {
    cursor: var(--pa-button-cursor-disabled, var(--pa-cursor-not-allowed, not-allowed));
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }

  &.is-loading {
    position: relative;
    pointer-events: none;
    
    .pa-button-loader {
      display: inline-block;
      width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
      height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
      border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: pa-button-spin 0.6s linear infinite;
      margin-right: var(--pa-spacing-8, 8px);
    }
  }
}

@keyframes pa-button-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .pa-button {
    width: 100%;
  }
}
</style>`,
  'pacard': `<style lang="scss" scoped>
.pa-card {
  background-color: var(--pa-card-background-default);
  border: var(--pa-card-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-card-border-default);
  border-radius: var(--pa-card-border-radius-default, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-card-padding-y) var(--pa-card-padding-x);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  box-shadow: var(--pa-card-shadow-default);

  &--outlined {
    border-width: var(--pa-Border-width-100, 2px);
  }

  &--elevated {
    box-shadow: var(--pa-card-shadow-hover);
  }

  &.is-hoverable {
    cursor: var(--pa-cursor-pointer, pointer);

    &:hover {
      background-color: var(--pa-card-background-hover);
      border-color: var(--pa-card-border-hover);
      box-shadow: var(--pa-card-shadow-hover);
    }
  }

  &.is-selected {
    background-color: var(--pa-card-background-selected);
    border-color: var(--pa-card-border-selected);
  }
}

.pa-card-header {
  margin-bottom: var(--pa-spacing-16, 16px);
  padding-bottom: var(--pa-spacing-16, 16px);
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}

.pa-card-body {
  flex: 1;
}

.pa-card-footer {
  margin-top: var(--pa-spacing-16, 16px);
  padding-top: var(--pa-spacing-16, 16px);
  border-top: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}
</style>`,
  'pacheckbox': `<style lang="scss" scoped>
.pa-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  cursor: var(--pa-cursor-pointer, pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);

  &.is-disabled {
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pa-checkbox-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--pa-checkbox-background-default);
  border: var(--pa-checkbox-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-checkbox-border-default);
  border-radius: var(--pa-checkbox-border-radius-default, var(--pa-Border-radius-50, 4px));
  transition: all var(--pa-checkbox-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-checkbox-transition-easing-default, var(--pa-transition-easing-default, ease));
  flex-shrink: 0;

  .pa-checkbox--sm & {
    width: var(--pa-checkbox-size-sm-width, 16px);
    height: var(--pa-checkbox-size-sm-height, 16px);
  }

  .pa-checkbox--md & {
    width: var(--pa-checkbox-size-md-width, 20px);
    height: var(--pa-checkbox-size-md-height, 20px);
  }

  .pa-checkbox--lg & {
    width: var(--pa-checkbox-size-lg-width, 24px);
    height: var(--pa-checkbox-size-lg-height, 24px);
  }

  .pa-checkbox:not(.is-disabled):hover & {
    background-color: var(--pa-checkbox-background-hover);
    border-color: var(--pa-checkbox-border-checked);
  }

  .pa-checkbox-input:focus-visible + & {
    outline: var(--pa-checkbox-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-checkbox-border-focus);
    outline-offset: var(--pa-checkbox-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  .pa-checkbox.is-checked & {
    background-color: var(--pa-checkbox-background-checked);
    border-color: var(--pa-checkbox-border-checked);
  }

  .pa-checkbox.is-disabled & {
    background-color: var(--pa-checkbox-background-disabled);
    border-color: var(--pa-checkbox-border-disabled);
  }
}

.pa-checkbox-checkmark {
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  color: var(--pa-checkbox-checkmark-default);

  .pa-checkbox--sm & {
    width: calc(var(--pa-checkbox-size-sm-width, var(--pa-icon-size-sm, 16px)) * 0.625);
    height: calc(var(--pa-checkbox-size-sm-width, var(--pa-icon-size-sm, 16px)) * 0.625);
  }

  .pa-checkbox--lg & {
    width: calc(var(--pa-checkbox-size-lg-width, var(--pa-icon-size-md, 24px)) * 0.583);
    height: calc(var(--pa-checkbox-size-lg-width, var(--pa-icon-size-md, 24px)) * 0.583);
  }

  .pa-checkbox.is-disabled & {
    color: var(--pa-checkbox-checkmark-disabled);
  }
}

.pa-checkbox-indeterminate {
  width: calc(var(--pa-checkbox-size-md-width, var(--pa-spacing-250, 18px)) * 0.444);
  height: var(--pa-Border-width-50, 1px);
  background-color: var(--pa-checkbox-checkmark-default);
  border-radius: var(--pa-Border-radius-50, 4px);

  .pa-checkbox.is-disabled & {
    background-color: var(--pa-checkbox-checkmark-disabled);
  }
}

.pa-checkbox-label {
  color: var(--pa-input-text-default, var(--pa-color-surface-container-text));
  user-select: none;
}
</style>`,
  'pacheckboxgroup': `<style lang="scss" scoped>
.pa-checkbox-group {
  display: inline-flex;
  gap: var(--pa-checkbox-group-gap, var(--pa-spacing-16, 16px));
  border: none;
  padding: 0;
  margin: 0;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>`,
  'pacircle': `<style lang="scss" scoped>
.pa-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--pa-circle-background, var(--pa-color-surface-container-background));
  overflow: hidden;
}
</style>`,
  'pacolorpicker': `<style lang="scss" scoped>
.pa-color-picker {
  display: inline-block;

  &-input {
    width: var(--pa-color-picker-size, 48px);
    height: var(--pa-color-picker-size, 48px);
    border: var(--pa-color-picker-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-color-picker-border, var(--pa-color-surface-container-border));
    border-radius: var(--pa-color-picker-radius, var(--pa-Border-radius-100, 8px));
    cursor: var(--pa-cursor-pointer, pointer);
    padding: 0;

    &:disabled {
      cursor: var(--pa-cursor-not-allowed, not-allowed);
      opacity: calc(var(--pa-opacity-60, 60) / 100);
    }
  }
}
</style>`,
  'pacontainer': `<style lang="scss" scoped>
.pa-container {
  width: 100%;
  background-color: var(--pa-container-background-default, var(--pa-color-surface-container-background));

  &--subtle {
    background-color: var(--pa-container-background-subtle, var(--pa-color-surface-base-background));
  }

  &--outlined {
    border: var(--pa-Border-width-50, 1px) solid var(--pa-container-border, var(--pa-color-surface-container-border));
    border-radius: var(--pa-container-border-radius, var(--pa-Border-radius-100, 8px));
  }

  &--elevated {
    box-shadow: var(--pa-shadow-md, var(--pa-shadow-md));
    border-radius: var(--pa-container-border-radius, var(--pa-Border-radius-100, 8px));
  }

  &--sm {
    padding: var(--pa-container-padding-sm-y) var(--pa-container-padding-sm-x);
  }

  &--md {
    padding: var(--pa-container-padding-md-y) var(--pa-container-padding-md-x);
  }

  &--lg {
    padding: var(--pa-container-padding-lg-y) var(--pa-container-padding-lg-x);
  }

  &.is-centered {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>`,
  'pacontentseparator': `<style lang="scss" scoped>
.pa-content-separator {
  border-color: var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));

  &--horizontal {
    width: 100%;
    height: var(--pa-Border-width-50, 1px);
    border-top: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
    display: flex;
    align-items: center;

    &.has-text {
      border-top: none;
      gap: var(--pa-spacing-16, 16px);

      &::before,
      &::after {
        content: '';
        flex: 1;
        height: var(--pa-Border-width-50, 1px);
        background-color: var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
      }
    }
  }

  &--vertical {
    width: var(--pa-Border-width-50, 1px);
    height: 100%;
    border-left: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
    display: flex;
    flex-direction: column;
    align-items: center;

    &.has-text {
      border-left: none;
      gap: var(--pa-spacing-16, 16px);

      &::before,
      &::after {
        content: '';
        flex: 1;
        width: var(--pa-Border-width-50, 1px);
        background-color: var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
      }
    }
  }
}

.pa-content-separator-text {
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-100, 14px);
  font-weight: var(--pa-font-weight-400, 400);
  white-space: nowrap;
}
</style>`,
  'pacurrencyinput': `<style lang="scss" scoped>
.pa-currency-input {
  &-symbol {
    color: var(--pa-input-text-default, var(--pa-color-surface-container-text));
    font-weight: var(--pa-font-weight-500, 500);
    padding-right: var(--pa-spacing-8, 8px);
  }
}
</style>`,
  'padivider': `<style lang="scss" scoped>
.pa-divider {
  border: none;
  background-color: var(--pa-divider-background, var(--pa-color-surface-container-border));

  &--horizontal {
    width: 100%;
    height: var(--pa-divider-thickness, var(--pa-Border-width-50, 1px));
    margin: var(--pa-divider-spacing-md, var(--pa-spacing-16, 16px)) 0;
  }

  &--vertical {
    width: var(--pa-divider-thickness, var(--pa-Border-width-50, 1px));
    height: 100%;
    margin: 0 var(--pa-divider-spacing-md, var(--pa-spacing-16, 16px));
  }

  &--spacing-sm {
    margin: var(--pa-divider-spacing-sm, var(--pa-spacing-8, 8px));
  }

  &--spacing-md {
    margin: var(--pa-divider-spacing-md, var(--pa-spacing-16, 16px));
  }

  &--spacing-lg {
    margin: var(--pa-divider-spacing-lg, var(--pa-spacing-24, 24px));
  }
}
</style>`,
  'padrawer': `<style lang="scss" scoped>
.pa-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pa-drawer-overlay-background, var(--pa-color-modal-overlay-background));
  z-index: var(--pa-z-index-500, 500);
}

.pa-drawer-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--pa-drawer-container-background, var(--pa-color-modal-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  box-shadow: var(--pa-drawer-container-shadow, var(--pa-shadow-300));
  overflow: hidden;

  &--left {
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--pa-drawer-size-md-width, 400px);
    border-right: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--right {
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--pa-drawer-size-md-width, 400px);
    border-left: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
    height: var(--pa-drawer-size-md-height, 400px);
    border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--pa-drawer-size-md-height, 400px);
    border-top: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--sm {
    &.pa-drawer-container--left,
    &.pa-drawer-container--right {
      width: var(--pa-drawer-size-sm-width, 300px);
    }
    &.pa-drawer-container--top,
    &.pa-drawer-container--bottom {
      height: var(--pa-drawer-size-sm-height, 300px);
    }
  }

  &--lg {
    &.pa-drawer-container--left,
    &.pa-drawer-container--right {
      width: var(--pa-drawer-size-lg-width, 600px);
    }
    &.pa-drawer-container--top,
    &.pa-drawer-container--bottom {
      height: var(--pa-drawer-size-lg-height, 600px);
    }
  }
}

.pa-drawer-header {
  padding: var(--pa-drawer-header-padding, var(--pa-spacing-16, 16px));
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-header-border, var(--pa-color-surface-base-divider));
}

.pa-drawer-body {
  flex: 1;
  padding: var(--pa-drawer-body-padding, var(--pa-spacing-16, 16px));
  overflow-y: auto;
}

.pa-drawer-footer {
  padding: var(--pa-drawer-footer-padding, var(--pa-spacing-16, 16px));
  border-top: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-footer-border, var(--pa-color-surface-base-divider));
}

.pa-drawer-enter-active,
.pa-drawer-leave-active {
  transition: opacity var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--left,
.pa-drawer-leave-active .pa-drawer-container--left {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--right,
.pa-drawer-leave-active .pa-drawer-container--right {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--top,
.pa-drawer-leave-active .pa-drawer-container--top {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--bottom,
.pa-drawer-leave-active .pa-drawer-container--bottom {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-from .pa-drawer-container--left {
  transform: translateX(-100%);
}

.pa-drawer-leave-to .pa-drawer-container--left {
  transform: translateX(-100%);
}

.pa-drawer-enter-from .pa-drawer-container--right {
  transform: translateX(100%);
}

.pa-drawer-leave-to .pa-drawer-container--right {
  transform: translateX(100%);
}

.pa-drawer-enter-from .pa-drawer-container--top {
  transform: translateY(-100%);
}

.pa-drawer-leave-to .pa-drawer-container--top {
  transform: translateY(-100%);
}

.pa-drawer-enter-from .pa-drawer-container--bottom {
  transform: translateY(100%);
}

.pa-drawer-leave-to .pa-drawer-container--bottom {
  transform: translateY(100%);
}
</style>`,
  'padropdown': `<style lang="scss" scoped>
.pa-dropdown {
  position: relative;
  display: inline-block;
}

.pa-dropdown-trigger {
  cursor: var(--pa-cursor-pointer, pointer);
}

.pa-dropdown-menu {
  position: absolute;
  background-color: var(--pa-dropdown-menu-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-dropdown-menu-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-dropdown-menu-border-radius, var(--pa-Border-radius-100, 8px));
  box-shadow: var(--pa-dropdown-menu-shadow, var(--pa-shadow-md));
  padding: var(--pa-dropdown-menu-padding-y) var(--pa-dropdown-menu-padding-x);
  z-index: var(--pa-dropdown-menu-z-index, var(--pa-z-index-400, 400));
  min-width: var(--pa-spacing-500, var(--pa-spacing-48, 48px));
  margin-top: var(--pa-spacing-4, 4px);

  &--top {
    bottom: 100%;
    margin-top: 0;
    margin-bottom: var(--pa-spacing-4, 4px);
  }

  &--left {
    right: 100%;
    margin-top: 0;
    margin-right: var(--pa-spacing-4, 4px);
  }

  &--right {
    left: 100%;
    margin-top: 0;
    margin-left: var(--pa-spacing-4, 4px);
  }
}

.pa-dropdown-enter-active,
.pa-dropdown-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease),
    transform var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-dropdown-enter-from,
.pa-dropdown-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--pa-spacing-4, 4px) * -1));
}
</style>`,
  'paemptystate': `<style lang="scss" scoped>
.pa-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--pa-spacing-32, 32px);
}

.pa-empty-state-icon {
  color: var(--pa-empty-state-icon, var(--pa-gray-400, #ced4da));
  margin-bottom: var(--pa-empty-state-spacing-icon, var(--pa-spacing-24, 24px));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-xl, var(--pa-icon-size-400, 64px));
  height: var(--pa-icon-size-xl, var(--pa-icon-size-400, 64px));
}

.pa-empty-state-title {
  color: var(--pa-empty-state-text-primary, var(--pa-color-surface-container-text));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-700, 700);
  margin: 0 0 var(--pa-empty-state-spacing-text, var(--pa-spacing-16, 16px)) 0;
}

.pa-empty-state-description {
  color: var(--pa-empty-state-text-secondary, var(--pa-gray-500, #adb5bd));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  margin: 0 0 var(--pa-empty-state-spacing-text, var(--pa-spacing-16, 16px)) 0;
  max-width: var(--pa-spacing-800, var(--pa-spacing-100, 100px));
}

.pa-empty-state-action {
  margin-top: var(--pa-spacing-8, 8px);
}
</style>`,
  'pafileuploader': `<style lang="scss" scoped>
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
</style>`,
  'paform': `<style lang="scss" scoped>
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
</style>`,
  'paformcontainer': `<style lang="scss" scoped>
.pa-form-container {
  background-color: var(--pa-form-container-background, var(--pa-color-surface-container-background));
  border-radius: var(--pa-form-container-border-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-form-container-padding-y) var(--pa-form-container-padding-x);
  width: 100%;

  &--outlined {
    border: var(--pa-Border-width-50, 1px) solid var(--pa-form-container-border, var(--pa-color-surface-container-border));
  }

  &--elevated {
    box-shadow: var(--pa-shadow-md, var(--pa-shadow-md));
  }
}

.pa-form-container-header {
  padding-bottom: var(--pa-form-container-header-padding-bottom);
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-form-container-header-border, var(--pa-color-surface-base-divider));
  margin-bottom: var(--pa-form-container-spacing-section, var(--pa-spacing-32, 32px));
}

.pa-form-container-title {
  margin: 0 0 var(--pa-spacing-8, 8px) 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-700, 700);
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
}

.pa-form-container-description {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  color: var(--pa-gray-500, #adb5bd);
}

.pa-form-container-content {
  display: flex;
  flex-direction: column;
  gap: var(--pa-form-container-spacing-field, var(--pa-spacing-16, 16px));
}

.pa-form-container-footer {
  margin-top: var(--pa-form-container-spacing-section, var(--pa-spacing-32, 32px));
  padding-top: var(--pa-form-container-spacing-section, var(--pa-spacing-32, 32px));
  border-top: var(--pa-Border-width-50, 1px) solid var(--pa-form-container-header-border, var(--pa-color-surface-base-divider));
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  justify-content: flex-end;
}
</style>`,
  'paformdivider': `<style lang="scss" scoped>
.pa-form-divider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &--spacing-sm {
    margin: var(--pa-form-divider-spacing-sm, var(--pa-spacing-16, 16px)) 0;
  }

  &--spacing-md {
    margin: var(--pa-form-divider-spacing-md, var(--pa-spacing-24, 24px)) 0;
  }

  &--spacing-lg {
    margin: var(--pa-form-divider-spacing-lg, var(--pa-spacing-32, 32px)) 0;
  }

  &-line {
    flex: 1;
    border: none;
    border-top: var(--pa-form-divider-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-form-divider-border, var(--pa-color-surface-container-border));
    margin: 0;
  }

  &-label {
    padding: 0 var(--pa-spacing-16, 16px);
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-100, 14px);
    font-weight: var(--pa-font-weight-500, 500);
    color: var(--pa-form-divider-text, var(--pa-color-surface-container-text-secondary));
    background-color: var(--pa-form-divider-background, var(--pa-color-surface-base-background));
  }
}
</style>`,
  'paheader': `<style lang="scss" scoped>
.pa-header {
  background-color: var(--pa-header-background, var(--pa-color-surface-container-background));
  color: var(--pa-header-text, var(--pa-color-surface-container-text));
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-header-border, var(--pa-color-surface-container-border));
  height: var(--pa-header-height, 64px);
  padding: var(--pa-header-padding-y) var(--pa-header-padding-x);

  &.is-sticky {
    position: sticky;
    top: 0;
    z-index: var(--pa-header-z-index, var(--pa-z-index-200, 200));
  }
}

.pa-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 100%;
}

.pa-header-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.pa-header-navigation {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 var(--pa-spacing-24, 24px);
}

.pa-header-actions {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  flex-shrink: 0;
}
</style>`,
  'paheroheader': `<style lang="scss" scoped>
.pa-hero-header {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-700, 700);
  color: var(--pa-hero-header-text, var(--pa-color-surface-base-text));
  line-height: var(--pa-hero-header-line-height, 1.2);

  &--sm {
    font-size: var(--pa-hero-header-size-sm, var(--pa-font-size-400, 32px));
  }

  &--md {
    font-size: var(--pa-hero-header-size-md, var(--pa-font-size-600, 48px));
  }

  &--lg {
    font-size: var(--pa-hero-header-size-lg, var(--pa-font-size-800, 64px));
  }
}
</style>`,
  'paheroicon': `<style lang="scss" scoped>
.pa-hero-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-hero-icon-color, var(--pa-color-surface-base-icon));

  &--sm {
    width: var(--pa-hero-icon-size-sm, var(--pa-icon-size-300, 32px));
    height: var(--pa-hero-icon-size-sm, var(--pa-icon-size-300, 32px));
  }

  &--md {
    width: var(--pa-hero-icon-size-md, var(--pa-icon-size-400, 48px));
    height: var(--pa-hero-icon-size-md, var(--pa-icon-size-400, 48px));
  }

  &--lg {
    width: var(--pa-hero-icon-size-lg, var(--pa-icon-size-500, 56px));
    height: var(--pa-hero-icon-size-lg, var(--pa-icon-size-500, 56px));
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>`,
  'paherosubheader': `<style lang="scss" scoped>
.pa-hero-subheader {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  color: var(--pa-hero-subheader-text, var(--pa-color-surface-container-text));
  line-height: var(--pa-hero-subheader-line-height, 1.5);

  &--sm {
    font-size: var(--pa-hero-subheader-size-sm, var(--pa-font-size-100, 14px));
  }

  &--md {
    font-size: var(--pa-hero-subheader-size-md, var(--pa-font-size-200, 16px));
  }

  &--lg {
    font-size: var(--pa-hero-subheader-size-lg, var(--pa-font-size-400, 32px));
  }
}
</style>`,
  'paherosubheadergroup': `<style lang="scss" scoped>
.pa-hero-subheader-group {
  display: flex;
  flex-direction: column;

  &--gap-sm {
    gap: var(--pa-hero-subheader-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-hero-subheader-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-hero-subheader-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>`,
  'paicon': `<style lang="scss" scoped>
.pa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-icon-color, var(--pa-color-surface-container-icon));

  &--sm {
    width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
    height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  }

  &--md {
    width: var(--pa-icon-size-md, var(--pa-icon-size-200, 24px));
    height: var(--pa-icon-size-md, var(--pa-icon-size-200, 24px));
  }

  &--lg {
    width: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
    height: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
  }

  &--xl {
    width: var(--pa-icon-size-xl, var(--pa-icon-size-400, 48px));
    height: var(--pa-icon-size-xl, var(--pa-icon-size-400, 48px));
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>`,
  'painlinemessage': `<style lang="scss" scoped>
.pa-inline-message {
  display: flex;
  align-items: flex-start;
  gap: var(--pa-spacing-12, 12px);
  padding: var(--pa-inline-message-padding-y) var(--pa-inline-message-padding-x);
  border: var(--pa-inline-message-border-width-default, var(--pa-Border-width-50, 1px)) solid;
  border-radius: var(--pa-inline-message-border-radius-default, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);

  &--info {
    background-color: var(--pa-inline-message-background-info);
    color: var(--pa-inline-message-text-info);
    border-color: var(--pa-inline-message-border-info);
  }

  &--success {
    background-color: var(--pa-inline-message-background-success);
    color: var(--pa-inline-message-text-success);
    border-color: var(--pa-inline-message-border-success);
  }

  &--warning {
    background-color: var(--pa-inline-message-background-warning);
    color: var(--pa-inline-message-text-warning);
    border-color: var(--pa-inline-message-border-warning);
  }

  &--error {
    background-color: var(--pa-inline-message-background-error);
    color: var(--pa-inline-message-text-error);
    border-color: var(--pa-inline-message-border-error);
  }
}

.pa-inline-message-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));

  .pa-inline-message--info & {
    color: var(--pa-inline-message-icon-info);
  }

  .pa-inline-message--success & {
    color: var(--pa-inline-message-icon-success);
  }

  .pa-inline-message--warning & {
    color: var(--pa-inline-message-icon-warning);
  }

  .pa-inline-message--error & {
    color: var(--pa-inline-message-icon-error);
  }
}

.pa-inline-message-content {
  flex: 1;
}

.pa-inline-message-close {
  background: none;
  border: none;
  font-size: var(--pa-font-size-500, 24px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: currentColor;
  padding: var(--pa-spacing-4, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-md, var(--pa-icon-size-200, 24px));
  height: var(--pa-icon-size-md, var(--pa-icon-size-200, 24px));
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    opacity: 1;
  }
}

.pa-inline-message-enter-active,
.pa-inline-message-leave-active {
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-inline-message-enter-from,
.pa-inline-message-leave-to {
  opacity: 0;
}
</style>`,
  'painput': `<style lang="scss" scoped>
.pa-input-wrapper {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-input-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.pa-input-label {
  position: absolute;
  left: var(--pa-input-padding-x, var(--pa-spacing-200, 16px));
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--pa-input-font-size, var(--pa-font-size-lg, 16px));
  font-weight: var(--pa-input-label-font-weight, var(--pa-font-weight-400, 400));
  color: var(--pa-input-text-default);
  pointer-events: none;
  transition: all var(--pa-input-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-input-transition-easing-default, var(--pa-transition-easing-default, ease));
  z-index: 1;
  white-space: nowrap;
  max-width: calc(100% - calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) * 2));

  &.is-floating {
    top: var(--pa-input-padding-y, var(--pa-spacing-100, 8px));
    transform: none;
    font-size: var(--pa-input-label-font-size, var(--pa-font-size-sm, 12px));
    color: var(--pa-input-text-placeholder);
    line-height: 1;
  }
}

.pa-input-wrapper.has-icon-left .pa-input-label {
  left: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)));
  max-width: calc(100% - calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) * 2) - var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) - var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)));

  &.is-floating {
    left: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)));
  }
}

.pa-input-label-optional {
  color: var(--pa-input-label-color-optional, var(--pa-input-text-placeholder));
  font-weight: var(--pa-font-weight-400, 400);
}

.pa-input {
  width: 100%;
  height: var(--pa-input-height-default, var(--pa-spacing-700, 56px));
  box-sizing: border-box;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-input-font-size, var(--pa-font-size-lg, 16px));
  font-weight: var(--pa-input-font-weight, var(--pa-font-weight-400, 400));
  padding: var(--pa-input-padding-y, var(--pa-spacing-100, 8px)) var(--pa-input-padding-x, var(--pa-spacing-200, 16px));
  background-color: var(--pa-input-background-default);
  color: var(--pa-input-text-default);
  border: var(--pa-input-border-width-default, var(--pa-border-width-thin, 1px)) solid var(--pa-input-border-default);
  border-radius: var(--pa-input-border-radius-default, var(--pa-border-radius-medium, 8px));
  transition: all var(--pa-input-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-input-transition-easing-default, var(--pa-transition-easing-default, ease));
  outline: none;


  &::placeholder {
    color: transparent;
  }

  &.has-label.is-label-floating {
    padding-top: calc(var(--pa-input-padding-y, var(--pa-spacing-100, 8px)) + var(--pa-input-label-font-size, var(--pa-font-size-sm, 12px)) + 6px);
    padding-bottom: var(--pa-input-padding-y, var(--pa-spacing-100, 8px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-input-background-hover);
    border-color: var(--pa-input-border-hover);
  }

  &:focus:not(.is-disabled) {
    background-color: var(--pa-input-background-focus);
    border-color: var(--pa-input-border-focus);
    outline: var(--pa-input-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-input-border-focus);
    outline-offset: var(--pa-input-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  &.is-error {
    border-color: var(--pa-input-border-error);

    &:focus {
      outline-color: var(--pa-input-border-error);
    }
  }

  &.is-valid {
    border-color: var(--pa-input-border-valid);

    &:focus {
      outline-color: var(--pa-input-border-valid);
    }
  }

  &.is-disabled,
  &:disabled {
    background-color: var(--pa-input-background-disabled);
    color: var(--pa-input-text-disabled);
    border-color: var(--pa-input-border-disabled);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }

  &.has-icon-left {
    padding-left: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)));
  }

  &.has-icon-right {
    padding-right: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-input-icon-spacing-right, var(--pa-spacing-200, 16px)));
  }

  &.has-right-element {
    padding-right: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-right-element-width, var(--pa-spacing-500, 48px)) + var(--pa-input-right-element-spacing-left, var(--pa-spacing-100, 8px)));
  }
}

.pa-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-input-icon-default);
  pointer-events: none;
  width: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  height: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  font-size: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  line-height: 1;
  z-index: 2;

  &--left {
    left: var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px));
  }

  &--right {
    right: var(--pa-input-icon-spacing-right, var(--pa-spacing-200, 16px));
  }

  &--error {
    color: var(--pa-input-icon-error);
  }

  &--success {
    color: var(--pa-input-icon-success);
  }
}

.pa-input-wrapper.is-error {
  .pa-input-icon {
    color: var(--pa-input-icon-error);
  }
}

.pa-input-wrapper.is-valid {
  .pa-input-icon {
    color: var(--pa-input-icon-success);
  }
}

.pa-input-clear {
  position: absolute;
  right: var(--pa-input-icon-spacing-right, var(--pa-spacing-200, 16px));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  height: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  background: none;
  border: none;
  color: var(--pa-input-icon-default);
  cursor: pointer;
  font-size: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  line-height: 1;
  padding: 0;
  z-index: 2;
  transition: color var(--pa-input-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-input-transition-easing-default, var(--pa-transition-easing-default, ease));

  &:hover {
    color: var(--pa-input-text-default);
  }

  &:focus {
    outline: var(--pa-input-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-input-border-focus);
    outline-offset: var(--pa-input-outline-offset-default, var(--pa-outline-offset-default, 2px));
    border-radius: 2px;
  }
}

.pa-input-right-element {
  position: absolute;
  right: var(--pa-input-right-element-spacing-left, var(--pa-spacing-100, 8px));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-input-right-element-width, var(--pa-spacing-500, 48px));
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.pa-input-helper {
  display: block;
  font-size: var(--pa-input-helper-font-size, var(--pa-font-size-sm, 12px));
  font-weight: var(--pa-input-helper-font-weight, var(--pa-font-weight-400, 400));
  color: var(--pa-input-helper-color-default, var(--pa-input-text-placeholder));
  margin-top: var(--pa-input-helper-spacing-top, var(--pa-spacing-50, 4px));
}

.pa-input-message {
  display: block;
  margin-top: var(--pa-input-message-error-spacing-top, var(--pa-spacing-50, 4px));

  &--error {
    font-size: var(--pa-input-message-error-font-size, var(--pa-font-size-sm, 12px));
    font-weight: var(--pa-input-message-error-font-weight, var(--pa-font-weight-400, 400));
    color: var(--pa-input-message-error-color, var(--pa-input-border-error));
  }

  &--valid {
    font-size: var(--pa-input-message-valid-font-size, var(--pa-font-size-sm, 12px));
    font-weight: var(--pa-input-message-valid-font-weight, var(--pa-font-weight-400, 400));
    color: var(--pa-input-message-valid-color, var(--pa-input-border-valid));
    margin-top: var(--pa-input-message-valid-spacing-top, var(--pa-spacing-50, 4px));
  }
}

@media (max-width: 768px) {
  .pa-input-wrapper {
    width: 100%;
  }

  .pa-input-container {
    width: 100%;
  }

  .pa-input {
    width: 100%;
  }
}
</style>`,
  'painputgroup': `<style lang="scss" scoped>
.pa-input-group {
  display: flex;

  &--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }

  &--vertical {
    flex-direction: column;
  }

  &--gap-sm {
    gap: var(--pa-input-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-input-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-input-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>`,
  'pakebabmenu': `<style lang="scss" scoped>
.pa-kebab-menu-trigger {
  background: none;
  border: none;
  padding: var(--pa-spacing-4, 4px);
  cursor: var(--pa-cursor-pointer, pointer);
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
  height: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }

  svg {
    width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
    height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  }
}
</style>`,
  'palistitem': `<style lang="scss" scoped>
.pa-list-item {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-12, 12px);
  padding: var(--pa-list-item-padding-y) var(--pa-list-item-padding-x);
  background-color: var(--pa-list-item-background-default, var(--pa-color-surface-base-background));
  color: var(--pa-list-item-text, var(--pa-color-surface-base-text));
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-list-item-border, var(--pa-color-surface-base-divider));
  transition: all var(--pa-list-item-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-list-item-transition-easing-default, var(--pa-transition-easing-default, ease));

  &:last-child {
    border-bottom: none;
  }

  &.is-hoverable {
    cursor: var(--pa-cursor-pointer, pointer);

    &:hover {
      background-color: var(--pa-list-item-background-hover, var(--pa-color-surface-cards-hover-background));
    }
  }

  &.is-selected {
    background-color: var(--pa-list-item-background-selected, var(--pa-color-surface-cards-selected-background));
  }
}

.pa-list-item-avatar,
.pa-list-item-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.pa-list-item-content {
  flex: 1;
  min-width: 0;
}

.pa-list-item-actions {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  flex-shrink: 0;
}
</style>`,
  'paloading': `<style lang="scss" scoped>
.pa-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.is-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--pa-loading-overlay-background, rgba(255, 255, 255, 0.8));
    z-index: var(--pa-loading-overlay-z-index, var(--pa-z-index-300, 300));
  }

  &--sm {
    .pa-loading-spinner {
      width: var(--pa-loading-size-sm, 16px);
      height: var(--pa-loading-size-sm, 16px);
    }
  }

  &--md {
    .pa-loading-spinner {
      width: var(--pa-loading-size-md, 24px);
      height: var(--pa-loading-size-md, 24px);
    }
  }

  &--lg {
    .pa-loading-spinner {
      width: var(--pa-loading-size-lg, 32px);
      height: var(--pa-loading-size-lg, 32px);
    }
  }
}

.pa-loading-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-loading-spinner-primary, var(--pa-color-action-primary-background-default));

  &--primary {
    color: var(--pa-loading-spinner-primary, var(--pa-color-action-primary-background-default));
  }

  &--secondary {
    color: var(--pa-loading-spinner-secondary, var(--pa-color-action-secondary-background-default));
  }

  svg {
    width: 100%;
    height: 100%;
    animation: pa-loading-spin 1s linear infinite;
  }
}

@keyframes pa-loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>`,
  'pamodal': `<style lang="scss" scoped>
.pa-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pa-modal-overlay-background, rgba(0, 0, 0, 0.5));
  z-index: var(--pa-modal-overlay-z-index, var(--pa-z-index-400, 400));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--pa-spacing-16, 16px);
}

.pa-modal-container {
  background-color: var(--pa-modal-container-background);
  border: var(--pa-Border-width-50, 1px) solid var(--pa-modal-container-border);
  border-radius: var(--pa-modal-container-border-radius, var(--pa-Border-radius-200, 24px));
  box-shadow: var(--pa-modal-container-shadow, var(--pa-shadow-lg));
  z-index: var(--pa-modal-container-z-index, var(--pa-z-index-500, 500));
  max-width: 100%;
  max-height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &--sm {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-sm, 400px);
  }

  &--md {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-md, 600px);
  }

  &--lg {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-lg, 800px);
  }

  &--fullscreen {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
  }
}

.pa-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--pa-modal-header-background);
  color: var(--pa-modal-header-text);
  padding: var(--pa-modal-header-padding-y) var(--pa-modal-header-padding-x);
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-modal-footer-border, var(--pa-color-surface-base-divider));
  flex-shrink: 0;
}

.pa-modal-close {
  background: none;
  border: none;
  font-size: var(--pa-font-size-500, 24px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: var(--pa-modal-header-text);
  padding: var(--pa-spacing-4, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }
}

.pa-modal-body {
  padding: var(--pa-modal-body-padding-y) var(--pa-modal-body-padding-x);
  overflow-y: auto;
  flex: 1;
}

.pa-modal-footer {
  background-color: var(--pa-modal-footer-background);
  border-top: 1px solid var(--pa-modal-footer-border);
  padding: var(--pa-modal-footer-padding-y) var(--pa-modal-footer-padding-x);
  flex-shrink: 0;
}

.pa-modal-enter-active,
.pa-modal-leave-active {
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-modal-enter-from,
.pa-modal-leave-to {
  opacity: 0;
}
</style>`,
  'panavbutton': `<style lang="scss" scoped>
.pa-nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: var(--pa-nav-button-cursor, var(--pa-cursor-pointer, pointer));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  text-decoration: none;
  transition: all var(--pa-nav-button-transition-duration, var(--pa-transition-duration-default, 200ms)) var(--pa-nav-button-transition-easing, var(--pa-transition-easing-default, ease));
  color: var(--pa-nav-button-text-default, var(--pa-color-surface-container-text));
  padding: var(--pa-nav-button-padding-y, var(--pa-spacing-8, 8px)) var(--pa-nav-button-padding-x, var(--pa-spacing-16, 16px));
  border-radius: var(--pa-nav-button-radius, var(--pa-Border-radius-100, 8px));

  &--sm {
    font-size: var(--pa-nav-button-size-sm-font, var(--pa-font-size-100, 14px));
    padding: var(--pa-nav-button-size-sm-padding-y, var(--pa-spacing-6, 6px)) var(--pa-nav-button-size-sm-padding-x, var(--pa-spacing-12, 12px));
  }

  &--md {
    font-size: var(--pa-nav-button-size-md-font, var(--pa-font-size-200, 16px));
    padding: var(--pa-nav-button-size-md-padding-y, var(--pa-spacing-8, 8px)) var(--pa-nav-button-size-md-padding-x, var(--pa-spacing-16, 16px));
  }

  &--lg {
    font-size: var(--pa-nav-button-size-lg-font, var(--pa-font-size-400, 32px));
    padding: var(--pa-nav-button-size-lg-padding-y, var(--pa-spacing-12, 12px)) var(--pa-nav-button-size-lg-padding-x, var(--pa-spacing-24, 24px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-nav-button-background-hover, var(--pa-color-surface-cards-hover-background));
    color: var(--pa-nav-button-text-hover, var(--pa-color-surface-container-text));
  }

  &.is-active {
    background-color: var(--pa-nav-button-background-active, var(--pa-color-action-primary-background-default));
    color: var(--pa-nav-button-text-active, var(--pa-color-action-primary-text-default));
  }

  &.is-disabled,
  &:disabled {
    cursor: var(--pa-nav-button-cursor-disabled, var(--pa-cursor-not-allowed, not-allowed));
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}
</style>`,
  'panavbuttongroup': `<style lang="scss" scoped>
.pa-nav-button-group {
  display: inline-flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  &--gap-sm {
    gap: var(--pa-nav-button-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-nav-button-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-nav-button-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>`,
  'paoptionalgroup': `<style lang="scss" scoped>
.pa-optional-group {
  display: flex;
  flex-direction: column;
  gap: var(--pa-optional-group-gap, var(--pa-spacing-8, 8px));

  &-header {
    display: flex;
    align-items: center;
    gap: var(--pa-spacing-8, 8px);
  }

  &-label {
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-100, 14px);
    font-weight: var(--pa-font-weight-500, 500);
    color: var(--pa-color-surface-container-text, var(--pa-color-surface-base-text));
  }

  &-badge {
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-75, 12px);
    font-weight: var(--pa-font-weight-400, 400);
    color: var(--pa-color-surface-container-text-secondary, var(--pa-color-surface-base-text));
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--pa-spacing-8, 8px);
  }
}
</style>`,
  'papagedivider': `<style lang="scss" scoped>
.pa-page-divider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &--spacing-sm {
    margin: var(--pa-page-divider-spacing-sm, var(--pa-spacing-24, 24px)) 0;
  }

  &--spacing-md {
    margin: var(--pa-page-divider-spacing-md, var(--pa-spacing-32, 32px)) 0;
  }

  &--spacing-lg {
    margin: var(--pa-page-divider-spacing-lg, var(--pa-spacing-48, 48px)) 0;
  }

  &-line {
    flex: 1;
    border: none;
    border-top: var(--pa-page-divider-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-page-divider-border, var(--pa-color-surface-container-border));
    margin: 0;
  }

  &-label {
    padding: 0 var(--pa-spacing-16, 16px);
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-200, 16px);
    font-weight: var(--pa-font-weight-600, 600);
    color: var(--pa-page-divider-text, var(--pa-color-surface-base-text));
    background-color: var(--pa-page-divider-background, var(--pa-color-surface-base-background));
  }
}
</style>`,
  'papagelayout': `<style lang="scss" scoped>
.pa-page-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.pa-page-layout-sidebar {
  width: var(--pa-layout-drawer-sm, 300px);
  flex-shrink: 0;
  background-color: var(--pa-color-surface-container-background, var(--pa-gray-white, #ffffff));
  border-right: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-container-border, var(--pa-gray-200, #e9ecef));
}

.pa-page-layout-main {
  flex: 1;
  padding: var(--pa-spacing-24, 24px);
  background-color: var(--pa-color-surface-base-background, var(--pa-gray-100, #f7f7f8));
  overflow-x: auto;
}
</style>`,
  'papagination': `<style lang="scss" scoped>
.pa-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--pa-spacing-4, 4px);
}

.pa-pagination-controls {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-4, 4px);
}

.pa-pagination-item {
  padding: var(--pa-pagination-item-padding-y) var(--pa-pagination-item-padding-x);
  background-color: var(--pa-pagination-item-background-default, var(--pa-color-surface-base-background));
  color: var(--pa-pagination-item-text-default, var(--pa-color-surface-base-text));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-pagination-item-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-pagination-item-radius, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  min-width: var(--pa-spacing-100, var(--pa-spacing-10, 10px));
  height: var(--pa-spacing-100, var(--pa-spacing-10, 10px));
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: var(--pa-pagination-item-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-active {
    background-color: var(--pa-pagination-item-background-active, var(--pa-color-action-primary-background-default));
    color: var(--pa-pagination-item-text-active, var(--pa-color-action-primary-text-default));
    border-color: var(--pa-pagination-item-background-active, var(--pa-color-action-primary-background-default));
  }

  &:disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}

.pa-pagination-ellipsis {
  padding: var(--pa-pagination-item-padding-y) var(--pa-pagination-item-padding-x);
  color: var(--pa-pagination-item-text-default, var(--pa-color-surface-base-text));
  min-width: var(--pa-spacing-100, var(--pa-spacing-10, 10px));
  height: var(--pa-spacing-100, var(--pa-spacing-10, 10px));
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>`,
  'paphonenumberinputgroup': `<style lang="scss" scoped>
.pa-phone-number-input-group {
  &-wrapper {
    display: flex;
    gap: var(--pa-spacing-8, 8px);
  }

  &-country-code {
    width: 80px;
    flex-shrink: 0;
  }
}
</style>`,
  'paprogress': `<style lang="scss" scoped>
.pa-progress {
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.pa-progress-line {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--pa-spacing-12, 12px);
}

.pa-progress-line-track {
  flex: 1;
  height: var(--pa-progress-size-md-height, var(--pa-spacing-8, 8px));
  background-color: var(--pa-progress-background-default, var(--pa-color-surface-base-divider));
  border-radius: var(--pa-progress-border-radius, var(--pa-Border-radius-full, 9999px));
  overflow: hidden;

  .pa-progress--sm & {
    height: var(--pa-progress-size-sm-height, var(--pa-spacing-4, 4px));
  }

  .pa-progress--lg & {
    height: var(--pa-progress-size-lg-height, var(--pa-spacing-12, 12px));
  }
}

.pa-progress-line-fill {
  height: 100%;
  background-color: var(--pa-progress-background-filled, var(--pa-color-action-primary-background-default));
  border-radius: var(--pa-progress-border-radius, var(--pa-Border-radius-full, 9999px));
  transition: width var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &--success {
    background-color: var(--pa-progress-background-success, var(--pa-color-status-success-background-default));
  }

  &--warning {
    background-color: var(--pa-progress-background-warning, var(--pa-color-status-warning-background-default));
  }

  &--error {
    background-color: var(--pa-progress-background-error, var(--pa-color-status-error-background-default));
  }
}

.pa-progress-text {
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-progress-size-md-font, var(--pa-font-size-200, 16px));
  color: var(--pa-progress-text-default, var(--pa-color-surface-container-text));
  white-space: nowrap;
}

.pa-progress-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pa-progress-circle-svg {
  width: var(--pa-progress-circular-size-md, var(--pa-icon-size-400, 64px));
  height: var(--pa-progress-circular-size-md, var(--pa-icon-size-400, 64px));
  transform: rotate(-90deg);

  &--sm {
    width: var(--pa-progress-circular-size-sm, var(--pa-icon-size-300, 48px));
    height: var(--pa-progress-circular-size-sm, var(--pa-icon-size-300, 48px));
  }

  &--lg {
    width: var(--pa-progress-circular-size-lg, var(--pa-icon-size-500, 56px));
    height: var(--pa-progress-circular-size-lg, var(--pa-icon-size-500, 56px));
  }
}

.pa-progress-circle-track {
  stroke: var(--pa-progress-background-default, var(--pa-color-surface-base-divider));
}

.pa-progress-circle-fill {
  stroke: var(--pa-progress-background-filled, var(--pa-color-action-primary-background-default));
  transition: stroke-dashoffset var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &--success {
    stroke: var(--pa-progress-background-success, var(--pa-color-status-success-background-default));
  }

  &--warning {
    stroke: var(--pa-progress-background-warning, var(--pa-color-status-warning-background-default));
  }

  &--error {
    stroke: var(--pa-progress-background-error, var(--pa-color-status-error-background-default));
  }
}

.pa-progress-circle-text {
  position: absolute;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-progress-size-md-font, var(--pa-font-size-200, 16px));
  color: var(--pa-progress-text-default, var(--pa-color-surface-container-text));
}
</style>`,
  'paradio': `<style lang="scss" scoped>
.pa-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  cursor: var(--pa-cursor-pointer, pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);

  &.is-disabled {
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pa-radio-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--pa-radio-background-default);
  border: var(--pa-radio-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-radio-border-default);
  border-radius: var(--pa-Border-radius-full, 99999px);
  transition: all var(--pa-radio-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-radio-transition-easing-default, var(--pa-transition-easing-default, ease));
  flex-shrink: 0;

  .pa-radio--sm & {
    width: var(--pa-radio-size-sm-width, 16px);
    height: var(--pa-radio-size-sm-height, 16px);
  }

  .pa-radio--md & {
    width: var(--pa-radio-size-md-width, 20px);
    height: var(--pa-radio-size-md-height, 20px);
  }

  .pa-radio--lg & {
    width: var(--pa-radio-size-lg-width, 24px);
    height: var(--pa-radio-size-lg-height, 24px);
  }

  .pa-radio:not(.is-disabled):hover & {
    background-color: var(--pa-radio-background-hover);
    border-color: var(--pa-radio-border-checked);
  }

  .pa-radio-input:focus-visible + & {
    outline: var(--pa-radio-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-radio-border-focus);
    outline-offset: var(--pa-radio-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  .pa-radio.is-checked & {
    background-color: var(--pa-radio-background-checked);
    border-color: var(--pa-radio-border-checked);
  }

  .pa-radio.is-disabled & {
    background-color: var(--pa-radio-background-disabled);
    border-color: var(--pa-radio-border-disabled);
  }
}

.pa-radio-dot {
  width: var(--pa-radio-size-md-dot, 10px);
  height: var(--pa-radio-size-md-dot, 10px);
  background-color: var(--pa-radio-dot-default);
  border-radius: var(--pa-Border-radius-full, 99999px);

  .pa-radio--sm & {
    width: var(--pa-radio-size-sm-dot, 8px);
    height: var(--pa-radio-size-sm-dot, 8px);
  }

  .pa-radio--lg & {
    width: var(--pa-radio-size-lg-dot, 12px);
    height: var(--pa-radio-size-lg-dot, 12px);
  }

  .pa-radio.is-disabled & {
    background-color: var(--pa-radio-dot-disabled);
  }
}

.pa-radio-label {
  color: var(--pa-input-text-default, var(--pa-color-surface-container-text));
  user-select: none;
}
</style>`,
  'paradiobuttongroup': `<style lang="scss" scoped>
.pa-radio-button-group {
  display: inline-flex;
  gap: var(--pa-spacing-16, 16px);

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>`,
  'parangeslider': `<style lang="scss" scoped>
.pa-range-slider {
  position: relative;
  width: 100%;
  padding: var(--pa-spacing-8, 8px) 0;
}

.pa-range-slider-track {
  position: relative;
  width: 100%;
  height: var(--pa-slider-track-height, 4px);
  background-color: var(--pa-slider-track-background, var(--pa-gray-300, #dee2e6));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
}

.pa-range-slider-filled {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: var(--pa-slider-track-filled, var(--pa-color-action-primary-background-default));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
  transition: left var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease),
    width var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-range-slider-input {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  margin: 0;
  transform: translateY(-50%);
  background: transparent;
  cursor: var(--pa-cursor-pointer, pointer);
  appearance: none;
  -webkit-appearance: none;

  &--max {
    z-index: 2;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: var(--pa-slider-thumb-width, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    height: var(--pa-slider-thumb-height, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    background-color: var(--pa-slider-thumb-background, var(--pa-gray-white, #ffffff));
    border: var(--pa-slider-thumb-border-width, var(--pa-Border-width-100, 2px)) solid var(--pa-slider-thumb-border-color, var(--pa-color-action-primary-border-default));
    border-radius: var(--pa-slider-thumb-radius, var(--pa-Border-radius-full, 99999px));
    cursor: var(--pa-cursor-pointer, pointer);
    transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

    &:hover {
      background-color: var(--pa-slider-thumb-hover, var(--pa-color-action-primary-background-hover));
    }
  }

  &::-moz-range-thumb {
    width: var(--pa-slider-thumb-width, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    height: var(--pa-slider-thumb-height, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    background-color: var(--pa-slider-thumb-background, var(--pa-gray-white, #ffffff));
    border: var(--pa-slider-thumb-border-width, var(--pa-Border-width-100, 2px)) solid var(--pa-slider-thumb-border-color, var(--pa-color-action-primary-border-default));
    border-radius: var(--pa-slider-thumb-radius, var(--pa-Border-radius-full, 99999px));
    cursor: var(--pa-cursor-pointer, pointer);
    transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

    &:hover {
      background-color: var(--pa-slider-thumb-hover, var(--pa-color-action-primary-background-hover));
    }
  }

  &:disabled {
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}
</style>`,
  'pasectioncontainer': `<style lang="scss" scoped>
.pa-section-container {
  background-color: var(--pa-section-container-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-section-container-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-section-container-border-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-section-container-padding-y) var(--pa-section-container-padding-x);
  width: 100%;
}

.pa-section-container-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--pa-spacing-16, 16px);
  padding-bottom: var(--pa-section-container-spacing-header, var(--pa-spacing-16, 16px));
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-section-container-header-border, var(--pa-color-surface-base-divider));
  margin-bottom: var(--pa-section-container-spacing-content, var(--pa-spacing-24, 24px));
}

.pa-section-container-header-content {
  flex: 1;
}

.pa-section-container-title {
  margin: 0 0 var(--pa-spacing-4, 4px) 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-700, 700);
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
}

.pa-section-container-description {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  color: var(--pa-gray-500, #adb5bd);
}

.pa-section-container-actions {
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  flex-shrink: 0;
}

.pa-section-container-content {
  width: 100%;
}
</style>`,
  'pasegmentedcontrol': `<style lang="scss" scoped>
.pa-segmented-control {
  display: inline-flex;
  background-color: var(--pa-segmented-control-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-segmented-control-item-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-segmented-control-item-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-spacing-4, 4px);
  gap: var(--pa-spacing-4, 4px);
}

.pa-segmented-control-item {
  padding: var(--pa-segmented-control-item-padding-y) var(--pa-segmented-control-item-padding-x);
  background-color: var(--pa-segmented-control-item-background-default, transparent);
  color: var(--pa-segmented-control-item-text-default, var(--pa-color-surface-container-text));
  border: none;
  border-radius: var(--pa-segmented-control-item-radius, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  white-space: nowrap;

  &:hover:not(.is-disabled):not(.is-selected) {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }

  &.is-selected {
    background-color: var(--pa-segmented-control-item-background-selected, var(--pa-color-action-primary-background-default));
    color: var(--pa-segmented-control-item-text-selected, var(--pa-color-action-primary-text-default));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}
</style>`,
  'paselect': `<style lang="scss" scoped>
.pa-select {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-select-trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: var(--pa-select-background-default);
  color: var(--pa-select-text-default);
  border: var(--pa-select-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-select-border-default);
  border-radius: var(--pa-select-border-radius-default, var(--pa-Border-radius-100, 8px));
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-select-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-select-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);

  .pa-select--sm & {
    padding: var(--pa-select-size-sm-padding-y) var(--pa-select-size-sm-padding-x);
    font-size: var(--pa-select-size-sm-font, var(--pa-font-size-100, 14px));
  }

  .pa-select--md & {
    padding: var(--pa-select-size-md-padding-y) var(--pa-select-size-md-padding-x);
    font-size: var(--pa-select-size-md-font, var(--pa-font-size-200, 16px));
  }

  .pa-select--lg & {
    padding: var(--pa-select-size-lg-padding-y) var(--pa-select-size-lg-padding-x);
    font-size: var(--pa-select-size-lg-font, var(--pa-font-size-400, 20px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-select-background-hover);
    border-color: var(--pa-select-border-hover);
  }

  .pa-select.is-open & {
    background-color: var(--pa-select-background-focus);
    border-color: var(--pa-select-border-focus);
    outline: var(--pa-select-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-select-border-focus);
    outline-offset: var(--pa-select-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  .pa-select.is-error & {
    border-color: var(--pa-select-border-error);
  }

  .pa-select.is-disabled & {
    background-color: var(--pa-select-background-disabled);
    color: var(--pa-select-text-disabled);
    border-color: var(--pa-select-border-disabled);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-select-value {
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.is-placeholder {
    color: var(--pa-select-text-placeholder);
  }
}

.pa-select-icons {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  flex-shrink: 0;
}

.pa-select-clear {
  background: none;
  border: none;
  font-size: var(--pa-font-size-400, 20px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: var(--pa-select-icon-default, var(--pa-color-input-icon-default));
  padding: var(--pa-spacing-4, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }
}

.pa-select-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-select-icon-default, var(--pa-color-input-icon-default));
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  transition: transform var(--pa-select-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-select-transition-easing-default, var(--pa-transition-easing-default, ease));

  .pa-select.is-open & {
    transform: rotate(180deg);
  }

  svg {
    width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
    height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  }
}

.pa-select-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--pa-spacing-4, 4px);
  background-color: var(--pa-select-menu-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-select-menu-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-select-border-radius-default, var(--pa-Border-radius-100, 8px));
  box-shadow: var(--pa-select-menu-shadow, var(--pa-shadow-md));
  z-index: var(--pa-select-menu-z-index, var(--pa-z-index-400, 400));
  max-height: var(--pa-spacing-700, var(--pa-spacing-64, 64px));
  overflow-y: auto;
}

.pa-select-search {
  padding: var(--pa-spacing-8, 8px);
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}

.pa-select-search-input {
  width: 100%;
  padding: var(--pa-spacing-8, 8px);
  border: var(--pa-Border-width-50, 1px) solid var(--pa-select-border-default);
  border-radius: var(--pa-Border-radius-50, 4px);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
}

.pa-select-loading {
  padding: var(--pa-spacing-16, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pa-select-options {
  padding: var(--pa-spacing-4, 4px);
}

.pa-select-group {
  margin-bottom: var(--pa-spacing-8, 8px);
}

.pa-select-group-label {
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-12, 12px);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-100, 14px);
  font-weight: var(--pa-font-weight-600, 600);
  color: var(--pa-gray-500, #adb5bd);
  text-transform: uppercase;
  letter-spacing: var(--pa-letter-spacing-300, 0.5px);
}

.pa-select-option {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-12, 12px);
  background-color: var(--pa-select-option-background-default, transparent);
  color: var(--pa-select-option-text-default, var(--pa-color-surface-container-text));
  cursor: var(--pa-cursor-pointer, pointer);
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: all var(--pa-select-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-select-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);

  &:hover:not(.is-disabled) {
    background-color: var(--pa-select-option-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-select-option-background-selected, var(--pa-color-surface-cards-active-background));
    color: var(--pa-select-option-text-selected, var(--pa-color-action-primary-text-default));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    pointer-events: none;
  }
}

.pa-select-option-checkbox {
  flex-shrink: 0;
}

.pa-select-option-label {
  flex: 1;
}

.pa-select-empty {
  padding: var(--pa-spacing-16, 16px);
  text-align: center;
  color: var(--pa-gray-500, #adb5bd);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
}

.pa-select-menu-enter-active,
.pa-select-menu-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease),
    transform var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-select-menu-enter-from,
.pa-select-menu-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--pa-spacing-4, 4px) * -1));
}
</style>`,
  'pasheet': `<style lang="scss" scoped>
.pa-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pa-sheet-overlay-background, rgba(0, 0, 0, 0.5));
  z-index: var(--pa-z-index-400, 400);
  display: flex;
}

.pa-sheet {
  background-color: var(--pa-sheet-background, var(--pa-color-surface-container-background));
  box-shadow: var(--pa-shadow-lg-x, 4px) var(--pa-shadow-lg-y, 4px) var(--pa-shadow-lg-blur, 30px) var(--pa-shadow-lg-spread, 5px) var(--pa-shadow-lg-Color, #616161);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &--left {
    justify-content: flex-start;
    align-items: flex-start;
    width: var(--pa-sheet-size-md-width, 400px);
    height: 100%;
  }

  &--right {
    justify-content: flex-start;
    align-items: flex-end;
    margin-left: auto;
    width: var(--pa-sheet-size-md-width, 400px);
    height: 100%;
  }

  &--top {
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: var(--pa-sheet-size-md-height, 400px);
  }

  &--bottom {
    justify-content: flex-end;
    align-items: flex-start;
    margin-top: auto;
    width: 100%;
    height: var(--pa-sheet-size-md-height, 400px);
  }

  &--sm {
    width: var(--pa-sheet-size-sm-width, 300px);
    height: var(--pa-sheet-size-sm-height, 300px);
  }

  &--md {
    width: var(--pa-sheet-size-md-width, 400px);
    height: var(--pa-sheet-size-md-height, 400px);
  }

  &--lg {
    width: var(--pa-sheet-size-lg-width, 600px);
    height: var(--pa-sheet-size-lg-height, 600px);
  }

  &--full {
    width: 100%;
    height: 100%;
  }
}

.pa-sheet-enter-active,
.pa-sheet-leave-active {
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-sheet-enter-from,
.pa-sheet-leave-to {
  opacity: 0;
}
</style>`,
  'paslider': `<style lang="scss" scoped>
.pa-slider {
  position: relative;
  width: 100%;
  padding: var(--pa-spacing-8, 8px) 0;
}

.pa-slider-track {
  position: relative;
  width: 100%;
  height: var(--pa-slider-track-height, 4px);
  background-color: var(--pa-slider-track-background, var(--pa-gray-300, #dee2e6));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
}

.pa-slider-filled {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--pa-slider-track-filled, var(--pa-color-action-primary-background-default));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
  transition: width var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-slider-input {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  margin: 0;
  transform: translateY(-50%);
  background: transparent;
  cursor: var(--pa-cursor-pointer, pointer);
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: var(--pa-slider-thumb-width, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    height: var(--pa-slider-thumb-height, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    background-color: var(--pa-slider-thumb-background, var(--pa-gray-white, #ffffff));
    border: var(--pa-slider-thumb-border-width, var(--pa-Border-width-100, 2px)) solid var(--pa-slider-thumb-border-color, var(--pa-color-action-primary-border-default));
    border-radius: var(--pa-slider-thumb-radius, var(--pa-Border-radius-full, 99999px));
    cursor: var(--pa-cursor-pointer, pointer);
    transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

    &:hover {
      background-color: var(--pa-slider-thumb-hover, var(--pa-color-action-primary-background-hover));
    }
  }

  &::-moz-range-thumb {
    width: var(--pa-slider-thumb-width, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    height: var(--pa-slider-thumb-height, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    background-color: var(--pa-slider-thumb-background, var(--pa-gray-white, #ffffff));
    border: var(--pa-slider-thumb-border-width, var(--pa-Border-width-100, 2px)) solid var(--pa-slider-thumb-border-color, var(--pa-color-action-primary-border-default));
    border-radius: var(--pa-slider-thumb-radius, var(--pa-Border-radius-full, 99999px));
    cursor: var(--pa-cursor-pointer, pointer);
    transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

    &:hover {
      background-color: var(--pa-slider-thumb-hover, var(--pa-color-action-primary-background-hover));
    }
  }

  &:disabled {
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}
</style>`,
  'paslottedlayout': `<style lang="scss" scoped>
.pa-slotted-layout {
  display: flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--gap-sm {
    gap: var(--pa-slotted-layout-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-slotted-layout-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-slotted-layout-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>`,
  'paslottedlayoutheader': `<style lang="scss" scoped>
.pa-slotted-layout-header {
  display: flex;
  flex-direction: column;
  gap: var(--pa-slotted-layout-header-gap, var(--pa-spacing-8, 8px));

  &--align-left {
    align-items: flex-start;
    text-align: left;
  }

  &--align-center {
    align-items: center;
    text-align: center;
  }

  &--align-right {
    align-items: flex-end;
    text-align: right;
  }

  &-title {
    margin: 0;
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-slotted-layout-header-font-size, var(--pa-font-size-400, 32px));
    font-weight: var(--pa-font-weight-700, 700);
    color: var(--pa-slotted-layout-header-text, var(--pa-color-surface-base-text));
    line-height: var(--pa-slotted-layout-header-line-height, 1.2);
  }
}
</style>`,
  'pasquare': `<style lang="scss" scoped>
.pa-square {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--pa-square-radius, var(--pa-Border-radius-100, 8px));
  background-color: var(--pa-square-background, var(--pa-color-surface-container-background));
  overflow: hidden;
}
</style>`,
  'pastepper': `<style lang="scss" scoped>
.pa-stepper {
  display: flex;
  width: 100%;

  &--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }

  &--vertical {
    flex-direction: column;
  }
}

.pa-stepper-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  .pa-stepper--horizontal & {
    flex-direction: row;
  }

  &.is-clickable {
    cursor: var(--pa-cursor-pointer, pointer);
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}

.pa-stepper-step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px));
  height: var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px));
  border-radius: var(--pa-Border-radius-full, 50%);
  background-color: var(--pa-stepper-icon-background-default, var(--pa-color-surface-container-background));
  color: var(--pa-stepper-icon-text-default, var(--pa-color-surface-container-text));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-500, 500);
  flex-shrink: 0;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  .pa-stepper-step.is-process & {
    background-color: var(--pa-stepper-icon-background-active, var(--pa-color-action-primary-background-default));
    color: var(--pa-stepper-icon-text-active, var(--pa-color-action-primary-text-default));
  }

  .pa-stepper-step.is-finish & {
    background-color: var(--pa-stepper-icon-background-completed, var(--pa-color-action-primary-background-default));
    color: var(--pa-stepper-icon-text-completed, var(--pa-color-action-primary-text-default));
  }

  .pa-stepper-step.is-error & {
    background-color: var(--pa-stepper-icon-background-error, var(--pa-color-status-error-default));
    color: var(--pa-stepper-icon-text-error, var(--pa-color-status-error-text));
  }
}

.pa-stepper-step-icon-custom {
  font-size: var(--pa-icon-size-200, 20px);
}

.pa-stepper-step-content {
  margin-left: var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px));
  text-align: left;

  .pa-stepper--horizontal & {
    margin-left: var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px));
    margin-top: 0;
  }

  .pa-stepper--vertical & {
    margin-left: 0;
    margin-top: var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px));
    text-align: center;
  }
}

.pa-stepper-step-title {
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-stepper-font-title-size, var(--pa-font-size-200, 16px));
  font-weight: var(--pa-font-weight-500, 500);
  color: var(--pa-stepper-text-default, var(--pa-color-surface-container-text));
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  .pa-stepper-step.is-process &,
  .pa-stepper-step.is-finish & {
    color: var(--pa-stepper-text-active, var(--pa-color-action-primary-text-default));
  }

  .pa-stepper-step.is-error & {
    color: var(--pa-stepper-text-error, var(--pa-color-status-error-default));
  }
}

.pa-stepper-step-description {
  margin-top: var(--pa-spacing-4, 4px);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-stepper-font-description-size, var(--pa-font-size-100, 14px));
  color: var(--pa-stepper-text-default, var(--pa-color-surface-container-text));
  opacity: 0.7;
}

.pa-stepper-step-line {
  position: absolute;
  background-color: var(--pa-stepper-line-default, var(--pa-color-surface-base-divider));

  .pa-stepper--horizontal & {
    top: calc(var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    left: calc(50% + var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2 + var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px)));
    right: calc(-50% + var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    height: var(--pa-spacing-25, var(--pa-spacing-2, 2px));
    transform: translateY(-50%);
  }

  .pa-stepper--vertical & {
    top: calc(var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) + var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px)));
    left: calc(var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    bottom: calc(-100% + var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    width: var(--pa-spacing-25, var(--pa-spacing-2, 2px));
    transform: translateX(-50%);
  }

  &.is-completed {
    background-color: var(--pa-stepper-line-completed, var(--pa-color-action-primary-background-default));
  }
}
</style>`,
  'paswitch': `<style lang="scss" scoped>
.pa-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  cursor: var(--pa-cursor-pointer, pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);

  &.is-disabled {
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pa-switch-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: var(--pa-switch-background-off);
  border-radius: var(--pa-Border-radius-full, 99999px);
  transition: all var(--pa-switch-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-switch-transition-easing-default, var(--pa-transition-easing-default, ease));
  flex-shrink: 0;

  .pa-switch--sm & {
    width: var(--pa-switch-size-sm-width, 32px);
    height: var(--pa-switch-size-sm-height, 18px);
  }

  .pa-switch--md & {
    width: var(--pa-switch-size-md-width, 40px);
    height: var(--pa-switch-size-md-height, 22px);
  }

  .pa-switch--lg & {
    width: var(--pa-switch-size-lg-width, 48px);
    height: var(--pa-switch-size-lg-height, 26px);
  }

  .pa-switch.is-on & {
    background-color: var(--pa-switch-background-on);
  }

  .pa-switch.is-disabled & {
    background-color: var(--pa-switch-background-disabled);
  }

  .pa-switch-input:focus-visible + & {
    outline: var(--pa-switch-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-switch-border-focus);
    outline-offset: var(--pa-switch-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }
}

.pa-switch-thumb {
  position: absolute;
  background-color: var(--pa-switch-thumb-off);
  border-radius: var(--pa-Border-radius-full, 99999px);
  transition: all var(--pa-switch-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-switch-transition-easing-default, var(--pa-transition-easing-default, ease));
  left: var(--pa-spacing-2, 2px);

  .pa-switch--sm & {
    width: var(--pa-switch-size-sm-thumb, 14px);
    height: var(--pa-switch-size-sm-thumb, 14px);
  }

  .pa-switch--md & {
    width: var(--pa-switch-size-md-thumb, 18px);
    height: var(--pa-switch-size-md-thumb, 18px);
  }

  .pa-switch--lg & {
    width: var(--pa-switch-size-lg-thumb, 22px);
    height: var(--pa-switch-size-lg-thumb, 22px);
  }

  .pa-switch.is-on & {
    background-color: var(--pa-switch-thumb-on);
    transform: translateX(calc(var(--pa-switch-size-md-width, 40px) - var(--pa-switch-size-md-thumb, 18px) - var(--pa-spacing-4, 4px)));
  }

  .pa-switch--sm.is-on & {
    transform: translateX(calc(var(--pa-switch-size-sm-width, 32px) - var(--pa-switch-size-sm-thumb, 14px) - var(--pa-spacing-4, 4px)));
  }

  .pa-switch--lg.is-on & {
    transform: translateX(calc(var(--pa-switch-size-lg-width, 48px) - var(--pa-switch-size-lg-thumb, 22px) - var(--pa-spacing-4, 4px)));
  }

  .pa-switch.is-disabled & {
    background-color: var(--pa-switch-thumb-disabled);
  }
}

.pa-switch-label {
  color: var(--pa-input-text-default, var(--pa-color-surface-container-text));
  user-select: none;
}
</style>`,
  'patable': `<style lang="scss" scoped>
.pa-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.pa-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
}

.pa-table-header {
  background-color: var(--pa-table-header-background, var(--pa-color-surface-container-background));
  color: var(--pa-table-header-text, var(--pa-color-surface-container-text));
  border-bottom: var(--pa-Border-width-100, 2px) solid var(--pa-table-header-border, var(--pa-color-surface-container-border));
}

.pa-table-header :deep(th) {
  padding: var(--pa-table-header-padding-y) var(--pa-table-header-padding-x);
  font-weight: var(--pa-font-weight-600, 600);
  text-align: left;
}

.pa-table-body {
  background-color: var(--pa-table-row-background-default, var(--pa-color-surface-base-background));
}

.pa-table-body :deep(tr) {
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-table-row-border, var(--pa-color-surface-base-divider));
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:last-child {
    border-bottom: none;
  }

  .pa-table.is-hoverable &:hover {
    background-color: var(--pa-table-row-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-table-row-background-selected, var(--pa-color-surface-cards-selected-background));
  }
}

.pa-table.is-striped .pa-table-body :deep(tr:nth-child(even)) {
  background-color: var(--pa-table-row-background-striped, var(--pa-color-surface-container-background));
}

.pa-table-body :deep(td),
.pa-table-footer :deep(td) {
  padding: var(--pa-table-cell-padding-y) var(--pa-table-cell-padding-x);
  color: var(--pa-table-cell-text, var(--pa-color-surface-base-text));
}

.pa-table-footer {
  border-top: var(--pa-Border-width-100, 2px) solid var(--pa-table-header-border, var(--pa-color-surface-container-border));
}
</style>`,
  'patabs': `<style lang="scss" scoped>
.pa-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;

  &--top {
    flex-direction: column;
  }

  &--bottom {
    flex-direction: column-reverse;
  }

  &--left {
    flex-direction: row;

    .pa-tabs-header {
      border-right: var(--pa-tabs-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-tabs-border-default, var(--pa-color-surface-base-divider));
      border-bottom: none;
    }
  }

  &--right {
    flex-direction: row-reverse;

    .pa-tabs-header {
      border-left: var(--pa-tabs-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-tabs-border-default, var(--pa-color-surface-base-divider));
      border-bottom: none;
    }
  }
}

.pa-tabs-header {
  border-bottom: var(--pa-tabs-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-tabs-border-default, var(--pa-color-surface-base-divider));
}

.pa-tabs-nav {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.is-scrollable {
    position: relative;
  }
}

.pa-tabs-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--pa-tabs-tab-spacing-icon-text, var(--pa-spacing-8, 8px));
  padding: var(--pa-tabs-tab-padding-y, var(--pa-spacing-12, 12px)) var(--pa-tabs-tab-padding-x, var(--pa-spacing-16, 16px));
  background-color: var(--pa-tabs-tab-background-default, transparent);
  color: var(--pa-tabs-tab-text-default, var(--pa-color-surface-container-text));
  border: none;
  border-bottom: var(--pa-spacing-25, var(--pa-spacing-2, 2px)) solid transparent;
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-tabs-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-tabs-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-tabs-tab-font-size, var(--pa-font-size-200, 16px));
  font-weight: var(--pa-tabs-tab-font-weight-default, var(--pa-font-weight-400, 400));
  white-space: nowrap;
  flex-shrink: 0;

  &:hover:not(.is-disabled) {
    background-color: var(--pa-tabs-tab-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-active {
    color: var(--pa-tabs-tab-text-active, var(--pa-color-action-primary-text-default));
    font-weight: var(--pa-tabs-tab-font-weight-active, var(--pa-font-weight-500, 500));
    border-bottom-color: var(--pa-tabs-tab-indicator, var(--pa-color-action-primary-background-default));
  }

  &.is-disabled {
    color: var(--pa-tabs-tab-text-disabled, var(--pa-color-surface-cards-disable-text));
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-tabs-tab-icon {
  display: flex;
  align-items: center;
  font-size: var(--pa-icon-size-200, 20px);
}

.pa-tabs-tab-label {
  flex: 1;
}

.pa-tabs-tab-badge {
  flex-shrink: 0;
}

.pa-tabs-tab-close {
  margin-left: var(--pa-spacing-4, 4px);
  padding: var(--pa-spacing-2, 2px);
  background: none;
  border: none;
  font-size: var(--pa-font-size-400, 20px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: inherit;
  opacity: 0.6;
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    opacity: 1;
  }
}

.pa-tabs-tab-add {
  min-width: var(--pa-spacing-100, var(--pa-spacing-10, 10px));
  justify-content: center;
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-400, 400);
}

.pa-tabs-content {
  padding: var(--pa-tabs-content-padding, var(--pa-spacing-16, 16px));
}
</style>`,
  'patextarea': `<style lang="scss" scoped>
.pa-textarea-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pa-textarea {
  width: 100%;
  background-color: var(--pa-textarea-background-default, var(--pa-color-input-background-default));
  color: var(--pa-textarea-text-default, var(--pa-color-input-text-default));
  border: var(--pa-textarea-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-textarea-border-default, var(--pa-color-input-border-default));
  border-radius: var(--pa-textarea-border-radius-default, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  line-height: var(--pa-line-height-200, 1.5);
  resize: vertical;
  transition: all var(--pa-textarea-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-textarea-transition-easing-default, var(--pa-transition-easing-default, ease));
  outline: none;

  &::placeholder {
    color: var(--pa-textarea-text-placeholder, var(--pa-color-input-text-placeholder));
  }

  .pa-textarea-wrapper--sm & {
    padding: var(--pa-textarea-size-sm-padding-y) var(--pa-textarea-size-sm-padding-x);
    font-size: var(--pa-textarea-size-sm-font, var(--pa-font-size-100, 14px));
    min-height: var(--pa-textarea-size-sm-min-height, 60px);
  }

  .pa-textarea-wrapper--md & {
    padding: var(--pa-textarea-size-md-padding-y) var(--pa-textarea-size-md-padding-x);
    font-size: var(--pa-textarea-size-md-font, var(--pa-font-size-200, 16px));
    min-height: var(--pa-textarea-size-md-min-height, 80px);
  }

  .pa-textarea-wrapper--lg & {
    padding: var(--pa-textarea-size-lg-padding-y) var(--pa-textarea-size-lg-padding-x);
    font-size: var(--pa-textarea-size-lg-font, var(--pa-font-size-400, 20px));
    min-height: var(--pa-textarea-size-lg-min-height, 120px);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-textarea-background-hover, var(--pa-color-input-background-hover));
    border-color: var(--pa-textarea-border-hover, var(--pa-color-input-border-hover));
  }

  &:focus:not(.is-disabled) {
    background-color: var(--pa-textarea-background-focus, var(--pa-color-input-background-focus));
    border-color: var(--pa-textarea-border-focus, var(--pa-color-input-border-focus));
    outline: var(--pa-textarea-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-textarea-border-focus, var(--pa-color-input-border-focus));
    outline-offset: var(--pa-textarea-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  &.is-error {
    border-color: var(--pa-textarea-border-error, var(--pa-color-input-border-error));
  }

  &.is-disabled {
    background-color: var(--pa-textarea-background-disabled, var(--pa-color-input-background-disabled));
    color: var(--pa-textarea-text-disabled, var(--pa-color-input-text-disabled));
    border-color: var(--pa-textarea-border-disabled, var(--pa-color-input-border-disabled));
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    resize: none;
  }
}

.pa-textarea-counter {
  margin-top: var(--pa-spacing-4, 4px);
  text-align: right;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-textarea-counter-font-size, var(--pa-font-size-100, 14px));
  color: var(--pa-textarea-counter-text, var(--pa-color-surface-container-text));

  &.is-over-limit {
    color: var(--pa-color-status-error-default, var(--pa-red-500, #d51e33));
  }
}
</style>`,
  'patextcontainer': `<style lang="scss" scoped>
.pa-text-container {
  width: 100%;

  &--max-width-sm {
    max-width: var(--pa-text-container-max-width-sm, 480px);
  }

  &--max-width-md {
    max-width: var(--pa-text-container-max-width-md, 720px);
  }

  &--max-width-lg {
    max-width: var(--pa-text-container-max-width-lg, 960px);
  }

  &--max-width-xl {
    max-width: var(--pa-text-container-max-width-xl, 1200px);
  }

  &--max-width-full {
    max-width: 100%;
  }

  &--padding-sm {
    padding: var(--pa-text-container-padding-sm, var(--pa-spacing-16, 16px));
  }

  &--padding-md {
    padding: var(--pa-text-container-padding-md, var(--pa-spacing-24, 24px));
  }

  &--padding-lg {
    padding: var(--pa-text-container-padding-lg, var(--pa-spacing-32, 32px));
  }
}
</style>`,
  'patextdivider': `<style lang="scss" scoped>
.pa-text-divider {
  border: none;
  border-top: var(--pa-text-divider-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-text-divider-border, var(--pa-color-surface-container-border));
  margin: 0;

  &--spacing-sm {
    margin: var(--pa-text-divider-spacing-sm, var(--pa-spacing-16, 16px)) 0;
  }

  &--spacing-md {
    margin: var(--pa-text-divider-spacing-md, var(--pa-spacing-24, 24px)) 0;
  }

  &--spacing-lg {
    margin: var(--pa-text-divider-spacing-lg, var(--pa-spacing-32, 32px)) 0;
  }
}
</style>`,
  'patimepicker': `<style lang="scss" scoped>
.pa-time-picker {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-time-picker-input {
  position: relative;
  display: flex;
  align-items: center;
  cursor: var(--pa-cursor-pointer, pointer);
}

.pa-time-picker-input-field {
  width: 100%;
  background-color: var(--pa-time-picker-background-default, var(--pa-color-input-background-default));
  color: var(--pa-time-picker-text-default, var(--pa-color-input-text-default));
  border: var(--pa-time-picker-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-time-picker-border-default, var(--pa-color-input-border-default));
  border-radius: var(--pa-time-picker-border-radius-default, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  transition: all var(--pa-time-picker-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-time-picker-transition-easing-default, var(--pa-transition-easing-default, ease));
  outline: none;
  cursor: inherit;

  &::placeholder {
    color: var(--pa-time-picker-text-placeholder, var(--pa-color-input-text-placeholder));
  }

  .pa-time-picker--sm & {
    padding: var(--pa-time-picker-size-sm-padding-y) var(--pa-time-picker-size-sm-padding-x);
    padding-right: calc(var(--pa-time-picker-size-sm-padding-x, var(--pa-spacing-12, 12px)) + var(--pa-icon-size-md, var(--pa-icon-size-200, 24px)));
    font-size: var(--pa-time-picker-size-sm-font, var(--pa-font-size-100, 14px));
  }

  .pa-time-picker--md & {
    padding: var(--pa-time-picker-size-md-padding-y) var(--pa-time-picker-size-md-padding-x);
    padding-right: calc(var(--pa-time-picker-size-md-padding-x, var(--pa-spacing-16, 16px)) + var(--pa-icon-size-md, var(--pa-icon-size-200, 24px)));
    font-size: var(--pa-time-picker-size-md-font, var(--pa-font-size-200, 16px));
  }

  .pa-time-picker--lg & {
    padding: var(--pa-time-picker-size-lg-padding-y) var(--pa-time-picker-size-lg-padding-x);
    padding-right: calc(var(--pa-time-picker-size-lg-padding-x, var(--pa-spacing-24, 24px)) + var(--pa-icon-size-md, var(--pa-icon-size-200, 24px)));
    font-size: var(--pa-time-picker-size-lg-font, var(--pa-font-size-400, 20px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-time-picker-background-hover, var(--pa-color-input-background-hover));
    border-color: var(--pa-time-picker-border-hover, var(--pa-color-input-border-hover));
  }

  .pa-time-picker.is-open & {
    background-color: var(--pa-time-picker-background-focus, var(--pa-color-input-background-focus));
    border-color: var(--pa-time-picker-border-focus, var(--pa-color-input-border-focus));
    outline: var(--pa-time-picker-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-time-picker-border-focus, var(--pa-color-input-border-focus));
    outline-offset: var(--pa-time-picker-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  &.is-error {
    border-color: var(--pa-time-picker-border-error, var(--pa-color-input-border-error));
  }

  &.is-disabled {
    background-color: var(--pa-time-picker-background-disabled, var(--pa-color-input-background-disabled));
    color: var(--pa-time-picker-text-disabled, var(--pa-color-input-text-disabled));
    border-color: var(--pa-time-picker-border-disabled, var(--pa-color-input-border-disabled));
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-time-picker-icon {
  position: absolute;
  right: var(--pa-spacing-12, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  color: var(--pa-color-input-icon-default);
  pointer-events: none;

  svg {
    width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
    height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  }
}

.pa-time-picker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--pa-spacing-4, 4px);
  background-color: var(--pa-time-picker-panel-background, var(--pa-color-surface-container-background));
  border: 1px solid var(--pa-time-picker-panel-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-time-picker-border-radius-default, var(--pa-Border-radius-100, 8px));
  box-shadow: var(--pa-time-picker-panel-shadow, var(--pa-shadow-md));
  z-index: var(--pa-time-picker-panel-z-index, var(--pa-z-index-400, 400));
  min-width: 200px;
  max-height: 300px;
  overflow: hidden;
}

.pa-time-picker-scroll {
  display: flex;
  max-height: 300px;
  overflow-y: auto;
}

.pa-time-picker-column {
  flex: 1;
  min-width: 60px;
  border-right: 1px solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));

  &:last-child {
    border-right: none;
  }
}

.pa-time-picker-column-label {
  padding: var(--pa-spacing-8, 8px);
  text-align: center;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-100, 14px);
  font-weight: var(--pa-font-weight-600, 600);
  color: var(--pa-gray-500, #adb5bd);
  border-bottom: 1px solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}

.pa-time-picker-list {
  max-height: 250px;
  overflow-y: auto;
}

.pa-time-picker-item {
  padding: var(--pa-spacing-8, 8px);
  text-align: center;
  background-color: var(--pa-time-picker-time-item-background-default, transparent);
  color: var(--pa-time-picker-time-item-text-default, var(--pa-color-surface-container-text));
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-time-picker-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-time-picker-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);

  &:hover {
    background-color: var(--pa-time-picker-time-item-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-time-picker-time-item-background-selected, var(--pa-color-action-primary-background-default));
    color: var(--pa-time-picker-time-item-text-selected, var(--pa-color-action-primary-text-default));
  }
}

.pa-time-picker-panel-enter-active,
.pa-time-picker-panel-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease),
    transform var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-time-picker-panel-enter-from,
.pa-time-picker-panel-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>`,
  'patogglechip': `<style lang="scss" scoped>
.pa-toggle-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-spacing-4, 4px);
  padding: var(--pa-toggle-chip-padding-y) var(--pa-toggle-chip-padding-x);
  background-color: var(--pa-toggle-chip-background-default, var(--pa-color-surface-container-background));
  color: var(--pa-toggle-chip-text-default, var(--pa-color-surface-container-text));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-toggle-chip-border-default, var(--pa-color-surface-container-border));
  border-radius: var(--pa-toggle-chip-border-radius, var(--pa-Border-radius-full, 99999px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  user-select: none;

  &:hover:not(.is-disabled) {
    background-color: var(--pa-toggle-chip-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-toggle-chip-background-selected, var(--pa-color-action-primary-background-default));
    color: var(--pa-toggle-chip-text-selected, var(--pa-color-action-primary-text-default));
    border-color: var(--pa-toggle-chip-border-selected, var(--pa-color-action-primary-border-default));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}

.pa-toggle-chip-remove {
  background: none;
  border: none;
  font-size: var(--pa-font-size-400, 20px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: currentColor;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  opacity: 0.7;
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    opacity: 1;
  }
}
</style>`,
  'patoggleinputgroup': `<style lang="scss" scoped>
.pa-toggle-input-group {
  display: inline-flex;
  gap: var(--pa-toggle-input-group-gap, var(--pa-spacing-16, 16px));

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>`,
  'patogglesegmentation': `<style lang="scss" scoped>
.pa-toggle-segmentation {
  display: inline-flex;
  background-color: var(--pa-segmented-control-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-segmented-control-item-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-segmented-control-item-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-spacing-4, 4px);
  gap: var(--pa-spacing-4, 4px);
}

.pa-toggle-segmentation-item {
  padding: var(--pa-segmented-control-item-padding-y) var(--pa-segmented-control-item-padding-x);
  background-color: var(--pa-segmented-control-item-background-default, transparent);
  color: var(--pa-segmented-control-item-text-default, var(--pa-color-surface-container-text));
  border: none;
  border-radius: var(--pa-segmented-control-item-radius, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  white-space: nowrap;

  &:hover:not(.is-disabled):not(.is-selected) {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }

  &.is-selected {
    background-color: var(--pa-segmented-control-item-background-selected, var(--pa-color-action-primary-background-default));
    color: var(--pa-segmented-control-item-text-selected, var(--pa-color-action-primary-text-default));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}
</style>`,
  'patooltip': `<style lang="scss" scoped>
.pa-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.pa-tooltip {
  position: fixed;
  background-color: var(--pa-tooltip-background, var(--pa-gray-900, #212529));
  color: var(--pa-tooltip-text, var(--pa-gray-white, #ffffff));
  padding: var(--pa-tooltip-padding-y) var(--pa-tooltip-padding-x);
  border-radius: var(--pa-tooltip-border-radius-default, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-tooltip-font-size, var(--pa-font-size-100, 14px));
  font-weight: var(--pa-font-weight-400, 400);
  z-index: var(--pa-tooltip-z-index, var(--pa-z-index-top, 99999));
  white-space: nowrap;
  pointer-events: none;
  max-width: var(--pa-spacing-500, var(--pa-spacing-48, 48px));
  word-wrap: break-word;
  white-space: normal;
}

.pa-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  .pa-tooltip--top & {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-color: var(--pa-tooltip-arrow, var(--pa-gray-900, #212529)) transparent transparent transparent;
  }

  .pa-tooltip--bottom & {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent var(--pa-tooltip-arrow, var(--pa-gray-900, #212529)) transparent;
  }

  .pa-tooltip--left & {
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent var(--pa-tooltip-arrow, var(--pa-gray-900, #212529));
  }

  .pa-tooltip--right & {
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0;
    border-color: transparent var(--pa-tooltip-arrow, var(--pa-gray-900, #212529)) transparent transparent;
  }
}

.pa-tooltip-enter-active,
.pa-tooltip-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-tooltip-enter-from,
.pa-tooltip-leave-to {
  opacity: 0;
}
</style>`
}

export function getComponentStyleSource(componentId: string): string {
  return componentStyleSource[componentId] || '/* No styles available for this component */'
}
