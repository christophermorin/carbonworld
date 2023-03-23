import { ListItem, Typography } from "@mui/material"
export default function StepsItem({ text }) {
  return (
    <ListItem disableGutters>
      <Typography variant="caption">
        {text}
      </Typography>
    </ListItem>
  )
}