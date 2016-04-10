function loadVBV(search, communityID, userID) {

        if (search == "Global") {
            url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=25&audioStatus=2&speakerid=*&title=*&ordering=-downloadedcontentid&typeofcontent=Verse%20By%20Verse';
            target = '#contentHolder';
            loadVBVInsert(url, target);
        } else if (search == "Community") {
            url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=25&audioStatus=2&speakerid=*&title=*&typeofcontent=Verse%20By%20Verse&ordering=-downloadedcontentid&communityID=' + communityID;
            target = '#contentHolder';
            loadVBVInsert(url, target);
        } else if (search == "Following") {
            window.followArray = []
            $.each(followData.results, function(index, value) {
                if (followData.results[index].followtype == "Speaker") {
                    followArray.push(followData.results[index].followeeSpeaker);
                } else {}

                url = 'https://www.thebodyofchrist.us/rest/sermons/?limit=25&title=*&typeofcontent=Verse%20By%20Verse&speakerid=' + followArray;
                target = '#contentHolder';
                loadVBVInsert(url, target);



            })
        }
        }

        function loadVBVInsert(url, target) {
            jQuery.ajax({
                url: url,
                type: "GET",
            }).done(function(vbvData, textStatus, jqXHR) {
                console.log("HTTP Request Succeeded: " + jqXHR.status);
                window.vbvData = vbvData;
                $.each(vbvData.results, function(index, value) {

					churchID = parseInt(vbvData.results[index].churchid);
                    speakerID = parseInt(vbvData.results[index].speaker);



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





                    $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">' +
                        '<ul class="demo-list-two mdl-list">' +
                        '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +
                        '<span class="mdl-list__item-primary-content" style="margin-top:-15px;">' +
                        '<div style="background-size:cover;margin-top:-5px;width:80px;height:80px;float:left;margin-right:20px;background-image:url(\'https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?sermonid=' + vbvData.results[index].downloadedcontentid + '\');"></div>' +
                        '<span onclick="loadIndividualSermon(' + vbvData.results[index].downloadedcontentid + ');">' + vbvData.results[index].title + '</span><br>' +
                        '<span class="mdl-list__item-sub-title">' + speakerName + '</span>' +
						'<span class="mdl-list__item-sub-title">' + churchName + '</span>' +
                        '</span>' +
                        '</li>' +
                        '</ul>' +
                        '</div>');
                });
                componentHandler.upgradeDom();
                console.log('Teachings Loaded');
                $('#loading').hide();
            });
        }

