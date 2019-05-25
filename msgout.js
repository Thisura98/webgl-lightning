/**
 * Outputs a on-screen message
 * @param {string} message String to output as message
 */
function outputMessage(message){
    const msgElement = $("#message");
    msgElement.html(message);
}