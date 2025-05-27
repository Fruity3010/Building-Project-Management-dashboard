import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartBar,
  faClipboardCheck,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Form,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import ProjectCard from "../../components/ProjectCard";
import { CounterWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import projectsdata from "../../data/projects";
import ProjectModal from "../../components/projectModal";
export default () => {
  const projects = projectsdata;
  console.log(projects);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleView = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };
  // Extract unique status tags
  const allStatuses = Array.from(
    new Set(projects.flatMap((p) => p.statusTags))
  );
  const statusOptions = ["All", ...allStatuses];

  const filteredProjects =
    selectedStatus === "All"
      ? projects
      : projects.filter((project) =>
          project.statusTags.includes(selectedStatus)
        );
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <ButtonGroup>
          <Button variant="outline-primary" size="sm">
            Export report
          </Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Projects"
            title="308m"
            percentage={18.2}
            icon={faChartBar}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Completed "
            title="200m"
            percentage={28.4}
            icon={faClipboardCheck}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="On Hold"
            title="40k"
            percentage={28.4}
            icon={faClipboardCheck}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Amount"
            title="400B"
            percentage={28.4}
            icon={faClipboardCheck}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="mb-4">
          <Row>
            <Col className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} className="mb-4">
                  <div className="mb-3 px-4 d-flex justify-content-end">
                    <Form.Select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      style={{
                        maxWidth: "150px",
                        borderRadius: "0.375rem",
                        padding: "0.5rem",
                      }}
                    >
                      {statusOptions.map((status, idx) => (
                        <option key={idx} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <Row className="px-4">
                    {filteredProjects.map((project, index) => (
                      <Col
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        className="mb-4 d-flex"
                      >
                        <ProjectCard
                          {...project}
                          onView={() => handleView(project)}
                        />
                      </Col>
                    ))}
                  </Row>
                  <ProjectModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    project={selectedProject}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
