import { useState } from "react"
import { useCanvas } from "../../context/CanvasContext"
import ResourceGallery from "./ResourceGallery"
import { ResourceType } from "../../types"

interface ControlPanelProps {
  selectedResource: ResourceType
}

export default function ControlPanel({ selectedResource }: ControlPanelProps) {
  const [showResourceMenu, setShowResourceMenu] = useState(false)
  const { addShape, clearCanvas, deleteSelected } = useCanvas()

  return (
    <div className="flex flex-col space-y-2 w-full md:w-auto">
      <h2 className="text-lg font-medium text-sm">Controls</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className="text-sm px-3 py-1.5 bg-sky-500 text-white rounded-md hover:bg-sky-500/90 cursor-pointer"
          onClick={() => setShowResourceMenu(!showResourceMenu)}
        >
          Add Resource
        </button>
        <button 
          className="text-sm px-3 py-1.5 font-semibold border-1 border-teal-400 text-teal-500 hover:bg-teal-50 rounded-md cursor-pointer" 
          onClick={() => addShape("rect")}
        >
          Add Rectangle
        </button>
        <button 
          className="text-sm px-3 py-1.5 font-semibold border-1 border-teal-400 text-teal-500 hover:bg-teal-50 rounded-md cursor-pointer" 
          onClick={() => addShape("circle")}
        >
          Add Circle
        </button>
        <button 
          className="text-sm px-3 py-1.5 font-semibold border-1 border-teal-400 text-teal-500 hover:bg-teal-50 rounded-md cursor-pointer" 
          onClick={() => addShape("triangle")}
        >
          Add Triangle
        </button>
        <button
          className="text-sm px-3 py-1.5 font-semibold border-1 text-rose-200 text-rose-300 rounded-md hover:bg-rose-50 rounded-md cursor-pointer"
          onClick={deleteSelected}
        >
          Delete Selected
        </button>
        <button
          className="text-sm px-3 py-1.5 font-semibold border-1 text-rose-200 text-rose-300 rounded-md hover:bg-rose-50 rounded-md cursor-pointer"
          onClick={clearCanvas}
        >
          Clear All
        </button>
      </div>
      <ResourceGallery
        selectedResource={selectedResource}
        onClose={() => setShowResourceMenu(false)}
      />
    </div>
  )
}

