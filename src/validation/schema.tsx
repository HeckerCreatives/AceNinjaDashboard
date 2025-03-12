import {z} from 'zod'

//superadmin

export const createNews = z.object({
    title: z.string().nonempty('Title is empty'),
    description: z.string().nonempty('Description is empty'),
    file: z.string().nonempty('No file uploaded')
})

export const createAnnouncement = z.object({
    title: z.string().nonempty('Title is empty'),
    description: z.string().nonempty('Description is empty'),
    file: z.string().nonempty('No file uploaded')

})

export const createCode = z.object({
    code: z.string().nonempty('Please enter a code'),
    rewards: z.string().nonempty('Please enter a rewards'),
    expiration: z.string().nonempty('Please input a expiration date'),
})

export const changePassword = z.object({
    new: z.string().nonempty('Please enter a new password'),
    confirm: z.string().max(20).nonempty('Please confirm your password'),
}).refine((data) => data.new === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'], // Error will appear under confirmpassword field
  });


export type CreateNews = z.infer<typeof createNews>
export type CreateAnnouncement = z.infer<typeof createAnnouncement>
export type CreateCode = z.infer<typeof createCode>
export type ChangePassword = z.infer<typeof changePassword>