let _msg = '240100010009';

try {
    let stx = _msg.substring(0, 2);
    let cmd_id = parseInt(_msg.substring(2, 4), 16);
    let len = _msg.substring(4, 6);
    let payload = _msg.substring(8, 8 + (len * 2));
    let checksum = _msg.substring(8 + (len * 2));

    if (cmd_id === 86) {
        let cfg = payload
        console.log('cfg: ' + cfg);
    } else if (cmd_id === 20) {

    } else {
        console.log('cmd_id: ' + cmd_id);
    }
} catch (e) {
    console.log(e);
}

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

function SBGCgenerator(type, params) {
    switch (type) {
        case 20:
            return
    }
}

function crc16_calculate(data) {
    const polynom = 0x8005;
    let crc_register = 0;
    let data_bit;
    let crc_bit;
    let shift_register;

    let DataArray = Buffer.from(data, 'hex');
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

    let crc = [];
    crc[0] = crc_register & 0x00FF;
    crc[1] = (crc_register >> 8) & 0x00FF;
    data += parseInt(crc[0]).toString(16);
    data += parseInt(crc[1]).toString(16);

    return data
}

// function crc16_calculate(data) {
//     let DataArray = Buffer.from(data, 'hex');
//     console.log('DataArray:', DataArray);
//     let payload_size = DataArray[1];
//     return crc16_update(4 + payload_size - 1, data);
// }

let exam = '5602580000';
let crc_answer = 'e613'; //230 19
console.log(crc16_calculate(exam));
