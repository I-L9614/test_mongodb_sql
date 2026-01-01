export async function reverse(message) {
    const cipherMessage = message.split('').reverse().join('')
    return cipherMessage
}