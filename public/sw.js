
var CACHE_STATIC_NAME = "static-10";

var CACHE_DYNAMIC_NAME = "dynamic-v2";


self.addEventListener("install", function(event) {

  event.waitUntil(caches.open(CACHE_STATIC_NAME)//caches..referes to cache api...cache storage is one for a given domain...we can also open subcaches there
                    .then(function(cache) { //it return a promose and pass a refernce to the cache
                      console.log("[Service Workier] : Precaching App Shell")
                      cache.addAll([
                        "/",
                        "/index.html",
                        "/src/js/app.js",
                        "/src/js/promise.js",
                        "/src/js/fetch.js",
                        "/src/js/material.min.js",
                        "src/css/app.css",
                        "src/css/feed.css",
                        "src/images/main-image.jpg",
                        "https://fonts.googleapis.com/css?family=Roboto:400,700",//we can cache this from our server(app) too
                        "https://fonts.googleapis.com/icon?family=Material+Icons", // server shoul set cors header to allow cors else we will get error
                        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
                      ])
                      
                      //after adding the icons into cache...its not coming while offlie....go to network tab and that url...go to preview... we see that url is again calling some other url for the icon...thats why icons are not showing in the app...
                      //cache.add("/");// we have to load this else wunt access localhost:3030 ..ie: root url...we have individually go to the url...like 3030/index.html
                      //cache.add('/index.html');
                      //cache.add('/src/js/app.js') // add allows to add new resouse....we have to pass the url we have to send req send...if that resouce in our app...then pass relative path
                      // all  inside add..are request not path or some string
                   //storing polyfills like promose.js, fetch.js...has no value becoz the older browerse dont support sw
                   //here we are adding these for performance reasons.... add those only when the mordern broswers ha=ve to add them
                    }));         
  
  
  //caches.open is aync method ...it will not wait for the event to finish...other listener get called....it can cause problems.....like we havent incatlled the cache...but the fetch try to access the cache
  // so we will make it wait till it finishes


});


//install, active etc are lifecycle of sw
self.addEventListener("activate", function(event) {
 //console.log(" [Service Worker ] Activating SW ....", event);

 //wait tii done with clean up...else we might react to fetch event...that will come from old cache
 event.waitUntil(
   caches.keys()
      .then(function (keyList){

        return Promise.all(keyList.map(function (key){
          if(key !==CACHE_STATIC_NAME && key != CACHE_DYNAMIC_NAME){
            console.log('[Service Worker] Removing Old Cache.. ', key);
            return caches.delete(key);
          }
        }));// promise all : to ensure we return till all the clean up or update is done,,,read about prmise.all
      })
 )



  return self.clients.claim(); // it work without this like also ....but sometime activing may fails..so returning arespose
 // This command allows the SW to immediately start controlling the pages its registered for.
  //See this thread for a detailed discussion: https://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim
  //to insure sw activated correctly..might not need in future
});

//Note : we delete the old cache in activate not in install...beacuause at the time of install some part of our app might be using it..it can break our app...wait for to comlate the install and do the deletion in activate..
// non lifecyle events....

//fetch will get triggered whevenr our app fetch's smth..like load scripts, or load css,image...or...we manually do fetch in js file
self.addEventListener("fetch", function(event) {
 // console.log("[Service Worker ] fetching smth ....", event);

   // event.respondWith(fetch(event.request)); //This line does simply return the response of the request. This will become more useful once we start caching the response as well 
    event.respondWith(
      caches.match(event.request)
        .then(function (response){
              if(response){
                return response; // if not in the cache make network request
              } else {
                return fetch(event.request)      //// all  inside add..are request not path or some string
                          .then(function(res) {
                            caches.open(CACHE_DYNAMIC_NAME) ///for dynamic caching
                              .then(function(cache) {
                                cache.put(event.request.url, res.clone()) // we are cloning here....not just using res..why?
                                return res;  /// if we res directly it get consumed and will be empty thereafter..thats why clone..thats how response work...we can only consume once
                              
                              })
                          }).catch((error)=>{

                          })
              }
        })
    );

  });//responedWith expects a promise(asyn code which is handled by promise)






/// we cam think sw as netwrok proxy....every ougoing fetch req goes through the sw
//so does the resp


//note : add and put...difference?? add send req..and automatically store key value pair...but in put we have to do manunally


//Imp Note : in sw we work with asyn code becoz it is running in background
// note: fetch is triggered by the page...while install and activate is triggered by the browser..based on sw lifecycle

// Note : is network tab..after adding app.js to cache we will se that app.js is coming from sw(only one app.js we will see)...but for other two time its coming... 1st mangened by sw..then going to server.....we have added all the req is going through sw
// the gear icon in network tab : The gear icon can be misleading - it always shows up when the request was handled by the SW. And all requests are handled by it (as per our SW code). But not for all of them fitting items are found. The gear icon just indicates that the SW did something, not necessarily that it loaded the items.


// Note: we get a chrome extension error in the console......
    //The SW generally catches all requests that are sent from your page. And if you have a Chrome extension that somehow sends Http requests on behalf of your app, those requests will be caught, too. Of course - with proper filtering set up (as we do it in the course) - this shouldn't cause a problem.


