let _msg = '3e561268248c0a1cbffc00000000009500000000000026';
let _msg = '24561268248c0a1cbffc0000000000950000000000007bc5';

let IS_FRAME_INVERTED;
let INIT_STEP1_DONE;
let INIT_STEP2_DONE;
let STARTUP_AUTO_ROUTINE_DONE;

try {
    let stx = _msg.substring(0, 2);
    let cmd_id = hexParser(_msg.substring(2, 4), 'int');
    let len = _msg.substring(4, 6);
    let payload = _msg.substring(8, 8 + (len * 2));
    console.log('payload: ' + payload);
    let p_checksum = _msg.substring(8 + (len * 2));

    if (cmd_id === 86) {
        let board_ver = hexParser(payload.substring(0, 2), 'int');
        console.log('board_ver: ' + board_ver);
        let firm_ver = hexParser(payload.substring(2, 6), 'UInt16LE');
        console.log('firm_ver: ' + firm_ver);
        let state_flag = hexParser(payload.substring(6, 8), 'int');
        console.log('state_flag:', state_flag);

        !(state_flag & 2) ? IS_FRAME_INVERTED = false : IS_FRAME_INVERTED = true;
        !(state_flag & 4) ? INIT_STEP1_DONE = false : INIT_STEP1_DONE = true;
        !(state_flag & 8) ? INIT_STEP2_DONE = false : INIT_STEP2_DONE = true;
        !(state_flag & 16) ? STARTUP_AUTO_ROUTINE_DONE = false : STARTUP_AUTO_ROUTINE_DONE = true;
        console.log('IS_FRAME_INVERTED:', IS_FRAME_INVERTED);
        console.log('INIT_STEP1_DONE:', INIT_STEP1_DONE);
        console.log('INIT_STEP2_DONE:', INIT_STEP2_DONE);
        console.log('STARTUP_AUTO_ROUTINE_DONE:', STARTUP_AUTO_ROUTINE_DONE);
        let board_features = hexParser(payload.substring(8, 12), 'binary');
        console.log('board_features:', board_features);
        let connection_flag = hexParser(payload.substring(12, 14), 'int');
        console.log('connection_flag:', connection_flag);
        let board_features_ext = hexParser(payload.substring(14, 18), 'binary');
        console.log('board_features_ext:', board_features_ext);
    }else if(cmd_id===20){
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
