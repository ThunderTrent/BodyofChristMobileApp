
function loadSermonHistory(search, communityID, userID) {

    var isOffline = 'onLine' in navigator && !navigator.onLine;

    if (search == "Global") {
        viewNamely = 'Globally';

        name = 'globalVBV';
        target = '#contentHolder';
        sermonHistoryInsert(url, target, name);
    } else if (search == "Community") {
         viewNamely = 'in your community';
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=25&audioStatus=2&speakerid=*&title=*&typeofcontent=Verse%20By%20Verse&ordering=-downloadedcontentid&communityID=' + localStorage.getItem('communityID');
        } else {
            url = 'cdvfile://localhost/library-nosync/communityVBV.json';
        }
        target = '#contentHolder';
        name = 'communityVBV';
        sermonHistoryInsert(url, target, name);
    } else {}
}

function sermonHistoryInsert(url, target, name) {
    jQuery.ajax({
        url: 'https://www.thebodyofchrist.us/service/phonegap/sermonhistory/',
        type: "GET",
    }).done(function(sermonHistoryData, textStatus, jqXHR) {

    $( "#loader-wrapper" ).fadeOut( "slow", function() {

    });

         $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="height: 52px;width:100% !important;"><span style="margin-top: 8px;font-size: 17px;">' + vbvData.count +   ' Teaching History Count '+ viewName + ' </span></div>');
    
      $('#contentHolder').append(sermonHistoryData);






        $('#loading').hide();
    });
}

