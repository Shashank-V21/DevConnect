# Contributing to DevConnect

Thank you for contributing to DevConnect.

## Development Workflow

1. Keep `main` stable.
2. Create a branch for each feature, bug fix, or maintenance task.
3. Make focused changes that are easy to review.
4. Add or update tests for behavior changes.
5. Update documentation whenever behavior, setup, APIs, or architecture changes.
6. Run relevant checks before submitting changes.
7. Open a pull request and describe the changes, testing performed, and any limitations.

## Branch Naming

Use descriptive branch names:

- `feat/task-management`
- `fix/task-validation`
- `docs/api-documentation`
- `chore/project-setup`
- `test/task-service`

## Commit Messages

Use the Conventional Commits style:

- `feat: add task creation endpoint`
- `fix: validate task status`
- `docs: document API endpoints`
- `test: cover task validation`
- `chore: configure development tooling`

Keep commits focused on one logical change.

## Pull Request Checklist

- [ ] The change has a clear purpose.
- [ ] Relevant tests pass.
- [ ] Documentation is updated.
- [ ] No secrets or unnecessary generated files are included.
- [ ] Limitations and follow-up work are described.

## Code Quality

Prefer readable, maintainable code. Validate untrusted input, handle errors explicitly, and enforce access control on the server.

Do not claim that a test or check passed unless it has actually been run.
