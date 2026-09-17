import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const loader=document.getElementById('loader');
setTimeout(()=>{if(loader){loader.style.opacity='0';loader.style.pointerEvents='none';setTimeout(()=>loader.remove(),700)}},900);
const header=document.getElementById('header');
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>40),{passive:true});
const menu=document.getElementById('menu');const nav=document.getElementById('nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const canvas=document.getElementById('scene');
if(canvas){
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x15130f);
 const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);camera.position.set(7,3.1,11);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 const root=new THREE.Group();scene.add(root);
 const mat=(color,rough=.5,metal=0)=>new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal});
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(28,28),mat(0x514b42,.33));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;root.add(floor);
 const back=new THREE.Mesh(new THREE.BoxGeometry(24,7,.3),mat(0x211f1b,.65));back.position.set(0,3.5,-5);back.receiveShadow=true;root.add(back);
 const side=new THREE.Mesh(new THREE.BoxGeometry(.25,7,18),mat(0x1c1b18,.7));side.position.set(-9,3.5,2);root.add(side);
 const ceiling=new THREE.Mesh(new THREE.PlaneGeometry(24,18),mat(0x26231e,.8));ceiling.rotation.x=Math.PI/2;ceiling.position.y=7;root.add(ceiling);
 for(let i=-4;i<=4;i++){const fin=new THREE.Mesh(new THREE.BoxGeometry(.12,5.7,.45),mat(0x92784f,.32,.55));fin.position.set(i*1.7,2.85,-4.75);root.add(fin)}
 const feature=new THREE.Mesh(new THREE.BoxGeometry(5.8,3.8,.25),mat(0x3a3329,.65));feature.position.set(2.2,3.2,-4.55);root.add(feature);
 const logo=new THREE.Mesh(new THREE.BoxGeometry(2.2,.04,.04),mat(0xd0ad6d,.25,.8));logo.position.set(2.2,3.35,-4.38);root.add(logo);
 for(let i=-2;i<=2;i+=2){const base=new THREE.Mesh(new THREE.BoxGeometry(2.8,1.05,1.2),mat(0x2a2824,.32));base.position.set(i,.53,-.8);base.castShadow=true;root.add(base);const top=new THREE.Mesh(new THREE.BoxGeometry(2.9,.07,1.3),mat(0xb5aa99,.2,.15));top.position.set(i,1.08,-.8);top.castShadow=true;root.add(top);const glassBox=new THREE.Mesh(new THREE.BoxGeometry(2.45,.65,.95),new THREE.MeshPhysicalMaterial({color:0x7d968c,transparent:true,opacity:.2,roughness:.08,metalness:.05,transmission:.35,thickness:.2}));glassBox.position.set(i,1.43,-.8);root.add(glassBox)}
 const reception=new THREE.Mesh(new THREE.BoxGeometry(4.5,1.1,1.1),mat(0x2d2923,.3));reception.position.set(5.2,.55,2.1);reception.castShadow=true;root.add(reception);
 const receptionTop=new THREE.Mesh(new THREE.BoxGeometry(4.7,.07,1.2),mat(0xd1c5b1,.25));receptionTop.position.set(5.2,1.13,2.1);root.add(receptionTop);
 for(let x=-5;x<=5;x+=2.5){const light=new THREE.PointLight(0xffe7bc,7,8);light.position.set(x,6.5,-.2);root.add(light)}
 const key=new THREE.SpotLight(0xffdfad,70,25,Math.PI/5,.5,1);key.position.set(4,6,5);key.target.position.set(1,0,-2);key.castShadow=true;root.add(key,key.target);
 root.add(new THREE.HemisphereLight(0xfff2d8,0x1b201f,1.2));
 for(let i=0;i<5;i++){const stem=new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,1.8,8),mat(0x333b32,.8));stem.position.set(-7+i*.6,1.2,-3.9);root.add(stem);const leaf=new THREE.Mesh(new THREE.SphereGeometry(.18,10,6),mat(0x354337,.9));leaf.scale.set(.5,1.8,.5);leaf.position.set(-7+i*.6,2.1,-3.9);root.add(leaf)}
 const dust=new THREE.Group();for(let i=0;i<55;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.012,4,4),new THREE.MeshBasicMaterial({color:0xe0c18a,transparent:true,opacity:.18}));p.position.set((Math.random()-.5)*18,Math.random()*6,Math.random()*8-5);dust.add(p)}root.add(dust);
 let targetX=7,targetY=3.1,targetZ=11;
 function updateScene(){const max=Math.max(document.documentElement.scrollHeight-innerHeight,1);const p=Math.min(Math.max(scrollY/max,0),1);const local=Math.min(p*2.7,1);targetX=7-5.2*local;targetY=3.1+.6*Math.sin(local*Math.PI);targetZ=11-5.2*local;root.rotation.y=-.18*local}
 addEventListener('scroll',updateScene,{passive:true});
 addEventListener('mousemove',e=>{const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;targetX=(7-5.2*Math.min(scrollY/Math.max(document.documentElement.scrollHeight-innerHeight,1)*2.7,1))+nx*.35;targetY=(3.1)+ny*-.15},{passive:true});
 function animate(){requestAnimationFrame(animate);camera.position.x+=(targetX-camera.position.x)*.045;camera.position.y+=(targetY-camera.position.y)*.045;camera.position.z+=(targetZ-camera.position.z)*.045;camera.lookAt(0,2,-1.2);dust.rotation.y+=.00015;renderer.render(scene,camera)}
 addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8))});updateScene();animate();
}
const form=document.getElementById('contactForm');const note=document.getElementById('formNote');
form?.addEventListener('submit',e=>{e.preventDefault();note.textContent='Project brief captured. Connect your preferred email/CRM endpoint to activate submissions.';form.reset()});
