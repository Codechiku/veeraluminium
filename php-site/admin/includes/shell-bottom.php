    </main>
  </div>
</div>
<div class="toast-wrap" id="toastWrap"></div>
<script>
/* toast */
window.toast = function (type, title, desc) {
  var wrap = document.getElementById("toastWrap"); if (!wrap) return;
  var t = document.createElement("div"); t.className = "toast " + (type || "");
  t.innerHTML = "<b>" + title + "</b>" + (desc ? "<span>" + desc + "</span>" : "");
  wrap.appendChild(t);
  setTimeout(function () { t.style.opacity = "0"; t.style.transition = "opacity .3s"; setTimeout(function () { t.remove(); }, 300); }, 3500);
};
/* sidebar + theme + logout */
var sb = document.getElementById("adminSidebar"), ov = document.getElementById("adminOverlay");
function openSb(o){ sb.classList.toggle("open", o); ov.classList.toggle("open", o); }
document.getElementById("sidebarOpen").addEventListener("click", function(){ openSb(true); });
document.getElementById("sidebarClose").addEventListener("click", function(){ openSb(false); });
ov.addEventListener("click", function(){ openSb(false); });
document.getElementById("adminTheme").addEventListener("click", function(){ var d=!document.documentElement.classList.contains("dark"); document.documentElement.classList.toggle("dark",d); try{localStorage.setItem("veer-theme",d?"dark":"light");}catch(e){} });
document.getElementById("logoutBtn").addEventListener("click", async function(){ await fetch("/api/logout.php",{method:"POST"}); location.href="/admin/login.php"; });
</script>
<?php if (!empty($admin_scripts)) echo $admin_scripts; ?>
</body>
</html>
