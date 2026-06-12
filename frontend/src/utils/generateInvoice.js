import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (bill) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AKASH CLOTHING STORE", 14, 20);

  doc.setFontSize(12);
  doc.text(`Customer: ${bill.customer_name}`, 14, 35);
  doc.text(`Bill ID: ${bill.id}`, 14, 45);

  autoTable(doc, {
    startY: 55,
    head: [["Product", "Qty", "Price"]],
    body: bill.items.map(item => [
      item.product_name,
      item.quantity,
      item.price
    ])
  });

  doc.text(
    `Total: ₹${bill.total_amount}`,
    14,
    doc.lastAutoTable.finalY + 20
  );

  doc.save(`invoice-${bill.id}.pdf`);
};