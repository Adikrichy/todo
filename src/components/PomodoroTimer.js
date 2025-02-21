import React, { Component } from 'react';
import styled from 'styled-components';

const PomodoroContainer = styled.div`
  background: ${({ theme }) => theme.pomodoroBg};
  position: relative;
  transform: translateY(-2rem);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 2rem !important;
  margin-left: -30px;
  animation: fadeIn 0.5s ease-in-out;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

// Заголовок теперь использует цвет из темы
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.pomodoroTitleColor} !important;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;

// Остальные компоненты
const ModeText = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme, isWorkMode }) => 
    isWorkMode ? theme.workModeColor : theme.breakModeColor};
  margin-bottom: 1rem;
`;


const TimeDisplay = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.pomodoroTimeColor};
  margin-bottom: 1.5rem;
`;

// Кнопки
const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  margin: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ bg }) => bg};

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.05);
  }
`;

const StartButton = styled(Button)`
  background: ${({ theme }) => theme.pomodoroStartButtonBg};
`;

const PauseButton = styled(Button)`
  background: ${({ theme }) => theme.pomodoroPauseButtonBg};
`;

const ResetButton = styled(Button)`
  background: ${({ theme }) => theme.pomodoroResetButtonBg};
`;

// Анимация для плавного появления
const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 25 * 60,
      isWorkMode: true,
      isTimerRunning: false,
    };
    this.timer = null;
  }

  startTimer = () => {
    if (!this.state.isTimerRunning) {
      this.setState({ isTimerRunning: true });
      this.timer = setInterval(this.tick, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ isTimerRunning: false });
  };

  tick = () => {
    this.setState((prevState) => {
      if (prevState.timeLeft > 0) {
        return { timeLeft: prevState.timeLeft - 1 };
      } else {
        this.switchMode();
        return {};
      }
    });
  };

  switchMode = () => {
    this.stopTimer();
    const newMode = !this.state.isWorkMode;
    // Если newMode === true => это работа (25 минут),
    // если false => это отдых (5 минут).
    const newTime = newMode ? 25 * 60 : 5 * 60;
  
    // Убираем this.forceUpdate(), setState и так перерисует
    this.setState({
      isWorkMode: newMode,
      timeLeft: newTime,
      isTimerRunning: false,
    });
  };
  
  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    const { timeLeft, isWorkMode, isTimerRunning } = this.state;

    return (
      <div>
        <style>{fadeIn}</style>
        <PomodoroContainer>
          <Title>Pomodoro Timer</Title>
          <ModeText>{isWorkMode ? 'Работа' : 'Отдых'}</ModeText>
          <TimeDisplay>{this.formatTime(timeLeft)}</TimeDisplay>
          <div className="pomodoro-controls">
            {!isTimerRunning ? (
              <StartButton onClick={this.startTimer}>Start</StartButton>
            ) : (
              <PauseButton onClick={this.stopTimer}>Pause</PauseButton>
            )}
            <ResetButton onClick={this.switchMode}>Switching The Mode of Tasks</ResetButton>
          </div>
        </PomodoroContainer>
      </div>
    );
  }
}

export default PomodoroTimer;
