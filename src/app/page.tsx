'use client'
import { RadioGroup } from '@/components/ui/radio-group'
import { novaDeliveryTypeOptions } from './(bot)/checkout/model/constants'
import { FormProvider, useForm } from 'react-hook-form'

export default function Page() {
  const formMethods = useForm({
    mode: 'onBlur',
    defaultValues: {
      rg1: '',
      rg2: ''
    }
  })

  return (
    <div>
      <h1>Tests</h1>
      <div className="p-10">
        <button className="duration-700 animate-in fade-in">Button A</button>
        <button className="... animate-in spin-in">Button B</button>
        <button className="... animate-in zoom-in">Button C</button>
        <button className="... animate-in slide-in-from-top">Button D</button>
        <button className="... animate-in slide-in-from-left">Button E</button>
        <br />
      </div>
      <FormProvider {...formMethods}>
        <RadioGroup name="rg2" options={novaDeliveryTypeOptions} />
        <RadioGroup direction="row" name="rg1" options={novaDeliveryTypeOptions} />
      </FormProvider>
    </div>
  )
}
