 (function() {
    //we add the Fixtures function as an argument to the Album controller
    function AlbumCtrl(Fixtures) {
     	this.albumData = Fixtures.getAlbum();

    }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
         //we add the fixtures factory as a dependency in the controller 
 })();