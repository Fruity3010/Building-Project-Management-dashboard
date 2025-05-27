import moment from "moment-timezone";

const contracts = [
  {
    serialNumber: 1,
    contractRefInfo: "UBEC/DPROC/76TH UTB/2023 CONST/CON/",
    ergpCode: "ERGP202300711",
    refNo: "1",
    volNo: "Vol.I/1",
    description: "CONSTRUCTION OF ONE (1) BLOCK OF TWO (2) CLASSROOMS AT SALTI PRIMARY SCHOOL, SALTI, NUMAN LGA, ADAMAWA STATE",
    companyAwarded: "ADEDIO CONCEPT LIMITED",
    contractSum: "17,370,000.00",
    dateAwarded: moment().subtract(60, "days").format("D MMMM, YYYY"),
    duration: "12 weeks",
    levelOfCompletion: 80,
    status: "In Progress"
  },
  {
    serialNumber: 2,
    contractRefInfo: "UBEC/DPROC/75TH UTB/2023 RENOV/REN/02",
    ergpCode: "ERGP202300655",
    refNo: "2",
    volNo: "Vol.II/3",
    description: "RENOVATION OF THREE (3) CLASSROOM BLOCKS AT CENTRAL PRIMARY SCHOOL, IBI LOCAL GOVT, TARABA STATE",
    companyAwarded: "ALPHATECH CONSTRUCTION NIG LTD",
    contractSum: "12,840,000.00",
    dateAwarded: moment().subtract(90, "days").format("D MMMM, YYYY"),
    duration: "8 weeks",
    levelOfCompletion: 100,
    status: "Completed"
  },
  {
    serialNumber: 3,
    contractRefInfo: "UBEC/DPROC/77TH UTB/2023 SUPPLY/SCH/003",
    ergpCode: "ERGP202300812",
    refNo: "3",
    volNo: "Vol.III/4",
    description: "SUPPLY OF STUDENT DESKS AND TEACHERS’ TABLES TO SCHOOLS IN ANAMBRA STATE",
    companyAwarded: "EDUFAST GLOBAL SERVICES",
    contractSum: "9,450,000.00",
    dateAwarded: moment().subtract(30, "days").format("D MMMM, YYYY"),
    duration: "6 weeks",
    levelOfCompletion: 45,
    status: "On Hold"
  },
  {
    serialNumber: 4,
    contractRefInfo: "UBEC/DPROC/74TH UTB/2023 WATER/DRILL/010",
    ergpCode: "ERGP202300345",
    refNo: "4",
    volNo: "Vol.IV/2",
    description: "DRILLING OF BOREHOLES IN 5 PRIMARY SCHOOLS ACROSS KANO STATE",
    companyAwarded: "AQUA SMART ENGINEERING LTD",
    contractSum: "14,200,000.00",
    dateAwarded: moment().subtract(80, "days").format("D MMMM, YYYY"),
    duration: "10 weeks",
    levelOfCompletion: 100,
    status: "Completed"
  },
  {
    serialNumber: 5,
    contractRefInfo: "UBEC/DPROC/76TH UTB/2023 FENCE/FNC/005",
    ergpCode: "ERGP202300789",
    refNo: "5",
    volNo: "Vol.V/5",
    description: "CONSTRUCTION OF PERIMETER FENCE AT LGA PRIMARY SCHOOL, ENUGU SOUTH",
    companyAwarded: "SAFEGUARD PROJECTS LTD",
    contractSum: "7,890,000.00",
    dateAwarded: moment().subtract(10, "days").format("D MMMM, YYYY"),
    duration: "4 weeks",
    levelOfCompletion: 10,
    status: "In Progress"
  }
];

// Save to localStorage
localStorage.setItem("contractsData", JSON.stringify(contracts));
