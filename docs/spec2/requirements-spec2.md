# 1. Introduction

## 1.1 Project Objectives
Online teaching the most popular teaching method at present. 

The overall objectives of the project include:
1. Supporting students in understanding content more deeply through small assessment.
2. Allowing teachers to track their students' progress dynamically.
3. Enabling teachers to provide varied teaching experiences for teachers.

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
This document is intended for project team members, students and teachers and other relevant stakeholders.

---------------------------------------------------------------------

# 2. Overview of overall design

## 2.1 Target task
The design goal of the SmartClass application is to largely simplify the process of lesson revision creation from teachers based on latest artificial intelligence technologies.

The main task of the AI education system is to convert pre-recorded videos to viable quiz questions to test students on their knowledge of the content. To accomplish this, the appropriate AI software must be considered. Other conditions including conditions of technology and operating environment must also be considered. 

To complete this, the SmartClass application will need to (1) Convert the pre-recorded video to legible text. (2) Convert text to relevant and helpful questions and also retrieve answers using AI. (3) Answers to the questions are evaluated by AI if incorrect and relevant feedback is given. (4) If the student constantly answers the question incorrectly, the student will be directed to a prerequisite class or lesson to improve/re-learn the required knowledge.

The lessons can be designed using a "knowledge network" by connecting relevant prerequisite knowledge to each question.

## 2.2 Design strategy
The system is based on React + Python Flask + SQLite3 to achieve front-end, back-end and data separation, to create a safe MVC (Model Viewer Controller) software architectural pattern.

## 2.3 Conditions and restrictions
This document is for category descriptions and listings only, see requirements-spec.

1. Our application has a fair reliance on AI, and so the accuracy of answers relies on the OpenAI GPT-4 API.
2. Average response time: For teachers, the generation time for lessons may take a long time based on the length of the content provided. For students, the response time of answers should be less than 1 minute. 
3. The application is currently specifically tailored for school-use and so other usage cases may be suboptimal. (Other use cases will be considered in the future.)

## 2.4 Design principles
Our software will follow the Nielsen's Heuristic Design Heuristics. (REFERENCE: https://www.nngroup.com/articles/ten-usability-heuristics/)
1. Visibility of System: Our system will keep users informed about what is going on, through appropriate feedback within a reasonable amount of time. We can do this by clearly highlighting the user's selected object and/or clearly indicating when the website is loading.
2. Match between system and real world: The design should speak the users' language and jargon, and follow real-world conventions. Our program will do this by recreating the school environment using school related jargon and also creating a "knowledge network" to assist in learning.
3. User control and freedom: Mistake preventative actions are available for users, i.e. confirmation pop-ups, and undo.
4. Consistency and standards: Our application will follow industry standards required by schools.
5. Error prevention: Our team will aim to reduce the possibilities of errors in the first place.
6. Recognition rather than recall: Relevant elements, actions and options will be visible on our website at all time, which reduces the need for user memory load.
7. Flexibility and efficiency of use: Shortcuts will be available to cater for both inexperienced and experienced users.
8. Aesthetic and minimalist design: Interfaces should only contain important information to prevent user distraction.
9. Help users recover from error: Errors messages should make sense for users and precisely indicate problem.
10. Help and documentation: The application will be kept simple enough to avoid help and documentation, but this document and direct help from team members via workshops is available.

# 3. Development and operation environment
| Server    | Main Configuration | OS    | Purpose     | Middleware | Number |
| --------- | ------------------ | ----- | ----------- | ---------- | ------ |
| PC Server | 4C/16GB, 100GB     | Linux | Database    | Nothing    | 1      |
| PC Server | 4C/16GB, 1000GB    | Linux | Application | Nothing    | 1      |

# 4. Overall system architecture

## 4.1 Functional architecture

## 4.2 Technical architecture

## 4.3 Deployable architecture

## 4.4 Related system integration relationship

### 4.4.1 Student
| AI education system (as student)                                                          |
| ----------------------------------------------------------------------------------------- |
| Interface function description                                                            | Expected interface elements                             |
| ----------------------------------------------------------------------------------------- |
| Access profile                                                                            | Input: username (stored within session)                 |
|                                                                                           | ------------------------------------------------------- |
|                                                                                           | Output: basic user information related to username      |
| Enrol courses                                                                             |                                                         |
| Drop courses                                                                              |
| Receive feedback                                                                          |                                                         |
| Get course information                                                                    |                                                         |
| Watch videos                                                                              |
| Answer question                                                                           |

### 4.4.2 Teacher

# 5. Database design

## 5.1 Database environment description
1. Hardware environment
CPU: 8C
Memory: 16GB
Hard disk: 1000G
Network: 1000M network card

2. Software environment
Database: SQLite
Operating system: 

## 5.2 Database naming rules

## 5.3 Database table structure description

# 6. Interface design

## 6.1 External interface
Our external interface involves: (1) The teacher, who can upload videos, and edit transcripts and questions that may have generative mistakes from the AI and, (2) The students who can: for any lesson uploaded by teachers, be able to answer questions and receive feedback.

## 6.2 Internal interface
The front-end application module of the attendance system interacts with the back-end service using REST APIs, using the internal interface access mode. This mode realizes the separation and decoupling of front and back office.


