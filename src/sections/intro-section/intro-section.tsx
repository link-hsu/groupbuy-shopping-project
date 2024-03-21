import { SectionIdEnum } from "@/types";
import {
  Box,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';
import { NewsAccordion } from "./components/news-accordion.component";
import { BackgroundCarousel } from './components/background-carousel.component';

export const Introsection: React.FC = () => {
  const { palette, breakpoints }  = useTheme();
  const isSmall = useMediaQuery(breakpoints.down('sm'));

  return (
    <>
      <BackgroundCarousel />
      <Container
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems:'center',
          position: 'relative',
          zIndex: 1,
          flexDirection: 'column',
          pt: '3rem',
        }}
      >
        <NewsAccordion />
        <Box
          sx={{ position: 'relative', zIndex: 1, display: 'block' }}
        >
          <AnchorLink
            href={`#${SectionIdEnum.products}`}
            offset={isSmall ? '62px' : '66px'}
            className="all_unset"
          >
            <Button
              size="large"
              variant="contained"
              sx={{
                color: palette.background.paper,
                mt: 5,
                minWidth: '200px',
              }}
            >
              <ShoppingCartCheckoutTwoToneIcon
                sx={{ my: 'auto', mr: 2.5 }}
              />
              Shop Now
            </Button>
          </AnchorLink>
        </Box>
      </Container>
    </>  
  );
};
