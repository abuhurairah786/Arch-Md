//By:  ABUHURAIRAH
//https://wa.me/923449412639

const childProcess = require('child_process');
const path = require('path');

function start() {
  const scriptPath = path.join(__dirname, 'main.js');
  const args = [...process.argv.slice(2)];
  console.log([process.argv[0], ...args].join('\n'));

  const child = childProcess.spawn(process.argv[0], [scriptPath, ...args], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });

  child.on('message', (message) => {
    if (message === 'reset') {
      console.log('Arch Wa Ai is restarting..');
      child.kill();
      start();
      delete child;
    }
  });

  child.on('exit', (code) => {
    console.error(`Exited with code: ${code}`);
    if (code === 0 || code === 1) {
      start();
    }
  });
}

start();
