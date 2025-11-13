# Component Pages Guide

## Where to Find Component Documentation Pages

Each component has its own dedicated URL path for easy sharing and navigation.

### URL Structure

All component pages follow this pattern:
```
/components/[component-id]
```

### Component Page Locations

#### 1. **PaButton** (Special Documentation)
- **URL**: `/components/pabutton`
- **File**: `src/views/PaButtonDocs.vue`
- **Features**: Full documentation with Sizes, Variants, Hierarchy tabs, Multiple CTAs, and States

#### 2. **Other Components** (Generic Documentation)
- **URL Pattern**: `/components/[component-id]`
- **File**: `src/views/ComponentDocs.vue`
- **Examples**:
  - `/components/painput` → PaInput documentation
  - `/components/pacard` → PaCard documentation
  - `/components/pamodal` → PaModal documentation

### Get Started Pages

- **Introduction**: `/introduction` → `src/views/Introduction.vue`
- **Installation**: `/installation` → `src/views/Installation.vue`
- **Theming**: `/theming` → `src/views/Theming.vue`

### How Routes Are Generated

Routes are automatically generated from `src/config/navigation.ts`. Each component in the navigation config gets a route at `/components/[id]`.

### Adding a New Component Page

1. Add the component to `src/config/navigation.ts`
2. If you need custom documentation (like PaButton), create a new view file in `src/views/`
3. Update `src/router/index.ts` to use your custom view for that component
4. Otherwise, it will use the generic `ComponentDocs.vue`

### Example URLs

- Button: `https://yoursite.com/components/pabutton`
- Input: `https://yoursite.com/components/painput`
- Card: `https://yoursite.com/components/pacard`
- Modal: `https://yoursite.com/components/pamodal`

