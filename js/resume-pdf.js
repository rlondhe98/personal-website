// ============================================================
// resume-pdf.js — generates a downloadable PDF resume directly
// from window.RESUME_DATA (the same data that drives the site).
// No manual sync needed between site content and PDF content.
// ============================================================

function generateResumePDF() {
  var data = window.RESUME_DATA;
  if (!data || typeof window.jspdf === 'undefined') {
    console.error('jsPDF or RESUME_DATA not available.');
    return;
  }

  var { jsPDF } = window.jspdf;
  var doc = new jsPDF({ unit: 'pt', format: 'a4' });

  var pageWidth = doc.internal.pageSize.getWidth();
  var pageHeight = doc.internal.pageSize.getHeight();
  var margin = 48;
  var contentWidth = pageWidth - margin * 2;
  var y = margin;

  var colorPrimary = [1, 105, 111];
  var colorText = [40, 37, 29];
  var colorMuted = [122, 121, 116];
  var colorDivider = [220, 217, 213];

  function checkPageBreak(neededSpace) {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function setColor(rgb) { doc.setTextColor(rgb[0], rgb[1], rgb[2]); }

  function drawDivider() {
    doc.setDrawColor(colorDivider[0], colorDivider[1], colorDivider[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;
  }

  function sectionHeading(text) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    setColor(colorPrimary);
    doc.text(text.toUpperCase(), margin, y);
    y += 6;
    doc.setDrawColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.setLineWidth(1.2);
    doc.line(margin, y, margin + 28, y);
    y += 16;
  }

  /* ---------- Header ---------- */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  setColor(colorText);
  doc.text(data.name, margin, y);
  y += 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  setColor(colorPrimary);
  doc.text(data.title, margin, y);
  y += 18;

  doc.setFontSize(9.5);
  setColor(colorMuted);
  var contactLine = [data.email, data.phone, data.linkedin, data.location].filter(Boolean).join('   |   ');
  var contactLines = doc.splitTextToSize(contactLine, contentWidth);
  doc.text(contactLines, margin, y);
  y += contactLines.length * 12 + 10;

  drawDivider();

  /* ---------- Summary ---------- */
  if (data.summary) {
    sectionHeading('Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setColor(colorText);
    var summaryLines = doc.splitTextToSize(data.summary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 13 + 14;
  }

  /* ---------- Experience ---------- */
  sectionHeading('Experience');
  data.experience.forEach(function (job) {
    checkPageBreak(60);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setColor(colorText);
    doc.text(job.role, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setColor(colorMuted);
    var dateWidth = doc.getTextWidth(job.dates);
    doc.text(job.dates, pageWidth - margin - dateWidth, y);
    y += 14;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    setColor(colorMuted);
    doc.text(job.company + ' \u00b7 ' + job.location, margin, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.3);
    setColor(colorText);
    job.bullets.forEach(function (bullet) {
      var bulletLines = doc.splitTextToSize('\u2013 ' + bullet, contentWidth - 8);
      checkPageBreak(bulletLines.length * 11.5 + 4);
      doc.text(bulletLines, margin + 6, y);
      y += bulletLines.length * 11.5 + 3;
    });
    y += 10;
  });

  /* ---------- Skills ---------- */
  checkPageBreak(50);
  sectionHeading('Skills');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  setColor(colorText);
  var skillsText = data.skills.map(function (s) { return s.name; }).join('   \u00b7   ');
  var skillLines = doc.splitTextToSize(skillsText, contentWidth);
  checkPageBreak(skillLines.length * 13);
  doc.text(skillLines, margin, y);
  y += skillLines.length * 13 + 14;

  /* ---------- Certifications ---------- */
  checkPageBreak(50);
  sectionHeading('Certifications');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  data.certifications.forEach(function (cert) {
    checkPageBreak(14);
    setColor(colorText);
    doc.text('\u2022 ' + cert.name, margin, y);
    if (cert.date) {
      setColor(colorMuted);
      var w = doc.getTextWidth(cert.date);
      doc.text(cert.date, pageWidth - margin - w, y);
    }
    y += 14;
  });
  y += 6;

  /* ---------- Education ---------- */
  checkPageBreak(50);
  sectionHeading('Education');
  data.education.forEach(function (edu) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    setColor(colorText);
    doc.text(edu.degree, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    setColor(colorMuted);
    var edW = doc.getTextWidth(edu.dates);
    doc.text(edu.dates, pageWidth - margin - edW, y);
    y += 13;

    doc.setFontSize(9.3);
    setColor(colorMuted);
    doc.text(edu.school + (edu.detail ? ' \u00b7 ' + edu.detail : ''), margin, y);
    y += 20;
  });

  var fileName = data.name.replace(/\s+/g, '_') + '_Resume.pdf';
  doc.save(fileName);
}
