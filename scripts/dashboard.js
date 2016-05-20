   window.view = "Global";

   window.app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
if (window.app) {
window.deepLinkURL = 'app.html';
}
else{
 window.deepLinkURL = '';
}


   function teachingsLoad(pressed) {

     window.currentView = "Teachings";
     $('#loading').show();
     $('#contentHolder').empty();
     $('#searchBar').remove();
     $('#activity').removeClass('is-active');
     $('#teachings').addClass('is-active');
     $('#teachingBar').show();
     $('#needsBar').hide();
     $('#sermonsButton').addClass('is-active');
     $('#verseByVerseButton').removeClass('is-active');
     $('#bibleButton').removeClass('is-active');
     $('#needs').removeClass('is-active');
     $('#members').removeClass('is-active');
     $('#churches').removeClass('is-active');
     //  $('#speakers').removeClass('is-active');
     $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     //  $('#filtersVBV').hide();
     sermonsLoad();
     //  $('#filtersVBV').hide();
     //  $('#filtersChurches').hide();
     //  $('#filtersSpeakers').hide();
     //  $('#filtersMembers').hide();
     //  $('#filtersSermons').show();
     //   bindToSearches();

     //Search Bar Change
     //  bindToSearches();
     if (pressed == "True"){
     setURLChange('Teachings', window.deepLinkURL + '?section=Teachings');
     }
   }

   function sermonsLoad(pressed) {
     window.currentView = "Teachings";
     $('#loading').show();
     $('#contentHolder').empty();
     $('#searchBar').remove();
      $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     //  $('#filtersVBV').hide();
     //  $('#filtersSermons').show();
     $('#searchIcon').addClass('is-focused');
     $('#searchIconVBV').addClass('is-focused');
     $("#bars").animate({
       scrollTop: 0
     }, 250, function() {
       $('#individualSermonBar').hide();
       closeSermon();
     });
     $('#speakers').removeClass('is-active');
     $('#sermonsButton').addClass('is-active');
     $('#teachingsButton').removeClass('is-active');
     $('#sermonHistoryButton').removeClass('is-active');
     $('#verseByVerseButton').removeClass('is-active');
     $('#bibleButton').removeClass('is-active');
     loadTeachings(localStorage.getItem('view'), localStorage.getItem('communityID'), '', '', '', '', '');
     // bindToSearches();
     if (pressed == "True"){
     setURLChange('Sermons',  window.deepLinkURL +'?section=Sermons');
     }
   }

   function verseByVerseLoad(pressed) {
     window.currentView = "VBV";
     $('#loading').show();
     $('#searchBar').remove();
     $('#contentHolder').empty();
     $("#bars").animate({
       scrollTop: 0
     }, 250, function() {
       $('#individualSermonBar').hide();
       //  $('#filtersSermons').hide();
       //  $('#filtersVBV').show();
       //  $('#filtersChurches').hide();
       //  $('#filtersSpeakers').hide();
       //  $('#filtersMembers').hide();
     });

      $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     $('#sermonsButton').removeClass('is-active');
     $('#sermonHistoryButton').removeClass('is-active');
     $('#verseByVerseButton').addClass('is-active');
     $('#speakers').removeClass('is-active');
     $('#searchIcon').addClass('is-focused')
     $('#searchIconVBV').addClass('is-focused')
     $('#bibleButton').removeClass('is-active');
     loadVBV(localStorage.getItem('view'), communityID, '');
     console.log('Loaded Verse By Verse');
     closeSermon();
     // bindToSearches();
     if (pressed == "True"){
     setURLChange('VerseByVerse',  window.deepLinkURL + '?section=VerseByVerse');
     }
   }

   function sermonHistoryLoad(pressed) {
     window.currentView = "SermonHistory";
     $('#searchBar').remove();
     $('#loading').show();
     $('#contentHolder').empty();
     $("#bars").animate({
       scrollTop: 0
     }, 250, function() {
       $('#individualSermonBar').hide();
       //  $('#filtersSermons').hide();
       //  $('#filtersVBV').show();
       //  $('#filtersChurches').hide();
       //  $('#filtersSpeakers').hide();
       //  $('#filtersMembers').hide();
     });

      $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     $('#sermonsButton').removeClass('is-active');
     $('#verseByVerseButton').removeClass('is-active');
     $('#sermonHistoryButton').addClass('is-active');
     $('#speakers').removeClass('is-active');
     $('#bibleButton').removeClass('is-active');
     loadSermonHistory(localStorage.getItem('view'), communityID, '');
     closeSermon();

     if (pressed == "True"){
     setURLChange('SermonHistory',  window.deepLinkURL + '?section=SermonHistory');
     }
   }

   function bibleLoad(pressed) {
     window.currentView = "DownloadedContent";
     $('#loading').show();
     $('#searchBar').remove();
     $('#contentHolder').empty();
     //  $('filtersSermons').hide();
     //  $('#filtersChurches').hide();
     //  $('#filtersSpeakers').hide();
     //  $('#filtersMembers').hide();
     //  $('filtersVBV').hide();
     $("#bars").animate({
       scrollTop: 0
     }, 250, function() {
       $('#individualSermonBar').hide();
     });
     loadDownloadedContent('True');
     $('#sermonsButton').removeClass('is-active');
     $('#teachingsButton').removeClass('is-active');
     $('#bibleButton').addClass('is-active');
     $('#verseByVerseButton').removeClass('is-active');
     //  bindToSearches();
     if (pressed == "True"){
     //setURLChange('Teachings', 'app.html?section=Teachings');
   }
   }

   function churchesLoad(pressed) {
     window.currentView = "Churches";
     $('#loading').show();
     $('#searchBar').remove();
     $('#contentHolder').empty();
     $('#speakers').removeClass('is-active');
     $('#activity').removeClass('is-active');
     $('#teachings').removeClass('is-active');
     $('#needs').removeClass('is-active');
      $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     $('#churches').addClass('is-active');
     $('#members').removeClass('is-active');
     $('#teachingBar').hide();
     $('#needsBar').hide();
     //  $('#filtersVBV').hide();
     loadChurches('Global', '', '', 'True');
     //  $('#filtersVBV').hide();
     //  $('#filtersSermons').hide();
     //  $('#filtersChurches').show();
     //  $('#filtersSpeakers').hide();
     //  $('#filtersMembers').hide();
     closeSermon();
     //   bindToSearches();
     if (pressed == "True"){
     setURLChange('Churches',  window.deepLinkURL + '?section=Churches');
   }
   }

   function membersLoad(pressed) {
     window.currentview = "Members";
     $('#searchBar').remove();
     $('#loading').show();
     $('#contentHolder').empty();
     $('#speakers').removeClass('is-active');
     $('#activity').removeClass('is-active');
      $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     $('#teachings').removeClass('is-active');
     $('#churches').removeClass('is-active');
     $('#needs').removeClass('is-active');
     $('#members').addClass('is-active');
     $('#teachingBar').hide();
     $('#needsBar').hide();
     loadMembers(localStorage.getItem('view'), communityID, 'True');
     //  $('#filtersSermons').hide();
     //  $('#filtersVBV').hide();
     //  $('#filtersChurches').hide();
     //  $('#filtersSpeakers').hide();
     //  $('#filtersMembers').show();
     closeSermon();
     //  bindToSearches();
     if (pressed == "True"){
     setURLChange('Members',  window.deepLinkURL + '?section=Members');
   }
   }

   function activityLoad(pressed) {
     window.currentView = "Activity";
     $('#loading').show();
     $('#contentHolder').empty();
     $('#searchBar').remove();
     $('#activity').addClass('is-active');
     $('#teachings').removeClass('is-active');
      $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     $('#needs').removeClass('is-active');
     $('#churches').removeClass('is-active');
     $('#members').removeClass('is-active');
     $('#teachingBar').hide();
     $('#speakers').removeClass('is-active');
     $('#needsBar').hide();
     loadEvents(view, '', '', 'True');
     closeSermon();
     //  $('#filtersSermons').hide();
     //  $('#filtersChurches').hide();
     //  $('#filtersSpeakers').hide();
     //  $('#filtersMembers').hide();
     //  $('#filtersSermons').hide();
     //  $('#filtersVBV').hide();
     //   bindToSearches();
     if (pressed == "True"){
     setURLChange('NewsFeed',  window.deepLinkURL + '?section=NewsFeed');
   }
   }

   function speakersLoad(pressed) {
     window.currentView = "Speakers";
     $('#loading').show();
     $('#searchBar').remove();
     $('#contentHolder').empty();
     $('#activity').removeClass('is-active');
     $('#teachings').removeClass('is-active');
     $('#speakers').addClass('is-active');
     $('#needs').removeClass('is-active');
     $('#churches').removeClass('is-active');
     $('#members').removeClass('is-active');
     $('#teachingBar').hide();
      $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
     $('#needsBar').hide();
     loadSpeakers(localStorage.getItem('view'), localStorage.getItem('communityID'), 'True');
     closeSermon();
     //  $('filtersSermons').hide();
     //  $('#filtersChurches').hide();
     //  $('#filtersMembers').hide();
     //  $('#filtersSpeakers').show();
     //  $('filtersVBV').hide();
     // bindToSearches();
     if (pressed == "True"){
     setURLChange('Speakers',  window.deepLinkURL + '?section=Speakers');
   }
  }

   function needsLoad(pressed) {
     window.currentView = "Needs";
     $('#searchBar').remove();
     $('#contentHolder').empty();
     $('#teachingBar').hide();
     $('#teachingBar').hide();

     $('#needsBar').show();
     $('#activity').removeClass('is-active');
     $('#teachings').removeClass('is-active');
     $('#needs').addClass('is-active');
     $('#members').removeClass('is-active');
     $('#churches').removeClass('is-active');
     $('#speakers').removeClass('is-active');
     closeSermon();
     $('#filtersSermons').hide();
     //  $('#filtersVBV').hide();
     var snackbarContainer = document.querySelector('#alertToast');
    var data = {message: "Needs not Implemented Yet.."};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
       //  bindToSearches();
       if (pressed == "True"){
       setURLChange('Needs',  window.deepLinkURL + '?section=Needs');
       }
   }

   function setViewGlobal() {
     localStorage.setItem("view", 'Global');
     $('#globalButton').addClass('is-active');
     $('#communityButton').removeClass('is-active');
     $('#followButton').removeClass('is-active');
     $('#contentHolder').empty();
     if (window.currentView == "Teachings") {
       teachingsLoad();
     } else if (window.currentView == "VBV") {
       loadVBV();
     } else if (window.currentView == "Speakers") {
       speakersLoad();
     } else if (window.currentView == "Members") {
       membersLoad();
     } else if (window.currentView == "Churches") {
       churchesLoad();
     } else if (window.currentView == "Sermons")  {
       sermonsLoad();
     } else if (window.currentView == "VerseByVerse") {
       verseByVerseLoad();
   }
   }

   function setViewCommunity() {
     localStorage.setItem("view", 'Community');
     window.view = "Community"
     $('#globalButton').removeClass('is-active');
     $('#communityButton').addClass('is-active');
     $('#followButton').removeClass('is-active');
     $('#contentHolder').empty();

     if (window.currentView == "Teachings") {
       teachingsLoad();
     } else if (window.currentView == "VBV") {
       verseByVerseLoad();
     } else if (window.currentView == "Speakers") {
       speakersLoad();
     } else if (window.currentView == "Members") {
       membersLoad();
     } else if (window.currentView == "Churches") {
       churchesLoad();
     } else {}

   }

   function setViewFollow() {
     localStorage.setItem("view", 'Follow');
     $('#globalButton').removeClass('is-active');
     $('#communityButton').removeClass('is-active');
     $('#followButton').addClass('is-active');
     $('#contentHolder').empty();
     if (window.currentView == "Teachings") {
       teachingsLoad();
     } else if (window.currentView == "VBV") {
       verseByVerseLoad();
     } else if (window.currentView == "Speakers") {
       speakersLoad();
     } else if (window.currentView == "Members") {
       membersLoad();
     } else if (window.currentView == "Churches") {
       churchesLoad();
     } else {}
   }

   function search() {
     $('#contentHolder').empty();
     title = document.getElementById('search').value;
     loadTeachings(localStorage.getItem('view'), localStorage.getItem('communityID'), '', '', title, '', '');
   }

   function bindToSearches() {

     //  $('#searchIcon').addClass('is-focused');
     //  $('#searchIconVBV').addClass('is-focused');
     //  $('#searchIconChurches').addClass('is-focused');
     //  $('#searchIconSpeakers').addClass('is-focused');
     //  $('#searchIconMembers').addClass('is-focused');
     //$('#searchIcon').addClass('is-focused');

     $('#searchTextBox').on('input', function(e) {
       textValue = document.getElementById('searchTextBox').value;
       console.log(textValue);
       if (textValue.length > 2) {
         if (window.currentView == "Teachings") {
           loadTeachingDataCache(textValue);
           console.log('true');
         } else if (window.currentView == "VBV") {
           loadTeachingDataCacheVBV(textValue);
         } else if (window.currentView == "Speakers") {
           loadSpeakerDataCache(textValue);
         } else if (window.currentView == "Members") {
           loadMemberDataCache(textValue);
         } else if (window.currentView == "Churches") {
           loadChurchDataCache(textValue);
         } else {}
       }
     });
   }



   viewName = 'Global';

  setViewGlobal();
  $('.beta').hide();
   initializeDeepLinks();

   var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
