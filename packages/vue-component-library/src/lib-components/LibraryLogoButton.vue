<script setup>
// Components
import LogoLibrary from "ucla-library-design-tokens/assets/svgs/logo-library.svg"
import SmartLink from "@/lib-components/SmartLink.vue"

const props = defineProps({
    to: String,
})
</script>

<template>
    <smart-link class="library-logo-button" :to="props.to">
        <LogoLibrary />
    </smart-link>
</template>
