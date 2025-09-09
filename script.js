/* script.js */
/* 1) 
   2) 
   3) Smooth scrolling for anchor links
   4) Toggle sections for easier navigation
   5) Mobile nav toggle and back-to-top button
*/

document.addEventListener('DOMContentLoaded', function () {
  // 1) Last Modified - Last modified formatted and injected into #lastUpdated
  try {
    const lastModified = new Date(document.lastModified || Date.now());
    const formattedDate = lastModified.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const lastElem = document.getElementById("lastUpdated");
    if (lastElem) {
      lastElem.textContent = 'Site Last Updated: ' + formattedDate;
    }
  } catch (e) {
    console.warn("Error setting last modified:", e);
  }

  // 2) start clock - to update time each time
  startTime();

  // 3) for smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (ev) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // 4) Section toggles (hide and show sections)
  document.querySelectorAll('.toggle-section').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = document.querySelector(this.dataset.target);
      if (!target) return;
      const isHidden = target.style.display === 'none';
      target.style.display = isHidden ? '' : 'none';
      this.textContent = isHidden ? '▾' : '▸';
    });
  });

  // 5) nav toggle (hide and shwo)
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const links = document.querySelector('.nav-links');
      if (!links) return;
      const isVisible = links.style.display === 'flex';
      links.style.display = isVisible ? 'none' : 'flex';
    });
  }

  // 6) Back to top button function
  document.querySelectorAll('.toTop').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});



// Clock function to show current time in header
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = ((h + 11) % 12 + 1);
  const clockElem = document.getElementById('clock');
  if (clockElem) {
    clockElem.textContent = `${hour12}:${m}:${s} ${ampm}`;
  }
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}
