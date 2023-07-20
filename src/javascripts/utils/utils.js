// export const prepareUtils = () => {
//     /**
//      *
//      * @param {string} action
//      * @param {string|HTMLElement} target
//      * @param {function} callback
//      */
//     HTMLElement.prototype.addDelegateListener = (action, target, callback) => {
//         console.log(this);
//         this.addEventListener(action, (event) => {
//             const el = event.target.closest(target);
//             console.log(el);
//             if (el) callback(el, event);
//         })
//     }
// }