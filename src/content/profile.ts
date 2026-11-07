/**
 * Single source of truth for the site. Mirrors LinkedIn (linkedin.com/in/coryjanowski).
 *
 * Everything is `as const satisfies …`: the object is checked against the schema
 * but keeps its literal types, so components can derive unions from the data
 * (section ids, tech names, company names) instead of repeating them.
 */
import type { Span, YearMonth } from '@/lib/dates'

// ---------- vocabulary ----------

export const TECH = [
  'Python', 'Go', 'TypeScript', 'JavaScript', 'Rust', 'Swift', 'Java', 'SQL',
  'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Argo CD', 'Helm',
  'Postgres', 'BigQuery', 'Airflow', 'GraphQL', 'gRPC', 'SQS', 'Cognito',
  'DataDog', 'Grafana', 'OpenTelemetry', 'PagerDuty', 'Looker',
  'LangChain', 'LangSmith', 'Claude Code', 'LLM agents', 'RAG',
  'Node.js', 'React', 'MongoDB', 'Socket.io', 'Scrapy', 'dbt',
  'Obsidian', 'd3', 'macOS', 'YAML', 'Spring',
] as const
export type Tech = (typeof TECH)[number]

// ---------- schema ----------

export interface Role {
  company: string
  title: string
  location: string
  span: Span
  bullets: readonly string[]
}

export interface Project<S extends readonly Tech[] = readonly Tech[]> {
  name: string
  repo: `https://github.com/cjanowski/${string}`
  blurb: string
  stack: S
  /** Must be one of `stack`; enforced by `defineProject`. */
  primary: S[number]
  featured?: boolean
  demo?: `https://${string}`
}

/**
 * Identity function whose only job is the type check: `primary` has to be an
 * element of that project's own `stack`. `const S` keeps the stack as a tuple of
 * literals, so `primary: 'Go'` on a Rust-only project is a compile error.
 */
export const defineProject = <const S extends readonly Tech[]>(p: Project<S>) => p

// ---------- data ----------

