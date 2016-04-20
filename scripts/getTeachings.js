// function downloadFile(name,dataUrl) {
//   var fileTransfer = new FileTransfer();
//     store = cordova.file.dataDirectory;
//     fileName = name +  ".json";
//     fileTransfer.download(dataUrl, store + fileName,
//         function(entry) {
//             console.log("DownloadedJSON!");
//             //alert('Downloaded');
//         },
//         function(err) {
//             console.log("Error");
//            });


// }



function loadTeachings(search, communityID, userID, insert, title, date, date2, sermonID) {    
  if (title == "") {        
    title = "*";    
  } else {}

  var isOffline = 'onLine' in navigator && !navigator.onLine;

      
  if (search == "Global") {
    //check online status
    if (isOffline === false) {

       
      url = 'https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=25&speakerid=*&ordering=-downloadedcontentid&typeofcontent=Sermon&title=' + title;
      name = "globalTeachings";
    } else {
      url = 'cdvfile://localhost/library-nosync/globalTeachings.json';
    }        
    target = '#contentHolder';        
    loadSermonsInsert(url, target, insert, name);    
  } else if (search == "Community") {
    if (isOffline === false) { 
      url = 'https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=25&speakerid=*&ordering=-downloadedcontentid&typeofcontent=Sermon&communityID=' + communityID + '&title=' + title;
      name = "communityTeachings";
    } else {
      url = 'localurl';
    }           
    target = '#contentHolder';        
    loadSermonsInsert(url, target, insert, name);    
  } else if (search == "IndividualSermon") {
    if (isOffline === false) { 
      url = 'https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=25&speakerid=*&title=*&downloadedcontentid=' + sermonID;
      name = sermonID + '_Teachings';
    } else {
      url = 'localurl';
    }               
    target = '#contentHolder';        
    loadSermonsInsert(url, target, insert, name);    
  } else if (search == "Following") {        
    window.followArray = [];
     $.each(followData.results, function(index, value) {            
      if (followData.results[index].followtype == "Speaker") {                
        followArray.push(followData.results[index].followeeSpeaker);            
      } else {

      }
      if (isOffline === false) { 
        url = 'https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=25&ypeofcontent=Sermon&speakerid=' + followArray + '&title=' + window.title;
        name = 'followingTeachings'
      } else {
        url = 'localurl';
      }                         
      target = '#contentHolder';            
      loadSermonsInsert(url, target, insert, name);



              
    })    
  }
}

function loadSermonsInsert(url, target, insert, name) {

      
  jQuery.ajax({        
    url: url,
            type: "GET",
        
  }).done(function(teachingData, textStatus, jqXHR) {        
    console.log("HTTP Request Succeeded: " + jqXHR.status);        
    window.teachingData = teachingData;

    //check to see if file exists in cache to save it to
    //console.log('test');
    if (url.split(':')[0] == "https") {

    } else {
      downloadFile(name, url);

    }
    //console.log('test');



    $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="height: 52px;"><span style="margin-top: 8px;font-size: 17px;">' + teachingData.count + ' Sermons Indexed Globally</span></div>');


            
    $.each(teachingData.results, function(index, value) {



                   //Get Name for user
                  
      churchID = parseInt(teachingData.results[index].churchid);            
      speakerID = parseInt(teachingData.results[index].speaker);

                  
      function arrayLookup(array, prop, val) {                
        for (var i = 0, len = array.length; i < len; i++) {                    
          if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {                        
            return array[i];                    
          }                
        }                
        return null;            
      }

                  
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



                  
      $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"  style=";">' +                 '<ul class="demo-list-two mdl-list">' +                 '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +                 '<span class="mdl-list__item-primary-content" style="margin-top:-35px;width:100%;">' +
        '<img style="border-radius:20px;margin-top:-6px;width:80px;height:80px;position:absolute;" id="teachingID_IMG_' + teachingData.results[index].downloadedcontentid + '" src="https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?sermonid=' + teachingData.results[index].downloadedcontentid + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +                             '<span style="margin-left:100px;display:-webkit-inline-box;" onclick="loadIndividualSermon(' + teachingData.results[index].downloadedcontentid + ');">' + teachingData.results[index].title + '</span><br>' +                 '<span style="margin-left:100px;"class="mdl-list__item-sub-title">' + speakerName + '</span>' +                 '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + churchName + '</span>' +                 '</span>' +                 '</li>' +                 '</ul>' +                 '</div>');



      var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
      if (app) {
        var imageCacheTarget = $('#teachingID_IMG_' + teachingData.results[index].downloadedcontentid);
        cacheImageCheck(imageCacheTarget);
      } else {

      }


              
    });        
    componentHandler.upgradeDom();        
    console.log('Teachings Loaded');        
    $('#loading').hide();    
  });
}


