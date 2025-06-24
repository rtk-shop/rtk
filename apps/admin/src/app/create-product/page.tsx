'use client'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { FormValues, validationSchema } from './lib/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button, Input } from '@repo/ui'

export default function Page() {
  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    shouldFocusError: false,
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      title: 'External changing data without sending a snapshot',
      sku: 'P13t16t',
      basePrice: 722,
      amount: 3
    }
  })

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log('values', values)
  }

  return (
    <div className="mb-16 min-h-dvh bg-gray-100">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className="px-2.5 py-5 pb-3">
            <Input name="title" label="Название" />
            <Input name="sku" label="Код учета (SKU)" />
            <Input name="basePrice" label="Цена" type="number" />
            <Input name="amount" label="Количество" type="number" />
            <Button type="submit">Save</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
