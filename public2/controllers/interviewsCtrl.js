app.controller('interviewsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.project = MainSrv.getSelectedProject();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.project === undefined) {
      $location.url("/");
    }
  })();

  $scope.phases = {
    selected : null,
    options : $scope.project.selectionPhases
  };

  var refresh = function(){
    profileData.getAllInterviewSlots($scope.project._id)
    .success(function(data){
      $scope.slots = data;
      $scope.noSlots = ($scope.slots.length === 0);
    })
    .error(function(err){
      $scope.error = err.message;
    })
  }

  refresh();

  $scope.deleteSlot = function(slot){
    $scope.selectedSlot = slot;
    $('#confirmDeleteModal').modal('open');
  }

  $scope.editSlot = function(slot){
    $scope.selectedSlot = slot;
    $('#editSlotModal').modal('open');
  }

  $scope.reservations = function(slot){
    MainSrv.setSelectedSlot(slot);
    $location.url('/reservations');
  }

  $scope.cancelReservation = function(reserver){
    profileData.cancelReservation(reserver._id)
    .success(function(){
      $('#reservationsModal').modal('close');
      $scope.reservations($scope.selectedSlot);
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.createSlot = function(){
    $('#createSlotModal').modal('open');
  }

  var createCheckFields = function(){
    var flag = false;
    if($scope.phases.selected === null){
      flag  = true;
      $scope.createFeedback = "Please specify the selection phase";
    }
    if($scope.date === undefined){
      flag = true;
      $scope.createFeedback = "Please specify the date of the slot";
    }
    if($scope.info === undefined || $scope.info === ""){
      flag = true;
      $scope.createFeedback = "Please add information to this slot, time and location should be in the information for guidance";
    }
    if($scope.capacity === undefined || $scope.capacity < 1){
      flag = true;
      $scope.createFeedback = "Please specify the capacity of this slot";
    }
    return flag;
  }

  var editCheckFields = function(){
    var flag = false;
    if($scope.date === undefined){
      flag = true;
      $scope.editFeedback = "Please specify the date of the slot";
    }
    if($scope.info === undefined || $scope.info === ""){
      flag = true;
      $scope.editFeedback = "Please add information to this slot, time and location should be in the information for guidance";
    }
    if($scope.capacity === undefined || $scope.capacity < 1){
      flag = true;
      $scope.editFeedback = "Please specify the capacity of this slot";
    }
    return flag;
  }

  $scope.confirmCreateSlot = function(){
    $scope.createFeedback = "";
    var error = createCheckFields();
    if(!error){
      profileData.createInterviewSlot($scope.project, $scope.phases.selected, $scope.date, $scope.info, $scope.capacity)
      .success(function(){
        refresh();
        $scope.createFeedback = "Successfully Created!";
      })
      .error(function(err){
        console.log(err);
        $scope.createFeedback = err.message;
      });
    }
  }

  $scope.confirmEditSlot = function(){
    $scope.editFeedback = "";
    var error = editCheckFields();
    if(!error){
      profileData.editInterviewSlot($scope.selectedSlot._id, $scope.date, $scope.info, $scope.capacity)
      .success(function(){
        refresh();
        $scope.editFeedback = "Successfully Edited!";
      })
      .error(function(err){
        console.log(err);
        $scope.editFeedback = err.message;
      });
    }
  }

  $scope.back = function(){
    $location.url('/projects');
  }

  $scope.confirmDeleteSlot = function(){
    profileData.deleteSlot($scope.selectedSlot._id)
    .success(function(){
      refresh();
      $('#confirmDeleteModal').modal('close');
    })
    .error(function(err){
      console.log(err);
    });
  }

});
