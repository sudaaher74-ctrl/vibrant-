import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const loader=document.getElementById('loader');
setTimeout(()=>{if(loader){loader.style.opacity='0';loader.style.pointerEvents='none';setTimeout(()=>loader.remove(),700)}},1100);

const header=document.getElementById('header');
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>40),{passive:true});
const menu=document.getElementById('menu');const nav=document.getElementById('nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const canvas=document.getElementById('scene');
if(canvas){
 const scene=new THREE.Scene();
 scene.background=new THREE.Color(0x12100d);
 scene.fog=new THREE.Fog(0x12100d,14,34);
 const camera=new THREE.PerspectiveCamera(39,innerWidth/innerHeight,.1,80);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;

 const root=new THREE.Group();scene.add(root);
 const color=(hex,rough=.5,metal=0)=>new THREE.MeshStandardMaterial({color:hex,roughness:rough,metalness:metal});
 const glass=new THREE.MeshPhysicalMaterial({color:0x9bb1aa,transparent:true,opacity:.2,roughness:.06,metalness:.02,transmission:.45,thickness:.18});
 const brass=color(0xa9864d,.24,.72), dark=color(0x1a1916,.62), walnut=color(0x4a3325,.48), stone=color(0xaaa093,.28,.08), warmWhite=0xffe5bb;

 const floor=new THREE.Mesh(new THREE.PlaneGeometry(32,32),color(0x625b50,.28,.04));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;root.add(floor);
 const rug=new THREE.Mesh(new THREE.PlaneGeometry(8.5,5.5),color(0x3a332b,.9));rug.rotation.x=-Math.PI/2;rug.position.set(-1.2,.012,1.3);root.add(rug);
 const back=new THREE.Mesh(new THREE.BoxGeometry(24,7,.32),color(0x26221e,.72));back.position.set(0,3.5,-6);back.receiveShadow=true;root.add(back);
 const leftWall=new THREE.Mesh(new THREE.BoxGeometry(.28,7,19),color(0x201e1a,.75));leftWall.position.set(-10,3.5,1);root.add(leftWall);
 const rightWall=new THREE.Mesh(new THREE.BoxGeometry(.28,7,19),color(0x201e1a,.75));rightWall.position.set(10,3.5,1);root.add(rightWall);
 const ceiling=new THREE.Mesh(new THREE.PlaneGeometry(24,20),color(0x24211d,.82));ceiling.rotation.x=Math.PI/2;ceiling.position.y=7;root.add(ceiling);

 // architectural wall rhythm
 for(let i=-5;i<=5;i++){
   const fin=new THREE.Mesh(new THREE.BoxGeometry(.11,6,.52),brass);fin.position.set(i*1.55,3,-5.7);root.add(fin);
 }
 const feature=new THREE.Mesh(new THREE.BoxGeometry(5.7,3.8,.24),walnut);feature.position.set(1.8,3.25,-5.55);root.add(feature);
 const featureInset=new THREE.Mesh(new THREE.BoxGeometry(3.9,2.3,.08),color(0x211d19,.75));featureInset.position.set(1.8,3.1,-5.39);root.add(featureInset);
 const wordmark=new THREE.Group();
 const wordBar=new THREE.Mesh(new THREE.BoxGeometry(2.7,.035,.035),brass);wordBar.position.set(1.8,3.45,-5.3);wordmark.add(wordBar);root.add(wordmark);

 // premium display islands
 for(const x of [-4.2,-1.1,2.0]){
   const plinth=new THREE.Mesh(new THREE.BoxGeometry(2.65,1.0,1.22),dark);plinth.position.set(x,.5,-.9);plinth.castShadow=true;root.add(plinth);
   const stoneTop=new THREE.Mesh(new THREE.BoxGeometry(2.74,.08,1.3),stone);stoneTop.position.set(x,1.04,-.9);stoneTop.castShadow=true;root.add(stoneTop);
   const glassBox=new THREE.Mesh(new THREE.BoxGeometry(2.34,.78,.96),glass);glassBox.position.set(x,1.45,-.9);root.add(glassBox);
   const inner=new THREE.Mesh(new THREE.BoxGeometry(.72,.04,.35),brass);inner.position.set(x,1.18,-.9);root.add(inner);
 }
 // wall display niches
 for(const x of [-5.8,-3.4,-1,1.4,3.8,6.2]){
   const niche=new THREE.Mesh(new THREE.BoxGeometry(1.45,2.15,.12),color(0x302820,.7));niche.position.set(x,3.35,-5.35);root.add(niche);
   const shelf=new THREE.Mesh(new THREE.BoxGeometry(1.18,.045,.42),stone);shelf.position.set(x,2.65,-5.18);root.add(shelf);
   const nicheLight=new THREE.PointLight(warmWhite,1.2,3.2);nicheLight.position.set(x,4.1,-4.85);root.add(nicheLight);
 }

 // reception + seating
 const reception=new THREE.Mesh(new THREE.BoxGeometry(4.2,1.08,1.15),walnut);reception.position.set(5.1,.54,2.55);reception.castShadow=true;root.add(reception);
 const receptionTop=new THREE.Mesh(new THREE.BoxGeometry(4.32,.07,1.22),stone);receptionTop.position.set(5.1,1.1,2.55);root.add(receptionTop);
 for(const x of [3.8,6.4]){
   const chair=new THREE.Mesh(new THREE.BoxGeometry(.82,.78,.82),color(0x332b24,.78));chair.position.set(x,.39,4.2);chair.castShadow=true;root.add(chair);
   const backChair=new THREE.Mesh(new THREE.BoxGeometry(.82,.72,.18),color(0x332b24,.78));backChair.position.set(x,.86,4.55);backChair.castShadow=true;root.add(backChair);
 }
 const tableTop=new THREE.Mesh(new THREE.CylinderGeometry(1.05,.95,.09,48),stone);tableTop.position.set(5.1,.9,4.1);root.add(tableTop);
 const tableBase=new THREE.Mesh(new THREE.CylinderGeometry(.08,.42,.86,24),brass);tableBase.position.set(5.1,.45,4.1);root.add(tableBase);

 // ceiling architecture + linear lighting
 for(const z of [-4,-1,2,5]){
   const beam=new THREE.Mesh(new THREE.BoxGeometry(17,.12,.12),dark);beam.position.set(0,6.75,z);root.add(beam);
   const strip=new THREE.Mesh(new THREE.BoxGeometry(11,.025,.035),new THREE.MeshBasicMaterial({color:warmWhite}));strip.position.set(-1.2,6.68,z);root.add(strip);
   const light=new THREE.RectAreaLight(warmWhite,7,11,.25);light.position.set(-1.2,6.62,z);light.rotation.x=0;root.add(light);
 }
 // pendant lights above islands
 for(const x of [-4.2,-1.1,2]){
   const cable=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,1.25,8),dark);cable.position.set(x,6.1,-.9);root.add(cable);
   const pendant=new THREE.Mesh(new THREE.CylinderGeometry(.26,.42,.16,32),brass);pendant.position.set(x,5.48,-.9);root.add(pendant);
   const pLight=new THREE.PointLight(warmWhite,5,5);pLight.position.set(x,5.35,-.9);root.add(pLight);
 }

 // soft architectural lights
 const key=new THREE.SpotLight(0xffdfb2,85,28,Math.PI/5.5,.55,1.4);key.position.set(5,6,6);key.target.position.set(0,1,-2);key.castShadow=true;root.add(key,key.target);
 const fill=new THREE.HemisphereLight(0xfff1d4,0x171a18,1.35);root.add(fill);
 const rim=new THREE.DirectionalLight(0xd8e1df,1.5);rim.position.set(-7,6,3);rim.target.position.set(0,1,-2);root.add(rim,rim.target);

 // restrained greenery for realism
 for(let i=0;i<5;i++){
   const stem=new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,1.5,8),color(0x30382d,.9));stem.position.set(-8+i*.45,1,-4.9);root.add(stem);
   const leaf=new THREE.Mesh(new THREE.SphereGeometry(.2,10,7),color(0x354437,.92));leaf.scale.set(.45,1.7,.5);leaf.position.set(-8+i*.45,1.9,-4.9);root.add(leaf);
 }

 let target={x:7,y:3.1,z:11};
 let pointer={x:0,y:0};
 function scrollProgress(){return Math.min(Math.max(scrollY/Math.max(document.documentElement.scrollHeight-innerHeight,1),0),1)}
 function updateScene(){
   const p=scrollProgress();
   const local=Math.min(p*3.1,1);
   target.x=7-6.2*local;
   target.y=3.15+.42*Math.sin(local*Math.PI);
   target.z=11-6.8*local;
   root.rotation.y=-.16*local;
 }
 addEventListener('scroll',updateScene,{passive:true});
 addEventListener('mousemove',e=>{pointer.x=e.clientX/innerWidth-.5;pointer.y=e.clientY/innerHeight-.5},{passive:true});
 function animate(){requestAnimationFrame(animate);camera.position.x+=(target.x+pointer.x*.28-camera.position.x)*.045;camera.position.y+=(target.y-pointer.y*.12-camera.position.y)*.045;camera.position.z+=(target.z-camera.position.z)*.045;camera.lookAt(0,2.25,-1.3);renderer.render(scene,camera)}
 addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7))});
 updateScene();animate();
}

const form=document.getElementById('contactForm');const note=document.getElementById('formNote');
form?.addEventListener('submit',e=>{e.preventDefault();note.textContent='Thanks — your project brief is ready to connect to the Brand Kettle enquiry inbox.';form.reset()});