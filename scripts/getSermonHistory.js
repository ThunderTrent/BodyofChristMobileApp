
function loadSermonHistory(search, communityID, userID) {

    var isOffline = 'onLine' in navigator && !navigator.onLine;

    if (search == "Global") {
        viewNamely = 'Globally';
        url ='https://www.thebodyofchrist.us/service/phonegap/sermonhistory/'
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
        url: url,
        type: "GET",
    }).done(function(sermonHistoryData, textStatus, jqXHR) {


      $('#filtersSermons').after('<div id="sermonHistorySearchBar" class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="width:100% !important;height: 52px;background-color: #DE5F4D !important;margin-left:0px;margin-top:25px;"><input id="searchHistoryInput" style="width:90%;height:34px;margin-left:5%;outline:none !important;border:none !important;background-color:#EC8374;font-weight: 500;font-size: 14px;color:white;padding-left:20px;text-transform: uppercase;font-family:"Open Sans", sans-serif;"></div>')

      $('#contentHolder').append(sermonHistoryData);

$( "#loader-wrapper" ).fadeOut( "slow", function() {

$("#searchHistoryInput").on("change paste keyup", function() {
 $('#contentHolder').empty();
 query = document.getElementById('searchHistoryInput').value;
 jQuery.ajax({
        url: 'https://www.thebodyofchrist.us/service/phonegap/sermonhistory/?q=' + query,
        type: "GET",
    }).done(function(sermonHistoryData, textStatus, jqXHR) {
    $('#contentHolder').append(sermonHistoryData);
    });
});

    });




        $('#loading').hide();
    });
}

