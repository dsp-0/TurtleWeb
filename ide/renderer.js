
const bleDeviceList = document.getElementById("deviceList");

async function testIt() {
  let options = {
     filters: [
       { services: ["01942846-0661-7c4a-8953-e76f2ae2e6e2"] },
    //   { name: 'xyz' },       // only devices with ''
    //   { namePrefix: 'xyz' }, // only devices starts with ''
     ],
    // optionalServices: [
    //   xyzServiceUuid,
    // ],
    //acceptAllDevices: true, // show all
  };
  try {
    makeCode();
    const device = await navigator.bluetooth.requestDevice(options);
    document.getElementById("device-name").innerHTML =
      device.name || `ID: ${device.id}`;
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService("01942846-0661-7c4a-8953-e76f2ae2e6e2");
    const characteristic = await service.getCharacteristic("01942846-0761-7c4a-8953-e76f2ae2e6e2");
    const result = await characteristic.writeValueWithResponse(progBuf);
    console.log('program written');
    server.disconnect();
  } catch(error) {
    console.log(error); 
  }
}

document.getElementById("clickme").addEventListener("click", testIt);
//document.getElementById("progButton").addEventListener("click", viewCode);
