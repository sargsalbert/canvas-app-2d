import { useCanvas } from "../../context/CanvasContext"
import { ResourceType } from "../../types"
import { SAMPLE_RESOURCES } from "../../utils/resources"

interface ResourceGalleryProps {
  selectedResource: ResourceType
  onClose: () => void
}

export default function ResourceGallery({ 
  selectedResource, 
  onClose 
}: ResourceGalleryProps) {
  const { addObject } = useCanvas()

  const handleResourceSelect = (resource: string, isSvg: boolean) => {
    addObject(resource, isSvg);
    onClose();
  };

  return (
    <div className="mt-2 p-3 bg-slate-50">
      <div className="grid grid-cols-3 gap-2">
        {selectedResource === "image"
          ? SAMPLE_RESOURCES.image.map((url, index) => (
              <button
                key={`resource-${index}`}
                className="p-1 hover:bg-slate-100 h-16 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => handleResourceSelect(url, false)}
              >
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Resource ${index}`}
                  className="max-w-full max-h-full object-contain"
                />
              </button>
            ))
          : SAMPLE_RESOURCES.svg.map((svgString, index) => (
              <button
                key={`resource-${index}`}
                className="p-1 hover:bg-slate-100 h-16 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => handleResourceSelect(svgString, true)}
              >
                <div dangerouslySetInnerHTML={{ __html: svgString }} />
              </button>
            ))}
      </div>
    </div>
  )
}

