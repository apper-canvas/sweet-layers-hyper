import categoriesData from '@/services/mockData/categories.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getCategories = async () => {
  await delay(200)
  return [...categoriesData]
}

export const getCategoryBySlug = async (slug) => {
  await delay(150)
  const category = categoriesData.find(c => c.slug === slug)
  if (!category) {
    throw new Error('Category not found')
  }
  return { ...category }
}

export const createCategory = async (categoryData) => {
  await delay(300)
  const newCategory = {
    ...categoryData,
    Id: Math.max(...categoriesData.map(c => c.Id || 0)) + 1
  }
  categoriesData.push(newCategory)
  return { ...newCategory }
}

export const updateCategory = async (slug, categoryData) => {
  await delay(250)
  const index = categoriesData.findIndex(c => c.slug === slug)
  if (index === -1) {
    throw new Error('Category not found')
  }
  categoriesData[index] = { ...categoriesData[index], ...categoryData }
  return { ...categoriesData[index] }
}

export const deleteCategory = async (slug) => {
  await delay(200)
  const index = categoriesData.findIndex(c => c.slug === slug)
  if (index === -1) {
    throw new Error('Category not found')
  }
  const deletedCategory = categoriesData.splice(index, 1)[0]
  return { ...deletedCategory }
}