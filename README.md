# DevConnect

**A collaborative workspace for software development teams.**

DevConnect is a full-stack project management platform designed to help development teams organize projects, manage tasks, and collaborate in one place.

## Project Goals

- Organize workspaces and projects.
- Manage tasks through a Kanban board.
- Assign tasks and track progress.
- Support team collaboration through comments and notifications.
- Provide secure authentication and role-based access.
- Build a maintainable application with automated testing and CI/CD.

## Technology Stack

| Area            | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | React, Vite, JavaScript       |
| Backend         | Node.js, Express              |
| Database        | PostgreSQL                    |
| API             | REST                          |
| Version Control | Git and GitHub                |
| Testing         | Vitest, Supertest, Playwright |
| CI/CD           | GitHub Actions                |
| Deployment      | To be decided                 |

_The planned stack and features will be updated as implementation progresses._

## Repository Structure

```text
DevConnect/
├── client/                 # React frontend
├── server/                 # Planned backend
├── docs/
│   ├── architecture.md
│   ├── database-schema.md
│   └── api.md
├── .gitignore
├── CONTRIBUTING.md
├── CHANGELOG.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- Visual Studio Code or another code editor

### Run the frontend

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Development Workflow

- Keep `main` stable.
- Create a separate branch for each feature, fix, or maintenance task.
- Make small commits with clear messages.
- Test changes before opening a pull request.
- Update relevant documentation as features change.

## Documentation

- [Architecture](docs/architecture.md)
- [Database Schema](docs/database-schema.md)
- [API Documentation](docs/api.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## Project Status

**Early development:** The React frontend has been scaffolded. Backend, database, authentication, and collaboration features are planned.

## License

License to be decided before public distribution.
