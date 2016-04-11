 jQuery.ajax({
url: 'https://www.thebodyofchrist.us/rest/speakers/',
type: "GET",
}).done(function(speakerData, textStatus, jqXHR) {
console.log("HTTP Request Succeeded: " + jqXHR.status);
window.speakerData = speakerData;

});





    jQuery.ajax({
    url: "https://www.thebodyofchrist.us/rest/sermons/?ordering=-downloadedcontentid&limit=10",
    type: "GET",
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
    window.data = data;

$.each(data.results, function( index, value ) {
 if (data.results[index].rating == undefined){
 rating = "No Votes";
 }
 else{
 rating = data.results[index].rating
 }
 speakerID = data.results[index].speaker;







$('#sermonHolder').after('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;"><h5>' + data.results[index].title + ' :</h5><h5>Rating: ' +
 rating  +
 '</h5>' +
 '<h5>Speaker: '  +
 '</div></h5><iframe width="420" height="205" src="https://www.youtube.com/embed/' + data.results[index].youtubeid + '" frameborder="0" allowfullscreen></iframe></div>');
return index<3;
});

})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
});