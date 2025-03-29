import { ConfigProvider as AntdConfigProvider, Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import ruRU from "antd/es/locale/ru_RU"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { Provider as ReduxProvider} from 'react-redux'
import { store } from "./store"

export const App = () => {
  return (
    <AntdConfigProvider
      locale={ruRU}
      componentSize={"large"}
      getPopupContainer={(trigger: any) => trigger?.parentElement}
      theme={{
        components: {
          Tabs: {
            itemColor: 'white',
            itemHoverColor: '#EC9898',
            itemSelectedColor: 'white',
            inkBarColor: 'white', 
            horizontalItemGutter: 100,
          }
        }
      }}
    >
      <ReduxProvider store={store}>
          <RouterProvider router={router} />
      </ReduxProvider>
    </AntdConfigProvider>
  )
}