function loadIndividualSermon(sermonID) {    
  $('#filters').hide();    
  $('#loading').show();    
  url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=1&speakerid=*&title=*&downloadedcontentid=' + sermonID;

      
  jQuery.ajax({        
    url: url,
            type: "GET",
        
  }).done(function(sermonData, textStatus, jqXHR) {        
    $('#loading').hide();        
    console.log("HTTP Request Succeeded: " + jqXHR.status);        
    window.sermonData = sermonData;        
    window.sermonID = sermonID;        
    window.sermonView = 1;        
    $('#individualSermonBar').show();        
    $("#bars").animate({            
      scrollTop: $(document).height()        
    }, 5000);         //Hide Content
            
    $("#contentHolder").animate({            
      opacity: 0.25,
                  left: "-=2000",
                  height: "toggle"        
    }, 1000, function() {



                  
      function arrayLookup(array, prop, val) {                
        for (var i = 0, len = array.length; i < len; i++) {                    
          if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {                        
            return array[i];                    
          }                
        }                
        return null;            
      }



                  
      try {                
        title = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).title;                
        console.log(title);            
      } catch (err) {                
        console.log('error');                
        title = 'No Title Listed';            
      }

                  
      try {                
        rating = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).rating;                
        console.log(rating);            
      } catch (err) {                
        console.log('error');                
        rating = 'Not Yet Rated';            
      }

                  
      try {                
        churchID = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).churchid;                
        console.log(churchID);                
        churchName = arrayLookup(churchData.results, 'churchid', churchID).churchname;            
      } catch (err) {                
        console.log('error');                
        churchName = 'No Church Name Listed';            
      }

                  
      try {                
        speakerid = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).speaker;                
        console.log(speakerid);                
        speakerName = arrayLookup(speakerData.results, 'speakerid', speakerid).speakername;            
      } catch (err) {                
        console.log('error');                
        speakerName = 'No Speaker Listed';            
      }

      try {
        cleanTitle = title.split('by')[0];
      } catch (err) {
        cleanTitle = title;
      }

      downloadedContent = window.localStorage.getArray("downloadedContent");

      if (downloadedContent == null) {
        console.log('No content array made yet.');
        downloadedContent = [];
      } else {
        window.audioSource = '';
        window.audioSource = null;
        var i = 0;
        arrayLength = (downloadedContent.length - 1);
        while (i <= arrayLength) {
          if (downloadedContent[i].SermonID == sermonID) {
            alert('Found Sermon ID in local content');
            window.audioSource = 'cdvfile://localhost/library-nosync/' + sermonID + '.mp3';
            url = 'cdvfile://localhost/library-nosync/' + sermonID + '.mp3';
            initAudioPlayer(url);
            break;
          } else {}
          i++;
        }
      }


      try {
        if (window.audioSource) {
          window.audioCode =   '<input id="teachingSlider" class="mdl-slider mdl-js-slider" type="range" min="0" max="100" value="0" tabindex="0">' +                     '<div id="audioHolderContainer" style="display:-webkit-box;color:#23140B;">' +                    '<div style="width:32%;text-align:center;"><i id="rewindButton" class="material-icons" style="text-align:center;font-size:30px;">fast_rewind</i></div>' +                     '<div style="width:32%;text-align:center;"><i id="playButton" onclick="play();"class="material-icons" style="text-align:center;font-size:30px;">play_arrow</i></div>' +                     '<div style="width:32%;text-align:center;"><i id="fastforwardButton" class="material-icons" style="text-align:center;font-size:30px;">fast_forward</i></div></div>';
        } else { 
          window.audioCode = '<audio style="margin-top:50px;width:100%;" id="teachingAudio" controls>' +
            '<source src="' + 'https://storage.googleapis.com/boc-audio/sermonsMP3/' + sermonID + '.mp3' + '" type="audio/mp3">' +                     '</audio>';

        }
      } catch (err) { 
        window.audioCode = '<audio style="margin-top:50px;width:100%;" id="teachingAudio" controls>' +
          '<source src="' + 'https://storage.googleapis.com/boc-audio/sermonsMP3/' + sermonID + '.mp3' + '" type="audio/mp3">' +                     '</audio>';
      }


                  
      audioStatus = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).audioStatus;                           
      $('#sermonContent').append('<div id="gradientSermonContent" style="   position: absolute; border-radius:40px;    width: calc(100% - 32px); margin:8px;  height: 100%;   background: -webkit-radial-gradient(center, ellipse cover, rgba(30, 87, 153, 0) 0%,rgba(0, 0, 0, 0) 50%,rgba(2, 2, 2, 0.25) 100%);' +
        '"></div>' +
        '<div id="sermonContentInside" class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;position:absolute;background-color: rgba(255, 255, 255, 0.42) !important;border-radius:40px;">' +

        '<center><img src="img/CrossWood.png" style="width: 50%; -webkit-animation: crossChange 10s infinite;"></center>' +                     '<span class="mdl-list__item sermonText" style="font-family:\'Ubuntu\';font-size:23px;"> Title:' + cleanTitle + '</span>' +                      // '<div><img src="https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?sermonid=5439" style="height:100px;width:100px;border-radius:20px;" /></div>'+
                            '<span class="mdl-list__item sermonText" style="font-family:\'Ubuntu\';font-size:23px;">Speaker: ' + speakerName + '</span>' +                     '<span class="mdl-list__item sermonText" style="font-family:\'Ubuntu\';font-size:23px;">Church: ' + churchName + '</span>' +                     // '<canvas id="teachingCanvas" style="width:100%;height:100%;"></canvas>'+
                                              '<span class="mdl-list__item sermonText" style="font-family:\'Ubuntu\';">Public Rating: ' +
        '<div class="stars">' +
        '<form action="">' +
        '<select id="publicRating">' +
        '<option id="publicRating1" value="1">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '<option value="4">4</option>' +
        '<option value="5">5</option>' +
        '</select>' +
        '</form>' +

        '</div>' +
        '</span>' +  '<span class="mdl-list__item sermonText" style="font-family:\'Ubuntu\';">Your Rating: ' +
        '<div class="stars">' +
        '<form action="">' +
        '<select id="yourRating">' +
        '<option id="yourRating1" value="1">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '<option value="4">4</option>' +
        '<option value="5">5</option>' +
        '</select>' +
        '</form>' +

        '</div>' +
        '</span>' +
        window.audioCode +                     '' +                     '' +
        '<div style="margin-top:20px;width:90%;" class="demo-list-action mdl-list">' +   '<div class="mdl-list__item">' +     '<span style="width:100%;" class="mdl-list__item-primary-content">' +       '<i class="material-icons mdl-list__item-avatar" style="color:white;background-color:rgba(0, 115, 183, 0.79);">cloud_download</i>' +       '<span style="width:100%;"><button style="width:100%;background-color:rgba(221, 75, 57, 0.75);color:white;" onClick="downloadMP3(' + sermonID + ');" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Download to Device</button></span>' +     '</span>' +
        '</div>' +
        '<div  id="markAsListenedButton" class="mdl-list__item">' +
        '<span style="width:100%;" class="mdl-list__item-primary-content">' +
        '<i class="material-icons mdl-list__item-avatar" style="color:white;background-color:rgba(0, 115, 183, 0.79);">headset</i>' +
        '<span style="width:100%;"><button style="width:100%;background-color:rgba(221, 75, 57, 0.75);color:white;"" onclick="markaslistened(' +   sermonID + ');" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Mark as Listened</button></span>' +     '</span>' +
        '</div>' +   '<div class="mdl-list__item">' +     '<span style="width:100%;" class="mdl-list__item-primary-content">' +       '<i class="material-icons mdl-list__item-avatar" style="color:white;background-color:rgba(0, 115, 183, 0.79);">person</i>' +       '<span style="width:100%;"><button style="width:100%;background-color:rgba(221, 75, 57, 0.75);color:white;" onclick="nyi();" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Recommend Teaching</button></span>' +     '</span>' +     '<span class="mdl-list__item-secondary-content">' +   '</span>' +   '</div>' +     '<div class="mdl-list__item">' +     '<span style="width:100%;" class="mdl-list__item-primary-content">' +       '<i class="material-icons mdl-list__item-avatar" style="color:white;background-color:rgba(0, 115, 183, 0.79);">cast</i>' +       '<span style="width:100%;"><button style="width:100%;background-color:rgba(221, 75, 57, 0.75);color:white;" onclick="nyi();" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Cast to Device</button></span>' +     '</span>' +     '<span class="mdl-list__item-secondary-content">' +   '</span>' +   '</div>' +     '<div class="mdl-list__item">' +     '<span style="width:100%;" class="mdl-list__item-primary-content">' +       '<i class="material-icons mdl-list__item-avatar" style="color:white;background-color:rgba(0, 115, 183, 0.79);">airplay</i>' +       '<span style="width:100%;"><button style="width:100%;background-color:rgba(221, 75, 57, 0.75);color:white;" onclick="nyi();" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Airplay to Apple TV</button></span>' +     '</span>' +     '<span class="mdl-list__item-secondary-content">' +   '</span>' +   '</div>' +
        '</div>' +
        '</div>' +                     '</div>');

      setTimeout(function() {
        sermonContentHeight = $('#sermonContentInside').height();
        $('#gradientSermonContent').height(sermonContentHeight + 'px');
        checkIfListened();
        //$('#sermonContentInside > span:nth-child(5) > div > form > div > div > a.br-selected.br-current').removeClass('br-selected br-current');
        //$('#sermonContentInside > span:nth-child(6) > div > form > div > div > a.br-selected.br-current').removeClass('br-selected br-current');


      }, 400);



                        
      url = 'https://storage.googleapis.com/boc-audio/sermons_mp3/' + sermonID + '.mp3';

      window.sermonInfo = [];
      window.sermonInfo.push({
        "teachingTitle": title,
        "speaker": speakerName,
        "SermonID": sermonID,
        "churchName": churchName,
        "rating": rating
      });

      if (rating == null) {
        rating = 0;
      } else {}


      try {
        yourRatingValue == null;
      } catch (err) {
        console.log('Rating Not Set Yet.');
      }
      try {
        sermonHistoryByUsernameThenSermonID == null;
      } catch (err) {
        console.log('Rating Not Set Yet.');
      }

      sermonHistoryByUsernameThenSermonID = $.fn.filterJSON({
        sermonRatingHistoryCACHE
      }, {
        property: ["sermonid"], // mandatory
        wrapper: true,
        value: window.sermonID,
        checkContains: true,
        startsWith: true,
        matchCase: false,
        avoidDuplicates: true,
        sort: false,
        sortOrder: 'desc'
      });

      if (sermonHistoryByUsernameThenSermonID.length > 0) {
        yourRatingValue = sermonHistoryByUsernameThenSermonID[0].ratingvalue;
      } else {
        yourRatingValue = 0;
      }

      if (yourRatingValue > 0) {
        $(function() {
          $('#yourRating').barrating({
            theme: 'fontawesome-stars',
            initialRating: yourRatingValue,
          });
        });
      } else {
        $(function() {
          $('#yourRating').barrating({
            theme: 'fontawesome-stars',
            initialRating: yourRatingValue,
          });
        });
        $('#sermonContentInside > span:nth-child(6) > div > form > div > div > a.br-selected.br-current').removeClass('br-selected');
      }




      $("#yourRating").change(function() {
        setRating();
      });


      if (rating > 0) {
        $(function() {
          $('#publicRating').barrating({
            theme: 'fontawesome-stars',
            initialRating: rating,
            readonly: true,
          });
        });
      } else {
        $(function() {
          $('#publicRating').barrating({
            theme: 'fontawesome-stars',
            initialRating: rating,
            readonly: true,
          });
        });
        $('#sermonContentInside > span:nth-child(5) > div > form > div > div > a.br-selected.br-current').removeClass('br-selected');
      }


      addView();









                      
    });

            
    $('#loading').hide();    
  });
}

