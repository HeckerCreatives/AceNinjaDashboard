import {z} from 'zod'

//auth
export const registerValidations = z.object({
    username: z
        .string()
        .min(4, 'Username must be at least 4 characters')
        .max(15, 'Username must be at most 15 characters')
        .regex(/^[a-zA-Z0-9]+$/, 'Username must only contain alphanumeric characters')
        .nonempty('Username is empty'),
    email: z.string().email('Invalid email').nonempty('Email is empty'),
    password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Password must only contain alphanumeric characters')
    .nonempty('Password is empty'),
    confirmPassword: z.string().nonempty('Confirm Password is empty'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

//SUPERADMIN
export const createNewsData = z.object({
  title: z.string().nonempty("Title is empty"),
  description: z.string().nonempty("Description is empty"),
  file: z.union([
    z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed (JPEG, PNG, etc.).",
    }),
    z.string().url("Please provide an image or video url."),
  ]).optional(), 
});

export const editNewsdata = z.object({
  title: z.string().nonempty("Title is empty"),
  description: z.string().nonempty("Description is empty"),
  file: z
    .union([
      z.instanceof(File).refine(
        (file) => file.type.startsWith("image/"),
        {
          message: "Only image files (JPEG, PNG, etc.) are allowed.",
        }
      ),
      z.string(),
      z.null(),
      z.undefined(),
    ])
    .optional(),
});


export const createAnnouncementDataSchema = z.object({
  title: z.string().nonempty("Title is empty"),
  description: z.string().nonempty("Description is empty"),
  file: z.union([
    z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed (JPEG, PNG, etc.).",
    }),
    z.string().url("Invalid video URL. Please provide a valid URL."),
  ]).optional(), 
});

export const createNewsLetter = z.object({
  title: z.string().nonempty('Title is empty'),
  description: z.string().nonempty('Description is empty'),
  file: z
  .instanceof(File, { message: "Invalid file format. Please upload an image." })
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed (JPEG, PNG, etc.).",
  }),
})

export const createAnnouncement = z.object({
    title: z.string().nonempty('Title is empty'),
    description: z.string().nonempty('Description is empty'),
    file: z.string().nonempty('No file uploaded')

})

export const createCode = z.object({
    code: z.string().nonempty('Please enter a code'),
    expiration: z.string().nonempty('Please input a expiration date'),
})

export const changePassword = z
  .object({
    oldPassword: z.string().nonempty("Please enter your old password"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(15, "New password must be at most 15 characters")
      .regex(/^[a-zA-Z0-9@#\[\]]+$/, "New Password may only include letters, numbers, and @, #, [, ]"), // Alphanumeric check
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error will appear under confirm password field
  });


  export const changePasswordUser = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(15, "New password must be at most 15 characters")
      .regex(/^[a-zA-Z0-9@#\[\]]+$/, "New Password may only include letters, numbers, and @, #, [, ]"), // Alphanumeric check
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error will appear under confirm password field
  });

  export const createSeasonsSchema = z.object({
    title: z.string().nonempty('Please enter a title'),
    duration: z.number().min(1, 'Duration must be at least 1')
});


export const createTier = z.object({
  name: z.string().nonempty("Title is empty"),
  requiredmmr: z.number().min(0, "Required MMR is required"),
  // file: z
  //   .instanceof(File)
  //   .refine((file) => file.type.startsWith("image/"), {
  //     message: "Only image files are allowed (JPEG, PNG, etc.).",
  //   })
});

export const editTier = z.object({
  name: z.string().nonempty("Title is empty"),
  requiredmmr: z.number().min(0, "Required MMR is required"),
  // icon: z
  //   .custom<File | null | undefined | string>((val) => {
  //     if (val instanceof File) return true
  //     if (val === null || val === undefined) return true
  //     if (typeof val === "string") return true
  //     return false
  //   }, "Only image files are allowed (JPEG, PNG, etc.).")
  //   .optional(),
})


export const sendCurrencySchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters"),
  
  currency: z.string().nonempty('Please select a currency'),
  
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0")
    .int("Amount must be a whole number")
    .or(
      z.string()
        .nonempty("Amount is required")
        .transform((val) => {
          const parsed = parseInt(val);
          if (isNaN(parsed)) throw new Error("Amount must be a number");
          return parsed;
        })
    ),
});



const statsSchema = z.object({
  level: z.literal(0).or(z.number().refine((val) => val === 0, {
    message: "Level must be 0",
  })),
  damage: z.literal(0).or(z.number().refine((val) => val === 0, {
    message: "Damage must be 0",
  })),
  defense: z.literal(0).or(z.number().refine((val) => val === 0, {
    message: "Defense must be 0",
  })),
  speed: z.literal(0).or(z.number().refine((val) => val === 0, {
    message: "Speed must be 0",
  })),
});

export const storeItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required").optional(),
  rarity: z.string().min(1, "Rarity is required").optional(),
  gender: z.string().min(1, "Gender is required").optional(),
  price: z.number().min(1, "Price must be at least 1"),
  skill:z.string().min(1, "Skill is required").optional(),
  currency: z.string().min(1, "Currency is required"),
  description: z.string().min(1, "Description must be at least 10 characters"),
  imageUrl: z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed (JPEG, PNG, etc.).",
  })
  // stats: statsSchema,
});


