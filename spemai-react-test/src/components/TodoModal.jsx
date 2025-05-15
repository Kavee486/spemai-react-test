import { Modal, Button } from 'react-bootstrap'

/**
 * Modal dialog to show detailed information about a selected ToDo item.
 * Props:
 * - show: controls visibility
 * - onHide: callback to close modal
 * - todo: object with todo details
 */
export default function TodoModal({ show, onHide, todo }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>ToDo Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>ID:</strong> {todo.id}</p>
        <p><strong>Title:</strong> {todo.title}</p>
        <p><strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
