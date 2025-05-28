import React, { useState, useEffect, useMemo } from 'react';
import { Form, Button, Card, Table, Row, Col, Container, Modal } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import axios from 'axios';

const departments = ['All', 'CSE', 'EEE', 'ECE', 'ME', 'Library', 'CC', 'AD'];

function Getdata() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All');
  const [fromJECC, setFromJECC] = useState('');
  const [toJECC, setToJECC] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Fetch data once on mount
  useEffect(() => {
    axios.get('http://localhost:4000/get-data')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching hardware data:', err));
  }, []);

  const parseJECCNum = (jeccid) => {
    const parts = jeccid.split('-');
    if (parts.length !== 2) return NaN;
    return parseInt(parts[1].replace(/^0+/, ''), 10);
  };

const results = useMemo(() => {
  let filtered = [...data];

  // Filter by Department
  if (dept !== 'All') {
    filtered = filtered.filter(item => item.department === dept);
  }

  // Filter by search query
  const q = query.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(item =>
      item.jeccid?.toLowerCase().includes(q) ||
      item.spoc?.toLowerCase().includes(q) ||
      item.room?.toLowerCase().includes(q)
    );
  }

  return filtered;
}, [data, query, dept]);

  const clearFilters = () => {
    setQuery('');
    setDept('All');
    setFromJECC('');
    setToJECC('');
  };

  const handlePrint = () => window.print();

  const handleDownload = async (id) => {
    const qrElement = document.getElementById(`qr-code-${id}`);
    if (!qrElement) return alert('QR code not found!');
    try {
      const dataUrl = await htmlToImage.toPng(qrElement);
      download(dataUrl, `${id}-qrcode.png`);
    } catch (err) {
      console.error('Failed to download QR code', err);
      alert('Failed to download QR code.');
    }
  };

  const openModal = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <Container>
      <h3 className="text-center mt-4 mb-4">QR Code Generator & Printer</h3>
      <Form>
    <Row className="mb-3">
  <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
    <Form.Label>Search (JECC ID, SPOC, Room)</Form.Label>
    <Form.Control
      type="search"
      placeholder="Search here..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  </Col>
  <Col xs={12} sm={6} md={3} className="mb-3 mb-md-0">
    <Form.Label>Department</Form.Label>
    <Form.Select value={dept} onChange={e => setDept(e.target.value)}>
      {departments.map(d => (
        <option key={d} value={d}>{d}</option>
      ))}
    </Form.Select>
  </Col>

</Row>


        <Row className="mb-3">
          <Col md={6}>
            <Button variant="secondary" onClick={clearFilters} className="me-2">
              Clear Filters
            </Button>
            <Button variant="primary" onClick={handlePrint} disabled={results.length === 0}>
              Print QRs
            </Button>
          </Col>
          <Col md={6} className="text-end">
            Showing <strong>{results.length}</strong> item{results.length !== 1 ? 's' : ''}
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover responsive className="mb-4">
        <thead>
          <tr>
            <th>JECC ID</th>
            <th>SPOC</th>
            <th>Department</th>
            <th>Room</th>
            <th>Brand</th>
            <th>OS</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map(item => (
            <tr key={item._id}>
              <td>{item.jeccid}</td>
              <td>{item.spoc}</td>
              <td>{item.department}</td>
              <td>{item.room}</td>
              <td>{item.brand}</td>
              <td>{item.operatingsystems}</td>
              <td>{item.status}</td>
            </tr>
          ))}
          {results.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">No data found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="qr-print-grid">
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {results.map(item => (
            <Col key={item._id}>
         <Card
  className="qr-card p-3 text-center shadow-sm"
  onClick={() => openModal(item)}
>
  <div id={`qr-code-${item._id}`} className="qr-box">
    <QRCode value={JSON.stringify(item)} size={130} />
    <div className="qr-label">JECC ID: {item.jeccid}</div>
  </div>

  <Card.Body>
    <Card.Title style={{ fontSize: '1.1rem', fontWeight: '600' }}>
      JECC ID: {item.jeccid}
    </Card.Title>
    <Card.Text style={{ fontSize: '0.85rem' }}>
      SPOC: {item.spoc} <br />
      Department: {item.department} <br />
      Room: {item.room}
    </Card.Text>
  </Card.Body>

  <Button
    variant="outline-primary"
    size="sm"
    onClick={(e) => {
      e.stopPropagation();
      handleDownload(item._id);
    }}
  >
    Download QR
  </Button>
</Card>

            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showModal} onHide={closeModal} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Details for JECC ID: {modalData?.jeccid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData && (
            <Table bordered size="sm" responsive>
              <tbody>
                {Object.entries(modalData).map(([key, value]) => (
                  <tr key={key}>
                    <th style={{ textTransform: 'capitalize' }}>{key}</th>
                    <td>{String(value)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

    <style jsx>{`
  .qr-print-grid {
    margin-top: 1rem;
  }

  @media print {
    body * {
      visibility: hidden !important;
    }

    .qr-print-grid,
    .qr-print-grid * {
      visibility: visible !important;
    }

    .qr-print-grid {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 1rem;
    }

    .qr-print-grid .card {
      page-break-inside: avoid;
      border: none !important;
      box-shadow: none !important;
    }

    .qr-print-grid .card-body,
    .qr-print-grid .btn,
    .qr-print-grid .card-text {
      display: none !important;
    }

    .qr-print-grid .card-title {
      font-size: 14px;
      margin-top: 0.5rem;
    }
  }
`}</style>

    </Container>
  );
}

export default Getdata;
