import React, { useRef } from "react";
import { Modal, Button, Table } from "@themesberg/react-bootstrap";
import ProjectImageCarousel from "./projectCarousel";
const ProjectModal = ({ show, onHide, project }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write("<html><head><title>Print</title>");
    newWindow.document.write(
      "<style>table, th, td { border: 1px solid #000; border-collapse: collapse; padding: 8px; } th { background-color: #f2f2f2; }</style>"
    );
    newWindow.document.write("</head><body>");
    newWindow.document.write(printContents);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  if (!project) return null;

  return (
    <Modal as={Modal.Dialog} size="lg" centered show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title className="h6">Project Details</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={onHide} />
      </Modal.Header>

      <Modal.Body>
      {project.imageSrc && (
            <img
            src={project.imageSrc}
            alt="Project"
            className="print-hidden"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
           
          )}
           <ProjectImageCarousel/>
        <div ref={printRef}>

          
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Title</td><td>{project.title}</td></tr>
              <tr><td>Status</td><td>{project.statusTags?.join(", ")}</td></tr>
              <tr><td>Description</td><td>{project.description}</td></tr>
              <tr><td>Start Date</td><td>{project.startDate}</td></tr>
              <tr><td>End Date</td><td>{project.endDate}</td></tr>
              <tr><td>Progress</td><td>{project.progress}%</td></tr>
              <tr><td>Location</td><td>{project.location}</td></tr>
              <tr><td>Cost</td><td>{project.cost}</td></tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
