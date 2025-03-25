"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { ImageUp, Pen } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import Loader from "../common/Loader"
import { useGetSocialMedia } from "@/client_actions/superadmin/socialmedia"
import { useEditRankTier } from "@/client_actions/superadmin/ranktier"
import { editTier, type EditTier } from "@/validation/schema"

type Props = {
  id: string
  name: string
  mmr: string
  icon: string
}

export default function EditRankTier(prop: Props) {
  const [preview, setPreview] = useState<string | null>(
    prop.icon ? `${process.env.NEXT_PUBLIC_API_URL}/${prop.icon}` : null,
  )
  const [open, setOpen] = useState(false)
  const { mutate: editRankTier, isPending } = useEditRankTier()
  const [originalIcon, setOriginalIcon] = useState<string | null>(prop.icon || null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditTier>({
    resolver: zodResolver(editTier),
    defaultValues: {
      name: prop.name,
      requiredmmr: Number(prop.mmr),
      icon: prop.icon || undefined,
    },
  })

  const iconValue = watch("icon")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    setValue("icon", file, { shouldValidate: true })

    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const createRankTierData = async (data: EditTier) => {
    let iconToSubmit: File | string | null = null

    if (data.icon instanceof File) {
      iconToSubmit = data.icon
    } else if (data.icon === undefined && originalIcon) {
      iconToSubmit = originalIcon
    } else if (typeof data.icon === "string" && data.icon) {
      iconToSubmit = data.icon
    }

    editRankTier(
      {
        name: data.name,
        requiredmmr: data.requiredmmr,
        icon: iconToSubmit || "",
        id: prop.id,
      },
      {
        onSuccess: () => {
          toast.success(`Rank tier updated successfully`)
          setOpen(false)
          setPreview(null)
          reset()
        },
      },
    )
  }

  useEffect(() => {
    if (prop) {
      setOriginalIcon(prop.icon || null)

      setPreview(prop.icon ? `${process.env.NEXT_PUBLIC_API_URL}/${prop.icon}` : null)

      reset({
        name: prop.name,
        requiredmmr: Number(prop.mmr),
        icon: prop.icon || undefined,
      })
    }
  }, [prop, reset])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-1 bg-yellow-600 p-1 rounded-sm text-xs">
        <Pen size={15} />
      </DialogTrigger>
      <DialogContent className="max-w-[450px] h-auto max-h-[90%] border-amber-500/80 border-[1px]">
        <DialogHeader className="w-full bg-light p-3">
          <DialogTitle className="text-sm">Edit Rank Tier</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(createRankTierData)} className="text-xs flex flex-col p-4">
          <div className="flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Title"
              className={`input ${errors.name && "border-[1px] focus:outline-none border-red-500"}`}
              {...register("name")}
            />
            {errors.name && <p className="text-[.6em] text-red-500">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px] mt-2">
            <label htmlFor="requiredmmr">Required MMR</label>
            <input
              type="number"
              id="requiredmmr"
              placeholder="Enter Required MMR"
              className={`input ${errors.requiredmmr && "border-[1px] focus:outline-none border-red-500"}`}
              {...register("requiredmmr", {
                setValueAs: (value) => (value === "" ? undefined : Number(value)),
              })}
            />
            {errors.requiredmmr && <p className="text-[.6em] text-red-500">{errors.requiredmmr.message}</p>}
          </div>

          <div className="w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden mt-2">
            <label htmlFor="icon-upload">Icon</label>

            <div className="w-full aspect-square bg-zinc-900 flex items-center justify-center mt-2 border-2 border-dashed border-zinc-700 rounded-md">
              <label htmlFor="dropzone-file" className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full aspect-square flex flex-col items-center justify-center gap-2 text-xs cursor-pointer overflow-hidden">
                  {preview ? (
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageUp size={25} />
                      <p>Click to upload</p>
                      <p>PNG or JPG (MAX. 5MB)</p>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  id="dropzone-file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {errors.icon && <p className="text-[.6em] text-red-500">{errors.icon.message}</p>}
          </div>

          <div className="w-full flex items-end justify-end gap-4 mt-6 text-white">
            <button
              type="submit"
              disabled={isPending}
              className="bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1"
            >
              {isPending && <Loader />}
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

