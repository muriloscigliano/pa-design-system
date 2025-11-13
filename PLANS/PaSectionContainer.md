# PaSectionContainer Component Plan

## Component Overview

- **Component Name**: PaSectionContainer
- **Purpose**: Section container component with title and actions.
- **Status**: ✅ Existing
- **Related Components**: See component relationships
- **Storybook Reference**: https://storybook.payadvantage.com.au
- **File Location**: `src/components/PaSectionContainer/PaSectionContainer.vue`
- **Token File**: `src/tokens/tier3-component/section-container.json`

## Token Review & Updates

### Tier 3 Component Tokens (`src/tokens/tier3-component/section-container.json`)

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
- [ ] Ensure tokens follow naming convention: `--pa-pasectioncontainer-[property]-[variant]-[state]`

### Token Validation

- [ ] Run `npm run build:tokens` to verify compilation
- [ ] Check generated CSS in `src/tokens/index.css`
- [ ] Verify all tokens are accessible via CSS variables

## Component Implementation Checklist

### File Structure

- [x] Component file exists: `src/components/PaSectionContainer/PaSectionContainer.vue`
- [x] Index file exists: `src/components/PaSectionContainer/index.ts`
- [ ] Component exported in `src/components/index.ts`

### Component Code Quality

- [ ] Uses Vue 3 Composition API (`<script setup>`)
- [ ] TypeScript types defined for all props
- [ ] Props have default values where appropriate
- [ ] Emits properly typed
- [ ] Uses BEM naming convention for CSS classes
- [ ] No hardcoded values (all use tokens)
- [ ] Proper use of `v-if`, `v-show`, `v-for` where needed
- [ ] Computed properties for derived state
- [ ] Reactive refs properly managed

### Styling

- [ ] SCSS uses scoped styles
- [ ] All CSS values use `var(--pa-*)` tokens
- [ ] Fallback values provided for tokens: `var(--pa-token, fallback)`
- [ ] Proper nesting structure
- [ ] Responsive design considerations (if applicable)
- [ ] Dark theme support verified
- [ ] Light theme support verified
- [ ] Hover states implemented
- [ ] Focus states implemented (keyboard accessibility)
- [ ] Active states implemented
- [ ] Disabled states implemented
- [ ] Error states implemented (if applicable)

### Functionality

- [ ] Core functionality implemented
- [ ] All variants work correctly
- [ ] All sizes work correctly (if applicable)
- [ ] Event handling correct
- [ ] Form integration (if form component)
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
- [ ] Usage examples for each size (if applicable)
- [ ] Usage examples for each state
- [ ] Props documentation (table or list)
- [ ] Events documentation
- [ ] Slots documentation (if applicable)
- [ ] Code examples with syntax highlighting
- [ ] Component source code displayed (full Vue file)
- [ ] Token source displayed (CSS custom properties)
- [ ] Import statement example
- [ ] Basic usage example
- [ ] Advanced usage examples (if applicable)

### Documentation Format

- [ ] Follows PaButton documentation pattern (tabs for variants/sizes/states)
- [ ] Code blocks use `CodeBlock` component
- [ ] Examples use proper preview containers
- [ ] Code examples are copyable
- [ ] Responsive layout for documentation

## Accessibility Requirements

### ARIA Attributes

- [ ] Proper `role` attributes
- [ ] `aria-label` or `aria-labelledby` where needed
- [ ] `aria-describedby` for help text
- [ ] `aria-invalid` for error states
- [ ] `aria-disabled` for disabled states
- [ ] `aria-expanded` for collapsible components
- [ ] `aria-selected` for selectable components
- [ ] `aria-checked` for checkable components
- [ ] `aria-required` for required form fields
- [ ] `aria-live` for dynamic content updates

### Keyboard Navigation

- [ ] Tab order logical and intuitive
- [ ] Enter/Space activates interactive elements
- [ ] Escape closes modals/dropdowns (if applicable)
- [ ] Arrow keys navigate options (if applicable)
- [ ] Home/End keys work (if applicable)
- [ ] Focus trap in modals/drawers
- [ ] Focus returns to trigger after close
- [ ] Focus visible indicator (outline) styled properly

### Screen Reader Support

- [ ] Semantic HTML elements used (`<button>`, `<input>`, etc.)
- [ ] Form labels properly associated
- [ ] Error messages announced
- [ ] State changes announced
- [ ] Loading states announced
- [ ] Empty states have descriptive text

### Visual Accessibility

- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Color contrast meets WCAG AA standards (3:1 for UI components)
- [ ] Focus indicators visible (not just color)
- [ ] Text resizable up to 200% without loss of functionality
- [ ] No information conveyed by color alone
- [ ] Icons have text alternatives

### Testing

- [ ] Tested with keyboard only navigation
- [ ] Tested with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Tested with browser zoom (200%)
- [ ] Tested with high contrast mode
- [ ] Tested with reduced motion preferences

## Notes

- Component-specific notes and considerations
