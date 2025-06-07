'use client';
import axiosInstance from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/errorHandler";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { EyeOff, Eye } from "lucide-react";
import { decryptData, encryptData } from "@/utils/cryptoHelper";

interface Login {
  username: string;
  password: string;
}

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
  const loadCredentials = () => {
    const encryptedUsername = localStorage.getItem("rememberMe_username");
    const encryptedPassword = localStorage.getItem("rememberMe_password");

    console.log(encryptedUsername, encryptedPassword)

    if (encryptedUsername && encryptedPassword) {
      setUsername(decryptData(encryptedUsername));
      setPassword(decryptData(encryptedPassword));

    console.log('Credentials',decryptData(encryptedUsername), decryptData(encryptedPassword))

      setRememberMe(true);
    }
  };

  loadCredentials();
}, [router]); 


  const authLogin = async (data: Login) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/login", { params: data });

      if (response.data.message === "success") {
        toast.success("Successfully logged in");

        // Save credentials if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("rememberMe_username", encryptData(username));
          localStorage.setItem("rememberMe_password", encryptData(password));
        } else {
          // Remove saved credentials if not checked
          localStorage.removeItem("rememberMe_username");
          localStorage.removeItem("rememberMe_password");
        }
      }

      if (response.data.data.auth === "player") {
        router.push("/user/dashboard");
      }

      if (response.data.data.auth === "superadmin") {
        router.push("/superadmin/dashboard");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-100 flex items-center justify-center">
      <div
        className="max-w-[1240px] w-[90%] h-[90%] lg:h-[700px] grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-hidden shadow-xl"
        style={{
          backgroundImage: "url('/Contact BG.png')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative hidden lg:flex w-full h-full">
          <img
            src="/Characters.png"
            alt=""
            className="absolute bottom-0 right-0 object-contain"
          />
        </div>

        <div className="relative flex flex-col gap-4 items-center justify-center w-full h-full p-12 text-black ">
          <img src="/logo.png" alt="" className="w-[200px]" />
          <p className="text-sm font-light">Welcome to Ace.</p>

          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full lg:w-[70%] flex flex-col gap-1 text-xs mt-4">
              <label htmlFor="username" className="text-zinc-400">
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="p-3 bg-zinc-200 text-black rounded-sm"
              />

              <label htmlFor="password" className="text-zinc-400 mt-4">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 bg-zinc-200 text-black rounded-sm"
                />

                <p
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </p>
              </div>

              {/* Remember Me */}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-zinc-400">
                  Remember Me
                </label>
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  onClick={() => authLogin({ username, password })}
                  className="relative w-fit rounded-md mt-10 font-semibold flex items-center gap-2 justify-center"
                >
                  <img src="/Submit BUTTON.png" alt="" />
                  <div className="absolute z-20 w-full flex items-center justify-center gap-2">
                    {loading && <div className="loader"></div>}
                    <p className="text-sm font-semibold">Sign in</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
