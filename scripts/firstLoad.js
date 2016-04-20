function initialLoad() {
        try {
                teachingsLoadData();
                speakersLoadData();
                membersLoadData();
                vbvLoadData();
                sermonHistoryLoadData();
                sermonRatingHistoryLoadData();
        } catch (err) {
                console.log(err);
        }
}



window.app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;







if (window.app) {

} else { 
        jQuery.ajax({        
                url: 'https://thebodyofchrist.us/rest/timeListened/',
                        type: "GET",
                    
        }).done(function(sermonHistoryCACHE, textStatus, jqXHR) {        
                console.log("HTTP Request Succeeded: " + jqXHR.status);        
                window.sermonHistoryCACHE = (sermonHistoryCACHE);
        });
}


if (window.app) {

} else { 
        jQuery.ajax({        
                url: 'https://www.thebodyofchrist.us/rest/sermons/?limit=10000&audioStatus=2&speakerid=*&title=*&ordering=-downloadedcontentid&typeofcontent=Verse%20By%20Verse',
                        type: "GET",
                    
        }).done(function(VBVDataCACHE, textStatus, jqXHR) {        
                console.log("HTTP Request Succeeded: " + jqXHR.status);        
                window.VBVDataCACHE = (VBVDataCACHE);
        });
}




//Device Loads




function teachingsLoadData() {
        if (window.app) {
                jQuery.ajax({        
                        url: 'data/teachingPreloadData.json',
                                type: "GET",
                            
                }).done(function(sermonDataCACHE, textStatus, jqXHR) {        
                        console.log("HTTP Request Succeeded: " + jqXHR.status);        
                        window.sermonDataCACHE = JSON.parse(sermonDataCACHE);
                        localStorage.setItem('intialPullLoaded', "1");
                        console.log('setInitialPullLoaded to 1');
                });
        } else { 
                jQuery.ajax({        
                        url: 'https://www.thebodyofchrist.us/rest/sermons/?audioStatus=2&limit=&speakerid=*&ordering=-downloadedcontentid&typeofcontent=Sermon&title=*',
                                type: "GET",
                            
                }).done(function(sermonDataCACHE, textStatus, jqXHR) {        
                        console.log("HTTP Request Succeeded: " + jqXHR.status);        
                        window.sermonDataCACHE = (sermonDataCACHE);
                });
        }

}

function speakersLoadData() {

        if (window.app) {
                url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount';
                var fileTransfer = new FileTransfer();
                store = cordova.file.dataDirectory;
                fileName = 'speakersPreloadData' + ".json";
                fileTransfer.download(url, store + fileName,
                        function(entry) {
                                jQuery.ajax({        
                                        url: 'cdvfile://localhost/library-nosync/speakersPreloadData.json',
                                                type: "GET",
                                            
                                }).done(function(speakerDataCACHE, textStatus, jqXHR) {        
                                        console.log("HTTP Request Succeeded: " + jqXHR.status);        
                                        window.speakerDataCACHE = (speakerDataCACHE);
                                });

                        },
                        function(err) {
                                console.log(err);
                        });

        } else { 

        }
}





function membersLoadData() {
        if (window.app) {
                url = 'https://www.thebodyofchrist.us/rest/members/?limit=1000&id=*';
                var fileTransfer = new FileTransfer();
                store = cordova.file.dataDirectory;
                fileName = 'memberPreloadData' + ".json";
                fileTransfer.download(url, store + fileName,
                        function(entry) { 
                                jQuery.ajax({        
                                        url: 'cdvfile://localhost/library-nosync/memberPreloadData.json',
                                                type: "GET",
                                            
                                }).done(function(memberDataCACHE, textStatus, jqXHR) {        
                                        console.log("HTTP Request Succeeded: " + jqXHR.status);        
                                        window.memberDataCACHE = (memberDataCACHE);
                                });

                        },
                        function(err) {
                                console.log(err);
                        });


        } else { 

                jQuery.ajax({        
                        url: 'https://www.thebodyofchrist.us/rest/members/?limit=1000&id=*',
                                type: "GET",
                            
                }).done(function(sermonHistoryCACHE, textStatus, jqXHR) {        
                        console.log("HTTP Request Succeeded: " + jqXHR.status);        
                        window.sermonHistoryCACHE = sermonHistoryCACHE;
                });

        }
}

        function sermonHistoryLoadData() {

                 
                jQuery.ajax({        
                        url: 'https://thebodyofchrist.us/rest/timeListened/',
                                type: "GET",
                            
                }).done(function(sermonHistoryCACHE, textStatus, jqXHR) {        
                        console.log("HTTP Request Succeeded: " + jqXHR.status);        
                        window.sermonHistoryCACHE = sermonHistoryCACHE;
                });



        }

        function sermonRatingHistoryLoadData() {

                jQuery.ajax({        
                        url: 'https://www.thebodyofchrist.us/rest/sermonRatings/?userid=' + localStorage.getItem('userID'),
                                type: "GET",
                            
                }).done(function(sermonRatingHistory, textStatus, jqXHR) {        
                        console.log("Sermon Rating History Data - HTTP Request Succeeded: " + jqXHR.status);        
                        window.sermonRatingHistoryCACHE = sermonRatingHistory;
                });



        }


        function vbvLoadData() {

                 
                jQuery.ajax({        
                        url: 'data/VBVPreloadData.json',
                                type: "GET",
                            
                }).done(function(VBVDataCACHE, textStatus, jqXHR) {        
                        console.log("HTTP Request Succeeded: " + jqXHR.status);        
                        window.VBVDataCACHE = JSON.parse(VBVDataCACHE);
                });



        }
  