import cakesData from '@/services/mockData/cakes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fallback placeholder images for when external images fail
const FALLBACK_IMAGES = [
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNTAgMjUwSDE1MFYzNTBIMzUwVjI1MFoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTMwMCAzMDBIMjAwVjMwMFoiIGZpbGw9IiNEMUQ1REIiLz4KPHRleHQgeD0iNDAwIiB5PSIzMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2FrZSBJbWFnZTwvdGV4dD4KPC9zdmc+',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRkVGQUY3Ii8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iMTAwIiBmaWxsPSIjRDQ2NjdBIiBvcGFjaXR5PSIwLjIiLz4KPHRleHQgeD0iNDAwIiB5PSIzMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZCNEM1QSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U3dlZXQgTGF5ZXJzPC90ZXh0Pgo8L3N2Zz4='
]
// Get a fallback image based on cake ID for consistency
const getFallbackImage = (cakeId, alt = 'Cake') => {
  const index = cakeId ? Math.abs(cakeId.toString().charCodeAt(0)) % FALLBACK_IMAGES.length : 0
  return FALLBACK_IMAGES[index] || `https://via.placeholder.com/400x300/D4667A/FFFFFF?text=${encodeURIComponent(alt)}`
}

// Validate image URL
export const validateImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  
  try {
    new URL(url)
    return true
  } catch {
    return /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(url)
  }
}

// Load image with proper error handling
export const loadImageWithState = (src, alt = 'Image') => {
  return new Promise((resolve, reject) => {
    if (!validateImageUrl(src)) {
      reject(new Error(`Invalid image URL: ${src}`))
      return
    }
    
    const img = new Image()
    const timeoutId = setTimeout(() => {
      reject(new Error(`Image load timeout: ${src}`))
    }, 10000) // 10 second timeout
    
    img.onload = () => {
      clearTimeout(timeoutId)
      resolve(src)
    }
    
    img.onerror = () => {
      clearTimeout(timeoutId)
      reject(new Error(`Failed to load image: ${src}`))
    }
    
    img.src = src
  })
}

// Preload image with fallback
export const preloadImage = async (src, cakeId = null, alt = 'Cake') => {
  try {
    await loadImageWithState(src, alt)
    return src
  } catch (error) {
    console.warn('Image preload failed, using fallback:', error.message)
    return getFallbackImage(cakeId, alt)
  }
}

// Validate cake images and provide fallbacks
export const validateCakeImages = (cake) => {
  if (!cake || !cake.images || !Array.isArray(cake.images)) {
    return {
      ...cake,
      images: [getFallbackImage(cake?.Id, cake?.name)]
    }
  }
  
  // Validate each image and provide fallbacks for invalid ones
  const validatedImages = cake.images.map((image, index) => {
    if (validateImageUrl(image)) {
      return image
    }
    return getFallbackImage(cake.Id, `${cake.name} ${index + 1}`)
  })
  
  return {
    ...cake,
    images: validatedImages
  }
}

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

// Image validation and preloading utilities
export const validateImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i
  
  try {
    new URL(url)
    return true
  } catch {
    return imageExtensions.test(url)
  }
}

export const preloadImage = (url, retries = 3, cakeId = null) => {
  return new Promise((resolve, reject) => {
    if (!validateImageUrl(url)) {
      console.warn(`Invalid image URL: ${url}, using fallback`)
      resolve(getFallbackImage(cakeId))
      return
    }
    
    const attemptLoad = (attemptNumber) => {
      const img = new Image()
      
      const timeout = setTimeout(() => {
        img.src = '' // Cancel the request
        if (attemptNumber < retries) {
          const backoffDelay = Math.pow(2, attemptNumber) * 1000 // Exponential backoff
          console.log(`Image load timeout (attempt ${attemptNumber}/${retries}), retrying in ${backoffDelay}ms: ${url}`)
          setTimeout(() => attemptLoad(attemptNumber + 1), backoffDelay)
        } else {
          console.warn(`Image failed to load after ${retries} attempts: ${url}, using fallback`)
          resolve(getFallbackImage(cakeId))
        }
      }, 5000) // 5 second timeout per attempt
      
      img.onload = () => {
        clearTimeout(timeout)
        resolve(url)
      }
      
      img.onerror = () => {
        clearTimeout(timeout)
        if (attemptNumber < retries) {
          const backoffDelay = Math.pow(2, attemptNumber) * 1000
          console.log(`Image load error (attempt ${attemptNumber}/${retries}), retrying in ${backoffDelay}ms: ${url}`)
          setTimeout(() => attemptLoad(attemptNumber + 1), backoffDelay)
        } else {
          console.warn(`Image failed to load after ${retries} attempts: ${url}, using fallback`)
          resolve(getFallbackImage(cakeId))
        }
      }
      
      img.src = url
    }
    
    attemptLoad(1)
  })
}

export const validateCakeImages = async (cake) => {
  const validatedCake = { ...cake }
  
  if (cake.images && Array.isArray(cake.images)) {
    const imageValidationPromises = cake.images.map(async (imageUrl, index) => {
      try {
        const validatedUrl = await preloadImage(imageUrl, 3, cake.id)
        return validatedUrl
      } catch (error) {
        console.warn(`Image validation failed for cake ${cake.id} image ${index}: ${imageUrl}`, error)
        return getFallbackImage(cake.id) // Always return a fallback
      }
    })
    
    const validatedImages = await Promise.all(imageValidationPromises)
    validatedCake.images = validatedImages // No filtering needed as we always return valid images
    
    // Ensure cake has at least one image
    if (!validatedCake.images || validatedCake.images.length === 0) {
      validatedCake.images = [getFallbackImage(cake.id)]
    }
  } else {
    // If no images provided, add a fallback
    validatedCake.images = [getFallbackImage(cake.id)]
  }
  
  return validatedCake
}

// Enhanced image loading with loading states
export const loadImageWithState = (url, onLoadingStateChange) => {
  return new Promise((resolve, reject) => {
    onLoadingStateChange?.('loading')
    
    preloadImage(url)
      .then((validatedUrl) => {
        onLoadingStateChange?.('success')
        resolve(validatedUrl)
      })
      .catch((error) => {
        onLoadingStateChange?.('error')
        reject(error)
      })
  })
}