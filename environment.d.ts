declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MOCKAPI_URL: string;
      NEXT_PUBLIC_LOCAL_BASE_URL: string;
    }
  }
}

export {};
