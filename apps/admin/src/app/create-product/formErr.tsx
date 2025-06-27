import { useFormContext } from 'react-hook-form'

export function FormError() {
  const {
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <h2>images</h2>
      <code>{JSON.stringify(errors)}</code>
    </div>
  )
}
