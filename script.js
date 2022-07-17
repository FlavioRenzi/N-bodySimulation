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
scene.add(spotLight);

let gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);



const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );





var sphere_geometry = new THREE.SphereGeometry(2, 128, 128);
var material_sphere = new THREE.MeshNormalMaterial();
var sphereStart = new THREE.Mesh(sphere_geometry, material_sphere);
sphereStart.position.x = 0;
sphereStart.position.y = 0;
sphereStart.position.z = 0;
scene.add(sphereStart);



///// end of example

const animate = (t) => {
    requestAnimationFrame(animate);

    //console.log(t);
    TWEEN.update();
    //window.requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
};

animate();



window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}