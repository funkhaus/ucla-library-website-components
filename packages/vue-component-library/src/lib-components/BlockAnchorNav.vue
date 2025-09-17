<script setup lang="ts">
// Imports
import { computed } from 'vue'
import Button from '@/lib-components/Button.vue'
import Divider from '@/lib-components/DividerGeneral.vue'
import { ButtonVariant } from '@/types/components/button.types'
import {
  type BlockAnchorNavItem,
  type BlockAnchorNavProps,
} from '@/types/components/blockAnchorNav.types'
import { useTheme } from '@/composables/useTheme'

// Props
const props = withDefaults(defineProps<BlockAnchorNavProps>(), {
  title: '',
  items: () => [],
})

const theme = useTheme()

// Methods
function isRouteLike(to: string) {
  // Allow local anchors and routes
  if (to.startsWith('#') || to.startsWith('/'))
    return true
  // Allow only safe protocols
  const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:']
  try {
    const url = new URL(to, 'http://dummy.base') // base needed for relative URLs
    // Check if it's a valid URL by ensuring it has a proper hostname or is a protocol-specific URL
    const isValidUrl
            = url.hostname !== 'dummy.base'
            || SAFE_PROTOCOLS.some(protocol =>
              to.startsWith(protocol.slice(0, -1))
            )
    return SAFE_PROTOCOLS.includes(url.protocol) && isValidUrl
  }
  catch {
    return false
  }
}
// Computeds
const classes = computed(() => ['block-anchor-nav', theme?.value || ''])

const sanitizedTitle = computed(() => props.title?.trim() ?? '')

const sanitizedItems = computed<BlockAnchorNavItem[]>(() => {
  if (!Array.isArray(props.items))
    return []

  const output: BlockAnchorNavItem[] = []

  for (let i = 0; i < props.items.length; i++) {
    const raw = props.items[i] as any
    const label = typeof raw?.label === 'string' ? raw.label.trim() : ''
    const to = typeof raw?.to === 'string' ? raw.to.trim() : ''

    // Skip if label or to is missing or invalid
    if (!label || !to || !isRouteLike(to))
      continue

    output.push({ label, to })
  }
  return output
})

const hasTitle = computed(() => sanitizedTitle.value.length > 0)
const hasItems = computed(() => sanitizedItems.value.length > 0)
</script>

<template>
  <nav :class="classes">
    <h3 v-if="hasTitle" class="title">
      {{ sanitizedTitle }}
    </h3>

    <Divider v-if="hasTitle && hasItems" class="divider" />

    <ul v-if="hasItems" class="items">
      <li
        v-for="item in sanitizedItems"
        :key="item?.label || ''"
        class="item"
      >
        <Button
          :to="item?.to"
          :text="item?.label || ''"
          :variant="ButtonVariant.Secondary"
          is-outlined
          class="button"
        />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/styles/default/_block-anchor-nav.scss";
</style>
