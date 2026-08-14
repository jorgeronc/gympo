/* GymPo — lista de espera
 * Progressive enhancement sobre <form action="https://formspree.io/f/…">.
 * Sin JS, el formulario hace POST nativo a Formspree (fallback).
 * Con JS: validación, estado de carga, éxito en el sitio (sin recargar),
 * manejo de error y un flag en localStorage para no volver a mostrar el
 * formulario a quien ya se registró.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'gympo_waitlist';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function joined() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }
  function markJoined() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* modo privado: ignora */ }
  }

  function showSuccess(wrap) {
    var form = wrap.querySelector('.waitlist-form');
    var success = wrap.querySelector('.wl-success');
    var micro = wrap.querySelector('.wl-microcopy');
    var legal = wrap.querySelector('.wl-legal');
    if (form) form.hidden = true;
    if (micro) micro.hidden = true;
    if (legal) legal.hidden = true;
    if (success) success.hidden = false;
  }

  function showSuccessEverywhere() {
    var all = document.querySelectorAll('.waitlist');
    for (var i = 0; i < all.length; i++) showSuccess(all[i]);
  }

  function bindForm(wrap) {
    var form = wrap.querySelector('.waitlist-form');
    if (!form) return;
    var input = form.querySelector('.wl-input');
    var button = form.querySelector('.wl-btn');
    var error = form.querySelector('.wl-error');

    function setError(msg) {
      if (!error) return;
      error.textContent = msg || '';
      error.hidden = !msg;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      setError('');

      var email = (input.value || '').trim();
      if (!EMAIL_RE.test(email)) {
        setError('Escribe un correo válido, p. ej. tu@correo.com.');
        input.focus();
        return;
      }

      var originalText = button.textContent;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = 'Enviando…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          markJoined();
          showSuccessEverywhere();
          return;
        }
        return res.json().then(function (body) {
          var msg = body && body.errors && body.errors.length
            ? (body.errors[0].message || '') : '';
          throw new Error(msg || 'No pudimos registrarte. Inténtalo de nuevo.');
        }, function () {
          throw new Error('No pudimos registrarte. Inténtalo de nuevo.');
        });
      }).catch(function (err) {
        setError(err && err.message ? err.message : 'Hubo un problema de conexión. Inténtalo de nuevo.');
        button.disabled = false;
        button.removeAttribute('aria-busy');
        button.textContent = originalText;
      });
    });
  }

  function init() {
    var wraps = document.querySelectorAll('.waitlist');
    if (joined()) {
      for (var i = 0; i < wraps.length; i++) showSuccess(wraps[i]);
      return;
    }
    for (var j = 0; j < wraps.length; j++) bindForm(wraps[j]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
