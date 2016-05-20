  server = "https://www.thebodyofchrist.us";
            $('#quick-search').on('input', function() {
                $('#contentHolder').empty();
                closeSermon();
                $('.yourlabs-autocomplete').css('display', 'block !important;');
            });
            $('#quick-search').on('click', function() {
                if (document.getElementById('quick-search').value != 'null') {
                    $('#contentHolder').empty();
                    closeSermon();
                    previousSearch = document.getElementById('quick-search').value;
                    document.getElementById('quick-search').value = '';
                    document.getElementById('quick-search').value = previousSearch;
                }

                $('.yourlabs-autocomplete').css('display', 'block !important;');
            });
            $('#quick-search').yourlabsAutocomplete({
                url: server + '/search-mobile/',
                choiceSelector: '[data-value]',
            }).input.bind('selectChoice', function(e, choice, autocomplete) {

                dataLink = choice.attr('data-value');
                if (dataLink.split('-')[0] == "14") {
                    window.location.href = server + '/sermons/?sermonid=' + dataLink.split('-')[1]
                } else if (dataLink.split('-')[0] == "16") {
                    window.location.href = server + '/userprofile/?user=' + dataLink.split('-')[1]
                } else if (dataLink.split('-')[0] == "7") {
                    window.location.href = server + '/web/contentdownloadtable/?churchid=' + dataLink.split('-')[1]
                } else if (dataLink.split('-')[0] == "21") {
                    window.location.href = server + '/web/contentdownloadtable/?speaker=' + dataLink.split('-')[1]
                }

            });

            function login() {
                window.location = "https://www.thebodyofchrist.us/login/";
            }

                     function toggleBible() {
                if ($('#bibleSermonTabButton').hasClass('is-active')) {
                    $('#bibleSermonTabButton').removeClass('is-active');
                    if (localStorage.getItem('sermonTab2') == "Bible") {
                        window.targetTab = "#secondTabSermon";
                        localStorage.setItem('sermonTab2', 'Empty');
                    }
                    if (localStorage.getItem('sermonTab3') == "Bible") {
                        window.targetTab = "#thirdTabSermon";
                        localStorage.setItem('sermonTab3', 'Empty');
                    }
                    $(window.targetTab).empty();
                } else {

                    if (sermonData.results[0].book == null){
                    var snackbarContainer = document.querySelector('#alertToast');
                    var data = {message: "This sermon doesn't have a particular book registered."};
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);

          }
          else{
                    $('#bibleSermonTabButton').addClass('is-active');
                    if (localStorage.getItem('sermonTab2') == "Empty") {
                        window.targetTab = "#secondTabSermon";
                        localStorage.setItem('sermonTab2', 'Bible');
                        $(window.targetTab).append('<iframe id="bibleFrame" style="width:100%;height:1020px;" src="https://www.thebodyofchrist.us/service/bible/?book=' + sermonData.results[0].book + '&chapter=1"></iframe>');
                        return;
                    }
                    if (localStorage.getItem('sermonTab3') == "Empty") {
                        window.targetTab = "#thirdTabSermon";
                        localStorage.setItem('sermonTab3', 'Bible');
                        $(window.targetTab).append('<iframe id="bibleFrame" style="width:100%;height:1020px;" src="https://www.thebodyofchrist.us/service/bible/?book=' + sermonData.results[0].book + '&chapter=1"></iframe>');
                        return;
                    }

                    }

                }
            }

            function toggleComments() {
                if ($('#commentSermonTabButton').hasClass('is-active')) {
                    $('#commentSermonTabButton').removeClass('is-active');
                    if (localStorage.getItem('sermonTab2') == "Comments") {
                        window.targetTab = "#secondTabSermon";
                        localStorage.setItem('sermonTab2', 'Empty');
                    }
                    if (localStorage.getItem('sermonTab3') == "Comments") {
                        window.targetTab = "#thirdTabSermon";
                        localStorage.setItem('sermonTab3', 'Empty');
                    }
                    $(window.targetTab).empty();
                } else {
                    $('#commentSermonTabButton').addClass('is-active');
                    if (localStorage.getItem('sermonTab2') == "Empty") {
                        window.targetTab = "#secondTabSermon";
                        localStorage.setItem('sermonTab2', 'Comments');
                        url = 'https://www.thebodyofchrist.us?sermonid=' + window.sermonID;
                        $(window.targetTab).append('<h1>Comments:</h1><br><fb:comments href="' + url + '" num_posts="2" width="500"></fb:comments>');
                        FB.XFBML.parse();
                        return;
                    }
                    if (localStorage.getItem('sermonTab3') == "Empty") {
                        window.targetTab = "#thirdTabSermon";
                        localStorage.setItem('sermonTab3', 'Comments');
                        url = 'https://www.thebodyofchrist.us?sermonid=' + window.sermonID;
                        $(window.targetTab).append('<h1>Comments:</h1><br><fb:comments href="' + url + '" num_posts="2" width="500"></fb:comments>');
                        FB.XFBML.parse();
                        return;
                    }
                }
            }

            function togglePlaylist() {
                if ($('#playlistSermonTab').hasClass('is-active')) {
                    $('#playlistSermonTab').removeClass('is-active');
                    if (localStorage.getItem('sermonTab2') == "Playlist") {
                        window.targetTab = "#secondTabSermon";
                        localStorage.setItem('sermonTab2', 'Empty');
                    }
                    if (localStorage.getItem('sermonTab3') == "Playlist") {
                        window.targetTab = "#thirdTabSermon";
                        localStorage.setItem('sermonTab3', 'Empty');
                    }
                    $(window.targetTab).empty();
                } else {
                    $('#playlistSermonTab').addClass('is-active');
                    if (localStorage.getItem('sermonTab2') == "Empty") {
                        window.targetTab = "#secondTabSermon";
                        localStorage.setItem('sermonTab2', 'Playlist');
                         jQuery.ajax({
                    url: "https://www.thebodyofchrist.us/service/getplaylistfromID/?sermonid=" + sermonID,
                   type: "GET",
                  }).done(function(playlistHTML, textStatus, jqXHR) {
                    $(winow.targetTab).append(playlistHTML);
                        return;
                    });
              }
                    if (localStorage.getItem('sermonTab3') == "Empty") {
                        window.targetTab = "#thirdTabSermon";
                        localStorage.setItem('sermonTab3', 'Playlist');
                         jQuery.ajax({
                    url: "https://www.thebodyofchrist.us/service/getplaylistfromID/?sermonid=" + sermonID,
                   type: "GET",
                  }).done(function(playlistHTML, textStatus, jqXHR) {
                    $(window.targetTab).append(playlistHTML);
                        return;
                    });
              }
                }
            }