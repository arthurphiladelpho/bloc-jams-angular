(function() {
	function seekBar() {
		//Takes in the seekBar element (volumer or song position seekBar) and the event (click or mouseDown) that occurred.
		var calculatePercent = function(seekBar, event) {
			// Stores the difference between the position of the click and the far left of the seekbar. 
			// pageX is native JavaScript. Returns the horizontal coordinate of an event relative to the whole document.
			// .offset() is jQuery. Allows to retrueve the position of the element relative to the document. 
			//		- Returns an object containing the top and left properties.
			var offsetX = event.pageX - seekBar.offset().left;
			console.log(event.pageX);
			console.log(seekBar.offset().left);
			console.log(offsetX);
			// .width() is a jQuery method that returns the width of the element it is applied to.
			var seekBarWidth = seekBar.width();
			console.log(seekBarWidth);
			// Dividir (a distancia do evento da ponta esquerda da seekBar) pelo (tamanho da seekBar) ie: 70/100
			var offsetXPercent = offsetX / seekBarWidth;
			// Make sure this percentage is no lower than zero.
			offsetXPercent = Math.max(0, offsetXPercent);
			// Make sure this percentage is no higher than 1.
			offsetXPercent = Math.min(1, offsetXPercent);
			return offsetXPercent;
 		};

		return {
         templateUrl: '/templates/directives/seek_bar.html',
         replace: true,
         restrict: 'E',
         scope: { },
         link: function(scope, element, attributes) {
             scope.value = 0;
             scope.max = 100;
 						 // Define seekBar variable as the seekBar element we are referring to this moment. ie: volume seekBar or song position seekBar.
             var seekBar = $(element);

             var percentString = function () {
                 var value = scope.value;
                 var max = scope.max;
                 var percent = value / max * 100;
                 return percent + "%";
             };
 
             scope.fillStyle = function() {
                 return {width: percentString()};
             };
             // Multiplies the percentage of the calculatePercentage by 100 and updated the scope.value variable.
             // This method may now be added as an ng-click directive to a seekBar element.
             // ie: <div class="seek-bar" ng-click="onClickSeekBar($event)">
             scope.onClickSeekBar = function(event) {
            	 var percent = calculatePercent(seekBar, event);
            	 scope.value = percent * scope.max;
         		 };
   			  }
   	};
	}

	angular
	  .module('blocJams')
	  .directive('seekBar', seekBar);
 })();