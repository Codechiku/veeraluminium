<?php global $SITE, $SERVICES, $telLink, $mailLink; $year = date('Y'); ?>
<footer class="footer">
  <div class="container">
    <div class="grid">
      <div class="brand">
        <a href="/index.php" class="logo">
          <img src="/logo.png" alt="<?= esc($SITE['name']) ?>">
          <span class="word"><b>VEER</b><span>Aluminium</span></span>
        </a>
        <p><?= esc($SITE['description']) ?></p>
        <div class="social">
          <a href="<?= esc($SITE['social']['facebook']) ?>" target="_blank" rel="noopener" aria-label="Facebook" style="background:#1877F2;color:#fff"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg></a>
          <a href="<?= esc($SITE['social']['instagram']) ?>" target="_blank" rel="noopener" aria-label="Instagram" style="background:linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);color:#fff"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="<?= esc($SITE['social']['youtube']) ?>" target="_blank" rel="noopener" aria-label="YouTube" style="background:#FF0000;color:#fff"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 8a3 3 0 0 0-2-2.7C18.3 5 12 5 12 5s-6.3 0-8 .3A3 3 0 0 0 2 8a31 31 0 0 0 0 8 3 3 0 0 0 2 2.7C5.7 19 12 19 12 19s6.3 0 8-.3A3 3 0 0 0 22 16a31 31 0 0 0 0-8z"/><path d="m10 15 5-3-5-3z" fill="currentColor"/></svg></a>
        </div>
      </div>

      <div class="col-3">
        <h3>Services</h3>
        <ul>
          <?php foreach (array_slice($SERVICES, 0, 7) as $s): ?>
            <li><a href="/index.php#services"><?= esc($s['title']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div class="col-2">
        <h3>Company</h3>
        <ul>
          <li><a href="/index.php#about">About</a></li>
          <li><a href="/projects.php">Projects</a></li>
          <li><a href="/estimate.php">Estimate</a></li>
          <li><a href="/index.php#testimonials">Testimonials</a></li>
          <li><a href="/contact.php">Contact</a></li>
          <li><a href="/admin/">Admin</a></li>
        </ul>
      </div>

      <div class="col-3">
        <h3>Get in Touch</h3>
        <ul class="contact">
          <li><?= icon('MapPin') ?><span><?= esc($SITE['address']['full']) ?></span></li>
          <li><?= icon('Phone') ?><a href="<?= esc($telLink) ?>"><?= esc($SITE['contact']['phone']) ?></a></li>
          <li><?= icon('Mail') ?><a href="<?= esc($mailLink) ?>"><?= esc($SITE['contact']['email']) ?></a></li>
        </ul>
        <div class="hours">
          <p><?= esc($SITE['hours']['weekdays']) ?></p>
          <p><?= esc($SITE['hours']['sunday']) ?></p>
        </div>
      </div>
    </div>

    <div class="bottom">
      <p>© <?= $year ?> <?= esc($SITE['legalName']) ?>. All rights reserved.</p>
      <p>Serving Palanpur &amp; Gujarat with precision engineering since <?= esc($SITE['established']) ?>.</p>
    </div>
  </div>
</footer>
