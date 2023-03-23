import { Link, Typography } from "@mui/material"
export default function Footer() {
  return (
    <Typography
      variant="caption"
      color="rgba(255,255,255,1)"
    >
      CO2 Data from:
      <div></div>
      <Link href="https://www.kaggle.com/datasets/ulrikthygepedersen/co2-emissions-by-country?resource=download">
        Kaggle
      </Link>
    </Typography>

  )
}