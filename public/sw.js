//sw runs in backgroud...its all about handling events....
//thats why we always attach event listener to sw...always react to events

// self is for..

// dont have access to dom events like click etc..coz we dont have dom access...
self.addEventListener("install", function(event) {
  console.log(" [Service Worker ] Installing SW ....", event);
});
//install, active etc are lifecycle of sw
self.addEventListener("activate", function(event) {
  console.log(" [Service Worker ] Activating SW ....", event);
  return self.clients.claim(); // it work without this like also ....but sometime activing may fails..so returning arespose
  //to insure sw activated correctly..might not need in future
});

// non lifecyle events....

//fetch will get triggered whevenr our app fetch's smth..like load scripts, or load css,image...or...we manually do fetch in js file
self.addEventListener("fetch", function(event) {
  console.log("[Service Worker ] fetching smth ....", event);
   // event.respondWith(null); // can override what we want to respond...if we dont use it...simple response the default
    // with null...check the o/p...it will show site cannot reach

    event.respondWith(fetch(event.request)); // 
});

/// we cam think sw as netwrok proxy....every ougoing fetch req goes through the sw
//so does the resp





// note: fetch is triggered by the page...while install and activate is triggered by the browser..based on sw lifecycle