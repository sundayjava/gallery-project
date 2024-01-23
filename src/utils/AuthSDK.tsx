export default function AuthSDK() {
  const baseUrl = "http://localhost:2240/api/";

  const login = async function (email: string, password: string) {
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  };

  const register = async function(fullName:string, email:string, password:string) {
    const response = await fetch(`${baseUrl}auth/signup`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({fullName, email, password})
    });

    if(!response.ok){
        const err = await response.json()
        throw new Error('Error registering user '+err.message)
    }

    const data = await response.json()
    return data
  }

  const check = async function (token: string) {
    const response = await fetch(`${baseUrl}auth/active/user`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Other-Cookie': 'value',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const data = await response.json();
    return data;
  };

  return { check, login, register };
}
