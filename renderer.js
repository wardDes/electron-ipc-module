const ipc = require('electron').ipcRenderer;
const syncMsgBtn = document.getElementById('sendSyncMsgBtn');
const asyncMsgBtn = document.getElementById('sendAsyncMsgBtn')

syncMsgBtn.addEventListener('click', function () { 
    const reply = ipc.sendSync('synchronous-message', 'Mr. Watson, come here.');
    console.log(reply)// reply holds the value of what the main process seends back
    const message = `Synchronous message reply: ${reply}`
    document.getElementById('sync-reply').innerHTML = message
})

asyncMsgBtn.addEventListener('click', function () {
    ipc.send('asynchronous-message', 'That\'s one small step for man')
 })

 // One must custom implement callback to handle reply
 // from the Main process
 ipc.on('asynchronous-reply', function (event, arg) {
    const message = `Asynchronous message reply: ${arg}`
    document.getElementById('async-reply').innerHTML = message
  })

/*
If we want to remove a single listener from the method on the Main process, the syntax is:
        ipcMain.removeListener( channel name, function)

and from the Renderer process: 
        ipcRenderer.removeListener( channel name, function)

The function should be the reference to the function that was executed by the on method.

If you need to remove all the listeners on a specific channel, 
you can use the removeAllListeners method to do so. Here is the basic syntax: 
             ipcMain.removeAllListeners(channel)
           and 
             ipcRenderer.removeAllListeners(channel)

In both of our above examples, our two event listeners had their functions defined 
within the listener itself. This not absolutely necessary.

For example, if our Main process needed to know if a user had logged into our 
system, we could have this event shell: 

             function userDidLogin() {   
                 ipcRenderer.on('userLogin', this.handleLoginSucess
             }

             function userDidLogout() {   
                 ipcRenderer.removeListener('userLogin', this.handleLoginSuccess); 
             } 
             
             function handleLoginSuccess(event, args) {   
                 console.log('data', args.data); 
             }
This could be tied to changing a Menu Item based on the user’s login status, or 
some other method. 
For this example, once we have had the state change, there is no need to keep 
listening for that event. By removing it, that is one less thing our application must 
concern itself with. 

Electron’s IPC module provides one more useful methods along these same lines. That method is: 

             ipc.once(channel, listener)

This method is available for both the Main and Renderer process. 
The method will listen on the specific channel. Once it has received the event, it will 
execute the listener function, then remove itself from the IPC listeners.


*/