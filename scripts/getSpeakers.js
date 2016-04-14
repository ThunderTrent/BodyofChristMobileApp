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
//             console.log("Error");
//         });
// }

function loadSpeakers(search, communityID, insert) {

    var isOffline = 'onLine' in navigator && !navigator.onLine;

    if (search == "Global") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount';
        } else {
            url = 'cdvfile://localhost/library-nosync/globalSpeakers.json';
        }
        name = 'globalSpeakers';
        target = '#contentHolder';
    } else if (search == "Community") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount&communityID=' + communityID;
        } else {
            url = 'cdvfile://localhost/library-nosync/communitySpeakers.json';
        }
        name = 'communitySpeakers';
        target = '#contentHolder';
    } else if (search == "Following") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000';
        } else {
            url = 'cdvfile://localhost/library-nosync/followerSpeakers.json';
        }
        name = 'followerSpeakers';


        target = '#contentHolder';
    } else if (search == "RecommendedSpeakers") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&recommendedSpeaker=2&ordering=-sermonCount';
        } else {
            url = 'cdvfile://localhost/library-nosync/recommendedSpeakers.json';
        }
        name = 'recommendedSpeakers';
        target = '#contentHolder';
    } else {}

    jQuery.ajax({
        url: url,
        type: "GET",
    }).done(function(speakerData, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.speakerData = speakerData;
        if (url.split(':')[0] == "https") {

        } else {
        downloadFile(name, url);
        }
        $.each(speakerData.results, function(index, value) {

            if (speakerData.results[index].speakerimage == null) {
                speakerImage = 'https://www.thebodyofchrist.us/static/images/default-avatar.png'
            } else {
                speakerImage = speakerData.results[index].speakerimage;
            }
            if (insert == "True") {
                $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">' +
                    '<ul class="demo-list-two mdl-list"> <center>' +
                    '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +
                    '<span class="mdl-list__item-primary-content" style="margin-top:-15px;width:100%;">' +
                    //'<div style="background-size:cover;border-radius:20px;margin-top:-15px;width:80px;height:80px;float:left;margin-right:20px;background-image:url(\'' + speakerImage + '\');"></div>' +
                    '<img style="border-radius:20px;margin-top:-15px;width:80px;height:80px;position:absolute;" id="speaker_IMG_' + speakerData.results[index].speakerid + '" src="' + speakerImage + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +
                    '<span style="margin-left:100px;">' + speakerData.results[index].speakername + '</span>' +
                    '<span class="mdl-list__item-sub-title" style="margin-left:100px;">' + speakerData.results[index].sermonCount + ' Sermons / Teachings</span>' +
                    '</span>' +
                    '</li>' +
                    '</ul>' +
                    '</div>');
                 var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
            if (app) {
                var imageCacheTarget = $('#speaker_IMG_' + speakerData.results[index].speakerid);
                cacheImageCheck(imageCacheTarget);
            } else {

            }
            } else {}
        });

        $('#loading').hide();
    });
}

function cacheImageCheck(imageCacheTarget) {


    ImgCache.isCached(imageCacheTarget.attr('src'), function(path, success) {
        if (success) {
            //already cached
            ImgCache.useCachedFile(imageCacheTarget);
        } else {
            //   not there, need to cache the image
            ImgCache.cacheFile(imageCacheTarget.attr('src'), function() {
                ImgCache.useCachedFile(imageCacheTarget);
            });
        }
    });


}
