import ResourceSelector from "./ResourceSelector"
import ControlPanel from "./ControlPanel"
import { ResourceType } from "../../types"

interface ToolbarProps {
  selectedResource: ResourceType
  setSelectedResource: (type: ResourceType) => void
}

export default function Toolbar({ 
  selectedResource, 
  setSelectedResource 
}: ToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:gap-4">
      <ResourceSelector 
        selectedResource={selectedResource} 
        setSelectedResource={setSelectedResource} 
      />
      <ControlPanel selectedResource={selectedResource} />
    </div>
  )
}