const $=s=>document.querySelector(s);
$('#m')?.addEventListener('click',()=>$('#nv').classList.toggle('open'));
// Call Us: open/closed status (Mon to Sat, 9:30 am to 7 pm IST). The #dm button flips the shown state for demos; remove #dm before launch.
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
// Email assist: builds the mailto link, and shows a copy-and-paste panel when the mail app does not open.
const mt=$('#mt');
if(mt){
  const MAIL='hello@insuarted.example',P=new URLSearchParams(location.search).get('service'),q=encodeURIComponent;
  const SUB=P?'Enquiry about the '+P+' service':'Enquiry about Insuarted services';
  const BODY=['Name:','Phone:','Device brand and model:','Purchase date:','Service of interest: '+(P||''),'Message:'].join('\n');
  const href='mailto:'+MAIL+'?subject='+q(SUB)+'&body='+q(BODY.split('\n').join('\r\n'));
  mt.href=href;
  $('#to').value=MAIL;$('#sj').value=SUB;$('#bd').value=BODY;
  $('#gm').href='https://mail.google.com/mail/?view=cm&fs=1&to='+q(MAIL)+'&su='+q(SUB)+'&body='+q(BODY);
  $('#ol').href='https://outlook.office.com/mail/deeplink/compose?to='+q(MAIL)+'&subject='+q(SUB)+'&body='+q(BODY);
  const ap=$('#ap'),show=()=>{ap.hidden=false;ap.scrollIntoView({behavior:'smooth',block:'center'})};
  $('#ea').onclick=show;
  let left=false;const mark=()=>{left=true};addEventListener('blur',mark);document.addEventListener('visibilitychange',mark);
  mt.addEventListener('click',()=>{left=false;setTimeout(()=>{if(!left)show()},1500)});
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=async()=>{
    const e=$(b.dataset.c),o=b.textContent;
    try{await navigator.clipboard.writeText(e.value)}catch{e.select();document.execCommand('copy')}
    b.textContent='Copied';setTimeout(()=>b.textContent=o,1500)});
}
