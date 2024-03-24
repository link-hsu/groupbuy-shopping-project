import {
  Box,
  useTheme,
  useMediaQuery,
  Card,
  TextField,
  Button,
  Typography,
} from "@mui/material"
import { memberBackground } from "@/assets";
import { useCallback, useState } from "react";
import { loginButton } from "@/assets";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const lineLoginLink = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2004143512&redirect_uri=https://link-hsu.github.io/groupbuy-shopping-project&state=login&scope=openid%20profile%20email";

export type inputType = {
  lineId: string;
  userName: string;
  phone: string;
  email: string;
  address: string;
}

const inputItems = [
  { name: "Line暱稱", id: 'lineId'},
  { name: "姓名", id: 'userName'},
  { name: "手機號碼", id: 'phone'},
  { name: "Email", id: 'email'},
  { name: "取貨地址", id: 'address'},
];

export const MemberSection: React.FC = () => {
  const { breakpoints } = useTheme();
  const isSmall = useMediaQuery(breakpoints.down('sm'));
 
  const queryParams = new URLSearchParams(window.location.search);
  const state = queryParams.get('state');
  const code = queryParams.get('code');
  
  const [uidLogin, setUidLogin] = useState<{isLogin: boolean, uid: string}>({
    isLogin: false,
    uid: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<inputType>({
    lineId: '',
    userName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [memberInfoState, setMemberInfoState] = useState<string>('');
  const [loginData, setLoginData] = useState<{lineId: string, email: string}>({
    lineId: '',
    email: '',
  });

  const getAuth = useCallback( async () => {
    const code = queryParams.get('code') as string;
    localStorage.setItem('code', code);
    
    try {
      const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${code}&client_id=2004143512&client_secret=5b61b75b88cbc8591a0e6762c4cd176b&redirect_uri=https://link-hsu.github.io/groupbuy-shopping-project`,
      });

      let tokenData;
      if (!tokenResponse.ok) {
        throw new Error("Error occur for fetching token");
      } else {
        tokenData = await tokenResponse.json();
        localStorage.setItem('tokenData', JSON.stringify(tokenData));
      }

      let id_token;
      if (!tokenData || !tokenData.id_token) {
        throw  new Error("No id_token found in tokenData");
      } else {
        id_token = tokenData.id_token;
        localStorage.setItem('id_token', id_token);
        const uidResponse = await fetch('https://api.line.me/oauth2/v2.1/verify', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `id_token=${id_token}&client_id=2004143512`,
        });

        if (!uidResponse.ok) {
          throw new Error("Error occur for fetching uid")
        } else {
          const uidData = await uidResponse.json();
          localStorage.setItem('uidData', JSON.stringify(uidData));
          const uid = uidData.sub;
          const email = uidData.email;
          const name = uidData.name;
          localStorage.setItem('uid', uid);
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
          setUidLogin(() => ({
            isLogin: true,
            uid,
          }));
          setLoginData(() => ({
            lineId: name,
            email,
          }));
          setUserInput((prevData) => ({
            ...prevData,
            lineId: name,
            email,
          }))
        }
      }

      if (!tokenData || !tokenData.access_token) {
        throw new Error("No access_token found in tokenData")
      } else {
        const profileResponse = await fetch('https://api.line.me/v2/profile', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          },
        });
        
        if (!profileResponse.ok) {
          throw new Error("Error occur for fetching profile")
        } else {
          const profileData = await profileResponse.json();
          localStorage.setItem("profileData", profileData);
        }
      }

    } catch(error) {
      console.log(error);
    }
  }, []);

  if (!uidLogin.isLogin) {
    if (code && state) {      
      if (localStorage.getItem('uid')) {
        setUidLogin(() => ({
          isLogin: true,
          uid: localStorage.getItem('uid') as string,
        }));
        setLoginData(() => ({
          lineId: localStorage.getItem('name') as string,
          email: localStorage.getItem('email') as string,
        }));
        setUserInput((prevData) => ({
          ...prevData,
          lineId: localStorage.getItem('name') as string,
          email: localStorage.getItem('email') as string,
        }));
      } else {
        getAuth();
      }
    } else if(localStorage.getItem('uid')) {
      setUidLogin(() => ({
        isLogin: true,
        uid: localStorage.getItem('uid') as string,
      }));
      setLoginData(() => ({
        lineId: localStorage.getItem('name') as string,
        email: localStorage.getItem('email') as string,
      }));
      setUserInput((prevData) => ({
        ...prevData,
        lineId: localStorage.getItem('name') as string,
        email: localStorage.getItem('email') as string,
      }));
    } 
  } 
  
  const handleInputChange = (identifier: string, newValue: string) => {
    setUserInput((prevInput) => (
     {
       ...prevInput,
       [identifier]: newValue
     }
    ));
   };
   
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      setLoginData(() => ({
        lineId: userInput.lineId,
        email: userInput.email,
      }));
      try {
        const checkMemberRegister = await fetch('https://shopstore-groupbuyapidev.openinfo.info/api/groupbuy/checkuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "partner_id":"09",
            "line_uid": uidLogin.uid,
          }),
        });

        if (!checkMemberRegister.ok) {
          throw new Error("Error occur for check auth");
        } else {
          const memberRegisterData = await checkMemberRegister.json();
          console.log("memberRegisterData");
          console.log(memberRegisterData);
          const updateMemberinfo = await fetch('https://shopstore-groupbuyapidev.openinfo.info/api/groupbuy/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "partner_id": userInput.phone,
              "nick_name": userInput.lineId,
              "real_name": userInput.userName,
              "sex": 1,
              "email": userInput.email,
              "line_uid": uidLogin.uid,
              "birthday": "1992",
              "mobile": "09",
              "address": userInput.address,
            }),
          });
          console.log("updateMemberinfo");
          console.log(updateMemberinfo);
          if (!updateMemberinfo.ok) {
            setMemberInfoState('系統更新錯誤');
            throw new Error("Error occur for update member info")
          } else {
            const updateResult = await updateMemberinfo.json();
            console.log("updateResult");
            console.log(updateResult);
            if (!memberRegisterData?.success) {
              setMemberInfoState('會員註冊成功');
            } else if (memberRegisterData?.success && updateResult?.success) {
              setMemberInfoState('會員資料更新成功');
            } else {
              setMemberInfoState('會員更新失敗');
            }
          }
        }
      } catch(error) {
        console.log(error);
      }
    }
    setIsEditing((prevEdit) => !prevEdit);
  }, [isEditing, userInput, uidLogin]);
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={!uidLogin.isLogin ? "column" : undefined}
      sx={(theme) => ({
        background: `linear-gradient(115deg, ${theme.palette.primary.light} ${isSmall ? '40%' : '30%'}, transparent ${isSmall ? '40%' : '30%'}) center center / 100% 100%, url(${memberBackground}) ${isSmall ? '70%' : 'right'} center / auto 100%`,
        // backgroundSize: 'cover',
        height: '100vh',
        opacity: 0.75,
        position: 'realtive',
      })}
    >
      {uidLogin.isLogin ?
      <Card sx={(theme) => ({
        border: !isSmall ? `2.5px solid ${theme.palette.primary.mellow}` : undefined,
        py: 2,
        width: isSmall ? '100%' : undefined,
      })}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h3" textAlign="center" my="1rem">
            會員資料
          </Typography>
            {inputItems.map((item) => (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={0.5}
                m={isSmall ? "auto" : '0.5rem'}
                mx={isSmall ? "auto" : undefined}
                my="0.75rem"
                key={item.id}
              >
                <Typography minWidth="50px">{item.name}</Typography>
                {isEditing ?
                <TextField 
                    label={item.name}
                    name={item.name}
                    onChange={(event) => handleInputChange(item.id, event.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    fullWidth
                    sx={{
                      mb: 1,
                      width: '250px',
                      fontSize: 'large',
                      letterSpacing: 'inherit'
                    }}
                    value={userInput[item.id as keyof inputType]}
                    // error={emailError}
                /> :
                <Typography
                  variant="h4"
                  borderBottom="2px solid #31AF35"
                  textAlign="center"
                  sx={{
                    mb: 1,
                    mx: 2,
                    width: "250px"
                  }}
                >
                  {userInput[item.id as keyof inputType]}
                </Typography>
                }
              </Box>            
            ))}
            <Button 
              variant="outlined"
              type="submit"
              sx={{
                color: "background.paper",
                bgcolor: "primary.mellow",
                fontSize: 16,
                letterSpacing: 16,
                m: 2.5,
                '&:hover': {
                  backgroundColor: "#1c7a5b",
                }
              }}
            >
              修改會員資料
            </Button>
            {!isEditing &&
            <Typography
              textAlign="center"
              color="red"
              variant="h4"
            >
              {memberInfoState}
            </Typography>}
          </form>
      </Card> :
      <Button
        variant="outlined"
        href={lineLoginLink}
        sx={(theme) => ({
          py: "0.75rem",
          fontSize: "24px",
          color: "black",
          textAlign: 'center',
          display: isSmall ? 'flex' : undefined,
          flexDirection: isSmall ? 'column' : undefined,
          '&:hover' : {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.grey[700]}`
          }
        })}
      >  
        <img src={loginButton} alt="loginButton" />
        {isSmall ?
        <KeyboardDoubleArrowUpIcon
          fontSize="large"
          sx={{ my: '0.75rem' }}
        /> :
        <ArrowCircleLeftIcon
          fontSize="large"
          sx={{ mx: '0.75rem' }}
        />}
        輕鬆透過Line帳號註冊/登入會員
      </Button>}
    </Box> 
  );
};
