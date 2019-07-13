// sw works on mordern browsers only...fetch too...this is our main functions so we use polyyfills forso that fetcgghw ill be supported in older browser...ajex is supported in oldeer
// polyyfills can be found in github..internet just add them in our app
//after adding ...import them, before we execute oute our code i.e: before app.js...check in index.html....1st will be promise.js...bcoz..fetch uses them..then fetch...then app.js


if(!window.Promise){// to check if our browser have promise supprot.....if not we will add pollyfills
window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  // check is browser has sw
  navigator.serviceWorker
    .register("/sw.js") ////registration process takes some time.....register return a promise
    .then(function() {
     //console.log("Service worker registered !");
    });
}

/*
 register take seconde arg and object whicj overrides the scope....if we place sw in help
 its scope will be in help only..overdiing the scope to root will not work....{scope:"/"}..will not work
 if sw in root.. then overriding {scope:"/help"}.. will work... it will restrict the sw to help only
we cannot expends scope of sw beyond the folder it is....we can narrow down though



imp : => sw will only work on pages served by https....manifest and sw are independenet...can use them independly
localhost is an exception...to make devlopment easier...

 */


 // to show the add to home screen later point in time..

window.addEventListener("beforeinstallpromt", function() {

})
