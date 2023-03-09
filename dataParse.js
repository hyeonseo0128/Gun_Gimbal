let _msg = '24197c950100010002010100b90106007d02800000000000f0d8dc05dc050704f0d8f0d808005f050bfc0000000000000000be00c50022030000805d0900010400b1b100003b05110063000000000000c6010000000000001a000200000000000000000000000000000000000000000000000000000000000000000000000000fcea';

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

let REALTIME_DATA_4 = {};


parse_realtime_data(_msg);


function parse_realtime_data(_msg) {
    // let start_character = _msg.substring(0, 2);
    // let cmd_id = _msg.substring(2, 4);
    // let payload_size = hexParser(_msg.substring(4, 6), 'int');
    // let header_checksum = _msg.substring(6, 8);
    REALTIME_DATA_4.acc_data_x = hexParser(_msg.substring(8, 12), 'int16le');
    REALTIME_DATA_4.gyro_data_x = hexParser(_msg.substring(12, 16), 'int16le');
    REALTIME_DATA_4.acc_data_y = hexParser(_msg.substring(16, 20), 'int16le');
    REALTIME_DATA_4.gyro_data_y = hexParser(_msg.substring(20, 24), 'int16le');
    REALTIME_DATA_4.acc_data_z = hexParser(_msg.substring(24, 28), 'int16le');
    REALTIME_DATA_4.gyro_data_z = hexParser(_msg.substring(28, 32), 'int16le');
    // REALTIME_DATA_4.serial_err_cnt = _msg.substring(32, 36);
    // REALTIME_DATA_4.system_error = _msg.substring(36, 40);
    // REALTIME_DATA_4.system_sub_error = _msg.substring(40, 42);
    // REALTIME_DATA_4.reserved_23 = _msg.substring(42, 48);
    REALTIME_DATA_4.rc_roll = hexParser(_msg.substring(48, 52), 'int16le');
    REALTIME_DATA_4.rc_pitch = hexParser(_msg.substring(52, 56), 'int16le');
    REALTIME_DATA_4.rc_yaw = hexParser(_msg.substring(56, 60), 'int16le');
    REALTIME_DATA_4.rc_cmd = hexParser(_msg.substring(60, 64), 'int16le');
    REALTIME_DATA_4.ext_fc_roll = hexParser(_msg.substring(64, 68), 'int16le');
    REALTIME_DATA_4.ext_fc_pitch = hexParser(_msg.substring(68, 72), 'int16le');
    REALTIME_DATA_4.imu_angle_x = hexParser(_msg.substring(72, 76), 'int16le');
    REALTIME_DATA_4.imu_angle_y = hexParser(_msg.substring(76, 80), 'int16le');
    REALTIME_DATA_4.imu_angle_z = hexParser(_msg.substring(80, 84), 'int16le');
    REALTIME_DATA_4.frame_imu_angle_x = hexParser(_msg.substring(84, 88), 'int16le');
    REALTIME_DATA_4.frame_imu_angle_y = hexParser(_msg.substring(88, 92), 'int16le');
    REALTIME_DATA_4.frame_imu_angle_z = hexParser(_msg.substring(92, 96), 'int16le');
    REALTIME_DATA_4.target_angle_x = hexParser(_msg.substring(96, 100), 'int16le');
    REALTIME_DATA_4.target_angle_y = hexParser(_msg.substring(100, 104), 'int16le');
    REALTIME_DATA_4.target_angle_z = hexParser(_msg.substring(104, 108), 'int16le');
    REALTIME_DATA_4.cycle_time = hexParser(_msg.substring(108, 112), 'uint16le');
    // REALTIME_DATA_4.i2c_error_count = _msg.substring(112, 116);
    // REALTIME_DATA_4.error_code = _msg.substring(116, 118);
    REALTIME_DATA_4.bat_level = hexParser(_msg.substring(118, 122), 'uint16le');
    REALTIME_DATA_4.rt_data_flags = hexParser(_msg.substring(122, 124), 'uint8');
    REALTIME_DATA_4.cur_imu = hexParser(_msg.substring(124, 126), 'uint8');
    REALTIME_DATA_4.cur_profile = hexParser(_msg.substring(126, 128), 'uint8');
    REALTIME_DATA_4.motor_power_x = hexParser(_msg.substring(128, 130), 'uint8');
    REALTIME_DATA_4.motor_power_y = hexParser(_msg.substring(130, 132), 'uint8');
    REALTIME_DATA_4.motor_power_z = hexParser(_msg.substring(132, 134), 'uint8');
    REALTIME_DATA_4.frame_cam_angle_x = hexParser(_msg.substring(134, 138), 'int16le');
    REALTIME_DATA_4.frame_cam_angle_y = hexParser(_msg.substring(138, 142), 'int16le');
    REALTIME_DATA_4.frame_cam_angle_z = hexParser(_msg.substring(142, 146), 'int16le');
    // REALTIME_DATA_4.reserved_25 = hexParser(_msg.substring(146, 148),;
    REALTIME_DATA_4.balance_error_x = hexParser(_msg.substring(148, 152), 'int16le');
    REALTIME_DATA_4.balance_error_y = hexParser(_msg.substring(152, 156), 'int16le');
    REALTIME_DATA_4.balance_error_z = hexParser(_msg.substring(156, 160), 'int16le');
    REALTIME_DATA_4.current = hexParser(_msg.substring(160, 164), 'uint16le');
    REALTIME_DATA_4.mag_data_x = hexParser(_msg.substring(164, 168), 'int16le');
    REALTIME_DATA_4.mag_data_y = hexParser(_msg.substring(168, 172), 'int16le');
    REALTIME_DATA_4.mag_data_z = hexParser(_msg.substring(172, 176), 'int16le');
    // REALTIME_DATA_4.imu_temperature = hexParser(_msg.substring(176, 178),'int8');
    // REALTIME_DATA_4.frame_imu_temperature = hexParser(_msg.substring(178, 180),'int8');
    // REALTIME_DATA_4.imu_g_err = hexParser(_msg.substring(180, 182),'int8');
    // REALTIME_DATA_4.imu_h_err = hexParser(_msg.substring(182, 184),'int8');
    REALTIME_DATA_4.motor_out_x = hexParser(_msg.substring(184, 188), 'int16le');
    REALTIME_DATA_4.motor_out_y = hexParser(_msg.substring(188, 192), 'int16le');
    REALTIME_DATA_4.motor_out_z = hexParser(_msg.substring(192, 196), 'int16le');
    // REALTIME_DATA_4.calib_mode = hexParser(_msg.substring(196, 198),;
    // REALTIME_DATA_4.can_imu_ext_sens_err = hexParser(_msg.substring(198, 200),;
    // REALTIME_DATA_4.reserved_25_2 = _msg.substring(200, 256);
    // REALTIME_DATA_4.body_checksum = _msg.substring(256, 260);


    console.log('REALTIME_DATA_4: ' + REALTIME_DATA_4);
    console.log('cmd_id: ' + cmd_id);
    console.log('payload_size: ' + payload_size);
    // console.log('header_checksum: ' + header_checksum);
    console.log('acc_data_x: ' + acc_data_x);
    console.log('gyro_data_x: ' + gyro_data_x);
    console.log('acc_data_y: ' + acc_data_y);
    console.log('gyro_data_y: ' + gyro_data_y);
    console.log('acc_data_z: ' + acc_data_z);
    console.log('gyro_data_z: ' + gyro_data_z);
    // console.log('serial_err_cnt: ' + serial_err_cnt);
    // console.log('system_error: ' + system_error);
    // console.log('system_sub_error: ' + system_sub_error);
    // console.log('reserved_23: ' + reserved_23);
    console.log('rc_roll: ' + rc_roll);
    console.log('rc_pitch: ' + rc_pitch);
    console.log('rc_yaw: ' + rc_yaw);
    console.log('rc_cmd: ' + rc_cmd);
    console.log('ext_fc_roll: ' + ext_fc_roll);
    console.log('ext_fc_pitch: ' + ext_fc_pitch);
    console.log('imu_angle_x: ' + imu_angle_x);
    console.log('imu_angle_y: ' + imu_angle_y);
    console.log('imu_angle_z: ' + imu_angle_z);
    console.log('frame_imu_angle_x: ' + frame_imu_angle_x);
    console.log('frame_imu_angle_y: ' + frame_imu_angle_y);
    console.log('frame_imu_angle_z: ' + frame_imu_angle_z);
    console.log('target_angle_x: ' + target_angle_x);
    console.log('target_angle_y: ' + target_angle_y);
    console.log('target_angle_z: ' + target_angle_z);
    console.log('cycle_time: ' + cycle_time);
    // console.log('i2c_error_count: ' + i2c_error_count);
    // console.log('error_code: ' + error_code);
    console.log('bat_level: ' + bat_level);
    console.log('rt_data_flags: ' + rt_data_flags);
    console.log('cur_imu: ' + cur_imu);
    console.log('cur_profile: ' + cur_profile);
    console.log('motor_power_x: ' + motor_power_x);
    console.log('motor_power_y: ' + motor_power_y);
    console.log('motor_power_z: ' + motor_power_z);
    console.log('frame_cam_angle_x: ' + frame_cam_angle_x);
    console.log('frame_cam_angle_y: ' + frame_cam_angle_y);
    console.log('frame_cam_angle_z: ' + frame_cam_angle_z);
    // console.log('reserved_25: ' + reserved_25);
    console.log('balance_error_x: ' + balance_error_x);
    console.log('balance_error_y: ' + balance_error_y);
    console.log('balance_error_z: ' + balance_error_z);
    console.log('current: ' + current);
    console.log('mag_data_x: ' + mag_data_x);
    console.log('mag_data_y: ' + mag_data_y);
    console.log('mag_data_z: ' + mag_data_z);
    // console.log('imu_temperature: ' + imu_temperature);
    // console.log('frame_imu_temperature: ' + frame_imu_temperature);
    // console.log('imu_g_err: ' + imu_g_err);
    // console.log('imu_h_err: ' + imu_h_err);
    console.log('motor_out_x: ' + motor_out_x);
    console.log('motor_out_y: ' + motor_out_y);
    console.log('motor_out_z: ' + motor_out_z);
    // console.log('calib_mode: ' + calib_mode);
    // console.log('can_imu_ext_sens_err: ' + can_imu_ext_sens_err);
    // console.log('reserved_25_2: ' + reserved_25_2);
    // console.log('body_checksum: ' + body_checksum);
}