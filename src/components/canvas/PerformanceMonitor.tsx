import { useState, useRef, useEffect, useCallback } from "react"

interface PerformanceMonitorProps {
  objectCount: number
}

export default function PerformanceMonitor({ objectCount }: PerformanceMonitorProps) {
  const [fps, setFps] = useState(0)
  const requestRef = useRef<number>(0)
  const previousTimeRef = useRef<number>(0)
  const fpsRef = useRef<number>(0)

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      
      fpsRef.current = 1000 / deltaTime
      
      if (time % 30 === 0) {
        setFps(Math.round(fpsRef.current))
      }
    }
    
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }, [])
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])

  return (
    <div className="absolute top-2 right-2 bg-slate-400 text-white px-2 py-1 rounded text-xs">
      FPS: {fps} | Objects: {objectCount}
    </div>
  )
}