import axios from 'axios'
import './login.css'
import qs from 'qs'
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const getTokenFun = () => {

    let fd = new FormData();

    fd.append("grant_type", import.meta.env.VITE_GRANT_TYPE)
    fd.append("client_id", import.meta.env.VITE_CLIENT_ID)
    fd.append("client_secret", import.meta.env.VITE_CLIENT_SECRET_ID)

    let body = {
      grant_type: import.meta.env.VITE_GRANT_TYPE,
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET_ID,
    }

    axios.post("https://accounts.spotify.com/api/token",
      qs.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then((res) => {
        console.log('login response: ', res)
        localStorage.setItem('token', res?.data?.access_token)
        toast.success("Login Successfull")
        navigate('/home')
      })
      .catch((err) => {
        toast.error("Login error")
        console.log("login error: ", err)
      })
  }

  const navigate = useNavigate();
  let token = localStorage.getItem('token')

  useEffect(() => {
    if (token)
      navigate('/home')
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 dark:bg-black bg-gradient-to-b from-orange-400 via-orange-950 to-black">
      <div className="flex flex-col gap-6 h-1/2 w-max">
        <div className="relative pb-4 md:flex  flex-col items-center justify-center">
          <img
            src="/icon.png"
            alt="Image"
            className="size-[20rem] p-4 inset-0 object-contain"
          />
          <span className="text-green-500 font-bold text-4xl">Spotify <span className="text-orange-400">Premium</span></span>
        </div>

        <div className="flex justify-center">
          <button onClick={() => getTokenFun()} className="Btn">
          </button>
        </div>

      </div>
    </div>
  )
}
