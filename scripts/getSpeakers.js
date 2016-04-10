function loadSpeakers(search,communityID,insert){

if (search =="Global"){
url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount';
target = '#contentHolder';
}
else if (search =="Community"){
url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&ordering=-sermonCount&communityID=' + communityID;
target =  '#contentHolder';
}
else if (search =="Following"){
url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000';
target = '#contentHolder';
}
else if (search =="RecommendedSpeakers"){
url = 'https://www.thebodyofchrist.us/rest/speakers/?limit=1000&recommendedSpeaker=2&ordering=-sermonCount';
target = '#contentHolder';
}
else{
}

jQuery.ajax({
url: url,
type: "GET",
}).done(function(speakerData, textStatus, jqXHR) {
console.log("HTTP Request Succeeded: " + jqXHR.status);
window.speakerData = speakerData;
$.each(speakerData.results, function( index, value ) {

if (speakerData.results[index].speakerimage == null){
speakerImage = 'https://www.thebodyofchrist.us/static/images/default-avatar.png' }
else{
speakerImage = speakerData.results[index].speakerimage;
}
if (insert =="True"){
 $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">' +
                        '<ul class="demo-list-two mdl-list"> <center>'+
                        '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +
                        '<span class="mdl-list__item-primary-content" style="margin-top:-15px;width:100%;">' +
                        '<div style="background-size:cover;border-radius:20px;margin-top:-15px;width:80px;height:80px;float:left;margin-right:20px;background-image:url(\'' + speakerImage+ '\');"></div>' +
                        '<span>' + speakerData.results[index].speakername + '</span>' +
                        '<span class="mdl-list__item-sub-title">' + speakerData.results[index].sermonCount  + ' Sermons / Teachings</span>' +
                        '</span>' +
                        '</li>' +
                        '</ul>' +
                        '</div>');
                        }else{}
                        });

                        $('#loading').hide();
                        });
}





