import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/components/ui/svg-icon'
import EmptyCartIcon from '../../../../public/assets/emptycart.svg'
import ArrowIcon from '../../../../public/icons/expand-arrow.svg'

interface ProcessPlugProps {
  text: string
  onClose(): void
}

export function ProcessPlug({ text, onClose }: ProcessPlugProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-full fill-gray-400 px-4">
        <EmptyCartIcon />
        <p className="text-center text-xl font-medium">{text}</p>
      </div>
      <Button
        onClick={onClose}
        className="group mt-12 w-8/12 font-medium"
        startIcon={
          <SvgIcon className="mr-1.5 -rotate-90 fill-white text-[23px] transition-transform group-hover:-translate-x-2">
            <ArrowIcon />
          </SvgIcon>
        }
      >
        Назад
      </Button>
    </div>
  )
}
