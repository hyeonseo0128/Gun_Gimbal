const { SerialPort } = require('serialport');
const fs = require('fs');

let gimbalPort = null;
// const gimbalPortNum = '/dev/ttyAMA0';
const gimbalPortNum = 'COM6';
const gimbalBaudrate = '115200';

let pcPort = null;
// const pcPortNum = '/dev/ttyAMA2';
const pcPortNum = 'COM10';
const pcBaudrate = '115200';

fs.writeFile('resultfromgimbal.txt', 'Start', err => {
    if (err) {
        console.log(err);
        return
    }
})

gimbalPortOpening();
pcPortOpening();

function gimbalPortOpening() {
    if (gimbalPort === null) {
        gimbalPort = new SerialPort({
            path: gimbalPortNum,
            baudRate: parseInt(gimbalBaudrate, 10),
        });
        gimbalPort.on('open', gimbalPortOpen);
        gimbalPort.on('close', gimbalPortClose);
        gimbalPort.on('error', gimbalPortError);
        gimbalPort.on('data', gimbalPortData);
    } else {
        if (gimbalPort.isOpen) {
            gimbalPort.close();
            gimbalPort = null;
            setTimeout(gimbalPortOpening, 2000);
        } else {
            gimbalPort.open();
        }
    }
}

function gimbalPortOpen() {
    console.log('gimbalPort(' + gimbalPort.path + '), gimbalPort rate: ' + gimbalPort.baudRate + ' open.');
    initGimbal();
}

function gimbalPortClose() {
    console.log('gimbalPort closed.');

    setTimeout(gimbalPortOpening, 2000);
}

function gimbalPortError(error) {
    console.log('[gimbalPort error]: ' + error.message);

    setTimeout(gimbalPortOpening, 2000);
}

function gimbalPortData(data) {
    console.log('from Gimbal:', data.toString());
    // if (pcPort !== null) {
    //     pcPort.write(data);
    // }

    let _msg = data.toString();

    fs.appendFileSync('resultfromgimbal.txt', _msg, err => {
        if (err) {
            console.log(err);
            return
        }
    })

    try {
        let stx = _msg.substring(0, 2);
        let cmd_id = _msg.substring(2, 4);
        let len = _msg.substring(4, 6);
    } catch (e) {

    }
}

function pcPortOpening() {
    if (pcPort === null) {
        pcPort = new SerialPort({
            path: pcPortNum,
            baudRate: parseInt(pcBaudrate, 10),
        });
        pcPort.on('open', pcPortOpen);
        pcPort.on('close', pcPortClose);
        pcPort.on('error', pcPortError);
        pcPort.on('data', pcPortData);
    } else {
        if (pcPort.isOpen) {
            pcPort.close();
            pcPort = null;
            setTimeout(pcPortOpening, 2000);
        } else {
            pcPort.open();
        }
    }
}

function pcPortOpen() {
    console.log('pcPort(' + pcPort.path + '), pcPort rate: ' + pcPort.baudRate + ' open.');
}

function pcPortClose() {
    console.log('pcPort closed.');

    setTimeout(pcPortOpening, 2000);
}

function pcPortError(error) {
    console.log('[pcPort error]: ' + error.message);

    setTimeout(pcPortOpening, 2000);
}

function pcPortData(data) {
    console.log('from PC:', data.toString());
    if (gimbalPort !== null) {
        gimbalPort.write(data);
    }
}

function initGimbal() {
    let counter = 0;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 1), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 1));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 86), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 86));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 20), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 20));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 86), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 86));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 20), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 20));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 28), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 28));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 21), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 21));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 33), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 33));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 62), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 62));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 104), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 104));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 21, '01'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '01'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 33, '01'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '01'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 62, '01'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '01'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 104, '01'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '01'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 21, '02'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '02'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 33, '02'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '02'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 62, '02'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '02'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 104, '02'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '02'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 21, '03'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '03'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 33, '03'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '03'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 62, '03'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '03'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 104, '03'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '03'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 21, '04'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 21, '04'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 33, '04'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 33, '04'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 62, '04'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 62, '04'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 104, '04'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 104, '04'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 43), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 43));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 53, '00050000c0000000000000000000000000000000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '00050000c0000000000000000000000000000000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 53, '01070000c0000000000000000000000000000000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '01070000c0000000000000000000000000000000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 48, '800c0000c000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '800c0000c000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 48, '400d0000c000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '400d0000c000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 48, '000e0000c000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '000e0000c000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 48, 'c00e0000c000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 48, 'c00e0000c000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 48, '800f00008000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 48, '800f00008000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 53, '00080000c0000000000000000000000000000000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '00080000c0000000000000000000000000000000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 53, '01080000c0000000000000000000000000000000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '01080000c0000000000000000000000000000000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 53, '02080000c0000000000000000000000000000000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '02080000c0000000000000000000000000000000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 53, '03080000c0000000000000000000000000000000'), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 53, '03080000c0000000000000000000000000000000'));
    }), (Math.random() * counter * 10));
    counter++;
    setTimeout(pcPort.write(SBGCgenerator(PROTOCOL_VERSION, 25), () => {
        console.log(SBGCgenerator(PROTOCOL_VERSION, 25));
    }), (Math.random() * counter * 10));
    counter++;
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