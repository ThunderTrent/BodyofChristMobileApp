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
    } else {
    }
    }

    jQuery.ajax({
        url: url,
        type: "GET",
    }).done(function(speakerData, textStatus, jqXHR) {

        if (insert == "True") {

            $('#filtersSermons').after('<div id="searchBar" class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="width:100% !important;height: 52px;background-color: #DE5F4D !important;margin-left:0px;margin-top:25px;"><input id="speakerInput" placeholder="Search Speaker Name" style="width:90%;height:34px;margin-left:5%;outline:none !important;border:none !important;background-color:#EC8374;font-weight: 500;font-size: 14px;color:white;padding-left:20px;text-transform: uppercase;font-family:"Open Sans", sans-serif;"></div>')

            $('#contentHolder').append(speakerData);

            $('#speakerInput').on('keyup keypress', function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                    e.preventDefault();
                    return false;
                } else {}
            });


            $("#speakerInput").on("change paste keyup", function() {

                $('#contentHolder').empty();
                query = document.getElementById('sermonInput').value;
                jQuery.ajax({
                    url: 'https://www.thebodyofchrist.us/service/phonegap/speakerfeed/?q=' + query,
                    type: "GET",
                }).done(function(teachingData, textStatus, jqXHR) {
                    $('#contentHolder').append(teachingData);
                });
            });




        } else {}
    });

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