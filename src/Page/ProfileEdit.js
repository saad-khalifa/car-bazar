import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // التحقق من وجود الصورة في الـ storage وإذا لم تكن موجودة سيتم عرض صورة افتراضية
  const profileImageUrl = user?.profile_image
    ? `http://localhost:8000/storage/${user.profile_image}` // تأكد من المسار هنا
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // صورة افتراضية

  const handleEdit = () => {
    navigate("/account-settings");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className={`text-center shadow p-3`}>
            <Card.Img
              variant="top"
              src={profileImageUrl}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                margin: "0 auto",
                objectFit: "cover",
                border: "2px solid #000",
              }}
            />
            <Card.Body>
              <Card.Title>{user?.name}</Card.Title>
              <Card.Text>{user?.email}</Card.Text>
              <Button variant={"primary"} onClick={handleEdit}>
                تعديل الحساب
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;
