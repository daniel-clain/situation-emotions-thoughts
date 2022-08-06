
export const is = val => ({
  if: condition => condition ? val : ''
})


export const randomNumber = ({from,to}) => {
  return Math.round(Math.random()*(to-from))
}

export function numberLoop(amount, func: (number: number) => void): any[] {
  let returnVal: any[] = []
  for(let number = 1; number <= amount; number++){
    returnVal.push(func(number))
  }
  return returnVal
}


export function twoDec(num: number){
  return (Math.round((num) * 100) / 100)
}

let bounceObj: {
  id
  timeout,
  reject
}[] = []
export function debounce(functionId: string): Promise<void>{
  return new Promise((resolve, reject) => {
    const existing = bounceObj.find(b => b.id == functionId)

    if(existing){
      clearTimeout(existing.timeout)
      existing.reject()
      bounceObj = bounceObj.filter(b => b.id != functionId)
    } 


    bounceObj.push({
      id: functionId,
      timeout: setTimeout(() => {
        resolve()
        bounceObj = bounceObj.filter(b => b.id != functionId)
      }, 500),
      reject
    })

  });
}