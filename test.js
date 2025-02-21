let g=[1,2,3,4,5,6,7,9,10,11,13,15,17,20,23,26,30,35,41,47,55,64,75,87,102,120,142,168,199,235,256],
    rb=[1,2,3,4,6,9,13,20,29,43,65,99,144,196,256];
let ig=0,irb=0;
let xg=[],xrb=[];
for(let i=0; i<256; i++){
  if(i<g[ig]) xg[i]=ig;
  else xg[i]=++ig;
  if(i<rb[irb]) xrb[i]=irb;
  else xrb[i]=++irb;
  console.log(i,xg[i],xrb[i]);
}
