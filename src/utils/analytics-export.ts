import { downloadProjectPdf } from "@/utils/project-pdf";

export function downloadAnalyticsPdf(title: string, lines: string[]) {
  downloadProjectPdf(`${title}.pdf`.replaceAll(" ", "-").toLowerCase(), title, lines);
}

export function downloadAnalyticsCsv(fileName: string, rows: Array<Record<string, string | number>>) {
  const headers = Object.keys(rows[0] ?? {});
  const title = fileName.replace(/\.(csv|xls|xlsx)$/i, "").replaceAll("-", " ");
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      table { border-collapse: collapse; font-family: Arial, sans-serif; width: 100%; }
      caption { font-size: 18px; font-weight: 700; margin: 12px 0; text-align: left; }
      th { background: #1f4e79; color: #ffffff; font-weight: 700; }
      th, td { border: 1px solid #9ca3af; padding: 8px 10px; text-align: left; }
      tr:nth-child(even) td { background: #eef2ff; }
    </style>
  </head>
  <body>
    <table>
      <caption>${title}</caption>
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows.map((row) => `<tr>${headers.map((header) => `<td>${String(row[header] ?? "")}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  </body>
</html>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName.replace(/\.(csv|xlsx)$/i, ".xls").endsWith(".xls") ? fileName.replace(/\.(csv|xlsx)$/i, ".xls") : `${fileName}.xls`;
  anchor.click();
  URL.revokeObjectURL(url);
}
