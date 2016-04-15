function loadTeachingDataCache(text) {
    window.foundResults = $.fn.filterJSON({
        sermonDataCACHE
    }, {
        property: ["title"], // mandatory
        wrapper: true,
        value: text,
        checkContains: true,
        startsWith: false,
        matchCase: false,
        avoidDuplicates: true,
        sort: true,
        sortOrder: 'desc'
    });
    console.log(window.foundResults);
    $('#contentHolder').empty();


            
    $.each(window.foundResults, function(index, value) {


                    
        churchID = parseInt(window.foundResults[index].churchid);            
        speakerID = parseInt(window.foundResults[index].speaker);

                    
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

        if (window.foundResults[index].speaker == null) {
            speakerImage = 'img/default-avatar.png';
        } else {
            speakerImage = 'https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?speaker=' + window.foundResults[index].speaker;
        }


          
        $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"  style=";">' +                 '<ul class="demo-list-two mdl-list">' +                 '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +                 '<span class="mdl-list__item-primary-content" style="margin-top:-35px;width:100%;">' +
            '<img style="border-radius:20px;margin-top:-6px;width:80px;height:80px;position:absolute;" id="teachingID_IMG_' + window.foundResults[index].downloadedcontentid + '" src="' + speakerImage + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +                             '<span style="margin-left:100px;display:-webkit-inline-box;" onclick="loadIndividualSermon(' + window.foundResults[index].downloadedcontentid + ');">' + window.foundResults[index].title + '</span><br>' +                 '<span style="margin-left:100px;"class="mdl-list__item-sub-title">' + speakerName + '</span>' +                 '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + churchName + '</span>' +                 '</span>' +                 '</li>' +                 '</ul>' +                 '</div>');



    });
}

function loadTeachingDataCacheVBV(text) {
    VBVData = VBVDataCACHE.results;
    window.foundResults = $.fn.filterJSON({
        VBVData
    }, {
        property: ["title"], // mandatory
        wrapper: true,
        value: text,
        checkContains: true,
        startsWith: false,
        matchCase: false,
        avoidDuplicates: true,
        sort: true,
        sortOrder: 'desc'
    });
    console.log(window.foundResults);
    $('#contentHolder').empty();


            
    $.each(window.foundResults, function(index, value) {


                    
        churchID = parseInt(window.foundResults[index].churchid);            
        speakerID = parseInt(window.foundResults[index].speaker);

                    
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

        if (window.foundResults[index].speaker == null) {
            speakerImage = 'img/default-avatar.png';
        } else {
            speakerImage = 'https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?speaker=' + window.foundResults[index].speaker;
        }


          
        $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"  style=";">' +                 '<ul class="demo-list-two mdl-list">' +                 '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +                 '<span class="mdl-list__item-primary-content" style="margin-top:-35px;width:100%;">' +
            '<img style="border-radius:20px;margin-top:-6px;width:80px;height:80px;position:absolute;" id="teachingID_IMG_' + window.foundResults[index].downloadedcontentid + '" src="' + speakerImage + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +                             '<span style="margin-left:100px;display:-webkit-inline-box;" onclick="loadIndividualSermon(' + window.foundResults[index].downloadedcontentid + ');">' + window.foundResults[index].title + '</span><br>' +                 '<span style="margin-left:100px;"class="mdl-list__item-sub-title">' + speakerName + '</span>' +                 '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + churchName + '</span>' +                 '</span>' +                 '</li>' +                 '</ul>' +                 '</div>');



    });
}

function loadSpeakerDataCache(text) {
    speakerData = speakerData.results;
    window.foundResults = $.fn.filterJSON({
        speakerData
    }, {
        property: ["speakername"], // mandatory
        wrapper: true,
        value: text,
        checkContains: true,
        startsWith: false,
        matchCase: false,
        avoidDuplicates: true,
        sort: true,
        sortOrder: 'desc'
    });
    console.log(window.foundResults);
    $('#contentHolder').empty();


            
    $.each(window.foundResults, function(index, value) {     
        churchID = parseInt(window.foundResults[index].churchid);            
        speakerID = parseInt(window.foundResults[index].speaker);

            
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

        if (window.foundResults[index].speaker == null) {
            speakerImage = 'img/default-avatar.png';
        } else {
            speakerImage = 'https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?speaker=' + window.foundResults[index].speaker;
        }


          
        $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"  style=";">' +                 '<ul class="demo-list-two mdl-list">' +                 '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +                 '<span class="mdl-list__item-primary-content" style="margin-top:-35px;width:100%;">' +
            '<img style="border-radius:20px;margin-top:-6px;width:80px;height:80px;position:absolute;" id="teachingID_IMG_' + window.foundResults[index].downloadedcontentid + '" src="' + speakerImage + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +                             '<span style="margin-left:100px;display:-webkit-inline-box;" onclick="loadIndividualSermon(' + window.foundResults[index].downloadedcontentid + ');">' + window.foundResults[index].title + '</span><br>' +                 '<span style="margin-left:100px;"class="mdl-list__item-sub-title">' + speakerName + '</span>' +                 '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + churchName + '</span>' +                 '</span>' +                 '</li>' +                 '</ul>' +                 '</div>');



    });
}

