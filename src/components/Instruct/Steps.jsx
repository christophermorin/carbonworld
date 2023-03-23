import { List } from "@mui/material"
import StepsItem from "./StepsItem"
export default function Steps() {
  return (
    <List sx={{ color: 'white' }}>
      <StepsItem text={'Mouse Wheel to zoom'} />
      <StepsItem text={'Hold to drag'} />
      <StepsItem text={'Select Regions'} />
      <StepsItem text={'Submit for results'} />
    </List>
  )
}