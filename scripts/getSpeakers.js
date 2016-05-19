function loadSpeakers(search, communityID, insert) {

    var isOffline = 'onLine' in navigator && !navigator.onLine;

    if (search == "Global") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/service/phonegap/speakerfeed/';
        } else {
            url = 'cdvfile://localhost/library-nosync/globalSpeakers.json';
        }
        name = 'globalSpeakers';
        target = '#contentHolder';
    } else if (search == "Community") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/service/phonegap/speakerfeed/?c=' + communityID;
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
       $( "#loader-wrapper" ).fadeOut( "slow", function() {
    // Animation complete
  });
          if (insert == "True") {
    $('#contentHolder').append(speakerData);
        }else{}
      
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
