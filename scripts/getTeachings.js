function loadTeachings(search, communityID, userID, insert, title, date, date2, sermonID) {
    if (title == "") {
        title = "*";
    } else {}

    var isOffline = 'onLine' in navigator && !navigator.onLine;


    if (search == "Global") {
        //check online status
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/service/phonegap/teachingfeed/'
            name = "globalTeachings";
        } else {
            url = 'cdvfile://localhost/library-nosync/globalTeachings.json';
        }
        target = '#contentHolder';
        loadSermonsInsert(url, target, insert, name);
    } else if (search == "Community") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/service/phonegap/teachingfeed/?c=' + communityID;
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
        url: 'https://www.thebodyofchrist.us/service/phonegap/recommendedfeed/',
    type: "GET",

    }).done(function(recommendedFeedData, textStatus, jqXHR) {

    $('#contentHolder').append(recommendedFeedData);

    });

    jQuery.ajax({
        url: url,
    type: "GET",

    }).done(function(teachingData, textStatus, jqXHR) {


      $('#filtersSermons').after('<div id="searchBar" class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="width:100% !important;height: 52px;background-color: #DE5F4D !important;margin-left:0px;margin-top:25px;"><input id="sermonInput" placeholder="Search Title Name, Book, Topic, Speaker, Church" style="width:90%;height:34px;margin-left:5%;outline:none !important;border:none !important;background-color:#EC8374;font-weight: 500;font-size: 14px;color:white;padding-left:20px;text-transform: uppercase;font-family:"Open Sans", sans-serif;"></div>')

      $('#contentHolder').append(teachingData);

      $('#sermonInput').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
    return false;
  }
});

