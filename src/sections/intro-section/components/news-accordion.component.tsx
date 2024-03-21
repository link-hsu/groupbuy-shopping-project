import {
  Box,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material"
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import React from "react";
import { useGetNewsQuery, useGetQuestionQuery } from "@/state";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={2} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.8rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  maxHeight: '100px',
  overflowY: 'auto',
  '&::-webkit-scrollbar-track': {
    background: '#FFFFFF',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#ADADAD',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar': {
    width: '3px',
  },
}));

export const NewsAccordion: React.FC = () => {
  const { data: newsData, isLoading: newsIsLoading } = useGetNewsQuery({ partner_id: "0933807030" });
  const { data: questData, isLoading: questIsLoading } = useGetQuestionQuery({ partner_id: "0933807030" });
  
  const { palette } = useTheme();
  const [newsExpanded, setNewsExpanded] = React.useState<number | false>(false);
  const [questExpanded, setQuestExpanded] = React.useState<number | false>(false);

  const handleChange =
    (identifier: string, panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (identifier === 'news') {
        setNewsExpanded(newExpanded ? panel : false);
      } else if(identifier === 'quest') {
        setQuestExpanded(newExpanded ? panel : false)
      }   
    };
  return (
    <Paper
    variant="outlined"
    sx={{ bgcolor: palette.primary.main, border: 'none', minWidth: '300px' }}
    >
      <Typography
        textAlign="center"
        fontSize={24}
        my={1}
        color={palette.background.paper}
      >
        最新消息
      </Typography>
      <div>
        {newsIsLoading &&
          <Box bgcolor={palette.background.paper} borderRadius={1}>
            <Skeleton variant="circular" width='10%' sx={{ display: 'inline-block', ml: '10%', mt: "5px" }} />
            <Skeleton variant="text"  sx={{ display: "inline-block", fontSize: '1rem', width: '55%', mx: '10%' }} />
            <Skeleton variant="text" width='80%' height={40} sx={{ m: 'auto' }}/>
            <Skeleton variant="text" width='80%' height={40} sx={{ m: 'auto' }}/>
          </Box>
        }
        {!newsIsLoading && !questIsLoading && newsData?.success && newsData?.data.map((item) => (
          <Accordion
            expanded={newsExpanded === item.hotnews_id}
            onChange={handleChange('news', item.hotnews_id)}
            key={item.hotnews_id}
          >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography variant="h4">{item.hotnews_title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5">
                {item.hotnews_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        {!newsIsLoading && !newsData?.data && 
          <Box bgcolor={palette.background.paper} borderRadius={1}>
            <Typography variant="h4">
              Connection Error
            </Typography>
          </Box>
        }
      </div>
      <Typography
        textAlign="center"
        fontSize={24}
        my={1}
        color={palette.background.paper}
      >
        常見問題
      </Typography>
      <div>
        {questIsLoading &&
          <Box bgcolor={palette.background.paper} borderRadius={1}>
            <Skeleton variant="circular" width='10%' sx={{ display: 'inline-block', ml: '10%', mt: "5px" }} />
            <Skeleton variant="text"  sx={{ display: "inline-block", fontSize: '1rem', width: '55%', mx: '10%' }} />
            <Skeleton variant="text" width='80%' height={40} sx={{ m: 'auto' }}/>
            <Skeleton variant="text" width='80%' height={40} sx={{ m: 'auto' }}/>
          </Box>
        }
        {!newsIsLoading && !questIsLoading && questData?.success && questData?.data.map((item) => (
          <Accordion
            expanded={questExpanded === item.question_id}
            onChange={handleChange('quest', item.question_id)}
            key={item.question_id}
          >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography variant="h4">{item.question_title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5">
                {item.question_content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        {!questIsLoading && !questData?.data && 
          <Box bgcolor={palette.background.paper} borderRadius={1}>
            <Typography variant="h4">
              Connection Error
            </Typography>
          </Box>
        }
      </div>
  </Paper>
  );
};
