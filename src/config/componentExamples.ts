export interface ExampleConfig {
  label: string
  code: string
  render: string
}

export const componentExamples: Record<string, ExampleConfig[]> = {
  'pabutton': [
    {
      label: 'Hierarchy',
      code: `<!-- Button Variant Hierarchy (Highest to Lowest Priority) -->
<!-- 1. Primary - Main call-to-action, most important action -->
<PaButton variant="primary">Primary</PaButton>

<!-- 2. Secondary - Secondary action, less emphasis -->
<PaButton variant="secondary">Secondary</PaButton>

<!-- 3. Tertiary - Tertiary action, minimal emphasis -->
<PaButton variant="tertiary">Tertiary</PaButton>

<!-- 4. Link - Text link style button -->
<PaButton variant="link">Link</PaButton>

<!-- 5. Action - General action button -->
<PaButton variant="action">Action</PaButton>`,
      render: 'hierarchy'
    },
    {
      label: 'Sizes',
      code: `<PaButton variant="primary" size="sm">Small</PaButton>
<PaButton variant="primary" size="md">Medium</PaButton>
<PaButton variant="primary" size="lg">Large</PaButton>`,
      render: 'sizes'
    },
      {
        label: 'Variants',
        code: `<PaButton variant="primary">Primary</PaButton>
<PaButton variant="secondary">Secondary</PaButton>
<PaButton variant="tertiary">Tertiary</PaButton>
<PaButton variant="link">Link</PaButton>
<PaButton variant="action">Action</PaButton>`,
        render: 'variants'
      },
    {
      label: 'Multiple CTAs',
      code: `<!-- Example: Primary + Secondary -->
<PaButton variant="primary">Save Changes</PaButton>
<PaButton variant="secondary">Cancel</PaButton>

<!-- Example: Primary + Tertiary -->
<PaButton variant="primary">Submit</PaButton>
<PaButton variant="tertiary">Skip</PaButton>

<!-- Example: Three actions -->
<PaButton variant="primary">Confirm</PaButton>
<PaButton variant="secondary">Edit</PaButton>
<PaButton variant="tertiary">Cancel</PaButton>`,
      render: 'multiple-ctas'
    },
      {
        label: 'States',
        code: `<PaButton variant="primary">Default</PaButton>
<PaButton variant="primary" :disabled="true">Disabled</PaButton>
<PaButton variant="primary" :loading="true">Loading</PaButton>`,
        render: 'states'
      }
  ],
  'painput': [
    {
      label: 'Default',
      code: `<PaInput placeholder="Enter text..." />`,
      render: 'default'
    }
  ]
}

export const getComponentExamples = (componentId: string): ExampleConfig[] => {
  return componentExamples[componentId] || []
}

