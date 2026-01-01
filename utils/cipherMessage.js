export function encrypt(message) {
    const cipherMessage = message.split('').reverse().join('')
    console.log(cipherMessage)
    return cipherMessage
}