import { createContext, useContext, useRef, useState, useCallback, ReactNode, useEffect } from "react"
import * as fabric from "fabric"
import { getRandomColor } from "../utils/helpers"

interface CanvasContextType {
  fabricCanvas: fabric.Canvas | null
  initCanvas: (canvasElement: HTMLCanvasElement) => void
  addShape: (type: string) => void
  clearCanvas: () => void
  deleteSelected: () => void
  addObject: (resource: string, isSvgString?: boolean) => void
  objectCount: number
  isLoading: boolean
  error: string | null
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

export function CanvasProvider({ children }: { children: ReactNode }) {
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const [objectCount, setObjectCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initCanvas = useCallback((canvasElement: HTMLCanvasElement) => {
    if (canvasElement && !fabricCanvasRef.current) {
      try {
        fabricCanvasRef.current = new fabric.Canvas(canvasElement, {
          width: 800,
          height: 600,
          backgroundColor: "#f0f0f0",
          selection: true,
          renderOnAddRemove: false,
        })
        setupEventHandlers();
        setObjectCount(0);
      } catch (err) {
        console.error("Error initializing canvas:", err)
        setError("Failed to initialize canvas");
      }
    }
  }, [])
  
  const setupEventHandlers = useCallback(() => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    
    canvas.on("mouse:over", (e) => {
      if (e.target) {
        e.target.set("opacity", 0.8)
        canvas.requestRenderAll()
      }
    })

    canvas.on("mouse:out", (e) => {
      if (e.target) {
        e.target.set("opacity", 1)
        canvas.requestRenderAll()
      }
    })

    canvas.on("object:modified", () => {
      setObjectCount(canvas.getObjects().length)
    })
    
    canvas.on("object:added", () => {
      setObjectCount(canvas.getObjects().length)
    })
    
    canvas.on("object:removed", () => {
      setObjectCount(canvas.getObjects().length)
    })
  }, []);

  useEffect(() => {
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  const addShape = useCallback((type: string) => {
    if (!fabricCanvasRef.current) return

    let shape: fabric.Object;
    const canvas = fabricCanvasRef.current;
    const canvasWidth = canvas.width || 800;
    const canvasHeight = canvas.height || 600;

    switch (type) {
      case "rect":
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: getRandomColor(),
          left: Math.random() * (canvasWidth - 100),
          top: Math.random() * (canvasHeight - 100),
        })
        break
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: getRandomColor(),
          left: Math.random() * (canvasWidth - 100),
          top: Math.random() * (canvasHeight - 100),
        })
        break
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: getRandomColor(),
          left: Math.random() * (canvasWidth - 100),
          top: Math.random() * (canvasHeight - 100),
        })
        break
      default:
        return
    }

    canvas.add(shape)
    canvas.setActiveObject(shape)
    canvas.requestRenderAll()
  }, [])

  const clearCanvas = useCallback(() => {
    if (!fabricCanvasRef.current) return

    fabricCanvasRef.current.clear()
    fabricCanvasRef.current.backgroundColor = "#f0f0f0"
    fabricCanvasRef.current.requestRenderAll()
  }, [])

  const deleteSelected = useCallback(() => {
    if (!fabricCanvasRef.current) return

    const activeObjects = fabricCanvasRef.current.getActiveObjects()

    if (activeObjects.length) {
      fabricCanvasRef.current.discardActiveObject()
      fabricCanvasRef.current.remove(...activeObjects)
      fabricCanvasRef.current.requestRenderAll()
    }
  }, [])

  const addObject = useCallback(
    (resource: string, isSvgString = false) => {
      if (!fabricCanvasRef.current) {
        console.error("Canvas not initialized")
        setError("Canvas not initialized")
        return
      }

      setIsLoading(true)
      setError(null)

      const safetyTimeout = setTimeout(() => {
        setIsLoading(false)
        setError("Loading timed out")
      }, 10000)
      
      const canvas = fabricCanvasRef.current;
      const canvasWidth = canvas.width || 800;
      const canvasHeight = canvas.height || 600;

      try {
        if (!isSvgString) {
          const imgEl = new Image()
          imgEl.crossOrigin = "anonymous"

          imgEl.onload = () => {
            const fabricImg = new fabric.Image(imgEl, {
              left: Math.random() * (canvasWidth - 100),
              top: Math.random() * (canvasHeight - 100),
              cornerSize: 8,
              transparentCorners: false,
            })

            const scale = Math.min(200 / imgEl.width, 200 / imgEl.height)
            fabricImg.scale(scale)

            canvas.add(fabricImg)
            canvas.setActiveObject(fabricImg)
            canvas.requestRenderAll()

            clearTimeout(safetyTimeout)
            setIsLoading(false)
          }

          imgEl.onerror = () => {
            setError("Failed to load image")
            clearTimeout(safetyTimeout)
            setIsLoading(false)
          }

          imgEl.src = resource
        } else {
          const parser = new DOMParser()
          const svgDoc = parser.parseFromString(resource, "image/svg+xml")
          const svgElement = svgDoc.documentElement

          const width = parseInt(svgElement.getAttribute("width") || "100", 10)
          const height = parseInt(svgElement.getAttribute("height") || "100", 10)

          const svgBlob = new Blob([resource], { type: "image/svg+xml" })
          const url = URL.createObjectURL(svgBlob)

          const imgEl = new Image()
          imgEl.crossOrigin = "anonymous"

          imgEl.onload = () => {
            const fabricImg = new fabric.Image(imgEl, {
              left: Math.random() * (canvasWidth - 100),
              top: Math.random() * (canvasHeight - 100),
              cornerSize: 8,
              transparentCorners: false,
            })

            const scale = Math.min(200 / width, 200 / height)
            fabricImg.scale(scale)

            canvas.add(fabricImg)
            canvas.setActiveObject(fabricImg)
            canvas.requestRenderAll()

            URL.revokeObjectURL(url)
            clearTimeout(safetyTimeout)
            setIsLoading(false)
          }

          imgEl.onerror = () => {
            setError("Failed to load SVG")
            URL.revokeObjectURL(url)
            clearTimeout(safetyTimeout)
            setIsLoading(false)
          }

          imgEl.src = url
        }
      } catch (error) {
        console.error("Error loading resource:", error)
        setError("Error loading resource")
        clearTimeout(safetyTimeout)
        setIsLoading(false)
      }
    },
    []
  )

  const value = {
    fabricCanvas: fabricCanvasRef.current,
    initCanvas,
    addShape,
    clearCanvas,
    deleteSelected,
    addObject,
    objectCount,
    isLoading,
    error
  }

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
}

export function useCanvas() {
  const context = useContext(CanvasContext)
  if (context === undefined) {
    throw new Error("useCanvas must be used within a canvas provider")
  }
  return context
}