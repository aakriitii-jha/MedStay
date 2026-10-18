MedStay
Healthcare Resource Discovery and Management Platform

MedStay is a healthcare resource discovery and management platform designed to help patients find hospitals, explore bed availability, and access essential healthcare resource information. The platform also provides tools for healthcare facility owners to manage resources and bookings.

Developed as a hackathon project, MedStay aims to improve the accessibility of healthcare information and provide better visibility into hospital resources and service feedback.

Key Features

1. Hospital and Bed Discovery
- Search for hospitals and explore available healthcare facilities.
- Browse General, Private, and ICU bed options.
- Access relevant hospital and resource information.

2. Patient Booking Management
- Explore bed options based on healthcare requirements.
- Submit bookings and view booking history.
- Simplify the process of discovering suitable healthcare facilities.

3. Hospital Owner Dashboard
- Register hospitals and healthcare facilities.
- Manage bed inventory, availability, and bookings.
- Maintain facility information through a dedicated dashboard.

4. Lifeline
Provides access to blood bank information and blood stock updates to help users identify potential sources of essential blood resources.

5. Resource Radar
Improves visibility into hospital resource availability and shortages, helping identify facilities that may require additional support.

6. Janvani
A bilingual Hindi-English patient feedback platform that enables users to share their experiences with healthcare services. The collected feedback can support future analysis of service quality and recurring concerns.

7. Hospital Documentation
Supports the collection and review of relevant hospital registration and compliance documents to improve transparency in facility information.

Technology Stack

| Technology | Purpose |

| HTML5 | Frontend structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Frontend interactions |
| Node.js | Server-side runtime |
| Express.js | Backend API development |
| JSON | Prototype data storage |

Installation and Setup

Prerequisites
- Node.js 18 or later
- npm

Steps

1. Clone the repository

```bash
git clone https://github.com/aakriitii-jha/MedStay
```

2. Navigate to the project directory**
```bash
cd MedStay
```

3. Install dependencies

```bash
npm install
```

4. Configure environment variables**

Create a local `.env` file if required by the project. Add the necessary API keys and configuration values. Do not commit secrets or API keys to the repository.

5. Start the application**

```bash
npm start
```

6. Open the application

Navigate to:

`http://localhost:3000`

This assumes the application is configured to run on port 3000.

Project Architecture

MedStay follows a client-server architecture:

- Frontend: Provides the user interface for patients and healthcare facility owners.
- Backend: Handles API requests, application logic, and data operations through Node.js and Express.
- Data Storage: Uses JSON-based storage for prototype data.

Data Security and Privacy

The current prototype uses JSON-based storage for demonstration purposes. A production-ready deployment would require additional safeguards, including secure database management, authentication, role-based authorization, input validation, protected API endpoints, and appropriate handling of sensitive healthcare information.

Only dummy data should be used for public demonstrations.

Future Scope

- Machine-learning-assisted analysis of patient feedback.
- Improved hospital documentation and verification workflows.
- More reliable and regularly updated healthcare resource information.
- Enhanced resource-shortage monitoring and coordination.
- Scalable database integration and stronger security controls.

Project Objective

MedStay aims to make healthcare resource discovery more accessible, improve visibility into hospital availability, and support more informed decisions through organized healthcare information.

Note: MedStay is a prototype developed for demonstration and innovation purposes. Resource availability and verification depend on the data sources and functionality implemented in the current version.

Contributors

Developed by **Team [Byteblitz]** as a healthcare technology project.

