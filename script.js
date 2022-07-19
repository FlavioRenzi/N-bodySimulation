let renderer;
let camera;
let controls;

let scene = new THREE.Scene();


camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 2000);
camera.position.set(-10, 0, -10);

renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("viewport")
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000));
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

// white spotlight shining from the side, casting a shadow
let spotLight = new THREE.SpotLight(0xffffff, 2.5, 25, Math.PI / 6);
spotLight.position.set(0, 10, 0);
//scene.add(spotLight);

let gridHelper = new THREE.GridHelper(20, 20);
//scene.add(gridHelper);



const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );





var sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
var material_sphere = new THREE.MeshNormalMaterial();
var material_phantom = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
var sphereStart = new THREE.Mesh(sphere_geometry, material_sphere);
sphereStart.position.x = 0;
sphereStart.position.y = 0;
sphereStart.position.z = 0;


let phantom = new THREE.Mesh(sphere_geometry, material_phantom);
//scene.add(phantom);
let phantomAttractor = new Element(2, phantom);
phantomAttractor.setPosition(0, 0, 0);
phantomAttractor.setVelocity(0, 0, 0);
phantomAttractor.setAcceleration(0, 0, 0);



let geometries = [];
let attractor = [];
attractor.push(phantomAttractor);
for (let i = 0; i < 50; i++) {
  let sph = sphereStart.clone();
  scene.add(sph);
  let ob = new Element(2, sph);
  ob.setPosition(Math.random()*10, Math.random()*10, Math.random()*10);
  ob.setVelocity(0, 0, 0);
  ob.setAcceleration(0, 0, 0);
  geometries.push(sph);
  attractor.push(ob);
}


function attract(attractor){
  for (let i = 0; i < attractor.length; i++) {
    attractor[i].setAcceleration(0, 0, 0);
    for (let j = 0; j < attractor.length; j++) {
      if (i != j) {
        let distance = attractor[i].getPosition().distanceTo(attractor[j].getPosition());
        if (distance < -1 || distance > 1) {
          let force = new THREE.Vector3(0, 0, 0);
          force.subVectors( attractor[j].getPosition(),attractor[i].getPosition());
          force.normalize();
          force.multiplyScalar(attractor[i].mass * attractor[j].mass / (distance * distance));
          force.multiplyScalar(0.01/attractor[i].mass);
          attractor[i].setAcceleration(attractor[i].getAcceleration().x + force.x, attractor[i].getAcceleration().y + force.y, attractor[i].getAcceleration().z + force.z);
        }
      }
    }
    if (i != 0) {
      attractor[i].update();
    }
  }
}



///// end of example

const animate = (t) => {
    requestAnimationFrame(animate);


    controls.update();
    renderer.render(scene, camera);
    attract(attractor);
};

animate();



window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}