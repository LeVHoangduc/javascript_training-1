/**
 * Error handler for callbackFnc.
 * @param {Function} callbackFnc 
 * @param {String} message 
 * @returns {Function||undefined} callback function or undefined.
 */
const errorHandle = async (callbackFnc, message) => {
    try {
        return await callbackFnc;
    } catch (err) {
        alert(`${message}`);
    }
}

export default errorHandle;