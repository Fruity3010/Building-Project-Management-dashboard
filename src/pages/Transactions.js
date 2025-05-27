import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup
} from '@themesberg/react-bootstrap';
import ViewModal from "../components/detailsModal";
import EditContractModal from "../components/EditContractModal"; // ← Add this
import { HoldTable, ProgressTable, TransactionsTable } from "../components/Tables";
import exportToPDF from "../utils/export";
import exportToXLS from "../utils/exportXls";

export default () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleEditTransaction = (transaction) => {
    // Make sure you're passing the complete transaction object
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedTransaction) => {
    const existing = JSON.parse(localStorage.getItem("contractsData")) || [];
    const updatedList = existing.map((t) =>
      t.serialNumber === updatedTransaction.serialNumber ? updatedTransaction : t
    );
    localStorage.setItem("contractsData", JSON.stringify(updatedList));
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Projects</h4>
          <p className="mb-0">All Projects in UBEC</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm" onClick={exportToXLS}>Export Spread Sheet</Button>
            <Button variant="outline-primary" size="sm" onClick={exportToPDF}>Export PDF</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </div>

      {/* View Modal */}
      <ViewModal
        show={showModal}
        onHide={() => setShowModal(false)}
        transaction={selectedTransaction}
      />

      {/* Edit Modal */}
      <EditContractModal
  show={isEditModalOpen}
  onHide={() => setIsEditModalOpen(false)}
  contractData={editingTransaction}  // Changed from transaction to contractData
  onUpdate={handleSaveEdit}          // Changed from onSave to onUpdate
/>

      <TransactionsTable
        onViewDetails={handleViewDetails}
        onEdit={handleEditTransaction}
      />

      <div className="mt-4 bg-white p-4">
        <h5> In Progress</h5>
        <ProgressTable />
      </div>
    </>
  );
};
