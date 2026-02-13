<template>
  <div style="padding: 1rem;">
    <h1>Nuxt module playground</h1>
    <h2>Craft API test</h2>
    <button
      type="button"
      :disabled="apiPending"
      @click="testCraftApi"
    >
      {{ apiPending ? 'Fetching…' : 'Query About entry (GraphQL)' }}
    </button>
    <div
      v-if="apiResult !== null"
      style="margin-top: 0.5rem;"
    >
      <strong>Status:</strong> {{ apiResult.status }}<br>
      <strong>OK:</strong> {{ apiResult.ok }}<br>
      <pre
        v-if="apiResult.data !== undefined"
        style="max-height: 12rem; overflow: auto; font-size: 0.75rem;"
      >{{ JSON.stringify(apiResult.data, null, 2) }}</pre>
      <pre
        v-else-if="apiResult.error"
        style="color: #c00;"
      >{{ apiResult.error }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const CRAFT_API = 'https://test-craft.library.ucla.edu/api'
const apiPending = ref(false)
const apiResult = ref<{ status?: number; ok?: boolean; data?: unknown; error?: string } | null>(null)

// GraphQL query for About entry with blocks (bannerFeatured). Adjust fragment names to match your Craft schema.
const CRAFT_ABOUT_QUERY = `
query AboutEntry($uri: [String]) {
  entry(uri: $uri) {
    title
    summary
    ... on pages_page_Entry {
      blocks {
        id
        typeHandle
        sectionTitle
        content {
          id
          ... on bannerFeatured_content_BlockType {
            image {
              id
              src
              height
              width
              srcset
              alt
              focalPoint
            }
            title
            summary
            alignment
            byline1
            byline2
            to
            category
            contentType
          }
        }
      }
    }
  }
}
`

async function testCraftApi() {
  apiPending.value = true
  apiResult.value = null
  try {
    const data = await $fetch<{ data?: unknown; errors?: unknown[] }>(CRAFT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        query: CRAFT_ABOUT_QUERY,
        variables: { uri: ['dcp/about'] },
      },
    })
    apiResult.value = { status: 200, ok: true, data: data?.errors ? { ...data } : data }
  } catch (e: unknown) {
    const err = e as { statusCode?: number; status?: number; message?: string }
    apiResult.value = {
      status: err?.statusCode ?? err?.status,
      ok: false,
      error: err?.message ?? String(e),
    }
  } finally {
    apiPending.value = false
  }
}
</script>
