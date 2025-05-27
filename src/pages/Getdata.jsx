import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card, Table, Row, Col, Container } from 'react-bootstrap';
import QRCode from 'react-qr-code';

const data = [
  {
    _id: '682af0bd81e07d20468cdc66',
    jeccid: '2406-001',
    cpusino: 'CX90728875',
    monitorsino: 'MMV0CSI001419012844HA1',
    keyboardsino: '2231SY07NSB8',
    mousesino: '2231SY07NSB8',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '6/27/2024',
    amcexpdata: '6/27/2027',
    brand: 'Finger',
    department: 'CSE',
    room: 'WAB216',
    spoc: 'Divya C R',
    status: 'Working',
    operatingsystems: 'Ubuntu',
    __v: 0,
  },
  // Added 10 fake data items:
  {
    _id: '1',
    jeccid: '2406-002',
    cpusino: 'CX90728876',
    monitorsino: 'MMV0CSI001419012844HA2',
    keyboardsino: '2231SY07NSB9',
    mousesino: '2231SY07NSB9',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '6/28/2024',
    amcexpdata: '6/28/2027',
    brand: 'Finger',
    department: 'EEE',
    room: 'WAB217',
    spoc: 'Ajay K',
    status: 'Working',
    operatingsystems: 'Windows',
    __v: 0,
  },
  {
    _id: '2',
    jeccid: '2406-003',
    cpusino: 'CX90728877',
    monitorsino: 'MMV0CSI001419012844HA3',
    keyboardsino: '2231SY07NSBA',
    mousesino: '2231SY07NSBA',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '6/29/2024',
    amcexpdata: '6/29/2027',
    brand: 'Dell',
    department: 'ECE',
    room: 'WAB218',
    spoc: 'Anita P',
    status: 'Working',
    operatingsystems: 'Ubuntu',
    __v: 0,
  },
  {
    _id: '3',
    jeccid: '2406-004',
    cpusino: 'CX90728878',
    monitorsino: 'MMV0CSI001419012844HA4',
    keyboardsino: '2231SY07NSBB',
    mousesino: '2231SY07NSBB',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '6/30/2024',
    amcexpdata: '6/30/2027',
    brand: 'HP',
    department: 'ME',
    room: 'WAB219',
    spoc: 'Rajesh M',
    status: 'Working',
    operatingsystems: 'Windows',
    __v: 0,
  },
  {
    _id: '4',
    jeccid: '2406-005',
    cpusino: 'CX90728879',
    monitorsino: 'MMV0CSI001419012844HA5',
    keyboardsino: '2231SY07NSBC',
    mousesino: '2231SY07NSBC',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '7/01/2024',
    amcexpdata: '7/01/2027',
    brand: 'Finger',
    department: 'Library',
    room: 'LIB101',
    spoc: 'Suman T',
    status: 'Working',
    operatingsystems: 'Ubuntu',
    __v: 0,
  },
  {
    _id: '5',
    jeccid: '2406-006',
    cpusino: 'CX90728880',
    monitorsino: 'MMV0CSI001419012844HA6',
    keyboardsino: '2231SY07NSBD',
    mousesino: '2231SY07NSBD',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '7/02/2024',
    amcexpdata: '7/02/2027',
    brand: 'Lenovo',
    department: 'CC',
    room: 'CC201',
    spoc: 'Manoj V',
    status: 'Working',
    operatingsystems: 'Windows',
    __v: 0,
  },
  {
    _id: '6',
    jeccid: '2406-007',
    cpusino: 'CX90728881',
    monitorsino: 'MMV0CSI001419012844HA7',
    keyboardsino: '2231SY07NSBE',
    mousesino: '2231SY07NSBE',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '7/03/2024',
    amcexpdata: '7/03/2027',
    brand: 'Finger',
    department: 'AD',
    room: 'AD301',
    spoc: 'Rita S',
    status: 'Working',
    operatingsystems: 'Ubuntu',
    __v: 0,
  },
  {
    _id: '7',
    jeccid: '2406-008',
    cpusino: 'CX90728882',
    monitorsino: 'MMV0CSI001419012844HA8',
    keyboardsino: '2231SY07NSBF',
    mousesino: '2231SY07NSBF',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '7/04/2024',
    amcexpdata: '7/04/2027',
    brand: 'Dell',
    department: 'CSE',
    room: 'WAB220',
    spoc: 'Divya C R',
    status: 'Working',
    operatingsystems: 'Windows',
    __v: 0,
  },
  {
    _id: '8',
    jeccid: '2406-009',
    cpusino: 'CX90728883',
    monitorsino: 'MMV0CSI001419012844HA9',
    keyboardsino: '2231SY07NSBG',
    mousesino: '2231SY07NSBG',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '7/05/2024',
    amcexpdata: '7/05/2027',
    brand: 'HP',
    department: 'EEE',
    room: 'WAB221',
    spoc: 'Ajay K',
    status: 'Working',
    operatingsystems: 'Ubuntu',
    __v: 0,
  },
  {
    _id: '9',
    jeccid: '2406-010',
    cpusino: 'CX90728884',
    monitorsino: 'MMV0CSI001419012844HA10',
    keyboardsino: '2231SY07NSBH',
    mousesino: '2231SY07NSBH',
    printersino: 'Na',
    locationid: '1',
    purchasedon: '7/06/2024',
    amcexpdata: '7/06/2027',
    brand: 'Finger',
    department: 'ECE',
    room: 'WAB222',
    spoc: 'Anita P',
    status: 'Working',
    operatingsystems: 'Windows',
    __v: 0,
  },
];
const departments = ['All', 'CSE', 'EEE', 'ECE', 'ME', 'Library', 'CC', 'AD'];

