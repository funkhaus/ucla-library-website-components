<template>
  <div style="padding: 1rem;">
    <h1>Nuxt module playground</h1>
    <h2>Craft API test</h2>

    <div style="margin-bottom: 1rem;">
      <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">URI
        (URI with an image example:
        about/news/east-west-players-av-collection-materials-now-available-to-researchers)</label>
      <input
        v-model="uriInput"
        type="text"
        placeholder="e.g. / or about or about,team"
        style="width: 20rem; padding: 0.35rem;"
      >
    </div>

    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <button
        type="button"
        :disabled="apiPending"
        @click="listPages"
      >
        {{ apiPending ? 'Fetching…' : 'List possible pages (entries)' }}
      </button>
      <button
        type="button"
        :disabled="apiPending"
        @click="fetchEntryByUri"
      >
        {{ apiPending ? 'Fetching…' : 'Get entry by URI' }}
      </button>
    </div>

    <div
      v-if="apiResult !== null"
      style="margin-top: 0.5rem;"
    >
      <strong>Status:</strong> {{ apiResult.status }}<br>
      <strong>OK:</strong> {{ apiResult.ok }}<br>
      <pre
        v-if="apiResult.data !== undefined"
        style=" overflow: auto; font-size: 0.75rem;"
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

const CRAFT_API = 'https://craft.library.ucla.edu/api'
// const CRAFT_API = 'https://test-craft.library.ucla.edu/api'
const apiPending = ref(false)
const apiResult = ref<{ status?: number; ok?: boolean; data?: unknown; error?: string } | null>(null)
const uriInput = ref('')

/** Parse URI input into Craft-style path segments. Empty or "/" => [] for homepage. */
function parseUri(input: string): string[] {
  const trimmed = input.trim().replace(/^\/+|\/+$/g, '')
  if (!trimmed) return []
  return trimmed.split(',').map(s => s.trim()).filter(Boolean)
}

/** List entries (possible pages). Uses entries(limit). Images come from concrete types (heroImage, keyArt, etc.). */
const LIST_PAGES_QUERY = `
query ListPages($limit: Int) {
  entries(limit: $limit) {
    id
    title
    uri
    ... on EntryInterface {
      sectionHandle
      type
    }
    ... on endowment_endowments_Entry {
      heroImage {
        ... on heroImage_heroImage_BlockType {
          image { ...Image }
        }
      }
    }
    ... on article_article_Entry {
      heroImage {
        ... on heroImage_heroImage_BlockType {
          image { ...Image }
        }
      }
    }
    ... on impactReport_impactReport_Entry {
      keyArt {
        ... on keyArt_keyArt_BlockType {
          image { ...Image }
        }
      }
    }
    ... on dcpHomepage_dcpHomepage_Entry {
      children(limit: 3) {
        ... on dcpCollection_dcpCollection_Entry {
          title
          image { ...Image }
        }
      }
    }
  }
}
fragment Image on AssetInterface {
  id
  src: url(transform: "fullscreen")
  height(transform: "fullscreen")
  width(transform: "fullscreen")
  srcset(sizes: ["375", "960", "1280", "1920", "2560"])
  alt: altText
  focalPoint
}
`

/** Single entry by URI. Variable $uri is [String] (path segments). */
const ENTRY_BY_URI_QUERY = `
query EntryByUri($uri: [String]) {
  entry(uri: $uri) {
    id
    title
    uri
    image {
       ...Image
     }
    ... on EntryInterface {
      sectionHandle
      type
      summary
      image {
        ...Image
      }
    }
       ... on endowment_endowments_Entry {
      heroImage {
        ... on heroImage_heroImage_BlockType {
          image { ...Image }
          summary
        }
      }
    }
    ... on article_article_Entry {
      heroImage {
        ... on heroImage_heroImage_BlockType {
          image { ...Image }
          summary
        }
      }
    }
    ... on impactReport_impactReport_Entry {
      keyArt {
        ... on keyArt_keyArt_BlockType {
          image { ...Image }
          summary
        }
      }
    }
    ... on dcpHomepage_dcpHomepage_Entry {
      children(limit: 3) {
        ... on dcpCollection_dcpCollection_Entry {
          title
          image { ...Image }
          summary
        }
      }
    }
  }
}
fragment Image on AssetInterface {
  id
  src: url(transform: "fullscreen")
  height(transform: "fullscreen")
  width(transform: "fullscreen")
  srcset(sizes: ["375", "960", "1280", "1920", "2560"])
  alt: altText
  focalPoint
}
`

async function runQuery(query: string, variables: Record<string, unknown>) {
  apiPending.value = true
  apiResult.value = null
  try {
    const data = await $fetch<{ data?: unknown; errors?: unknown[] }>(CRAFT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { query, variables },

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

function listPages() {
  runQuery(LIST_PAGES_QUERY, { limit: 1000 })
}

function fetchEntryByUri() {
  const uri = parseUri(uriInput.value)
  runQuery(ENTRY_BY_URI_QUERY, { uri })
}
</script>
