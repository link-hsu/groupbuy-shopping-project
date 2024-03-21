import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography
} from "@mui/material"
import {
  Link,
  json,
  redirect,
  useNavigate,
  useActionData,
  useNavigation,
  Form,
} from "react-router-dom";
import { CartItem } from "@/sections";
import React, { useEffect, useState } from "react";


export type InputType = {
  name: string;
  phone: string | null;
  address: string | null;
  email: string;
}

export const CheckoutForm: React.FC = () => {

  const navigate = useNavigate();
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    if (!uid) {
      navigate('/');
    }
  }, []);

  const data: any = useActionData();
  const navigation = useNavigation();
  
  const uidData: string | null = localStorage.getItem('uidData');
  let parsedUidData;
  let email;
  let name;
  if (uidData) {
    parsedUidData = JSON.parse(uidData);
    email = parsedUidData.email;
    name = parsedUidData.name;
  }

  const [userInput, setUserInput] = useState<InputType>({
    name: name ?? '',
    phone: '',
    address: '',
    email: email ?? '',
  });
  
  const shoppingCart = localStorage.getItem('shoppingCart');
  let items: { items: CartItem[], totalQuantity: number, totalPrice: number, groupbuyId: string } = { items: [], totalQuantity: 0, totalPrice: 0, groupbuyId: '' };
  let groupbuyId;
  let orderItem;
  if (shoppingCart) {
    items = JSON.parse(shoppingCart);
    groupbuyId = items.groupbuyId;
    orderItem = items.items.map((product) => ({
      product_id: product.product_id,
      qty: product.quantity,
    }));
    orderItem = JSON.stringify(orderItem);
  }

  const inputChangeHandler = (identifier: string, newValue: string) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      [identifier]: newValue,
    }
   ));
  };

  const cancelHandler = () => {
    navigate('/');
  }
  
  // const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const form = event.target as HTMLFormElement;
  //     const data = new FormData(form);
  //     const orderItemString = data.get('orderItem');
  //     if (!orderItemString) {
  //       throw new Error("orderItem missing");
  //     }
  //     let order_Item;
  //     if (typeof orderItemString === 'string') {
  //       order_Item = JSON.parse(orderItemString);
  //     } else {
  //       throw new Error("typeof orderItemString is not a string, maybe a file");
  //     }
      
  //     const orderData = {
  //       "partner_id": data.get('phone'),
  //       "user_id": data.get('uid'),
  //       "groupbuy_id": data.get('groupbuyId'),
  //       "receive_address": data.get('address'),
  //       "receive_email": data.get('email'),
  //       "receive_name": data.get('name'),
  //       "receive_phone": data.get('phone'),
  //       "pay_type": 4,
  //       "orderItem": order_Item
  //     };

  //     const url = 'https://shopstore-groupbuyapidev.openinfo.info/api/groupbuy/createorder';
      
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(orderData),
  //     });
  //     if (!response.ok) {
  //       console.log("order fail");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   navigate('/');
  // };
  
  const isSubmitting = navigation.state === 'submitting';

  
  return (
    <Container
      maxWidth="sm"
      sx={(theme) => ({
        backgroundColor: theme.palette.grey[100],
        height: '100%',
        py: '3rem',
      })}
    >
      <Typography
        variant="h4"
        textAlign="center"
        p="0.5rem"
      >
        訂單資訊
      </Typography>
      <Divider>
        明細
      </Divider>
      <Card
        variant="outlined"
        sx={{
          m: '1.5rem',
          p: '2rem',
        }}
      >
        {items.items.length ? (
          <Grid
            container
            spacing={2}
            sx={{ textAlign: 'center', mb: '1rem'}}
          >
          {items.items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <Typography>{item.title}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>x {item.quantity} </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  ${(item.price * item.quantity).toLocaleString()}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
          </Grid>)
          :
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: '1.5rem',
            }}
          >
            目前沒有訂單資料，請前往
            <Link to="/"><Button variant="text" size="large" sx={{ fontSize: '1rem'}} disableRipple>商品清單</Button></Link>進行選購。
          </Typography>
        }
        <Divider sx={{ borderBottomWidth: "2px", background: "black" }} />
        <Box display="flex" justifyContent="space-between" mx="3rem" my="0.25rem">
          <Typography sx={{ display: "inline-block" }}>總金額</Typography>
          <Typography sx={{ display: "inline-block" }}>$ {items.totalPrice}</Typography>
        </Box>
      </Card>
      <Divider>
        收貨人資料
      </Divider>
      <Form
        method="POST"
        // onSubmit={submitHandler}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          my="0.15rem"
        >
        <Typography minWidth="35px">姓名</Typography>
          <TextField 
              label="姓名"
              name="name"
              onChange={(event) => inputChangeHandler("name", event.target.value)}
              required
              variant="outlined"
              color="primary"
              type="text"
              sx={{
                mb: 1,
                letterSpacing: 'inherit'
              }}
              value={userInput.name}
          />
          <Typography minWidth="35px" ml={2}>手機</Typography>
          <TextField 
              label="手機"
              name="phone"
              onChange={(event) => inputChangeHandler("phone", event.target.value)}
              required
              variant="outlined"
              color="primary"
              type="text"
              sx={{
                mb: 1,
                minWidth: '180px',
                letterSpacing: 'inherit',
                flexGrow: 1,
              }}
              value={userInput.phone}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={0.5}
          my="0.15rem"
        >
        <Typography minWidth="35px">地址</Typography>
          <TextField 
              label="地址"
              name="address"
              onChange={(event) => inputChangeHandler("address", event.target.value)}
              required
              variant="outlined"
              color="primary"
              type="text"
              fullWidth
              sx={{
                mb: 1,
                letterSpacing: 'inherit'
              }}
              value={userInput.address}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={0.5}
          my="0.15rem"
        >
        <Typography minWidth="35px">Email</Typography>
          <TextField 
              label="Email"
              name="email"
              onChange={(event) => inputChangeHandler("email", event.target.value)}
              required
              variant="outlined"
              color="primary"
              type="text"
              fullWidth
              sx={{
                mb: 1,
                letterSpacing: 'inherit'
              }}
              value={userInput.email}
          />
        </Box>
        <TextField
          name="uid"
          type="hidden"
          value={uid}
          sx={{ display: 'none' }}
        />
        <TextField
          name="groupbuyId"
          type="hidden"
          value={groupbuyId}
          sx={{ display: 'none' }}
        />
        <TextField
          name="orderItem"
          type="hidden"
          value={orderItem}
          sx={{ display: 'none' }}
        />
      
        <Divider sx={{ m: '1rem' }}>
          付款方式 - 現金
        </Divider>
        <Typography fontSize="0.75rem">
          匯款戶名: 莊政琳
        </Typography>
        <Typography fontSize="0.75rem">
          帳號: 國泰世華 013
        </Typography>
        <Typography fontSize="0.75rem">
          匯款資訊: 匯款後請將帳號後五碼及訂購人告知賣方以利對帳
        </Typography>
        <Divider sx={{ m: '1rem' }}>
          訂單備註
        </Divider>
        <TextField
          placeholder="其他備註..."
          fullWidth
          multiline
          maxRows={4}
        />
        <Box display="flex" justifyContent="space-around" my="1rem">
          <Button
            variant="contained"
            size="large"
            sx={{ minWidth: "5rem", textAlign: "center", letterSpacing: "5px"}}
            type="button"
            onClick={cancelHandler}
            disabled={isSubmitting}
          >
            取消 
          </Button>
          <Button
            variant="contained" 
            size="large"
            sx={{ minWidth: "5rem", textAlign: "center", letterSpacing: "5px"}}
            disabled={!userInput.name ||
                      !userInput.phone ||
                      !userInput.address ||
                      !userInput.email}
            type="submit"
          >
            {isSubmitting ? <CircularProgress/> : '送出'}
            {/* 送出 */}
          </Button>
        </Box>
      </Form>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err, index: number) => (
            typeof err === 'string' && <li key={index}>{err}</li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export async function action({ request }: { request: Request }) {
  // const method = request.method;
  const data = await request.formData();
  

  const orderItemString = data.get('orderItem');
  if (!orderItemString) {
    throw new Error("orderItem is missing");
  }
  let orderItem;
  if (typeof orderItemString === 'string') {
    orderItem = JSON.parse(orderItemString);
  } else {
    throw new Error("typeof orderItemString is not a string, maybe a file");
  }
  
  const orderData = {
    "partner_id": data.get('phone'),
    "user_id": data.get('uid'),
    "groupbuy_id": data.get('groupbuyId'),
    "receive_address": data.get('address'),
    "receive_email": data.get('email'),
    "receive_name": data.get('name'),
    "receive_phone": data.get('phone'),
    "pay_type": 4,
    "orderItem": orderItem
  };

  const url = 'https://shopstore-groupbuyapidev.openinfo.info/api/groupbuy/createorder';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/');
}
