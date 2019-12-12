const ipc = require('electron').ipcRenderer;
const syncMsgBtn = document.getElementById('sendSyncMsgBtn');

syncMsgBtn.addEventListener('click', function () { 
    const reply = ipc.sendSync('synchronous-message', 'Mr. Watson, come here.');
    console.log(reply)// reply holds the value of what the main process seends back
    const message = `Synchronous message reply: ${reply}`
    document.getElementById('sync-reply').innerHTML = message
})
