(function() {
     function SongPlayer() {
			var SongPlayer = {};

		/**
 		* @desc Current song object
		* @type {Object}
 		*/
			SongPlayer.currentSong = null;

		/**
 		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
 		*/
 			SongPlayer.currentTime = null;
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
			var currentBuzzObject = null;

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
			var setSong = function(song) {
				if (currentBuzzObject) {
				  currentBuzzObject.stop();
				  SongPlayer.currentSong.playing = null;
				}

				currentBuzzObject = new buzz.sound(song.audioUrl, {
				  formats: ['mp3'],
				  preload: true
				});

				SongPlayer.currentSong = song;
			};

		/**
		* @function play
		* @desc Plays the current song or sets a song and then plays it.
		* @param {Object} song
		*/
			SongPlayer.play = function(song) {
				if (SongPlayer.currentSong !== song) {
				 	setSong(song);
					currentBuzzObject.play(); 
					song.playing = true; 
				} else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
     }
			};

		/**
		* @function pause
		* @desc Pauses the current song.
		* @param {Object} song
		*/
			SongPlayer.pause = function(song) {
     		currentBuzzObject.pause();
     		song.playing = false;
 			};
 
 			return SongPlayer;
 		}
     	angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
    
 })();