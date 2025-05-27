import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Routes } from "../routes";
import { ubeProjects, pageTraffic, pageRanking } from "../data/tables";

import commands from "../data/commands";
import Progress from "./Progress";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon
            icon={bounceIcon}
            className={`${bounceTxtColor} me-3`}
          />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Recent Projects</h5>
          </Col>
          <Col className="text-end">
           
            <Button
              as={Link}
              to={Routes.Transactions.path}
              variant="secondary"
              size="sm"
            >
              See all
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Project Type</th>
            <th scope="col">Location</th>
            <th scope="col">Company Awarded</th>
            <th scope="col">Duration</th>
            <th scope="col">Completion</th>
          </tr>
        </thead>
        <tbody>
          {ubeProjects.map((project) => {
            const completion = parseInt(project.levelOfCompletion);
            let variant = "primary";

            if (completion < 30) variant = "danger";
            else if (completion >= 80) variant = "success";

            return (
              <tr key={`project-${project.id}`}>
                <td>{project.projectType}</td>
                <td>{project.location}</td>
                <td>{project.companyAwarded}</td>
                <td>{project.duration}</td>
                <td>
                  <Progress
                    label="Progress"
                    variant={variant}
                    value={completion}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = ({ onViewDetails, onEdit }) => {
  const transactions = JSON.parse(localStorage.getItem("contractsData")) || [];

  const TableRow = (props) => {
    const {
      serialNumber,
      contractRefInfo,
      ergpCode,
      refNo,
      volNo,
      description,
      companyAwarded,
      dateAwarded,
      duration,
      levelOfCompletion,
      status,
      contractSum,
      amountPaid,
      balance,
      remarks,
    } = props;

    const normalizedStatus = _.toLower(status);

    const statusVariant =
      normalizedStatus === "completed"
        ? "success"
        : normalizedStatus === "in progress"
        ? "warning"
        : normalizedStatus === "on hold"
        ? "danger"
        : "secondary";

    const completion = parseInt(levelOfCompletion);
    return (
      <tr>
        <td>{serialNumber}</td>
        <td>{contractRefInfo}</td>
        <td>{ergpCode}</td>
        <td>{refNo}</td>
        <td>{volNo}</td>
        <td>{_.truncate(description, { length: 50 })}</td>
        <td>{companyAwarded}</td>
        <td>{dateAwarded}</td>
        <td>{duration}</td>
        <td>
          <Progress label="Progress" value={completion} />
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {_.startCase(normalizedStatus)}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onViewDetails(props)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onEdit(props)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Contract Ref</th>
              <th>ERGP Code</th>
              <th>Ref No</th>
              <th>Vol No</th>
              <th>Description</th>
              <th>Company Awarded</th>
              <th>Date Awarded</th>
              <th>Duration</th>
              <th>Completion</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <TableRow key={`transaction-${t.serialNumber}`} {...t} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const ProgressTable = ({ onViewDetails }) => {
  const transactions = JSON.parse(localStorage.getItem("contractsData")) || [];

  // Filter transactions with status "in progress"
  const inProgressTransactions = transactions.filter(
    (transaction) => _.toLower(transaction.status) === "in progress"
  );

  const TableRow = (props) => {
    const {
      serialNumber,
      contractRefInfo,
      ergpCode,
      refNo,
      volNo,
      description,
      companyAwarded,
      dateAwarded,
      duration,
      levelOfCompletion,
      status,
    } = props;

    const normalizedStatus = _.toLower(status);
    const statusVariant =
      normalizedStatus === "completed"
        ? "success"
        : normalizedStatus === "in progress"
        ? "warning"
        : normalizedStatus === "on hold"
        ? "danger"
        : "secondary";

    const completion = parseInt(levelOfCompletion);

    return (
      <tr>
        <td>{serialNumber}</td>
        <td>{contractRefInfo}</td>
        <td>{ergpCode}</td>
        <td>{refNo}</td>
        <td>{volNo}</td>
        <td>{_.truncate(description, { length: 50 })}</td>
        <td>{companyAwarded}</td>
        <td>{dateAwarded}</td>
        <td>{duration}</td>
        <td>
          <Progress label="Progress" value={completion} />
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {_.startCase(normalizedStatus)}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onViewDetails(props)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Contract Ref</th>
              <th>ERGP Code</th>
              <th>Ref No</th>
              <th>Vol No</th>
              <th>Description</th>
              <th>Company Awarded</th>
              <th>Date Awarded</th>
              <th>Duration</th>
              <th>Completion</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inProgressTransactions.map((t) => (
              <TableRow key={`transaction-${t.serialNumber}`} {...t} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
