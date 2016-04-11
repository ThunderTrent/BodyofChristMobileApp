function loadDownloadedContent(insert){


jQuery.ajax({
url: url,
type: "GET",
}).done(function(speakerData, textStatus, jqXHR) {
console.log("HTTP Request Succeeded: " + jqXHR.status);
window.speakerData = speakerData;
downloadedContent = window.localStorage.getArray("downloadedContent");
$.each(downloadedContent, function( index, value ) {


if (insert =="True"){
 $(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">' +
                        '<ul class="demo-list-two mdl-list"> <center>'+
                        '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">' +
                        '<span class="mdl-list__item-primary-content" style="margin-top:-15px;width:100%;">' +
                        '<div style="background-size:cover;border-radius:20px;margin-top:-15px;width:80px;height:80px;float:left;margin-right:20px;background-image:url(\'' +'' + '\');"></div>' +
                        '<span><a href="#" onclick="loadIndividualSermon(' + downloadedContent[index].SermonID + ');">' + downloadedContent[index].teachingTitle + '</a></span>' +
                        '<span class="mdl-list__item-sub-title"> ' + downloadedContent[index].speaker + '</span>' +
                        '</span>' +
                        '</li>' +
                        '</ul>' +
                        '</div>');
                        }else{}
                        });

                        $('#loading').hide();
                        });
}




