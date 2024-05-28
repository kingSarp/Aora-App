import SignIn from "app/(auth)/sign-in";
import { Alert } from "react-native";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
export const appwrite = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66551087003369abc828",
  platform: "com.devfoundation.aora",
  databaseId: "66551310003de4739311",
  userCollectionId: "6655134f003cfe645132",
  videoCollectionId: "6655137e001d2878be85",
  storageId: "665516ae000770135738",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwrite.endpoint) // Your Appwrite Endpoint
  .setProject(appwrite.projectId) // Your project ID
  .setPlatform(appwrite.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const clearExistingSession = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log("Error clearing sessions:", error);
  }
};

export const createUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  // Register User

  try {
    await clearExistingSession(); // Clear any existing session

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account creation failed");

    const avatarURl = avatars.getInitials(username, 500, 500, "#FFFFFF");

    await signIn({ email, password });
    const newUser = await databases.createDocument(
      appwrite.databaseId,
      appwrite.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarURl,
      }
    );

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error);
      throw new Error(`User creation failed: ${error.message}`);
    } else {
      console.error("Error creating user:", error);
      throw new Error("User creation failed: unknown error");
    }
  }
};

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await clearExistingSession(); // Clear any existing session before signing in
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);
    return session;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error);
      throw new Error(`Sign-in failed: ${error.message}`);
    } else {
      console.error("Error creating user:", error);
      throw new Error("Sign-in failed: unknown error");
    }
  }
}
