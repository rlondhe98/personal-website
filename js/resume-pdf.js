// ATS-friendly PDF generator.
// Design rules followed for ATS compatibility:
//  - Single column, no tables, no text boxes, no images/icons
//  - Standard font (Helvetica), left-aligned, no headers/footers with contact info
//  - Plain bullet points using hyphen, selectable text (no rendering as image)
//  - Clear section headings in ALL CAPS or bold, consistent structure
//  - No multi-column layout, no graphics, no colored text

function generateResumePDF() {
  var data = window.RESUME_DATA;
  if (!data || !window.jspdf) {
    console.error('Resume data or jsPDF not loaded.');
    return;
  }

  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF({ unit: 'pt', format: 'a4' });

  var pageWidth = doc.internal.pageSize.getWidth();
  var margin = 48;
  var maxWidth = pageWidth - margin * 2;
  var y = margin;
  var lineHeight = 14;

  function checkPageBreak(extra) {
    var pageHeight = doc.internal.pageSize.getHeight();
    if (y + extra > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function addText(text, opts) {
    opts = opts || {};
    var size = opts.size || 10;
    var style = opts.style || 'normal';
    var gap = opts.gap !== undefined ? opts.gap : lineHeight;
    var indent = opts.indent || 0;

    doc.setFont('helvetica', style);
    doc.setFontSize(size);

    var lines = doc.splitTextToSize(text, maxWidth - indent);
    lines.forEach(function (line) {
      checkPageBreak(gap);
      doc.text(line, margin + indent, y);
      y += gap;
    });
  }

  function addSpacer(h) { y += h; }

  function addSectionHeading(title) {
    addSpacer(6);
    checkPageBreak(20);
    doc.setDrawColor(20, 20, 20);
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
    addText(title.toUpperCase(), { size: 11, style: 'bold', gap: 14 });
    addSpacer(2);
  }

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(data.name, margin, y);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(data.title, margin, y);
  y += 16;

  var contactLine = [data.email, data.phone, data.location, data.linkedin].filter(Boolean).join('  |  ');
  addText(contactLine, { size: 9.5, gap: 12 });
  if (data.trailblazer) {
    addText(data.trailblazer, { size: 9.5, gap: 12 });
  }

  // Summary
  addSectionHeading('Professional Summary');
  addText(data.summary, { size: 10, gap: 13 });

  // Skills
  addSectionHeading('Skills');
  addText(data.skills.join(', '), { size: 10, gap: 13 });

  // Experience
  addSectionHeading('Professional Experience');
  data.experience.forEach(function (job, idx) {
    checkPageBreak(30);
    addText(job.role, { size: 11, style: 'bold', gap: 13 });
    addText(job.company + '  |  ' + job.location + '  |  ' + job.dates, { size: 9.5, style: 'italic', gap: 13 });
    addSpacer(2);
    job.bullets.forEach(function (bullet) {
      addText('-  ' + bullet, { size: 10, gap: 13, indent: 10 });
    });
    if (idx < data.experience.length - 1) addSpacer(8);
  });

  // Education
  addSectionHeading('Education');
  data.education.forEach(function (edu) {
    addText(edu.degree, { size: 10.5, style: 'bold', gap: 13 });
    var line2 = edu.school + (edu.dates ? '  |  ' + edu.dates : '');
    addText(line2, { size: 9.5, gap: 13 });
    if (edu.detail) addText(edu.detail, { size: 9.5, gap: 13 });
  });

  // Certifications
  addSectionHeading('Certifications');
  data.certifications.forEach(function (cert) {
    var line = cert.name + (cert.date ? '  -  ' + cert.date : '');
    addText('-  ' + line, { size: 10, gap: 13, indent: 10 });
  });

  var fileName = data.name.replace(/\s+/g, '_') + '_Resume.pdf';
  doc.save(fileName);
}

window.generateResumePDF = generateResumePDF;
