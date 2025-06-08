import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const GuestFormEditModal = ({
  show,
  editingGuestData,
  onChange,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editingGuestData && (
          <Form>
            <Form.Group controlId="formGuestName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editingGuestData.guestName || ""}
                onChange={(e) =>
                  onChange({ ...editingGuestData, guestName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGuestEmail" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editingGuestData.guestEmail || ""}
                onChange={(e) =>
                  onChange({ ...editingGuestData, guestEmail: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuestFormEditModal;
