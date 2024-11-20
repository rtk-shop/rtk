import { useState } from 'react'
import clsx from 'clsx'
import { IconButton } from '@/components/ui/icon-button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Dropdown, type Option } from '@/components/ui/dropdown'
// import { getProductMainTagColor } from '@/lib/styling'
// import {
//   SearchProductQuery,
//   SearchProductVariables,
//   SearchProductDocument
// } from '../../graphql/product/_gen_/searchProduct.query'

import styles from './styles.module.scss'
import { Icon } from '@/components/ui/icon'

type FormValues = {
  searchQuery: string
}

export function Search() {
  const t = (s: string) => s

  const [inputValue, setInputValue] = useState('')
  const [withFocus, setWithFocus] = useState(false)

  const { register, handleSubmit } = useForm<FormValues>()

  const [category, setCategory] = useState('all')

  // const [getProducts, { loading, data, error }] = useLazyQuery<
  //   SearchProductQuery,
  //   SearchProductVariables
  // >(SearchProductDocument, {
  //   fetchPolicy: 'network-only'
  // })

  const optios: Option[] = [
    {
      title: 'Все категории',
      value: 'all'
    },
    {
      title: 'Сумки',
      value: 'bag'
    },
    {
      title: 'Чемоданы',
      value: 'suitcase'
    }
  ]

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values)
    setInputValue(values.searchQuery)

    //   getProducts({
    //     variables: {
    //       input: value
    //     }
    //   })
  }

  // const removeFocus = (): void => setWithFocus(false)

  // const products = data?.searchProductByName

  // let content = (
  //   <LoaderBox>
  //     <span>
  //       {error ? 'Ошибка, повторите попытку позже' : 'По вашему запросу ничего не найдено.'}
  //     </span>
  //   </LoaderBox>
  // )

  // const handleUserSelection = (_id: string): void => {
  //   setWithFocus(false)
  //   // history.push(generateLink(routeNames.product, id))
  // }

  // if (products?.length) {
  //   content = (
  //     <ProductList>
  //       {products &&
  //         products.map((product) => (
  //           <li key={product.id}>
  //             <LinkWrapper
  //               tabIndex={0}
  //               onClick={() => handleUserSelection(product.id)}
  //               href={generateLink(routeNames.product, product.id)}
  //             >
  //               <div style={{ height: 77, width: 77 }}>
  //                 <Image width={77} height={77} src="xc*image" alt="alt text" />
  //               </div>
  //               <InfoBox>
  //                 <ProductTitle>{product.title}</ProductTitle>
  //                 {product.mainTag !== 'REGULAR' && (
  //                   <ProductMainTag
  //                     style={{
  //                       backgroundColor: getProductMainTagColor(product.mainTag)
  //                     }}
  //                   >
  //                     product.mainTag
  //                   </ProductMainTag>
  //                 )}
  //               </InfoBox>
  //             </LinkWrapper>
  //           </li>
  //         ))}
  //     </ProductList>
  //   )
  // }

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        tabIndex={0}
        onFocus={() => setWithFocus(true)}
        noValidate
      >
        <div className={styles.dropdownBox}>
          <Dropdown
            selected={optios.find((o) => o.value === category)}
            options={optios}
            onChange={handleCategoryChange}
            rootStyles={styles.dropdown}
            defaultValue="all"
          />
        </div>
        <input
          autoComplete="off"
          placeholder={t('header.mySearch')}
          className={clsx({
            [styles['search-input']]: true,
            [styles['with-data']]: withFocus && inputValue
          })}
          {...register('searchQuery')}
        />
        <IconButton type="submit" className={styles.searchButton}>
          <Icon name="action/search" className={styles['search-icon']} />
        </IconButton>
      </form>
      {/* {inputValue && withFocus && (
        <Results>
          {loading ? (
            <LoaderBox>
              <Loader />
            </LoaderBox>
          ) : (
            content
          )}
        </Results>
      )} */}
      <div className={clsx(styles.overlay, withFocus && inputValue && styles['overlay-show'])} />
    </div>
  )
}
