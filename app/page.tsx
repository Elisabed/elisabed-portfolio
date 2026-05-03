"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Project = {
  title: string;
  metrics: string[];
  image: string;
  overview: string;
  challenge: string;
  action: string;
  result: string;
  impact: string[];
  tech: string[];
  tag?: string;
  highlight?: boolean;
  domains?: string[];
};

type Route = "home" | "projects" | "contact";

function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50";
  const styles =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

const projects: Project[] = [
    {
  title: "Success Notes Ai — Customer Success Meeting Intelligence",
  tag: "AI Project",
  highlight: true,
  metrics: ["AI-Powered", "Real-World Workflow", "Time Savings"],
  image: "https://images.unsplash.com/photo-1667984390531-0e4b3b9c6e2e?auto=format&fit=crop&w=1600&q=80",
  overview:
    "Built an AI-powered assistant that transforms rough customer meeting notes into structured summaries, action items, and customer-ready communication.",
  challenge:
    "Customer Success Managers spend significant time manually converting meeting notes into structured updates, follow-ups, and CRM entries, leading to inefficiencies and inconsistency.",
  action:
    "Designed and developed an AI assistant using Python, Streamlit, and OpenAI API to automate meeting summaries, extract action items, identify risks, and generate follow-up emails with tone control for different audiences.",
  result:
    "Created a reusable workflow tool that produces consistent, high-quality meeting outputs in seconds, improving efficiency and communication quality.",
  impact: [
    "Reduced manual documentation time by ~70%",
    "Improved consistency in customer communication",
    "Enabled faster follow-ups and action tracking",
  ],
  tech: [
    "Python",
    "Streamlit",
    "OpenAI API",
    "Prompt Engineering",
    "Customer Success",
  ],
  domains: ["AI", "Customer Success", "Automation"],
}, 
  {
    title: "VisiumKMS — EHS Solution Deployments",
    metrics: ["100+ Customers", "8 Years", "Cloud & On-Prem"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Led deployment of tailored Environment, Health, and Safety software solutions for high-hazard industries.",
    challenge:
      "Deliver customized cloud-based and on-premise EHS platforms across complex customer environments while supporting compliance, risk management, and operational excellence.",
    action:
      "Partnered directly with customers to scope, configure, and deploy tailored VisiumKMS solutions across oil and gas, chemicals, and manufacturing organizations.",
    result:
      "Successfully supported 100+ customer deployments over 8 years, helping organizations improve safety workflows, compliance visibility, and operational consistency.",
    impact: [
      "Deployed tailored solutions at enterprise scale",
      "Supported regulated and high-hazard industries",
      "Improved customer adoption and operational readiness",
    ],
    tech: [
      "EHS Software",
      "Cloud Deployment",
      "On-Prem Deployment",
      "Customer Implementation",
    ],
    domains: ["Oil & Gas", "Chemicals", "Manufacturing"],
  },
  {
    title: "S&W Technologies — AWS Nuclear Monitoring Deployments",
    metrics: ["20 Customers", "4 Years", "AWS Cloud"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Delivered tailored AWS-hosted deployments for safety, security, and environmental monitoring software in the nuclear industry.",
    challenge:
      "Implement highly specialized customer solutions in a secure cloud environment for a regulated industry with strict operational requirements.",
    action:
      "Worked with customers and internal teams to deploy custom S&W Technologies solutions into AWS, aligning implementations to customer-specific monitoring and compliance needs.",
    result:
      "Supported approximately 20 customer deployments over 4 years, helping organizations modernize monitoring capabilities in secure cloud environments.",
    impact: [
      "Enabled AWS-based solution delivery",
      "Supported nuclear-industry customers",
      "Bridged customer needs with technical deployment",
    ],
    tech: [
      "AWS",
      "Customer Deployment",
      "Monitoring Software",
      "Implementation Management",
    ],
    domains: ["Nuclear", "Safety", "Environmental Monitoring"],
  },
  {
    title: "Enterprise Mobility — Mobile App Initiatives",
    metrics: ["Mobile App", "Customer Experience", "Cross-Functional"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Contributed to enterprise mobility projects focused on enhancing the customer-facing mobile application for car rentals.",
    challenge:
      "Improve usability, performance, and integration of mobile solutions within a complex enterprise environment.",
    action:
      "Collaborated with engineering, product, and infrastructure teams to support delivery of mobile app features and improvements.",
    result:
      "Enhanced mobile user experience and supported scalable mobile platform delivery.",
    impact: [
      "Improved customer experience",
      "Supported mobile-first strategy",
      "Enabled cross-team collaboration",
    ],
    tech: [
      "Mobile Applications",
      "IT Project Management",
      "Cross-functional Delivery",
    ],
  },
  {
    title: "Azure Cloud Migration",
    tag: "Flagship",
    highlight: false,
    metrics: ["64 Customers", "1 Year", "2hr Downtime"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    overview: "Enterprise-scale cloud migration from Virtual Machines stored in Rackspace to Azure.",
    challenge:
      "Migrate 64 enterprise customers within a fixed 12-month deadline while maintaining service continuity.",
    action:
      "Led architecture, staging validation, and production rollout using Azure App Services, AKS, Azure SQL, Storage, Key Vault, Azure AD, SSO, and monitoring.",
    result:
      "Delivered ahead of schedule with controlled downtime, stronger security, better observability, and improved scalability.",
    impact: [
      "64 customers successfully migrated",
      "Improved performance and monitoring",
      "Delivered ahead of schedule",
    ],
    tech: ["Azure", "AKS", "Azure SQL", "SSO", "Monitoring", "Key Vault"],
  },
  {
    title: "Enterprise Customer Portfolio",
    tag: "Current Portfolio",
    metrics: ["$2M–$10M ARR", "Multi-Industry", "Retention Focus"],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Managed a strategic portfolio of enterprise customers across multiple industries and technical environments.",
    challenge:
      "Align technical solutions with diverse business objectives while protecting retention and growing long-term value.",
    action:
      "Led business reviews, aligned solutions to customer goals, partnered across teams, and drove adoption across SaaS, networking, and compute environments.",
    result:
      "Improved customer health, reduced churn risk, and strengthened strategic relationships across the portfolio.",
    impact: [
      "Protected retention across key accounts",
      "Improved product adoption",
      "Strengthened customer relationships",
    ],
    tech: [
      "Customer Success",
      "Salesforce",
      "Cloud",
      "Stakeholder Management",
    ],
    domains: ["Banking", "Insurance", "Manufacturing", "Healthcare"],
  },
  {
    title: "Jira Transformation",
    metrics: ["8 Systems", "200–800 Users", "+25–50% Efficiency"],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Digital transformation of service operations across multiple business units.",
    challenge:
      "Replace fragmented manual support processes, including pen-and-paper workflows.",
    action:
      "Designed Jira Service Desk workflows, automation, and training to support multiple teams and user groups.",
    result:
      "Standardized service operations and improved efficiency by 25–50%.",
    impact: [
      "Standardized ITSM processes",
      "Reduced manual work",
      "Improved support visibility",
    ],
    tech: ["Jira Service Desk", "Workflow Automation", "ITSM"],
  },
  {
    title: "Backlog Elimination",
    metrics: ["300+ Tickets", "50% Faster", "3 Months"],
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
    overview: "Recovery initiative for a critical support backlog.",
    challenge:
      "A UK-based team faced a 2-year backlog that was hurting service quality and customer confidence.",
    action:
      "Led prioritization, coached a 21-person team, and introduced structured workflows and accountability.",
    result:
      "Cleared backlog in 3 months and improved resolution speed by 50%.",
    impact: [
      "Restored service levels",
      "Improved SLA performance",
      "Created sustainable support processes",
    ],
    tech: ["ITSM", "Leadership", "Process Improvement"],
  },
  {
    title: "Powell Industries — Warranty Project Management",
    metrics: ["Field Ops", "Issue Resolution", "Customer Retention"],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Led warranty-related projects resolving equipment issues across customer sites.",
    challenge:
      "Quickly diagnose and resolve critical equipment failures while maintaining customer trust.",
    action:
      "Dispatched engineers to sites, coordinated diagnostics, repair, or replacement of systems.",
    result:
      "Restored operations efficiently and maintained strong customer relationships.",
    impact: [
      "Reduced downtime",
      "Improved customer satisfaction",
      "Ensured operational continuity",
    ],
    tech: ["Field Operations", "Customer Support", "Project Coordination"],
  },
  {
    title: "Powell Industries — Enterprise Systems Transformation",
    metrics: ["30+ Apps", "Multi-Department", "System Overhaul"],
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Supported enterprise-wide transformation of legacy systems across front-end business functions.",
    challenge:
      "Understand and redesign processes across multiple departments to support new system implementations.",
    action:
      "Worked across Sales, Estimating, Project Management, Engineering, and Service to tailor solutions, administer systems, and train users.",
    result:
      "Enabled successful system adoption and improved operational efficiency.",
    impact: [
      "Bridged business and technology",
      "Improved system adoption",
      "Trained super users across departments",
    ],
    tech: ["Dynamics 365", "Oracle P6", "Oracle ERP", "System Integration"],
  },
  {
    title: "Powell Industries — Project Management Portfolio",
    metrics: ["25 Projects/Year", "3 Years", "95% On-Time"],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Led a high-volume portfolio of industrial and engineering projects delivering custom switchgear and power control systems.",
    challenge:
      "Manage multiple complex projects simultaneously while balancing timelines, budgets, engineering dependencies, and customer expectations.",
    action:
      "Oversaw end-to-end delivery, coordinated cross-functional teams, managed schedules in Primavera P6, and maintained direct communication with customers and stakeholders.",
    result:
      "Successfully delivered approximately 25 projects annually with 95% on-time and within budget performance.",
    impact: [
      "High-volume project delivery",
      "Strong customer satisfaction",
      "Efficient schedule and cost management",
    ],
    tech: [
      "Primavera P6",
      "Project Management",
      "Stakeholder Management",
      "Engineering Delivery",
    ],
  },
];

function NavLink({
  label,
  route,
  current,
  onNavigate,
}: {
  label: string;
  route: Route;
  current: Route;
  onNavigate: (route: Route) => void;
}) {
  const active = current === route;

  return (
    <button
      onClick={() => onNavigate(route)}
      className={`text-sm transition-colors ${
        active ? "font-semibold text-blue-700" : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {label}
    </button>
  );
}

function SiteNav({
  current,
  onNavigate,
}: {
  current: Route;
  onNavigate: (route: Route) => void;
}) {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => onNavigate("home")}
          className="text-lg font-bold tracking-tight text-blue-700"
        >
          Elisabed Ramirez
        </button>
        <div className="flex items-center gap-6">
          <a
            href="mailto:Ramirezelisabed@gmail.com"
            className="hidden text-sm text-gray-600 hover:text-blue-600 md:inline"
          >
            Ramirezelisabed@gmail.com
          </a>
          <NavLink label="Home" route="home" current={current} onNavigate={onNavigate} />
          <NavLink label="Projects" route="projects" current={current} onNavigate={onNavigate} />
          <NavLink label="Contact" route="contact" current={current} onNavigate={onNavigate} />
        </div>
      </div>
    </nav>
  );
}

function HomePage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <>
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-600"
            >
              Customer Success • Cloud Transformation • Technical Leadership
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-5xl font-bold leading-tight md:text-7xl"
            >
              Building enterprise outcomes through
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {" "}strategy, systems, and execution
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-6 max-w-2xl text-lg text-gray-600"
            >
              I lead complex technical initiatives across cloud migration, service transformation, and enterprise customer success—translating business priorities into measurable results.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                className="rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-6 text-white"
                onClick={() => onNavigate("projects")}
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                className="rounded-xl px-6 py-6"
                onClick={() => onNavigate("contact")}
              >
                Contact Me
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-blue-200/40 to-teal-200/40 blur-2xl" />
            <Card className="relative overflow-hidden rounded-[2rem] border-0 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                alt="Modern collaborative technology workspace"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Enterprise Impact</p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                  Cloud programs, customer portfolios, and service operations that scale
                </h2>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            { label: "Customers Managed / Migrated", value: "64+" },
            { label: "Enterprise ARR Portfolio", value: "$2M–$10M" },
            { label: "Efficiency Improvement", value: "25–50%" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -4 }}>
              <Card className="rounded-2xl border-0 bg-white/85 p-8 shadow-lg backdrop-blur">
                <p className="text-4xl font-bold text-blue-600">{item.value}</p>
                <p className="mt-2 text-sm text-gray-600">{item.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">About</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">A technical leader with a business-first lens</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              My work sits at the intersection of customer success, project delivery, and technical operations. I have led enterprise initiatives across cloud platforms, ITSM environments, and service organizations—helping teams modernize systems, improve reliability, and create better customer outcomes.
            </p>
          </div>
          <Card className="overflow-hidden rounded-[2rem] border-0 shadow-xl bg-white/90 backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
              alt="Woman presenting at a whiteboard"
              className="h-[360px] w-full object-cover"
            />
          </Card>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Featured Work</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">Selected projects with measurable impact</h2>
            </div>
            <Button
              variant="outline"
              className="hidden rounded-xl md:inline-flex"
              onClick={() => onNavigate("projects")}
            >
              Explore all projects
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <motion.div key={project.title} whileHover={{ y: -6 }}>
                <button className="w-full text-left" onClick={() => onNavigate("projects")}>
                  <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-lg transition-shadow hover:shadow-2xl">
                    <div className="relative">
                      <img src={project.image} alt={project.title} className="h-52 w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white">
                        {project.title}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-gray-600">{project.overview}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <span key={metric} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                            {metric}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm font-medium text-blue-600">View case study →</p>
                    </div>
                  </Card>
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Button variant="outline" className="w-full rounded-xl" onClick={() => onNavigate("projects")}>
              Explore all projects
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white shadow-2xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">Experience</p>
              <h2 className="mt-3 text-4xl font-bold">
                Career progression across customer success, cloud, projects, and enterprise systems
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "HPE — Service Experience Manager",
                desc: "Manage enterprise customer portfolios, drive retention, adoption, executive alignment, and business outcomes across complex technical environments.",
                tag: "Customer Success",
              },
              {
                title: "VisiumKMS & S&W — Head of Application Support & Cloud Infrastructure",
                desc: "Led global application support, cloud infrastructure, ITSM process improvement, and service reliability across multi-business operations.",
                tag: "Cloud & Operations",
              },
              {
                title: "Rolls-Royce — Technical Team Lead",
                desc: "Provided technical leadership in predictive monitoring, application support, diagnostics, and critical asset reliability programs.",
                tag: "Technical Leadership",
              },
              {
                title: "Enterprise Mobility — IT Project Manager",
                desc: "Led IT initiatives across distributed enterprise environments, coordinating stakeholders, technical teams, timelines, and business priorities.",
                tag: "Project Delivery",
              },
              {
                title: "Powell Industries — Project Manager",
                desc: "Delivered 95% of projects on time and within budget while managing schedules, stakeholders, customers, and cross-functional delivery teams.",
                tag: "Program Execution",
              },
              {
                title: "Powell Industries — Business Systems Analyst",
                desc: "Owned enterprise systems across Sales, Estimating, Project Management, Engineering, and Service, administering Dynamics 365, Oracle P6, and Oracle ERP while training super users.",
                tag: "Enterprise Systems",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur transition hover:bg-white/15"
              >
                <span className="inline-flex rounded-full bg-teal-400/15 px-3 py-1 text-xs font-medium text-teal-200">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  const [active, setActive] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const featured = useMemo(() => projects.filter((p) => p.highlight), []);
  const others = useMemo(() => projects.filter((p) => !p.highlight), []);

  return (
    <>
      <div className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-5xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Projects & Impact
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Enterprise-scale initiatives across cloud modernization, customer success, service operations, and technical transformation.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {featured.map((project) => (
          <motion.div key={project.title} whileHover={{ scale: 1.01 }} className="mb-20">
            <Card className="overflow-hidden rounded-[2rem] border-0 shadow-2xl">
              <button className="w-full text-left" onClick={() => setActive(project)}>
                <div className="relative">
                  <img src={project.image} alt={project.title} className="h-[420px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                      Flagship Case Study
                    </p>
                    <h2 className="mt-2 text-4xl font-bold">{project.title}</h2>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-lg text-gray-700">{project.overview}</p>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div key={metric} className="rounded-2xl bg-white p-4 text-center shadow">
                        <p className="text-xl font-bold text-blue-600">{metric}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            </Card>
          </motion.div>
        ))}

        <div className="grid gap-10 pb-20 md:grid-cols-2">
          {others.map((project) => (
            <motion.div key={project.title} whileHover={{ y: -5 }}>
              <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-lg">
                <button className="w-full text-left" onClick={() => setActive(project)}>
                  <div className="relative">
                    <img src={project.image} alt={project.title} className="h-60 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 right-4 text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-600">{project.overview}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.metrics.map((metric) => (
                        <span key={metric} className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[2rem] bg-white p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-blue-700">{active.title}</h2>
              <p className="mt-4">
                <strong>Overview:</strong> {active.overview}
              </p>
              <p className="mt-3">
                <strong>Challenge:</strong> {active.challenge}
              </p>
              <p className="mt-3">
                <strong>Action:</strong> {active.action}
              </p>
              <p className="mt-3">
                <strong>Result:</strong> {active.result}
              </p>

              <div className="mt-6">
                <strong>Impact:</strong>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                  {active.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {active.domains && (
                <div className="mt-6">
                  <strong>Industries:</strong>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.domains.map((domain) => (
                      <span key={domain} className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <strong>Tech Stack:</strong>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white"
                onClick={() => setActive(null)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ContactPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">Contact</p>
          <h1 className="mt-3 text-5xl font-bold text-slate-900">Let’s build something impactful</h1>
          <p className="mt-6 text-lg text-gray-600">
            Open to opportunities in customer success, technical program leadership, cloud transformation, and service operations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Enterprise Customer Success",
              "Cloud Transformation",
              "Technical Program Leadership",
              "Service Operations",
            ].map((item) => (
              <span key={item} className="rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 space-y-4 text-gray-700">
            <div className="rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-sm">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:Ramirezelisabed@gmail.com"
                  className="text-blue-600 underline underline-offset-4"
                >
                  Ramirezelisabed@gmail.com
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/in/elisabed-ramirez-b13952a0/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline underline-offset-4"
                >
                  linkedin.com/in/elisabed-ramirez-b13952a0
                </a>
              </p>
              <p>
                <strong>Focus Areas:</strong> Enterprise Customer Success, Cloud Transformation, Technical Operations
              </p>
            </div>
          </div>
        </div>
        <Card className="overflow-hidden rounded-[2rem] border-0 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1600&q=80"
            alt="Professional contact and collaboration visual"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </Card>
      </div>
    </section>
  );
}

export default function PortfolioSite() {
  const [route, setRoute] = useState<Route>("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-100 text-gray-900">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.12),transparent_28%)]" />
      <SiteNav current={route} onNavigate={setRoute} />
      <AnimatePresence mode="wait">
        <motion.main
          key={route}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
        >
          {route === "home" && <HomePage onNavigate={setRoute} />}
          {route === "projects" && <ProjectsPage />}
          {route === "contact" && <ContactPage />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
