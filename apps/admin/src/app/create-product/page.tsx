'use client'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { FormValues, validationSchema } from './lib/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button, Input } from '@repo/ui'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { genderOptions, categoryOptions } from './lib/form-values'
import { SelectSize } from './size'

export default function Page() {
  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    shouldFocusError: false,
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      title: 'External changing data without sending a snapshot',
      sku: 'P13t16t',
      basePrice: 722,
      gender: 'MALE',
      amount: 3,
      category: 'SUITCASE',
      description: 'My beaifyle description'
    }
  })

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    if (values.category === 'OTHER') values.sizeName = 'none'

    console.log('values', values)
  }

  return (
    <div className="mb-16 min-h-dvh bg-gray-100">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className="px-2.5 py-5 pb-3">
            <Input name="title" label="Название" />
            <Input name="sku" label="Код учета (SKU)" />
            <div className="flex">
              <div className="mr-12">
                <Input name="basePrice" label="Цена" type="number" />
              </div>
              <div>
                <Input name="amount" label="Количество" type="number" />
              </div>
            </div>
            <div className="w-[300px]">
              <Select name="gender" placeholder="Выбрать гендер" options={genderOptions} />
            </div>
            <div className="w-[300px]">
              <Select name="category" placeholder="Выбрать категорию" options={categoryOptions} />
            </div>
            {/*  */}
            <SelectSize />
            {/*  */}
            <Textarea
              name="description"
              label="Описание"
              placeholder="Опишите товар используя разметку HTML..."
            />
            <Button fullWidth type="submit">
              Создать
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
