declare namespace NodeJS {
  interface ProcessEnv {
    readonly COGNITO_CLIENT_ID: string;
    readonly COGNITO_CLIENT_SECRET: string;
    readonly COGNITO_REGION: string;
    readonly COGNITO_USER_POOL_ID: string;
    readonly COGNITO_ISSUER: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
  }
}
