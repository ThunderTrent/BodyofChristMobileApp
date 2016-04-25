// function downloadFile(name, dataUrl) {
//     var fileTransfer = new FileTransfer();
//     store = cordova.file.dataDirectory;
//     fileName = name + ".json";
//     fileTransfer.download(dataUrl, store + fileName,
//         function(entry) {
//             console.log("DownloadedJSON!" + name);
//             //alert('Downloaded');
//         },
//         function(err) {
//             console.log(err);
//         });
// }

function loadVBV(search, communityID, userID) {

    var isOffline = 'onLine' in navigator && !navigator.onLine;

    if (search == "Global") {
        viewNamely = 'Globally';
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=25&audioStatus=2&speakerid=*&title=*&ordering=-downloadedcontentid&typeofcontent=Verse%20By%20Verse';
        } else {
            url = 'cdvfile://localhost/library-nosync/globalVBV.json';
        }
        name = 'globalVBV';
        target = '#contentHolder';
        loadVBVInsert(url, target, name);
    } else if (search == "Community") {
         viewNamely = 'in your community';
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=25&audioStatus=2&speakerid=*&title=*&typeofcontent=Verse%20By%20Verse&ordering=-downloadedcontentid&communityID=' + localStorage.getItem('communityID');
        } else {
            url = 'cdvfile://localhost/library-nosync/communityVBV.json';
        }
        target = '#contentHolder';
        name = 'communityVBV';
        loadVBVInsert(url, target, name);
    } else if (search == "Following") {
        window.followArray = []
        $.each(followData.results, function(index, value) {
            if (followData.results[index].followtype == "Speaker") {
                followArray.push(followData.results[index].followeeSpeaker);
            } else {

            }
            if (isOffline === false) {
                url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=25&title=*&typeofcontent=Verse%20By%20Verse&speakerid=' + followArray;
            } else {
                url = 'cdvfile://localhost/library-nosync/followerVBV.json';
            }
            target = '#contentHolder';
            name = 'followerVBV';
            loadVBVInsert(url, target, name);
        })
    }
}

function loadVBVInsert(url, target, name) {
    jQuery.ajax({
        url: 'https://www.thebodyofchrist.us/service/phonegap/versebyversefeed/',
        type: "GET",
    }).done(function(vbvData, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
       
        $('#contentHolder').append(vbvData);
    
    
    });
}