function downloadMP3() {
  url = 'https://storage.googleapis.com/boc-audio/sermonsMP3/' + window.sermonInfo[0].SermonID + '.mp3';
  var fileTransfer = new FileTransfer();
  fileTransfer.onprogress = function(result) {
    var percent = result.loaded / result.total * 100;
    percent = Math.round(percent);
    console.log('Downloaded:  ' + percent + '% =)');
    loadingBarPercent = (percent / 100);
    console.log(loadingBarPercent);
    NProgress.set(loadingBarPercent);
  };
  console.log("About to start transfer");
  NProgress.start();
  store = cordova.file.dataDirectory;
  fileName = window.sermonInfo[0].SermonID + ".mp3";
  // var dialog = document.getElementById('downloading');
  //dialog.showModal();
  fileTransfer.download(url, store + fileName,
    function(entry) {
      console.log("Success!");
      alert('Downloaded');

      downloadedContent = window.localStorage.getArray("downloadedContent");
      if (downloadedContent == null) {
        localStorage.setArray("downloadedContent", window.sermonInfo);
      }
      downloadedContent.push(window.sermonInfo[0]);
      localStorage.setArray("downloadedContent", downloadedContent);
      console.log('Updated Downloaded Content Local Storage');
      console.log(downloadedContent);

      NProgress.done();
    },
    function(err) {
      console.log("Error");
      //console.dir(err);
      NProgress.done();
    });


}










