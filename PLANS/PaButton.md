# PaButton Component Plan

## Component Overview

- **Component Name**: PaButton
- **Purpose**: A versatile button component with multiple variants and sizes. Button variants follow a clear hierarchy: Primary (highest priority) → Secondary → Tertiary → Link → Action (lowest priority).
- **Status**: ✅ Existing
- **Related Components**: None
- **Storybook Reference**: https://storybook.payadvantage.com.au
- **File Location**: `src/components/PaButton/PaButton.vue`
- **Token File**: `src/tokens/tier3-component/button.json`

## Token Review & Updates

### Tier 3 Component Tokens (`src/tokens/tier3-component/button.json`)

- [x] Verify all tokens reference Tier 2 semantic tokens (not Tier 1 directly)
- [x] Check spacing tokens use `{spacing.*}` from foundation.json - ✅ Uses `{spacing.150}`, `{spacing.50}`, `{spacing.200}`, `{spacing.100}`, `{spacing.300}`
- [x] Check font tokens use `{font.size.*}` from foundation.json - ✅ Uses `{font.size.md}`, `{font.size.lg}`, `{font.size.xl}`
- [x] Verify color tokens reference semantic color tokens - ✅ Uses `{color.action.*}` tokens
- [x] Ensure all states are tokenized (default, hover, active, focus, disabled, error) - ✅ All states present
- [x] Verify size variants (sm, md, lg) if applicable - ✅ All sizes tokenized
- [x] Check border radius tokens reference `{border.radius.*}` - ✅ Uses `{border.radius.medium}`
- [x] Verify transition tokens reference `{transition.*}` - ✅ Uses `{transition.duration.default}` and `{transition.easing.default}`
- [x] Check outline tokens reference `{outline.*}` - ✅ Uses `{outline.width.default}` and `{outline.offset.default}`
- [x] Verify cursor tokens reference `{cursor.*}` - ✅ Uses `{cursor.pointer}` and `{cursor.not-allowed}`

### Missing Tokens

- [ ] Review component for any hardcoded values
- [ ] Verify loading spinner animation tokens (if needed)

### Token Validation

- [ ] Run `npm run build:tokens` to verify compilation
- [ ] Check generated CSS in `src/tokens/index.css`
- [ ] Verify all tokens are accessible via CSS variables

## Component Implementation Checklist

### File Structure

- [x] Component file exists: `src/components/PaButton/PaButton.vue`
- [x] Index file exists: `src/components/PaButton/index.ts`
- [x] Component exported in `src/components/index.ts`

### Component Code Quality

- [x] Uses Vue 3 Composition API (`<script setup>`)
- [x] TypeScript types defined for all props
- [x] Props have default values where appropriate
- [ ] Emits properly typed - N/A (no emits currently)
- [x] Uses BEM naming convention for CSS classes
- [x] No hardcoded values (all use tokens)
- [x] Proper use of `v-if`, `v-show`, `v-for` where needed
- [ ] Computed properties for derived state - N/A
- [x] Reactive refs properly managed

### Styling

- [x] SCSS uses scoped styles
- [x] All CSS values use `var(--pa-*)` tokens
- [x] Fallback values provided for tokens: `var(--pa-token, fallback)`
- [x] Proper nesting structure
- [ ] Responsive design considerations (if applicable) - N/A
- [x] Dark theme support verified
- [x] Light theme support verified
- [x] Hover states implemented
- [x] Focus states implemented (keyboard accessibility)
- [x] Active states implemented
- [x] Disabled states implemented
- [x] Error states implemented (if applicable) - N/A
- [x] Loading state implemented

### Functionality

- [x] Core functionality implemented
- [x] All variants work correctly (primary, secondary, tertiary, link, action)
- [x] All sizes work correctly (sm, md, lg)
- [x] Event handling correct
- [ ] Form integration (if form component) - N/A
- [ ] Validation support (if applicable) - N/A
- [ ] No console errors or warnings - Needs verification

## Documentation Requirements

### Documentation Page

- [x] Component added to `src/config/navigation.ts`
- [x] Component description added to `src/config/componentDescriptions.ts`
- [x] Component examples added to `src/config/componentExamples.ts`
- [x] Component source code added to `src/config/componentSourceCode.ts`
- [x] Route configured in `src/router/index.ts` - Uses custom `PaButtonDocs.vue`

### Documentation Content

- [x] Component name and description displayed
- [x] Usage examples for each variant
- [x] Usage examples for each size
- [x] Usage examples for each state
- [ ] Props documentation (table or list) - Needs enhancement
- [ ] Events documentation - N/A
- [ ] Slots documentation - Default slot documented
- [x] Code examples with syntax highlighting
- [x] Component source code displayed (full Vue file)
- [x] Token source displayed (CSS custom properties)
- [x] Import statement example
- [x] Basic usage example
- [x] Advanced usage examples (icon positioning, loading state)

### Documentation Format

- [x] Follows PaButton documentation pattern (tabs for variants/sizes/states)
- [x] Code blocks use `CodeBlock` component
- [x] Examples use proper preview containers
- [x] Code examples are copyable
- [x] Responsive layout for documentation

## Accessibility Requirements

### ARIA Attributes

- [x] Proper `role` attributes - Uses semantic `<button>` element
- [ ] `aria-label` or `aria-labelledby` where needed - Needs review for icon-only buttons
- [ ] `aria-describedby` for help text - N/A
- [ ] `aria-invalid` for error states - N/A
- [x] `aria-disabled` for disabled states - Handled by native `disabled` attribute
- [ ] `aria-expanded` for collapsible components - N/A
- [ ] `aria-selected` for selectable components - N/A
- [ ] `aria-checked` for checkable components - N/A
- [ ] `aria-required` for required form fields - N/A
- [ ] `aria-live` for dynamic content updates - Consider for loading state announcements

### Keyboard Navigation

- [x] Tab order logical and intuitive
- [x] Enter/Space activates interactive elements - Native button behavior
- [ ] Escape closes modals/dropdowns (if applicable) - N/A
- [ ] Arrow keys navigate options (if applicable) - N/A
- [ ] Home/End keys work (if applicable) - N/A
- [ ] Focus trap in modals/drawers - N/A
- [ ] Focus returns to trigger after close - N/A
- [x] Focus visible indicator (outline) styled properly

### Screen Reader Support

- [x] Semantic HTML elements used (`<button>`)
- [ ] Form labels properly associated - N/A
- [ ] Error messages announced - N/A
- [ ] State changes announced - Loading state should be announced
- [ ] Loading states announced - Needs `aria-busy` and `aria-live`
- [ ] Empty states have descriptive text - N/A

### Visual Accessibility

- [ ] Color contrast meets WCAG AA standards (4.5:1 for text) - Needs verification
- [ ] Color contrast meets WCAG AA standards (3:1 for UI components) - Needs verification
- [x] Focus indicators visible (not just color)
- [x] Text resizable up to 200% without loss of functionality
- [ ] No information conveyed by color alone - Needs review
- [ ] Icons have text alternatives - Needs review for icon-only buttons

### Testing

- [ ] Tested with keyboard only navigation
- [ ] Tested with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Tested with browser zoom (200%)
- [ ] Tested with high contrast mode
- [ ] Tested with reduced motion preferences

## Notes

- Reference `BUTTON_COMPONENT_REVIEW.md` for known issues
- Loading state needs accessibility improvements (aria-busy, aria-live)
- Icon-only buttons need aria-label support
- Color contrast needs verification against WCAG standards

