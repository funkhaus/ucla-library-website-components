<script setup lang="ts">
// Imports
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import SvgIconClose from 'ucla-library-design-tokens/assets/svgs/icon-close.svg'
import SvgIconFilter from 'ucla-library-design-tokens/assets/svgs/icon-dlc-filter.svg'
import BlockAnchorNav from './BlockAnchorNav.vue'
import { type BlockAnchorNavProps } from '@/types/components/blockAnchorNav.types'

interface PanelAnchorNavProps extends BlockAnchorNavProps {
  isOpened: boolean
  showOpenIconAlways?: boolean
}

// Props
const props = withDefaults(defineProps<PanelAnchorNavProps>(), {
  isOpened: false,
  showOpenIconAlways: true,
})

// Emits
const emit = defineEmits(['closePanel', 'openPanel'])

// Data
const hasScrolled = ref(false)

// Methods
function openPanel() {
  emit('openPanel')
}
function closePanel() {
  emit('closePanel')
}

// Body scroll lock methods
function lockBodyScroll() {
  document.documentElement.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  document.documentElement.style.overflow = ''
}

// Scroll detection
function handleScroll() {
  if (!props.showOpenIconAlways) {
    // Show open icon after scrolling 50% of the viewport height
    hasScrolled.value = window.scrollY >= window.innerHeight * 0.5
  }
}

// Watchers
watch(
  () => props.isOpened,
  (isOpened) => {
    if (isOpened)
      lockBodyScroll()
    else
      unlockBodyScroll()
  }
)

// Lifecycle
onMounted(() => {
  if (!props.showOpenIconAlways) {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position
  }
})

onUnmounted(() => {
  unlockBodyScroll()
  if (!props.showOpenIconAlways)
    window.removeEventListener('scroll', handleScroll)
})

// Computed
const classes = computed(() => [
  'panel-anchor-nav',
  { 'is-opened': props.isOpened },
  { 'show-open-icon': props.showOpenIconAlways || hasScrolled.value },
])
</script>

<template>
  <div :class="classes">
    <SvgIconFilter class="icon-open" @click="openPanel" />

    <div class="panel">
      <BlockAnchorNav :items="items" :title="title" />
    </div>

    <SvgIconClose class="icon-close" @click="closePanel" />
    <div class="bg-color" @click="closePanel" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/default/_panel-anchor-nav.scss";
</style>
