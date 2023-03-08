function hexParser(data, type) {
    switch (type.toLowerCase()) {
        case 'int':
            return parseInt(data, 16);
        case 'int8':
            return Buffer.from(data, 'hex').readInt8(0);
        case 'int16le':
            return Buffer.from(data, 'hex').readInt16LE(0);
        case 'int16be':
            return Buffer.from(data, 'hex').readInt16LE(0);
        case 'int32le':
            return Buffer.from(data, 'hex').readInt16LE(0);
        case 'int32be':
            return Buffer.from(data, 'hex').readInt16LE(0);
        case 'uint8':
            return Buffer.from(data, 'hex').readUInt8(0);
        case 'uint16le':
            return Buffer.from(data, 'hex').readUInt16LE(0);
        case 'uint16be':
            return Buffer.from(data, 'hex').readUInt16BE(0);
        case 'uint32le':
            return Buffer.from(data, 'hex').readUInt32LE(0);
        case 'uint32be':
            return Buffer.from(data, 'hex').readUInt32BE(0);
        case 'binary':
            return parseInt(data, 16).toString(2).padStart(8, '0');

        default:
            console.log('Invalid data type --> ' + type);
    }
}

let PROTOCOL_VERSION = 'v1'; // TODO: v2 데이터 받기 시작하면 v2로 변경

function SBGCgenerator(ver, type, params = null) {
    if (ver === 'v1') { // protocol version 1
        let header = '3e';
        let message = '';
        let payload_size = 0;
        switch (type) {
            case 1: // Start Message
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                if (payload_size < 1) {
                    message += parseInt('0').toString(16).padStart(2, '0');
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                    message += Modulo256_Calculate(message);
                }
                message = header + message;

                return message;
            case 86: // Requests: CMD_BOARD_INFO
                payload_size = 2;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                if (payload_size < 1) {
                    message += parseInt('0').toString(16).padStart(2, '0');
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                    message += Modulo256_Calculate(message);
                }
                message = header + message;

                return message;
            case 20: // Requests: CMD_BOARD_INFO_3
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                if (payload_size < 1) {
                    message += parseInt('0').toString(16).padStart(2, '0');
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                    message += Modulo256_Calculate(message);
                }
                message = header + message;

                return message;
        }
    } else { // protocol version 2
        let header = '24';
        let message = '';
        let payload_size = 0;
        switch (type) {
            case 1: // Start Message
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                for (let i = 0; i < payload_size; i++) {
                    message += parseInt('0').toString(16).padStart(2, '0');
                }
                message += crc16_calculate(message);

                return message;
            case 86: // Requests: CMD_BOARD_INFO
                payload_size = 2;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                for (let i = 0; i < payload_size; i++) {
                    message += parseInt('0').toString(16).padStart(2, '0');
                }
                message += crc16_calculate(message);

                return message;
            case 20: // Requests: CMD_BOARD_INFO_3
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                for (let i = 0; i < payload_size; i++) {
                    message += parseInt('0').toString(16).padStart(2, '0');
                }
                message += crc16_calculate(message);

                return message;
            case 28: // Requests: CMD_READ_PROFILE_NAMES
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                for (let i = 0; i < payload_size; i++) {
                    message += parseInt('0').toString(16).padStart(2, '0');
                }
                message += crc16_calculate(message);

                return message;
            case 21: // Requests: CMD_READ_PARAMS_3
                payload_size = 1;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 33: // Requests: CMD_READ_PARAMS_EXT
                payload_size = 1;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 62: // Requests: CMD_READ_PARAMS_EXT2
                payload_size = 1;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 104: // Requests: CMD_READ_PARAMS_EXT3
                payload_size = 1;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 43: // Requests: CMD_READ_ADJ_VARS_CFG
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 53: // Requests: CMD_READ_FILE
                payload_size = 20;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 48: // Requests: CMD_EEPROM_READ
                payload_size = 6;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 25: // Requests: CMD_REALTIME_DATA_4
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 77: // Requests: CMD_MOTORS_ON
                payload_size = 0;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
            case 109: // Requests: CMD_MOTORS_OFF
                payload_size = 1;
                header += parseInt(type & 0xFF).toString(16).padStart(2, '0');
                header += payload_size.toString(16).padStart(2, '0');
                header += Modulo256_Calculate(header);

                message += header;
                if (params === null) {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt('0').toString(16).padStart(2, '0');
                    }
                } else {
                    for (let i = 0; i < payload_size; i++) {
                        message += parseInt(params.substring(0 + (i * 2), 2 + (i * 2)), 16).toString(16).padStart(2, '0');
                    }
                }
                message += crc16_calculate(message);

                return message;
        }
    }
}