export const profile = {
  name: 'Cory Janowski',
  title: 'Software Engineer, AI & Backend',
  company: 'Tend',
  location: 'Fort Wayne, Indiana',
  careerStart: '2015-06' satisfies YearMonth,
  email: 'coryjanowski@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/coryjanowski/',
    github: 'https://github.com/cjanowski',
  },
  roles: ['agentic LLM workflows', 'distributed systems', 'data pipelines', 'observability & on-call'],
  about: [
    'Backend and AI software engineer, including six years at Apple. I build the systems that have to keep working: data pipelines, APIs, agentic LLM workflows, and the observability and on-call practice around them.',
    'At Tend I design GraphQL and AWS backend features and production agentic task loops in Python and TypeScript. Tuning SQS and API retry, backoff, and jitter logic cut timeout errors and failed jobs by over 90%, and fixing bottlenecks in our multi-agent architecture reduced outages 25%.',
  ],
  metrics: [
    { value: '90%', label: 'fewer timeouts & failed jobs at Tend' },
    { value: '50 GB+', label: 'compressed payloads through Go ingestion' },
    { value: '150+', label: 'data sources integrated at Abre' },
  ],
  topSkills: ['Distributed Systems', 'Python', 'Go', 'TypeScript', 'AWS'],
  stack: {
    Languages: ['Python', 'Go', 'TypeScript', 'Java', 'SQL'],
    'Cloud & infra': ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
    Data: ['Postgres', 'BigQuery', 'Airflow', 'GraphQL', 'gRPC'],
    Observability: ['DataDog', 'Grafana', 'OpenTelemetry', 'PagerDuty'],
    'AI & agents': ['LangChain', 'LangSmith', 'Claude Code', 'LLM agents', 'RAG'],
  },
  experience: [
    {
      company: 'Tend',
      title: 'Software Engineer',
      location: 'Nashville, Tennessee',
      span: { start: '2026-05', end: 'present' },
      bullets: [
        'Design and build backend features and GraphQL APIs on AWS for a TypeScript and Python full-stack platform.',
        'Architect production agentic task loops and multi-agent systems with LLM libraries, automating workflows that previously required manual intervention.',
        'Tuned SQS and API retry, backoff, and jitter logic, cutting timeout errors and failed jobs by over 90%.',
        'Led debugging and optimization of the distributed agent architecture, reducing system outages 25%.',
        'Built AI verification and status labeling for the insurance-tracking pipeline, improving its reliability.',
        'Built admin user backends with Cognito integration and metrics dashboards for observability and proactive monitoring.',
        'Led integration of Claude into the codebase and backend (skills, context, tooling).',
      ],
    },
    {
      company: 'Abre',
      title: 'Software Engineer II',
      location: 'Cincinnati, Ohio',
      span: { start: '2024-01', end: '2026-04' },
      bullets: [
        'Architected fault-tolerant data-ingestion infrastructure in Go processing 50 GB+ compressed payloads, with custom binary codec parsers and exponential-backoff retries; the design patterns were later adopted by three engineering teams.',
        'Designed service architecture for a cloud data integration platform connecting 150+ data sources into BigQuery via REST and gRPC APIs, reducing primary datastore load and enabling analytics queries.',
        'Created scripted deployment templates that cut deployment time from hours to minutes.',
        'Led the end-to-end update of the Data Monitoring Center, including drag-and-drop SFTP; support escalations for SFTP credentials fell 90%.',
        'Mentored two new engineers and ran design and code reviews for the Data Integrations UI.',
        'Managed the PagerDuty on-call rotation for P0 incidents, improved logging and alerting to reduce MTTR, and wrote three standardized incident runbooks.',
      ],
    },
    {
      company: 'Total Expert',
      title: 'Engineer II, Reliability/QA',
      location: 'Minneapolis–St. Paul',
      span: { start: '2021-06', end: '2023-12' },
      bullets: [
        "Designed and implemented the team's observability strategy on DataDog and AWS: real-time dashboards, alerting, telemetry, and centralized logging across distributed microservices, establishing early issue detection.",
        'Led a database performance initiative, re-architecting core SQL queries and cutting execution times 50% for high-frequency queries.',
        'Built automation testing frameworks and monitoring for the platform.',
        'Provided on-call site support, trained new hires, and led proactive bug hunting.',
      ],
    },
    {
      company: 'Apple',
      title: 'Software Engineer, Cellular/Wireless',
      location: 'Cupertino, California',
      span: { start: '2015-06', end: '2021-06' },
      bullets: [
        'Engineered and automated a Python error-reporting pipeline for wireless testing workflows, reducing issue acknowledgment time to under 4 hours and enabling rapid triage of critical bugs.',
        'Maintained backend cron and Apache Airflow systems for wireless network analytics at 99.9% job reliability.',
        'Monitored and enhanced cellular baseband observability across test fleets.',
        'Built Looker dashboards that turned complex wireless metrics into actionable insights for cross-functional stakeholders, improving data accessibility 40%.',
      ],
    },
  ],
  education: [
    {
      school: 'Woz U',
      credential: 'University Diploma, Data Science',
      span: { start: '2020-01', end: '2020-12' },
      detail: 'Data science and machine learning program: NLP, TensorFlow, PyTorch, scikit-learn, Python, R, SQL.',
    },
    {
      school: 'Regis University',
      credential: 'Coursework (non-degree), Computer Science',
      span: { start: '2017-01', end: '2018-06' },
      detail: 'Java I and II, programming and CS foundations.',
    },
  ],
  certifications: [
    { name: 'Training Neural Networks in Python', issuer: 'LinkedIn Learning', issued: '2023-03' },
    { name: 'Advance Your Skills in Deep Learning and Neural Networks', issuer: 'LinkedIn Learning', issued: '2022-11' },
    { name: 'Advance Your Skills in AI and Machine Learning', issuer: 'LinkedIn Learning', issued: '2022-11' },
  ],
  projects: [
    defineProject({
      name: 'claude-activity-graph',
      repo: 'https://github.com/cjanowski/claude-activity-graph',
      demo: 'https://cjanowski.github.io/claude-activity-graph/',
      blurb: 'A coding agent that keeps its own engineering record as a typed knowledge graph. A rule, a skill and a Stop hook make Claude Code log tasks, decisions and lessons into Obsidian; stdlib tools lint the graph and measure how lessons get reused across projects.',
      stack: ['Python', 'Claude Code', 'Obsidian', 'd3'],
      primary: 'Claude Code',
      featured: true,
    }),
    defineProject({
      name: 'RobotBar',
      repo: 'https://github.com/cjanowski/RobotBar',
      blurb: 'macOS menu bar app that shows AI token usage at a glance.',
      stack: ['Swift', 'macOS'],
      primary: 'Swift',
    }),
    defineProject({
      name: 'toml-and-jerry',
      repo: 'https://github.com/cjanowski/toml-and-jerry',
      blurb: 'Polyglot config validator for TOML, YAML and JSON, written in Rust.',
      stack: ['Rust', 'YAML'],
      primary: 'Rust',
    }),
    defineProject({
      name: 'ragzzy',
      repo: 'https://github.com/cjanowski/ragzzy',
      blurb: 'Self-training AI customer-support bot with real-time chat and routing.',
      stack: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Socket.io', 'RAG'],
      primary: 'RAG',
    }),
    defineProject({
      name: 'proxy-rot',
      repo: 'https://github.com/cjanowski/proxy-rot',
      blurb: 'Proxy creation and rotation across GCP and AWS, deployed with Terraform.',
      stack: ['Python', 'Terraform', 'AWS', 'GCP'],
      primary: 'Terraform',
    }),
    defineProject({
      name: 'scrapy_play',
      repo: 'https://github.com/cjanowski/scrapy_play',
      blurb: 'Crawlers that feed a dbt transformation layer for collection and analytics.',
      stack: ['Python', 'Scrapy', 'dbt'],
      primary: 'Scrapy',
    }),
    defineProject({
      name: 'Logs-and-Alerting',
      repo: 'https://github.com/cjanowski/Logs-and-Alerting',
      blurb: 'Log parser with configurable alert rules for incident response.',
      stack: ['Python', 'YAML'],
      primary: 'Python',
    }),
    defineProject({
      name: 'k8s-python-argocd',
      repo: 'https://github.com/cjanowski/k8s-python-argocd',
      blurb: 'GitOps deployment boilerplate for Python services on Kubernetes.',
      stack: ['Python', 'Kubernetes', 'Argo CD', 'Helm', 'Docker'],
      primary: 'Kubernetes',
    }),
  ],
} as const satisfies {
  experience: readonly Role[]
  projects: readonly Project[]
  stack: Record<string, readonly Tech[]>
  careerStart: YearMonth
  [k: string]: unknown
}

export type Profile = typeof profile
export type Company = Profile['experience'][number]['company'] // 'Tend' | 'Abre' | 'Total Expert' | 'Apple'

// ---------- sections (nav, command palette and anchors all derive from this) ----------

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
] as const
export type SectionId = (typeof SECTIONS)[number]['id']
