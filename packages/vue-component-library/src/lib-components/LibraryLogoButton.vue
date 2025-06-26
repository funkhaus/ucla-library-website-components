<script setup>
import { computed } from 'vue'

// Components
import LogoLibrary from 'ucla-library-design-tokens/assets/svgs/logo-library.svg'
import SmartLink from '@/lib-components/SmartLink.vue'

// Props
const props = defineProps({
  to: {
    type: String,
    default: ''
  },
})
</script>

<template>
    <smart-link
      class="library-logo-button"
      :to="props.to"
    >
      <LogoLibrary />
    </smart-link>
</template>