import { Content, Footer, Header } from "antd/es/layout/layout"
import { ReactNode } from "react"

export const Layout = ({children} : {children: ReactNode}) => {
  return (
    <>
    <Layout>
      <Header>
        akwdad
      </Header>
      <Content>
      {children}
      </Content>
      <Footer>
    fdsff
      </Footer>
    </Layout>
    </>
  )
}