import { ref, computed } from 'vue'
import { navigation } from '../config/navigation'
import { getComponentExamples } from '../config/componentExamples'

export function useComponentSelection() {
  const activeComponent = ref('introduction')
  const activeExampleGroup = ref<string>('')

  const activeSection = computed(() => {
    for (const section of Object.values(navigation)) {
      if (section.items.some(item => item.id === activeComponent.value)) {
        return section.title
      }
    }
    return 'Components'
  })

  const activeComponentData = computed(() => {
    const allComponents = Object.values(navigation).flatMap(section => section.items)
    return allComponents.find(item => item.id === activeComponent.value)
  })

  const currentExamples = computed(() => {
    return getComponentExamples(activeComponent.value)
  })

  const currentExample = computed(() => {
    return currentExamples.value.find(ex => ex.label === activeExampleGroup.value)
  })

  const selectComponent = (id: string) => {
    activeComponent.value = id
    const examples = getComponentExamples(id)
    if (examples.length > 0) {
      activeExampleGroup.value = examples[0].label
    } else {
      activeExampleGroup.value = ''
    }
  }

  return {
    activeComponent,
    activeExampleGroup,
    activeSection,
    activeComponentData,
    currentExamples,
    currentExample,
    selectComponent
  }
}

