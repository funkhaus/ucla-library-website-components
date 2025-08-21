<script setup lang="ts">
// Imports
import { computed, watch, onUnmounted } from "vue"
import BlockAnchorNav from "./BlockAnchorNav.vue"
import SvgIconClose from "ucla-library-design-tokens/assets/svgs/icon-close.svg"
import SvgIconFilter from "ucla-library-design-tokens/assets/svgs/icon-dlc-filter.svg"
import { type BlockAnchorNavProps } from "@/types/components/blockAnchorNav.types"

interface PanelAnchorNavProps extends BlockAnchorNavProps {
    isOpened: boolean
}

// Emits
const emit = defineEmits(["closePanel", "openPanel"])

// Props
const props = withDefaults(defineProps<PanelAnchorNavProps>(), {
    isOpened: false,
})

// Methods
const openPanel = () => {
    emit("openPanel")
}
const closePanel = () => {
    emit("closePanel")
}

const lockBodyScroll = () => {
    document.documentElement.style.overflow = "hidden"
}

const unlockBodyScroll = () => {
    document.documentElement.style.overflow = ""
}

// Watchers
watch(
    () => props.isOpened,
    (isOpened) => {
        if (isOpened) {
            lockBodyScroll()
        } else {
            unlockBodyScroll()
        }
    }
)

// Lifecycle
onUnmounted(() => {
    unlockBodyScroll()
})

// Computed
const classes = computed(() => [
    "panel-anchor-nav",
    { "is-opened": props.isOpened },
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
