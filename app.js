const $ = id => document.getElementById(id);
let values = {boiler:68.4,top:72.1,mid:58.3,supply:46.8,ret:38.2,bottom:39.4};
let rangeHours = 6;
let chart;
const fmt = n => n.toFixed(1);
function updateReadings(){
  // Small deterministic-looking drift to make the demo feel alive.
  values.boiler += (Math.random()-.49)*.22;
  values.top += (Math.random()-.52)*.10;
  values.mid += (Math.random()-.52)*.08;
  values.supply += (Math.random()-.5)*.12;
  values.ret += (Math.random()-.5)*.10;
  values.bottom += (Math.random()-.5)*.07;
  $('boiler-temp').textContent=fmt(values.boiler);$('top-temp').textContent=fmt(values.top);$('mid-temp').textContent=fmt(values.mid);$('supply-temp').textContent=fmt(values.supply);$('return-temp').textContent=fmt(values.ret);
  $('sensor-boiler').textContent=fmt(values.boiler)+' °C';$('sensor-top').textContent=fmt(values.top)+' °C';$('sensor-mid').textContent=fmt(values.mid)+' °C';$('sensor-supply').textContent=fmt(values.supply)+' °C';$('sensor-return').textContent=fmt(values.ret)+' °C';
  $('svg-top').textContent=Math.round(values.top)+'°';$('svg-mid').textContent=Math.round(values.mid)+'°';$('svg-bottom').textContent=Math.round(values.bottom)+'°';$('chart-current').textContent=fmt(values.top)+' °C';
  $('updated').textContent=new Date().toLocaleTimeString('cs-CZ',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  drawChart();
}
function showPage(name){
 document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+name));
 document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.page===name));
 if(name==='charts') setTimeout(drawChart,50);
}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>showPage(t.dataset.page)));
document.querySelectorAll('.range').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.range').forEach(x=>x.classList.remove('active'));b.classList.add('active');rangeHours=+b.dataset.range;drawChart()}));
[['set-tank','set-tank-label'],['set-heat','set-heat-label'],['set-boiler','set-boiler-label']].forEach(([a,b])=>$(a).addEventListener('input',e=>$(b).textContent=e.target.value));
$('save-settings').addEventListener('click',()=>{
 const a=$('set-tank').value,b=$('set-heat').value,c=$('set-boiler').value;
 $('last-command').textContent=`Demo příkaz: akumulace ${a} °C, topení ${b} °C, minimum kotle ${c} °C. Stav: simulovaně potvrzeno.`;
 $('saved-msg').classList.add('show');setTimeout(()=>$('saved-msg').classList.remove('show'),3500);
});
function drawChart(){
 const canvas=$('temp-chart');if(!canvas||!canvas.getContext)return;
 const rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;
 canvas.width=Math.max(1,rect.width*dpr);canvas.height=Math.max(1,rect.height*dpr);
 const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
 const w=rect.width,h=rect.height,p={l:34,r:12,t:12,b:25},cw=w-p.l-p.r,ch=h-p.t-p.b;
 const min=20,max=90;
 ctx.font='9px DM Mono, monospace';ctx.textAlign='right';ctx.textBaseline='middle';
 [20,35,50,65,80].forEach(v=>{let y=p.t+(max-v)/(max-min)*ch;ctx.strokeStyle='#26394b';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(w-p.r,y);ctx.stroke();ctx.fillStyle='#7d91a3';ctx.fillText(v+'°',p.l-7,y)});
 const count=rangeHours*4+1;
 const series=[
  {base:65,amp:5,phase:1,color:'#ff9b4a',label:'Kotel'},
  {base:58,amp:13,phase:2,color:'#e9c46a',label:'Akumulace'},
  {base:42,amp:7,phase:4,color:'#57a9dc',label:'Radiátory'}
 ];
 series.forEach((s,si)=>{
   ctx.beginPath();
   for(let i=0;i<count;i++){
    let x=p.l+i/(count-1)*cw;
    let yval=s.base+s.amp*Math.sin(i/(count-1)*Math.PI*2+s.phase)+2*Math.sin(i*.7+si);
    if(i===count-1)yval=[values.boiler,values.top,values.supply][si];
    let y=p.t+(max-yval)/(max-min)*ch;
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
   }
   ctx.strokeStyle=s.color;ctx.lineWidth=2.2;ctx.lineJoin='round';ctx.stroke();
 });
 ctx.textAlign='center';ctx.textBaseline='top';ctx.fillStyle='#7d91a3';
 for(let i=0;i<=4;i++){let x=p.l+i/4*cw;ctx.fillText('-'+Math.round(rangeHours*(1-i/4))+' h',x,h-17)}
}
window.addEventListener('resize',()=>{if($('page-charts').classList.contains('active'))drawChart()});
updateReadings();setInterval(updateReadings,3500);

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) { window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{})); }
