# 1. Introduction

## Project Objectives
Online teaching the most popular teaching method at present. 

The overall objectives of the project include:
1. Supporting students in understanding content more deeply through small assessment.
2. Allowing teachers to track their students' progress dynamically.
3. Enabling teachers to provide varied teaching experiences for teachers.

## Definition of terms
| Term | Definition                         |
| ---- | ---------------------------------- |
| AI   | Artificial Intelligence            |
| GPT  | Generative Pre-trained Transformer |

## Scope of application
This document is intended for readers, project team members, school student teachers and other relevant stakeholders
----------------------------------------------------------------------------------------------

# 2. Overview of overall design

## Target task
The design goal of the SmartClass application is to largely simplify the process of lesson revision creation from teachers based on latest artificial intelligence technologies.

The main task of the AI education system is to convert pre-recorded videos to viable quiz questions to test students on their knowledge of the content. To accomplish this, the appropriate AI software must be considered. Other conditions including conditions of technology and operating environment must also be considered. 

To complete this, the SmartClass application will need to (1) Convert the pre-recorded video to legible text. (2) Convert text to relevant and helpful questions and also retrieve answers using AI. (3) Answers to the questions are evaluated by AI if incorrect and relevant feedback is given. (4) If the student constantly answers the question incorrectly, the student will be directed to a prerequisite class or lesson to improve/re-learn the required knowledge.

The lessons can be designed using a "knowledge network" by connecting relevant prerequisite knowledge to each question.

## Design strategy
The system is based on React + Python Flask + SQLite3 to achieve front-end, back-end and data separation, to create a safe MVC (Model Viewer Controller) software architectural pattern.

## Conditions and restrictions
This document is for category descriptions and listings only, see requirements-spec.

## Design principles
1. Scalability: 

# 6. Interface design

## External interface
Our external interface is used to receive video lessons from teachers.

## Internal interface
The front-end application module of the attendance system interacts with the back-end service using REST APIs, using the internal interface access mode. This mode realizes the separation and decoupling of front and back office.


