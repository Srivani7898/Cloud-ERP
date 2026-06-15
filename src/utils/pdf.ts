function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function safeFilename(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function employeeFileName(employeeName: string, documentName: string) {
  return `${safeFilename(employeeName)}-${safeFilename(documentName)}.pdf`;
}

export function downloadSimplePdf(filename: string, title: string, lines: string[]) {
  const graphics = [
    "q",
    "0.12 0.22 0.42 RG",
    "1.5 w",
    "32 32 548 728 re S",
    "0.90 0.95 1.00 rg",
    "42 710 528 44 re f",
    "0.12 0.22 0.42 RG",
    "1 w",
    "42 710 528 44 re S",
    "0.70 0.78 0.90 RG",
    "0.6 w",
    "42 78 528 620 re S",
    "42 104 528 0 re S",
    "Q"
  ].join("\n");

  const contentLines = [
    "BT",
    "0.08 0.16 0.30 rg",
    "/F1 16 Tf",
    `54 735 Td (${escapePdfText(title.toUpperCase())}) Tj`,
    "0.20 0.30 0.45 rg",
    "/F1 10 Tf",
    "0 -58 Td"
  ];

  lines.forEach((line) => {
    contentLines.push(`(${escapePdfText(line)}) Tj`);
    contentLines.push("0 -15 Td");
  });

  contentLines.push(
    "/F1 8 Tf",
    "0.36 0.42 0.52 rg",
    "0 -18 Td",
    "(Generated securely by Cloud ERP Employee Self-Service) Tj",
    "ET"
  );
  const stream = `${graphics}\n${contentLines.join("\n")}`;
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n",
    `5 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += object;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadCertificatePdf(filename: string, employeeName: string) {
  const text = (x: number, y: number, size: number, value: string) =>
    `BT /F1 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;
  const boldText = (x: number, y: number, size: number, value: string) =>
    `BT /F2 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;

  const content = [
    "q",
    "1 1 1 rg",
    "0 0 792 612 re f",
    "0.02 0.14 0.36 rg",
    "24 24 12 564 re f",
    "756 24 12 564 re f",
    "1.00 0.74 0.02 rg",
    "38 24 10 564 re f",
    "744 24 10 564 re f",
    "0.02 0.14 0.36 rg",
    "50 24 8 564 re f",
    "734 24 8 564 re f",
    "0.86 0.64 0.06 rg",
    "344 134 104 104 re f",
    "1.00 0.84 0.16 rg",
    "356 146 80 80 re f",
    "0.72 0.48 0.04 RG",
    "1.2 w",
    "356 146 80 80 re S",
    "Q",
    "0.02 0.14 0.36 rg",
    text(272, 528, 25, "Northstar Manufacturing"),
    "1.00 0.72 0.00 rg",
    boldText(222, 474, 28, "Certificate of Compliance"),
    "0.08 0.08 0.08 rg",
    boldText(338, 424, 8, "THIS IS TO ACKNOWLEDGE THAT"),
    "0.02 0.14 0.36 rg",
    boldText(306, 364, 22, employeeName),
    "0.08 0.08 0.08 rg",
    text(196, 326, 9, "Has completed all mandatory requirements and compliance training needed to"),
    text(184, 310, 9, "comply with enterprise ERP security, data privacy, and audit readiness procedures."),
    boldText(318, 270, 9, "Given this June 1, 2026"),
    "0.02 0.14 0.36 rg",
    text(144, 210, 24, "Priya D."),
    text(524, 210, 24, "Avery S."),
    "0.08 0.08 0.08 rg",
    text(118, 188, 8, "____________________________"),
    boldText(150, 174, 8, "Project Manager"),
    text(500, 188, 8, "____________________________"),
    boldText(552, 174, 8, "CEO"),
    "0.72 0.48 0.04 rg",
    boldText(384, 184, 10, "ERP"),
    boldText(378, 168, 9, "2026"),
    "0.08 0.08 0.08 rg",
    boldText(332, 62, 10, "cloud-erp.northstar.example")
  ].join("\n");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 792 612] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>\nendobj\n",
    "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>\nendobj\n",
    `5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += object;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export type PayslipPdfData = {
  employeeName: string;
  employeeCode: string;
  department: string;
  designation: string;
  month: string;
  payDate: string;
  gross: string;
  deductions: string;
  net: string;
  earnings: Array<[string, string]>;
  deductionsBreakup: Array<[string, string]>;
};

export function downloadPayslipPdf(filename: string, data: PayslipPdfData) {
  const text = (x: number, y: number, size: number, value: string) =>
    `BT /F1 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;
  const boldText = (x: number, y: number, size: number, value: string) =>
    `BT /F2 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;
  const line = (x1: number, y1: number, x2: number, y2: number) => `${x1} ${y1} m ${x2} ${y2} l S`;
  const rect = (x: number, y: number, w: number, h: number, fill = false) => `${x} ${y} ${w} ${h} re ${fill ? "f" : "S"}`;

  const rows = data.earnings.map((earning, index) => {
    const deduction = data.deductionsBreakup[index] ?? ["", ""];
    const y = 410 - index * 24;
    return [
      text(74, y, 9, earning[0]),
      text(202, y, 9, earning[1]),
      text(320, y, 9, deduction[0]),
      text(492, y, 9, deduction[1]),
      line(62, y - 9, 550, y - 9)
    ].join("\n");
  });

  const content = [
    "q",
    "0.97 0.98 1.00 rg",
    "0 0 612 792 re f",
    "0.18 0.35 0.70 RG",
    "1.5 w",
    rect(50, 70, 512, 660),
    "0.25 0.49 0.92 rg",
    rect(50, 690, 512, 40, true),
    "0.18 0.35 0.70 RG",
    rect(50, 690, 512, 40),
    "0.86 0.92 1.00 rg",
    rect(50, 642, 512, 28, true),
    rect(50, 560, 512, 28, true),
    rect(50, 442, 512, 28, true),
    "0.18 0.35 0.70 RG",
    rect(62, 600, 488, 42),
    line(306, 600, 306, 642),
    line(62, 621, 550, 621),
    rect(62, 470, 488, 90),
    line(306, 470, 306, 560),
    line(62, 530, 550, 530),
    line(62, 500, 550, 500),
    rect(62, 250, 488, 192),
    line(178, 250, 178, 442),
    line(278, 250, 278, 442),
    line(452, 250, 452, 442),
    "Q",
    "1 1 1 rg",
    boldText(242, 714, 17, "Salary Slip"),
    text(230, 699, 8, "Northstar Manufacturing Pvt Ltd"),
    "0.08 0.12 0.20 rg",
    boldText(230, 650, 10, "Company Information"),
    text(74, 626, 8, "Company Name"),
    boldText(180, 626, 8, "Northstar Manufacturing"),
    text(318, 626, 8, "Payslip Month"),
    boldText(430, 626, 8, data.month),
    text(74, 606, 8, "Pay Date"),
    boldText(180, 606, 8, data.payDate),
    text(318, 606, 8, "Employee Code"),
    boldText(430, 606, 8, data.employeeCode),
    boldText(232, 568, 10, "Employee Information"),
    text(74, 540, 8, "Employee Name"),
    boldText(180, 540, 8, data.employeeName),
    text(318, 540, 8, "Department"),
    boldText(430, 540, 8, data.department),
    text(74, 510, 8, "Designation"),
    boldText(180, 510, 8, data.designation),
    text(318, 510, 8, "Payment Mode"),
    boldText(430, 510, 8, "Bank Transfer"),
    text(74, 480, 8, "Location"),
    boldText(180, 480, 8, "Bengaluru"),
    text(318, 480, 8, "Currency"),
    boldText(430, 480, 8, "USD"),
    boldText(260, 450, 10, "Salary Details"),
    boldText(92, 426, 8, "Earnings"),
    boldText(204, 426, 8, "Amount"),
    boldText(340, 426, 8, "Deductions"),
    boldText(494, 426, 8, "Amount"),
    ...rows,
    line(62, 286, 550, 286),
    boldText(74, 268, 9, "Gross Earnings"),
    boldText(202, 268, 9, data.gross),
    boldText(320, 268, 9, "Total Deductions"),
    boldText(492, 268, 9, data.deductions),
    "0.88 0.94 1.00 rg",
    rect(62, 206, 488, 34, true),
    "0.18 0.35 0.70 RG",
    rect(62, 206, 488, 34),
    "0.08 0.12 0.20 rg",
    boldText(74, 218, 12, "Net Salary Paid"),
    boldText(450, 218, 12, data.net),
    text(74, 176, 8, "This is a system-generated salary slip from Cloud ERP Employee Self-Service."),
    text(74, 162, 8, "For payroll queries, contact payroll@northstar.example."),
    text(74, 126, 8, "Employee Signature"),
    line(74, 120, 188, 120),
    text(390, 126, 8, "Payroll Authorized"),
    line(390, 120, 520, 120)
  ].join("\n");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`,
    "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n"
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += object;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadComplianceCertificatePdf(filename: string, employeeName: string) {
  const content = `
1 1 1 rg
0 0 792 612 re f
0.02 0.14 0.36 rg
24 24 14 564 re f
754 24 14 564 re f
1 0.74 0.02 rg
40 24 10 564 re f
742 24 10 564 re f
0.02 0.14 0.36 rg
52 24 8 564 re f
732 24 8 564 re f
0.86 0.64 0.06 rg
344 134 104 104 re f
1 0.84 0.16 rg
356 146 80 80 re f
BT
0.02 0.14 0.36 rg
/F2 26 Tf
1 0 0 1 250 528 Tm
(Northstar Manufacturing) Tj
1 0.72 0 rg
/F2 30 Tf
1 0 0 1 218 474 Tm
(Certificate of Compliance) Tj
0.08 0.08 0.08 rg
/F2 9 Tf
1 0 0 1 334 424 Tm
(THIS IS TO ACKNOWLEDGE THAT) Tj
0.02 0.14 0.36 rg
/F2 24 Tf
1 0 0 1 302 364 Tm
(${escapePdfText(employeeName)}) Tj
0.08 0.08 0.08 rg
/F1 10 Tf
1 0 0 1 188 326 Tm
(Has completed all mandatory requirements and compliance training needed to) Tj
1 0 0 1 178 310 Tm
(comply with enterprise ERP security, data privacy, and audit readiness procedures.) Tj
/F2 10 Tf
1 0 0 1 318 270 Tm
(Given this June 1, 2026) Tj
0.02 0.14 0.36 rg
/F1 24 Tf
1 0 0 1 144 210 Tm
(Priya D.) Tj
1 0 0 1 524 210 Tm
(Avery S.) Tj
0.08 0.08 0.08 rg
/F1 8 Tf
1 0 0 1 118 188 Tm
(____________________________) Tj
1 0 0 1 500 188 Tm
(____________________________) Tj
/F2 8 Tf
1 0 0 1 150 174 Tm
(Project Manager) Tj
1 0 0 1 552 174 Tm
(CEO) Tj
0.72 0.48 0.04 rg
/F2 10 Tf
1 0 0 1 384 184 Tm
(ERP) Tj
1 0 0 1 378 168 Tm
(2026) Tj
0.08 0.08 0.08 rg
/F2 10 Tf
1 0 0 1 332 62 Tm
(cloud-erp.northstar.example) Tj
ET`;

  const pdf = buildPdf(
    "[0 0 792 612]",
    "<< /Font << /F1 4 0 R /F2 6 0 R >> >>",
    content
  );
  downloadPdf(filename, pdf);
}

function buildPdf(mediaBox: string, resources: string, content: string, extraObjects: string[] = []) {
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox ${mediaBox} /Resources ${resources} /Contents 5 0 R >>\nendobj\n`,
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`,
    "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    ...extraObjects
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += object;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function downloadPdf(filename: string, pdf: string) {
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadOfferLetterPdf(filename: string, employeeName: string) {
  const text = (x: number, y: number, size: number, value: string) =>
    `BT /F1 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;
  const bold = (x: number, y: number, size: number, value: string) =>
    `BT /F2 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;
  const line = (x1: number, y1: number, x2: number, y2: number) => `${x1} ${y1} m ${x2} ${y2} l S`;

  const content = [
    "q",
    "0.98 0.99 1.00 rg 0 0 612 792 re f",
    "0.10 0.33 0.75 rg 0 0 612 18 re f",
    "0.25 0.55 0.95 rg 472 690 88 88 re f",
    "0.98 0.78 0.18 rg 448 724 38 38 re f",
    "0.10 0.33 0.75 RG 1 w",
    line(54, 672, 558, 672),
    line(54, 106, 558, 106),
    "Q",
    bold(54, 724, 10, "Northstar Manufacturing"),
    text(54, 710, 8, "People Operations | Cloud ERP"),
    text(462, 660, 8, "Date: 2026-06-01"),
    text(54, 632, 9, `To ${employeeName},`),
    text(54, 616, 9, "Bengaluru, India"),
    bold(54, 580, 12, "Subject: Offer of Employment"),
    text(54, 548, 9, `Dear ${employeeName},`),
    text(54, 522, 9, "We are pleased to offer you employment with Northstar Manufacturing Pvt Ltd."),
    text(54, 506, 9, "Your role, compensation, benefits, and employment conditions are summarized below."),
    text(54, 480, 9, "Position: HR Business Partner"),
    text(54, 464, 9, "Department: People Operations"),
    text(54, 448, 9, "Work Location: Bengaluru"),
    text(54, 432, 9, "Joining Date: 2026-06-15"),
    text(54, 416, 9, "Employment Type: Full Time"),
    bold(54, 384, 10, "Key Terms"),
    text(72, 360, 9, "1. Annual compensation and payroll benefits will be processed through Cloud ERP Payroll."),
    text(72, 344, 9, "2. You will be eligible for leave, insurance, and retirement benefits as per company policy."),
    text(72, 328, 9, "3. You are required to comply with data privacy, ERP security, and code of conduct policies."),
    text(72, 312, 9, "4. This offer is subject to background verification and document submission."),
    text(54, 276, 9, "Please sign and return this letter to confirm your acceptance of the offer."),
    text(54, 240, 9, "Sincerely,"),
    bold(54, 222, 9, "Anika Rao"),
    text(54, 208, 9, "Head - People Operations"),
    text(54, 156, 8, "Accepted by Employee"),
    line(54, 148, 180, 148),
    text(360, 156, 8, "Date"),
    line(360, 148, 470, 148)
  ].join("\n");

  downloadPdf(filename, buildPdf("[0 0 612 792]", "<< /Font << /F1 4 0 R /F2 6 0 R >> >>", content));
}

export function downloadTaxDeclarationPdf(filename: string, employeeName: string) {
  const text = (x: number, y: number, size: number, value: string) =>
    `BT /F1 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;
  const bold = (x: number, y: number, size: number, value: string) =>
    `BT /F2 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`;
  const line = (x1: number, y1: number, x2: number, y2: number) => `${x1} ${y1} m ${x2} ${y2} l S`;
  const rect = (x: number, y: number, w: number, h: number) => `${x} ${y} ${w} ${h} re S`;

  const content = [
    "q",
    "1 1 1 rg 0 0 612 792 re f",
    "0 0 0 RG 0.8 w",
    rect(40, 42, 532, 708),
    rect(52, 604, 508, 92),
    rect(52, 394, 508, 188),
    rect(52, 236, 508, 132),
    rect(52, 108, 508, 92),
    line(52, 666, 560, 666),
    line(52, 636, 560, 636),
    line(52, 552, 560, 552),
    line(52, 522, 560, 522),
    line(52, 492, 560, 492),
    line(52, 462, 560, 462),
    line(52, 432, 560, 432),
    line(52, 338, 560, 338),
    line(52, 308, 560, 308),
    line(52, 278, 560, 278),
    line(230, 604, 230, 696),
    line(392, 604, 392, 696),
    line(230, 394, 230, 582),
    line(392, 394, 392, 582),
    line(230, 236, 230, 368),
    line(392, 236, 392, 368),
    "Q",
    bold(210, 724, 12, "TAX DECLARATION FORM"),
    text(224, 710, 8, "FOR EMPLOYEE INCOME TAX COMPUTATION"),
    text(54, 682, 8, `Employee Name: ${employeeName}`),
    text(244, 682, 8, "Employee Code: NS-1001"),
    text(408, 682, 8, "FY: 2026-2027"),
    text(54, 652, 8, "PAN / Tax ID: ERPNS1001T"),
    text(244, 652, 8, "Department: People Ops"),
    text(408, 652, 8, "Location: Bengaluru"),
    text(54, 622, 8, "Address: Northstar Employee Residence, Bengaluru, India"),
    bold(54, 566, 8, "DECLARED INVESTMENTS / EXEMPTIONS"),
    bold(70, 536, 8, "Section"),
    bold(248, 536, 8, "Description"),
    bold(414, 536, 8, "Amount"),
    text(70, 506, 8, "80C"),
    text(248, 506, 8, "Retirement Contributions"),
    text(414, 506, 8, "$3,200"),
    text(70, 476, 8, "80D"),
    text(248, 476, 8, "Health Insurance Premium"),
    text(414, 476, 8, "$1,200"),
    text(70, 446, 8, "HRA"),
    text(248, 446, 8, "House Rent Allowance"),
    text(414, 446, 8, "$4,800"),
    text(70, 416, 8, "STD"),
    text(248, 416, 8, "Standard Deduction"),
    text(414, 416, 8, "$1,500"),
    bold(54, 352, 8, "PAYROLL COMPUTATION SUMMARY"),
    text(70, 322, 8, "Gross Salary"),
    text(414, 322, 8, "$100,800"),
    text(70, 292, 8, "Total Declaration"),
    text(414, 292, 8, "$10,700"),
    text(70, 262, 8, "Estimated Taxable Income"),
    text(414, 262, 8, "$90,100"),
    bold(54, 184, 8, "EMPLOYEE DECLARATION"),
    text(70, 164, 8, "I hereby declare that the above information is true and correct."),
    text(70, 148, 8, "I agree to submit valid proofs before payroll year-end processing."),
    text(70, 126, 8, "Employee Signature: ____________________"),
    text(360, 126, 8, "Payroll Verified: ____________________")
  ].join("\n");

  downloadPdf(filename, buildPdf("[0 0 612 792]", "<< /Font << /F1 4 0 R /F2 6 0 R >> >>", content));
}
