import { useState } from "react";
import Header from "../components/Header";
import { Form } from "react-bootstrap";

const temp_questions = [
  {
    question: "The sky is blue",
    answer: false,
  },
  {
    question: "what is 2 + 2?",
    answer: 4,
  },
  {
    question: "The sky is blue",
    answer: false,
  },
  {
    question: "what is 2 + 2?",
    answer: 4,
  },
  {
    question: "The sky is blue",
    answer: false,
  },
  {
    question: "what is 2 + 2?",
    answer: 4,
  },
];

function EditLesson() {
  const [video, setVideo] = useState(null);
  const [questions, setQuestions] = useState(temp_questions);

  function handleChange(e, i) {
    const [type, index] = e.target.name.split(":");
    setQuestions([
      ...questions.slice(0, index),
      { ...questions, [type]: e.target.value },
      ...questions.slice(index + 1),
    ]);
  }

  return (
    <>
      <Header />
      <h1>Edit Lesson</h1>
      <div className="Edit">
        <div className="top-container">
          <div className="left-container">
            <div className="video-container">
              {video === null ? (
                <>
                  <p className="no-upload">No Video Uploaded</p>
                </>
              ) : (
                <video controls>
                  <source src={video} type="video/mp4" />
                </video>
              )}
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formVideoUpload">
                <Form.Control
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    setVideo(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </Form.Group>
            </Form>
          </div>
          <div className="right-container">
            <Form>
              <Form.Group className="mb-3" controlId="formQuestions">
                {questions.map((question, index) => (
                  <div className="question-container" key={index}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      name={`question:${index}`}
                      value={question.question}
                      type="text"
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
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditLesson;
