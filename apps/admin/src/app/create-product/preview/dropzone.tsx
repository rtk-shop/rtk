import { useState, type MouseEvent } from 'react'
import { cva } from 'cva'
import { useDropzone } from 'react-dropzone'
import { ErrorMessage } from '@repo/ui'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/shadcn/button'
import { TrashIcon } from 'lucide-react'

const MAX_FILE_SIZE_MB = 5

const deleteButton = cva('absolute -top-5 -right-4', {
  variants: {
    show: {
      true: 'animate-in fade-in zoom-in',
      false: 'invisible'
    }
  }
})

function dropzoneCodeToMsg(code: string): string {
  switch (code) {
    case 'file-invalid-type':
      return 'Формат изображения только .jpeg или .png'
    case 'file-too-large':
      return `Размер этого изображения больше ${MAX_FILE_SIZE_MB} Mb`
    default:
      return 'Ошибка обработки изображения'
  }
}

interface UploadedFile extends File {
  preview: string
}

export const dropzoneFeedbackColor = (props: {
  isError: boolean
  isDragAccept: boolean
  isDragReject: boolean
}) => {
  if (props.isDragReject) return '#ff1744'
  if (props.isDragAccept) return '#00e676'
  if (props.isError) return '#ff1744'
}

export function PreviewDropzone({ name }: { name: string }) {
  const { setValue } = useFormContext()

  const [file, setFile] = useState<UploadedFile | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    setError(null)

    if (acceptedFiles.length) {
      const file = acceptedFiles[0] as UploadedFile
      file.preview = URL.createObjectURL(file)

      const image = new Image()
      image.src = file.preview
      image.onload = () => {
        const aspectRatio = image.width / image.height
        const targetAspectRatio = 4.0 / 5.0 // = 0.8

        const tolerance = 0.05

        setFile(file)

        if (Math.abs(aspectRatio - targetAspectRatio) > tolerance) {
          setError('Некорректное соотношение сторон изображения')
          return
        }
        setValue(name, file)
      }
    }
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg'],
      'image/png': ['.png']
    },
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    maxFiles: 1,
    disabled: !!file,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected(fileRejections) {
      const { errors } = fileRejections[0]
      const { code } = errors[0]
      setError(dropzoneCodeToMsg(code))
    }
  })

  const handleRemoveClick = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation() // prevent input=file action
    setError(null)
    URL.revokeObjectURL(file!.preview)
    setFile(null)
    setValue(name, null)
  }

  return (
    <>
      <div
        {...getRootProps()}
        className="relative mt-6 aspect-4/5 w-[270px] rounded-xl border-2 border-gray-300"
        style={{
          borderStyle: file?.size ? 'solid' : 'dashed',
          borderColor: dropzoneFeedbackColor({
            isDragAccept,
            isDragReject,
            isError: !!error
          })
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <img
            src={file.preview}
            alt="alt"
            onLoad={() => URL.revokeObjectURL(file.preview)}
            className="size-full rounded-xl"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="select-none">
              <p className="my-2 px-2 text-center text-gray-500">Превью фото товара</p>
              <ul className="list-disc pl-[20%] text-sm text-gray-400">
                <li>Размер до {MAX_FILE_SIZE_MB} Mb</li>
                <li>Формат jpeg | png</li>
                <li>Соотношение 4:5</li>
              </ul>
            </div>
          </div>
        )}
        <div className={deleteButton({ show: !!file })}>
          <Button type="button" size="icon" onClick={handleRemoveClick} className="rounded-full">
            <TrashIcon />
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <ErrorMessage show={!!error}>{error}</ErrorMessage>
      </div>
    </>
  )
}
