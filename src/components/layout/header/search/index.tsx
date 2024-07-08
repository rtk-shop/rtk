import { useState } from 'react'
import clsx from 'clsx'
import { IconButton } from '@/components/ui/icon-button'
// import {ScaleLoader} from '@/shared/loaders/ScaleLoader'
// import Image from 'next/image'
// import { routeNames, generateLink } from '@/utils/navigation'
// import { useLazyQuery } from '@apollo/client'
import useTranslation from 'next-translate/useTranslation'
import { useForm, SubmitHandler } from 'react-hook-form'
import SearchIcon from '../../../../../public/icons/search.svg'
// import { getProductMainTagColor } from '@/utils/styling'
// import {
//   SearchProductQuery,
//   SearchProductVariables,
//   SearchProductDocument
// } from '../../graphql/product/_gen_/searchProduct.query'

import styles from './styles.module.scss'

type FormValues = {
  searchQuery: string
}

export function Search() {
  const { t } = useTranslation('common')
  const [inputValue, setInputValue] = useState<string>('')
  const [withFocus, setWithFocus] = useState<boolean>(false)

  const { register, handleSubmit } = useForm<FormValues>()

  // const [getProducts, { loading, data, error }] = useLazyQuery<
  //   SearchProductQuery,
  //   SearchProductVariables
  // >(SearchProductDocument, {
  //   fetchPolicy: 'network-only'
  // })

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
        <input
          autoComplete="off"
          placeholder={t('header.mySearch')}
          className={clsx({
            [styles['search-input']]: true,
            [styles['with-data']]: withFocus && inputValue
          })}
          {...register('searchQuery')}
        />
        <IconButton type="submit" className={styles['search-button']}>
          <div className={clsx('svg-icon', styles['search-icon'])}>
            <SearchIcon />
          </div>
        </IconButton>
      </form>
      {/* {inputValue && withFocus && (
        <Results>
          {loading ? (
            <LoaderBox>
              <ScaleLoader />
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
