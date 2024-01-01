import styled from "styled-components";
import { Progress } from "../progress/Progress";

export const HealthProgress = styled(Progress)`
  background: #C62828;
  &&[value]::-webkit-progress-value {
    background: #C62828;
  }
`

export const EnergyProgress = styled(Progress)`
  background: #2E7D32;
  &&[value]::-webkit-progress-value {
    background: #2E7D32;
  }
`

export const HungerProgress = styled(Progress)`
  background: #FFC107;
  &&[value]::-webkit-progress-value {
    background: #FFC107;
  }
`

export const ArmorProgress = styled(Progress)`
  background: #0277BD;
  &&[value]::-webkit-progress-value {
    background: #0277BD;
  }
`
