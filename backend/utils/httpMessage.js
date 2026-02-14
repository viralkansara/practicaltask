const httpMessage = {
    INTERNAL_SERVER_ERROR: "An unexpected error occurred. Please try again later.",
  PASSWORD_ENCRYPTION_ERROR: "Failed to encrypt the password.",
  PASSWORD_COMPARISON_ERROR: "Failed to compare the password.",
  TOKEN_GENERATION_ERROR: "Failed to generate authentication token.",
  EMAIL_ALREADY_EXIST: "This email address is already registered.",
  VALIDATION_MESSAGE_FORMAT_ERROR: "Invalid format in validation message.",
  USER_REGISTRATION_ERROR: "Failed to register the user.",
  USER_LOGIN_ERROR: "Failed to log in the user.",
  EMAIL_NOT_FOUND: "No account found with this email address.",
  PASSWORD_NOT_MATCHED: "The provided password is incorrect.",
  USER_GET_DETAILS_ERROR: "Failed to get user details.",
  USER_DETAILS_FIND_ERROR: "Failed to retrieve user details.",
  DEFAULT_USER_CREATION_ERROR: "Failed to create default user.",
  USER_DETAILS_NOT_FOUND: "User details not found.",
  TOKEN_NOT_FOUND: "Authentication token is missing.",
  UNAUTHORIZED_ACCESS: "Unauthorized access. Please log in again.",
};
export default httpMessage;