


function loadEvents(search, communityID, userID, insert) {

    var isOffline = 'onLine' in navigator && !navigator.onLine;

    if (search == "Global") {

        if (isOffline === false) { 
            url = 'https://www.thebodyofchrist.us/service/phonegap/newsfeed/';

        } else {
            url = 'cdvfile://localhost/library-nosync/globalEvents.json';
        }
        name = "globalEvents";
        target = '#contentHolder';
        loadEventsInsert(url, target, name, insert);
    } else if (search == "Community") {
        if (isOffline === false) { 
            url = 'https://www.thebodyofchrist.us/rest/events/?limit=50&userid=*&ordering=-eventID&communityID=' + communityID;

        } else {
            url = 'cdvfile://localhost/library-nosync/communityEvents.json';
        }
        name = "communityEvents";
        target = '#contentHolder';
        loadEventsInsert(url, target, name, insert);
    } else if (search == "Following") {
        window.followArray = []
        $.each(followData.results, function(index, value) {
            if (followData.results[index].followtype == "User") {
                followArray.push(followData.results[index].followeeUser);
            } else {}
            if (isOffline === false) { 
                url = 'https://www.thebodyofchrist.us/rest/events/?limit=50&userid=' + followArray;
                name = "followerEvents";
            } else {
                url = 'cdvfile://localhost/library-nosync/followerEvents.json';
            }
            target = '#contentHolder';
            loadEventsInsert(url, target, name, insert);



        })
    }
}

function loadEventsInsert(url, target, name, insert) {
    jQuery.ajax({
        url: url,
        type: "GET",
    }).done(function(eventData, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
            $( "#loader-wrapper" ).fadeOut( "slow", function() {
    // Animation complete
  });
        //window.eventData = eventData;
         if (insert =="True"){
         // $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="height: 52px;width:100% !important;"><span style="margin-top: 8px;font-size: 17px;">' + eventData.count +   ' Recent Events' + ' </span></div>');
        }
        if (url.split(':')[0] == "https") {

        } else {
            //downloadFile(name, url);

        }
        if (insert == "True"){
            
            $('#contentHolder').append(eventData);
        // $.each(eventData.results, function(index, value) {
        //     //Get Name for user//
            // userID = parseInt(eventData.results[index].userID);
            // speakerID = parseInt(eventData.results[index].speakerID);

            // function arrayLookup(array, prop, val) {
            //     for (var i = 0, len = array.length; i < len; i++) {
            //         if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {
            //             return array[i];
            //         }
            //     }
            //     return null;
            // }

            // try {
            //     if (eventData.results[index].type == "Speaker") {
            //         fullName = arrayLookup(speakerData.results, 'speakerid', speakerID).speakername;
            //     } else if (eventData.results[index].type == "User") {
            //         fullName = arrayLookup(memberData.results, 'id', userID).username;
            //     }

            // } catch (err) {
            //     console.log('error');
            //     fullName = 'None';
            // }



            // appLink = eventData.results[index].appLink;




            // $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">' +
            //     '<ul class="demo-list-two mdl-list"> <center>' +
            //     '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +
            //     '<span class="mdl-list__item-primary-content" style="margin-top:-15px;width:100%;">' +
            //     // '<div style="background-size:cover;border-radius:20px;margin-top:-15px;width:80px;height:80px;float:left;margin-right:20px;background-image:url(\'' + imageURL+ '\');"></div>' +
            //     '<img style="border-radius:20px;margin-top:-15px;width:80px;height:80px;position:absolute;" id="eventID_IMG_' + eventData.results[index].eventID + '" src="' + eventData.results[index].eventImageLink + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +
            //     '<span>' + '' + '</span>' +
            //     '<span onClick="' + appLink + '" class="mdl-list__item-sub-title" style="margin-left:100px;">' + fullName + ' ' + eventData.results[index].eventDescription + '</span>' +
            //     '</span>' +
            //     '</li>' +
            //     '</ul>' +
            //     '</div>');



            var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
            if (app) {
                var imageCacheTarget = $('#eventID_IMG_' + eventData.results[index].eventID);
                cacheImageCheck(imageCacheTarget);
            } else {

            }



            //   try{

            // }
            //
        // });
        componentHandler.upgradeDom();
        $('#loading').hide();

        //Check if Image is in Cache//

        }
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
