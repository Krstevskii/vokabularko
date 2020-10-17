import { derived, writable } from "svelte/store";

const initial = {
    backgroundColor: "#FFFFFF",
}

const user = "";

export const store = writable(initial);
export const userStore = writable(user);
export const isUserLoggedIn = derived(userStore, $userStore => $userStore ? true : false)