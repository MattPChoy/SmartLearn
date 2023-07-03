# 1 Introduction

## 1.1 Project Objectives
Currently, online teaching has emerged as the most popular method of instruction. The project's overarching goals encompass the following objectives:

1. Enhancing students' understanding of the content through regular assessments tailored to their needs.
2. Empowering teachers to create diverse and engaging learning experiences for their students.
Streamlining the development of online learning tools, thereby freeing up teachers' time to provide support to students facing challenges.
3. Facilitating real-time monitoring of students' progress, enabling teachers to track their growth dynamically.
4. By implementing these objectives, the project aims to leverage the benefits of online teaching, ensuring deeper comprehension, personalized instruction, efficient resource allocation, and effective student progress tracking.

## 1.2 Definition of terms
| Term     | Definition                                                                            |
| -------- | ------------------------------------------------------------------------------------- |
| AI       | Artificial Intelligence                                                               |
| GPT      | Generative Pre-trained Transformer                                                    |
| OS       | Operating System                                                                      |
| UQ       | University of Queensland                                                              |
| Course   | A collection of lectures, tutorials and assessments intended to teach students        |
| Offering | A particular run of a course, in a particular year and semester                       |
| Semester | A particular division of a year (e.g, semester 2 in an organisation with 3 semesters) |

## 1.3 Scope of application
This document is intended to be useful for a wide range of individuals, including project team members, students, teachers, and other pertinent stakeholders.

# 2 Overview of overall design

## 2.1 Target task
The design goal of the SmartClass application is to significantly simplify the process of creating lesson revisions for teachers, leveraging cutting-edge artificial intelligence technologies.

The primary objective of the AI education system is to transform pre-recorded videos into actionable quiz questions that effectively assess students' comprehension of the content. This requires careful consideration of suitable AI software, as well as an assessment of technological and operational requirements.

To achieve this, the SmartClass application will perform the following key tasks:

Convert pre-recorded videos into easily readable text format.
Utilize AI to generate relevant and informative questions based on the converted text, while also retrieving corresponding answers.
Employ AI to evaluate answers provided by students, providing constructive feedback in case of incorrect responses.
In instances where a student consistently answers questions incorrectly, guide them towards prerequisite classes or lessons that facilitate improvement or relearning of the necessary knowledge.
The lessons within the SmartClass application can be structured using a "knowledge network" approach, wherein relevant prerequisite knowledge is interconnected with each question, ensuring a comprehensive and coherent learning experience.

## 2.2 Design strategy
The system adopts a secure MVC (Model-View-Controller) software architectural pattern by leveraging React, Python Flask, and SQLite3. This combination enables clear separation of front-end, back-end, and data functionalities. React serves as the front-end framework, Python Flask handles the back-end logic, and SQLite3 is utilized for data management. This approach ensures robust architecture while maintaining security and promoting scalability.

## 2.3 Conditions and restrictions
This document solely focuses on category descriptions and listings. For detailed project specifications, please refer to the requirements-spec document.

1. The application extensively utilizes AI, particularly relying on the OpenAI GPT-4 API to ensure the accuracy of answers.
2. Average response time: Teachers may experience longer lesson generation times depending on the length of the content provided. Conversely, students should receive answers within a response time of less than 1 minute.
3. Presently, the application is primarily designed for school use, tailored specifically to meet educational needs. While other use cases may not be optimal at this time, the consideration of alternative use cases is planned for future iterations.

## 2.4 Design principles
Our software will adhere to Nielsen's Heuristic Design Heuristics. Here's how we will incorporate each principle:

# 3. Development and operation environment
| Server    | Main Configuration | OS    | Purpose     | Middleware | Number |
| --------- | ------------------ | ----- | ----------- | ---------- | ------ |
| PC Server | 4C/16GB, 100GB     | Linux | Database    | Nothing    | 1      |
| PC Server | 4C/16GB, 1000GB    | Linux | Application | Nothing    | 1      |

1. Visibility of System: Our system will provide users with timely feedback to keep them informed. We will achieve this by highlighting the user's selected object and providing clear indicators during website loading.

2. Match between system and real world: Our design will use familiar language and jargon that resonates with users. By incorporating school-related terms and creating a "knowledge network," we will recreate the school environment and facilitate learning.

3. User control and freedom: We will empower users with mistake-prevention actions, such as confirmation pop-ups and undo functionalities.

