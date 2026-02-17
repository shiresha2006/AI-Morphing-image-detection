// frontend/src/lib/api.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function analyzeImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${API_URL}/api/detect`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Analysis failed:', error)
    throw error
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`)
    return await response.json()
  } catch (error) {
    console.error('Health check failed:', error)
    return { status: 'unhealthy' }
  }
}