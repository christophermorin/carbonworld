import { Box, Button } from "@mui/material"
export default function SubmitButton({ handleSubmit }) {
  return (
    <Box
      display={'flex'}
      justifyContent="flex-start"
    >
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          background: 'rgba(32,190,190,0.6)',
          '&:hover': {
            background: 'rgba(32,190,190,0.9)'
          }
        }}
      >
        Submit
      </Button>
    </Box>
  )
}