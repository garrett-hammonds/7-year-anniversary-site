/* =========================================================================
   Garrett & Grace — progressive enhancement.
   The page is fully readable with JavaScript disabled; this only adds
   the staggered reveal animation and the STAGED contact-form experience.
   The form is a keepsake: it is never submitted to a server or endpoint.
   ========================================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Staged date form ---------------- */
  var form = document.getElementById("date-form");
  if (!form) return;

  var nameField = document.getElementById("field-name");
  var ideaField = document.getElementById("field-idea");
  var nameInput = document.getElementById("name");
  var ideaInput = document.getElementById("idea");
  var honeypot = document.getElementById("company");
  var submitBtn = document.getElementById("submit-btn");
  var btnLabel = submitBtn.querySelector(".btn__label");
  var success = document.getElementById("form-success");
  var successText = document.getElementById("success-text");

  function setInvalid(field, input, isInvalid) {
    field.classList.toggle("field--invalid", isInvalid);
    input.setAttribute("aria-invalid", isInvalid ? "true" : "false");
  }

  function validate() {
    var ok = true;
    var firstInvalid = null;

    var nameEmpty = nameInput.value.trim() === "";
    setInvalid(nameField, nameInput, nameEmpty);
    if (nameEmpty) { ok = false; firstInvalid = firstInvalid || nameInput; }

    var ideaEmpty = ideaInput.value === "";
    setInvalid(ideaField, ideaInput, ideaEmpty);
    if (ideaEmpty) { ok = false; firstInvalid = firstInvalid || ideaInput; }

    if (firstInvalid) { firstInvalid.focus(); }
    return ok;
  }

  // Clear a field's error as soon as the person corrects it.
  nameInput.addEventListener("input", function () {
    if (nameInput.value.trim() !== "") setInvalid(nameField, nameInput, false);
  });
  ideaInput.addEventListener("change", function () {
    if (ideaInput.value !== "") setInvalid(ideaField, ideaInput, false);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Staged form — nothing is ever sent.

    // Honeypot: a real person leaves this empty. If filled, pretend success.
    if (honeypot && honeypot.value !== "") { showSuccess(); return; }

    if (!validate()) return;

    // Mimic a brief send so the success state feels earned (Doherty threshold).
    submitBtn.setAttribute("aria-disabled", "true");
    submitBtn.disabled = true;
    var original = btnLabel.textContent;
    btnLabel.textContent = "Sending…";
    submitBtn.insertAdjacentHTML("beforeend", '<span class="btn__spinner" aria-hidden="true"></span>');

    window.setTimeout(function () {
      showSuccess();
      var spinner = submitBtn.querySelector(".btn__spinner");
      if (spinner) spinner.remove();
      btnLabel.textContent = original;
      submitBtn.disabled = false;
      submitBtn.removeAttribute("aria-disabled");
    }, prefersReduced ? 0 : 700);
  });

  function showSuccess() {
    var idea = ideaInput.value;
    var name = nameInput.value.trim();
    if (idea && name) {
      successText.textContent = name.split(" ")[0] + ", it is a date: " +
        idea.charAt(0).toLowerCase() + idea.slice(1) + ". Can’t wait. — Garrett";
    }
    success.hidden = false;
    form.reset();
    setInvalid(nameField, nameInput, false);
    setInvalid(ideaField, ideaInput, false);
    // Move focus to the confirmation so screen readers land on it.
    success.setAttribute("tabindex", "-1");
    success.focus();
  }
})();
