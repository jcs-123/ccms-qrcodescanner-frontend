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
  // ... your other data items here (as in your original snippet)
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
