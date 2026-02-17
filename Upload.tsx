import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DragDropZone from '../components/upload/DragDropZone'
import TiltCard from '../components/3d/TiltCard'
import AnalysisLoader from '../components/upload/AnalysisLoader'
import { analyzeImage } from '../lib/api'
import GlassmorphCard from '../components/3d/GlassmorphCard'

interface Step {
  id: string
  title: string
  status: 'pending' | 'processing' | 'complete'
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', title: 'Face Detection', status: 'pending' },
    { id: '2', title: 'Morphing Analysis', status: 'pending' },
    { id: '3', title: 'Deepfake Detection', status: 'pending' },
    { id: '4', title: 'Identity Verification', status: 'pending' },
    { id: '5', title: 'Finalizing Results', status: 'pending' },
  ])
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const handleAnalyze = async () => {
    if (!file) return
    setLoading(true)
    
    // Simulate step-by-step analysis
    const stepDelay = 600
    for (let i = 0; i < steps.length; i++) {
      setSteps(prev => prev.map((s, idx) => 
        idx === i ? { ...s, status: 'processing' } : s
      ))
      setProgress(((i + 1) / steps.length) * 100)
      await new Promise(resolve => setTimeout(resolve, stepDelay))
      setSteps(prev => prev.map((s, idx) => 
        idx === i ? { ...s, status: 'complete' } : s
      ))
    }

    // Call actual API
    try {
      const result = await analyzeImage(file)
      console.log('Analysis result:', result)
      
      // Navigate to results
      setTimeout(() => {
        navigate('/results/123', { 
          state: { 
            result: result,
            imageUrl: URL.createObjectURL(file)
          } 
        })
      }, 500)
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('Analysis failed. Please check if backend is running.')
      setLoading(false)
      setSteps(prev => prev.map(s => ({ ...s, status: 'pending' })))
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-black-bg p-8 relative overflow-hidden">
      {loading && <AnalysisLoader steps={steps} progress={progress} />}
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text text-center">Upload Image for Analysis</h1>
        
        {!file ? (
          <DragDropZone onFileSelect={setFile} />
        ) : (
          <div className="space-y-6">
            <TiltCard>
              <GlassmorphCard hover={false}>
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="preview" 
                  className="w-full h-96 object-cover rounded-2xl" 
                />
              </GlassmorphCard>
            </TiltCard>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setFile(null)}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
              >
                Remove Image
              </button>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 rounded-xl text-white font-bold shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}