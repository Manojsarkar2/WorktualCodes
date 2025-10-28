/**
 * Utility functions for client-side form validation.
 */

/**
 * Validates if a value is not empty.
 * @param {string} value - The value to validate.
 * @returns {boolean} True if the value is not empty, false otherwise.
 */
export function validateRequired(value) {
    return value && value.trim() !== '';
}

/**
 * Validates if a string is a valid email format.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export function validateEmail(email) {
    if (!validateRequired(email)) return false;
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validates if a password meets a minimum length requirement.
 * @param {string} password - The password string to validate.
 * @param {number} minLength - The minimum required length. Defaults to 6.
 * @returns {boolean} True if the password meets the length requirement, false otherwise.
 */
export function validatePassword(password, minLength = 6) {
    if (!validateRequired(password)) return false;
    return password.length >= minLength;
}

/**
 * Compares two passwords to check if they match.
 * @param {string} password - The first password.
 * @param {string} confirmPassword - The second password to compare against.
 * @returns {boolean} True if the passwords match, false otherwise.
 */
export function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}
