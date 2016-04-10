function downloadFile(name, dataUrl) {
    var fileTransfer = new FileTransfer();
    store = cordova.file.dataDirectory;
    fileName = name + ".json";
    fileTransfer.download(dataUrl, store + fileName,
        function(entry) {
            console.log("DownloadedJSON!" + name);
            //alert('Downloaded');
        },
        function(err) {
            console.log("Error");
        });
}

function loadChurches(search, communityID, userID, insert) {

    var isOffline = 'onLine' in navigator && !navigator.onLine;

    if (localStorage.getItem("view") == "Global") {
        if (isOffline === false) { 
            url = 'https://www.thebodyofchrist.us/rest/churches/?limit=1000&ordering=-churchNumberofTeachings';

        } else {
            url = 'cdvfile://localhost/library-nosync/churchGlobal.json';
        }
        name = "churchGlobal";
        target = '#contentHolder';
        loadChurchInsert(url, target, insert, name);
    } else if (localStorage.getItem("view") == "Community") {
        if (isOffline === false) {
            url = 'https://www.thebodyofchrist.us/rest/churches/?limit=1000&ordering=-churchNumberofTeachings&communityid=' + localStorage.getItem("communityID");
        } else {
            url = 'cdvfile://localhost/library-nosync/churchCommunity.json';
        }
        name = 'churchCommunity';
        console.log(url);
        target = '#contentHolder';
        loadChurchInsert(url, target, insert, name);
        console.log('community');
    } else if (localStorage.getItem("view") == "Following") {
        window.followArray = []
        $.each(followData.results, function(index, value) {
            if (followData.results[index].followtype == "Church") {
                followArray.push(followData.results[index].followeeChurch);
            } else {}
            if (isOffline === false) {
                url = 'https://www.thebodyofchrist.us/rest/churches/?limit=1000&ordering=-churchNumberofTeachings&churchid=' + followArray;
            } else {
                url = 'cdvfile://localhost/library-nosync/churchFollower.json';
            }
            name = 'churchFollower';
            target = '#contentHolder';
            loadChurchInsert(url, target, insert, name);



        })
    }
}

function loadChurchInsert(url, target, insert, name) {
    jQuery.ajax({
        url: url,
        type: "GET",
    }).done(function(churchData, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        window.churchData = churchData;

        if (url.split(':')[0] == "https") {
            downloadFile(name, url);
        } else {

        }

        $.each(churchData.results, function(index, value) {

            if (insert == 'True') {
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
            } else {}
        });

        console.log('Churches Loaded');
        $('#loading').hide();
    });
}
