import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

interface ProcessPlugProps {
  text: string
  onClose(): void
}

export function ProcessPlug({ text, onClose }: ProcessPlugProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="fill-gray-400 px-4">
        <Icon name="common/emptycart" className="text-[300px]" />
        <p className="text-center text-xl font-medium">{text}</p>
      </div>
      <Button
        onClick={onClose}
        fullWidth
        className="group mt-12 w-8/12 max-w-48 font-medium"
        startIcon={
          <Icon
            name="common/arrow"
            className="mr-1.5 -rotate-90 fill-white text-[23px] transition-transform group-hover:-translate-x-2"
          />
        }
      >
        Назад
      </Button>
    </div>
  )
}
