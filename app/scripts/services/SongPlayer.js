(function() {
     function SongPlayer() {
          // Create a SongPlayer object to be returned in the end of this constructor function.
          var SongPlayer = {};


          var currentSong = null; 
          var currentBuzzObject = null;


          var setSong = function(song) {
            if (currentBuzzObject) {
              currentBuzzObject.stop();
              currentSong.playing = null;
            }
            // Set the current buzz object to be a new buzz sound object referencing the 'song' variable.
            currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
            });
         
            currentSong = song;
          };

          var playSong = function(song){
            currentBuzzObject.play(); 
            song.playing = true;
          };

          // Here we set a play method for our SongPlayer Object.
          SongPlayer.play = function(song) {
            if (currentSong !== song) {
              setSong(song);
              playSong(song);

            } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                playSong(song);
              }
            }     
					}; // End of SongPlayer.play method

          // Set a pause method for our SongPlayer Object.
          SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
          };

          // Return the SongPlayer Object
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();