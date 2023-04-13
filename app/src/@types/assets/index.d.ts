declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGAElement>>;
  export default content;
}

declare module "*.png";

declare module "@env" {
  export const REACT_APP_DEV_API: string;
  export const REACT_APP_PROD_API: string;

  export const REACT_APP_DEV_FIREBASE_KEY: string;
  export const REACT_APP_DEV_FIREBASE_DOMAIN: string;
  export const REACT_APP_DEV_FIREBASE_PROJECT_ID: string;
  export const REACT_APP_DEV_FIREBASE_BUCKET: string;
  export const REACT_APP_DEV_FIREBASE_SENDER_ID: string;
  export const REACT_APP_DEV_FIREBASE_APP_ID: string;

  export const REACT_APP_PROD_FIREBASE_KEY: string;
  export const REACT_APP_PROD_FIREBASE_DOMAIN: string;
  export const REACT_APP_PROD_FIREBASE_PROJECT_ID: string;
  export const REACT_APP_PROD_FIREBASE_BUCKET: string;
  export const REACT_APP_PROD_FIREBASE_SENDER_ID: string;
  export const REACT_APP_PROD_FIREBASE_APP_ID: string;

  export const REACT_APP_DEV_IOS_GOOGLE_CLIENT_ID: string;
  export const REACT_APP_DEV_EXPO_GOOGLE_CLIENT_ID: string;
  export const REACT_APP_PROD_IOS_GOOGLE_CLIENT_ID: string;
  export const REACT_APP_PROD_EXPO_GOOGLE_CLIENT_ID: string;
}
