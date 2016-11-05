/*
Write a private playSong function.
This function should do two things:
Play the current Buzz object: currentBuzzObject.play();
Set the playing property of the song object to true: song.playing = true;
Replace all instances when these two lines of code are used together with the playSong function.
Write documentation for the remaining undocumented attributes and functions of the SongPlayer service.



*/




(function() {
     function SongPlayer(Fixtures) {
		/**
		* @desc SongPlayer makes this constructor's method and attributes available publicly
		* @type {Object}
		*/	
			var SongPlayer = {};

		/**
		* @desc Current Album holds a copy of the albumPicasso object.
		* @type {Object}
		*/
			var currentAlbum = Fixtures.getAlbum();

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
		* @function getSongIndex 
		* @desc Returns index of our song variable (set above in setSong).
		*/
			var getSongIndex = function(){
				return currentAlbum.songs.indexOf(song);
			};

		/**
		* @desc Current Song File
		* @type {Object}
		*/
			 SongPlayer.currentSong = null;

		/**
		* @function playSong
		* @desc Plays currentBuzzObject file and set's song's playing state to true.
		* @param {Object} song
		*/	
			var playSong = function(song){
				currentBuzzObject.play(); 
				song.playing = true;
			};

		/**
		* @function SongPlayer's play method 
		* @desc sets and plays song
		* @param {Object} song
		*/	
			SongPlayer.play = function(song) {
				song = song || SongPlayer.currentSong;
				if (SongPlayer.currentSong !== song) {
				 	setSong(song);
					playSong(song);
				} else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);	
         }
     }
			};
		/**
		* @function SongPlayer's pause method 
		* @desc pauses song
		* @param {Object} song
		*/	
			SongPlayer.pause = function(song) {
				song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
 			};
 		/**
		* @function SongPlayer's previous method 
		* @desc Sets the current song to be the previous one in the array.
		*/	
 			SongPlayer.previous = function(){
 				var currentSongIndex = getSongIndex(SongPlayer.currentSong);
 				currentSongIndex--;
 				if(currentSongIndex < 0){
 					currentBuzzObject.stop();
 					SongPlayer.currentSong.playing = null;
 				} else {
 					var song = currentAlbum.songs[currentSongIndex];
 					setSong(song);
 					playSong(song);
 				}
 			};
 
 			return SongPlayer;
 		}
     	angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
    
 })();