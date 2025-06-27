import { type ReactNode, useState, type MouseEvent } from 'react'
import { cva } from 'cva'
import { useDropzone } from 'react-dropzone'
import { ErrorMessage } from '@repo/ui'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/shadcn/button'
import { TrashIcon, ImageIcon } from 'lucide-react'

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

export function ProductPhotoDropzone({ name, info }: { name: string; info?: ReactNode }) {
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

        // const { preview, ...rawFile } = file

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
        className="relative aspect-4/5 w-full rounded-xl border-2 border-gray-300"
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
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center select-none">
              <ImageIcon className="size-20 text-gray-300" />
              {info}
            </div>
          </div>
        )}
        <div className={deleteButton({ show: !!file })}>
          <Button type="button" size="icon" onClick={handleRemoveClick} className="rounded-full">
            <TrashIcon />
          </Button>
        </div>
      </div>
      <div className="">
        <ErrorMessage show={!!error}>{error}</ErrorMessage>
      </div>
    </>
  )
}
