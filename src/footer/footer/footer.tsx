import { Box, Container, Paper, Typography } from "@mui/material";
import GrassIcon from '@mui/icons-material/Grass';

export const Footer: React.FC = () => {
  return (
    <Paper
      component="footer"
      square
      variant="outlined"
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.light
      })}
    >
      <Container maxWidth="lg">
        <Box
          textAlign="center"
          mt="0.5rem"
        >
          <GrassIcon />
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2024. 國軍807嚴選
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
