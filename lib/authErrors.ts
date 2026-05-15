export function getAuthErrorMessage(error: unknown) {
    if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
    ) {
        switch (error.code) {
            case "auth/email-already-in-use":
                return "This email is already in use";
            case "auth/invalid-credential":
                return "Invalid email or password";
            case "auth/user-not-found":
                return "User not found";
            case "auth/wrong-password":
                return "Wrong password";
            case "auth/too-many-requests":
                return "Too many attempts. Try again later";
            default:
                return "Authentication error";
        }
    }

    return "Something went wrong";
}
