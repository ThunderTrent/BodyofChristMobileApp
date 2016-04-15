function initialLoad(){


      var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if ( app ) {
  teachingsLoadData();
   speakersLoadData();
   membersLoadData();
    vbvLoadData();
   //churchesLoad();
  // vbvLoad();
   //communityLoad();
   sermonHistoryLoadData();
        } else {


        }
}




// Manual PC Loads
  var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if ( app ) {

        } else {
             jQuery.ajax({
        url: 'https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=&speakerid=*&ordering=-downloadedcontentid&typeofcontent=Sermon&title=*',
        type: "GET",
    }).done(function(sermonDataCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.sermonDataCACHE = (sermonDataCACHE);
});
        }



var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if ( app ) {

        } else {
                 jQuery.ajax({
        url: 'https://thebodyofchrist.us/rest/timeListened/',
        type: "GET",
    }).done(function(sermonHistoryCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.sermonHistoryCACHE = (sermonHistoryCACHE);
});
        }

        var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if ( app ) {

        } else {
                 jQuery.ajax({
        url: 'https://www.thebodyofchrist.us/rest/sermons/?limit=10000&audioStatus=2&speakerid=*&title=*&ordering=-downloadedcontentid&typeofcontent=Verse%20By%20Verse',
        type: "GET",
    }).done(function(VBVDataCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.VBVDataCACHE = (VBVDataCACHE);
});
        }




//Device Loads


function teachingsLoadData(){
url ='https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=&speakerid=*&ordering=-downloadedcontentid&typeofcontent=Sermon&title=*';

  // var fileTransfer = new FileTransfer();
  //   store = cordova.file.dataDirectory;
  //   fileName = 'teachingPreloadData' +  ".json";
  //   fileTransfer.download(url, store + fileName,
  //       function(entry) {

                 jQuery.ajax({
        url: 'data/teachingPreloadData.json',
        type: "GET",
    }).done(function(sermonDataCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.sermonDataCACHE = JSON.parse(sermonDataCACHE);
        localStorage.setItem('intialPullLoaded',"1");
        console.log('setInitialPullLoaded to 1');
});

        // },
        // function(err) {
        //     console.log(err);
        //    });


}

function speakersLoadData(){
url ='https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount';

  var fileTransfer = new FileTransfer();
    store = cordova.file.dataDirectory;
    fileName = 'speakersPreloadData' +  ".json";
    fileTransfer.download(url, store + fileName,
        function(entry) {

                 jQuery.ajax({
        url: 'cdvfile://localhost/library-nosync/speakersPreloadData.json',
        type: "GET",
    }).done(function(speakerDataCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.speakerDataCACHE = (speakerDataCACHE);
});

        },
        function(err) {
            console.log(err);
           });


}


function membersLoadData(){
url ='https://www.thebodyofchrist.us/rest/members/?limit=1000&id=*';
  var fileTransfer = new FileTransfer();
    store = cordova.file.dataDirectory;
    fileName = 'memberPreloadData' +  ".json";
    fileTransfer.download(url, store + fileName,
        function(entry) {
                 jQuery.ajax({
        url: 'cdvfile://localhost/library-nosync/memberPreloadData.json',
        type: "GET",
    }).done(function(memberDataCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.memberDataCACHE = (memberDataCACHE);
});

        },
        function(err) {
            console.log(err);
           });


}

function sermonHistoryLoadData(){
// url ='https://thebodyofchrist.us/rest/timeListened/';
//   var fileTransfer = new FileTransfer();
//     store = cordova.file.dataDirectory;
//     fileName = 'sermonHistoryPreloadData' +  ".json";
//     fileTransfer.download(url, store + fileName,
//         function(entry) {
     jQuery.ajax({
        url: 'https://thebodyofchrist.us/rest/timeListened/',
        type: "GET",
    }).done(function(sermonHistoryCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.sermonHistoryCACHE = sermonHistoryCACHE;
});
        // },
        // function(err) {
        //     console.log(err);
        //    });


}


function vbvLoadData(){
// url ='https://www.thebodyofchrist.us/rest/sermons/?limit=10000&audioStatus=2&speakerid=*&title=*&ordering=-downloadedcontentid&typeofcontent=Verse%20By%20Verse';
//   var fileTransfer = new FileTransfer();
//     store = cordova.file.dataDirectory;
//     fileName = 'VBVPreloadData' +  ".json";
//     fileTransfer.download(url, store + fileName,
//         function(entry) {

     jQuery.ajax({
        url: 'data/VBVPreloadData.json',
        type: "GET",
    }).done(function(VBVDataCACHE, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.VBVDataCACHE = JSON.parse(VBVDataCACHE);
});
        // },
        // function(err) {
        //     console.log(err);
        //    });


}




// function loadAllTeaching(){
// var syncAllTeachings = ContentSync.sync({ src: 'https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=&speakerid=*&ordering=-downloadedcontentid&typeofcontent=Sermon&title=*', id: 'allTeachings.json' });

// syncAllTeachings.on('progress', function(data) {
//     console.log('Teaching Data: ' + data.progress);
// });

// syncAllTeachings.on('complete', function(data) {
//     // data.localPath
//     console.log('Sermon Data Loaded');
//      jQuery.ajax({
//         url: data.localPath,
//         type: "GET",
//     }).done(function(sermonDataALL, textStatus, jqXHR) {
//         console.log("Local Load Successful: " + jqXHR.status);
//         window.teachingDataALL = JSON.parse(sermonDataALL);
//         loadAllSpeakers();
// });
// });

// syncAllTeachings.on('error', function(e) {
//     console.log(e);
// });

// syncAllTeachings.on('cancel', function() {
//     console.log('error');
// });
// }

// function loadAllSpeakers(){
// var syncSpeakers = ContentSync.sync({ src: 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount', id: 'speakers.json' });

// syncSpeakers.on('progress', function(data) {
//     console.log('Speaker Data:'  + data.progress);
// });

// syncSpeakers.on('complete', function(data) {
//     // data.localPath
//     console.log('Speaker Data Loaded');
//      jQuery.ajax({
//         url: data.localPath,
//         type: "GET",
//     }).done(function(speakerDataALL, textStatus, jqXHR) {
//         console.log("Local Load Successful: " + jqXHR.status);
//         window.speakerDataALL = JSON.parse(speakerDataALL);
//         //loadAllSpeakers();
// });

// });

// syncSpeakers.on('error', function(e) {
//     console.log(e);
// });

// syncSpeakers.on('cancel', function() {
//     console.log('error');
// });
// }

// function loadAllMembers(){
//     var syncMembers = ContentSync.sync({ src: 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount', id: 'speakers.json' });

// syncSpeakers.on('progress', function(data) {
//     console.log('Members Data:'  + data.progress);
// });

// syncMembers.on('complete', function(data) {
//     // data.localPath
//     console.log('Members Data Loaded');
// });

// syncMembers.on('error', function(e) {
//     console.log(e);
// });

// syncMembers.on('cancel', function() {
//     console.log('error');
// });

// }




