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
        url: url,
        type: "GET",
    }).done(function(vbvData, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.vbvData = vbvData;
        if (url.split(':')[0] == "https") {

        } else {
            downloadFile(name, url);
        }
        
         $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="height: 52px;width:100% !important;"><span style="margin-top: 8px;font-size: 17px;">' + vbvData.count +   ' Verse by Verse Teachings '+ viewName + ' </span></div>');
    
    
        $.each(vbvData.results, function(index, value) {

            churchID = parseInt(vbvData.results[index].churchid);
            speakerID = parseInt(vbvData.results[index].speaker);



            try {
                churchName = arrayLookup(churchData.results, 'churchid', churchID).churchname;
                console.log(churchName);
            } catch (err) {
                console.log('error');
                churchName = 'No Church Listed';
            }

            try {
                speakerName = arrayLookup(speakerData.results, 'speakerid', speakerID).speakername;
                console.log(speakerName);
            } catch (err) {
                console.log('error');
                speakerName = 'No Speaker Name Listed';
            }


        vbvImage = 'https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?speaker=' + vbvData.results[index].speaker;
        

            $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">' +
                '<ul class="demo-list-two mdl-list">' +
                '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +
                '<span class="mdl-list__item-primary-content" style="margin-top:-15px;">' +
                 '<img style="border-radius:20px;margin-top:-15px;width:80px;height:80px;position:absolute;" id="vbv_IMG_' + vbvData.results[index].id + '" src="' + vbvImage + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +
                //'<div style="background-size:cover;margin-top:-10px;width:80px;border-radius:10px;height:80px;float:left;margin-right:20px;background-image:url(\' '\');"></div>' +
                '<span style="margin-left:100px;" onclick="loadIndividualSermon(' + vbvData.results[index].downloadedcontentid + ');">' + vbvData.results[index].title + '</span><br>' +
                '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + speakerName + '</span>' +
                '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + churchName + '</span>' +
                '</span>' +
                '</li>' +
                '</ul>' +
                '</div>');
             var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
                 if (app) {
                var imageCacheTarget = $('#speaker_IMG_' + vbvData.results[index].speaker);
                cacheImageCheck(imageCacheTarget);
            } else {

            }

        });

        console.log('Teachings Loaded');
        $('#loading').hide();
    });
}
