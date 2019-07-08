if ("serviceWorker" in navigator) {
  // check is browser has sw
  navigator.serviceWorker
    .register("/sw.js") ////registration process takes some time.....register return a promise
    .then(function() {
      console.log("Service worker registered !");
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
