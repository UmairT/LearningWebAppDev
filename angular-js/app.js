var app = angular.module("commentsApp", []);

app.controller("CommentsController", function($scope) {
	$scope.newComment = "";
	
	$scope.comments = [
    	"This is the first comment!",
    	"Here's the second one!",
    	"And this is one more.",
    	"Here is another one!"
	];
	
	$scope.addComment = function() {
    	$scope.comments.push($scope.newComment);
    	$scope.newComment = "";
  	};
  	
	$scope.submit = function() {
    	if ($scope.newComment) {
			$scope.comments.push($scope.newComment);
      		$scope.newComment = "";
      	}
    };
});
