'use client'

import { RadioGroup } from '@/components/ui/radio-group'
import { novaDeliveryTypeOptions } from '../checkout/model/constants'
import { FormProvider, useForm } from 'react-hook-form'
import { Icon } from '@/components/ui/icon'
import { Checkbox } from '@/components/ui/checkbox'

export default function PageInner() {
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
        <button className="animate-in fade-in duration-700">Button A</button>
        <button className="animate-in spin-in ...">Button B</button>
        <button className="animate-in zoom-in ...">Button C</button>
        <button className="animate-in slide-in-from-top ...">Button D</button>
        <button className="animate-in slide-in-from-left ...">Button E</button>
        <br />
        <Icon name="common/cart" className="text-[133px] text-orange-400" />
        <Icon name="common/cart" />
      </div>
      <FormProvider {...formMethods}>
        <Checkbox name="rg1" value="test" label="Норм" register={formMethods.register} />
        <RadioGroup name="rg2" options={novaDeliveryTypeOptions} />
        <RadioGroup direction="row" name="rg1" options={novaDeliveryTypeOptions} />
      </FormProvider>
    </div>
  )
}
