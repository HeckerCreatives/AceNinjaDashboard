'use client'
import React, { useEffect, useState } from 'react'
import { ImageUp, Plus} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {  createNewsLetter, CreateNewsLetter } from '@/validation/schema'
import { useCreateNewsletter } from '@/client_actions/superadmin/newsletter'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import emailjs from "@emailjs/browser";
import { useGetSubscriber } from '@/client_actions/superadmin/subscribers'
import { useGetSocialMedia } from '@/client_actions/superadmin/socialmedia'
import { Item } from '@radix-ui/react-dropdown-menu'


const tabs = [
  'Image',
  'Video',
]

type Props = {
    type: string
}

export default function CreateNewsletterForm(prop: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const {mutate: createNewsletter, isPending} = useCreateNewsletter()
    const { data: subscription, isLoading } = useGetSubscriber(0, 99999999999, '');
    const {data: socials} = useGetSocialMedia()


    const findLink = (type: string) => {
        const find = socials?.data.find((item) => item.title === type)?.link

        return find
    }
    
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setValue("file", file); // Update React Hook Form value
          setPreview(URL.createObjectURL(file)); // Show image preview
        }
      };



    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateNewsLetter>({
      resolver: zodResolver(createNewsLetter),
    });

    //create news
    const createWebsiteNews = async (data: CreateNewsLetter) => {
        createNewsletter(
          {
            title: data.title,
            description: data.description,
            type: prop.type,
            bannerimg: data.file,
          },
          {
            onSuccess: async (response) => {
              toast.success(`Newsletter created successfully`);
      
              // Send email to subscribers after successful creation
              await sendEmailToSubscribers(response.data, data.title, data.description);
      
              setOpen(false);
              setPreview(null);
              reset();
            },
          }
        );
      };

    const sendEmailToSubscribers = async (banner: string, title: string, description: string) => {
        try {
          if (!subscription || subscription.data.data.length === 0) {
            toast.error("No subscribers found.");
            return;
          }
      
          const emailPromises = subscription.data.data.map((subscriber) =>
            emailjs.send(
              process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
              {
                to_name: subscriber.email,
                from_name: "Ace",
                to_email: subscriber.email,
                subject: title,
                content: description,
                banner: `${process.env.NEXT_PUBLIC_API_URL}/${banner}`,
                fb_link: findLink('Facebook'),
                x_link: findLink('X'),
                discord_link: findLink('Discord'),
                ig_link: findLink('Instagram'),
                tiktok_link: findLink('Tiktok'),
                yt_link: findLink('Youtube'),
              },
              process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
          );
      
          await Promise.all(emailPromises);
          toast.success("Newsletter sent to all subscribers!");
      
        } catch (error) {
          console.error("Failed to send newsletter:", error);
          toast.error("Failed to send newsletter.");
        }
      };
      

    //reset form value
    useEffect(() => {
        reset()
        setPreview(null)
    },[open])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Create
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Newsletter</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createWebsiteNews)} className=' text-xs flex flex-col p-4'>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Title</label>
          <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
          {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
        </div>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px] mt-2'>
          <label htmlFor="" className=''>Description</label>
          <textarea placeholder='Description' className={` whitespace-pre-wrap input h-[80px] ${errors.description && 'border-[1px] focus:outline-none border-red-500'}`} {...register('description')} />
          {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
        </div>

      
          <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden mt-2'>
            <label htmlFor="" className=''>Banner</label>

            <div className=' w-full aspect-video bg-zinc-900 flex items-center justify-center mt-2 border-2 border-dashed border-zinc-700 rounded-md '>
              <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                <div className=' w-full aspect-video flex flex-col items-center justify-center gap-2 text-xs cursor-pointer overflow-hidden'>
                {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
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
                    {...register("file")}
                    onChange={handleFileChange}
                />
              </label>
            </div>

          {errors.file && <p className=' text-[.6em] text-red-500'>{errors.file.message}</p>}

          </div>
     

          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button disabled={isPending} className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1'>
                {isPending && <Loader/>}
                Save</button>
          </div>



         </form>
    </DialogContent>
    </Dialog>
  )
}
