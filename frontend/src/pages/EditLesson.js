import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

function EditLesson() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [transcript, setTranscript] = useState("");
  const videoRef = useRef(null);

  function handleChange(e, i) {
    const [type, index] = e.target.name.split(":");
    setQuestions([
      ...questions.slice(0, index),
      { ...questions, [type]: e.target.value },
      ...questions.slice(index + 1),
    ]);
    textAreaAdjust(e.target);
  }

  function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = 25 + o.scrollHeight + "px";
  }

  async function handleUpload(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("video", videoRef.current.files[0]);
    console.log(data);
    try {
      const res = await fetch("http://localhost:5000/api/uploadVideo", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      console.log("JSON, ", json.data);
      const questions = JSON.parse(json.data.questions);
      console.log("questions: ", questions);
      setTranscript(json.data.transcript);
      setQuestions(questions);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h1>Edit Lesson</h1>
      <div className="Edit">
        <div className="top-container">
          <div className="left-container">
            <div className="video-container">
              {videoUrl === null ? (
                <>
                  <p className="no-upload">No Video Uploaded</p>
                </>
              ) : (
                <video controls>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              )}
            </div>
            <Form onSubmit={handleUpload}>
              <Form.Group className="mb-3" controlId="formVideoUpload">
                <Form.Control
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    try {
                      setVideoUrl(URL.createObjectURL(e.target.files[0]));
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  ref={videoRef}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Form>
          </div>
          <div className="right-container">
            <Form>
              <Form.Group className="mb-3" controlId="formQuestions">
                {questions.map((question, index) => (
                  <div className="question-container" key={index}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ overflow: "hidden" }}
                      name={`question:${index}`}
                      value={question.question}
                      onChange={handleChange}
                    />
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                      name={`answer:${index}`}
                      value={question.answer}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="bottom-container">
          <Form>
            <Form.Group className="mb-3" controlId="formTranscript">
              <Form.Label>Transcript</Form.Label>
              <Form.Control
                as="textarea"
                rows={transcript.length / 100}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditLesson;