function Modulo256_Calculate(data) {
    let totalSum = 0;
    let count = 0;
    let DataArray = Buffer.from(data, 'hex');
    let payload_size = DataArray[2];
    let stx = data.substring(0, 2);
    if (stx === '3e' || stx === '24') {
        payload_size = 2;
    }
    while (count < payload_size) totalSum += (DataArray[++count]);

    let checksum = parseInt(totalSum % 256).toString(16).padStart(2, '0');

    return checksum
}

function crc16_calculate(data) {
    const polynom = 0x8005;
    let crc_register = 0;
    let data_bit;
    let crc_bit;
    let shift_register;

    let DataArray = Buffer.from(data.substring(2, data.length), 'hex');
    let payload_size = DataArray[1];

    for (let counter = 0; counter < (4 + payload_size - 1); counter++) {
        for (shift_register = 1; (shift_register > 0) && (shift_register < 256); shift_register <<= 1) {
            data_bit = ((DataArray[counter] & shift_register) === shift_register) ? 1 : 0;
            crc_bit = crc_register >> 15;
            crc_register <<= 1;
            if (crc_register > 65535) crc_register -= 65536;
            if (data_bit !== crc_bit) {
                crc_register ^= polynom;
            }
        }
    }

    let crc = '';
    crc += parseInt(crc_register & 0x00FF).toString(16).padStart(2, '0');
    crc += parseInt((crc_register >> 8) & 0x00FF).toString(16).padStart(2, '0');

    return crc
}

