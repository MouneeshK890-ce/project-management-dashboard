export const STATUSES = [
  "Need to Do",
  "In Progress",
  "Need for Test",
  "Completed",
  "Re-open",
];

export const demoEmployees = [
  {
    id: "emp-1",
    name: "Ava Wilson",
    position: "Frontend Developer",
    email: "ava@company.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "emp-2",
    name: "Liam Chen",
    position: "Backend Developer",
    email: "liam@company.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "emp-3",
    name: "Mia Johnson",
    position: "UI/UX Designer",
    email: "mia@company.com",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "emp-4",
    name: "Noah Patel",
    position: "Project Manager",
    email: "noah@company.com",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
  },
];

export const demoProjects = [
  {
    id: "proj-1",
    title: "E-Commerce Platform",
    description:
      "Improve the portal experience with a modern responsive design and cleaner navigation.",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80",
    startDate: "2026-03-20T09:00",
    endDate: "2026-04-05T18:00",
    employeeIds: ["emp-1", "emp-2", "emp-4"],
  },
  {
    id: "proj-2",
    title: "Mobile Banking App",
    description:
      "Build a lightweight dashboard for managing tasks, assignees, and delivery progress.",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&q=80",
    startDate: "2026-03-22T10:00",
    endDate: "2026-04-12T18:30",
    employeeIds: ["emp-2", "emp-3", "emp-4"],
  },
];

export const demoTasks = [
  {
    id: "task-1",
    title: "Setup project structures",
    description: "Initialize repo and configure build tools",
    projectId: "proj-1",
    employeeId: "emp-1",
    eta: "2026-03-27T18:00",
    referenceImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
           ],
    status: "Completed",
  },
  {
    id: "task-2",
    title: "Design product page",
    description: "Create wireframes and mockups for product listing",
    projectId: "proj-1",
    employeeId: "emp-1",
    eta: "2026-03-29T16:00",
    referenceImages: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=500&q=80"
        ],
    status: "In Progress",
  },
  {
    id: "task-3",
    title: "Build REST API",
    description: "Implement product and order endpoints",
    projectId: "proj-1",
    employeeId: "emp-2",
    eta: "2026-03-31T15:00",
    referenceImages: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=500&q=80"
        ],
    status: "Need to Do",
  },
  {
    id: "task-4",
    title: "Payment integration",
    description: "Integrate Stripe payment gateway",
    projectId: "proj-1",
    employeeId: "emp-2",
    eta: "2026-03-26T19:00",
    referenceImages: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80"
        ],
    status: "Need to Do",
  },
  {
    id: "task-5",
    title: "User research",
    description: "Conduct user interviews for banking app",
    projectId: "proj-2",
    employeeId: "emp-3",
    eta: "2026-03-30T12:00",
    referenceImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
        ],
    status: "Completed",
  },
  {
    id: "task-6",
    title: "Design system",
    description: "Create design tokens and component library",
    projectId: "proj-2",
    employeeId: "emp-3",
    eta: "2026-03-28T11:30",
    referenceImages: [
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=500&q=80"
        ],
    status: "In Progress",
  },
  {
    id: "task-7",
    title: "Backend architecture",
    description: "Design microservices architecture",
    projectId: "proj-2",
    employeeId: "emp-2",
    eta: "2025-04-15T17:00",
    referenceImages: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80"],
    status: "Need for Test",
  },
  {
    id: "task-8",
    title: "Sprint planning",
    description: "Plan Q2 sprints for both projects",
    projectId: "proj-2",
    employeeId: "emp-4",
    eta: "2025-03-20T17:00",
    referenceImages: ["https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80"],
    status: "Re-open",
  },
];
