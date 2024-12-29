window.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');

    document.getElementById('presence-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const clientId = document.getElementById('clientId').value;
        const details = document.getElementById('details').value;
        const activity = {};

        if (details.length < 2) {
            alert("Details must be at least 2 characters long.");
            return;
        } else {
            activity.details = details;
        }

        if (document.getElementById('state').value) {
            activity.state = document.getElementById('state').value;
        }
        if (document.getElementById('largeImageKey').value) {
            activity.largeImageKey = document.getElementById('largeImageKey').value;
        }
        if (document.getElementById('largeImageText').value) {
            activity.largeImageText = document.getElementById('largeImageText').value;
        }
        if (document.getElementById('smallImageKey').value) {
            activity.smallImageKey = document.getElementById('smallImageKey').value;
        }
        if (document.getElementById('smallImageText').value) {
            activity.smallImageText = document.getElementById('smallImageText').value;
        }

        activity.startTimestamp = new Date();
        activity.instance = false;

        ipcRenderer.send('set-activity', { clientId, activity });
    });
});