//   //CODE RAN ON APP
//   if (app) {
//     ImgCache.options.chromeQuota = 50 * 1024 * 1024;
//     document.addEventListener("deviceready", onDeviceReady, false);
//
//     function onDeviceReady() {
//       getLocalFilesPushToLocalStorage();
//       setBackground();
//       ImgCache.init(function() {
//         setViewGlobal();
//
//        // loadEvents(localStorage.getItem('view'), communityID, '', 'True');
//       }, function() {
//         alert('ImgCache init: error! Check the log for errors');
//       });
//       $('.beta').hide();
//       if (localStorage.getItem('betaEnabled') === 'True') {
//         $('.beta').show();
//       }
//       initialLoad();
//       startApp();
//       initializeDeepLinks();
//       bindSearchButton();
//     }
//   } else {
//     //CODE RAN ON WEB
//
//     $(document).ready(function() {
//
//       //  getLocalFilesPushToLocalStorage(); -- NO LOCAL STORAGE ENABLED FOR WEB YET.
//
//       //ImgCache.init(function() {
//
//
//       // bindSearchButton();
//
//       // }, function() {
//       //     alert('ImgCache init: error! Check the log for errors');
//       // });
//
//       if (localStorage.getItem('betaEnabled') === 'True') {
//         $('.beta').show();
//       }
//       //initialLoad();
//       startApp();
//
//     });
//   }

    
   function startApp() {
     $('#launch').hide();

   }
   //initial run
   if (localStorage.getItem('betaEnabled') == null) {
     localStorage.setItem('betaEnabled', 'False');
     $('.beta').hide();

   } else {}

   function toggleBeta() {
     if (localStorage.getItem('betaEnabled') == null) {
       localStorage.setItem('betaEnabled', 'True');
       alert('Beta Features Enabled - Expect buttons to explode.');
     } else if (localStorage.getItem('betaEnabled') == 'True') {
       localStorage.setItem('betaEnabled', 'False');
       alert('Disabled Beta Features.');
       $('.beta').hide();
     } else {
       localStorage.setItem('betaEnabled', 'True');
       alert('Beta Features Enabled - Expect buttons to explode.');
       $('.beta').show();
     }
   }





   function initializeDeepLinks() {

     if ($.url().param('sermonid') == null) {} else {
       sermonID = parseInt($.url().param('sermonid'));
       //teachingsLoad('True');
       $('#contentHolder').empty();
       loadIndividualSermon(sermonID);
     }

     if ($.url().param('section') != null) {
       section = $.url().param('section');
       if (section == "Teachings") {
         teachingsLoad();
       } else if (section == "Churches") {
         churchesLoad();
       } else if (section == "Members") {
         membersLoad();
     } else if (section == "Speakers") {
        speakersLoad();
     } else if (section == "NewsFeed") {
        activityLoad();
    }
    else if (section == "Sermons") {
        sermonsLoad();
    }
     else if (section == "VerseByVerse") {
        verseByVerseLoad();
    }

     else if (section == "SermonHistory"){
     sermonHistoryLoad();
     }
    }
    else{
    //loadEvents(localStorage.getItem('view'), communityID, '', 'True');
    teachingsLoad();
    }


   }



   function setURLChange(title, urlPath) {
     window.history.pushState({
       "pageTitle": title
     }, "", urlPath);
   }

   window.onpopstate = function(e) {
     if (e.state) {
       console.log(event.state);
       document.title = e.state.pageTitle;
     }
   };

  function disableNonMemberFunction(){
     $('#communityButton').css('color','#946720');
     $('#communityButton').prop('onclick',null).off('click');
     $('#followButton').css('color','#946720');
     $('#followButton').prop('onclick',null).off('click');
     $('profileImage').hide();
     $('#bibleButton').css('color','rgb(158, 70, 58)');
     $('#bibleButton').prop('onclick',null).off('click');
     $('#needsButton').css('color','#946720');
     $('#needsButton').prop('onclick',null).off('click');

     $('#sermonHistoryButton').css('color','rgb(102, 84, 82)');
     $('#sermonHistoryButton').prop('onclick',null).off('click');

     $('#loginButton').show();
    //var snackbarContainer = document.querySelector('#alertToast');
   // var data = {message: "You Are Not Logged In.. Register or Login."};
    //snackbarContainer.MaterialSnackbar.showSnackbar(data);

   }


