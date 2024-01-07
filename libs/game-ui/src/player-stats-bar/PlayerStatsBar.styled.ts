import styled from "styled-components";

export const PlayerStatsBarElement = styled.div`
  align-items: center;
  pointer-events: auto; 
  display: flex;
  height: fit-content;
  margin-right: ${({ theme }) => theme.space.oneUnit};

  .user-container {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    justify-content: center;
    padding: ${({ theme }) => theme.space.halfUnit};

    img {
      background: ${({ theme }) => theme.color.s30};
      border-radius:${({ theme }) => theme.radius.twoUnits};
    }

    h6 {
      text-shadow: ${({ theme }) => `4px 4px 5px ${theme.color.s20}`} !important;
      margin: 4px;
    }
  }
  
  .progress-container {
    background-color: ${({ theme }) => theme.color.s30};
    border-radius:${({ theme }) => theme.radius.oneUnit};
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 8px;
    padding-right: 8px;
    margin-bottom: ${({ theme }) => theme.space.halfUnit};
    width: 150px;
  }
  .progress {
    width: 100%;
    background: ${({ theme }) => theme.color.s30};
    border-radius:${({ theme }) => theme.radius.oneUnit};
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .progress-icon {
    width: 30px;
    text-align: center;
  }
  .progress-bar {
    height: 20px;
    min-width: fit-content !important;
    border-radius: 8px;
    text-align: right;
    padding-right: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.8em;
    white-space: nowrap;
  }

  .health {
    background: linear-gradient(to right, #C62828, #B71C1C);
  }

  .energy {
    background: linear-gradient(to right, #388E3C, #1B5E20);
  }
  
  .hunger {
    background: linear-gradient(to right, #F57C00, #E65100);
  }
  
  .armor {
    background: linear-gradient(to right, #1976D2, #01579B);
  }
`

