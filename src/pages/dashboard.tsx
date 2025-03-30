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
import { fetchCallsFailure, fetchCallsStart, fetchCallsSuccess } from "../entities/TableSlice"
import { fetchDailyCallsFailure, fetchDailyCallsStart, fetchDailyCallsSuccess } from "../entities/ChartSlice"
import styled from "styled-components"
import { getAvg, getCalls } from "../entities/example"

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadCalls = async () => {
      try {
        dispatch(fetchCallsStart());
        dispatch(fetchDailyCallsStart());
        const responseCall = await getCalls();
        const responseAvg = await getAvg();
  
        console.log("responseCall.data:", responseCall.calls);
        console.log("responseAvg.data:", responseAvg);
  
        dispatch(fetchCallsSuccess(responseCall.calls || []));
        dispatch(fetchDailyCallsSuccess(responseAvg));
      } catch (err) {
        const errorMessage = (err as Error).message || "Unknown error occurred";
        console.error("Error in loadCalls:", errorMessage);
        dispatch(fetchCallsFailure(errorMessage));
        dispatch(fetchDailyCallsFailure(errorMessage));
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
        <Container>
          <AudioRecorder />
          <AudioUploader />
        </Container>,
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

const Container = styled.div`
  display: flex;
  justify-content: center;
`
