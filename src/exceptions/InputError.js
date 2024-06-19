// const InputError = require('../exceptions/InputError');

// function someFunction(input) {
//     if (!input) {
//         throw new InputError('Invalid input provided');
//     }
//     // Logika lainnya
// }


const ClientError = require("../exceptions/ClientError");

class InputError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InputError';
    }
}

module.exports = InputError;
