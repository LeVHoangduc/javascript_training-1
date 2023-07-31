/**
 * A promise for wait until the next action.
 * @param {Number} time 
 * @returns 
 */
const wait = (time) => new Promise((resolve) => {
    setTimeout(() => resolve(), time);
})

export default wait;