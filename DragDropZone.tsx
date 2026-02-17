import React from 'react'
import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon } from 'lucide-react'
import GlassmorphCard from '../3d/GlassmorphCard'

interface Props {
  onFileSelect: (file: File) => void
}

export default function DragDropZone({ onFileSelect }: Props) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  return (
    <GlassmorphCard hover={false}>
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative p-12 text-center cursor-pointer
          transition-all duration-300
          ${isDragging ? 'bg-primary/20 scale-105' : 'hover:bg-white/5'}
        `}
        whileHover={{ scale: 1.01 }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <motion.div
          animate={isDragging ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
          className="mb-6 inline-block"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isDragging ? (
                <motion.div key="upload" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Upload className="w-12 h-12 text-white" />
                </motion.div>
              ) : (
                <motion.div key="image" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <ImageIcon className="w-12 h-12 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-2">
          {isDragging ? 'Drop it here!' : 'Drop image or click to upload'}
        </h3>
        <p className="text-gray-400">JPG, PNG, WEBP • Max 10MB</p>
      </motion.div>
    </GlassmorphCard>
  )
}
