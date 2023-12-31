import styled from "styled-components";
import { Progress } from "../progress/Progress";

export const HealthProgress = styled(Progress)`
  background: #a82234 !important;
  &&[value]::-webkit-progress-value {
    background: #a82234 !important;
  }
`

export const EnergyProgress = styled(Progress)`
  background: #22a83f !important;
  &&[value]::-webkit-progress-value {
    background: #22a83f !important;
  }
`

export const HungerProgress = styled(Progress)`
  background: #22a83f !important;
  &&[value]::-webkit-progress-value {
    background: #22a83f !important;
  }
`

export const ArmorProgress = styled(Progress)`
  background: #a86022 !important;
  &&[value]::-webkit-progress-value {
    background: #a86022 !important;
  }
`
