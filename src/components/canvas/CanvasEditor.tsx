import { useState } from "react"
import { CanvasProvider } from "../../context/CanvasContext"
import Canvas from "./Canvas"
import Toolbar from "../toolbar/Toolbar"
import { ResourceType } from "../../types"

export default function CanvasEditor() {
  const [selectedResource, setSelectedResource] = useState<ResourceType>("image")
  
  return (
    <CanvasProvider>
      <div className="flex flex-col space-y-4">
        <Toolbar 
          selectedResource={selectedResource}
          setSelectedResource={setSelectedResource}
        />
        <Canvas selectedResource={selectedResource} />
      </div>
    </CanvasProvider>
  )
}