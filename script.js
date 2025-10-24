// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');

  menuBtn?.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Active link highlight on click
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });

  // Current year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});


  // Pause other audio when one plays
  const players = Array.from(document.querySelectorAll('#beats audio'));
  players.forEach(p => p.addEventListener('play', () => {
    players.forEach(o => { if (o !== p) o.pause(); });
  }));


  // === Contact form -> Google Apps Script ===
  const contactForm = document.getElementById('contactForm');
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxq11dPxq9lElxzVGzUYoo-eKyKbMyEQpNg9jUvGcaBM5DLwto8aFPCIDdqdd7i6dGc/exec'; // <-- replace

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(contactForm);
    const payload = {
      name:    fd.get('name'),
      email:   fd.get('email'),
      subject: fd.get('subject'),
      message: fd.get('message'),
      userAgent: navigator.userAgent,
      page: location.href
    };

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',            // Apps Script returns opaque by default; keeps it simple
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Show success UI
      alert('Thanks! Your message has been sent.');
      contactForm.reset();
    } catch (err) {
      console.error(err);
      alert('Sorry, something went wrong. Please try again later.');
    }
  });
