//sw runs in backgroud...its all about handling events....
//thats why we always attach event listener to sw...always react to events

// self is for..

// dont have access to dom events like click etc..coz we dont have dom access...
self.addEventListener('install', function(event) {
    console.log(" [Service Worker ] Installing SW ....", event)
})
//install, active etc are lifecycle of sw
self.addEventListener('activate', function(event) {
    console.log(" [Service Worker ] Activating SW ....", event)
    return self.clients.claim(); // it work without this like also ....but sometime activing may fails..so returning arespose
    //to insure sw activated correctly..might not need in future

})

