import { components, InputProps, type NoticeProps } from 'react-select'

export const SelectInput = <T,>(props: InputProps<T, false>) => {
  // Disable autocomplete on field
  // https://stackoverflow.com/a/30976223/15604836
  return (
    <components.Input aria-activedescendant={undefined} {...props} autoComplete="one-time-code" />
  )
}

export const NoOptionsMessage = <T,>(props: NoticeProps<T>) => {
  return <components.NoOptionsMessage {...props}>Не знайдено</components.NoOptionsMessage>
}

export const LoadingMessage = <T,>(props: NoticeProps<T, false>) => {
  return <components.LoadingMessage {...props}>Пошук</components.LoadingMessage>
}
