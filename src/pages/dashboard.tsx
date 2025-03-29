import { Layout, Tabs, TabsProps } from "antd"
import { RecommendationTable } from "../widgets/RecommendationTable"
import { AudioRecorder } from "../widgets/AudioRecorder"
import { AudioUploader } from "../widgets/AudioUploader"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { FileAddOutlined, LineChartOutlined, PhoneOutlined } from "@ant-design/icons"
import logo from '/vinpin-white-logo.svg'
import { ChartContainer } from "../widgets/ChartContainer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../app/store"
import { useEffect } from "react"
import { fetchCallsFailure, fetchCallsStart, fetchCallsSuccess } from "../entities/recordsSlice"
import mockCalls from '../../public/table.json';

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadCalls = async () => {
      try {
        dispatch(fetchCallsStart());
        
        // Здесь обычно будет запрос к API, но используем моковые данные
        // const response = await api.get('/calls');
        // dispatch(fetchCallsSuccess(response.data));
        
        // Используем импортированные моковые данные
        dispatch(fetchCallsSuccess(mockCalls));
        
      } catch (err) {
        dispatch(fetchCallsFailure((err as Error).message));
      }
    };

    loadCalls();
  }, [dispatch]);

  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'СТАТИСТИКА',
      children: <ChartContainer />,
      icon: <LineChartOutlined />
    },
    {
      key: '2',
      label: 'ЗВОНКИ',
      children: <RecommendationTable />,
      icon: <PhoneOutlined />
    },
    {
      key: '3',
      label: 'ОТПРАВИТЬ',
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
          <Tabs items={items} size="large" centered tabBarStyle={{}}/>
        </Content>
        <Footer style={{backgroundColor: 'white'}}>created with love by © "dev inside" {new Date().getFullYear()} years</Footer>
      </Layout>
    </>
  )
}
