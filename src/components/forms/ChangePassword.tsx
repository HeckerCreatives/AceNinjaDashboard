import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { ChangePassword, changePassword } from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword } from "@/client_actions/user/password";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

export default function ChangePasswordUser() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: updatePassword, isPending} = useUpdatePassword()

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

//   const handleSubmit = (e: React.FormEvent) => {


    const {
      register,
      handleSubmit,
      setValue,
      reset,
      watch,
      trigger,
      formState: { errors },
    } = useForm<ChangePassword>({
      resolver: zodResolver(changePassword),
    });
  
  
   const onSubmit = async (data: ChangePassword ) => {
       updatePassword({oldpw: data.oldPassword, newpw: data.newPassword}, {
        onSuccess: () => {
            toast.success("Password updated successfully");
            reset()

          },
       })
   };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center text-xs gap-2">
        <Settings size={14} /> Change Password
      </DialogTrigger>

      <DialogContent className="w-full max-w-[400px] h-fit p-6">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription className=" text-sm">Update your password securely.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 text-sm">
          {/* Old Password */}
          <label htmlFor="" className=" text-xs text-zinc-400">Old Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Old Password"
              {...register('oldPassword')}
              className=" text-xs"
            />
            <p
              onClick={toggleShowPassword}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </p>
          </div>
          {errors.oldPassword && <p className=' input-error'>{errors.oldPassword.message}</p>}


          {/* New Password */}
          <label htmlFor="" className=" text-xs text-zinc-400">New Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              {...register('newPassword')}
              className=" text-xs"
            />
            <p
              onClick={toggleShowPassword}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </p>
          </div>
          {errors.newPassword && <p className=' input-error'>{errors.newPassword.message}</p>}


          {/* Confirm Password */}
          <label htmlFor="" className=" text-xs text-zinc-400">Confirm Password</label>
          <div className="relative">

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              className=" text-xs"
            />
            <p
              onClick={toggleShowPassword}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </p>
          </div>
          {errors.confirmPassword && <p className=' input-error'>{errors.confirmPassword.message}</p>}


          <Button disabled={isPending} className="mt-4">
            {isPending && <Loader/>}
            Update Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
