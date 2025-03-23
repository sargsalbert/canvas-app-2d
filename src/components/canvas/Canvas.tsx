import { useRef, useEffect } from "react"
import { ResourceType } from "../../types"
import { useCanvas } from "../../context/CanvasContext"
import PerformanceMonitor from "./PerformanceMonitor"

interface CanvasProps {
  selectedResource: ResourceType
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Canvas({ selectedResource }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { 
    initCanvas, 
    objectCount, 
    isLoading, 
    error 
  } = useCanvas()

  useEffect(() => {
    if (canvasRef.current) {
      initCanvas(canvasRef.current)
    }
  }, [initCanvas])

  return (
    <div className="relative flex justify-center mt-6">
      <canvas ref={canvasRef} className="rounded-lg shadow-md" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-500"></div>
        </div>
      )}

      {error && (
        <div className="absolute top-2 left-2 bg-rose-300 px-2 py-1 rounded text-xs">
          Error: {error}
        </div>
      )}

      <PerformanceMonitor objectCount={objectCount} />
    </div>
  )
}