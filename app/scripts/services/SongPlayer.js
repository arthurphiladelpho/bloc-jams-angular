(function() {
    function SongPlayer(Fixtures) {
      // Create a SongPlayer object to be returned in the end of this constructor function.
      var SongPlayer = {};

      var currentAlbum = Fixtures.getAlbum();

      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
      };

      SongPlayer.currentSong = null;
      var currentBuzzObject = null;

      var playSong = function(song){
        currentBuzzObject.play(); 
        song.playing = true;
      };

      var stopSong = function(){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      };

      var setSong = function(song) {
        if (currentBuzzObject) {
          stopSong();
        }
        // Set the current buzz object to be a new buzz sound object referencing the 'song' variable.
        currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
        });

        SongPlayer.currentSong = song;
      };

      // Here we set a play method for our SongPlayer Object.
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
      }; // End of SongPlayer.play method

      // Set a pause method for our SongPlayer Object.
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
      };

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

      SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
        if (currentSongIndex >= currentAlbum.songs.length) {
          stopSong();
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
      };

      // Return the SongPlayer Object
      return SongPlayer;
  }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();