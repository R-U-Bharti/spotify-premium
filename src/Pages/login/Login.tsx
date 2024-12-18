import axios from 'axios'
import './login.css'
import qs from 'qs'
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT; // Update with your actual redirect URI
  const SCOPES = [
    "user-read-private",
    "user-read-email",
  ]; // Add more scopes as needed
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

  const redirectToSpotify = () => {
    const authURL = `${AUTH_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      SCOPES.join(" ")
    )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authURL;
  };

  const navigate = useNavigate();
  let token = localStorage.getItem('token')
  let authCode = localStorage.getItem('authCode')

  useEffect(() => {
    if (authCode && token)
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
          <button onClick={() => redirectToSpotify()} className="Btn">
          </button>
        </div>

      </div>
    </div>
  )
}
