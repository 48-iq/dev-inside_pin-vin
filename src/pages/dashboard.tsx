import { Layout, Tabs, TabsProps } from "antd"
import { RecommendationTable } from "../widgets/RecommendationTable"
import { AudioRecorder } from "../widgets/AudioRecorder"
import { AudioUploader } from "../widgets/AudioUploader"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { FileAddOutlined, LineChartOutlined, PhoneOutlined } from "@ant-design/icons"
import logo from '../../public/vinpin-white-logo.svg'
import { ChartContainer } from "../widgets/ChartContainer"

export const DashboardPage = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Статистика',
      children: <ChartContainer />,
      icon: <PhoneOutlined />
    },
    {
      key: '2',
      label: 'Рекомендации',
      children: <RecommendationTable />,
      icon: <LineChartOutlined />
    },
    {
      key: '3',
      label: 'Отправить',
      children: 
        <>
          <AudioRecorder />
          <AudioUploader />
        </>,
      icon: <FileAddOutlined />
    }
  ]
  return (
    <>
      <Layout style={{ backgroundColor: 'white', minHeight: '100vh'}}>
        <Header style={{backgroundColor: '#AA1515'}}>
          <img src={logo} style={{marginTop: 4, position: 'absolute'}} />
        </Header>
        <Content>
          <Tabs items={items} size="large" centered />
        </Content>
        <Footer style={{backgroundColor: 'white'}}>created with love by © "dev inside"</Footer>
      </Layout>
    </>
  )
}
