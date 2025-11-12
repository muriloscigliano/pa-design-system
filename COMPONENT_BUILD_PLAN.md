# Component Build Plan

Complete plan for building all components from Storybook (https://storybook.payadvantage.com.au) using token-driven architecture.

## Component List from Storybook

### Core/Completed Components (Priority 1)
1. ✅ **PaButton** (Already exists - needs fixes from review)
2. **PaButtonPaymentNavigation** (Button variant for payment navigation)
3. **PaButtonAction** (Button variant for actions)
4. **PaCheckbox**
5. **PaForm** (Form wrapper/container)
6. **PaHeader**
7. **PaInput**
8. **PaListItem**
9. **PaModal**
10. **PaRadio**
11. **PaRadioButtonGroup**
12. **PaToggleSwitch**
13. **PaToggleSegmentation**
14. **PaFileUploader**

### In Progress Components (Priority 2)
15. **PaToggleChip**
16. **PaSegmentedControl**
17. **PaKebabMenu**
18. **PaRangeSlider**

### Coming Next/Done (Priority 3)
19. **PaDropdown** (Marked as DONE)
20. **PaSlider**
21. **PaTable**
22. **PaTooltip**

### Coming Soon (Priority 4)
23. **PaAccordion**
24. **PaBadge**
25. **PaCard**
26. **PaContentSeparator** (Marked as DONE)
27. **PaEmptyState**
28. **PaInlineMessage**
29. **PaLoading**
30. **PaPageLayout**
31. **PaPagination**

## Build Phases

### Phase 1: Fix Existing & Build Core Form Components
**Goal:** Establish pattern with most common components

1. **Fix PaButton** (from review)
   - Fix line 75 outline bug
   - Add cursor tokens
   - Fix border-radius usage
   - Fix fallback token names
   - Fix typo in semantic tokens

2. **Build PaInput**
   - Text input with variants (default, error, disabled)
   - Sizes (sm, md, lg)
   - States (default, hover, focus, disabled, error)
   - Support for icons (left/right)
   - Support for labels and help text

3. **Build PaCheckbox**
   - States: unchecked, checked, indeterminate, disabled
   - Sizes: sm, md, lg
   - Support for label

4. **Build PaRadio**
   - States: unchecked, checked, disabled
   - Sizes: sm, md, lg
   - Support for label

5. **Build PaRadioButtonGroup**
   - Wrapper for multiple PaRadio components
   - Horizontal/vertical layout
   - Name management

6. **Build PaToggleSwitch**
   - States: off, on, disabled
   - Sizes: sm, md, lg

### Phase 2: Layout & Navigation Components
**Goal:** Build structural components

7. **Build PaHeader**
   - Logo area
   - Navigation area
   - Action area
   - Responsive behavior

8. **Build PaListItem**
   - Default, hover, selected states
   - Support for icons, avatars
   - Support for actions (kebab menu, etc.)

9. **Build PaModal**
   - Overlay
   - Container with header, body, footer
   - Sizes: sm, md, lg, fullscreen
   - Close button
   - Focus trap

10. **Build PaCard**
    - Default, hover, selected states
    - Variants: default, outlined, elevated
    - Support for header, body, footer sections

### Phase 3: Advanced Form Components
**Goal:** Complete form ecosystem

11. **Build PaForm**
    - Form wrapper
    - Error state management
    - Field grouping

12. **Build PaDropdown**
    - Trigger button
    - Menu container
    - Menu items (default, hover, selected, disabled)
    - Positioning (top, bottom, left, right)

13. **Build PaSelect**
    - Similar to dropdown but for form selects
    - Single and multi-select variants
    - Search/filter support

14. **Build PaTextarea**
    - Multi-line text input
    - Resize variants
    - Character count

15. **Build PaFileUploader**
    - Drag and drop area
    - File list
    - Upload progress
    - Error states

### Phase 4: Feedback & Status Components
**Goal:** User feedback components

16. **Build PaTooltip**
    - Positioning (top, bottom, left, right, auto)
    - Arrow support
    - Delay/trigger options

17. **Build PaBadge**
    - Variants: default, success, warning, error, info
    - Sizes: sm, md, lg
    - Dot variant

18. **Build PaInlineMessage**
    - Variants: info, success, warning, error
    - Dismissible option
    - Icon support

19. **Build PaLoading**
    - Spinner variants (default, primary, secondary)
    - Sizes: sm, md, lg
    - Overlay option

20. **Build PaEmptyState**
    - Icon area
    - Title and description
    - Action button

### Phase 5: Data Display Components
**Goal:** Complex data components

21. **Build PaTable**
    - Header, body, footer
    - Row states (default, hover, selected, striped)
    - Sortable columns
    - Responsive behavior

22. **Build PaAccordion**
    - Single/multiple expand modes
    - Header with icon
    - Content area
    - States: collapsed, expanded

23. **Build PaPagination**
    - Page numbers
    - Previous/next buttons
    - Page size selector
    - Jump to page

### Phase 6: Advanced Interactive Components
**Goal:** Complex interaction components

24. **Build PaSlider**
    - Single value slider
    - Min/max values
    - Steps
    - Tooltip on drag

25. **Build PaRangeSlider**
    - Dual-handle range slider
    - Min/max range
    - Steps

26. **Build PaSegmentedControl**
    - Multiple options in horizontal layout
    - Selected state
    - Disabled options

27. **Build PaToggleSegmentation**
    - Similar to segmented control but toggle-based

28. **Build PaToggleChip**
    - Chip/tag that can be toggled
    - Selected/unselected states
    - Removable variant

29. **Build PaKebabMenu**
    - Three-dot menu trigger
    - Dropdown menu
    - Menu items with icons

### Phase 7: Layout Components
**Goal:** Page structure components

30. **Build PaPageLayout**
    - Header area
    - Sidebar (optional)
    - Main content area
    - Footer (optional)
    - Responsive breakpoints

31. **Build PaContentSeparator**
    - Horizontal divider
    - Vertical divider
    - With text variant

### Phase 8: Button Variants
**Goal:** Specialized button components

32. **Build PaButtonPaymentNavigation**
    - Specialized button for payment flows
    - May reuse PaButton with different tokens

33. **Build PaButtonAction**
    - Action button variant
    - May reuse PaButton with different tokens

## Component Structure Template

Each component follows this structure:

```
src/components/Pa{ComponentName}/
  ├── Pa{ComponentName}.vue
  └── index.ts
```

**Component Vue file structure:**
```vue
<script setup lang="ts">
// Props definition
// Emits definition
// Logic
</script>

<template>
  <!-- HTML with BEM classes -->
</template>

<style lang="scss" scoped>
// SCSS using --pa- tokens
</style>
```

**Token file structure:**
```
src/tokens/tier3-component/
  ├── button.json (exists)
  ├── input.json
  ├── checkbox.json
  ├── radio.json
  ├── toggle-switch.json
  ├── modal.json
  ├── tooltip.json
  ├── badge.json
  ├── table.json
  ├── accordion.json
  ├── dropdown.json
  ├── slider.json
  ├── pagination.json
  └── ... (one per component)
```

## Quality Checklist (Per Component)

- [ ] All hardcoded values replaced with tokens
- [ ] All tokens use `--pa-` prefix
- [ ] Component follows BEM naming
- [ ] Props are properly typed
- [ ] States are tokenized (default, hover, active, focus, disabled, error, etc.)
- [ ] Sizes are tokenized (if applicable)
- [ ] Variants are tokenized (if applicable)
- [ ] Theme support works (light/dark)
- [ ] SCSS uses proper nesting
- [ ] Component name matches Storybook exactly
- [ ] Component exports correctly via index.ts
- [ ] No console errors
- [ ] Visual matches Storybook

## Build Order Summary

1. **Fix PaButton first** - Establishes the pattern and fixes issues
2. **Form components** - Most commonly used, establishes form patterns
3. **Layout components** - Needed for page structure
4. **Feedback components** - Enhance UX
5. **Data components** - More complex, build on established patterns
6. **Advanced components** - Most complex, build last

## Related Documents

- `MISSING_TOKENS.md` - Lists all tokens that need to be added
- `BUTTON_COMPONENT_REVIEW.md` - Review of PaButton with issues to fix
- `TOKEN_STRUCTURE_RECOMMENDATIONS.md` - Token architecture guidelines

## Notes

- Component names must match Storybook exactly (case-sensitive)
- All components use the same token architecture
- Components should be composable and reusable
- Each component should be self-contained
- Use semantic HTML where possible
- Ensure accessibility (ARIA labels, keyboard navigation, etc.)
- Test with both light and dark themes

