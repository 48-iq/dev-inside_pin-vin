import styled from "styled-components";
import { CriteriaPercentAreaChart } from "../features/CriteriaPercentAreaChart";
import { EmotionPieChart } from "../features/EmotionPieChart";
import { GPAAreaChart } from "../features/GPAAreaChart";
import { PauseAreaChart } from "../features/PauseAreaChart";

export const ChartContainer = () => {
  return (
    <Container>
      <LeftSection>
        <MandatoryCallsText>
          КОЛ-ВО ОБЯЗАТЕЛЬНЫХ ЗВОНКОВ: <span>100</span>
        </MandatoryCallsText>
        <ChartWrapper>
          <ChartTitle>ЕМОЦИОНАЛЬНАЯ ОЦЕНКА ЗВОНКОВ</ChartTitle>
          <EmotionPieChart />
        </ChartWrapper>
      </LeftSection>

      <RightSection>
        <TopRightText>
          ТУТ ОЦЕНЬ КРУТОЙ ТЕКСТ про Александра
        </TopRightText>

        <MiddleRow>
          <ChartWrapper>
            <ChartTitle>СРЕДНИЙ БАЛЛ ПО КРИТЕРИЯМ ЗВОНКОВ</ChartTitle>
            <GPAAreaChart />
          </ChartWrapper>
          <ChartWrapper>
            <ChartTitle>СРЕДНЕЕ ВРЕМЯ ПАУЗ В ДИАЛОГЕ</ChartTitle>
            <PauseAreaChart />
          </ChartWrapper>
        </MiddleRow>

        <ChartWrapper>
          <ChartTitle>КРИТЕРИИ ЗВОНКОВ</ChartTitle>
          <CriteriaPercentAreaChart />
        </ChartWrapper>

        <BottomText>
          Уточнение 7 недельных путей по ЧАСТЬ? для каждого критерия
        </BottomText>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
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
  font-size: 18px;
  font-weight: bold;
  text-align: center;

  span {
    font-size: 36px;
    color: #ff4d4d;
  }
`;

const TopRightText = styled.div`
  background-color: #ffe6e6;
  padding: 20px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const MiddleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const ChartWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  color: #ff4d4d;
  margin-bottom: 10px;
  text-align: center;
`;

const BottomText = styled.div`
  font-size: 12px;
  color: #666;
  text-align: center;
`;
