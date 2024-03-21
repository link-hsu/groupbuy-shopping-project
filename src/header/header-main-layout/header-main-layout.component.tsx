import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AnchorLink from 'react-anchor-link-smooth-scroll';
// import { logoImg } from "@/assets";
import GrassIcon from '@mui/icons-material/Grass';
import { SectionIdEnum } from "@/types";
import { Navigation } from './navigation/navigation.component';

export type HeaderMainLayoutProps = {
  children: React.ReactNode;
};

export const HeaderMainLayout: React.FC<HeaderMainLayoutProps> = ({ children }) => {
  const { breakpoints, palette } = useTheme();
  
  const isSmall = useMediaQuery(breakpoints.down('sm'));
  
  return (
    <Box>
      <AppBar position="fixed" elevation={2} sx={{bgcolor: palette.primary.light}}>
        <Toolbar>
          <Box flexGrow={1}>
            <AnchorLink
              href={`#${SectionIdEnum.intro}`}
              offset={isSmall ? '62px' : '66px'}
              className="all_unset"
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{ cursor: "pointer", py: '4px' }}
                gap={1}
              >
                <Avatar
                  // src={logoImg}
                  alt="Logo Image"
                  sx={{
                    width: isSmall ? '50px' : '54px',
                    height: isSmall ? '50px' : '54px',
                    border: `2px solid ${palette.primary.mellow}`,
                    bgcolor: palette.background.paper,
                    '&:hover': { boxShadow: 4}
                  }}
                >
                  <GrassIcon
                    sx={(theme) =>({
                      color: theme.palette.primary.dark, fontSize: '2.5rem'
                    })}
                  />
                </Avatar>
                <Typography variant="h2" color="background.paper" sx={{ width: 'fit-content' }}>
                  國軍807嚴選
                </Typography>
              </Box>
            </AnchorLink>
          </Box>
          <Navigation isSmall={isSmall} />
        </Toolbar>
      </AppBar>
      <Box>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