function Getdata() {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All');
  const [fromJECC, setFromJECC] = useState('');
  const [toJECC, setToJECC] = useState('');
  const [results, setResults] = useState(data);
  const printRef = useRef(null);

  // Helper to parse JECC number (right side of "2406-XXX")
  const parseJECCNum = (jeccid) => {
    const parts = jeccid.split('-');
    if (parts.length !== 2) return NaN;
    return parseInt(parts[1].replace(/^0+/, ''), 10);
  };

  // Filter data based on department, query text, and JECC range
  const filterData = () => {
    let filtered = [...data];

    if (dept !== 'All') {
      filtered = filtered.filter(item => item.department === dept);
    }

    if (query.trim() !== '') {
      const q = query.toLowerCase();
      filtered = filtered.filter(item =>
        item.jeccid.toLowerCase().includes(q) ||
        item.spoc.toLowerCase().includes(q) ||
        item.room.toLowerCase().includes(q)
      );
    }

    const fromNum = parseInt(fromJECC, 10);
    const toNum = parseInt(toJECC, 10);

    if (!isNaN(fromNum) && !isNaN(toNum)) {
      const start = Math.min(fromNum, toNum);
      const end = Math.max(fromNum, toNum);
      filtered = filtered.filter(item => {
        const num = parseJECCNum(item.jeccid);
        return !isNaN(num) && num >= start && num <= end;
      });
    } else if (!isNaN(fromNum)) {
      filtered = filtered.filter(item => {
        const num = parseJECCNum(item.jeccid);
        return !isNaN(num) && num >= fromNum;
      });
    } else if (!isNaN(toNum)) {
      filtered = filtered.filter(item => {
        const num = parseJECCNum(item.jeccid);
        return !isNaN(num) && num <= toNum;
      });
    }

    setResults(filtered);
  };

  useEffect(() => {
    filterData();
  }, [dept, query, fromJECC, toJECC]);

  const handleClear = () => {
    setQuery('');
    setDept('All');
    setFromJECC('');
    setToJECC('');
    setResults(data);
  };

  const handlePrint = () => {
    const printableArea = document.getElementById('printable-area');
    printableArea.style.display = 'grid';
    printableArea.style.position = 'relative';
    printableArea.style.left = '0';

    setTimeout(() => {
      window.print();
      printableArea.style.display = 'none';
      printableArea.style.position = 'absolute';
      printableArea.style.left = '-9999px';
    }, 500);
  };

  // Determine grid class for print layout
  const qrCount = results.length;
  const isSmallPage = qrCount > 0 && qrCount <= 8;

  return (
    <Container fluid className="p-3">
      <style>{`
        /* Responsive styles */

        .table-responsive {
          overflow-x: auto;
        }

        @media (max-width: 575.98px) {
          .filter-row > div {
            margin-bottom: 10px;
          }
        }

        input, select, button {
          font-size: 1rem;
        }

        @media (max-width: 767.98px) {
          table {
            font-size: 0.85rem;
          }
        }

        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area, #printable-area * {
            visibility: visible;
          }
          #printable-area.small-page {
            position: absolute;
            top: 0;
            left: 0;
            padding: 1cm;
            width: 21cm;
            height: auto;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: auto;
            gap: 10px;
            page-break-inside: avoid;
            background: white;
          }
          #printable-area.a4-page {
            position: absolute;
            top: 0;
            left: 0;
            padding: 1cm;
            width: 21cm;
            min-height: 29.7cm;
            display: grid !important;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: auto;
            gap: 10px;
            page-break-inside: avoid;
            background: white;
          }
          .qr-box {
            width: 120px !important;
            height: 140px !important;
            padding: 5px !important;
            margin-bottom: 0 !important;
            border-radius: 8px !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border: 1px solid #333;
          }
          .qr-box svg {
            width: 120px !important;
            height: 120px !important;
            margin: 0 !important;
          }
          .jeccid {
            font-weight: 600;
            font-size: 14px;
            margin-top: 4px;
            text-align: center;
            word-break: break-word;
          }
        }
      `}</style>

      <Row className="mb-3 filter-row">
        <Col xs={12} sm={6} md={3} lg={3}>
          <Form.Control
            placeholder="Search by JECC ID / SPOC / Room"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={6} md={2} lg={2}>
          <Form.Select value={dept} onChange={(e) => setDept(e.target.value)}>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={6} sm={6} md={2} lg={2}>
          <Form.Control
            placeholder="From JECC ID"
            value={fromJECC}
            onChange={(e) => setFromJECC(e.target.value.replace(/\D/g, ''))}
          />
        </Col>
        <Col xs={6} sm={6} md={2} lg={2}>
          <Form.Control
            placeholder="To JECC ID"
            value={toJECC}
            onChange={(e) => setToJECC(e.target.value.replace(/\D/g, ''))}
          />
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} className="d-flex justify-content-start justify-content-md-end gap-2 mt-2 mt-md-0">
          <Button variant="danger" onClick={handleClear}>Clear</Button>
          <Button variant="primary" onClick={handlePrint}>Print QR Codes</Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>JECC ID</th>
              <th>CPU Serial</th>
              <th>Monitor Serial</th>
              <th>Keyboard Serial</th>
              <th>Mouse Serial</th>
              <th>Department</th>
              <th>Room</th>
              <th>SPOC</th>
              <th>Status</th>
              <th>OS</th>
              <th>Purchase Date</th>
              <th>AMC Expiry</th>
            </tr>
          </thead>
          <tbody>
            {results.map(item => (
              <tr key={item._id}>
                <td>{item.jeccid}</td>
                <td>{item.cpusino}</td>
                <td>{item.monitorsino}</td>
                <td>{item.keyboardsino}</td>
                <td>{item.mousesino}</td>
                <td>{item.department}</td>
                <td>{item.room}</td>
                <td>{item.spoc}</td>
                <td>{item.status}</td>
                <td>{item.operatingsystems}</td>
                <td>{item.purchasedon}</td>
                <td>{item.amcexpdata}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Hidden printable QR code grid */}
      <div
        id="printable-area"
        style={{
          display: 'none',
          position: 'absolute',
          left: '-9999px',
          background: 'white',
          padding: '20px',
          zIndex: 1000,
          gridGap: '10px',
          gridTemplateColumns: isSmallPage ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gridAutoRows: 'auto',
        }}
        className={isSmallPage ? 'small-page' : 'a4-page'}
        ref={printRef}
      >
        {results.map(item => (
          <Card
            key={item.jeccid}
            className="qr-box text-center"
            style={{ borderRadius: '10px' }}
          >
            <QRCode
              value={JSON.stringify(item)}
              size={120}
              bgColor="white"
              fgColor="black"
              level="H"
              includeMargin={false}
            />
            <Card.Text className="jeccid mt-1">{item.jeccid}</Card.Text>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default Getdata;
