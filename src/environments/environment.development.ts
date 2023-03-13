import {
  FIREBASE_URL,
  FIREBASE_API_KEY,
  FIREBASE_COLLECTION_USERS,
  FIREBASE_COLLECTION_TASKS,
} from "../../.env";

export const environment = {
  production: false,
  firebaseUrl: FIREBASE_URL,
  firebaseApiKey: FIREBASE_API_KEY,
  authEndpointSignUp:
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
  authEndpointSignIn:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
  authEndpointDeleteUserAccount:
    "https://identitytoolkit.googleapis.com/v1/accounts:delete",
  firebaseCollections: {
    collectionUsers: FIREBASE_COLLECTION_USERS,
    collectionTasks: FIREBASE_COLLECTION_TASKS,
  },
};
