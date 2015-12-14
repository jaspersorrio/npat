"use strict";angular.module("npatApp",["ngMaterial","ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$mdThemingProvider",function(a,b){b.theme("default").primaryPalette("blue").accentPalette("pink"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/funday",{templateUrl:"views/funday.html",controller:"FundayCtrl",controllerAs:"funday"}).when("/funday/2",{templateUrl:"views/funday/2.html",controller:"Funday2Ctrl",controllerAs:"funday/2"}).when("/validate",{templateUrl:"views/validate.html",controller:"ValidateCtrl",controllerAs:"validate"}).otherwise({redirectTo:"/"})}]),angular.module("npatApp").controller("MainCtrl",["$scope",function(a){this.mobileAndTabletcheck=function(){var a=!1;return function(b){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(b)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,4)))&&(a=!0)}(navigator.userAgent||navigator.vendor||window.opera),a},a.isMobile=this.mobileAndTabletcheck()}]).directive("watchVideo",[function(){return{restrict:"A",link:function(a,b,c){var d=document.getElementsByTagName("video")[0];angular.element(b).on("click",function(){d.play(),console.log(d)})}}}]),angular.module("npatApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("npatApp").controller("FundayCtrl",["$scope","$cookies","$http","$location","shareStudent",function(a,b,c,d,e){function f(b){switch(b){case"pageOne":a.page=0;break;case"pageTwo":a.page=1,console.log(a.page);break;case"pageThree":a.page=2,console.log(a.page);break;case"pageFour":a.page=3}}!function(){f("pageOne"),a.stud={},a.tmp={},a.stud=b.getObject("stud"),void 0===a.stud&&(a.stud={}),console.log(a.stud)}();var g=new Date,h=new Date(g.getFullYear(),g.getMonth()+1,g.getDate());a.getPageTwo=function(a){a&&b.putObject("stud",a,{expires:h}),f("pageTwo")},a.getPageThree=function(c){c&&b.putObject("stud",c,{expires:h}),f("pageThree"),a.checkCode(a.stud.game,a.stud.teamCode),a.pageThreeBtnCheck(a.stud)},a.getPageFour=function(a){},a.chooseBlack=function(){a.stud.shirt="black",a.shirt="../images/AT_SHIRT_BACK_7.d87cf4ae.jpg"},a.chooseWhite=function(){a.stud.shirt="white",a.shirt="../images/AT_SHIRT_BACK_7_white.06e4f06d.jpg"},a.getGroupCode=function(a){return c({method:"GET",url:"api/code/"+a})},a.createGroup=function(){console.log(a.stud),a.numberLeft=!1;for(var b="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",d=0;5>d;d++)b+=c.charAt(Math.floor(Math.random()*c.length));a.getGroupCode(b).then(function(c){0==c.data.success?(a.stud.joinGroup=!1,a.stud.createGroup=b):a.createGroup()})},a.joinGroup=function(){console.log(a.stud),a.stud.createGroup&&(console.log("have create group"),a.tmp.createGroup=a.stud.createGroup,a.stud.createGroup=!1),a.stud.createGroup=!1,a.stud.joinGroup=!0,a.stud.teamCode&&a.checkCode(a.stud.game,a.stud.teamCode)},a.checkCode=function(b,c){return delete a.stud.errorMsg,delete a.numberLeft,a.stud.errorMsg=[],c?a.tmp.createGroup==c?void(a.stud.errorMsg[a.stud.errorMsg.length]="Can't join your own group!!"):void a.getGroupCode(c).then(function(d){return console.log(d),d.data.success?(d.data.student[0].createGroup!==c&&(console.log("failed teamcode"),a.stud.teamCodeSuccess=!1,a.stud.errorMsg[a.stud.errorMsg.length]="Not a valid Team Code"),d.data.student[0].game!==b&&(console.log("failed game"),a.stud.teamCodeSuccess=!1,a.stud.errorMsg[a.stud.errorMsg.length]="This Team Code is for "+d.data.student[0].game+" not "+b),d.data.numberLeft<1&&(a.stud.teamCodeSuccess=!1,a.stud.errorMsg[a.stud.errorMsg.length]="I'm sorry but this team is full. Please check with the group leader."),console.log(a.stud.errorMsg.length),void(0===a.stud.errorMsg.length&&(a.numberLeft=d.data.numberLeft,a.stud.teamCodeSuccess=!0))):(a.stud.teamCodeSuccess=!1,void(a.stud.errorMsg[a.stud.errorMsg.length]="Not a valid Team Code"))}):void(a.stud.teamCodeSuccess=!1)},a.pageThreeBtnCheck=function(a){if(a.posting)return console.log("posting is true!"),!0;if(a.group){if("Alone"==a.group)return!1;if(a.createGroup||a.teamCodeSuccess)return!1}return!0},a.putStudent=function(e){a.stud.posting=!0,e.noShirt&&(delete e.shirt,delete e.size),"Alone"===e.group&&(delete e.createGroup,delete e.teamCode),e.joinGroup?delete e.createGroup:delete e.teamCode,c({method:"POST",url:"api/student",data:e}).then(function(c){c.data.success?(b.putObject("stud",c.data.student,{expires:h}),d.path("/validate")):a.stud.posting=!1})},a.editStudent=function(e){a.stud.posting=!0,e.noShirt&&(delete e.shirt,delete e.size),"Alone"===e.group&&(delete e.createGroup,delete e.teamCode),e.joinGroup?delete e.createGroup:delete e.teamCode,c({method:"POST",url:"api/student/edit",data:e}).then(function(c){c.data.success?(console.log(c.data),b.putObject("stud",c.data.student,{expires:h}),d.path("/validate")):a.stud.posting=!1})}}]).directive("video",[function(){return{restrict:"EAC",link:function(a,b,c){angular.element(b).on("click",function(){this.paused?(this.play(),this.previousElementSibling.setAttribute("hidden",!0)):(this.pause(),this.previousElementSibling.removeAttribute("hidden"))}),angular.element(b).on("mouseover mouseout",function(){this.hasAttribute("controls")?(this.removeAttribute("controls"),this.previousElementSibling.removeAttribute("style")):(this.setAttribute("controls","controls"),this.previousElementSibling.setAttribute("style","opacity:0.5"))})}}}]),angular.module("npatApp").controller("Funday2Ctrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("npatApp").controller("ValidateCtrl",["$cookies","$scope","shareStudent",function(a,b,c){b.stud=a.getObject("stud"),console.log(b.stud),b.stud.stripedNumber=b.stud.number.substring(0,b.stud.number.length-1)}]),angular.module("npatApp").service("shareStudent",function(){var a=this;return a}),angular.module("npatApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/funday.html",'<style type="text/css">.bg-main{\n		background-color: whitesmoke;\n	}\n\n	label{\n		text-shadow:none !important;\n	}\n\n	.signup{\n		background-color:whitesmoke;\n		color:rgba(0,0,0,0.78);\n	}\n\n	button.black{\n		background-color: black !important;\n		color:white !important;\n	}\n\n	.cropped-images{\n		max-height: 100%;\n		height: 100%;\n		width: 100%;\n	}\n\n	md-tab-item{\n		color: rgba(0,0,0,0.78) !important;\n	}\n\n	md-tab-item.md-active{\n		color: rgb(16,108,200) !important;\n	}\n\n	.npatVids{\n		width:100%;\n		cursor:pointer;\n	}\n\n	.video-cover{\n		position: absolute;\n		background: black;\n		width: 100%;\n		height: 100%;\n		color:white;\n	}\n\n	.video-cover h2{\n		position: relative;\n		top: 50%;\n		transform: translateY(-50%);\n		-webkit-transform: translateY(-50%);\n	}\n\n	[ng-click]{\n		outline: none;\n	}</style> <div class="flex-height signup"> <!-- name\n	stud id\n	Hp Number\n	game\n	join alone\n	join as group\n	join as team\n	shirt size\n	shirt size chart --> <div layout="row" flex-offset="30" flex="40" flex-md="20" flex-offset-md="40" flex-gt-md="10" flex-offset-gt-md="45" layout-padding layout-align="center center"> <a href="#/" layout="column" layout-align="center center"> <img src="../images/npat.acfd2dc4.jpg"> </a> </div> <div class="scrollable" layout="row" flex-offset-gt-md="20" flex-gt-md="60" flex="80" flex-offset="10" layout-align="center center"> <md-card flex> <md-card-content> <md-tabs md-selected="page" md-swipe-content md-dynamic-height> <md-tab label="General"> <!-- MAIN --> <md-tab-body> <h2 class="sec-text">Sign up now!</h2> <h5 class="sec-text">The price of AT Funday is $2</h5> <div class="page" layout-padding flex> <ng-form name="pageOne"> <md-input-container> <label>Full Name</label> <input required flex type="text" name="studName" ng-model="stud.name"> <div ng-messages="pageOne.studName.$error" ng-if="pageOne.studName.$touched" role="alert"> <div ng-message="required">This is required</div> </div> </md-input-container> <md-input-container> <label>Student Number (10109323A)</label> <input required type="text" pattern="[0-9]{8}[a-zA-Z]{1}" name="studNumber" ng-model="stud.number"> <div ng-messages="pageOne.studNumber.$error" ng-if="pageOne.studNumber.$touched" role="alert"> <div ng-message="required">This is required</div> <div ng-message="pattern">This does not seem to look like 10109323a</div> </div> </md-input-container> <md-input-container> <label>Phone Number</label> <input required type="tel" name="studHp" pattern="[0-9]{8}" ng-model="stud.hp"> <div ng-messages="pageOne.studHp.$error" ng-if="pageOne.studHp.$touched" role="alert"> <div ng-message="required">This is required</div> <div ng-message="pattern">This does not seem to look like a Singapore Number (90019002)</div> </div> </md-input-container> <!-- any food allergies or dietry requirements --> <md-input-container> <label>Food allergies / Dietry requirements</label> <input type="text" name="studAllergies" ng-model="stud.allergies"> </md-input-container> </ng-form> <md-button ng-click="getPageTwo(stud)" class="md-primary md-raised" ng-disabled="pageOne.$invalid">Next</md-button> </div> </md-tab-body> </md-tab> <!-- GAMES --> <md-tab label="Games" ng-disabled="pageOne.$invalid" ng-click="getPageTwo(stud)"> <h2>Choose a game!</h2> <md-grid-list md-cols-sm="1" md-cols="2" md-gutter="15px" md-row-height="16:9"> <md-grid-tile ng-click="playFussball()"> <!-- <md-grid-tile-header>\n								<h3>Human Fussball</h3>\n							</md-grid-tile-header> --> <div class="video-cover" text-center> <h2>Click to find out how to play Human Fussball</h2> </div> <video class="npatVids fussball" poster="" preload="none"> <source src="/vid/humanFussball.mp4"> </source></video> <!-- <img class="cropped-images" src="../images/humanfusball.29824bf6.jpg"> --> </md-grid-tile> <md-grid-tile ng-click="playDball()"> <!-- <md-grid-tile-header>\n								<h3>Dragon Ball</h3>\n							</md-grid-tile-header> --> <div class="video-cover" text-center> <h2>Click to find out how to play Dragon Ball</h2> </div> <video class="npatVids dball" poster="" preload="none"> <source src="/vid/dragonBall.mp4"> </source></video> <!-- <img class="cropped-images" src="../images/dragonball.6da5595c.jpg"> --> </md-grid-tile> </md-grid-list> <md-input-container> <label>Game</label> <md-select ng-model="stud.game"> <md-option value="Human Fussball">Human Fussball</md-option> <md-option value="Dragon Ball">Dragon Ball</md-option> </md-select> </md-input-container> <md-button ng-click="getPageThree(stud)" ng-disabled="!stud.game" class="md-primary md-raised">Confirm</md-button> </md-tab> <!-- TEAM --> <md-tab label="Team" ng-disabled="!stud.game" ng-click="getPageThree(stud)"> <h2>Teams</h2> <md-radio-group ng-model="stud.group"> <md-radio-button value="Alone">Join alone</md-radio-button> <md-radio-button value="Group">Join as a group (Max 10 players)</md-radio-button> </md-radio-group> <div ng-if="stud.group == \'Group\'"> <md-button ng-click="createGroup()" class="md-raised md-accent">Create Group</md-button> <md-button ng-click="joinGroup()" class="md-raised md-accent">Join Group</md-button> <div ng-if="stud.createGroup"> Your team code is <span class="stand-out">{{stud.createGroup}}</span> ! Please pass this code to your team mates! </div> <div ng-if="stud.joinGroup"> <md-input-container> <label>Team Code</label> <input type="text" ng-change="checkCode(stud.game, stud.teamCode)" ng-model="stud.teamCode"> <div ng-messages="stud.teamCode" role="alert"> <div ng-repeat="error in stud.errorMsg">{{error}}</div> </div> </md-input-container> </div> <div ng-if="numberLeft">Woah, only <span class="stand-out">{{numberLeft}}</span> slots left</div> </div> <md-button ng-if="!stud._id" class="md-raised md-primary" ng-click="putStudent(stud)" ng-disabled="pageThreeBtnCheck(stud)">Confirm</md-button> <md-button ng-if="stud._id" class="md-raised md-primary" ng-click="editStudent(stud)" ng-disabled="pageThreeBtnCheck(stud)">Edit</md-button> </md-tab> </md-tabs> </md-card-content> </md-card> </div> </div>'),a.put("views/funday/2.html","<p>This is the funday/2 view.</p>"),a.put("views/main.html",'<style type="text/css">.call-to-action-container{\n    height:100%;\n    z-index: 1000000;\n    text-shadow: 2px 2px black;\n  }</style> <!-- for mobile --> <div id="bgImg" bg-img ng-if="isMobile" ng-class="{\'greyscale\': videoColor}"> </div> <!-- delete --> <!-- <div id="bgMove" bg-img ng-if="isMobile" ng-class="{\'greyscale\': videoColor}">\n  \n</div> --> <!-- for desktop --> <video ng-if="!isMobile" autoplay loop id="bgvid" ng-class="{\'greyscale\': videoColor}"> <source src="../videos/npat cover2.mp4" type="video/mp4"> </source></video> <div class="call-to-action-container" layout="column" flex layout-align="center start"> <a href="#/funday" class="call-to-action"> <div class="call-to-action" ng-mouseleave="videoColor = false" ng-mouseover="videoColor = true;" layout="column" layout-align="center center"> <!-- NPAT LOGO --> <div> <img id="npat" src="./images/npat.acfd2dc4.jpg"> </div> <div> <!--  SIGN UP TEXT  --> <h1 text-center>Sign up for AT ˚ FUNDAY</h1> </div> </div> </a> <div watch-video ng-if="isMobile" class="call-to-action" layout="column" layout-align="center center"> <div> <!--  SIGN UP TEXT  --> <h1 text-center>Watch AT ˚ FUNDAY video</h1> </div> <video mobile-vid hidden> <source src="../videos/npat cover2.mp4" type="video/mp4"> </source></video> </div> </div>'),a.put("views/validate.html",'<style type="text/css">[text-center]{\n		text-align: center;\n	}\n\n	[validation]{\n		color: rgba(0,0,0,0.78) !important;\n		height: 50%;\n		position: relative;\n		top: 50%;\n		transform: translateY(-50%);\n		-webkit-transform: translateY(-50%);\n		background-color: white;\n	}\n\n	.bigbox{\n		height: 100% !important;\n		width: 100% !important;\n		background-color: whitesmoke;\n	}</style> <div class="bigbox"> <div class="md-whiteframe-2dp validate-card" text-center validation flex-offset="10" flex="80" flex-gt-md="50" flex-offset-gt-md="25" layout="column" layout-align="center center"> <h4>Please validate this request by clicking on the link sent to <span class="stand-out">S{{stud.stripedNumber}}@connect.np.edu.sg</span></h4> <md-button class="md-raised md-primary" href="/#/funday">Edit Submission</md-button> <div> <h2 class="my-warn">You can close this window now.</h2> </div> </div> </div>')}]);