function initAudioPlayer(url) {

  window.media = new Media(url);     //audio = document.getElementById('teachingAudio');
       //audio.play();
       // Set object references
      
  playbtn = document.getElementById('playButton');     //mutebtn = document.getElementById("mutebtn");
      
  seekslider = document.getElementById("teachingSlider");     //volumeslider = document.getElementById("volumeslider");
       // Add Event Handling
       //mutebtn.addEventListener("click", mute);
       //seekslider.addEventListener("change",seekAudio,false);
       //audio.addEventListener("timeupdate",seektimeupdate,false);
       // seekslider.addEventListener("mousedown", function(event) {
       //     seeking = true;
       //     seek(event);
       // });
       //seekslider.addEventListener("mousemove", function(event) {
        //   seek(event);
      // });
     //  seekslider.addEventListener("mouseup", function() {
      //     seeking = false;
       //});
       //volumeslider.addEventListener("mousemove", setvolume);
       // Functions


       // function mute() {
       //     if (audio.muted) {
       //         audio.muted = false;
       //         //mutebtn.style.background = "url(images/speaker.png) no-repeat";
       //     } else {
       //         audio.muted = true;
       //         // mutebtn.style.background = "url(images/speaker_muted.png) no-repeat";
       //     }
       // }

      
  function seekAudio() {      
    var duration = window.media.getDuration();    
    var seekto = (duration * (seekslider.value / 100));   
    window.media.seekTo(seekto * 1000);  
  }

  // function seektimeupdate(){
  //   var nt = audio.currentTime * (100 / audio.duration);
  //   seekslider.value = nt;
  // }

       // function seek(event) {
       //     if (seeking) {
       //         seekslider.value = event.clientX - seekslider.offsetLeft;
       //         seekto = audio.duration * (seekslider.value / 100);
       //         audio.currentTime = seekto;
       //     }
       // }

       // function setvolume() {
       //     audio.volume = volumeslider.value / 100;
       // }
}

