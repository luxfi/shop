interface LuxVariant {
  descHtml: string
  shopifyId: string
  slugSuffix: string
  slugFull: string
  titleSuffix: string
  titleFull: string
  tags: string[]
  price: number
}

interface LuxProduct {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'LuxProduct'
  _updatedAt: string
  
  baseSlug: string
  baseTitle: string
  tags: string[]

  variants: LuxVariant[]
}

export {
  type LuxProduct as default,
  type LuxVariant
}