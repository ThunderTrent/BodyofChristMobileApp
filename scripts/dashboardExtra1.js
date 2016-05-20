   $('#firstDate').bootstrapMaterialDatePicker({
                weekStart: 0,
                time: false
            }).on('change', function(e, date) {
                $('#firstDateLabel').addClass('is-dirty');
            });
            $('#secondDate').bootstrapMaterialDatePicker({
                weekStart: 0,
                time: false
            }).on('change', function(e, date) {
                $('#secondDateLabel').addClass('is-dirty');
            });

            function arrayLookup(array, prop, val) {
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {
                        return array[i];
                    }
                }
                return null;
            }

            Storage.prototype.setArray = function(key, obj) {
                return this.setItem(key, JSON.stringify(obj))
            }
            Storage.prototype.getArray = function(key) {
                return JSON.parse(this.getItem(key))
            }

            function getLocalFilesPushToLocalStorage() {

                function listDirectory() {

                    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
                        var directoryReader = dirEntry.createReader();
                        directoryReader.readEntries(dirSuccess, dirFail);
                    });
                }

                window.filesArray = []

                function dirSuccess(entries) {
                    console.log("INFO: Listing entries");
                    var i;
                    for (i = 0; i < entries.length; i++) {
                        console.log(entries[i].name);
                        window.filesArray.push(entries[i].name);

                    }
                }

                function dirFail(error) {
                    console.log("Failed to list directory contents: " + error.code);
                }

                listDirectory();



            }

            function clearCache() {
                ImgCache.clearCache(function() {
                    // continue cleanup...
                }, function() {
                    // something went wrong
                });
            }
            function showSearchFilter() {
                document.getElementById('searchButton').innerText = 'Search';
                $('searchButton').prepend('<i class="material-icons" style="font-size:30px;margin-right:20px;color:white;">search</i>');
                $('.mdl-list__item').show();
                search();
            }



            function logout() {
                window.location = 'index.html';
                //localStorage.clear();
            }