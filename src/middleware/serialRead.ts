import SerialPort from 'serialport';

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


module.exports = {
    receivedRing: function () {
///dev/ttyACM0 /dev/ttyUSB0
//sudo adduser $USER  dialout необходимо добавить пользователя в группу для открітия ком порта
        const serialPort = new SerialPort("/dev/ttyUSB0", {
            baudRate: 9600
        });
        // Read data that is available but keep the stream in "paused mode"
        serialPort.on('readable', function () {
            console.log('Data:', serialPort.read())
        })

        // Switches the serialPort into "flowing mode"
        serialPort.on('data', function (data) {
            console.log('Data:', data)
        })


        serialPort.on('error', err => {
            console.log('Error', err)
            process.exit(1)
        });

        serialPort.on('close', () => {
            console.log('Serial port disconnected.')
        });


    }

}