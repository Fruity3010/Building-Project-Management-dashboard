import React, { useRef } from 'react';
import {
  Modal, Button, Table
} from '@themesberg/react-bootstrap';

const ViewModal = ({ show, onHide, transaction }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write('<html><head><title>Print</title>');
    newWindow.document.write('<style>table, th, td { border: 1px solid #000; border-collapse: collapse; padding: 8px; } th { background-color: #f2f2f2; }</style>');
    newWindow.document.write('</head><body>');
    newWindow.document.write(printContents);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  if (!transaction) return null;

  return (
    <Modal as={Modal.Dialog} size="lg" centered show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title className="h6">Contract Details</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <div ref={printRef}>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Contract Ref</td><td>{transaction.contractRefInfo}</td></tr>
              <tr><td>ERGP Code</td><td>{transaction.ergpCode}</td></tr>
              <tr><td>Ref No</td><td>{transaction.refNo}</td></tr>
              <tr><td>Vol No</td><td>{transaction.volNo}</td></tr>
              <tr><td>Description</td><td>{transaction.description}</td></tr>
              <tr><td>Company Awarded</td><td>{transaction.companyAwarded}</td></tr>
              <tr><td>Date Awarded</td><td>{transaction.dateAwarded}</td></tr>
              <tr><td>Duration</td><td>{transaction.duration}</td></tr>
              <tr><td>Level of Completion</td><td>{transaction.levelOfCompletion}%</td></tr>
              <tr><td>Status</td><td>{transaction.status}</td></tr>
              <tr><td>Amount Paid</td><td>{transaction.amountPaid}</td></tr>
              <tr><td>Balance</td><td>{transaction.balance}</td></tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePrint}>Print</Button>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
