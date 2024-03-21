import { redirect } from 'react-router-dom';

export const loader = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  if (code) {
    localStorage.setItem('code', code);
  }

  try {
    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&code=${code}&client_id=2004143512&client_secret=5b61b75b88cbc8591a0e6762c4cd176b&redirect_uri=https://link-hsu.github.io/groupbuy-shopping-project/auth`,
    });
    const tokenData = await tokenResponse.json();

    let id_token: string | null = null;
    if (tokenData) {
      id_token = tokenData.id_token;
      
      localStorage.setItem('tokenData', JSON.stringify(tokenData));
      if (id_token) {
        localStorage.setItem('id_token', id_token);
      }
    } else {
      console.log("fail to fetch id_token");
    }

    
    if (id_token) {
      const uidResponse = await fetch('https://api.line.me/oauth2/v2.1/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id_token=${id_token}&client_id=2004143512`,
      });
      const uidData = await uidResponse.json();
      
      let uid: string | null = null;
      uid = uidData.sub;
      if (uid && uidData) {
        localStorage.setItem('uidData', JSON.stringify(uidData));
        localStorage.setItem('uid', uid);
      } else {
        console.log("fail to fetch uid")
      }  
    } else {
      console.log("fail to fetch uidData");
    }
    
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      },
    });
    const profileData = await profileResponse.json();

    const email = profileData.email;
    const address = profileData.address;
    const phone = profileData.phone;

    localStorage.setItem('email', email);
    localStorage.setItem('address', address);
    localStorage.setItem('phone', phone);
  } catch(error) {
    console.log(error);
  }
  
  return redirect('/');
};