export const updateItemSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  type: z.string().min(1, "Type is required").optional(),
  gender: z.string().optional().or(z.literal('')),
  rarity: z.string().optional().or(z.literal('')),
  price: z.number().min(1, "Price must be at least 1"),
  currency: z.string().min(1, "Currency is required").optional(),
  description: z.string().min(1, "Description must be at least 10 characters").optional(),
  imageUrl: z
    .union([z.instanceof(File), z.null(), z.undefined()]) 
    .refine((file) => {
      if (file === null || file === undefined) return true;
      return file instanceof File && file.type.startsWith("image/");
    }, {
      message: "Only image files are allowed (JPEG, PNG, etc.).",
    })
})


export const storeSkinsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rarity: z.string().min(1, "Rarity is required"),
  price: z.number().min(1, "Price must be at least 1"),
  currency: z.string().min(1, "Currency is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed (JPEG, PNG, etc.).",
  })
});

export const updateSkinsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rarity: z.string().min(1, "Rarity is required"),
  price: z.number().min(1, "Price must be at least 1"),
  currency: z.string().min(1, "Currency is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z
    .union([z.instanceof(File), z.null(), z.undefined()]) 
    .refine((file) => {
      if (file === null || file === undefined) return true;
      return file instanceof File && file.type.startsWith("image/");
    }, {
      message: "Only image files are allowed (JPEG, PNG, etc.).",
    })
})


export const storePacksSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  currency: z.string().min(1, "Currency is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Only image files are allowed (JPEG, PNG, etc.).",
  })
});

export const battlepassSchema = z.object({
  seasonname: z.string().min(1, "Battle pass title is required"),
  startdate: z.string().min(1, "Start date is required"),
  enddate: z.string().min(1, "End date is required"),
  status: z.string().min(1, "Status is required"),
  tiercount: z.number().min(1, "Tier count is required"),
  premcost: z.number().min(1, "Premium cost is required"),
  // grandreward: z.string().min(1, "Grand reward is required"),
  season: z.number().min(1, "Season is required"),
});

export const addStoreItemSchema = z.object({
  item: z.string().min(1, "Item is required"),
  amount: z.number().min(1,"Amount is required")
});

export const createShowcaseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // itemid: z.string().min(1, "Item is required"),
  // itemtype: z.string().min(1, "Item type is required"),
});


export type CreateNewsData = z.infer<typeof createNewsData>
export type CreateAnnouncementData = z.infer<typeof createAnnouncementDataSchema>
export type EditNewsData = z.infer<typeof editNewsdata>
export type CreateNewsLetter = z.infer<typeof createNewsLetter>
export type CreateAnnouncement = z.infer<typeof createAnnouncement>
export type CreateCode = z.infer<typeof createCode>
export type ChangePassword = z.infer<typeof changePassword>
export type ChangePasswordUserSchema = z.infer<typeof changePasswordUser>
export type RegisterUser = z.infer<typeof registerValidations>
export type CreateSeasonsSchema = z.infer<typeof createSeasonsSchema>
export type CreateTier = z.infer<typeof createTier>
export type EditTier = z.infer<typeof editTier>
export type SendCurrency = z.infer<typeof sendCurrencySchema>
export type StoreSchema = z.infer<typeof storeItemSchema>
export type UpdateStoreSchema = z.infer<typeof updateItemSchema>
export type CreateSkinsItems = z.infer<typeof storeSkinsSchema>
export type UpdateSkinsItems = z.infer<typeof updateSkinsSchema>
export type StorePacksItems = z.infer<typeof storePacksSchema>
export type BattlePassValidations = z.infer<typeof battlepassSchema>
export type AddStoreItem = z.infer<typeof addStoreItemSchema>
export type CreateShowcaseItem = z.infer<typeof createShowcaseSchema>