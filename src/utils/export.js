const exportToPDF = () => {
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

  const newWindow = window.open('', '', 'width=1200,height=900');
  newWindow.document.write(`
    <html>
      <head>
        <title>Print Contracts</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 12px;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #d9e1f2;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>UBEC Projects</h2>
        <table>
          <thead>
            <tr>${tableColumn.map(col => `<th>${col}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${transactions.map((t, index) => `
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
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `);
  newWindow.document.close();
  newWindow.focus();
  newWindow.print();
 
};

export default exportToPDF;
