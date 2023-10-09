import type { default as LuxProduct, LuxVariant } from './LuxProduct'

const MAT = {
  gold: 'AU',
  silver: 'AG',
  palladium: 'PD',
  platinum: 'PT'
}

const FORM = {
  bar: 'BR',
  multibar: 'BR',
  coin: 'CN'
}

const UNIT = {
  oz: 'Z',
  kg: 'K',
  g: 'G'
}

const AUX = {
  credit: 'CRED',
  validator: 'VAL',
}


const processProducts = (inp: any[]): any => {

  const productMap = new Map<string, LuxProduct>() 

  const sorted = inp.sort((el1, el2): number => {
    if (el1['store.slug.current'] < el2['store.slug.current']) return -1
    if (el1['store.slug.current'] > el2['store.slug.current']) return 1
    return 0
  })


  sorted.forEach((el) => {

    const sepIndex = el['store.slug.current'].lastIndexOf('-')
    const baseSlug = el['store.slug.current'].substring(0, sepIndex)
    const slugSuffix = el['store.slug.current'].substring(sepIndex + 1)

    const deriveBaseSKU = (): string => {
      let res = 'LUX-'
      const tokens = baseSlug.split('-')
      if (Object.keys(MAT).includes(tokens[0])) {
        res += MAT[tokens[0]]
        for (let key of Object.keys(FORM)) {
          if (tokens.includes(key)) {
            res += `-${FORM[key]}`
            break
          }
        }
      }
      else if (Object.keys(AUX).includes(tokens[0])) {
        // TODO
      }
      return res
    } 

    const deriveSKUSuffix = (): string => {
      const tokens = baseSlug.split('-')
      let res = ''
      if (Object.keys(MAT).includes(tokens[0])) {
        res += '-'
        const firstValueCharIndex = slugSuffix.search(/\d/)
        const firstUnitCharIndex = slugSuffix.search(/[o, g, k]/)
        const value = slugSuffix.substring(firstValueCharIndex, firstUnitCharIndex)
        res += value
        const unit = slugSuffix.substring(firstUnitCharIndex)
        res += UNIT[unit] 
      }
      return res
    }

    const createVariant = (): LuxVariant => ({
      descHtml: el['store.descriptionHtml'],
      SKUSuffix: deriveSKUSuffix(),
      SKUFull: '',
      titleSuffix: el['store.title'].substring(el['store.title'].lastIndexOf(' - ')),
      titleFull: '',
      tags: [],
      price: el['store.priceRange.maxVariantPrice']
    })

    const foundProduct = productMap.get(baseSlug)
    if (foundProduct) {
      const newVariant = createVariant()
      foundProduct.variants.push(newVariant)
    }
    else {
      const tags = el['store.tags']
      let tagsValue = []
      if (tags) {
        if (Array.isArray(tags)) {
          tagsValue = tags 
        }
        else {
          tagsValue = [tags]
        }
      }

      const newProduct = {
        _createdAt: el._createAt as string,
        _id: el._id as string,
        _rev: el._rev as string,
        _type: 'LuxProduct' as 'LuxProduct',
        _updatedAt: el._updatedAt as string,
        baseSKU: deriveBaseSKU(),
        baseTitle: el['store.title'].substring(0, el['store.title'].lastIndexOf(' - ')),
        tags: tagsValue,
        variants: [createVariant()]
      }
      productMap.set(baseSlug, newProduct)
    }
  })

  return Array.from(productMap.values())
}

export default processProducts