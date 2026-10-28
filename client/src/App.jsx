import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/projects";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function createProject(event) {
    event.preventDefault();

    const name = projectName.trim();
    const description = projectDescription.trim();

    if (!name) {
      setFormError("Project name is required.");
      return;
    }

    setCreating(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create project.");
      }

      setProjects(function (currentProjects) {
        return [data.project, ...currentProjects];
      });

      setProjectName("");
      setProjectDescription("");
      setShowForm(false);
      setSuccessMessage("Project created successfully!");
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  useEffect(function () {
    async function fetchProjects() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load projects.");
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(
          "Could not connect to the DevConnect API. Make sure the backend is running.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/">
          <span className="brand-icon">D</span>
          <span>DevConnect</span>
        </a>

        <p className="nav-heading">WORKSPACE</p>

        <nav className="navigation">
          <a className="nav-link active" href="#dashboard">
            <span>▦</span> Dashboard
          </a>
          <a className="nav-link" href="#projects">
            <span>▤</span> Projects
          </a>
          <a className="nav-link" href="#tasks">
            <span>✓</span> My Tasks
          </a>
          <a className="nav-link" href="#team">
            <span>♧</span> Team
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">SV</div>
          <div>
            <strong>Shashank V</strong>
            <p>Developer</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <span className="breadcrumb">Workspace / Dashboard</span>
          <span className="api-status">
            <span className="status-dot" />
            Project workspace
          </span>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Good to see you, Shashank 👋</h1>
            <p className="welcome-description">
              Keep your projects organized and your team moving forward.
            </p>
          </div>
          <a className="primary-button" href="#projects">
            View projects <span>→</span>
          </a>
        </section>

        <section className="stats-grid" aria-label="Project statistics">
          <article className="stat-card">
            <p>Total projects</p>
            <strong>{loading ? "—" : projects.length}</strong>
            <span>Projects in your workspace</span>
          </article>

          <article className="stat-card">
            <p>In progress</p>
            <strong>
              {loading
                ? "—"
                : projects.filter(function (project) {
                    return project.status === "in_progress";
                  }).length}
            </strong>
            <span>Currently being worked on</span>
          </article>

          <article className="stat-card">
            <p>Completed</p>
            <strong>
              {loading
                ? "—"
                : projects.filter(function (project) {
                    return project.status === "completed";
                  }).length}
            </strong>
            <span>Finished projects</span>
          </article>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            {showForm && (
              <form className="project-form" onSubmit={createProject}>
                <h3>Create a new project</h3>

                <div className="form-field">
                  <label htmlFor="project-name">Project name *</label>
                  <input
                    id="project-name"
                    type="text"
                    value={projectName}
                    onChange={function (event) {
                      setProjectName(event.target.value);
                    }}
                    placeholder="e.g. Team Task Manager"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="project-description">Description</label>
                  <textarea
                    id="project-description"
                    value={projectDescription}
                    onChange={function (event) {
                      setProjectDescription(event.target.value);
                    }}
                    placeholder="What is this project about?"
                    rows={3}
                  />
                </div>

                {formError && (
                  <p className="form-error" role="alert">
                    {formError}
                  </p>
                )}

                <button
                  className="primary-button"
                  type="submit"
                  disabled={creating}
                >
                  {creating ? "Creating..." : "Create project"}
                </button>
              </form>
            )}
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h2>Your projects</h2>
              <p>Track what's happening across your workspace.</p>
            </div>

            <div className="project-actions">
              <span className="project-count">{projects.length} projects</span>

              <button
                className="primary-button"
                type="button"
                onClick={function () {
                  setShowForm(!showForm);
                  setFormError("");
                  setSuccessMessage("");
                }}
              >
                {showForm ? "Cancel" : "+ Create project"}
              </button>
            </div>
          </div>
          {loading && (
            <div className="feedback-panel" role="status">
              Loading your projects...
            </div>
          )}

          {!loading && error && (
            <div className="feedback-panel error-panel" role="alert">
              {error}
              <button
                className="secondary-button"
                onClick={function () {
                  window.location.reload();
                }}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="feedback-panel empty-panel">
              <div className="empty-icon">▤</div>
              <h3>No projects yet</h3>
              <p>
                Your projects will appear here once you create your first one.
              </p>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="projects-grid">
              {projects.map(function (project) {
                return (
                  <article className="project-card" key={project.id}>
                    <div className="project-card-top">
                      <span className="project-icon">
                        {project.name.charAt(0).toUpperCase()}
                      </span>
                      <span
                        className={`status-badge status-${String(project.status)
                          .toLowerCase()
                          .replace(/[^a-z0-9_-]/g, "-")}`}
                      >
                        {String(project.status).replace(/_/g, " ")}
                      </span>
                    </div>

                    <h3>{project.name}</h3>

                    <p className="project-description">
                      {project.description || "No description added yet."}
                    </p>

                    <div className="project-card-footer">
                      <span>Project #{project.id}</span>
                      <span>
                        {project.created_at
                          ? new Date(project.created_at).toLocaleDateString()
                          : "Date unavailable"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="page-footer">
          DevConnect <span>·</span> Built to help teams do great work.
        </footer>
      </main>
    </div>
  );
}

export default App;
