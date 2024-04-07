import {getDatabase, ref, set, push} from "firebase/database";
import { getAuth } from "firebase/auth";

async function writeFavorites() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    const userID = user.uid;
    const db = getDatabase();
    const userRef = ref(db, `users/${userID}`);

    try {
        // Check if the user node already exists
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            // User node doesn't exist, create it
            await set(userRef, {});
            const favoritesRef = ref(userRef, "favorites"); 
            await set(favoritesRef, {}); // Create the favorites node under the user node
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export default writeFavorites;