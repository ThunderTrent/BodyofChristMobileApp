function checkIfListened(){
sermonHistoryLookupByUsername = $.fn.filterJSON({sermonHistoryCACHE}, {
    property: ["username"], // mandatory
    wrapper: true,
    value: localStorage.getItem('userID'),
    checkContains: true,
    startsWith: true,
    matchCase: false,
    avoidDuplicates: true,
    sort: false,
    sortOrder: 'desc'
});

sermonHistoryByUsernameThenSermonID = $.fn.filterJSON({sermonHistoryLookupByUsername}, {
    property: ["sermonid"], // mandatory
    wrapper: true,
    value: window.sermonID,
    checkContains: true,
    startsWith: true,
    matchCase: false,
    avoidDuplicates: true,
    sort: false,
    sortOrder: 'desc'
});

if (sermonHistoryByUsernameThenSermonID.length > 0){
$('#markAsListenedButton').hide();
$('#gradientSermonContent').height(sermonContentHeight + 'px');
}
else{
    console.log('not listened yet.');
}

}
