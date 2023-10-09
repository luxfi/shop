interface LuxVariant {
  descHtml: string
  SKUSuffix: string    // 1G
  SKUFull: string      // used if present, overriding the <baseSKU>-<SKUSuffix> convention 
  titleSuffix: string  // 1g
  titleFull: string    // used if present, overriding the <baseTitle>-<titleSuffix> convention 
  tags: string[]       // tags that recur in variants are merged into base product, so only unique tags are left (not a big deal either way)
  price: number
}

interface LuxProduct {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'LuxProduct'
  _updatedAt: string
  
  baseSKU: string     // LUX-AG-BR
  baseTitle: string   // Gold Bullion Minted Bar
  tags: string[]

  variants: LuxVariant[] // sorted by SKUSuffix (or SKUFull is last if present).  Metric first, by value and unit, then Imperial.
}

export {
  type LuxProduct as default,
  type LuxVariant
}