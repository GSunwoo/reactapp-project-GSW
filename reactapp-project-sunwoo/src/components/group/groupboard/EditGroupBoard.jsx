import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditGroupBoard(props) {
  const comments = props.comments;
  const setComments = props.setComments;
  const currentComm = props.currentComm;

  const [commBody, setCommBody] = useState(currentComm.body);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function nowDate() {
    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const editComment = {
      id: currentComm.id,
      writer: currentComm.writer,
      body: commBody,
      likes: currentComm.likes,
      time: nowDate() + ' (수정됨)',
    };

    const newList = comments.map((curr) =>
      curr.id === currentComm.id ? editComment : curr
    );

    setComments(newList);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-warning" size="sm" onClick={handleShow}>
        수정
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>댓글 수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>작성자명</Form.Label>
              <Form.Control
                type="text"
                value={currentComm.writer}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>댓글 내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={commBody}
                onChange={(e) => setCommBody(e.target.value)}
                placeholder="댓글을 입력하세요"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" type="submit">
              수정
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditGroupBoard;