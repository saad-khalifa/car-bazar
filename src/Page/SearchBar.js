import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    category: '',
    priceRange: '',
    year: '',
  });

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="search-bar mt-4">
      <Form>
        <Row>
          <Col md={4}>
            <Form.Control
              as="select"
              name="category"
              onChange={handleChange}
              value={searchParams.category}
            >
              <option value="">اختر الفئة</option>
              <option value="new">جديدة</option>
              <option value="used">مستعملة</option>
            </Form.Control>
          </Col>
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="السعر (بالليرة السورية)"
              name="priceRange"
              onChange={handleChange}
              value={searchParams.priceRange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="number"
              placeholder="السنة"
              name="year"
              onChange={handleChange}
              value={searchParams.year}
            />
          </Col>
        </Row>
        <Button variant="primary" className="mt-2" type="submit">
          بحث
        </Button>
      </Form>
    </div>
  );
}

export default SearchBar;
