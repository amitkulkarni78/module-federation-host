import React,  { Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useShareState } from './store/store';
//mport RootState from "remote/store";
import { useSelector, useDispatch } from "react-redux";
import { setCounter , handleOpenNavMenu, handleCloseNavMenu } from "remote/store"; 
import store from "remote/store";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type RootState = ReturnType<typeof store.getState>;

const RemoteApp = React.lazy(() => import('remote/App'));
const ProductsApp = React.lazy(() => import('products/Products'));

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const CartDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));


function App() {
  const { count , setCount } = useShareState();
  console.log("store", store.getState());
  const count1 = useSelector((state: RootState) => state.counter.count);
  //const anchorElNav = useSelector((state: RootState) => state.nav.anchorElNav) || null;
  const dispatch = useDispatch();

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openCart, setCartOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCartDrawerOpen = () => {
    setCartOpen(true);
  };

  const handleCartDrawerClose = () => {
    setCartOpen(false);
  };


  return (
    <div>
      <Box sx={{display: 'flex'}}>
      
          
        <AppBar position="fixed" open={open} sx={{ zIndex: 0}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="navigation-drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" role="heading" aria-level={1}>
            Persistent drawer
          </Typography>
          <IconButton
             color="inherit"
             aria-label="Open cart menu"
             aria-expanded={openCart}
             aria-controls="cart-drawer"
             onClick={handleCartDrawerOpen}
             edge="end"
             sx={[
               {
                 mr: 2,
                 float:'right'
               },
               open && { display: 'none' },
             ]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
          
        
        
        <Drawer    
         sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => handleDrawerClose()}>
          <DrawerHeader sx={{ dispaly: 'flex', justifyContent: 'flex-start'}}>
          <IconButton 
            onClick={handleDrawerClose}
            aria-label="Close navigation menu"
          >
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
          <List>
            <ListItem> Home </ListItem>
          </List>
        </Drawer>
         <Main open={open} style={{ justifyContent: "center", width: "100%", marginTop: '50px'}}>
         <DrawerHeader />
         <Container > 
           <Grid direction={"row"}>

            <Grid columns={1}>
            <div style={{ display: "flex", flexDirection: "row", width: "100%"}}>
      {/*   Count - {count1}
        <Button 
          onClick={() => dispatch(setCounter(count1 + 1))} 
          variant="contained"
          aria-label="Increment counter"
        > 
          click me 
        </Button> */}
        <div className='bg-red-300' >
        <Suspense fallback={<div>Loading Remote App...</div>}>
        <RemoteApp />
      </Suspense>
       
        </div>
       
        </div>
            </Grid>
            <Grid columns={1}>
            <Suspense fallback={<div>Loading Remote App...</div>}>
       {/*  <ProductsFilter /> */}
       </Suspense>
            </Grid>
            <Grid columns={1}>
            
            <div >
        <Suspense fallback={<div>Loading Remote App...</div>}>
        <ProductsApp />
       </Suspense>
        </div>
 
            </Grid>
           </Grid>
         </Container>
         
         </Main>

         <Drawer    
         sx={{
          width: drawerWidth,
          position: 'fixed',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          }
        }}
        variant="persistent"
        anchor="right"
        open={openCart}
        onClose={() => handleCartDrawerClose()}>
          <CartDrawerHeader>
          <IconButton 
            onClick={handleCartDrawerClose}
            aria-label="Close cart menu"
          >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </CartDrawerHeader>
        <Divider />
          <List>
            <ListItem> Home </ListItem>
          </List>
        </Drawer>
       
       
       </Box>
    
    </div>
  );
}

export default App;
