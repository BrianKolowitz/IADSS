'use strict';

angular.module('iadssWebApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.contributors = [
        { name: "G. Crofts, PhD", association: "School of Health Sciences, University of Salford", country: "UK" },
        { name: "R. Padman, PhD", association: "The H. John Heinz III College, Carnegie Mellon University", country: "USA" },
        { name: "O. Alani, PhD", association: "School of Computing, Science and Engineering, University of Salford", country: "UK" },
        { name: "F. Meziane, PhD", association: "School of Computing, Science and Engineering, University of Salford", country: "UK" },
        { name: "N. Maharaja", association: "The H. John Heinz III College, Carnegie Mellon University", country: "USA" },
        { name: "B.J. Kolowitz, DSc", association: "UPMC", country: "USA" }
    ];

    $scope.panes = [
        { title:"Home", template:"/" },
        { title:"Study List", template:"/#/study" },
        { title:"Patient List", template:"/#/patient" },
        { title:"Fake", template:"/#/fake" }
    ];
  }]);
