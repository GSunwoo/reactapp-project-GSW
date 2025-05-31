import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function WriteGroup(props) {
  const comments = props.comments;
  const setComments = props.setComments;
  const idx = props.idx;
  const setIdx = props.setIdx;

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

    let commWriter = e.target.commentAuthor.value;
    let commBody = e.target.commentContent.value;

    const newComment = { id: idx, writer: commWriter, body: commBody, likes: 0, time: nowDate() };

    setComments([...comments, newComment]);
    setIdx(idx + 1);

    e.target.reset();
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        댓글 작성
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>댓글 작성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>작성자명</Form.Label>
              <Form.Control
                type="text"
                id="commentAuthor"
                name="commentAuthor"
                placeholder="이름을 입력하세요"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>댓글 내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="commentContent"
                name="commentContent"
                placeholder="댓글을 입력하세요"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" type="submit">
              작성
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default WriteGroup;