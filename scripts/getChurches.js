function loadChurches(search, communityID, userID, insert) {

        if (localStorage.getItem( "view") == "Global") {
            url = 'https://www.thebodyofchrist.us/rest/churches/?limit=1000&ordering=-churchNumberofTeachings';
            target = '#contentHolder';
            console.log('global');
            loadChurchInsert(url, target,insert);
        } else if (localStorage.getItem( "view") == "Community") {
            url = 'https://www.thebodyofchrist.us/rest/churches/?limit=1000&ordering=-churchNumberofTeachings&communityid=' + localStorage.getItem( "communityID");
            console.log(url);
            target = '#contentHolder';
            loadChurchInsert(url, target,insert);
            console.log('community');
        } else if (localStorage.getItem( "view")== "Following") {
            window.followArray = []
            $.each(followData.results, function(index, value) {
                if (followData.results[index].followtype == "Church") {
                    followArray.push(followData.results[index].followeeChurch);
                } else {}
                console.log('else');
                url = 'https://www.thebodyofchrist.us/rest/churches/?limit=1000&ordering=-churchNumberofTeachings&churchid=' + followArray;
                target = '#contentHolder';
                loadChurchInsert(url, target,insert);



            })
        }
        }

        function loadChurchInsert(url, target,insert) {
            jQuery.ajax({
                url: url,
                type: "GET",
            }).done(function(churchData, textStatus, jqXHR) {
                console.log("HTTP Request Succeeded: " + jqXHR.status);
                window.churchData = churchData;
                $.each(churchData.results, function(index, value) {

                    if (insert=='True'){
                    $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">' +
                        '<ul class="demo-list-two mdl-list">' +
                        '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +
                        '<span class="mdl-list__item-primary-content" style="margin-top:-15px;width:100%;">' +
                        '<div style="background-size:cover;margin-top:-5px;width:80px;height:80px;float:left;margin-right:20px;background-image:url(\'' + churchData.results[index].churchDisplayLogo + '\');"></div>' +
                        '<span>' + churchData.results[index].churchname + '</span>' +
                        '<span class="mdl-list__item-sub-title">Number of Teachings:' + churchData.results[index].churchNumberofTeachings + '</span>' +
                        '</span>' +
                        '</li>' +
                        '</ul>' +
                        '</div>');
                }else{}
                });

                console.log('Churches Loaded');
                $('#loading').hide();
            });
        }
