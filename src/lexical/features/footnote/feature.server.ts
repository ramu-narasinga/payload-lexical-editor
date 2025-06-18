import { createServerFeature } from "@payloadcms/richtext-lexical";


export const FootnoteFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexical/features/footnote/feature.client',
  },
  key: 'footnote',
})