
module.exports = function createCube(app) {
  var geometry = new THREE.BoxGeometry( 1, 1, 1, 1 );
  var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );

  return cube;

}
