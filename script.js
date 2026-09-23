document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  function encodeForm(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  }

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      status.textContent = 'Sending...';
      status.className = 'form-status';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm(data)
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = 'Thanks — your message has been sent. We will get back to you shortly.';
            status.className = 'form-status form-status-success';
            form.reset();
          } else {
            throw new Error('Submission failed with status ' + response.status);
          }
        })
        .catch(function () {
          status.textContent = 'Sorry, something went wrong sending your message. Please email us directly at mannytechdesigns102015@gmail.com.';
          status.className = 'form-status form-status-error';
        });
    });
  }
});
