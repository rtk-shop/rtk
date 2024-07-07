import { useState, useEffect } from "react";
import clsx from "clsx";
import { Filters } from "./filters";
import { ProductList } from "./product-list";
import { ScaleLoader } from "@/components/ui/loader";
import { ErrorPlug } from "@/components/ui/error-plug";
import { Controls } from "./controls";
import { useLazyQuery } from "@apollo/client";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import type { CategoryType, ProductTag, Gender } from "@/graphql/types";
import {
  AllProductsDocument,
  AllProductsQuery,
  AllProductsQueryVariables,
} from "@/graphql/product/_gen_/products.query";

import styles from "./styles.module.scss";

type PriceRangeType = {
  gt: number;
  lt: number;
};

export type FormValues = {
  gender: Array<Lowercase<keyof typeof Gender>>;
  availability: Array<"inStock" | "byOrder">;
  tag: Lowercase<keyof typeof ProductTag> | null;
  priceRange: [number, number];
  category: Array<Lowercase<keyof typeof CategoryType>>;
};

export function CatalogIndex() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [isOpen, setOpen] = useState(false);

  const page = 1;
  const numOfPage = !isNaN(Number(page)) ? Number(page) : 1;

  const [getProducts, { loading, data, error }] = useLazyQuery<
    AllProductsQuery,
    AllProductsQueryVariables
  >(AllProductsDocument, {
    onCompleted: (data) => {
      if (data?.products.priceRange) {
        const { gt, lt } = data.products.priceRange;
        setPriceRange([gt, lt]);
      }
    },
  });

  const formMethods = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      gender: [],
      availability: [],
      tag: null,
      priceRange: undefined,
      category: [],
    },
  });

  const { watch, handleSubmit, reset } = formMethods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("-- API --", data);

    const { gender, availability, tag, priceRange, category } = data;

    let price: PriceRangeType | undefined;

    if (priceRange) {
      const [gt, lt] = priceRange;
      price = { gt, lt };
    }

    let instock: boolean | undefined;

    if (availability.length === 1) {
      const map = { inStock: true, byOrder: false };
      instock = map[availability[0]];
    }

    const categoryData = category as unknown as CategoryType;
    const tagData = tag as unknown as ProductTag;
    const genderData = gender as unknown as Gender;

    getProducts({
      variables: {
        page: numOfPage,
        price,
        instock,
        category: categoryData,
        tag: tagData,
        gender: genderData,
      },
    });
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  useEffect(() => {
    getProducts({
      variables: {
        page: numOfPage,
      },
    });
  }, [numOfPage, getProducts]);

  const handleFilterClick = (): void => {
    document.documentElement.style.position = "fixed";
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    document.documentElement.style.position = "static";
    setOpen(false);
  };

  const handleReset = (): void => {
    reset();
  };

  if (error) {
    console.log(error);

    if (error.message === "invalid page") {
      // return <Redirect to={routeNames.catalog} />
      console.log(error);
    }
    return <ErrorPlug />;
  }

  const totalPages = data?.products.pagination.totalPages;

  return (
    <div>
      <FormProvider {...formMethods}>
        <div className={styles.wrapper}>
          <div className={styles.pageContainer}>
            <div className={styles.what}>
              <div
                className={clsx({
                  [styles.filters]: true,
                  [styles.filtersVisible]: isOpen,
                })}
              >
                <Filters onReset={handleReset} priceRange={priceRange} />
              </div>
            </div>
            <div className={styles.viewBox}>
              {loading ? (
                <div className={styles.loaderWapper}>
                  <ScaleLoader fallback={true} />
                </div>
              ) : (
                <div className={styles.productsView}>
                  <Controls onFilterClick={handleFilterClick} />
                  <ProductList
                    totalPages={totalPages ? totalPages : 1}
                    currentPage={isNaN(numOfPage) ? 1 : numOfPage}
                    products={data?.products.products}
                    onReset={handleReset}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            onClick={handleDrawerClose}
            className={clsx({
              [styles.overlay]: true,
              [styles.overlayVisible]: isOpen,
            })}
          />
        </div>
      </FormProvider>
    </div>
  );
}
