import { ProductPhotoDropzone } from '../dropzone'

export function Preview() {
  return (
    <div>
      <h2>Preview upload</h2>
      <ProductPhotoDropzone
        name="preview"
        info={
          <div>
            <ul className="list-disc text-sm text-nowrap text-gray-500">
              <li>Размер до 5 Mb</li>
              <li>Формат jpeg | png</li>
              <li>Соотношение 4:5</li>
            </ul>
          </div>
        }
      />
    </div>
  )
}
