// Tester feedback for Us. Answers go to the developer's Google Form
// ("Us tester feedback"): one readable report and one JSON record.
(function () {
  "use strict";

  var CONFIG = {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSciw3EitrMUulZld2mWPiwoHBvRdKFdZ_LuOAbObCfC81k7Tg/formResponse",
    reportEntry: "entry.398082709",
    dataEntry: "entry.967565751",
    // The TestFlight build this page was last updated for.
    build: "19",
    version: 1
  };

  var form = document.getElementById("feedback");
  if (!form) return;

  var page = document.documentElement.lang === "ja" ? "ja" : "en";
  var draftKey = "us-feedback-draft-" + page;
  var sendButton = document.getElementById("send");
  var status = document.getElementById("status");
  var thanks = document.getElementById("thanks");
  var again = document.getElementById("again");

  // Show a follow-up field only when an answer calls for it.
  function updateReveals() {
    var reveals = form.querySelectorAll("[data-reveal-for]");
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      var name = el.getAttribute("data-reveal-for");
      var values = el.getAttribute("data-reveal-values").split(" ");
      var checked = form.querySelector('input[name="' + name + '"]:checked');
      el.hidden = !(checked && values.indexOf(checked.value) !== -1);
    }
  }

  function saveDraft() {
    var draft = {};
    var fields = form.elements;
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (!f.name || f.name === "website") continue;
      if (f.type === "radio") {
        if (f.checked) draft[f.name] = f.value;
      } else if (f.value) {
        draft[f.name] = f.value;
      }
    }
    try { localStorage.setItem(draftKey, JSON.stringify(draft)); } catch (e) { /* private mode */ }
  }

  function loadDraft() {
    var draft = null;
    try { draft = JSON.parse(localStorage.getItem(draftKey) || "null"); } catch (e) { draft = null; }
    if (!draft) return;
    Object.keys(draft).forEach(function (name) {
      var fields = form.querySelectorAll('[name="' + name + '"]');
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (f.type === "radio") f.checked = f.value === draft[name];
        else f.value = draft[name];
      }
    });
  }

  function clearDraft() {
    try { localStorage.removeItem(draftKey); } catch (e) { /* private mode */ }
  }

  // The answers as codes, for counting.
  function collectData() {
    var data = { v: CONFIG.version, page: page, build: CONFIG.build, at: new Date().toISOString() };
    var fields = form.elements;
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (!f.name || f.name === "website") continue;
      if (f.closest("[hidden]")) continue;
      if (f.type === "radio") {
        if (f.checked) data[f.name] = f.value;
      } else {
        var text = f.value.trim();
        if (text) data[f.name] = text;
      }
    }
    return data;
  }

  // The same answers in the words the tester saw, one per line.
  function collectReport() {
    var lines = ["[" + page + " · build " + CONFIG.build + "]"];
    var groups = form.querySelectorAll("[data-field]");
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i];
      if (g.closest("[hidden]")) continue;
      var label = g.getAttribute("data-label");
      var answer = "";
      var checked = g.querySelector("input[type=radio]:checked");
      if (checked) {
        answer = checked.parentNode.textContent.trim();
      } else {
        var select = g.querySelector("select");
        var input = g.querySelector("textarea, input[type=text]");
        if (select && select.value) answer = select.options[select.selectedIndex].text;
        else if (input) answer = input.value.trim();
      }
      if (answer) lines.push(label + ": " + answer);
    }
    return lines.join("\n");
  }

  function setStatus(message, isError) {
    status.textContent = message;
    status.classList.toggle("error", !!isError);
  }

  form.addEventListener("change", function () {
    updateReveals();
    saveDraft();
    setStatus("", false);
  });
  form.addEventListener("input", saveDraft);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var reached = form.querySelector('input[name="reached"]:checked');
    if (!reached) {
      setStatus(status.getAttribute("data-need-reached"), true);
      var first = form.querySelector('input[name="reached"]');
      if (first) first.focus();
      return;
    }

    // Bots fill the hidden field; people never see it.
    if (form.elements.website && form.elements.website.value) {
      showThanks();
      return;
    }

    var body = new URLSearchParams();
    body.append(CONFIG.reportEntry, collectReport());
    body.append(CONFIG.dataEntry, JSON.stringify(collectData()));

    sendButton.disabled = true;
    setStatus(status.getAttribute("data-sending"), false);

    fetch(CONFIG.action, { method: "POST", mode: "no-cors", body: body })
      .then(function () {
        clearDraft();
        showThanks();
      })
      .catch(function () {
        sendButton.disabled = false;
        setStatus(status.getAttribute("data-failed"), true);
      });
  });

  function showThanks() {
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
    window.scrollTo(0, thanks.offsetTop - 16);
  }

  again.addEventListener("click", function () {
    form.reset();
    sendButton.disabled = false;
    setStatus("", false);
    updateReveals();
    thanks.hidden = true;
    form.hidden = false;
    window.scrollTo(0, form.offsetTop - 16);
  });

  loadDraft();
  updateReveals();
})();
