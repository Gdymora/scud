##

https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mongoose
https://www.postman.com/downloads/
http://www.passportjs.org/packages/passport-jwt/
http://www.passportjs.org/
https://mongoosejs.com/docs/
https://account.mongodb.com
https://serialport.io/docs/api-parser-readline/

## .env

HOST="127.0.0.1"
PORT=5000

### sudo netstat -nlp | grep :5000 узнать pid слушателя порта

### sudo kill -9 $(sudo lsof -t -i:5000) убить процесс на 300 порту
## ls -l /sys/bus/usb/devices или lshw -businfo посмотреть устройства
## dmesg | grep tty обнаружить последовательные порты
## sudo adduser $USER  dialout необходимо добавить пользователя для открытия ком порта
 dialoutгрупа дозволяє отримати доступ до послідовних портів через файли в /dev