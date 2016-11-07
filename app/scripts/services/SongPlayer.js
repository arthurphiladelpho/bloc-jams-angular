(function() {
     function SongPlayer(Fixtures) {
			var SongPlayer = {};

		/**
 		* @desc An instance of albumPicasso.
		* @type {Object}
 		*/
			var currentAlbum = Fixtures.getAlbum();
			SongPlayer.currentAlbum = currentAlbum;

		/**
		* @function getSongIndex
		* @desc Gets the index of a song in the songs array
		* @param {Object} song
		*/
			var getSongIndex = function(song) {
     		return currentAlbum.songs.indexOf(song);
 			};

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
		* @function playSong
		* @desc Plays currentBuzzObject and sets song's playing property to true.
		* @param {Object} song
		*/
			var playSong = function(){
				currentBuzzObject.play();
				song.playing = true;
			};

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
			var setSong = function(song) {
				if (currentBuzzObject) {
				  stopSong();
				}

				currentBuzzObject = new buzz.sound(song.audioUrl, {
				  formats: ['mp3'],
				  preload: true
				});

				SongPlayer.currentSong = song;
			};

		/**
		* @function stopSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
			var stopSong = function() {
				  currentBuzzObject.stop();
					song.playing = null;
				}
			};

		/**
		* @function play
		* @desc Plays the current song or sets a song and then plays it.
		* @param {Object} song
		*/
			SongPlayer.play = function(song) {
				song = song || SongPlayer.currentSong;
				if (SongPlayer.currentSong !== song) {
				 	setSong(song);
					playSong();
				} else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong();
         }
     }
			};

		/**
		* @function pause
		* @desc Pauses the current song.
		* @param {Object} song
		*/
			SongPlayer.pause = function(song) {
				song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
 			};

 		/**
		* @function previous
		* @desc Sets the currentSongIndex to one less then it is and plays it. If it is the first song in the array, stops playing.
		*/
 			SongPlayer.previous = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex--;

     		if (currentSongIndex < 0) {
         	stopSong();
     		} else {
         	var song = currentAlbum.songs[currentSongIndex];
         	setSong(song);
         	playSong(song);
     		}
 			};

 			/**
		* @function next
		* @desc Sets the currentSongIndex to one more then it is and plays it. If it is the last song in the array, stops playing.
		*/
 			SongPlayer.next = function() {
     		var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     		currentSongIndex++;

     		if (currentSongIndex >= songs.length) {
         	stopSong();
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
         .factory('SongPlayer', SongPlayer);
    
 })();