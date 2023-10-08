interface LuxVariant {
  descriptionHtml: string
  shopifyId: string
  slugSuffix: string
  variantTitle: string
  price: number
}

interface LuxProduct {
  _createAt: string
  _id: string
  _rev: string
  _type: 'LuxProduct'
  _updateAt: string
  
  baseSlug: string
  baseTitle: string
  tags: string[]

  variants: LuxVariant[]
}

export {
  type LuxProduct as default,
  type LuxVariant
}