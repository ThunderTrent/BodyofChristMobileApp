function loadFollowed(){
jQuery.ajax({
url: 'https://www.thebodyofchrist.us/rest/follow/?follower=' + window.userID + '&followid=*',
type: "GET",
}).done(function(followData, textStatus, jqXHR) {
console.log("HTTP Request Succeeded: " + jqXHR.status);
window.followData = followData;
});
}
loadFollowed();







