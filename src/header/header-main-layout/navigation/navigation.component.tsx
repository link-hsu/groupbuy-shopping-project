import { SectionIdEnum } from "@/types";
import { Close, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const navigationItems = [
  {
    text: '最新消息',
    to: SectionIdEnum.intro,
  },
  {
    text: '商品清單',
    to: SectionIdEnum.products,
  },
  {
    text: '會員資料',
    to: SectionIdEnum.member,
  },
];

export type NavigationProps = {
  isSmall: boolean;
};


const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Navigation: React.FC<NavigationProps> = ({ isSmall }) => {
  const { palette } =  useTheme();
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => {
   setOpen(true); 
  };
  const onCloseHandler = () => {
    setOpen(false);
  };

  const mappedItems = (
    navigationItems.map(({ text, to }) => (
      <AnchorLink
        key={to}
        href={`#${to}`}
        offset={isSmall ? '62px' : '66px'}
        className="all_unset"
      >
        <Button
          size="large"
          fullWidth={isSmall}
          sx={{
            color: palette.background.paper,
            fontSize: '20px',
            ...(isSmall && {
              '&:hover': {
                bgcolor: 'transparent',
                transition: 'font-size 0.2s ease-in-out',
                fontSize: '1.2rem',
              },
            }),
          }}
          onClick={isSmall ? onCloseHandler : undefined}
        >
          {text}
        </Button>
      </AnchorLink>
    ))
  )
  
  return (
    <>
      {!isSmall &&
        <Box display="flex" gap={2}>
          {mappedItems}
        </Box>}
      {isSmall && 
        <>
          <IconButton onClick={onOpenHandler}>
            <Menu fontSize="large" />
          </IconButton>
          <Dialog
            open={open}
            fullScreen
            fullWidth
            TransitionComponent={Transition}
            hideBackdrop
            PaperProps={{
              sx: {
                boxShadow: 'none',
              },
            }}
          >
            <AppBar position="static" sx={{ bgcolor: palette.background.paper, color: palette.primary.main }}>
              <Toolbar>
                <Typography variant="h3" flexGrow={1}>
                  Menu
                </Typography>
                <IconButton color="inherit" onClick={onCloseHandler}>
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            { open &&
              <Box 
                display="flex"
                flexDirection="column"
                py={3}
                width="100%"
                height="100%"
                sx={{ bgcolor: palette.primary.light }}
              >
              {mappedItems}
            </Box> }
          </Dialog>
        </>
      }
    </>
  );
};
