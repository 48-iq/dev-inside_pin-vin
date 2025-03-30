import styled from 'styled-components';
import bg from '/welcomBg.svg';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const WelcomePage = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Button onClick={() => navigate('/dashboard')}>ДАШБОАРД</Button>
    </Container>
  )
}

const Container = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: end;

  Button {
    margin: 1%;
    background-color: white;
    color: #AA1515;
    width: 12%;
    height: 8%;
    font-size: 22px;
    font-weight: 900;
  }
`
