import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../assets/CustomFont.js'

function generatePdf(title, columns, parsedFields, saveLocal) {

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "letter"
  });
  
  doc.setFont("CustomFont", "normal") 
  doc.setFontSize(16).text(title, 0.5, 1.0);
  // create a line under heading 
  doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);

  autoTable(doc, {
    columns,
    body: parsedFields,
    margin: { left: 0.5, top: 1.25 },
    styles: {
      font: 'CustomFont',
    }
  });

  if (saveLocal == true) {
    doc.save(title);
  }

  var blob = doc.output("blob");

  return blob;
}

export { generatePdf };