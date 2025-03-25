declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: string
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string

    //ENVRIONMENT: "development" | "production";
  }
}