import { writeJsonFile } from 'write-json-file'
import path from 'path'

import conf from './config'

console.log("Script: Reading input file...")

import(conf.toImport)
  .then((data) => {

    const products = data.default

    console.log("RECORDS: " + products.length)

    console.log("Script: ....processing....")
    const result = conf.processor(products) 

    const absOutputPath = path.join(__dirname, conf.imported); // need semi

    
    (async () => {
        // writes array under 'stocks'
      await writeJsonFile(absOutputPath, result)
      console.log(`Script: Output file generated at '${absOutputPath}'. \nBye`)
    })()
  })