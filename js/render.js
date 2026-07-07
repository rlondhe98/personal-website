// ============================================================
// render.js — reads window.RESUME_DATA and renders the entire
// site dynamically. Edit js/resume-data.js only; this file
// does not need to be touched for content updates.
// ============================================================

(function () {
  var data = window.RESUME_DATA;
  if (!data) {
    console.error('RESUME_DATA not found. Check js/resume-data.js is loaded before render.js.');
    return;
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  /* ---------- Hero ---------- */
  var heroEyebrow = document.getElementById('heroEyebrow');
  if (heroEyebrow) heroEyebrow.textContent = data.title;

  var heroSub = document.getElementById('heroSub');
  if (heroSub && data.summary) heroSub.textContent = data.summary;

  var heroMeta = document.getElementById('heroMeta');
  if (heroMeta) {
    var metaParts = [data.location];
    var certNames = data.certifications.filter(function (c) { return c.featured; }).map(function (c) { return c.name.replace('Salesforce Certified ', ''); });
    certNames.slice(0, 2).forEach(function (name) { metaParts.push(name); });
    heroMeta.innerHTML = metaParts.map(function (part, i) {
      return (i > 0 ? '<span class="dot">\u2022</span>' : '') + '<span>' + part + '</span>';
    }).join('');
  }

  document.title = data.name + ' \u2014 ' + data.title;

  /* ---------- Experience timeline ---------- */
  var timelineContainer = document.getElementById('timelineContainer');
  if (timelineContainer) {
    data.experience.forEach(function (job) {
      var article = el('article', 'timeline-item reveal');
      var bulletsHtml = job.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('');
      article.innerHTML =
        '<div class="timeline-marker"><span></span></div>' +
        '<div class="timeline-content">' +
          '<div class="timeline-head">' +
            '<h3>' + job.role + '</h3>' +
            '<span class="timeline-date">' + job.dates + '</span>' +
          '</div>' +
          '<p class="timeline-org">' + job.company + ' \u00b7 ' + job.location + '</p>' +
          '<ul class="timeline-list">' + bulletsHtml + '</ul>' +
        '</div>';
      timelineContainer.appendChild(article);
    });
  }

  /* ---------- Impact / case studies ---------- */
  var caseGrid = document.getElementById('caseGrid');
  if (caseGrid && data.caseStudies) {
    data.caseStudies.forEach(function (cs) {
      var card = el('article', 'case-card reveal');
      card.innerHTML =
        '<span class="case-tag">' + cs.tag + '</span>' +
        '<div class="case-number"><span class="case-num" data-count="' + cs.value + '">0</span><span class="case-suffix">' + cs.suffix + '</span></div>' +
        '<p class="case-metric-label">' + cs.metricLabel + '</p>' +
        '<div class="case-body">' +
          '<p><strong>Problem:</strong> ' + cs.problem + '</p>' +
          '<p><strong>Approach:</strong> ' + cs.approach + '</p>' +
          '<p><strong>Result:</strong> ' + cs.result + '</p>' +
        '</div>';
      caseGrid.appendChild(card);
    });
  }

  /* ---------- Skills ---------- */
  var skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    data.skills.forEach(function (skill) {
      var chip = el('div', 'skill-chip', skill.name);
      chip.setAttribute('data-group', skill.group || 'core');
      skillsGrid.appendChild(chip);
    });
  }

  /* ---------- Certifications ---------- */
  var badgeRow = document.getElementById('badgeRow');
  var badgeChipRow = document.getElementById('badgeChipRow');
  var badgeSecondaryWrap = document.getElementById('badgeSecondaryWrap');

  if (badgeRow && data.certifications) {
    var featured = data.certifications.filter(function (c) { return c.featured; });
    var secondary = data.certifications.filter(function (c) { return !c.featured; });

    featured.forEach(function (cert) {
      var link = document.createElement('a');
      link.href = cert.verifyUrl || data.trailblazerUrl || '#';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'badge-card badge-featured';
      link.setAttribute('aria-label', cert.name + (cert.date ? ' \u2014 verified ' + cert.date : '') + ', view on Trailblazer profile');

      if (cert.badgeImage) {
        link.innerHTML =
          '<img src="' + cert.badgeImage + '" alt="' + cert.name + ' badge" width="120" height="120" loading="lazy" decoding="async">' +
          '<span class="badge-name">' + cert.name.replace('Salesforce Certified ', '') + '</span>' +
          (cert.date ? '<span class="badge-date">' + cert.date + '</span>' : '');
      } else {
        link.innerHTML =
          '<span class="badge-icon-svg" aria-hidden="true"><svg width="56" height="56" viewBox="0 0 56 56" fill="none">' +
            '<circle cx="28" cy="28" r="26" stroke="currentColor" stroke-width="1.6" opacity="0.3"/>' +
            '<path d="M28 10l5.5 11.2 12.4 1.8-9 8.8 2.1 12.3L28 38.4l-11 5.7 2.1-12.3-9-8.8 12.4-1.8z" fill="currentColor" opacity="0.16" stroke="currentColor" stroke-width="1.4"/>' +
          '</svg></span>' +
          '<span class="badge-name">' + cert.name + '</span>' +
          (cert.date ? '<span class="badge-date">' + cert.date + '</span>' : '');
      }
      badgeRow.appendChild(link);
    });

    if (secondary.length && badgeChipRow && badgeSecondaryWrap) {
      badgeSecondaryWrap.style.display = '';
      secondary.forEach(function (cert) {
        var chip = document.createElement('a');
        chip.href = cert.verifyUrl || data.trailblazerUrl || '#';
        chip.target = '_blank';
        chip.rel = 'noopener noreferrer';
        chip.className = 'badge-chip';
        chip.innerHTML =
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.5 7.2 16.9l.9-5.4-3.9-3.8 5.4-.8z"/></svg>' +
          cert.name;
        badgeChipRow.appendChild(chip);
      });
    }
  }

  /* ---------- Education ---------- */
  var educationList = document.getElementById('educationList');
  if (educationList && data.education) {
    data.education.forEach(function (edu) {
      var li = document.createElement('li');
      li.innerHTML =
        '<span>' + edu.degree + '<br><span class="muted">' + edu.school + (edu.detail ? ' \u00b7 ' + edu.detail : '') + '</span></span>' +
        '<time>' + edu.dates + '</time>';
      educationList.appendChild(li);
    });
  }

  /* ---------- Contact ---------- */
  var contactLinks = document.getElementById('contactLinks');
  if (contactLinks) {
    var linkDefs = [
      { label: 'Email', value: data.email, href: 'mailto:' + data.email },
      { label: 'Phone', value: data.phone, href: 'tel:' + (data.phone || '').replace(/\s+/g, '') },
      { label: 'LinkedIn', value: data.linkedin, href: data.linkedinUrl || ('https://' + data.linkedin) },
      { label: 'Trailblazer', value: data.trailblazer, href: data.trailblazerUrl || ('https://' + data.trailblazer) }
    ];
    linkDefs.forEach(function (def) {
      if (!def.value) return;
      var a = document.createElement('a');
      a.className = 'contact-link';
      a.href = def.href;
      if (def.label !== 'Email' && def.label !== 'Phone') {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = '<span class="contact-label">' + def.label + '</span><span class="contact-value">' + def.value + '</span>';
      contactLinks.appendChild(a);
    });
  }

  var tbLink = document.getElementById('trailblazerLink');
  if (tbLink) tbLink.href = data.trailblazerUrl || ('https://' + data.trailblazer);

  var footerEmail = document.getElementById('footerEmailLink');
  if (footerEmail) footerEmail.href = 'mailto:' + data.email;

  var footerLinkedin = document.getElementById('footerLinkedinLink');
  if (footerLinkedin) footerLinkedin.href = data.linkedinUrl || ('https://' + data.linkedin);

  var footerName = document.getElementById('footerName');
  if (footerName) footerName.textContent = data.name;
})();
