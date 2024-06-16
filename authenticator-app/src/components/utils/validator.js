const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+={}[\]:;\"'|<,>.?/\\-])[A-Za-z\d~!@#$%^&*()_+={}[\]:;\"'|<,>.?/\\-]{8,}$/
    return regex.test(password);
}

const validateEmail = (email) => {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexPattern.test(email);
}

module.exports = {
    validatePassword,
    validateEmail
}