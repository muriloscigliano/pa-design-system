# PaInput Component Plan

## Component Overview

- **Component Name**: PaInput
- **Purpose**: Text input component with validation states, sizes, and icon support.
- **Status**: ✅ Existing
- **Related Components**: PaForm, PaFormContainer
- **Storybook Reference**: https://storybook.payadvantage.com.au
- **File Location**: `src/components/PaInput/PaInput.vue`
- **Token File**: `src/tokens/tier3-component/input.json`

## Token Review & Updates

### Tier 3 Component Tokens (`src/tokens/tier3-component/input.json`)

- [ ] Verify all tokens reference Tier 2 semantic tokens (not Tier 1 directly)
- [ ] Check spacing tokens use `{spacing.*}` from foundation.json
- [ ] Check font tokens use `{font.size.*}` from foundation.json
- [ ] Verify color tokens reference semantic color tokens
- [ ] Ensure all states are tokenized (default, hover, active, focus, disabled, error)
- [ ] Verify size variants (sm, md, lg) if applicable
- [ ] Check border radius tokens reference `{border.radius.*}`
- [ ] Verify transition tokens reference `{transition.*}`
- [ ] Check outline tokens reference `{outline.*}`
- [ ] Verify cursor tokens reference `{cursor.*}`

### Missing Tokens

- [ ] Identify any hardcoded values in component
- [ ] Create token definitions for missing values
- [ ] Ensure tokens follow naming convention: `--pa-input-[property]-[variant]-[state]`

### Token Validation

- [ ] Run `npm run build:tokens` to verify compilation
- [ ] Check generated CSS in `src/tokens/index.css`
- [ ] Verify all tokens are accessible via CSS variables

## Component Implementation Checklist

### File Structure

- [x] Component file exists: `src/components/PaInput/PaInput.vue`
- [x] Index file exists: `src/components/PaInput/index.ts`
- [ ] Component exported in `src/components/index.ts`

### Component Code Quality

- [x] Uses Vue 3 Composition API (`<script setup>`)
- [x] TypeScript types defined for all props
- [x] Props have default values where appropriate
- [x] Emits properly typed
- [x] Uses BEM naming convention for CSS classes
- [ ] No hardcoded values (all use tokens)
- [x] Proper use of `v-if`, `v-show`, `v-for` where needed
- [ ] Computed properties for derived state
- [x] Reactive refs properly managed

### Styling

- [x] SCSS uses scoped styles
- [ ] All CSS values use `var(--pa-*)` tokens
- [ ] Fallback values provided for tokens: `var(--pa-token, fallback)`
- [x] Proper nesting structure
- [ ] Responsive design considerations (if applicable)
- [ ] Dark theme support verified
- [ ] Light theme support verified
- [x] Hover states implemented
- [x] Focus states implemented (keyboard accessibility)
- [ ] Active states implemented
- [x] Disabled states implemented
- [x] Error states implemented

### Functionality

- [x] Core functionality implemented
- [x] All variants work correctly
- [x] All sizes work correctly (sm, md, lg)
- [x] Event handling correct
- [x] Form integration (v-model support)
- [ ] Validation support (if applicable)
- [ ] No console errors or warnings

## Documentation Requirements

### Documentation Page

- [x] Component added to `src/config/navigation.ts`
- [x] Component description added to `src/config/componentDescriptions.ts`
- [ ] Component examples added to `src/config/componentExamples.ts`
- [ ] Component source code added to `src/config/componentSourceCode.ts` (if needed)
- [ ] Route configured in `src/router/index.ts` (if custom docs needed)

### Documentation Content

- [ ] Component name and description displayed
- [ ] Usage examples for each variant
- [ ] Usage examples for each size
- [ ] Usage examples for each state
- [ ] Props documentation (table or list)
- [ ] Events documentation
- [ ] Slots documentation (if applicable)
- [ ] Code examples with syntax highlighting
- [ ] Component source code displayed (full Vue file)
- [ ] Token source displayed (CSS custom properties)
- [ ] Import statement example
- [ ] Basic usage example
- [ ] Advanced usage examples (icon support, validation)

### Documentation Format

- [ ] Follows PaButton documentation pattern (tabs for variants/sizes/states)
- [ ] Code blocks use `CodeBlock` component
- [ ] Examples use proper preview containers
- [ ] Code examples are copyable
- [ ] Responsive layout for documentation

## Accessibility Requirements

### ARIA Attributes

- [x] Proper `role` attributes - Uses semantic `<input>` element
- [ ] `aria-label` or `aria-labelledby` where needed
- [ ] `aria-describedby` for help text
- [x] `aria-invalid` for error states
- [x] `aria-disabled` for disabled states - Handled by native `disabled` attribute
- [ ] `aria-expanded` for collapsible components - N/A
- [ ] `aria-selected` for selectable components - N/A
- [ ] `aria-checked` for checkable components - N/A
- [ ] `aria-required` for required form fields
- [ ] `aria-live` for dynamic content updates - Error messages

### Keyboard Navigation

- [x] Tab order logical and intuitive
- [x] Enter/Space activates interactive elements - Native input behavior
- [ ] Escape closes modals/dropdowns (if applicable) - N/A
- [ ] Arrow keys navigate options (if applicable) - N/A
- [ ] Home/End keys work (if applicable) - Native input behavior
- [ ] Focus trap in modals/drawers - N/A
- [ ] Focus returns to trigger after close - N/A
- [x] Focus visible indicator (outline) styled properly

### Screen Reader Support

- [x] Semantic HTML elements used (`<input>`)
- [ ] Form labels properly associated - Needs `<label>` element
- [x] Error messages announced - Needs `aria-describedby` linking to error message
- [ ] State changes announced
- [ ] Loading states announced - N/A
- [ ] Empty states have descriptive text - N/A

### Visual Accessibility

- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Color contrast meets WCAG AA standards (3:1 for UI components)
- [x] Focus indicators visible (not just color)
- [x] Text resizable up to 200% without loss of functionality
- [ ] No information conveyed by color alone - Error state needs icon/text
- [ ] Icons have text alternatives

### Testing

- [ ] Tested with keyboard only navigation
- [ ] Tested with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Tested with browser zoom (200%)
- [ ] Tested with high contrast mode
- [ ] Tested with reduced motion preferences

## Notes

- Component supports iconLeft and iconRight props
- Error state needs proper ARIA attributes for screen readers
- Label association needs verification

