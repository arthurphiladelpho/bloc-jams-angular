(function() {
	function seekBar($document) {

	 	/**
		* @function link
		* @desc Calculates the horizontal percent along the seek bar where the event passed occurred.
		* @param {HTML Element w/ the seek-bar tag} seekBar
		*/
	 	var calculatePercent = function(seekBar, event) {
	 		var offsetX = event.pageX - seekBar.offset().left;
	 		var seekBarWidth = seekBar.width();
	 		var offsetXPercent = offsetX / seekBarWidth;
	 		offsetXPercent = Math.max(0, offsetXPercent);
	 		offsetXPercent = Math.min(1, offsetXPercent);
	 		return offsetXPercent;
		};

	 	return {
	    templateUrl: '/templates/directives/seek_bar.html',
	    replace: true,
	    restrict: 'E',
	    /**
	 		* @desc Specifies a new scope for this directive.
			* @type {Object}
	 		*/
	    scope: {},
	    /**
			* @function link
			* @desc Registers DOM listeners and updates DOM.
			*/
	    link: function(scope, element, attributes){
	    				/**
					 		* @desc Holds the value of a seek bar. ie: current volume or song time.
							* @type {Number}
					 		*/
			     		scope.value = 0;
			     		/**
					 		* @desc Holds the maximum value of a seek bar.
							* @type {Number}
					 		*/
			     		scope.max = 100;

			     		var seekBar = $(element);

			     		attributes.$observe('value', function(newValue) {
						     scope.value = newValue;
						 	});
						 
						 	attributes.$observe('max', function(newValue) {
						     scope.max = newValue;
						 	});
						 	/**
							* @function percentString
							* @desc Divides the scope's value property by the max property and returns it a string.
							*/
			     		var percentString = function(){
			     			var value = scope.value;
			     			var max = scope.max;
			     			var percent = value / max * 100;
			     			return percent + "%";
			     		};
			     		/**
							* @function fillStyle
							* @desc Returns the width of the seek bar fill element based on the percentage calculated.
							*/
			     		scope.fillStyle = function() {
			     			return {width: percentString()};
			     		};

			     		scope.thumbStyle = function(){
			     			return {width: trackThumb()};
			     		}
			     		/**
							* @function onClickSeekBar
							* @desc Updates the seek bar value based on seek bar width and location user clicked.
							*/
			     		scope.onClickSeekBar = function(event) {
			         	var percent = calculatePercent(seekBar, event);
			         	scope.value = percent * scope.max;
			     		};
			     		/**
							* @function trackThumb
							* @desc Similar to onClickSeekBar but uses $apply to constantly apply the change in value of scope.value as user drags the seek bar thumb.
							*/
			     		scope.trackThumb = function() {
			 					$document.bind('mousemove.thumb', function(event) {
			    				var percent = calculatePercent(seekBar, event);
			     				scope.$apply(function() {
			         			scope.value = percent * scope.max;
			     				});
			 					});

			 					$document.bind('mouseup.thumb', function() {
			     				$document.unbind('mousemove.thumb');
					        $document.unbind('mouseup.thumb');
			 					});
							};
	    	}
	 		};
		}

	angular
	  .module('blocJams')
	  .directive('seekBar', ['$document', seekBar]);
 })();