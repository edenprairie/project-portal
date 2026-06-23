const projects = [
  {
    name: "Jensen",
    system: "OpenClaw AI Agent",
    url: "https://claw.junwang.us",
    category: "AI Agents & Platforms",
    status: ["In progress", "Protected"],
    featured: true,
    color: "#70d6b3",
    description:
      "An OpenClaw-based AI agent project focused on practical autonomous workflows, orchestration, and personal productivity.",
    tags: ["OpenClaw", "Agent", "Automation"]
  },
  {
    name: "Elon",
    system: "Hermes AI Agent",
    url: "https://openwebui.junwang.us",
    category: "AI Agents & Platforms",
    status: ["In progress", "Protected"],
    featured: true,
    color: "#79d7ff",
    description:
      "A developing Hermes agent workspace accessed through the protected Open WebUI environment.",
    tags: ["Hermes", "Agent", "Open WebUI"]
  },
  {
    name: "Open WebUI",
    system: "Private AI Console",
    url: "https://openwebui.junwang.us",
    category: "AI Agents & Platforms",
    status: ["Protected"],
    featured: true,
    color: "#9583ff",
    description:
      "A protected AI interface for experimenting with models, prompts, tools, and local AI workflows.",
    tags: ["LLM", "Private Tools", "Console"]
  },
  {
    name: "Travel Album",
    system: "Personal Travel Blog",
    url: "https://album.junwang.us",
    category: "Personal Sites",
    status: ["Live"],
    description:
      "A personal travel blog and photo album for collecting trips, places, and memories in one public space.",
    tags: ["Travel", "Photos", "Journal"]
  },
  {
    name: "Travel Planner",
    system: "Trip Planning & Memory Site",
    url: "https://travel.junwang.us",
    category: "Personal Sites",
    status: ["Live"],
    description:
      "A personal travel planning and memory site for organizing trip ideas, itineraries, notes, and places worth revisiting.",
    tags: ["Travel", "Planning", "Memories"]
  },
  {
    name: "Jun Wang Docs",
    system: "Personal Document Site",
    url: "https://docs.junwang.us",
    category: "Personal Sites",
    status: ["Live"],
    description:
      "A personal document site, notes archive, and blog for knowledge, records, home references, technology notes, and field notes.",
    tags: ["Docs", "Knowledge Base", "Blog"]
  },
  {
    name: "Minnesota Local Guide",
    system: "TourMN",
    url: "https://mn.junwang.us",
    category: "Community & Media Projects",
    status: ["Live"],
    description:
      "A public local guide organizing Minnesota places, food, events, and community experiences.",
    tags: ["Guide", "Minnesota", "Events"]
  },
  {
    name: "BPPB Blood Pressure Monitor",
    system: "iOS Health App",
    url: "https://bppb.junwang.us",
    category: "Product & App Projects",
    status: ["Live"],
    description:
      "An iOS blood pressure monitoring product with a public website and App Store launch support.",
    tags: ["iOS", "Health", "App Store"]
  },
  {
    name: "Presentation Catalog",
    system: "HTML Deck Hub",
    url: "https://deck.junwang.us",
    category: "Product & App Projects",
    status: ["Live"],
    description:
      "A central catalog for hosting and sharing HTML presentations, with searchable topics and direct links to each deck.",
    tags: ["Presentations", "Catalog", "HTML Decks"]
  },
  {
    name: "Clerava Healthcare Search",
    system: "Healthcare Discovery",
    url: "https://clerava.junwang.us",
    category: "Product & App Projects",
    status: ["Live"],
    description:
      "A healthcare search system designed to help people find providers and care options more clearly.",
    tags: ["Healthcare", "Search", "Next.js"]
  },
  {
    name: "Asian Fair Live Stream",
    system: "Event Broadcast Site",
    url: "https://af.junwang.us",
    category: "Community & Media Projects",
    status: ["Live"],
    description:
      "A community event website with schedule details, venue information, and live broadcast support.",
    tags: ["Live Stream", "Community", "Event"]
  },
  {
    name: "Voice Agent Platform",
    system: "Conversational AI",
    url: "https://va.junwang.us",
    category: "AI Agents & Platforms",
    status: ["Live"],
    description:
      "A voice AI platform combining speech recognition, text-to-speech, LLM reasoning, and workflow orchestration.",
    tags: ["Voice AI", "STT", "TTS"]
  }
];

