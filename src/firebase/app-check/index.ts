import { FirebaseApp } from "firebase/app";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import firebase_app from "../config";

let appCheck: AppCheck | null = null;

export function getOrInitializeAppCheck(app: FirebaseApp): AppCheck {
  if (appCheck) {
    return appCheck;
  }

  // Firebase uses a global variable to check if app check is enabled in a dev environment
  if (process.env.NODE_ENV !== "production") {
    Object.assign(window, {
      FIREBASE_APPCHECK_DEBUG_TOKEN:
        process.env.NEXT_PUBLIC_APP_CHECK_DEBUG_TOKEN,
    });
  }

  return (appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC_FIREBASE_SITE_KEY!
    ),
    isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
  }));
}

export function getAppCheck() {
  return getOrInitializeAppCheck(firebase_app);
}
