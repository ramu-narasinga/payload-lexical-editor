// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { build as buildLogger } from "pino-pretty";

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'  
import { MarkFeature } from './lexical/features/mark/feature.server'
import { FootnoteFeature } from './lexical/features/footnote/server'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  logger: {
    options: {
      level: "debug",
    },
    destination: buildLogger({
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "SYS:HH:MM:ss",
    }),
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts],
  editor: lexicalEditor({
    features: ({defaultFeatures}) => {

      // console.log("defaultFeatures",defaultFeatures)

      const removeFeatures = ["subscript", "superscript"]

      return [
        ...defaultFeatures.filter((feature) => !removeFeatures.includes(feature.key)),
        MarkFeature(),
        FootnoteFeature()
      ]
    }
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
