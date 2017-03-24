window._fs = require("fs");
window._fileWatcher = null;
window._styleTag = null;
window._request = require('request');

global.cssFile = '/opt/DiscordCanary/resources/discord-custom.css';
global.pluginFile = '/opt/DiscordCanary/resources/discord-custom.js';
global.config = {};

try {
    global.config = require(global.pluginFile + '.config.json')
} catch (e) {
    // It doesn't exist, that's OK
}

global.saveConfig = () => {
    _fs.writeFile(global.pluginFile + '.config.json', JSON.stringify(global.config, null, 4), 'utf-8');
};
saveConfig();

window.setupCSS = function (path) {
    var customCSS = window._fs.readFileSync(path, "utf-8");
    if (window._styleTag === null) {
        window._styleTag = document.createElement("style");
        document.head.appendChild(window._styleTag);
    }
    window._styleTag.innerHTML = customCSS;
    if (window._fileWatcher === null) {
        window._fileWatcher = window._fs.watch(path, {encoding: "utf-8"},
            function (eventType, filename) {
                if (eventType === "change") {
                    window._styleTag.innerHTML = window._fs.readFileSync(path, "utf-8");
                }
            }
        );
    }
};

window.tearDownCSS = function () {
    if (window._styleTag !== null) {
        window._styleTag.innerHTML = "";
    }
    if (window._fileWatcher !== null) {
        window._fileWatcher.close();
        window._fileWatcher = null;
    }
};

window.applyAndWatchCSS = function (path) {
    window.tearDownCSS();
    window.setupCSS(path);
};
global.loadedPlugins = {};
global.loadPlugins = () => {
    for (let x of global.plugins)
        loadPlugin(x, false);
};

global.loadPlugin = (x, push = true) => {
    if (push)
        global.plugins.push(x);
    if (typeof(global._request) === "undefined")
        global._request = require('request');
    if (!global.loadedPlugins[x])
        require(x);

};

window.runPluginFile = function (path) {
    try {
        _fs.readFile(path, 'utf-8', function (err, res) {
            if (err)
                return console.error(err);
            eval(res);
            if (typeof(global._request) === "undefined")
                global._request = require('request');
            if (!global.plugins)
                global.plugins = ['/opt/DiscordCanary/resources/core.js'];
            global.loadPlugins();
        })
    } catch (e) {
        console.error(e);
    }
};
window.applyAndWatchCSS(global.cssFile);
window.runPluginFile(global.pluginFile);
