
const createLoop = require('raf-loop');
const classes = require('element-class');

const query = require('./src/util/query');
const isMobile = require('./src/util/isMobile');
const createApp = require('./src/createApp');
const createCube = require('./src/components/cube');

// const createTubes = require('./src/components/createTubes');

const app = createApp({
  canvas: document.querySelector('#canvas'),
  alpha: true
});

const background = 'hsl(0, 0%, 100%)';
document.body.style.background = background;
app.renderer.setClearColor(0xffffff, 0);

setupCursor();
start();

function setupCursor () {
  const onMouseGrab = () => classes(app.canvas).add('grabbing');
  const onMouseUngrab = () => classes(app.canvas).remove('grabbing');
  app.canvas.addEventListener('mousedown', onMouseGrab, false);
  document.addEventListener('mouseup', onMouseUngrab, false);
  classes(app.canvas).add('grab');
}

function start () {
  // const line = createTubes(app);
  // app.scene.add(line.object3d);

  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  app.scene.add( light );
  // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  // app.scene.add( directionalLight );
  const cube = createCube(app);

  app.scene.add(cube)

  const skipFrames = query.skipFrames;
  let intervalTime = 0;

  // no context menu on mobile...
  if (isMobile) app.canvas.oncontextmenu = () => false;

  app.canvas.addEventListener('touchstart', tap);
  if (!isMobile) app.canvas.addEventListener('mousedown', tap);

  if (query.renderOnce) tick(0);
  else createLoop(tick).start();

  function tick (dt = 0) {
    intervalTime += dt;
    if (intervalTime > 1000 / 20) {
      intervalTime = 0;
    } else if (skipFrames) {
      return;
    }
    // line.update(dt);
    app.tick(dt);
    app.render();
  }

  function tap (ev) {
    // ev.preventDefault();
    // line.setPalette(palettes[paletteIndex++ % palettes.length]);
  }
}
