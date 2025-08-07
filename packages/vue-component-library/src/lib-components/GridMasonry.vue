<template>
    <div ref="masonryContainer" class="grid-masonry">
        <slot />

        <div ref="gridSizer" class="grid-sizer" />
        <div ref="gutterSizer" class="gutter-sizer" />
    </div>
</template>

<script setup>
// Utils
import delay from "@/utils/delay"
import { onBeforeUnmount, onMounted, ref } from "vue"

// Props
const props = defineProps({
    itemSelector: {
        type: String,
        default: "",
    },
    transitionDuration: {
        type: [Number, String],
        default: 0,
    },
    percentPosition: {
        type: Boolean,
        default: true,
    },
    stagger: {
        type: [Number, String],
        default: 30,
    },
})

defineExpose({ refresh })

// Data
const masonryContainer = ref(null)
const gridSizer = ref(null)
const gutterSizer = ref(null)

let msnry = null
let observer = null

// Methods
const destroy = async () => {
    await delay(1500) // Give time for page transition if any
    observer?.disconnect()
    msnry?.destroy()
}

const layout = () => {
    msnry?.reloadItems()
    msnry?.layout()
}

function refresh() {
    msnry?.layout()
}

// Lifecycle hooks
onMounted(async () => {
    const Masonry = await import("masonry-layout")

    msnry = new Masonry.default(masonryContainer.value, {
        itemSelector: props.itemSelector,
        columnWidth: gridSizer.value,
        gutter: gutterSizer.value,
        transitionDuration: props.transitionDuration,
        percentPosition: props.percentPosition,
        containerStyle: false,
        stagger: props.stagger,
    })

    observer = new MutationObserver(() => {
        layout()
    })

    observer.observe(masonryContainer.value, {
        childList: true,
    })
})

onBeforeUnmount(() => {
    destroy()
})
</script>

<style scoped>
.grid-masonry {
    padding: 0;
    position: relative;
}
</style>
