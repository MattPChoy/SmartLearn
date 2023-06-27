import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Tab, Tabs, Form } from "react-bootstrap";

function Course() {
  const location = useLocation();
  const code = location.code;

  const temp_course = {
    code: "COMP3506",
    video: "vid.link",
    transcript: "asdfasdfghjklkjhgfds",
    questions: [
      {
        question: "The sky is blue",
        answer: false,
      },
      {
        question: "what is 2 + 2?",
        answer: 4,
      },
    ],
  };

  function Quiz({ questions }) {
    function NumberInput() {
      return <Form.Control type="number" />;
    }

    function TextInput() {
      return <Form.Control type="text" />;
    }

    function BooleanInput() {
      return (
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="True"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="False"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
          />
        </div>
      );
    }

    const inputTypes = {
      number: <NumberInput />,
      boolean: <BooleanInput />,
      string: <TextInput />,
    };

    return (
      <Form>
        {questions.map((question, index) => {
          console.log(typeof question.answer);
          return (
            <div className="Question">
              <h3 key={index}>{question.question}</h3>
              {inputTypes[typeof question.answer]}
            </div>
          );
        })}
      </Form>
    );
  }

  return (
    <div className="Course">
      <Header />
      <h2>{temp_course.code}</h2>

      <Tabs defaultActiveKey="video" className="mb-3">
        <Tab eventKey="video" title="Video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/7CqJlxBYj-M"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </Tab>
        <Tab eventKey="transcript" title="Transcript">
          <p>{temp_course.transcript}</p>
        </Tab>
        <Tab eventKey="quiz" title="Quiz">
          <Quiz questions={temp_course.questions} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Course;
