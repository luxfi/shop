import type { default as LuxProduct, LuxVariant } from './LuxProduct'


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

    const createVariant = (): LuxVariant => ({
      descHtml: el['store.descriptionHtml'],
      shopifyId: el['store.id'],
      slugSuffix,
      slugFull: '',
      titleSuffix: el['store.title'].substring(el['store.title'].lastIndexOf(' - ') + 3),
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
      const newProduct = {
        _createdAt: el._createAt as string,
        _id: el._id as string,
        _rev: el._rev as string,
        _type: 'LuxProduct' as 'LuxProduct',
        _updatedAt: el._updatedAt as string,
        baseSlug,
        baseTitle: el['store.title'].substring(0, el['store.title'].lastIndexOf(' - ')),
        tags: el['store.tags'] ? [el['store.tags']] : [],
        variants: [createVariant()]
      }
      productMap.set(baseSlug, newProduct)
    }
  })

  return Array.from(productMap.values())
}

export default processProducts