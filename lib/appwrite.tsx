import { Account, Client } from "react-native-appwrite";
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

export const createUser = () => {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
