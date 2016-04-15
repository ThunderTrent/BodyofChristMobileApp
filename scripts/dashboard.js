   window.view = "Global";

   function teachingsLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
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
     $('#speakers').removeClass('is-active');
     $('#filtersVBV').hide();
     sermonsLoad();
     $('#filtersVBV').hide();
     $('#filtersChurches').hide();
     $('#filtersSpeakers').hide();
     $('#filtersMembers').hide();
     $('#filtersSermons').show();
     $('#searchIcon').addClass('is-focused')
     $('#searchIconVBV').addClass('is-focused')
       //Search Bar Change
     bindToSearches();
   }

   function sermonsLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
     $('#filtersVBV').hide();
     $('#filtersSermons').show();
     $('#searchIcon').addClass('is-focused')
     $('#searchIconVBV').addClass('is-focused')
     $("#bars").animate({
       scrollTop: 0
     }, 250, function() {
       $('#individualSermonBar').hide();
       closeSermon();
     });
     $('#speakers').removeClass('is-active');
     $('#sermonsButton').addClass('is-active');
     $('#teachingsButton').removeClass('is-active');
     $('#verseByVerseButton').removeClass('is-active');
     $('#bibleButton').removeClass('is-active');
     loadTeachings(localStorage.getItem('view'), localStorage.getItem('communityID'), '', '', '', '', '');

   }

   function verseByVerseLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
     $("#bars").animate({
       scrollTop: 0
     }, 250, function() {
       $('#individualSermonBar').hide();
       $('#filtersSermons').hide();
       $('#filtersVBV').show();
       $('#filtersChurches').hide();
       $('#filtersSpeakers').hide();
       $('#filtersMembers').hide();
     });
     $('#sermonsButton').removeClass('is-active');
     $('#verseByVerseButton').addClass('is-active');
     $('#speakers').removeClass('is-active');
     $('#searchIcon').addClass('is-focused')
     $('#searchIconVBV').addClass('is-focused')
     $('#bibleButton').removeClass('is-active');
     loadVBV(localStorage.getItem('view'), communityID, '');
     console.log('Loaded Verse By Verse');
     closeSermon();

   }

   function bibleLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
     $('filtersSermons').hide();
     $('#filtersChurches').hide();
     $('#filtersSpeakers').hide();
     $('#filtersMembers').hide();
     $('filtersVBV').hide();
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
   }

   function churchesLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
     $('#speakers').removeClass('is-active');
     $('#activity').removeClass('is-active');
     $('#teachings').removeClass('is-active');
     $('#needs').removeClass('is-active');
     $('#churches').addClass('is-active');
     $('#members').removeClass('is-active');
     $('#teachingBar').hide();
     $('#needsBar').hide();
     $('#filtersVBV').hide();
     loadChurches('Global', '', '', 'True');
     $('#filtersVBV').hide();
     $('#filtersSermons').hide();
     $('#filtersChurches').show();
     $('#filtersSpeakers').hide();
     $('#filtersMembers').hide();
     closeSermon();
   }

   function membersLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
     $('#speakers').removeClass('is-active');
     $('#activity').removeClass('is-active');
     $('#teachings').removeClass('is-active');
     $('#churches').removeClass('is-active');
     $('#needs').removeClass('is-active');
     $('#members').addClass('is-active');
     $('#teachingBar').hide();
     $('#needsBar').hide();
     loadMembers(localStorage.getItem('view'), communityID, 'True');
     $('#filtersSermons').hide();
     $('#filtersVBV').hide();
     $('#filtersChurches').hide();
     $('#filtersSpeakers').hide();
     $('#filtersMembers').show();
     closeSermon();
   }

   function activityLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
     $('#activity').addClass('is-active');
     $('#teachings').removeClass('is-active');
     $('#needs').removeClass('is-active');
     $('#churches').removeClass('is-active');
     $('#members').removeClass('is-active');
     $('#teachingBar').hide();
     $('#speakers').removeClass('is-active');
     $('#needsBar').hide();
     loadEvents(view, '');
     closeSermon();
     $('#filtersSermons').hide();
     $('#filtersChurches').hide();
     $('#filtersSpeakers').hide();
     $('#filtersMembers').hide();
     $('#filtersSermons').hide();
     $('#filtersVBV').hide();
   }

   function speakersLoad() {
     $('#loading').show();
     $('#contentHolder').empty();
     $('#activity').removeClass('is-active');
     $('#teachings').removeClass('is-active');
     $('#speakers').addClass('is-active');
     $('#needs').removeClass('is-active');
     $('#churches').removeClass('is-active');
     $('#members').removeClass('is-active');
     $('#teachingBar').hide();
     $('#needsBar').hide();
     loadSpeakers(localStorage.getItem('view'), communityID, 'True');
     closeSermon();
     $('filtersSermons').hide();
     $('#filtersChurches').hide();
     $('#filtersSpeakers').show();
     $('filtersVBV').hide();
   }

   function needsLoad() {
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
     $('#filtersVBV').hide();
     alert('Needs not Implemented Yet.')
   }

   function setViewGlobal() {
     localStorage.setItem("view", 'Global');
     $('#globalButton').addClass('is-active');
     $('#communityButton').removeClass('is-active');
     $('#followButton').removeClass('is-active');
     $('#contentHolder').empty();
   }

   function setViewCommunity() {
     localStorage.setItem("view", 'Community');
     $('#globalButton').removeClass('is-active');
     $('#communityButton').addClass('is-active');
     $('#followButton').removeClass('is-active');
     $('#contentHolder').empty();

   }

   function setViewFollow() {
     localStorage.setItem("view", 'Follow');
     $('#globalButton').removeClass('is-active');
     $('#communityButton').removeClass('is-active');
     $('#followButton').addClass('is-active');
     $('#contentHolder').empty();
   }

   function search() {
     $('#contentHolder').empty();
     title = document.getElementById('search').value;
     loadTeachings(localStorage.getItem('view'), localStorage.getItem('communityID'), '', '', title, '', '');
   }

   function bindToSearches() {

     $('#searchTitleBox').on('input', function(e) {
       textValue = document.getElementById('searchTitleBox').value;
       console.log(textValue);
       if (textValue.length > 2) {
         loadTeachingDataCache(textValue);
       }
     });
     $('#searchTitleBoxVBV').on('input', function(e) {
       textValue = document.getElementById('searchTitleBoxVBV').value;
       //console.log(textValue);
       if (textValue.length > 2) {
         loadTeachingDataCacheVBV(textValue);
       }
     });
     
       $('#searchTitleBoxSpeakers').on('input', function(e) {
       textValue = document.getElementById('searchTitleBoxSpeakers').value;
       //console.log(textValue);
       if (textValue.length > 2) {
         loadSpeakerDataCache(textValue);
       }
     });
     
       $('#searchTitleBoxMembers').on('input', function(e) {
       textValue = document.getElementById('searchTitleBoxMembers').value;
       //console.log(textValue);
       if (textValue.length > 2) {
         loadMemberDataCache(textValue);
       }
     });
     
       $('#searchTitleBoxChurches').on('input', function(e) {
       textValue = document.getElementById('searchTitleBoxChurches').value;
       //console.log(textValue);
       if (textValue.length > 2) {
         loadChurchDataCache(textValue);
       }
     });

   }