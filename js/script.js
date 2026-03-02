const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 50) }, { passive: true });
const ham = document.getElementById('ham'), mob = document.getElementById('mob-menu');
ham.addEventListener('click', () => { const o = mob.classList.toggle('open'); ham.classList.toggle('open', o); ham.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : '' });
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mob.classList.remove('open'); ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '' }));
const srEls = document.querySelectorAll('.sr');
const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }) }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
srEls.forEach(el => io.observe(el));
document.querySelectorAll('#hero .sr').forEach((el, i) => { setTimeout(() => el.classList.add('in'), 120 + i * 130) });
const form = document.getElementById('cf'), fw = document.getElementById('fw'), succ = document.getElementById('form-success'), sbtn = document.getElementById('sbtn');
function setErr(id, eid, show) { const el = document.getElementById(id), msg = document.getElementById(eid); if (show) { el.classList.add('err'); msg.style.display = 'block' } else { el.classList.remove('err'); msg.style.display = 'none' } }
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = v => /^[\d\s\+\-\(\)]{7,16}$/.test(v.trim());
['nome', 'email', 'tel', 'msg'].forEach(id => {
    const map = { nome: 'e-nome', email: 'e-email', tel: 'e-tel', msg: 'e-msg' };
    document.getElementById(id).addEventListener('blur', function () {
        let inv = false;
        if (id === 'nome') inv = this.value.trim().length < 2;
        if (id === 'email') inv = !isEmail(this.value.trim());
        if (id === 'tel') inv = !isPhone(this.value);
        if (id === 'msg') inv = this.value.trim().length < 10;
        setErr(id, map[id], inv);
    });
});
form.addEventListener('submit', e => {
    e.preventDefault();
    const n = document.getElementById('nome').value.trim(), em = document.getElementById('email').value.trim(), t = document.getElementById('tel').value, m = document.getElementById('msg').value.trim(), pr = document.getElementById('priv').checked;
    let ok = true;
    if (n.length < 2) { setErr('nome', 'e-nome', true); ok = false } else setErr('nome', 'e-nome', false);
    if (!isEmail(em)) { setErr('email', 'e-email', true); ok = false } else setErr('email', 'e-email', false);
    if (!isPhone(t)) { setErr('tel', 'e-tel', true); ok = false } else setErr('tel', 'e-tel', false);
    if (m.length < 10) { setErr('msg', 'e-msg', true); ok = false } else setErr('msg', 'e-msg', false);
    const ep = document.getElementById('e-priv');
    if (!pr) { ep.style.display = 'block'; ok = false } else ep.style.display = 'none';
    if (!ok) { const f = form.querySelector('.err'); if (f) f.focus(); return }
    sbtn.disabled = true; sbtn.textContent = 'Invio in corso…';
    setTimeout(() => { fw.style.display = 'none'; succ.style.display = 'block'; succ.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 1100);
});