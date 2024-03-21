import { Box, Card, Typography } from "@mui/material";
import QueryBuilderSharpIcon from '@mui/icons-material/QueryBuilderSharp';
import { GroupData } from '@/state';

export type GroupCardProps = {
  isGroupValid: boolean | null;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  setGroupbuyIdState: React.Dispatch<React.SetStateAction<string>>;
  item: GroupData;
};

export const GroupCard: React.FC<GroupCardProps> = ({ isGroupValid, setOpenState, setGroupbuyIdState, item}) => {

  const handleOpen = () => {
    setGroupbuyIdState(item.groupbuy_id)
    setOpenState(true);
  };

  return (
    <Card
      elevation={2}
      sx={{ cursor: 'pointer', borderRadius: 2, position: 'relative' }}
      key={item.id}
      onClick={isGroupValid ? handleOpen : undefined}
    >
      <Box>
        <Typography
          variant="h4"
          textAlign="center"
          py="0.5rem"
          bgcolor="primary.main"
          color="background.paper"
          sx={{ 
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          {item.title}
        </Typography>
      </Box>
      {isGroupValid ?
        <>
          <Box>
            <Typography variant="h5" mx="1.5rem" mt="1.5rem" mb="5rem">
              {item.description ? item.description : "No Content"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignContent="center"
            justifyContent="space-between"
            position="absolute"
            left="1.5rem"
            bottom={0}
          >
            <QueryBuilderSharpIcon color="success" />
            <Typography>{`團購期間: ${item.start_at} ~ ${item.end_at}`}</Typography>
          </Box>
        </> :
        <>
          <Box sx={{ opacity: "0.25" }}>
            <Typography variant="h5" px="1.5rem" pt="1.5rem" pb="5rem">
              {item.description ? item.description : "No Content"}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignContent="center"
            justifyContent="space-between"
            position="absolute"
            left="1.5rem"
            bottom={0}
            sx={{ opacity: "0.25" }}
          >
            <QueryBuilderSharpIcon color="success" />
            <Typography>
              {`團購期間: ${item.start_at} ~ ${item.end_at}`}
            </Typography>
          </Box>
          <Typography
            position="absolute"
            top="50%"
            left="50%"
            color="red"
            variant="h3"
            letterSpacing={3}
            border="2px solid red"
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            團購已逾期
          </Typography>
        </>              
      }
    </Card>
  );
};
