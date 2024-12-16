import { useState, ChangeEvent } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'

import styles from './styles.module.css'

interface EditModeProps {
  onExit(): void
}

const schema = {
  min: 1,
  max: 100
}

export function EditMode({ onExit }: EditModeProps) {
  const [newCurrency, setNewCurrency] = useState(0)
  const [error, setError] = useState('')

  /*
  const [setCourse, { loading }] = setCourse({
    variables: {
      value: newCurrency
    },
    onCompleted() {
      onExit()
    },
    onError(error) {
      console.log(error)
      setError('Ошибка, не удалось обновить')
    }
  })
  */

  const setCourse = () => console.log('set usd course')
  const loading = false

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value

    if (value <= schema.max && value >= schema.min) {
      setNewCurrency(value)
      setError('')
    } else {
      setNewCurrency(-1)
      setError(`Значение от ${schema.min} до ${schema.max}`)
    }
  }

  const handleCourseSet = () => {
    if (newCurrency >= schema.min) {
      setError('')
      setCourse()
    }
  }

  const notValid = error !== ''

  return (
    <div className={styles.container}>
      <p className={styles.title}>Новый курс</p>
      <div className={styles.preview}>
        <span>1$ =</span>
        <input
          autoFocus
          type="number"
          min={schema.min}
          max={schema.max}
          onChange={handleInputChange}
          className={clsx(styles.currencyInput, notValid && styles.currencyErr)}
        />
        грн.
      </div>
      <p className={clsx(styles.errorMessage, notValid && styles.showMessage)}>{error}</p>
      <div className={styles.buttonsWrapper}>
        <Button
          disabled={loading}
          color="secondary"
          className={styles.actionButton}
          onClick={onExit}
        >
          Отмена
        </Button>
        <Button loading={loading} onClick={handleCourseSet} className={styles.actionButton}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
