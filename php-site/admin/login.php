<?php
require_once __DIR__ . '/../includes/helpers.php';
if (get_session()) { header('Location: /admin/index.php'); exit; }
$from = $_GET['from'] ?? '/admin/index.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Portal · Veer Aluminium</title>
  <link rel="icon" href="/logo.png" type="image/png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link rel="stylesheet" href="/admin/admin.css">
  <script>(function(){try{var t=localStorage.getItem('veer-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();</script>
</head>
<body>
<div class="login-wrap">
  <div class="login-box">
    <div style="margin-bottom:2rem;display:flex;flex-direction:column;align-items:center;text-align:center">
      <a href="/index.php" class="logo"><img src="/logo.png" alt="Veer"><span class="word"><b>VEER</b><span>Aluminium</span></span></a>
      <h1 class="font-display" style="margin-top:1.5rem;font-size:1.5rem;font-weight:700">Admin Portal</h1>
      <p style="margin-top:.25rem;font-size:.875rem;color:hsl(var(--muted-foreground))">Sign in to manage your website</p>
    </div>
    <form id="loginForm" class="card shadow-premium" style="padding:1.5rem">
      <div style="display:grid;gap:1rem">
        <div class="field"><label for="email">Email</label><input id="email" type="email" placeholder="admin@veeraluminium.com" required autocomplete="email"></div>
        <div class="field"><label for="password">Password</label><input id="password" type="password" placeholder="••••••••" required autocomplete="current-password"></div>
        <p id="loginError" style="display:none;border-radius:.5rem;background:hsl(var(--destructive)/.1);padding:.5rem .75rem;font-size:.875rem;color:hsl(var(--destructive))"></p>
        <button type="submit" class="btn btn-gold btn-lg btn-block" id="loginBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Sign In
        </button>
      </div>
    </form>
    <p style="margin-top:1.5rem;display:flex;align-items:center;justify-content:center;gap:.4rem;font-size:.72rem;color:hsl(var(--muted-foreground))">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:.9rem;height:.9rem;color:hsl(var(--gold))"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM9 12l2 2 4-4"/></svg>
      Secured admin access · Veer Aluminium CMS
    </p>
  </div>
</div>
<script>
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  var err = document.getElementById("loginError"); err.style.display = "none";
  var btn = document.getElementById("loginBtn"); btn.disabled = true; btn.textContent = "Signing in...";
  try {
    var res = await fetch("/api/login.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: document.getElementById("email").value, password: document.getElementById("password").value }) });
    if (!res.ok) { var d = await res.json().catch(function(){return {};}); throw new Error(d.error || "Login failed"); }
    location.href = <?= json_encode($from) ?>;
  } catch (e2) {
    err.textContent = e2.message; err.style.display = "block";
    btn.disabled = false; btn.innerHTML = "Sign In";
  }
});
</script>
</body>
</html>
