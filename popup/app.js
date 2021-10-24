angular
    .module('AwsConsoleEnhancerPopup', [])
    .controller('PopupController', ['$scope', function($scope){
        $scope.authToken = '';

        chrome.storage.sync.get(['googAuthToken'], ({googAuthToken}) => {
            // $scope.authToken = googAuthToken;
            // $scope.$apply();
        });

        $scope.getAuthToken = () => {
            $scope.authToken = 'OK';
        }

    }]);