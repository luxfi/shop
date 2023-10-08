
const processProducts = (inp: any[]): any => {

  const result = inp.map((el) => (
    el['store.title']
  ))
  return result
}

export default processProducts