function bindSearchButton(){
  $('#quick-search').blur(function() {
  $('#globalButton').show();
  $('#searchTopDiv').removeClass('searchMarginLeft');
  $('#communityButton').show();
  $('#searchTopDiv').removeClass('is-dirty');
  });
  }

function toggleHideRecommendedSermons(){
  recommendedSermonBox = $('#recommendedSermonBox').children()[1];

  if ($(recommendedSermonBox).css("display") == "none"){
   $( "#recommendedSermonBox" ).children().fadeIn( "slow", function() {
  });

$('#recommendedSermonBox').parent().show();

  $('#recommendedSermonArrowButton').css('transform','rotate(180deg)');

  }
  else{

   $( "#recommendedSermonBox" ).children().fadeOut( "slow", function() {
   $('#recommendedSermonBox').children().hide();
  });

$('#recommendedSermonBox').parent().hide();

  $('#recommendedSermonArrowButton').css('transform','rotate(0deg)');
}
  }

function toggleHideRecommendedPlaylists(){
  recommendedPlaylistBox = $('#recommendedPlaylistBox').children()[1];

  if ($(recommendedPlaylistBox).css("display") == "none"){
   $( "#recommendedPlaylistBox" ).children().fadeIn( "slow", function() {
  });
   $('#recommendedPlaylistBox').parent().show();


  $('#recommendedPlaylistsArrowButton').css('transform','rotate(180deg)');

  }
  else{

   $( "#recommendedPlaylistBox" ).children().fadeOut( "slow", function() {
   $('#recommendedPlaylistBox').children().hide();
  });

  $('#recommendedPlaylistBox').parent().hide();

  $('#recommendedPlaylistsArrowButton').css('transform','rotate(0deg)');
}
  }

