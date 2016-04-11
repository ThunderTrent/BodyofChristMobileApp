  window.view = "Global";

  function teachingsLoad(){
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
  sermonsLoad();
  $('#filters').append('<div class="mdl-textfield mdl-js-textfield"><i class="material-icons">date_range</i><div style=""><input class="mdl-textfield__input" id="date" type="text"></div><label class="mdl-textfield__label">Date Filter</label></div>';
')
  }

  function sermonsLoad(){
  $('#loading').show();
   $('#contentHolder').empty();
   $("#bars").animate({ scrollTop: 0 }, 250, function(){
   $('#individualSermonBar').hide();
   closeSermon();
   });

  $('#sermonsButton').addClass('is-active');
  $('#teachingsButton').removeClass('is-active');
  $('#verseByVerseButton').removeClass('is-active');
  $('#bibleButton').removeClass('is-active');

  loadTeachings(localStorage.getItem('view'), communityID, '');

  }
  function verseByVerseLoad(){
  $('#loading').show();
   $('#contentHolder').empty();
   $("#bars").animate({ scrollTop: 0 }, 250, function(){
   $('#individualSermonBar').hide();
   });

  $('#sermonsButton').removeClass('is-active');
  $('#verseByVerseButton').addClass('is-active');
  $('#bibleButton').removeClass('is-active');

  loadVBV(localStorage.getItem('view'), communityID, '');
  console.log('Loaded Verse By Verse');
  closeSermon();

  }
  function bibleLoad(){
   $('#loading').show();
   $('#contentHolder').empty();
   $("#bars").animate({ scrollTop: 0 }, 250, function(){
   $('#individualSermonBar').hide();
   });

  $('#sermonsButton').removeClass('is-active');
  $('#teachingsButton').removeClass('is-active');
  $('#bibleButton').addClass('is-active');
  $('#verseByVerseButton').removeClass('is-active');
  }

  function churchesLoad(){
  $('#loading').show();
   $('#contentHolder').empty();
  $('#activity').removeClass('is-active');
  $('#teachings').removeClass('is-active');
  $('#needs').removeClass('is-active');
  $('#churches').addClass('is-active');
  $('#members').removeClass('is-active');
  $('#teachingBar').hide();
  $('#needsBar').hide();

  loadChurches('Global','','','True');


   closeSermon();
  }

   function membersLoad(){
   $('#loading').show();
  $('#contentHolder').empty();

  $('#activity').removeClass('is-active');
  $('#teachings').removeClass('is-active');
  $('#churches').removeClass('is-active');
  $('#needs').removeClass('is-active');
  $('#members').addClass('is-active');
  $('#teachingBar').hide();
  $('#needsBar').hide();

  loadMembers(localStorage.getItem('view'),communityID,'True');

    closeSermon();
  }




  function activityLoad(){
  $('#loading').show();
  $('#contentHolder').empty();

  $('#activity').addClass('is-active');
  $('#teachings').removeClass('is-active');
  $('#needs').removeClass('is-active');
  $('#churches').removeClass('is-active');
  $('#members').removeClass('is-active');
  $('#teachingBar').hide();
  $('#needsBar').hide();

  loadEvents(view,'');
  closeSermon();
  }

  function needsLoad(){
  $('#loading').show();
  $('#contentHolder').empty();
  $('#teachingBar').hide();
  $('#teachingBar').hide();
  $('#needsBar').show();
  $('#activity').removeClass('is-active');
  $('#teachings').removeClass('is-active');
  $('#needs').addClass('is-active');
  $('#members').removeClass('is-active');
  $('#churches').removeClass('is-active');
  closeSermon();
  }

function setViewGlobal(){
localStorage.setItem( "view", 'Global');
$('#globalButton').addClass('is-active');
$('#communityButton').removeClass('is-active');
$('#followButton').removeClass('is-active');
$('#contentHolder').empty();
}


function setViewCommunity(){
localStorage.setItem( "view", 'Community');
$('#globalButton').removeClass('is-active');
$('#communityButton').addClass('is-active');
$('#followButton').removeClass('is-active');
$('#contentHolder').empty();

}

function setViewFollow(){
localStorage.setItem( "view", 'Follow');
$('#globalButton').removeClass('is-active');
$('#communityButton').removeClass('is-active');
$('#followButton').addClass('is-active');
$('#contentHolder').empty();
}
