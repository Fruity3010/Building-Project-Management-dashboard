const exportToXLS = () => {
    const transactions = JSON.parse(localStorage.getItem("contractsData")) || [];
  
    if (!transactions.length) {
      alert("No data available to export.");
      return;
    }
  
    const tableColumn = [
      "S/N",
      "Contract Ref",
      "ERGP Code",
      "Ref No",
      "Vol No",
      "Description",
      "Company Awarded",
      "Date Awarded",
      "Duration",
      "Completion (%)",
      "Status",
      "Contract Sum",
      "Amount Paid",
      "Balance",
      "Remarks",
    ];
  
    const tableRows = transactions.map((t, index) => `
      <tr>
        <td>${t.serialNumber || index + 1}</td>
        <td>${t.contractRefInfo || ""}</td>
        <td>${t.ergpCode || ""}</td>
        <td>${t.refNo || ""}</td>
        <td>${t.volNo || ""}</td>
        <td>${t.description || ""}</td>
        <td>${t.companyAwarded || ""}</td>
        <td>${t.dateAwarded || ""}</td>
        <td>${t.duration || ""}</td>
        <td>${t.levelOfCompletion || ""}</td>
        <td>${t.status || ""}</td>
        <td>${t.contractSum || ""}</td>
        <td>${t.amountPaid || ""}</td>
        <td>${t.balance || ""}</td>
        <td>${t.remarks || ""}</td>
      </tr>
    `).join('');
  
    const tableHtml = `
      <table border="1">
        <thead>
          <tr>${tableColumn.map(col => `<th>${col}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  
    const blob = new Blob(
      [`<html><head><meta charset="UTF-8"></head><body>${tableHtml}</body></html>`],
      { type: "application/vnd.ms-excel" }
    );
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `UBEC_Contracts_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  export default exportToXLS;
  