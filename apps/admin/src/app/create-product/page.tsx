'use client'

import { useForm, FormProvider, SubmitHandler, useFormContext } from 'react-hook-form'
import { FormValues, validationSchema } from './lib/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Button, Input } from '@repo/ui'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { genderOptions, categoryOptions } from './lib/form-values'
import { SelectSize } from './size'
import { Preview } from './preview'
import { Images } from './images'
import { useCreateProductMutation } from '@/lib/api/hooks'
import { Header } from '@/components/layout/header'
import { description } from './lib/data'
import { CategoryType } from '@/lib/api/graphql/types'

function FormError() {
  const {
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <h2>Form errors</h2>
      <code>{JSON.stringify(errors)}</code>
    </div>
  )
}

export default function Page() {
  const [{ fetching }, createProduct] = useCreateProductMutation()

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    shouldFocusError: false,
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      title: '[TEST] External changing data without sending a snapshot',
      sku: 'P13t16t',
      basePrice: 722,
      // gender: 'MALE',
      amount: 3,
      // category: 'OTHER',
      description,
      brandName: 'Brand',
      images: [
        {
          image: undefined,
          order: 1
        },
        {
          image: undefined,
          order: 2
        }
      ]
    }
  })

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    if (values.category === CategoryType.Other) values.sizeName = 'none'
    console.log('values', values)

    const res = await createProduct({ ...values })

    console.log('api res', res)
  }

  return (
    <div className="mb-16 min-h-dvh">
      <Header></Header>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className="flex flex-wrap px-2.5 pb-3">
            <div className="mb-5 basis-full xl:mb-0 xl:basis-1/2 xl:p-4">
              <Input name="title" label="Название" />
              <div className="max-w-40">
                <Input name="sku" label="Код учета (SKU)" />
              </div>
              <div className="flex items-center">
                <div className="mr-12">
                  <Input name="basePrice" label="Цена" type="number" />
                </div>
                <div>
                  <Input name="amount" label="Количество" type="number" />
                </div>
              </div>

              <div className="mb-4 xl:flex">
                <div className="mr-4 w-full max-w-64">
                  <Select
                    name="category"
                    label="Категория"
                    placeholder="Выбрать категорию"
                    options={categoryOptions}
                  />
                </div>
                <div className="w-[200px]">
                  <Select
                    name="gender"
                    label="Гендер"
                    placeholder="Выбрать гендер"
                    options={genderOptions}
                  />
                </div>
              </div>
              {/*  */}
              <SelectSize />
              <Input name="brandName" label="Бренд" />
              {/*  */}
              <Textarea
                name="description"
                label="Описание"
                className="h-44 xl:h-60"
                placeholder="Опишите товар используя разметку HTML..."
              />
              <div className="flex justify-center">
                <Button fullWidth type="submit" className="xl:max-w-73" loading={fetching}>
                  Создать
                </Button>
              </div>
              {/* <FormError /> */}
            </div>
            <div className="basis-full xl:basis-1/2 xl:p-4">
              <div className="flex">
                <div className="mr-10 w-full max-w-[270px]">
                  <Preview />
                </div>
                <div className="w-full">
                  <Images />
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