4. Consistency and standards: Our application will adhere to industry standards that schools require, ensuring consistency and familiarity for users.

5. Error prevention: We will proactively reduce the likelihood of errors through careful design and implementation.

6. Recognition rather than recall: Our website will display relevant elements, actions, and options at all times, minimizing the need for users to rely on memory recall.

7. Flexibility and efficiency of use: To accommodate both inexperienced and experienced users, our system will provide shortcuts that cater to different skill levels.

8. Aesthetic and minimalist design: We will maintain a clean and minimalist interface, focusing on displaying only essential information to prevent user distractions.

9. Help users recover from errors: Our error messages will be user-friendly, clearly indicating the problem and providing meaningful guidance for recovery.

10. Help and documentation: While we aim to keep our application intuitive enough to minimize reliance on help and documentation, we will provide this document as a resource. Additionally, users can access direct help from our team through workshops and other channels.


# 3 Development and operation environment
| Server    | Main Configuration | OS    | Purpose     | Middleware | Number |
| --------- | ------------------ | ----- | ----------- | ---------- | ------ |
| PC Server | 4C/16GB, 100GB     | Linux | Database    | Nothing    | 1      |
| PC Server | 4C/16GB, 1000GB    | Linux | Application | Nothing    | 1      |

# 4 Overall system architecture

## 4.1 Functional architecture

## 4.2 Technical architecture

## 4.3 Deployable architecture

## 4.4 Related system integration relationship
### 4.4.1 Student
AI education system (as student)                                                          
| Interface function description | Expected interface element (input)                 |
| ------------------------------ | -------------------------------------------------- |
| Access profile                 | Input: username (stored within session)            |
|                                | Output: basic user information related to username |
| Enrol courses                  | Input: course name, course study period, username  |
|                                | Output: courseID, status completion                |
| Drop courses                   | Input: course name, course study period, username  |
|                                | Output: status completion                          |
| Receive feedback               | Input: answer, username                            |
|                                | Output: AI response                                |
| Get course information         | Input: course name                                 |
|                                | Output: course description                         |
| Answer question                | Input: questionID, response                        |
|                                | Output: receive feedback                           |
| View lesson                    | Input: LessonID                                    |
|                                | Output: Lesson Content                             |
### 4.4.2 Teacher
| Interface function description | Expected interface element (input)                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Upload videos                  | Input: video file (mp4)                                                                                                                          |
|                                | Output: success message                                                                                                                          |
| Create lesson                  | Input: CourseID, video file (uploaded)                                                                                                           |
|                                | Output: success message                                                                                                                          |
| View lesson                    | Input: CourseID, LessonID, username                                                                                                              |
|                                | Output: Lesson contents, settings to edit                                                                                                        |
| Edit lesson                    | Input: CourseID, LessonID, Content (changed), Content (original)                                                                                 |
|                                | Output: Lesson contents, with content changed. (transcript or questions). If transcript is changed, the AI will automatically fix the questions. |

# 5 Database design

## 5.1 Database environment description
1. Hardware environment
CPU: 8C
Memory: 16GB
Hard disk: 1000G 
Network: 1000M network card

2. Software environment
Database: SQLite
Operating system: Linux

## 5.2 Database table structure description

# 6 Interface design

## 6.1 External interface
The external interface of our system encompasses two main user roles:

Teachers: Teachers have the ability to upload videos, edit transcripts, and review and modify questions that may contain generative mistakes from the AI. This enables them to maintain control over the content and ensure its accuracy.

Students: Students can access the uploaded lessons created by teachers and actively participate by answering questions related to the lesson. They will also receive feedback based on their responses, helping them gauge their understanding and progress.

## 6.2 Internal interface
The internal interface of the attendance system is designed to facilitate seamless communication between the front-end application module and the back-end service. This interaction is achieved through REST APIs, which establish a structured and standardized approach for data exchange.

By utilizing this internal interface access mode, the system achieves a clear separation and decoupling of front-end and back-end components. This architectural design promotes modularity, flexibility, and maintainability, allowing for independent development and updates of both the front and back-end aspects of the system.

# 7 Detailed design

## 7.1 

# References
Nielsen, J., & Molich, R. (1990). Ten Usability Heuristics. In: Nielsen Norman Group. [Online] Available at: https://www.nngroup.com/articles/ten-usability-heuristics/ (Accessed: 30 June 2023).
