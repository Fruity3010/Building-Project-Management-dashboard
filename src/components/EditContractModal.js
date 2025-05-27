import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "@themesberg/react-bootstrap";
import moment from "moment";

const EditContractModal = ({ show, onHide, contractData, onUpdate }) => {
  const [formData, setFormData] = useState({
    serialNumber: "",
    contractRefInfo: "",
    ergpCode: "",
    refNo: "",
    volNo: "",
    description: "",
    companyAwarded: "",
    contractSum: "",
    dateAwarded: "",
    duration: "",
    levelOfCompletion: 0,
    status: "",
    remarks: "",
    amountPaid: 0,
    balance: 0,
  });

  useEffect(() => {
    if (contractData) {
      setFormData({
        serialNumber: contractData.serialNumber || "",
        contractRefInfo: contractData.contractRefInfo || "",
        ergpCode: contractData.ergpCode || "",
        refNo: contractData.refNo || "",
        volNo: contractData.volNo || "",
        description: contractData.description || "",
        companyAwarded: contractData.companyAwarded || "",
        contractSum: contractData.contractSum || "",
        dateAwarded: contractData.dateAwarded
          ? moment(contractData.dateAwarded, "D MMMM, YYYY").format("YYYY-MM-DD")
          : "",
        duration: contractData.duration || "",
        levelOfCompletion: contractData.levelOfCompletion || 0,
        status: contractData.status || "",
        remarks: contractData.remarks || "",
        amountPaid: contractData.amountPaid || 0,
        balance: contractData.balance || 0,
      });
    }
  }, [contractData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContract = {
      ...formData,
      levelOfCompletion: parseInt(formData.levelOfCompletion, 10) || 0,
      contractSum: parseFloat(formData.contractSum).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      dateAwarded: moment(formData.dateAwarded).format("D MMMM, YYYY"),
      amountPaid: parseFloat(formData.amountPaid) || 0,
      balance: parseFloat(formData.balance) || 0,
    };

    const currentContracts = JSON.parse(localStorage.getItem("contractsData")) || [];

    const updatedContracts = currentContracts.map((contract) =>
      contract.serialNumber === updatedContract.serialNumber ? updatedContract : contract
    );

    localStorage.setItem("contractsData", JSON.stringify(updatedContracts));

    if (onUpdate) {
      onUpdate(updatedContract);
    }

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contract</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contract Ref</Form.Label>
                <Form.Control name="contractRefInfo" value={formData.contractRefInfo} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>ERGP Code</Form.Label>
                <Form.Control name="ergpCode" value={formData.ergpCode} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Ref No</Form.Label>
                <Form.Control name="refNo" value={formData.refNo} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Vol No</Form.Label>
                <Form.Control name="volNo" value={formData.volNo} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Company Awarded</Form.Label>
                <Form.Control name="companyAwarded" value={formData.companyAwarded} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contract Sum (₦)</Form.Label>
                <Form.Control name="contractSum" type="number" value={formData.contractSum} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date Awarded</Form.Label>
                <Form.Control name="dateAwarded" type="date" value={formData.dateAwarded} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contract Duration</Form.Label>
                <Form.Control name="duration" value={formData.duration} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="completed">Completed</option>
                  <option value="in progress">In Progress</option>
                  <option value="on hold">On Hold</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Level of Completion (%)</Form.Label>
                <Form.Control name="levelOfCompletion" type="number" value={formData.levelOfCompletion} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Amount Paid (₦)</Form.Label>
                <Form.Control name="amountPaid" type="number" value={formData.amountPaid} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Balance (₦)</Form.Label>
                <Form.Control name="balance" type="number" value={formData.balance} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Remarks</Form.Label>
                <Form.Control as="textarea" rows={2} name="remarks" value={formData.remarks} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditContractModal;
