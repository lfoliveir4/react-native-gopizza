export type ProductNavigationProps = {
  id?: string
}

export type OrderNavigationProps = {
  id: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined
      Product: ProductNavigationProps
      Order: OrderNavigationProps
      Orders: undefined
    }
  }
}