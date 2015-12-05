'use strict';

/**
 * @ngdoc function
 * @name npatApp.controller:FundayCtrl
 * @description
 * # FundayCtrl
 * Controller of the npatApp
 */
angular.module('npatApp')
  .controller('FundayCtrl', function ($scope, $cookies, $http) {
    
    // constructor
    (function(){
    	viewHandler('pageOne');
    	console.log($cookies.getObject('stud'));
    	$scope.stud = {};
    	$scope.stud = $cookies.getObject('stud');
    })();

    $scope.getPageTwo = function(stud){
    	// save to cookie
    	if(stud){
    		
    		$cookies.putObject('stud', stud);
    	}

    	switch($scope.stud.shirt){
    		case 'white':
    			$scope.chooseWhite();
    			break;
    		case 'black':
    			$scope.chooseBlack();
    			break;
    		default:
    			$scope.chooseBlack();
    			break;
    	}

    	viewHandler('pageTwo');
    };

    $scope.getPageThree = function(stud){
    	if(stud){
    		$cookies.putObject('stud', stud);
    	}
    	viewHandler('pageThree');

    }

    $scope.getPageFour = function(stud){
    	if(stud){
    		$cookies.putObject('stud', stud);
    	}
    	viewHandler('pageFour');
    	$scope.checkCode($scope.stud.game, $scope.stud.teamCode)
    	$scope.pageFourBtnCheck($scope.stud);
    }

    $scope.chooseBlack = function(){
    	$scope.stud.shirt = 'black';
    	$scope.shirt = "../images/AT_SHIRT_BACK_7.jpg";
    }

    $scope.chooseWhite = function(){
    	$scope.stud.shirt = 'white';
    	$scope.shirt = "../images/AT_SHIRT_BACK_7_white.jpg";
    }

    $scope.getGroupCode = function(code){
    	return $http({
    		method: "GET",
    		url : "api/code/"+code
    	})
    };

    $scope.createGroup = function(asd){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ ){
		text += possible.charAt(Math.floor(Math.random() * possible.length));	
	}

	$scope.getGroupCode(text).then(function(res){
    		if(res.data.success == false){
    			$scope.stud.joinGroup = false;
		    	$scope.stud.createGroup = text;	

    		} else {
    			$scope.createGroup();
    		}
    	});
    }

    $scope.joinGroup = function(){
    	$scope.stud.createGroup = false;	
    	$scope.stud.joinGroup = true;
    };	

    $scope.checkCode = function(game, teamCode){
    	if(!teamCode){
    		$scope.stud.teamCodeSuccess = false;
    		return;
    	}
    	$scope.getGroupCode(teamCode).then(function(res){
    		// if res data game = game passed from outside 
    		// stud.teamCodeSuccess = true;
 		console.log(res);
    		delete $scope.stud.errorMsg;
    		delete $scope.numberLeft ;
    		$scope.stud.errorMsg = [];
    		if(!res.data.success){
    			$scope.stud.teamCodeSuccess = false;	
    			$scope.stud.errorMsg[$scope.stud.errorMsg.length] = 'Not a valid Team Code';
    			return;
		}

    		if(res.data.student[0].createGroup !== teamCode){
    			console.log('failed teamcode');
    			$scope.stud.teamCodeSuccess = false;	
    			$scope.stud.errorMsg[$scope.stud.errorMsg.length] = 'Not a valid Team Code';
    		}

    		if(res.data.student[0].game !== game){
    			console.log('failed game');
    			$scope.stud.teamCodeSuccess = false;
    			$scope.stud.errorMsg[$scope.stud.errorMsg.length] = 'This Team Code is for '+res.data.student[0].game +' not ' + game;
    		}

    		if(res.data.numberLeft < 1){
    			$scope.stud.teamCodeSuccess = false;
    			$scope.stud.errorMsg[$scope.stud.errorMsg.length] = "I'm sorry but this team is full. Please check with the group leader.";
    		}

    		console.log($scope.stud.errorMsg.length);

    		if($scope.stud.errorMsg.length === 0){
    			$scope.numberLeft = res.data.numberLeft;
    			$scope.stud.teamCodeSuccess = true;	
    		}
    		

    	})
    }

    $scope.pageFourBtnCheck = function(stud){
    	console.log(stud);
    	if(stud.group){
    		if(stud.group == 'Alone'){
    			return false;
    		}

    		if(stud.createGroup || stud.teamCodeSuccess){
    			return false;
    		}
    	}

    	return true;
    };

    $scope.putStudent = function(stud){
    	if(stud.noShirt){
    		delete stud.shirt;
    		delete stud.size;
    	}

    	if(stud.group === "Alone"){
    		delete stud.createGroup;	
    		delete stud.teamCode;
    	}

    	if(stud.joinGroup){
    		delete stud.createGroup;
    	} else {
    		delete stud.teamCode;
    	}

    	console.log(JSON.stringify(stud));

    	$http({
    		method: "POST",
    		url : 'api/student',
    		data: stud
    	}).then(function(res){
    		console.log(res);
    	});

    }
    function viewHandler(view){
    	
    	console.log(view);
    	switch(view){

    		case "pageOne":
    			$scope.page = 0;
    			break;

    		case "pageTwo":
		    	$scope.page = 1;
    			break;

    		case "pageThree":
    			$scope.page = 2;
	    		break;

	    	case "pageFour":
    			$scope.page = 3;
	    		break;

    	}
    };
  });
