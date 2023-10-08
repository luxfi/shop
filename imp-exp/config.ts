import doit from './processor'

export default {
      // Paths are relative
  toImport: './data/sanity-products-export-pretty.json',
  imported:   './data/luxProducts-imported.json',
  processor: doit 
}