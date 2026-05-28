import * as XLSX from "xlsx";

export const exportResponsesToExcel = (rows) => {
  const worksheet = XLSX.utils.json_to_sheet(
    rows.map((item) => ({
      Name: item.participantName || "Anonymous",
      Event: item.eventTitle,
      Type: item.participantType,
      Mean: item.meanRating.toFixed(2),
      Satisfaction: item.satisfaction,
      Date: new Date(item.createdAt).toLocaleDateString(),
      Feedback: item.enjoyMost || "",
      Improvements: item.improvementSuggestions || "",
    })),
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
  XLSX.writeFile(workbook, "PAFT-NSC-Responses.xlsx");
};
