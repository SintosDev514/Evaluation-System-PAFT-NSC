import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportResponsesToPDF = (rows) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  doc.setFontSize(16);
  doc.text("PAFT-NSC Evaluation Responses", 40, 40);
  const headers = [["Name", "Event", "Type", "Mean", "Satisfaction", "Date"]];
  const data = rows.map((item) => [
    item.participantName || "Anonymous",
    item.eventTitle,
    item.participantType,
    item.meanRating.toFixed(2),
    item.satisfaction,
    new Date(item.createdAt).toLocaleDateString(),
  ]);
  doc.autoTable({ startY: 60, head: headers, body: data, theme: "grid" });
  doc.save("PAFT-NSC-Evaluations.pdf");
};
