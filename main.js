const $=s=>document.querySelector(s);
$('#m')?.addEventListener('click',()=>$('#nv').classList.toggle('open'));
// Business line: open/closed status (Mon to Sat, 9:30 am to 7 pm IST). The #dm button flips the shown state for demos; remove #dm before launch.
const st=$('#st');
if(st){
  let flip=false;const D=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const upd=()=>{
    const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',weekday:'long',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    const g=t=>p.find(x=>x.type===t).value,i=D.indexOf(g('weekday')),h=(+g('hour'))%24+(+g('minute'))/60;
    const open=(i>0&&h>=9.5&&h<19)!==flip;let m;
    if(open)m='Open now, closes at 7 pm';
    else if(i>0&&h<9.5)m='Closed, opens today at 9:30 am';
    else{const n=(i+1)%7||1;m='Closed, opens '+(n===(i+1)%7&&n!==1?'tomorrow':D[n])+' at 9:30 am'}
    st.className='pill '+(open?'open':'closed');st.textContent=m;
    $('#dm').textContent=open?'Preview closed state':'Preview open state';
  };
  $('#dm').addEventListener('click',()=>{flip=!flip;upd()});
  upd();setInterval(upd,60000);
}
// Email: the user enters their full name, which goes into the subject. If the mail app does not open, a copy-and-paste panel appears.
const fn=$('#fn');
if(fn){
  const CH={claims:{to:'support@easyclaims.example',tag:'Claims and customer service',nm:'Easyclaims'},biz:{to:'hello@insuarted.example',tag:'Enquiry or complaint',nm:'Insuarted'}};
  const S=new URLSearchParams(location.search).get('service'),q=encodeURIComponent,ap=$('#ap'),err=$('#fe');
  const nm=()=>fn.value.trim();
  const body=()=>['Full name: '+nm(),'Phone:','Device brand and model:','Purchase date:','Service of interest: '+(S||''),'Message:'].join('\n');
  const sub=c=>CH[c].tag+': '+nm();
  const mail=c=>'mailto:'+CH[c].to+'?subject='+q(sub(c))+'&body='+q(body().split('\n').join('\r\n'));
  const links=()=>document.querySelectorAll('[data-ch]').forEach(a=>a.href=mail(a.dataset.ch));
  let cur='biz',left=false;
  const need=()=>{if(nm().length<2){err.textContent='Please enter your full name first. It goes into the email subject.';fn.focus();return true}err.textContent='';return false};
  const fill=c=>{cur=c;const t=CH[c].to,s=sub(c),b=body();$('#pn').textContent=CH[c].nm;$('#to').value=t;$('#sj').value=s;$('#bd').value=b;
    $('#gm').href='https://mail.google.com/mail/?view=cm&fs=1&to='+q(t)+'&su='+q(s)+'&body='+q(b);
    $('#ol').href='https://outlook.office.com/mail/deeplink/compose?to='+q(t)+'&subject='+q(s)+'&body='+q(b)};
  const show=c=>{if(need())return;fill(c);ap.hidden=false;ap.scrollIntoView({behavior:'smooth',block:'center'})};
  addEventListener('blur',()=>{left=true});document.addEventListener('visibilitychange',()=>{left=true});
  document.querySelectorAll('[data-ch]').forEach(a=>a.addEventListener('click',e=>{
    if(need()){e.preventDefault();return}
    left=false;setTimeout(()=>{if(!left)show(a.dataset.ch)},1500)}));
  document.querySelectorAll('[data-help]').forEach(b=>b.onclick=()=>show(b.dataset.help));
  fn.addEventListener('input',()=>{if(nm().length>1)err.textContent='';links();if(!ap.hidden)fill(cur)});
  links();
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=async()=>{
    const e=$(b.dataset.c),o=b.textContent;
    try{await navigator.clipboard.writeText(e.value)}catch{e.select();document.execCommand('copy')}
    b.textContent='Copied';setTimeout(()=>b.textContent=o,1500)});
}
