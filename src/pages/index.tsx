'use client';

import { signIn } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLogoGoogle } from 'react-icons/bi';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function Login() {
    setLoading(true);
    signIn('google')
      .then(() => {
        setLoading(false);
      })
      .then(() => {
        !loading && toast.success('Login Successfull');
        router.push('/dashboard');
      });
  }
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <div className="w-1/2 h-50 flex items-center justify-center">
        <button
          onClick={() => {
            Login();
          }}
          className="border-none bg-red-600 flex items-center justify-center px-4 py-2 gap-2 z-40"
        >
          <BiLogoGoogle />
          Login with google
        </button>
      </div>
    </div>
  );
}
