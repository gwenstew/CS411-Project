import {getDatabase, ref, set, push} from "firebase/database";
import { getAuth } from "firebase/auth";

function writeFavorites() {
    const auth = getAuth();
    const user = auth.currentUser;

    const createUserNode = async () => {
        if (user) {
            const userID = user.uid;
            const db = getDatabase();
            const userRef = ref(db, `users/${userID}`);
            
            // Check if the user node already exists
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                // User node doesn't exist, create it
                await set(userRef, {});
                const favoritesRef = ref(userRef, "favorites");  // Add the favorites node under the user node
                await set(favoritesRef, {});
            }
        } else {
            console.error("User is not authenticated.");
        }
    };

}

export writeFavorites