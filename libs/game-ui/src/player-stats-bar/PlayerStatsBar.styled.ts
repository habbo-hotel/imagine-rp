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
    padding: 5px;
    margin-top: ${({ theme }) => theme.space.halfUnit};
    width: 200px;
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
    background: linear-gradient(to right, #00e676, #1b5e20);
    width: 41.33%; /* Example percentage based on your image (62/150) */
  }
  .energy {
    background: linear-gradient(to right, #00b0ff, #01579b);
    width: 55%; /* Example percentage based on your image (115/209) */
  }
`

