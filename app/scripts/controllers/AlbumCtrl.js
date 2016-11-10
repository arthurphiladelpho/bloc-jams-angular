 (function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
    		 console.log('hello');
    		 console.log(Fixtures.getAlbum());
         this.albumData = Fixtures.getAlbum(); 
         this.songPlayer = SongPlayer;
    }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl',['Fixtures', 'SongPlayer', AlbumCtrl]);

 })();