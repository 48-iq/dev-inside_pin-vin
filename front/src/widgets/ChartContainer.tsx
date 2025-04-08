import styled from "styled-components";
import { CriteriaPercentAreaChart } from "../features/CriteriaPercentAreaChart";
import { EmotionPieChart } from "../features/EmotionPieChart";
import { GPAAreaChart } from "../features/GPAAreaChart";
import { PauseAreaChart } from "../features/PauseAreaChart";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const ChartContainer = () => {
  const { averages, loading, error } = useSelector((state: RootState) => state.dailyCalls);
  return (
    <Container>
      <LeftSection>
        <MandatoryCallsText>
          КОЛ-ВО ОБРАБОТАННЫХ ЗВОНКОВ: <br />
          <span>{loading ? "Загрузка..." : error ? "Ошибка" : averages.processedCallRecords}</span>
        </MandatoryCallsText>
        <ChartWrapper>
          <ChartTitle>ЭМОЦИОНАЛЬНАЯ ОЦЕНКА ЗВОНКОВ</ChartTitle>
          <EmotionPieChart />
        </ChartWrapper>
      </LeftSection>

      <RightSection>
        <div>
          <ChartWrapper>
            <ChartTitle>СРЕДНИЙ БАЛЛ ПО КРИТЕРИЯМ ЗВОНКОВ</ChartTitle>
            <GPAAreaChart />
          </ChartWrapper>
        </div>

        <ChartWrapper>
          <ChartTitle>КРИТЕРИИ ЗВОНКОВ</ChartTitle>
          <CriteriaPercentAreaChart />
        </ChartWrapper>

        <ChartWrapper>
          <ChartTitle>СРЕДНЕЕ ВРЕМЯ ПАУЗ В ДИАЛОГЕ</ChartTitle>
          <PauseAreaChart />
        </ChartWrapper>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  color: #AA1515;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MandatoryCallsText = styled.div`
  background-color: #ffe6e6;
  padding: 20px;
  border-radius: 10px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  span {
    font-size: 55px;
  }
`;

const ChartWrapper = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffe6e6;
`;

const ChartTitle = styled.h3`
  font-size: 22px;
`;
