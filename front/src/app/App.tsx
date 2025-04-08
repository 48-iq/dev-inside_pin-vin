import { ConfigProvider as AntdConfigProvider } from "antd"
import ruRU from "antd/es/locale/ru_RU"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { Provider as ReduxProvider} from 'react-redux'
import { store } from "./store"
import { theme } from "./theme"
import '../../public/css/fonts.css'

export const App = () => {
  return (
    <AntdConfigProvider
      locale={ruRU}
      componentSize={"large"}
      getPopupContainer={(trigger: any) => trigger?.parentElement}
      theme={theme}
    >
      <ReduxProvider store={store}>
          <RouterProvider router={router} />
      </ReduxProvider>
    </AntdConfigProvider>
  )
}