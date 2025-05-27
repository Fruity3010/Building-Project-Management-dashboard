import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import moment from "moment-timezone";
import { Alert } from "@themesberg/react-bootstrap";
import * as XLSX from "xlsx";

const DocumentUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          setError("The Excel file is empty");
          setIsLoading(false);
          return;
        }

        // Process and save the data
        processExcelData(jsonData);
      } catch (err) {
        setError("Error processing the file. Please check the format.");
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const processExcelData = (jsonData) => {
    try {
      const existingContracts = JSON.parse(localStorage.getItem("contractsData")) || [];
      let newContracts = [];

      jsonData.forEach((row, index) => {
        const serialNumber = existingContracts.length + index + 1;
        
        const newContract = {
          serialNumber,
          contractRefInfo: row.contractRef || row["Contract Reference"] || "",
          ergpCode: row.ergpCode || row["ERGP Code"] || "",
          refNo: row.refNo || row["Ref No"] || "",
          volNo: row.volNo || row["Volume No"] || "",
          description: row.description || row["Description"] || "",
          companyAwarded: row.companyAwarded || row["Company Awarded"] || "",
          contractSum: parseFloat(row.contractSum || row["Contract Sum"] || 0).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
          }),
          dateAwarded: row.dateAwarded 
            ? moment(row.dateAwarded).format("D MMMM, YYYY")
            : row["Date Awarded"]
            ? moment(row["Date Awarded"]).format("D MMMM, YYYY")
            : "",
          duration: row.contractDuration || row["Contract Duration"] || row.duration || "",
          levelOfCompletion: parseInt(row.levelOfCompletion || row["Level of Completion"] || 0, 10),
          status: row.status || "",
          remarks: row.remarks || "",
          amountPaid: parseFloat(row.amountPaid || row["Amount Paid"] || 0),
          balance: parseFloat(row.balance || 0),
        };

        newContracts.push(newContract);
      });

      const updatedContracts = [...existingContracts, ...newContracts];
      localStorage.setItem("contractsData", JSON.stringify(updatedContracts));

      setIsLoading(false);
      onUploadSuccess(newContracts.length);
    } catch (err) {
      setError("Error processing the data. Please check the file format.");
      setIsLoading(false);
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Bulk Upload Contracts</h5>
        <div className="mb-3">
          <Form.Label>Upload Excel File</Form.Label>
          <Form.Control 
            type="file" 
            accept=".xlsx,.xls" 
            onChange={handleFileChange} 
          />
          <Form.Text className="text-muted">
            Upload an Excel file with contract details. Ensure headers match the form fields.
          </Form.Text>
        </div>
        
        {error && (
          <Alert variant="danger" className="mt-2">
            {error}
          </Alert>
        )}
        
        <Button 
          variant="primary" 
          onClick={handleUpload}
          disabled={isLoading || !file}
        >
          {isLoading ? "Uploading..." : "Upload Contracts"}
        </Button>
      </Card.Body>
    </Card>
  );
};
export const ContractDetailsForm = () => {
  const [formData, setFormData] = useState({
    contractRef: "",
    ergpCode: "",
    refNo: "",
    volNo: "",
    description: "",
    companyAwarded: "",
    contractSum: "",
    dateAwarded: "",
    contractDuration: "",
    levelOfCompletion: "",
    amountPaid: "",
    balance: "",
    status: "",
    remarks: "",
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUploadSuccess = (count) => {
    setUploadCount(count);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };
  const existingContracts =
    JSON.parse(localStorage.getItem("contractsData")) || [];

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingContracts =
      JSON.parse(localStorage.getItem("contractsData")) || [];
    const Number = existingContracts.length + 1;

    const newContract = {
      serialNumber: Number,
      contractRefInfo: formData.contractRef,
      ergpCode: formData.ergpCode,
      refNo: formData.refNo,
      volNo: formData.volNo,
      description: formData.description,
      companyAwarded: formData.companyAwarded,
      contractSum: parseFloat(formData.contractSum).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      dateAwarded: moment(formData.dateAwarded).format("D MMMM, YYYY"),
      duration: formData.contractDuration,
      levelOfCompletion: parseInt(formData.levelOfCompletion, 10),
      status: formData.status,
      remarks: formData.remarks,
      amountPaid: parseFloat(formData.amountPaid),
      balance: parseFloat(formData.balance),
    };

    console.log("New contract object:", newContract.serialNumber);

    existingContracts.push(newContract);
    localStorage.setItem("contractsData", JSON.stringify(existingContracts));

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
    setFormData({
      contractRef: "",
      ergpCode: "",
      refNo: "",
      volNo: "",
      description: "",
      companyAwarded: "",
      contractSum: "",
      dateAwarded: "",
      contractDuration: "",
      levelOfCompletion: "",
      status: "",
      remarks: "",
      amountPaid: "",
      balance: "",
    });
  };

  return (
    <>
  <DocumentUploader onUploadSuccess={handleUploadSuccess} />
      
      {uploadSuccess && (
        <Alert variant="success" className="mb-4" onClose={() => setUploadSuccess(false)} dismissible>
          Successfully uploaded {uploadCount} contract(s)!
        </Alert>
      )}
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Project Details</h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="contractRef">
                <Form.Label>Contract Reference</Form.Label>
                <Form.Control
                  type="text"
                  name="contractRef"
                  placeholder="e.g. UBEC/DPROC/..."
                  value={formData.contractRef}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="ergpCode">
                <Form.Label>ERGP Code</Form.Label>
                <Form.Control
                  type="text"
                  name="ergpCode"
                  value={formData.ergpCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="refNo">
                <Form.Label>Ref No</Form.Label>
                <Form.Control
                  type="text"
                  name="refNo"
                  value={formData.refNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="volNo">
                <Form.Label>Volume No</Form.Label>
                <Form.Control
                  type="text"
                  name="volNo"
                  value={formData.volNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="dateAwarded">
                <Form.Label>Date Awarded</Form.Label>
                <Form.Control
                  type="date"
                  name="dateAwarded"
                  value={formData.dateAwarded}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" id="description">
            <Form.Label>Description of Project/Location</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              placeholder="Describe the project and location"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="companyAwarded">
                <Form.Label>Company Awarded</Form.Label>
                <Form.Control
                  type="text"
                  name="companyAwarded"
                  value={formData.companyAwarded}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="contractSum">
                <Form.Label>Contract Sum (₦)</Form.Label>
                <Form.Control
                  type="number"
                  name="contractSum"
                  placeholder="e.g. 17370000"
                  value={formData.contractSum}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="on hold">On Hold</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="contractDuration">
                <Form.Label>Contract Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="contractDuration"
                  placeholder="e.g. Twelve (12) weeks"
                  value={formData.contractDuration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="levelOfCompletion">
                <Form.Label>Level of Completion</Form.Label>
                <Form.Select
                  name="levelOfCompletion"
                  value={formData.levelOfCompletion}
                  onChange={handleChange}
                 
                >
                  <option value="">Select...</option>
                  {[...Array(10)].map((_, i) => {
                    const value = (i + 1) * 10;
                    return (
                      <option key={value} value={`${value}%`}>
                        {value}%
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Payment Details</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="amountPaid">
                <Form.Label>Amount Paid (₦)</Form.Label>
                <Form.Control
                  type="number"
                  name="amountPaid"
                  value={formData.amountPaid}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="balance">
                <Form.Label>Balance (₦)</Form.Label>
                <Form.Control
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" id="remarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="remarks"
              placeholder="Optional notes or remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Submit Contract
            </Button>
          </div>
        </Form>
        {showSuccess && (
          <div className="position-fixed top-0 w-50  end-0 z-index-500">
            <Alert
              variant="success"
              onClose={() => setShowSuccess(false)}
              dismissible
            >
              <div className="d-flex justify-content-between text-white align-items-center">
                <div>
                  <strong>Success!</strong> Contract submitted successfully.
                </div>
              </div>
            </Alert>
          </div>
        )}
      </Card.Body>
    </Card>  </>
  );
};
