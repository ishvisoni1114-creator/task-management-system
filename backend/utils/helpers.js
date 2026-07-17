const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0];
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

module.exports = { formatDate, validateEmail };