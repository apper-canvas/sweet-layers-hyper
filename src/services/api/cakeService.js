import cakesData from '@/services/mockData/cakes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getCakes = async () => {
  await delay(300)
  return [...cakesData]
}

export const getCakeById = async (Id) => {
  await delay(200)
  const cake = cakesData.find(c => c.Id === Id)
  if (!cake) {
    throw new Error('Cake not found')
  }
  return { ...cake }
}

export const getCakesByCategory = async (category) => {
  await delay(250)
  return cakesData.filter(cake => 
    cake.category.toLowerCase() === category.toLowerCase()
  ).map(cake => ({ ...cake }))
}

export const searchCakes = async (query) => {
  await delay(300)
  const lowercaseQuery = query.toLowerCase()
  return cakesData.filter(cake =>
    cake.name.toLowerCase().includes(lowercaseQuery) ||
    cake.description.toLowerCase().includes(lowercaseQuery) ||
    cake.flavors.some(flavor => flavor.toLowerCase().includes(lowercaseQuery))
  ).map(cake => ({ ...cake }))
}

export const createCake = async (cakeData) => {
  await delay(400)
  const newCake = {
    ...cakeData,
    Id: Math.max(...cakesData.map(c => c.Id)) + 1
  }
  cakesData.push(newCake)
  return { ...newCake }
}

export const updateCake = async (Id, cakeData) => {
  await delay(350)
  const index = cakesData.findIndex(c => c.Id === Id)
  if (index === -1) {
    throw new Error('Cake not found')
  }
  cakesData[index] = { ...cakesData[index], ...cakeData }
  return { ...cakesData[index] }
}

export const deleteCake = async (Id) => {
  await delay(250)
  const index = cakesData.findIndex(c => c.Id === Id)
  if (index === -1) {
    throw new Error('Cake not found')
  }
  const deletedCake = cakesData.splice(index, 1)[0]
  return { ...deletedCake }
}