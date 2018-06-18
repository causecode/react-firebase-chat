import { initializeApp } from 'firebase/app';

export const initializeReactApp = () => {
    const config = {
        apiKey: "<YOUR_API_KEY>",
        authDomain: "<YOUR_AUTH_DOMAIN>",
        databaseURL: "<YOUR_DATABASE_URL>",
        projectId: "<YOUR_PROJECT_ID>",
        storageBucket: "<YOUR_STORAGE_BUCKET_NAME>",
        messagingSenderId: "<YOUR_SENDER_ID>"
    };

    initializeApp(config);
}