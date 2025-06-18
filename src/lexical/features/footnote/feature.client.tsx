// Inspired by https://github.com/payloadcms/payload/blob/59f536c2c97acc058e56b4293fc4f8b0b8f7eb4c/packages/richtext-lexical/src/features/format/underline/feature.client.tsx
'use client'

import { $isTableSelection } from '@lexical/table'
import { $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'

import { FootnoteIcon } from '../../ui/icons/Footnote'
import { createClientFeature, toolbarFormatGroupWithItems } from '@payloadcms/richtext-lexical/client'
import { ToolbarGroup } from '@payloadcms/richtext-lexical'

const toolbarGroups: ToolbarGroup[] = [
  toolbarFormatGroupWithItems([
    {
      ChildComponent: FootnoteIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
          return selection.hasFormat('highlight')
        }
        return false
      },
      key: 'footnote',
      onSelect: ({ editor }) => {
        console.log("dispatching highlight command")
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')
      },
      order: 5,
    },
  ]),
]

// Inspired by https://github.com/Adoosko/multi-ecom/blob/95c70f7f50710c0f26109ad0f93173f2836dd501/src/features/fontColor/feature.client.ts
export default createClientFeature({
  enableFormats: ['highlight'],
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
})