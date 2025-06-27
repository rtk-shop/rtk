import { useFieldArray } from 'react-hook-form'
import { ProductPhotoDropzone } from '../dropzone'
import { Button } from '@/components/ui/shadcn/button'
import { ImagePlus, X } from 'lucide-react'

type FormImageItem = {
  image: File | undefined // dynamic inputs accepts undefined File
  order: number
}

export function Images() {
  const { fields, append, remove, swap, move, insert } = useFieldArray<{
    images: FormImageItem[]
  }>({
    name: 'images'
  })

  console.log(fields)

  return (
    <div>
      <h2>Images</h2>
      <div className="flex flex-wrap">
        {fields.map((field, index) => (
          <div key={field.id} className="mr-8 w-full max-w-[150px]">
            <ProductPhotoDropzone name={`images.${index}.image`} />
            {index >= 2 && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => remove(index)}
                className="rounded-full"
              >
                <X />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            append({
              image: undefined,
              order: fields.length + 1
            })
          }
        >
          <ImagePlus className="" /> Добавить
        </Button>
      </div>
    </div>
  )
}
