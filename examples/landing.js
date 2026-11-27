/* 落地页交互（纯原生，无框架） */
(function () {
  var root = document.documentElement;

  /* 主题切换 */
  var themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var dark = root.classList.toggle("dark");
      themeBtn.textContent = dark ? "☀️" : "🌙";
    });
  }

  /* 导航滚动态 */
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  /* 移动端菜单 */
  var menuBtn = document.getElementById("menuBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () { mobileMenu.hidden = !mobileMenu.hidden; });
    mobileMenu.addEventListener("click", function (e) { if (e.target.tagName === "A") mobileMenu.hidden = true; });
  }

  /* Tabs */
  var workflow = document.getElementById("workflowTabs");
  if (workflow) {
    var list = workflow.querySelector(".tabs__list");
    var indicator = workflow.querySelector(".tabs__indicator");
    var tabs = Array.prototype.slice.call(workflow.querySelectorAll(".tabs__tab"));
    var panels = Array.prototype.slice.call(workflow.querySelectorAll(".panel"));
    function moveIndicator() {
      var active = workflow.querySelector('.tabs__tab[aria-selected="true"]');
      if (active && indicator) {
        indicator.style.transform = "translateX(" + active.offsetLeft + "px)";
        indicator.style.width = active.offsetWidth + "px";
      }
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t, j) { t.setAttribute("aria-selected", j === i ? "true" : "false"); });
        panels.forEach(function (p, j) { p.hidden = j !== i; });
        moveIndicator();
      });
    });
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
  }

  /* 计费 SegmentedControl */
  var seg = document.getElementById("billingSeg");
  if (seg) {
    var items = Array.prototype.slice.call(seg.querySelectorAll(".seg__item"));
    var sInd = seg.querySelector(".seg__indicator");
    function moveSeg() {
      var active = seg.querySelector('.seg__item[aria-selected="true"]');
      if (active) {
        sInd.style.transform = "translateX(" + active.offsetLeft + "px)";
        sInd.style.width = active.offsetWidth + "px";
      }
    }
    items.forEach(function (it, i) {
      it.addEventListener("click", function () {
        items.forEach(function (t, j) { t.setAttribute("aria-selected", j === i ? "true" : "false"); });
        var mode = it.getAttribute("data-bill");
        seg.style.setProperty("--i", i);
        document.querySelectorAll(".amount").forEach(function (a) {
          a.textContent = "$" + a.getAttribute("data-" + mode);
        });
        moveSeg();
      });
    });
    moveSeg();
    window.addEventListener("resize", moveSeg);
  }

  /* Switch */
  document.querySelectorAll(".switch").forEach(function (sw) {
    sw.addEventListener("click", function () {
      var on = sw.getAttribute("data-on") === "true";
      sw.setAttribute("data-on", on ? "false" : "true");
      sw.setAttribute("aria-checked", on ? "false" : "true");
    });
  });

  /* 模态 */
  var modal = document.getElementById("demoModal");
  function openModal() { if (modal) { modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
    var em = document.getElementById("em"); if (em) setTimeout(function(){ em.focus(); }, 60); } }
  function closeModal() { if (modal) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); } }
  document.querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", openModal); });
  if (modal) {
    modal.addEventListener("click", function (e) { if (e.target === modal || e.target.hasAttribute("data-close")) closeModal(); });
    document.getElementById("submitDemo").addEventListener("click", function () {
      closeModal(); toast("success", "已提交", "我们会在 1 个工作日内联系你。");
    });
  }
  var demoBtn = document.getElementById("demoBtn");
  if (demoBtn) demoBtn.addEventListener("click", openModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* Toast */
  var region = document.getElementById("toastRegion");
  var ICONS = { info: "i", success: "✓", warning: "!", error: "✕" };
  function toast(type, title, message, duration) {
    if (!region) return;
    duration = duration || 3200;
    var el = document.createElement("div");
    el.className = "toast toast--" + (type || "info");
    el.setAttribute("role", "status");
    el.innerHTML = '<span class="toast__icon" aria-hidden>' + (ICONS[type] || "i") + '</span>' +
      '<div style="display:grid;gap:2px">' +
        (title ? '<span class="toast__title">' + title + '</span>' : '') +
        (message ? '<span class="toast__msg">' + message + '</span>' : '') +
      '</div>' +
      '<span class="toast__bar" style="animation-duration:' + duration + 'ms"></span>';
    region.appendChild(el);
    setTimeout(function () { el.classList.add("toast--leave"); }, Math.max(0, duration - 180));
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, duration);
  }
  var toastBtn = document.getElementById("toastBtn");
  if (toastBtn) toastBtn.addEventListener("click", function () { toast("success", "通知已送达", "这条消息来自液态玻璃 Toast。"); });
  var dockBell = document.getElementById("dockBell");
  if (dockBell) dockBell.addEventListener("click", function () { toast("info", "新通知", "你有 3 条未读消息。"); });

  /* Dock 选中态 */
  document.querySelectorAll(".dock__item").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".dock__item").forEach(function (x) { x.removeAttribute("aria-current"); });
      b.setAttribute("aria-current", "true");
    });
  });

  window.__toast = toast;
})();
