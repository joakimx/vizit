app.controller('UserSettingsCtrl', function ($scope, user, UserFactory, $rootScope, $mdToast, $document) {
   $scope.user = user;
   $scope.open = true;
   $scope.oneAtATime = true;
   $scope.update = {};
   $scope.pass = {};
   $scope.peek = {
      old: false,
      new: false,
      newConfirm: false
   };

   function passwordSuccess () {
      $mdToast.show($mdToast.simple()
         .content('Your password has been updated')
         .position('top right')
         .parent($document[0].querySelector('#password')));
      $scope.pass = {};
   }

   function passwordFail (err) {
      $mdToast.show($mdToast.simple()
         .content(err)
         .position('top left')
         .parent($document[0].querySelector('#password')));
      $scope.pass = {};
   }

   function userSuccess (updatedUser) {
      $mdToast.show($mdToast.simple()
         .content('Your information has been updated')
         .position('top right')
         .parent($document[0].querySelector('#account')));
      $rootScope.$emit('userUpdated', updatedUser._id);
      $scope.user = updatedUser;
      $scope.update = {};
   }

   function userError (err) {
      $mdToast.show($mdToast.simple()
         .content(err)
         .position('top left')
         .parent($document[0].querySelector('#account')));
      $scope.update = {};
   }

   function disconnectSuccess (updatedUser, provider) {
      $mdToast.show($mdToast.simple()
         .content('Disconnected from '+provider)
         .position('top right')
         .parent($document[0].querySelector('#connect')));
      $rootScope.$emit('userUpdated', updatedUser._id);
      $scope.user = updatedUser;
   }

   function disconnectFail (err, provider) {
      $mdToast.show($mdToast.simple()
         .content(provider+': '+err)
         .position('top left')
         .parent($document[0].querySelector('#connect')));
   }

   $scope.updateUser = function (userInfo) {
      UserFactory.updateUser($scope.user._id, userInfo)
      .then(userSuccess)
      .catch(userError);
   }

   $scope.updatePassword = function (passObj) {
      UserFactory.updateUser($scope.user._id, passObj)
      .then(passwordSuccess)
      .catch(passwordFail);
   }

   $scope.disconnect = function (provider) {
      UserFactory.updateUser($scope.user._id, {provider: provider.toLowerCase()})
      .then(function (updatedUser) {
         disconnectSuccess(updatedUser, provider);
      })
      .catch(function (err) {
         disconnectFail(err, provider);
      })
   }
})