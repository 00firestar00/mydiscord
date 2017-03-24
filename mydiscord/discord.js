/*
* Hold Up!
* Pasting anything in here could give attackers access to your Discord account.
* Unless you understand exactly what you are doing, close this document and stay safe.
*/

// Make this array empty to not load the core plugin. (If you delete it, it will still load it.) I don't recommend removing this as it will remove all GUI functionality!
global.plugins = [];

if(global.config.plugins)
    for(let plugin of global.config.plugins)
        global.loadPlugin(plugin);

// To load more plugins (below) -- don't recreate the array! **use global.loadPlugin(link)**

// You probably don't actually need to touch this file if you're using the proper plugin installation system through core.js


setTimeout(() => {
    let memberbutton = document.getElementsByClassName("header-toolbar")[0].children[2];
    if (memberbutton.className === "active")
        memberbutton.click();
}, 1000);