import { Box, Paper, Skeleton, Typography } from "@mui/material"
import QueryBuilderSharpIcon from '@mui/icons-material/QueryBuilderSharp';

export type GroupCardLoadingProps = {
  item: number;
};

export const GroupCardLoading: React.FC<GroupCardLoadingProps> = ({ item }) => {
  return (
    <Paper
    variant="outlined"
    sx={{ borderRadius: 2 }}
    key={item}
    >
      <Box>
        <Typography
            variant="h4"
            py="0.5rem"
            bgcolor="primary.main"
            color="background.paper"
            height="24px"
            sx={{ 
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          >
            <Skeleton
              variant="text"
              width="8rem"
              height="1.5rem"
              sx={{
                margin: 'auto',
              }}
            />
          </Typography>
      </Box>
      <Box>
        <Skeleton variant="text" width="80%" height={30} sx={{ mx:"1.5rem", mt:"1rem" }}  />
      </Box>
      <Box>
        <Skeleton variant="text" width="80%" height={30} sx={{ mx:"1.5rem", mt:"1rem" }}  />
      </Box>
      <Box
        display="flex"
        alignContent="center"
        justifyContent="space-between"
        mx="1.5rem"
        mt="1.5rem"
        mb="0.5rem"
      >
        <QueryBuilderSharpIcon color="success" />
        <Skeleton variant="text" width="100%" />
      </Box>
    </Paper>
  );
};
