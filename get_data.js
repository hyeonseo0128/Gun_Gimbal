const { SerialPort } = require('serialport');

let gimbalPort = null;
const gimbalPortNum = '/dev/ttyAMA0';
const gimbalBaudrate = '115200';

let pcPort = null;
const pcPortNum = '/dev/ttyAMA2';
const pcBaudrate = '115200';

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
    if (pcPort !== null) {
        pcPort.write(data);
    }

    let _msg = data.toString();
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
