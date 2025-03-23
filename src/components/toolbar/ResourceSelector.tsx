import { ResourceType } from "../../types"

interface ResourceSelectorProps {
  selectedResource: ResourceType
  setSelectedResource: (type: ResourceType) => void
}

export default function ResourceSelector({ 
  selectedResource, 
  setSelectedResource 
}: ResourceSelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-medium text-sm">Resource Type</h2>
      <div className="flex space-x-2">
        <button
          className={`text-sm px-4 py-2 text-white rounded-md cursor-pointer ${
            selectedResource === "image" ? "bg-gray-500 hover:bg-gray-500/80" : "bg-gray-300"
          }`}
          onClick={() => setSelectedResource("image")}
        >
          Images
        </button>
        <button
          className={`text-sm px-4 py-2 text-white rounded-md cursor-pointer ${
            selectedResource === "svg" ? "bg-gray-500 hover:bg-gray-500/80bg-gray-200" : "bg-gray-300"
          }`}
          onClick={() => setSelectedResource("svg")}
        >
          SVGs
        </button>
      </div>
    </div>
  )
}