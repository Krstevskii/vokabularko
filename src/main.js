import App from './App.svelte';
import { userStore } from "./store";

let user = localStorage.getItem("user");

userStore.set(user);

userStore.subscribe(store => {
	if (!store) {
		window.location.href = "/#";
	}
})
const app = new App({
	target: document.body
});

export default app;