export function storeUser(user) {
    if (user) {
        localStorage.setItem("user", user);
    } else {
        localStorage.getItem("user");
    }
}

export function removeStoredUser() {
    localStorage.removeItem("user");
}