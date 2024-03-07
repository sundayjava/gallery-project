import Cookies from "js-cookie";

export default function AuthSDK() {
  const baseUrl = "http://localhost:2240/api/";

  const login = async function (email: string, password: string) {
    const response = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  };

  const register = async function (
    fullName: string,
    email: string,
    password: string
  ) {
    const response = await fetch(`${baseUrl}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error("Error registering user " + err.message);
    }

    const data = await response.json();
    return data;
  };

  const createItem = async (
    caption: String,
    description: string,
    location: string,
    thumbnails: { url: string }[],
    tag: string[]
  ) => {
    const token = Cookies.get("token");
    const response = await fetch(`${baseUrl}items/new-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Other-Cookie": "value",
      },
      credentials: "include",
      body: JSON.stringify({
        caption,
        description,
        location,
        thumbnails,
        tag,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error("Error registering user " + err.message);
    }

    const data = await response.json();
    return data;
  };

  const check = async function (token: string) {
    const response = await fetch(`${baseUrl}auth/active/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Other-Cookie": "value",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const data = await response.json();
    return data;
  };

  return { check, login, register, createItem };
}
