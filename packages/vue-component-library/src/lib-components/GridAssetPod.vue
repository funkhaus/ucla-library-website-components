<script setup lang="ts">
// Imports
import { computed, nextTick, ref, useTemplateRef, watch } from "vue"
import BlockAssetPod from "@/lib-components/BlockAssetPod.vue"
import GridMasonry from "@/lib-components/GridMasonry.vue"
import type { BlockAssetPodProps } from "@/types/components/blockAssetPods.types"
import delay from "@/utils/delay"

interface GridAssetPodProps {
    readonly items: readonly BlockAssetPodProps[]
    readonly isGridLayout?: boolean
}

// Props
const props = defineProps<GridAssetPodProps>()

// Data
const refGridMasonry = useTemplateRef("refGridMasonry")

// Computeds
const classes = computed(() => [
    "grid-asset-pod",
    "dlc",
    props.isGridLayout ? "is-grid-layout" : "is-list-layout",
])

const hasItems = computed(() => props.items.length > 0)

// Methods
const isLastItem = (index: number) => {
    return index === props.items.length - 1
}

// Watchers
watch(
    () => props.isGridLayout,
    async () => {
        await nextTick()
        await delay(100)
        // Call refresh method on the GridMasonry component
        refGridMasonry.value?.refresh?.()
    }
)
</script>

<template>
    <div
        v-if="hasItems"
        :class="classes"
        :aria-label="`Asset grid with ${items.length} items`"
    >
        <GridMasonry
            ref="refGridMasonry"
            :transition-duration="1000"
            stagger="0"
            class="grid-masonry"
            item-selector=".block-container"
        >
            <div
                class="block-container"
                v-for="(item, index) in items"
                :key="item.title"
            >
                <BlockAssetPod
                    :title="item.title"
                    :to="item.to"
                    :date="item.date"
                    :description="item.description"
                    :resource-type="item.resourceType"
                    :collection="item.collection"
                    :image="item.image"
                />
                <div class="divider" v-if="!isLastItem(index)" />
            </div>
        </GridMasonry>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/dlc/_grid-asset-pod.scss";
</style>
