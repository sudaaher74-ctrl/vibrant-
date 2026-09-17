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
 const scene=new THREE.Scene();scene.background=new THREE.Color(0x12100d);scene.fog=new THREE.Fog(0x12100d,15,36);
 const camera=new THREE.PerspectiveCamera(40,innerWidth/innerHeight,.1,90);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
 const root=new THREE.Group();scene.add(root);
 const material=(hex,rough=.5,metal=0)=>new THREE.MeshStandardMaterial({color:hex,roughness:rough,metalness:metal});
 const glass=new THREE.MeshPhysicalMaterial({color:0x9fb6ae,transparent:true,opacity:.2,roughness:.05,metalness:.02,transmission:.48,thickness:.16});
 const brass=material(0xa9864d,.23,.78),dark=material(0x191816,.58),walnut=material(0x463126,.46),stone=material(0xb2a79a,.25,.06),lightMat=new THREE.MeshBasicMaterial({color:0xffe5bb});
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(34,34),material(0x625b50,.27,.04));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;root.add(floor);
 const back=new THREE.Mesh(new THREE.BoxGeometry(25,7,.32),material(0x26221e,.72));back.position.set(0,3.5,-6);back.receiveShadow=true;root.add(back);
 for(const x of [-11,11]){const wall=new THREE.Mesh(new THREE.BoxGeometry(.3,7,21),material(0x201e1a,.75));wall.position.set(x,3.5,1);root.add(wall)}
 const ceiling=new THREE.Mesh(new THREE.PlaneGeometry(25,21),material(0x24211d,.82));ceiling.rotation.x=Math.PI/2;ceiling.position.y=7;root.add(ceiling);
 for(let i=-6;i<=6;i++){const fin=new THREE.Mesh(new THREE.BoxGeometry(.1,6,.5),brass);fin.position.set(i*1.45,3,-5.7);root.add(fin)}
 const feature=new THREE.Mesh(new THREE.BoxGeometry(6,3.9,.25),walnut);feature.position.set(1.7,3.2,-5.55);root.add(feature);
 const featurePanel=new THREE.Mesh(new THREE.BoxGeometry(4.3,2.5,.07),material(0x211d19,.78));featurePanel.position.set(1.7,3.05,-5.39);root.add(featurePanel);
 const brandLine=new THREE.Mesh(new THREE.BoxGeometry(2.8,.035,.035),brass);brandLine.position.set(1.7,3.42,-5.29);root.add(brandLine);
 for(const x of [-4.5,-1.35,1.8]){
   const base=new THREE.Mesh(new THREE.BoxGeometry(2.7,1,1.25),dark);base.position.set(x,.5,-.8);base.castShadow=true;root.add(base);
   const top=new THREE.Mesh(new THREE.BoxGeometry(2.8,.08,1.34),stone);top.position.set(x,1.04,-.8);root.add(top);
   const box=new THREE.Mesh(new THREE.BoxGeometry(2.4,.78,.98),glass);box.position.set(x,1.45,-.8);root.add(box);
   const jewel=new THREE.Mesh(new THREE.CylinderGeometry(.15,.08,.035,24),brass);jewel.position.set(x,1.18,-.8);root.add(jewel);
 }
 for(const x of [-6,-3.5,-1,1.5,4,6.5]){
   const niche=new THREE.Mesh(new THREE.BoxGeometry(1.42,2.15,.1),material(0x302820,.7));niche.position.set(x,3.35,-5.34);root.add(niche);
   const shelf=new THREE.Mesh(new THREE.BoxGeometry(1.16,.045,.38),stone);shelf.position.set(x,2.65,-5.18);root.add(shelf);
   const nicheLight=new THREE.PointLight(0xffe7c3,1.25,3.3);nicheLight.position.set(x,4.15,-4.8);root.add(nicheLight);
 }
 const reception=new THREE.Mesh(new THREE.BoxGeometry(4.3,1.08,1.16),walnut);reception.position.set(5.2,.54,2.6);reception.castShadow=true;root.add(reception);
 const receptionTop=new THREE.Mesh(new THREE.BoxGeometry(4.42,.07,1.23),stone);receptionTop.position.set(5.2,1.1,2.6);root.add(receptionTop);
 for(const x of [3.9,6.5]){const seat=new THREE.Mesh(new THREE.BoxGeometry(.82,.76,.82),material(0x332b24,.78));seat.position.set(x,.38,4.25);seat.castShadow=true;root.add(seat);const seatBack=new THREE.Mesh(new THREE.BoxGeometry(.82,.72,.18),material(0x332b24,.78));seatBack.position.set(x,.85,4.58);root.add(seatBack)}
 for(const z of [-4,-1,2,5]){const beam=new THREE.Mesh(new THREE.BoxGeometry(17,.12,.12),dark);beam.position.set(0,6.75,z);root.add(beam);const strip=new THREE.Mesh(new THREE.BoxGeometry(11,.025,.035),lightMat);strip.position.set(-1.2,6.67,z);root.add(strip);const area=new THREE.RectAreaLight(0xffe5bb,6,11,.3);area.position.set(-1.2,6.55,z);root.add(area)}
 for(const x of [-4.5,-1.35,1.8]){const cable=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,1.15,8),dark);cable.position.set(x,6.05,-.8);root.add(cable);const pendant=new THREE.Mesh(new THREE.CylinderGeometry(.25,.4,.16,32),brass);pendant.position.set(x,5.48,-.8);root.add(pendant);const pl=new THREE.PointLight(0xffe1b0,5,5);pl.position.set(x,5.3,-.8);root.add(pl)}
 const key=new THREE.SpotLight(0xffdfb2,90,30,Math.PI/5.5,.55,1.4);key.position.set(5,6,6);key.target.position.set(0,1,-2);key.castShadow=true;root.add(key,key.target);
 root.add(new THREE.HemisphereLight(0xfff1d4,0x171a18,1.35));
 const rim=new THREE.DirectionalLight(0xd8e1df,1.4);rim.position.set(-7,6,3);rim.target.position.set(0,1,-2);root.add(rim,rim.target);
 for(let i=0;i<4;i++){const pot=new THREE.Mesh(new THREE.CylinderGeometry(.18,.24,.35,16),dark);pot.position.set(-7+i*.65,.18,-4.7);root.add(pot);for(let j=0;j<3;j++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),material(0x354437,.92));leaf.scale.set(.45,1.8,.5);leaf.position.set(-7+i*.65+(j-1)*.13,.75+(j%2)*.2,-4.7);root.add(leaf)}}
 const dust=new THREE.Group();for(let i=0;i<70;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.012,4,4),new THREE.MeshBasicMaterial({color:0xe0c18a,transparent:true,opacity:.14}));p.position.set((Math.random()-.5)*20,Math.random()*6.5,Math.random()*13-6);dust.add(p)}root.add(dust);
 let targetX=7,targetY=3.1,targetZ=11;let pointerX=0,pointerY=0;
 function progress(){return Math.min(Math.max(scrollY/Math.max(document.documentElement.scrollHeight-innerHeight,1),0),1)}
 function updateScene(){const p=progress();const local=Math.min(p*3.2,1);targetX=7-6.2*local;targetY=3.1+.5*Math.sin(local*Math.PI);targetZ=11-6.7*local;root.rotation.y=-.17*local;root.rotation.x=.012*Math.sin(local*Math.PI)}
 addEventListener('scroll',updateScene,{passive:true});
 addEventListener('mousemove',e=>{pointerX=e.clientX/innerWidth-.5;pointerY=e.clientY/innerHeight-.5},{passive:true});
 addEventListener('touchmove',e=>{const t=e.touches[0];if(t){pointerX=t.clientX/innerWidth-.5;pointerY=t.clientY/innerHeight-.5}},{passive:true});
 function animate(){requestAnimationFrame(animate);camera.position.x+=(targetX+pointerX*.35-camera.position.x)*.045;camera.position.y+=(targetY-pointerY*.16-camera.position.y)*.045;camera.position.z+=(targetZ-camera.position.z)*.045;camera.lookAt(0,2.25,-1.25);dust.rotation.y+=.00012;renderer.render(scene,camera)}
 addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8))});updateScene();animate();
}
const form=document.getElementById('contactForm');const note=document.getElementById('formNote');
form?.addEventListener('submit',e=>{e.preventDefault();note.textContent='Project brief captured — connect this form to your enquiry endpoint when ready.';form.reset()});