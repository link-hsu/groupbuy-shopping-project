import React, { useEffect, useState } from "react";
import { Box, Button, Card, Container, IconButton, Modal, Skeleton, Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Product } from "@/state";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import { Link } from "react-router-dom";
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export type CartItem = {
  product_id: number;
  groupbuy_id: number;
  shop_category_id: number | string;
  title: string;
  price: number;
  quantity: number;
};

export interface FilteredTypeProducts extends Product {
  quantity?: number;
}

export type ProductsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  groupbuyId: string;
}

localStorage.getItem('categoryProducts');
localStorage.getItem('shoppingCart');

export const ProductsModal:React.FC<ProductsModalProps> = ({ isOpen, onClose, groupbuyId }) => {
  const uid = localStorage.getItem('uid');
  const { breakpoints }  = useTheme();
  const isSmall = useMediaQuery(breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState<(number | string)[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FilteredTypeProducts[]>([]);
  const [shoppingCart, setShoppingCart] = useState<{ items: CartItem[], totalQuantity: number, totalPrice: number, groupbuyId: string }>({ items: [], totalQuantity: 0, totalPrice: 0, groupbuyId});
  // const [delayRender, setDelayRender] = useState<boolean>(true);
  
  useEffect(() => {
    async function fetchProducts() {
      if (groupbuyId) {
        try {
          const response = await fetch('https://shopstore-groupbuyapidev.openinfo.info/api/groupbuy/detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "partner_id":"0933807030",
              "groupbuy_id": `${groupbuyId}`,
            }),
          });
          const productsData = await response.json();
          
          
          if (productsData && productsData.data && productsData.data.all_shop_list) {
            const allCategories = productsData?.data.all_shop_list.reduce((acc: (number | string)[], curr: any) => {
              if (!acc.includes(curr.shop_category_id)) {
                acc.push(curr.shop_category_id);
              }
              return acc;
            }, []);
            setCategories(allCategories);
            setProducts(productsData?.data.all_shop_list);
            if (categories.length === 0) {
              const filteredData = productsData?.data.all_shop_list.filter((product: FilteredTypeProducts) => product.shop_category_id === allCategories[0]);
              setFilteredProducts(filteredData);
            }
          } else {
            console.log("can not fetch all products' categories ");
          }
        } catch(error) {
          console.log(error);
        }
      }
    }
    fetchProducts();
    // setDelayRender(false);
  }, [groupbuyId, categories.length]);
  
  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
    const category = categories[newValue]; 
    const filtered = products?.filter( product => product.shop_category_id === category);
    setFilteredProducts(filtered);
  };

  const shoppingCartHandler = (id: number, amount: number) => {
    setFilteredProducts((prevfilteredProducts) => {
      const updatedFilteredProducts = [...prevfilteredProducts];
      const clickCartIndex = updatedFilteredProducts?.findIndex((product) => product.product_id === id);
      const clickCartProduct = prevfilteredProducts[clickCartIndex];

      if (clickCartProduct && clickCartProduct?.quantity) {
        if (clickCartProduct?.quantity === 1 && amount === -1) {
          const { quantity, ...updatedCartProduct } = clickCartProduct;
          updatedFilteredProducts[clickCartIndex] = updatedCartProduct;
        }  else {
          const updatedCartProduct = {
            ...clickCartProduct,
            quantity: clickCartProduct.quantity + amount,
          };
          updatedFilteredProducts[clickCartIndex] = updatedCartProduct;
        }

      } else if(clickCartProduct && amount === 1){
        const updatedCartProduct = {
          ...clickCartProduct,
          quantity: amount,
        };
        updatedFilteredProducts[clickCartIndex] = updatedCartProduct;
      }

      localStorage.setItem('categoryProducts', JSON.stringify(updatedFilteredProducts));

      return updatedFilteredProducts;
    });

    // shopping cart部分
    const clickCartProduct = filteredProducts?.find((product) => product.product_id === id);
    if (clickCartProduct) {
      const { product_id, groupbuy_id, shop_category_id, title, price } = clickCartProduct;


      setShoppingCart((prevCart) => {
        let updatedCartProducts = [...prevCart.items];
        const existingProductIndex = updatedCartProducts.findIndex((product) => product.product_id === id);
        const existingProduct = updatedCartProducts[existingProductIndex]
        if (existingProduct) {
          if (existingProduct.quantity === 0 && amount === -1) {
            updatedCartProducts = prevCart.items;
          } else {
            const updatedCartProduct = {
              ...existingProduct,
              quantity: existingProduct.quantity + amount,
            }
            updatedCartProducts[existingProductIndex] = updatedCartProduct;
          }

        } else if (amount === 1) {
          const newProduct: CartItem = {
            product_id,
            groupbuy_id,
            shop_category_id,
            title,
            price,
            quantity: amount,
          };
          updatedCartProducts.push(newProduct);
        }

        const totalQuantity = updatedCartProducts.reduce((total, product) => total + product.quantity, 0);
        const totalPrice = updatedCartProducts.reduce((total, product) => total + product.quantity * product.price, 0)

        localStorage.setItem('shoppingCart', JSON.stringify({ items: updatedCartProducts, totalQuantity, totalPrice, groupbuyId }));

        return {
          items: updatedCartProducts,
          totalQuantity: totalQuantity,
          totalPrice: totalPrice,
          groupbuyId
        };
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" 
      disableAutoFocus={true}
      // disableScrollLock
    >
      <Container
        sx={{
          ...modalStyle,
          animation: 'slide-up-fade-in 0.5s forwards',
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          m: 'auto',
          px: 0, // media for md and lg default padding: 24px
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '80vh',
          // maxWidth: '80vh',
        }}
        maxWidth="lg"
      >
        {filteredProducts && 
        <Box
          borderBottom="1px solid black"
          width="100%"
          display="flex"
          justifyContent="space-around"
          alignContent="center"
          mb="2rem"
          // sx={(theme) => ({
          //   backgroundColor: theme.palette.primary.main,
          // })}
        >
          <Typography
            variant="h2"
            component="div"
          >
            總金額: <Typography variant="h2" color="red" display="inline-block" m="1rem">$ {shoppingCart.totalPrice.toLocaleString()}</Typography>
          </Typography>
          <Link
            style={{
              pointerEvents: shoppingCart.totalQuantity === 0 ? "none" : undefined,
            }}
            to="/checkout"
          >
            <Button
              variant="contained"
              startIcon={ uid ? <AddShoppingCartSharpIcon /> : <ContactEmergencyOutlinedIcon />}
              size="large"
              disabled={ shoppingCart.totalQuantity === 0 }
              sx={{
                background: '#51c147',
                m: "1rem",
                fontSize: "1rem",
              }}
            >
              <KeyboardReturnOutlinedIcon />
              { uid ? '結帳去' : '請先登入line帳號' }
            </Button>
          </Link>
        </Box>}
        {!filteredProducts ? 
            <Stack
              spacing={1}
              my="2rem"
              sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
            >
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="text" width={210} sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" width={210} sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" width={210} sx={{ fontSize: '1rem' }} />
            </Stack> :
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#ee4747",
                }
              }}
              centered
              sx={(theme) => ({
                ".Mui-selected": {
                  color: theme.palette.grey[800],
                },
              })}
            >
              {categories.map((category, index) => (
                <Tab
                  key={category}
                  label={category}
                  value={index}
                  sx={(theme) => ({
                    fontSize: '1.75rem',
                    color: theme.palette.grey[800],
                  })}
                />
              ))}
            </Tabs>
            <Box
              sx={{
                display: isSmall ? 'flex' : 'grid',
                flexDirection: isSmall ? 'column' : undefined,
                gridTemplateColumns: `${isSmall ? undefined : 'repeat(auto-fit, minmax(300px, 1fr))'}`,
                gap: "0.5rem",
                mb: "2.5rem"
              }}
              maxWidth="lg"
            >
              {filteredProducts.map((product, index) => (
                product.limit_total_product_amount < product.practice_order_amount ?
                (<Card 
                  elevation={2}
                  key={index}
                  sx={(theme) => ({
                  p: '1rem',
                  textAlign: 'center',
                  border: `2px solid ${theme.palette.grey[50]}`,
                  display: isSmall ? 'flex': undefined,
                  width: isSmall ? '100vw' : undefined,
                  backgroundColor: theme.palette.secondary.light,
                  position: 'relative',
                  zIndex: '100',
                })}>
                  <img
                    style={{
                      height: isSmall ? '100%' : '50%',
                      width: isSmall ? '30%' : '100%',
                      objectFit: 'cover',
                      margin: isSmall ? 'auto' : undefined
                    }}
                    src={`https://shopstore-dashboarduploaddev.openinfo.info${product.image}`}
                    alt="image"
                  />
                  <Box sx={{ flexGrow: isSmall ? 1 : undefined }}
                  >
                    <Typography variant="h2" fontWeight={600} py="0.25rem" px="0.5rem">
                      {product.title}
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      已賣出: {product.practice_order_amount}/{product.limit_total_product_amount} 組
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      {product.description}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py="0.25rem"
                      pl="0.5rem"
                      pr={`${isSmall ? '4rem' : '0.25rem'}`}
                      mt="3rem"
                    >
                      <Typography variant="h4">$ {product.price.toLocaleString()}</Typography>
                      {isSmall && 
                      <Typography
                        textAlign="left"
                        variant="h4"
                        color="red"
                      >
                        已購買 $ {product?.quantity ? (product.price * product.quantity).toLocaleString() : 0}
                      </Typography>}
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <IconButton
                            color="warning"
                            onClick={() => shoppingCartHandler(product.product_id, -1)}
                          >
                            <RemoveCircleRoundedIcon />
                          </IconButton>
                          <Typography variant="h4"  p="0.5rem">
                            {product.quantity ? product.quantity : 0}
                          </Typography>
                          <IconButton
                            color="warning"
                            onClick={() => shoppingCartHandler(product.product_id, +1)}
                          >
                            <AddCircleRoundedIcon/>
                          </IconButton>
                        </Box>
                      </Box>              
                    </Box>
                    {!isSmall && 
                    <Typography
                      textAlign="left"
                      variant="h4"
                      color="red"
                    >
                      已購買 $ {product?.quantity ? (product.price * product.quantity).toLocaleString() : 0}
                    </Typography>}
                </Card>) :
                (<Card 
                  elevation={2}
                  key={index}
                  sx={(theme) => ({
                  p: '1rem',
                  textAlign: 'center',
                  border: `2px solid ${theme.palette.grey[50]}`,
                  display: isSmall ? 'flex': undefined,
                  width: isSmall ? '100vw' : undefined,
                  backgroundColor: theme.palette.secondary.light,
                  position: 'relative',
                  zIndex: '100',
                })}>
                  <img
                    style={{
                      height: isSmall ? '100%' : '50%',
                      width: isSmall ? '30%' : '100%',
                      objectFit: 'cover',
                      margin: isSmall ? 'auto' : undefined,
                      opacity: '0.25',
                    }}
                    src={`https://shopstore-dashboarduploaddev.openinfo.info${product.image}`}
                    alt="image"
                  />
                  <Box sx={{ flexGrow: isSmall ? 1 : undefined, opacity: '0.25' }}
                  >
                    <Typography variant="h2" fontWeight={600} py="0.25rem" px="0.5rem">
                      {product.title}
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      已賣出: {product.practice_order_amount}/{product.limit_total_product_amount} 組
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      {product.description}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py="0.25rem"
                      pl="0.5rem"
                      pr={`${isSmall ? '4rem' : '0.25rem'}`}
                      mt="3rem"
                    >
                      <Typography variant="h4">$ {product.price}</Typography>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color="warning"
                          disabled
                          
                        >
                          <RemoveCircleRoundedIcon />
                        </IconButton>
                        <Typography variant="h4"  p="0.5rem">
                          {product.quantity ? product.quantity : 0}
                        </Typography>
                        <IconButton
                          color="warning"
                          disabled
                          onClick={() => shoppingCartHandler(product.product_id, 1)}
                        >
                          <AddCircleRoundedIcon/>
                        </IconButton>
                      </Box>
                    </Box>              
                  </Box>
                  <Typography
                    position="absolute"
                    top="50%"
                    left="50%"
                    color="red"
                    variant="h3"
                    letterSpacing={3}
                    border="2px solid red"
                    fontSize="2rem"
                    sx={{
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    銷售一空
                  </Typography>
                </Card>)                
              ))}
            </Box>          
          </>}
      </Container>
    </Modal>
  );
};
