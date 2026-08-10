import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { firebaseConfig } from "./config";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// if (process.env.NODE_ENV === 'development') {
//   // Prevent connecting multiple times if hot-reloading
//   if (!auth.emulatorConfig) {
//     connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
//   }
// }

export { app, auth };
