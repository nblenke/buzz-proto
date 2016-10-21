app.accountView = Backbone.View.extend({
    events: {
        'submit #account-edit': 'submitForm',
    },
    initialize: function () {
        var currentUser = firebase.auth().currentUser;

        $(this.el).html(_.template($("#tmpl-account").html(), {
            currentUser: currentUser
        }));
    },
    submitForm: function (ev) {
        ev.preventDefault();
        this.saveDisplayName();
        this.uploadImage();
    },
    saveDisplayName: function () {
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
        var displayName = $('#displayName').val();

        // update auth
        currentUser.updateProfile({
            displayName: displayName,
          }).then(function() {
            // Update successful.
          }, function(error) {
            // An error happened.
          });

        // update users
        database.ref('users/' + currentUser.uid).update({
            displayName: displayName,
        });
    },
    uploadImage: function() {
        var database = firebase.database();
        var storageRef = firebase.storage().ref();
        var currentUser = firebase.auth().currentUser;

        // File or Blob named mountains.jpg
        var file = document.getElementById("imageFileInput").files[0];

        if (!file) {
            return;
        }

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

          // update auth
          currentUser.updateProfile({
              photoURL: downloadURL,
            }).then(function() {
              // Update successful.
              $('#currentPhoto').attr('src', downloadURL);
            }, function(error) {
              // An error happened.
            });

          // update users
          database.ref('users/' + currentUser.uid).update({
              photoURL: downloadURL,
          });
        });
    }
});
