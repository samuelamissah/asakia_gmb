import { type SchemaTypeDefinition } from 'sanity'
import gallery from './schemas/gallery'
import press from './schemas/press'
import partner from './schemas/partner'
import event from './schemas/event'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [gallery, press, partner, event],
}