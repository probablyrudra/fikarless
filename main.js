// Contact form: paste a free Web3Forms access key here to receive submissions by email.
// While empty, the form runs in demo mode (validates, then shows the success message).
const KEY='';
const $=s=>document.querySelector(s);
$('#m')?.addEventListener('click',()=>$('#nv').classList.toggle('open'));
const f=$('#qf');
if(f){
  const p=new URLSearchParams(location.search).get('plan');if(p)f.plan.value=p;
  f.message.addEventListener('input',()=>$('#cnt').textContent=f.message.value.length+'/500');
  f.addEventListener('submit',async e=>{
    e.preventDefault();const out=$('#out');out.className='';out.textContent='';
    const d=Object.fromEntries(new FormData(f));if(d.website)return;
    const er=[],ph=d.phone.replace(/\D/g,'').slice(-10);
    if(d.name.trim().length<2)er.push('Enter your name.');
    if(!/^[6-9]\d{9}$/.test(ph))er.push('Enter a valid 10-digit mobile number.');
    if(d.email&&!/^\S+@\S+\.\S+$/.test(d.email))er.push('Enter a valid email address.');
    if(!d.consent)er.push('Tick the consent box to continue.');
    if(er.length){out.className='err';out.textContent=er.join(' ');return}
    const b=f.querySelector('button');b.disabled=true;b.textContent='Sending...';
    try{
      if(KEY){const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...d,phone:ph,access_key:KEY,subject:'New quote request - Insuarted'})});if(!(await r.json()).success)throw 0}
      else await new Promise(r=>setTimeout(r,700));
      f.reset();$('#cnt').textContent='0/500';out.className='ok';out.textContent='Request received. We will call you within one working day.'
    }catch{out.className='err';out.textContent='Could not send your request. Try again or call us.'}
    b.disabled=false;b.textContent='Request quote'
  });
}
