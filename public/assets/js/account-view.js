app.accountView = Backbone.View.extend({
    events: {
        'submit #foo': 'uploadImage',
    },
    initialize: function () {
        $(this.el).html(_.template($("#tmpl-account").html(), {}));
    },
    uploadImage: function (ev, data) {
        ev.preventDefault();

        var storageRef = firebase.storage().ref();
        var currentUser = firebase.auth().currentUser;

        // File or Blob named mountains.jpg
        var file = document.getElementById("exampleInputFile").files[0];

        // Create the file metadata
        var metadata = {
          contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + currentUser.uid).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log('storage/unauthorized')
              break;

            case 'storage/canceled':
              // User canceled the upload
              console.log('storage/canceled')
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log('storage/unknown')
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          var downloadURL = uploadTask.snapshot.downloadURL;
          console.log(downloadURL)

          currentUser.updateProfile({
              photoURL: downloadURL,
            }).then(function() {
              // Update successful.
            }, function(error) {
              // An error happened.
            });

          app.database.ref('users/' + app.currentUser.uid).update({
              photoURL: downloadURL,
          });
        });
    }
});