console.log(SBGCgenerator(PROTOCOL_VERSION, 1));
console.log(SBGCgenerator(PROTOCOL_VERSION, 86));
console.log(SBGCgenerator(PROTOCOL_VERSION, 20));
PROTOCOL_VERSION = 'v2';
console.log(SBGCgenerator(PROTOCOL_VERSION, 1));  // 'v2'
console.log(SBGCgenerator(PROTOCOL_VERSION, 86));
console.log(SBGCgenerator(PROTOCOL_VERSION, 20));
console.log(SBGCgenerator(PROTOCOL_VERSION, 28));
console.log(SBGCgenerator(PROTOCOL_VERSION, 21));
console.log(SBGCgenerator(PROTOCOL_VERSION, 33));
console.log(SBGCgenerator(PROTOCOL_VERSION, 62));
console.log(SBGCgenerator(PROTOCOL_VERSION, 104));
console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '01'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '01'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '01'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '01'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '02'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '02'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '02'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '02'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '03'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '03'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '03'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '03'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '04'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '04'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '04'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '04'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 43));
console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '00050000c0000000000000000000000000000000'));
console.log('FILE_ID 1st: ', hexParser('00050000c0000000000000000000000000000000'.substring(0, 2), 'uint8'));
console.log('FILE_ID 2nd: ', hexParser('00050000c0000000000000000000000000000000'.substring(2, 4), 'uint8'));
console.log('PAGE_OFFSET: ', hexParser('00050000c0000000000000000000000000000000'.substring(4, 8), 'uint16le'));
console.log('MAX_SIZE: ', hexParser('00050000c0000000000000000000000000000000'.substring(8, 12), 'uint16le'));
console.log('RESERVED: ', hexParser('00050000c0000000000000000000000000000000'.substring(12), 'uint16le'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '01070000c0000000000000000000000000000000'));
console.log('FILE_ID 1st: ', hexParser('01070000c0000000000000000000000000000000'.substring(0, 2), 'uint8'));
console.log('FILE_ID 2nd: ', hexParser('01070000c0000000000000000000000000000000'.substring(2, 4), 'uint8'));
console.log('PAGE_OFFSET: ', hexParser('01070000c0000000000000000000000000000000'.substring(4, 8), 'uint16le'));
console.log('MAX_SIZE: ', hexParser('01070000c0000000000000000000000000000000'.substring(8, 12), 'uint16le'));
console.log('RESERVED: ', hexParser('01070000c0000000000000000000000000000000'.substring(12), 'uint16le'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '800c0000c000'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '400d0000c000'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '000e0000c000'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 48, 'c00e0000c000'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '800f00008000'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '00080000c0000000000000000000000000000000'));
console.log('FILE_ID 1st: ', hexParser('00080000c0000000000000000000000000000000'.substring(0, 2), 'uint8'));
console.log('FILE_ID 2nd: ', hexParser('00080000c0000000000000000000000000000000'.substring(2, 4), 'uint8'));
console.log('PAGE_OFFSET: ', hexParser('00080000c0000000000000000000000000000000'.substring(4, 8), 'uint16le'));
console.log('MAX_SIZE: ', hexParser('00080000c0000000000000000000000000000000'.substring(8, 12), 'uint16le'));
console.log('RESERVED: ', hexParser('00080000c0000000000000000000000000000000'.substring(12), 'uint16le'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '01080000c0000000000000000000000000000000'));
console.log('FILE_ID 1st: ', hexParser('01080000c0000000000000000000000000000000'.substring(0, 2), 'uint8'));
console.log('FILE_ID 2nd: ', hexParser('01080000c0000000000000000000000000000000'.substring(2, 4), 'uint8'));
console.log('PAGE_OFFSET: ', hexParser('01080000c0000000000000000000000000000000'.substring(4, 8), 'uint16le'));
console.log('MAX_SIZE: ', hexParser('01080000c0000000000000000000000000000000'.substring(8, 12), 'uint16le'));
console.log('RESERVED: ', hexParser('01080000c0000000000000000000000000000000'.substring(12), 'uint16le'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '02080000c0000000000000000000000000000000'));
console.log('FILE_ID 1st: ', hexParser('02080000c0000000000000000000000000000000'.substring(0, 2), 'uint8'));
console.log('FILE_ID 2nd: ', hexParser('02080000c0000000000000000000000000000000'.substring(2, 4), 'uint8'));
console.log('PAGE_OFFSET: ', hexParser('02080000c0000000000000000000000000000000'.substring(4, 8), 'uint16le'));
console.log('MAX_SIZE: ', hexParser('02080000c0000000000000000000000000000000'.substring(8, 12), 'uint16le'));
console.log('RESERVED: ', hexParser('02080000c0000000000000000000000000000000'.substring(12), 'uint16le'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '03080000c0000000000000000000000000000000'));
console.log('FILE_ID 1st: ', hexParser('03080000c0000000000000000000000000000000'.substring(0, 2), 'uint8'));
console.log('FILE_ID 2nd: ', hexParser('03080000c0000000000000000000000000000000'.substring(2, 4), 'uint8'));
console.log('PAGE_OFFSET: ', hexParser('03080000c0000000000000000000000000000000'.substring(4, 8), 'uint16le'));
console.log('MAX_SIZE: ', hexParser('03080000c0000000000000000000000000000000'.substring(8, 12), 'uint16le'));
console.log('RESERVED: ', hexParser('03080000c0000000000000000000000000000000'.substring(12), 'uint16le'));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
console.log(SBGCgenerator(PROTOCOL_VERSION, 25));

console.log(SBGCgenerator(PROTOCOL_VERSION, 77));
console.log(SBGCgenerator(PROTOCOL_VERSION, 109, '02'));