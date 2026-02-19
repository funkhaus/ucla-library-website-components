<template>
  <div
    class="container"
    style="padding: 1rem;"
  >
    <div class="sticky-container">
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
          {{ apiPending ? 'Get entry by URI' : 'Get entry by URI' }}
        </button>
      </div>

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

const STATIC_PAGE_QUERY = `
query MyQuery {
  entry(section: "dcpGeneralContentPage", uri: ["dcp/about"]) {
    title
    summary
    blocks: allFpb {
        id
        typeHandle
        ... on allFpb_associatedTopicCards_BlockType {
            ...BlockAssociatedTopicCardsFragment
        }
        ... on allFpb_bannerFeatured_BlockType {
            ...BlockBannerFeaturedFragment
        }
        ... on allFpb_cardWithImage_BlockType {
            ...BlockCardWithImageFragment
        }
        ... on allFpb_highlight_BlockType {
            ...BlockHighlightFragment
        }
        ... on allFpb_impactNumbersCarousel_BlockType {
            ...BlockImpactNumbersCarouselFragment
        }
        ... on allFpb_mediaGallery_BlockType {
            ...BlockMediaGalleryFragment
        }
        ... on allFpb_mediaWithText_BlockType {
            ...BlockMediaWithTextFragment
        }
        ... on allFpb_pullQuote_BlockType {
            ...BlockPullQuoteFragment
        }
        ... on allFpb_richText_BlockType {
            ...BlockRichTextFragment
        }
        ...on allFpb_simpleCards_BlockType {
            ...BlockSimpleCardsFragment
        }
        ... on allFpb_callToAction_BlockType {
            ...BlockCallToActionFragment
        }
        ... on allFpb_form_BlockType {
            ...BlockFormFragment
        }
        ... on allFpb_impactNumberCards_BlockType {
            ...BlockImpactNumberCardsFragment
        }
    }
    image {
      ...Image
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
fragment BlockAssociatedTopicCardsFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    associatedTopicsFlexiblePageBlock {
        ... on associatedTopicsFlexiblePageBlock_associatedTopics_BlockType {
            id
            topics {
                title
                typeHandle
                externalResourceUrl
                uri
                text: summary
                uri
                iconName: illustrationsResourcesAndServices
            }
        }
    }
}
fragment BlockBannerFeaturedFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    content: bannerFeatured {
        ... on bannerFeatured_internalContent_BlockType {
            id
            contentLink {
                contentType: sectionHandle
                title
                to: uri
                summary
                physicalDigital
                workshopOrEventSeriesType
                eventType {
                    title
                }
                eventDescription
                projectCategory: format
                articleCategory: articleCategories {
                    title
                }
                projectByline1: meapProjectTopic {
                    ... on meapProjectTopics_Category {
                        id
                        title
                    }
                }
                startDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                startDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                articleByline1: staffMember {
                    id
                    slug
                    uri
                    url
                    title
                }
                articleByline2: postDate
                articleLocations: associatedLocations {
                    id
                    title
                    to: uri
                    uri
                }
                projectLocations: region {
                    ... on meapProjectRegion_Category {
                        id
                        title
                    }
                }
                heroImage {
                    ... on heroImage_heroImage_BlockType {
                        image {
                            ...Image
                        }
                    }
                }
            }
        }
        ... on bannerFeatured_externalContent_BlockType {
            id
            image {
                ...Image
            }
            title: titleGeneral
            summary
            alignment
            byline1
            byline2
            to: buttonUrl
            category
            contentType
        }
    }
}
fragment BlockCardWithImageFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    cardWithImage {
        id
        ... on cardWithImage_internalContent_BlockType {
            id
            typeHandle
            contentLink {
                id
                contentType: sectionHandle
                to: uri
                title
                text: summary
                eventDescription
                projectCategory: format
                articleCategory: articleCategories {
                    title
                }
                projectByline1: meapProjectTopic {
                    ... on meapProjectTopics_Category {
                        id
                        title
                    }
                }
                articleByline1: staffMember {
                    id
                    to: uri
                    title
                }
                articleByline2: postDate
                ongoing
                startDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                startDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                eventType {
                    ... on eventType_Category {
                        id
                        title
                    }
                }
                associatedLocations {
                    id
                    title
                    to: uri
                    uri
                }
                projectLocations: region {
                    ... on meapProjectRegion_Category {
                        id
                        title
                    }
                }
                heroImage {
                    ... on heroImage_heroImage_BlockType {
                        id
                        image {
                            ...Image
                        }
                        altText
                    }
                }
            }
        }
        ... on cardWithImage_externalContent_BlockType {
            id
            typeHandle
            title: titleGeneral
            image {
                ...Image
            }
            byline1
            byline2
            category
            text: summary
            to: externalLink
        }
    }
}
fragment BlockHighlightFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    highlight {
        ... on highlight_internalContent_BlockType {
            id
            typeHandle
            contentLink {
                id
                contentType: sectionHandle
                to: uri
                title
                text: summary
                eventDescription
                projectCategory: format
                articleCategory: articleCategories {
                    title
                }
                projectByline1: meapProjectTopic {
                    ... on meapProjectTopics_Category {
                        id
                        title
                    }
                }
                articleByline1: staffMember {
                    id
                    to: uri
                    title
                }
                articleByline2: postDate
                ongoing
                startDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDateWithTime
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                startDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                endDate
                    @formatDateTime(
                        timezone: "America/Los_Angeles"
                    )
                eventType {
                    ... on eventType_Category {
                        id
                        title
                    }
                }
                associatedLocations {
                    id
                    title
                    to: uri
                    uri
                }
                projectLocations: region {
                    ... on meapProjectRegion_Category {
                        id
                        title
                    }
                }
                heroImage {
                    ... on heroImage_heroImage_BlockType {
                        id
                        image {
                            ...Image
                        }
                        altText
                    }
                }
            }
        }
        ... on highlight_externalContent_BlockType {
            id
            typeHandle
            title: titleGeneral
            image {
                ...Image
            }
            byline1
            byline2
            category
            text: summary
            to: externalLink
        }
    }
}
fragment BlockImpactNumbersCarouselFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    blocks: impactNumbersCarousel {
        ... on impactNumbersCarousel_impactNumbersCarousel_BlockType {
            id
            largeText: impactNumber
            mediumText: impactText
            smallDescriptor: summary
            image {
                ...Image
            }
        }
    }
}
fragment BlockMediaGalleryFragment on ElementInterface {
    dataId: id
    sectionTitle: titleGeneral
    sectionSummary: summary
    mediaGallery {
        dataId: id
        captionTitle: captionHeading
        captionText: caption
        altText
        sortOrder
        ... on mediaGallery_image_BlockType {
            item: imageFile {
                ...MediaAsset
            }
        }
        ... on mediaGallery_audio_BlockType {
            item: audioFile {
                ...MediaAsset
            }
            embedCode: audioEmbedCode
            coverImage {
              ...MediaAsset
            }
        }
        ... on mediaGallery_video_BlockType {
            item: videoFile {
                ...MediaAsset
            }
            embedCode: embedCode
            coverImage {
              ...MediaAsset
            }
        }
    }
}
fragment BlockMediaWithTextFragment on ElementInterface {
    dataId : id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    mediaWithText {
        ... on mediaWithText_mediaEmbed_BlockType {
            titleLink: titleEmbed
            description
            coverImage {
                ...MediaAsset
            }
            buttonText
            buttonUrl
            embedCode
            typeMedia
        }
        ... on mediaWithText_mediaUpload_BlockType {
            titleUpload
            description
            buttonText
            buttonUrl
            coverImage {
                ...MediaAsset
            }
            item: upload {
                ...MediaAsset
            }
            typeMedia
        }
    }
}
fragment BlockPullQuoteFragment on ElementInterface {
    id
    typeHandle
    pullQuote {
        ... on pullQuote_pullQuote_BlockType {
            text
            attribution
        }
    }
}
fragment BlockRichTextFragment on ElementInterface {
    richText
    typeHandle
    sectionTitle: titleGeneral
}
fragment BlockSimpleCardsFragment on ElementInterface {
    id
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
    cards: simpleCards {
        ... on simpleCards_internalServiceOrResource_BlockType {
            id
            typeHandle
            contentLink {
                id
                uri
                slug
                title
                summary
                externalResourceUrl
            }
        }
        ... on simpleCards_externalServiceOrResource_BlockType {
            id
            typeHandle
            title: titleGeneral
            summary
            externalLink
        }
    }
}
fragment BlockCallToActionFragment on ElementInterface {
    id
    typeHandle
    callToAction {
        ... on callToAction_callToAction_BlockType {
            id
            titleCta
            summary
            icon
            buttonText
            buttonUrl: buttonLink
            backgroundColor
        }
    }
}
fragment BlockFormFragment on ElementInterface {
    id
    form
    typeHandle
    sectionTitle: titleGeneral
    sectionSummary: summary
}
fragment BlockImpactNumberCardsFragment on ElementInterface {
    id
    typehandle
    sectionSummary: summary
    sectionTitle: titleGeneral
    impactNumberCards {
        ... on impactNumberCards_impactNumberCard_BlockType {
            id
            title: titleGeneral
            text: description
            impactNumber
        }
    }
}
fragment MediaAsset on AssetInterface {
  dataId: id
  src: url(transform: "fullscreen")
  srcset(sizes: ["375", "960", "1280", "1920", "2560"])
  height(transform: "fullscreen")
  width(transform: "fullscreen")
  title
  focalPoint
  kind
  type: mimeType
  alt: altText
}`

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


function fetchEntryByUri() {
  const uri = parseUri(uriInput.value)
  // runQuery(ENTRY_BY_URI_QUERY, { uri })
  runQuery(STATIC_PAGE_QUERY, {})
}
function listPages() {
  runQuery(LIST_PAGES_QUERY, { limit: 1000 })
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .sticky-container {
    position: sticky;
    top: 0;
    z-index: 1000;

    background-color: firebrick;


  }
}
</style>