const categoryTabs = document.querySelector("#category-tabs");
const projectGrid = document.querySelector("#project-grid");
const agentGrid = document.querySelector("#agent-grid");
const searchInput = document.querySelector("#search-input");
const routeStack = document.querySelector("#route-stack");

let activeCategory = "All";

const categories = ["All", ...new Set(projects.map((project) => project.category))];

function statusClass(status) {
  const normalized = status.toLowerCase().replace(/\s+/g, "-");
  return `status-${normalized}`;
}

function renderStats() {
  document.querySelector("#project-count").textContent = projects.length;
  document.querySelector("#category-count").textContent = categories.length - 1;
  document.querySelector("#ai-count").textContent = projects.filter((project) =>
    project.category.includes("AI")
  ).length;
  document.querySelector("#live-count").textContent = projects.filter((project) =>
    project.status.includes("Live")
  ).length;

  routeStack.innerHTML = categories
    .filter((category) => category !== "All")
    .map((category, index) => {
      const count = projects.filter((project) => project.category === category).length;
      const icons = ["✦", "◈", "▣", "⌁"];
      return `
        <div class="route-item">
          <span class="route-icon">${icons[index] || "•"}</span>
          <span>
            <strong>${category}</strong>
            <small>${count} project${count === 1 ? "" : "s"}</small>
          </span>
          <span>${String(index + 1).padStart(2, "0")}</span>
        </div>
      `;
    })
    .join("");
}

function renderTabs() {
  categoryTabs.innerHTML = categories
    .map(
      (category) => `
        <button class="${category === activeCategory ? "is-active" : ""}" type="button" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");
}

function renderAgents() {
  const featured = projects.filter((project) => project.featured);

  agentGrid.innerHTML = featured
    .map(
      (project) => `
        <article class="agent-card" style="--agent-color: ${project.color}">
          <span class="agent-name">${project.name}</span>
          <h3>${project.system}</h3>
          <p>${project.description}</p>
          <div class="tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="card-footer">
            <div class="status-badges">
              ${project.status
                .map((status) => `<span class="status-chip ${statusClass(status)}">${status}</span>`)
                .join("")}
            </div>
            <a href="${project.url}" target="_blank" rel="noreferrer">Open ↗</a>
          </div>
        </article>
      `
    )
    .join("");
}

function matchesSearch(project, query) {
  const haystack = [
    project.name,
    project.system,
    project.url,
    project.category,
    project.description,
    ...project.status,
    ...project.tags
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function renderProjects() {
  const query = searchInput.value.trim();
  const filtered = projects.filter((project) => {
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;
    const searchMatch = !query || matchesSearch(project, query);
    return categoryMatch && searchMatch;
  });

  if (!filtered.length) {
    projectGrid.innerHTML = `<div class="empty-state">No projects match that filter yet.</div>`;
    return;
  }

  projectGrid.innerHTML = filtered
    .map(
      (project) => `
        <article class="project-card">
          <div class="meta-row">
            <span class="category-chip">${project.category}</span>
            <div class="status-badges">
              ${project.status
                .map((status) => `<span class="status-chip ${statusClass(status)}">${status}</span>`)
                .join("")}
            </div>
          </div>
          <small>${project.system}</small>
          <h3>${project.name}</h3>
          <a class="project-url" href="${project.url}" target="_blank" rel="noreferrer">${project.url.replace(
            "https://",
            ""
          )}</a>
          <p>${project.description}</p>
          <div class="tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="card-footer">
            <span>${project.category.split(" ")[0]}</span>
            <a href="${project.url}" target="_blank" rel="noreferrer">Visit project ↗</a>
          </div>
        </article>
      `
    )
    .join("");
}

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderTabs();
  renderProjects();
});

searchInput.addEventListener("input", renderProjects);

renderStats();
renderTabs();
renderAgents();
renderProjects();
