easyjob.controller('FreelancerController', [
  'FreelancerModel',
  '$scope',
  '$rootScope',
  function (FreelancerModel, $scope, $rootScope) {
    console.log('Freelancer');

    $rootScope.headerDefault = false;
    $rootScope.headerDefaultLogout = true;
    $rootScope.footerDefault = false;

    $scope.amount = 10;
    $scope.period;
    $scope.day_of_week;
    $scope.description;
    $scope.freelancer_id;
    $scope.speciality_id;


    let sessionValidated = JSON.parse(sessionStorage.getItem('sessionValidated'));

    $rootScope.name = sessionValidated.freelancer.name.split(" ")[0];

    $scope.imageUploadPreview = function () {

      var preview = document.querySelector('#preview');

      if (this.files) {
        [].forEach.call(this.files, readAndPreview);
      }

      function readAndPreview(file) {

        // Make sure `file.name` matches our extensions criteria
        if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
          return alert(file.name + " is not an image");
        } // else...

        var reader = new FileReader();

        reader.addEventListener("load", function () {
          var image = new Image();
          image.height = 100;
          image.title = file.name;
          image.src = this.result;
          preview.appendChild(image);
        });

        reader.readAsDataURL(file);

      }
    }

    document.querySelector('#file-input').addEventListener("change", $scope.imageUploadPreview);
  }
]);