$( "#loader-wrapper" ).fadeOut( "slow", function() {

$("#sermonInput").on("change paste keyup", function() {



recommendedSermonBox = $('#recommendedSermonBox').children()[1];

 if ($(recommendedSermonBox).css("display") == "none"){
 }
 else{
 toggleHideRecommendedSermons();
 }

 recommendedPlaylistBox = $('#recommendedPlaylistBox').children()[1];

 if ($(recommendedPlaylistBox).css("display") == "none"){

 }
 else{
 toggleHideRecommendedPlaylists();
 }

 $('#sermonContentHolder').empty();
 query = document.getElementById('sermonInput').value;
 jQuery.ajax({
        url: 'https://www.thebodyofchrist.us/service/phonegap/teachingfeed/?q=' + query,
        type: "GET",
    }).done(function(teachingData, textStatus, jqXHR) {
    $('#sermonContentHolder').append(teachingData);
    });
});

    });



            jQuery('.scrollbar-rail').scrollbar();



    });


}
function loadIndividualSermon(sermonID) {
    $('#sermonContent').empty();
        $( "#loader-wrapper" ).fadeIn( "slow", function() {
    // Animation complete
  });
    $('#teachings').addClass('is-active');
    $('#teachingBar').show();
    $('#filters').hide();
    $('#loading').show();

    url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=1&speakerid=*&title=*&downloadedcontentid=' + sermonID;


    jQuery.ajax({
        url: url,
    type: "GET",

    }).done(function(sermonData, textStatus, jqXHR) {
            $( "#loader-wrapper" ).fadeOut( "slow", function() {
    // Animation complete
  });
        $('#loading').hide();
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.sermonData = sermonData;
        setURLChange(sermonData.results[0].title, window.deepLinkURL + '?sermonid=' + sermonID);
        window.sermonID = sermonID;
        window.sermonView = 1;
        $('#individualSermonBar').show();
        $("#bars").animate({
            scrollTop: $(document).height()
        }, 5000); //Hide Content

        $("#contentHolder").animate({
            opacity: 0.25,
      left: "-=2000",
      height: "toggle"
        }, 1000, function() {



//
//            function arrayLookup(array, prop, val) {
//                for (var i = 0, len = array.length; i < len; i++) {
//                    if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {
//                        return array[i];
//                    }
//                }
//                return null;
//            }
//



//            try {
//                title = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).title;
//                console.log(title);
//            } catch (err) {
//                console.log('error');
//                title = 'No Title Listed';
//            }
//
//
//            try {
//                rating = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).rating;
//                console.log(rating);
//            } catch (err) {
//                console.log('error');
//                rating = 'Not Yet Rated';
//            }
//
//
//            try {
//                churchID = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).churchid;
//                console.log(churchID);
//                churchName = arrayLookup(churchData.results, 'churchid', churchID).churchname;
//            } catch (err) {
//                console.log('error');
//                churchName = 'No Church Name Listed';
//            }
//
//
//            try {
//                speakerid = arrayLookup(sermonData.results, 'downloadedcontentid', sermonID).speaker;
//                console.log(speakerid);
//                speakerName = arrayLookup(speakerData.results, 'speakerid', speakerid).speakername;
//            } catch (err) {
//                console.log('error');
//                speakerName = 'No Speaker Listed';
//            }
//
//            try {
//                cleanTitle = title.split('by')[0];
//            } catch (err) {
//                cleanTitle = title;
//            }

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
                        var snackbarContainer = document.querySelector('#alertToast');
                        var data = {
                            message: 'Pulling from Local Downloaded Content '
                        };
                        snackbarContainer.MaterialSnackbar.showSnackbar(data);
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
                    window.audioCode = '<input id="teachingSlider" class="mdl-slider mdl-js-slider" type="range" min="0" max="100" value="0" tabindex="0">' + '<div id="audioHolderContainer" style="display:-webkit-box;color:#23140B;">' +'<div style="width:32%;text-align:center;"><i id="rewindButton" class="material-icons" style="text-align:center;font-size:30px;">fast_rewind</i></div>' + '<div style="width:32%;text-align:center;"><i id="playButton" onclick="play();"class="material-icons" style="text-align:center;font-size:30px;">play_arrow</i></div>' + '<div style="width:32%;text-align:center;"><i id="fastforwardButton" class="material-icons" style="text-align:center;font-size:30px;">fast_forward</i></div></div>';
                } else {
                    window.audioCode = '';

                }
            } catch (err) {
                window.audioCode = '<audio style="margin-top:50px;width:100%;" id="teachingAudio" controls>' +
                    '<source src="' + 'https://storage.googleapis.com/boc-audio/sermonsMP3/' + sermonID + '.mp3' + '" type="audio/mp3">' + '</audio>';
            }


            $.get( "https://www.thebodyofchrist.us/service/phonegap/sermoncontent/?sermonid=" + sermonID, function( sermonData ) {
              $('#sermonContent').append(sermonData);
            }).done(function(sermonData, textStatus, jqXHR) {


            window.audioMP3 = document.getElementById("teachingAudio");
            window.audioMP3.addEventListener("play", function() {
                window.polling = setTimeout(updateAudioStatus, 5000);
            });


            window.audioMP3.addEventListener("pause", function() {
                clearTimeout(window.polling);
            });

            window.audioMP3.addEventListener("pause", function() {
                clearTimeout(window.polling);
            });

            window.audioMP3.onended = function() {
                sermonID = window.sermonID;
                markaslistened(sermonID);
                var snackbarContainer = document.querySelector('#alertToast');
                var data = {
                    message: "We Marked That Teaching as listened for you."
                };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            };


  });



            if (localStorage.getItem('sermonTab2') == null) {
                localStorage.setItem('sermonTab2', 'Bible');
            }
            if (localStorage.getItem('sermonTab3') == null) {
                localStorage.setItem('sermonTab3', 'Playlist');
            }

            function initiateTab2() {
                target = "#secondTabSermon"
                tab2 = localStorage.getItem('sermonTab2');
                if (tab2 == "Bible") {
                    if (sermonData.results[0].book == null) {
                        localStorage.setItem('sermonTab2', 'Empty');
                    } else {
                        $(target).append('<iframe id="bibleFrame" style="width:100%;height:1020px;" src="https://www.thebodyofchrist.us/service/bible/?book=' + sermonData.results[0].book + '&chapter=1"></iframe>');
                        $('#bibleSermonTabButton').addClass('is-active');
                    }
                } else if (tab2 == "Comments") {
                    $(target).append('<h1>Comments:</h1><br><fb:comments href="' + url + '" num_posts="2" width="500"></fb:comments>');
                    FB.XFBML.parse();
                    $('#commentSermonTabButton').addClass('is-active');
                }
                else if (tab2 == "Playlist") {
                    jQuery.ajax({
                    url: "https://www.thebodyofchrist.us/service/getplaylistfromID/?sermonid=" + sermonID,
                   type: "GET",
                  }).done(function(playlistHTML, textStatus, jqXHR) {
                    $(target).append(playlistHTML);
                    $('#playlistSermonTab').addClass('is-active');
                });
              }
            }

            function initiateTab3() {
                target = "#thirdTabSermon"
                tab3 = localStorage.getItem('sermonTab3');
                if (tab3 == "Bible") {
                    if (sermonData.results[0].book == null) {
                        localStorage.setItem('sermonTab3', 'Empty');
                    } else {
                        $(target).append('<iframe id="bibleFrame" style="width:100%;height:1020px;" src="https://www.thebodyofchrist.us/service/bible/?book=' + sermonData.results[0].book + '&chapter=1"></iframe>');
                        $('#bibleSermonTabButton').addClass('is-active');
                    }
                } else if (tab3 == "Comments") {

                    FB.XFBML.parse();
                    $('#commentSermonTabButton').addClass('is-active');
                }
                else if (tab3 == "Playlist") {
                    jQuery.ajax({
                    url: "https://www.thebodyofchrist.us/service/getplaylistfromID/?sermonid=" + sermonID,
                   type: "GET",
                  }).done(function(playlistHTML, textStatus, jqXHR) {
                    $(target).append(playlistHTML);
                    $('#playlistSermonTab').addClass('is-active');
                });
              }
            }



            initiateTab2();
            initiateTab3();
            $('#contentHolder').empty();

//            setTimeout(function() {
//                sermonContentHeight = $('#sermonContentInside').height();
//                $('#gradientSermonContent').height(sermonContentHeight + 'px');
//                checkIfListened();
//            }, 400);




//            url = 'https://storage.googleapis.com/boc-audio/sermons_mp3/' + sermonID + '.mp3';
//
//            window.sermonInfo = [];
//            window.sermonInfo.push({
//                "teachingTitle": title,
//                "speaker": speakerName,
//                "SermonID": sermonID,
//                "churchName": churchName,
//                "rating": rating
//            });
//
//            if (rating == null) {
//                rating = 0;
//            } else {}
//
//
//            try {
//                yourRatingValue == null;
//            } catch (err) {
//                console.log('Rating Not Set Yet.');
//            }
//            try {
//                sermonHistoryByUsernameThenSermonID == null;
//            } catch (err) {
//                console.log('Rating Not Set Yet.');
//            }
//
//            sermonHistoryByUsernameThenSermonID = $.fn.filterJSON({
//                sermonRatingHistoryCACHE
//            }, {
//                property: ["sermonid"], // mandatory
//                wrapper: true,
//                value: window.sermonID,
//                checkContains: true,
//                startsWith: true,
//                matchCase: false,
//                avoidDuplicates: true,
//                sort: false,
//                sortOrder: 'desc'
//            });

//            if (sermonHistoryByUsernameThenSermonID.length > 0) {
//                yourRatingValue = sermonHistoryByUsernameThenSermonID[0].ratingvalue;
//            } else {
//                yourRatingValue = 0;
//            }
//
//            if (yourRatingValue > 0) {
//                $(function() {
//                    $('#yourRating').barrating({
//                        theme: 'fontawesome-stars',
//                        initialRating: yourRatingValue,
//                    });
//                });
//            } else {
//                $(function() {
//                    $('#yourRating').barrating({
//                        theme: 'fontawesome-stars',
//                        initialRating: yourRatingValue,
//                    });
//                });
//                $('#sermonContentInside > span:nth-child(6) > div > form > div > div > a.br-selected.br-current').removeClass('br-selected');
//            }
//
//
//
//
//            $("#yourRating").change(function() {
//                setRating();
//            });
//
//
//            if (rating > 0) {

//            } else {
//                $(function() {
//                    $('#publicRating').barrating({
//                        theme: 'fontawesome-stars',
//                        initialRating: rating,
//                        readonly: true,
//                    });
//                });
//                $('#sermonContentInside > span:nth-child(5) > div > form > div > div > a.br-selected.br-current').removeClass('br-selected');
//            }

//
            addView();
            getDuration();






        });


        $('#loading').hide();
    });
}
function downloadMP3() {
    url = 'https://storage.googleapis.com/boc-audio/sermonsMP3/' + window.sermonID + '.mp3';
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

    window.media = new Media(url); //audio = document.getElementById('teachingAudio');
   //audio.play();
   // Set object references

    playbtn = document.getElementById('playButton'); //mutebtn = document.getElementById("mutebtn");

    seekslider = document.getElementById("teachingSlider"); //volumeslider = document.getElementById("volumeslider");
   // Add Event Handling
   //mutebtn.addEventListener("click", mute);
   //seekslider.addEventListener("change",seekAudio,false);
   //audio.addEventListener("timeupdate",seektimeupdate,false);
   // seekslider.addEventListener("mousedown", function(event) {
   // seeking = true;
   // seek(event);
   // });
   //seekslider.addEventListener("mousemove", function(event) {
  // seek(event);
   // });
    //seekslider.addEventListener("mouseup", function() {
   // seeking = false;
   //});
   //volumeslider.addEventListener("mousemove", setvolume);
   // Functions


   // function mute() {
   // if (audio.muted) {
   // audio.muted = false;
   // //mutebtn.style.background = "url(images/speaker.png) no-repeat";
   // } else {
   // audio.muted = true;
   // // mutebtn.style.background = "url(images/speaker_muted.png) no-repeat";
   // }
   // }


    function seekAudio() {
        var duration = window.media.getDuration();
        var seekto = (duration * (seekslider.value / 100));
        window.media.seekTo(seekto * 1000);
    }

    // function seektimeupdate(){
    // var nt = audio.currentTime * (100 / audio.duration);
    // seekslider.value = nt;
    // }

   // function seek(event) {
   // if (seeking) {
   // seekslider.value = event.clientX - seekslider.offsetLeft;
   // seekto = audio.duration * (seekslider.value / 100);
   // audio.currentTime = seekto;
   // }
   // }

   // function setvolume() {
   // audio.volume = volumeslider.value / 100;
   // }
}
function nyi() {
    //alert('Not Yet Implemented.');
    var snackbarContainer = document.querySelector('#alertToast');
    var data = {
        message: "Not Yet Implemented"
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
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
        var snackbarContainer = document.querySelector('#alertToast');
        var data = {
            message: results
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
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
    sermonID = window.sermonID;
    rating = document.getElementById('yourRating').value;
    url = 'https://www.thebodyofchrist.us/service/setRatingFromSermonID/?sermonID=' + sermonID + '&sermonRating=' + rating;
    jQuery.ajax({
        url: url,
    type: "GET",

    }).done(function(sermonData, textStatus, jqXHR) {
        $('#loading').hide();
        var snackbarContainer = document.querySelector('#alertToast');
        var data = {
            message: "Your Rating has been updated."
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
}
function addView() {
    sermonID = window.sermonID;
    url = 'https://www.thebodyofchrist.us/service/addView/?sermonID=' + sermonID;
    jQuery.ajax({
        url: url,
    type: "GET",

    }).done(function(data, textStatus, jqXHR) {
        console.log(data);
        $('#loading').hide();


    });

}
function sendDuration() {
    sermonID = window.sermonID;
    window.duration = Math.round(window.audioMP3.currentTime);
    url = 'https://www.thebodyofchrist.us/service/updateAudioDuration/?sermonID=' + sermonID + '&action=setAudioDuration&duration=' + window.duration;
    jQuery.ajax({
        url: url,
    type: "GET",

    }).done(function(data, textStatus, jqXHR) {
        if (data == "Updated") {
            console.log('Updated Timestamp...' + window.duration);
        } else {
            console.log('error...');
        }

    });
}
function getDuration() {
    sermonID = window.sermonID;
    url = 'https://www.thebodyofchrist.us/service/updateAudioDuration/?sermonID=' + sermonID + '&action=getLastTime';
    jQuery.ajax({
        url: url,
    type: "GET",
    }).done(function(data, textStatus, jqXHR) {
        if (data == "0") {
            console.log('No Previous Listened Data...');

        } else if (data == "Not Authenticated") {

        }
         else {
            console.log(data);
            window.audioMP3.currentTime = data;
            var snackbarContainer = document.querySelector('#alertToast');
            var data = {
                message: "Starting where you left off.."
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }

    });
}
function updateAudioStatus() {
    try {
        sendDuration();
    } catch (err) {
        console.log(err);
    }
    window.polling = setTimeout(updateAudioStatus, 5000);
}
