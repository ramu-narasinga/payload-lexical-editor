import { createServerFeature } from "@payloadcms/richtext-lexical";


export const MarkFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexical/features/mark/feature.client',
  },
  key: 'mark',
})