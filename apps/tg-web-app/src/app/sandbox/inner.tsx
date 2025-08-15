'use client'

import { RadioGroup } from '@/components/ui/radio-group'
import { novaDeliveryTypeOptions } from '../checkout/model/constants'
import { FormProvider, useForm } from 'react-hook-form'
import { Icon } from '@/components/ui/icon'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'

export default function PageInner() {
  const formMethods = useForm({
    mode: 'onBlur',
    defaultValues: {
      rg1: '',
      rg2: ''
    }
  })

  const handlePopUp = () => {
    window.Telegram.WebApp.showPopup({
      title: 'Popup title',
      message: 'Here popup message',
      buttons: [{ type: 'ok' }, { type: 'cancel' }]
    })
  }

  const handleAlert = () => {
    window.Telegram.WebApp.showAlert('Alert message')
  }

  const handleConfirmClick = () => {
    window.Telegram.WebApp.showConfirm('Are you ok with it?')
  }

  const handleQRScanClick = () => {
    window.Telegram.WebApp.showScanQrPopup({
      text: 'scan your QR'
    })
  }

  return (
    <div>
      <h1>Sandbox</h1>
      <ul className="flex flex-col justify-center *:m-auto *:mb-4">
        <li>
          <Button onClick={handlePopUp}>Show native popup</Button>
        </li>
        <li>
          <Button hapticFeedback="heavy" onClick={handleAlert}>
            Show native alter
          </Button>
        </li>
        <li>
          <Button hapticFeedback="soft" onClick={handleConfirmClick}>
            Show native confirm
          </Button>
        </li>
        <li>
          <Button onClick={handleQRScanClick}>Show native QR scan</Button>
        </li>
      </ul>

      <div>
        <IconButton className="text-[24px]" hapticFeedback="light">
          <Icon name="action/share" />
        </IconButton>
      </div>

      <div className="p-10"></div>
      <FormProvider {...formMethods}>
        <Checkbox name="rg1" value="test" label="Норм" register={formMethods.register} />
        <RadioGroup name="rg2" options={novaDeliveryTypeOptions} />
        <RadioGroup direction="row" name="rg1" options={novaDeliveryTypeOptions} />
      </FormProvider>
    </div>
  )
}
