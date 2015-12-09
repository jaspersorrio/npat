'use strict';

/**
 * @ngdoc function
 * @name npatApp.controller:FundayCtrl
 * @description
 * # FundayCtrl
 * Controller of the npatApp
 */
angular.module('npatApp')
  .controller('FundayCtrl', function ($scope, $cookies, $http, $location, shareStudent) {

    // constructor
    (function(){
    	viewHandler('pageOne');
    	$scope.stud = {};
    	$scope.tmp = {};
    	$scope.stud = $cookies.getObject('stud');
    	if($scope.stud === undefined){
    		$scope.stud = {};
    	}
    	console.log($scope.stud);
    })();

    var now = new Date();
    var exp = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());

    $scope.getPageTwo = function(stud){
    	// save to cookie
    	if(stud){
    		
    		$cookies.putObject('stud', stud, {
    			expires: exp
    		});
    	}

    	switch($scope.stud.shirt){
    		case 'white':
    			$scope.chooseWhite();
    			break;
    		case 'black':
    			$scope.chooseBlack();
    			break;
    		case undefined:
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
    		console.log(exp);
    		$cookies.putObject('stud', stud, {
    			expires: exp
    		});
    	}
    	setTimeout(function(){
    		viewHandler('pageThree');
    	}, 1)
    	

    }

    $scope.getPageFour = function(stud){
    	if(stud){
    		$cookies.putObject('stud', stud, {
    			expires: exp
    		});
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

    $scope.createGroup = function(){
    	console.log($scope.stud);
    	// restart stud.teamCode;
    	$scope.numberLeft = false;

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

    	console.log($scope.stud);
    	if($scope.stud.createGroup){
    		// send to tmp
    		console.log('have create group');
    		$scope.tmp.createGroup = $scope.stud.createGroup;

    		// erase
		$scope.stud.createGroup = false;
    	}

    	$scope.stud.createGroup = false;
    	$scope.stud.joinGroup = true;

    	if($scope.stud.teamCode){
    		$scope.checkCode($scope.stud.game, $scope.stud.teamCode);
    	}

    };	

    $scope.checkCode = function(game, teamCode){
    	delete $scope.stud.errorMsg;
	delete $scope.numberLeft ;
	$scope.stud.errorMsg = [];
    	if(!teamCode){
    		$scope.stud.teamCodeSuccess = false;
    		return;
    	}

    	if($scope.tmp.createGroup == teamCode){
    		$scope.stud.errorMsg[$scope.stud.errorMsg.length] = "Can't join your own group!!";
    		return;
    	}

    	$scope.getGroupCode(teamCode).then(function(res){
    		// if res data game = game passed from outside 
    		// stud.teamCodeSuccess = true;
 		console.log(res);
    		
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
    	if(stud.posting){
    		console.log('posting is true!');
    		return true;
    	}

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
    	// disable old button
    	$scope.stud.posting = true;

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

    	$http({
    		method: "POST",
    		url : 'api/student',
    		data: stud
    	}).then(function(res){
    		if(res.data.success){
    			// change page

    			$cookies.putObject('stud', res.data.student,{
    			expires: exp
    		});
    			// shareStudent.stud = ;
			$location.path('/validate');
    		} else {
    			$scope.stud.posting = false;
    		}
    	});

    }


    $scope.editStudent = function(stud){
    	$scope.stud.posting = true;

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

    	$http({
    		method: "POST",
    		url : 'api/student/edit',
    		data: stud
    	}).then(function(res){
    		if(res.data.success){
    			// change page
    			console.log(res.data);
    			$cookies.putObject('stud', res.data.student,{
	    			expires: exp
	    		});
    			// shareStudent.stud = ;
			$location.path('/validate');
    		} else {
    			$scope.stud.posting = false;
    		}
    	});

    };

    function viewHandler(view){
    	switch(view){

    		case "pageOne":
    			$scope.page = 0;
    			break;

    		case "pageTwo":
			$scope.page = 1;	
			console.log($scope.page);		    	
    			break;

    		case "pageThree":

    			$scope.page = 2;
    			console.log($scope.page);
	    		break;

	    	case "pageFour":
    			$scope.page = 3;
	    		break;

    	}
    };
  });