function loadMemberDataCache(text) {
    VBVData = VBVDataCACHE.results;
    window.foundResults = $.fn.filterJSON({
        VBVData
    }, {
        property: ["title"], // mandatory
        wrapper: true,
        value: text,
        checkContains: true,
        startsWith: false,
        matchCase: false,
        avoidDuplicates: true,
        sort: true,
        sortOrder: 'desc'
    });
    console.log(window.foundResults);
    $('#contentHolder').empty();


            
    $.each(window.foundResults, function(index, value) {


                    
        churchID = parseInt(window.foundResults[index].churchid);            
        speakerID = parseInt(window.foundResults[index].speaker);

                    
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

        if (window.foundResults[index].speaker == null) {
            speakerImage = 'img/default-avatar.png';
        } else {
            speakerImage = 'https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?speaker=' + window.foundResults[index].speaker;
        }


          
        $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"  style=";">' +                 '<ul class="demo-list-two mdl-list">' +                 '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +                 '<span class="mdl-list__item-primary-content" style="margin-top:-35px;width:100%;">' +
            '<img style="border-radius:20px;margin-top:-6px;width:80px;height:80px;position:absolute;" id="teachingID_IMG_' + window.foundResults[index].downloadedcontentid + '" src="' + speakerImage + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +                             '<span style="margin-left:100px;display:-webkit-inline-box;" onclick="loadIndividualSermon(' + window.foundResults[index].downloadedcontentid + ');">' + window.foundResults[index].title + '</span><br>' +                 '<span style="margin-left:100px;"class="mdl-list__item-sub-title">' + speakerName + '</span>' +                 '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + churchName + '</span>' +                 '</span>' +                 '</li>' +                 '</ul>' +                 '</div>');



    });
}

function loadChurchDataCache(text) {
    VBVData = VBVDataCACHE.results;
    window.foundResults = $.fn.filterJSON({
        VBVData
    }, {
        property: ["title"], // mandatory
        wrapper: true,
        value: text,
        checkContains: true,
        startsWith: false,
        matchCase: false,
        avoidDuplicates: true,
        sort: true,
        sortOrder: 'desc'
    });
    console.log(window.foundResults);
    $('#contentHolder').empty();


            
    $.each(window.foundResults, function(index, value) {


                    
        churchID = parseInt(window.foundResults[index].churchid);            
        speakerID = parseInt(window.foundResults[index].speaker);

                    
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

        if (window.foundResults[index].speaker == null) {
            speakerImage = 'img/default-avatar.png';
        } else {
            speakerImage = 'https://www.thebodyofchrist.us/service/getSpeakerImageFromSermon/?speaker=' + window.foundResults[index].speaker;
        }


          
        $('#contentHolder').append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"  style=";">' +                 '<ul class="demo-list-two mdl-list">' +                 '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +                 '<span class="mdl-list__item-primary-content" style="margin-top:-35px;width:100%;">' +
            '<img style="border-radius:20px;margin-top:-6px;width:80px;height:80px;position:absolute;" id="teachingID_IMG_' + window.foundResults[index].downloadedcontentid + '" src="' + speakerImage + '" width="80px" height="80px" style="float:left;margin-right:20px;"/>' +                             '<span style="margin-left:100px;display:-webkit-inline-box;" onclick="loadIndividualSermon(' + window.foundResults[index].downloadedcontentid + ');">' + window.foundResults[index].title + '</span><br>' +                 '<span style="margin-left:100px;"class="mdl-list__item-sub-title">' + speakerName + '</span>' +                 '<span style="margin-left:100px;" class="mdl-list__item-sub-title">' + churchName + '</span>' +                 '</span>' +                 '</li>' +                 '</ul>' +                 '</div>');



    });
}