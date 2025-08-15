<script setup lang="ts">
// Imports
import { computed } from "vue"
import Button from "@/lib-components/Button.vue"
import Divider from "@/lib-components/DividerGeneral.vue"
import { ButtonVariant } from "@/types/components/button.types"

// Types
interface BlockAnchorNavItem {
    label?: string
    to?: string
}
interface BlockAnchorNavProps {
    title?: string
    items?: BlockAnchorNavItem[]
}

// Props
const props = withDefaults(defineProps<BlockAnchorNavProps>(), {
    title: "",
    items: () => [],
})

// Methods
const isRouteLike = (to: string) =>
    to.startsWith("#") || to.startsWith("/") || /^[a-zA-Z][\w+.-]*:/.test(to)

// Computeds
const sanitizedTitle = computed(() => props.title?.trim() ?? "")

const items = computed<BlockAnchorNavItem[]>(() => {
    if (!Array.isArray(props.items)) {
        return []
    }

    const output: BlockAnchorNavItem[] = []

    for (let i = 0; i < props.items.length; i++) {
        const raw = props.items[i] as any
        const label = String(raw?.label ?? "").trim()
        const to = String(raw?.to ?? "").trim()

        // Skip if label or to is missing or invalid
        if (!label || !to || !isRouteLike(to)) {
            continue
        }

        output.push({ label, to })
    }
    return output
})

const hasTitle = computed(() => sanitizedTitle.value.length > 0)
const hasItems = computed(() => items.value.length > 0)
</script>

<template>
    <nav class="block-anchor-nav" :aria-labelledby="sanitizedTitle">
        <h3 v-if="hasTitle" class="title">{{ sanitizedTitle }}</h3>

        <Divider v-if="hasTitle && hasItems" class="divider" />

        <ul v-if="hasItems" class="items">
            <li v-for="item in items" :key="item.label" class="item">
                <Button
                    :to="item.to || '#'"
                    :text="item.label || 'Untitled'"
                    :variant="ButtonVariant.Secondary"
                    isOutlined
                    class="button"
                />
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
@import "@/styles/default/_block-anchor-nav.scss";
</style>
