/**
 * Error handler for promise function.
 * @param {Function} promise 
 * @param {String} message 
 * @returns {Function|undefined} callback function or undefined.
 */
const handleError = async (promise, message) => {
    try {
        return await promise;
    } catch (err) {
        alert(`${message}`);
    }
}

export default handleError;