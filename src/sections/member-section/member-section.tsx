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
import { useState } from "react";
import { loginButton } from "@/assets";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const lineLoginLink = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2004143512&redirect_uri=https://link-hsu.github.io/groupbuy-shopping-project/auth&state=login&scope=openid%20profile%20email";

export type inputType = {
  lineId: string | null;
  userName: string;
  phone: string | null;
  email: string | null;
  address: string | null;
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
  const uid = localStorage.getItem('uid');

  const uidDataString = localStorage.getItem('uidData');
  let uidData: any;
  let lineId: string | null = '';
  let email: string | null = ''; 

  if (uidDataString) {
      uidData = JSON.parse(uidDataString);
      lineId = uidData.name;
      email = uidData.email;
  }
  
  // const [emailError, setEmailError] = useState(false)
  // const [passwordError, setPasswordError] = useState(false)
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<inputType>({
    lineId,
    userName: '',
    phone: '',
    email,
    address: '',
  });
  const [memberInfoState, setMemberInfoState] = useState<string>('');
  
  const handleInputChange = (identifier: string, newValue: string) => {
   setUserInput((prevInput) => (
    {
      ...prevInput,
      [identifier]: newValue
    }
   ));
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      try {
        const checkMemberRegister = await fetch('https://shopstore-groupbuyapidev.openinfo.info/api/groupbuy/checkuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "partner_id":"09",
            "line_uid": uid,
          }),
        });
        
        const memberRegisterData: any = await checkMemberRegister.json();
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
            "line_uid": uid,
            "birthday": "1992",
            "mobile": "09",
            "address": userInput.address,
          }),
        });
        const updateResult = await updateMemberinfo.json();
        console.log("updateResult");
        console.log(updateResult);
        
        if (!updateMemberinfo.ok || !updateResult?.success) {
          if (!checkMemberRegister.ok || !memberRegisterData?.success) {
            setMemberInfoState('會員註冊失敗');
          } else {
            setMemberInfoState('會員更新失敗');
          }
        } else if(updateResult?.success || memberRegisterData?.success) {
          setMemberInfoState('會員資料更新成功');
        } else {
          setMemberInfoState('資料更新錯誤');
        }
      } catch(error) {
        console.log(error);
      }
    }
    setIsEditing((prevEdit) => !prevEdit);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={!uid ? "column" : undefined}
      sx={(theme) => ({
        background: `linear-gradient(115deg, ${theme.palette.primary.light} ${isSmall ? '40%' : '30%'}, transparent ${isSmall ? '40%' : '30%'}) center center / 100% 100%, url(${memberBackground}) ${isSmall ? '70%' : 'right'} center / auto 100%`,
        // backgroundSize: 'cover',
        height: '100vh',
        opacity: 0.75,
        position: 'realtive',
      })}
    >
      {uid ?
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
            <Typography
              textAlign="center"
              color="red"
              variant="h4"
            >
              {memberInfoState}
            </Typography>
          </form>
      </Card> :
      <Button
        variant="outlined"
        href={lineLoginLink}
        sx={(theme) => ({
          py: "0.75rem",
          fontSize: "24px",
          color: "black",
          backgroundColor: theme.palette.contrastThreshold,
          '&:hover' : {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.grey[700]}`
          }
        })}
      >  
        <img src={loginButton} alt="loginButton" />
        <ArrowCircleLeftIcon
          fontSize="large"
          sx={{ mx: '0.75rem' }}
        />
        輕鬆透過Line帳號註冊/登入會員
      </Button>}
    </Box> 
  );
};
