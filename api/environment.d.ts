declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
    }
  }
}
