
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
//    document.getElementById("device-name").innerHTML =
//      device.name || `ID: ${device.id}`;
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

let deviceSelected = null;

{
	let selectbtn = document.getElementById("select-robot");
	let sendbtn = document.getElementById("send-to-robot");
	if(selectbtn){
		selectbtn.addEventListener("click",async ()=>{
			let options = {filters:[
					{ services: ["01942846-0661-7c4a-8953-e76f2ae2e6e2"] },
			]};
			deviceSelected = await navigator.bluetooth.requestDevice(options);
		})
	}
	if(sendbtn){
		sendbtn.addEventListener("click", async()=>{
			if (!deviceSelected){
				alert("select a robot first");
				return;
			}
			try{
				let server = await deviceSelected.gatt.connect();
				let service = await server.getPrimaryService("01942846-0661-7c4a-8953-e76f2ae2e6e2");
				let chars = await service.getCharacteristic("01942846-0761-7c4a-8953-e76f2ae2e6e2");
				makeCode();
				await chars.writeValueWithResponse(progBuf);
				await server.disconnect();
			} catch (err) {
				console.error(err)
				alert("Failed to send. Try reconnecting.");
			}
		})
	}
}

// if (navigator.bluetooth)
//   document.getElementById("clickme").addEventListener("click", testIt);
// else{
//   alert("Этот браузер не поддерживает WebBluetooth. Вы не сможете отправить программу роботу. Используйте совместимый браузер (Chrome, Opera, Яндекс и др.)");
//   document.getElementById("clickme").disabled = true;
// } 