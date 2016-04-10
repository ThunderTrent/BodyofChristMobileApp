function loadMembers(search,communityID,insert){

if (search =="Global"){
url = 'https://www.thebodyofchrist.us/rest/members/?limit=1000&id=*';
target = '#contentHolder';
if (insert=="True"){
loadMembersInsert(url,target,"True");
}
else{
loadMembersInsert(url,target,"False");
}
}
else if (search =="Community"){
url = 'https://www.thebodyofchrist.us/rest/members/?limit=1000&id=*&ordering=id&communityid=' + communityID;
target =  '#contentHolder';
loadMembersInsert(url,target,"True");
}
else if (search =="Following"){
window.followArray = []
$.each( followData.results, function( index, value ) {
if (followData.results[index].followtype == "User"){
followArray.push(followData.results[index].followeeUser);
}
else{}

url = 'https://www.thebodyofchrist.us/rest/members/?limit=1000&id='+ followArray;
target =  '#contentHolder';
loadMembersInsert(url,target,"True");


});

}
else{
}
}
function loadMembersInsert(url,target,insert){
jQuery.ajax({
url: url,
type: "GET",
}).done(function(memberData, textStatus, jqXHR) {
console.log("HTTP Request Succeeded: " + jqXHR.status);
window.memberData = memberData;

var url = window.location.href;
length = url.split('/').length;
page = url.split('/')[length-1];

if (page=="myprofile.html"){
loadPersonalProfile();
}

if (page=="profile.html"){
loadProfile();
}

if(insert=="True"){
$.each(memberData.results, function( index, value ) {

if (memberData.results[index].userImage == null){
userImage = memberData.results[index].facebookPhoto;
}
else{
userImage = memberData.results[index].userImage;
}

 churchID = parseInt(memberData.results[index].churchid);
 //communityID = parseInt(communityData.results[index].speaker);

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




$(target).append('<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style="display:block;">'+
                            '<ul class="mdl-list">'+
                            '<li class="mdl-list__item mdl-list__item--two-line" style="height:90px;">'+
                            '<span class="mdl-list__item-primary-content" style="margin-top:-15px;width:100%;">'+
                            '<div style="background-size:cover;margin-top:-15px;border-radius:20px;width:80px;height:80px;float:left;margin-right:20px;background-image:url(\'' + userImage + '\');"></div>'+
                            '<span onclick="loadProfilePage(' + memberData.results[index].id +');">' + memberData.results[index].first_name + ' ' + memberData.results[index].last_name  +'</span>'+
                            '<span class="mdl-list__item-sub-title">Church: '+ churchName  + '</span>'+
                            '<span class="mdl-list__item-sub-title">Community:'+ memberData.results[index].communityid  + '</span>'+
                            '</span>'+
                          '</li>'+
                        '</ul>'+
                        '</div>');
                        });}



                        $('#loading').hide();



});
}


      function arrayLookup(array, prop, val) {
                        for (var i = 0, len = array.length; i < len; i++) {
                            if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {
                                return array[i];
                            }
                        }
                        return null;
                    }


  function loadPersonalProfile(){
        userID = parseInt(localStorage.getItem('userID'));
        console.log(memberData);

       //APPEND FIRST NAME
       try {
       firstName = arrayLookup(memberData.results, 'id', userID).first_name;
       $('#first_name').append(firstName);
       } catch (err) {
       console.log(err);
       firstName = 'N/A';

       }

       //APPEND LAST NAME
       try {
       lastName = arrayLookup(memberData.results, 'id', userID).last_name;
       $('#last_name').append(lastName);
       } catch (err) {
       console.log(err);
       lastName = 'N/A';
       }

       //APPEND IMAGE
       try {
       userImage = arrayLookup(memberData.results, 'id', userID).userImage;
       console.log(userImage);
       $('#userImage').css({'background-image':'url(' + userImage + ')'});
       } catch (err) {
       console.log(err);
       userImage = 'https://www.thebodyofchrist.us/media/default-avatar.jpg';
       $('#userImage').css({'background-image':'url(' + userImage + ')'});
       }

        try {
       churchid = arrayLookup(memberData.results, 'id', userID).churchid;
       churchName = arrayLookup(churchData.results, 'churchid',churchid).churchname;

       $('#churh').append(churchName);
       } catch (err) {
       console.log(err);
       churchName = 'No Church';
       $('#church').append(churchName);
       }
}



 function loadProfile(){
        userID = parseInt(localStorage.getItem('profileID'));
        console.log(memberData);

       //APPEND FIRST NAME
       try {
       firstName = arrayLookup(memberData.results, 'id', userID).first_name;
       $('#first_name').append(firstName);
       $('#titleFirstName').append(firstName + "'s");
       $('#firstName').append(firstName);
       } catch (err) {
       console.log(err);
       firstName = 'N/A';

       }

       //APPEND LAST NAME
       try {
       lastName = arrayLookup(memberData.results, 'id', userID).last_name;
       $('#last_name').append(lastName);
       } catch (err) {
       console.log(err);
       lastName = 'N/A';
       }

       //APPEND IMAGE
       try {
       userImage = arrayLookup(memberData.results, 'id', userID).userImage;
       console.log(userImage);
       $('#userImage').css({'background-image':'url(' + userImage + ')'});
       } catch (err) {
       console.log(err);
       userImage = 'https://www.thebodyofchrist.us/media/default-avatar.jpg';
       $('#userImage').css({'background-image':'url(' + userImage + ')'});
       }

        try {
       churchid = arrayLookup(memberData.results, 'id', userID).churchid;
       churchName = arrayLookup(churchData.results, 'churchid',churchid).churchname;

       $('#churh').append(churchName);
       } catch (err) {
       console.log(err);
       churchName = 'No Church';
       $('#church').append(churchName);
       }
}

function loadProfilePage(memberID){
localStorage.setItem('profileID',memberID);
window.location.href =   "profile.html";

}


function setUserDataLocalStorage(){
localStorage.setItem( "communityID",'1');
localStorage.setItem( "churchID",'1');
}
setUserDataLocalStorage();