function nyi() {
  alert('Not Yet Implemented.');
}



function closeSermon() {    
  if (window.sermonView == 1) {        
    $("#contentHolder").animate({            
      opacity: 1,
                  left: "+=2000",
                  height: "toggle"        
    }, 1000, function() {});    
  }    
  $('#sermonContent').empty();    
  window.sermonView = 0;    
  $('#individualSermonBar').hide();

}


function markaslistened(sermonid) {

      
  jQuery.ajax({        
    url: 'https://www.thebodyofchrist.us/service/sermonhistory/add/?sermonid=' + sermonid,
            type: "GET",
        
  }).done(function(results, textStatus, jqXHR) {
    $('#markAsListenedButton').hide();
    alert(results);
  });



}

  
function seekAudio() {    
  var seekto = window.media.getDuration() * (seekslider.value / 100);   
  window.media.seekTo(seekto);  
}

function play() {            
  window.media.play();  
  playbtn = document.getElementById('playButton');            
  playbtn.innerHTML = "stop";            
  playbtn.onclick = pause;    
}    
function pause() {
  window.media.stop();  
  playbtn = document.getElementById('playButton');            
  playbtn.innerHTML = "play_arrow";            
  playbtn.onclick = play;    
}


function setRating() {
  $('#loading').show();
  sermonID = window.sermonInfo[0].SermonID;
  rating = document.getElementById('yourRating').value;
  url = 'https://www.thebodyofchrist.us/service/setRatingFromSermonID/?sermonID=' + sermonID + '&sermonRating=' + rating;    
  jQuery.ajax({        
    url: url,
            type: "GET",
        
  }).done(function(sermonData, textStatus, jqXHR) {        
    $('#loading').hide();
    alert("Your Rating has been updated.");

  });
}

function addView() {
  sermonID = window.sermonInfo[0].SermonID;
  url = 'https://www.thebodyofchrist.us/service/addView/?sermonID=' + sermonID; 
  jQuery.ajax({        
    url: url,
            type: "GET",
        
  }).done(function(data, textStatus, jqXHR) {
    console.log(data);        
    $('#loading').hide();


  });

}