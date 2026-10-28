\# Database Setup and Schema

\## Database

DevConnect uses PostgreSQL as its relational database.

The local development database is named `devconnect\_dev`.

\## Prerequisites

\- Node.js and npm

\- PostgreSQL installed and running

\- A PostgreSQL user with permission to access the development database

\## Local Setup

1\. Create a PostgreSQL database named `devconnect\_dev`.

2\. Navigate to the backend directory:

&#x20; ```powershell

&#x20; cd server

&#x20; ```

3\. Install backend dependencies:

&#x20; ```powershell

&#x20; npm.cmd install

&#x20; ```

4\. Create a local `.env` file by copying `.env.example`:

&#x20; ```powershell

&#x20; Copy-Item .env.example .env

&#x20; ```

5\. Update `.env` with your local PostgreSQL credentials.

6\. Run the automated tests:

&#x20; ```powershell

&#x20; npm.cmd test

&#x20; ```

\## Environment Variables

| Variable | Purpose |

|---|---|

| `PORT` | Port used by the Express server |

| `DB\_HOST` | PostgreSQL hostname |

| `DB\_PORT` | PostgreSQL port |

| `DB\_NAME` | Database name |

| `DB\_USER` | PostgreSQL username |

| `DB\_PASSWORD` | Local PostgreSQL password |

Never commit `.env` or expose database credentials in source code or documentation.

\## Database Configuration Validation

DevConnect validates database environment variables when the database configuration module loads.

The following settings are required:

- `DB_HOST` — PostgreSQL server hostname.
- `DB_NAME` — database name.
- `DB_USER` — PostgreSQL username.
- `DB_PASSWORD` — PostgreSQL password.
- `DB_PORT` — integer between `1` and `65535`.

If a required variable is missing or the port is invalid, the application throws a descriptive error immediately instead of attempting to create a database connection pool with invalid configuration.

\## Current Implementation

\- PostgreSQL connection pooling is implemented in `server/src/config/db.js`.

\- The database connection is verified by `server/tests/db.test.js`.

\- The initial database connection test checks that the active database is `devconnect\_dev`.

\## Planned Schema

The following entities are planned for future implementation:

\- Users

\- Workspaces

\- Workspace memberships

\- Projects

\- Tasks

\- Task comments

\- Notifications

\- Attachments
