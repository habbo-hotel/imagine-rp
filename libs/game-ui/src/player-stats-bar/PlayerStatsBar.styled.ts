import styled from "styled-components";

export const PlayerStatsBarElement = styled.div`
  align-items: center;
  pointer-events: auto; 
  display: flex;
  gap: ${({ theme }) => theme.space.halfUnit};
  height: fit-content;
  margin-right: ${({ theme }) => theme.space.oneUnit};
  
  .progress-container {
    background-color: ${({ theme }) => theme.color.s30};
    border-radius: 10px;
    padding: 5px;
    width: 200px;
    margin: 10px 0;
  }
  .progress {
    width: 100%;
    background: ${({ theme }) => theme.color.s30};
    border-radius: 8px;
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

