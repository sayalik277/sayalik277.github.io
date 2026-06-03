import type { ExperienceItem } from '../types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Amazon (AWS)',
    role: 'Software Development Engineer 1',
    period: 'Nov 2021 – Feb 2023',
    current: false,
    description: [
      'Built a global serverless web app deployed to 300+ AWS service teams to manage feature launch dates, using AWS Lambda, API Gateway, and DynamoDB.',
      'Developed reusable IaC with AWS CDK (TypeScript), deploying secure and scalable cloud resources backed by CloudFormation templates.',
      'Created automated CI/CD pipelines with AWS CodePipeline and CodeBuild across multiple AWS accounts.',
      'Containerised microservices with Docker and orchestrated via Amazon ECS and EKS for efficient scaling.',
      "Integrated React.js with AWS's internal component library; built S3-backed Lambda APIs for internal stakeholders.",
      'Wrote Python scripts to automate DynamoDB data cleanup and legacy system migration.',
    ],
    tech: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'React', 'AWS CDK', 'TypeScript', 'Docker', 'ECS', 'EKS', 'Python', 'S3', 'CodePipeline'],
  },
  {
    company: 'CloudBig Technology',
    role: 'Software Development Engineer',
    period: 'Aug 2021 – Nov 2021',
    current: false,
    description: [
      'Designed and deployed scalable microservices using Spring Boot and REST APIs, enabling service decoupling and cloud platform integration.',
      'Built dynamic, responsive React.js frontends with state management, reducers, and Material UI.',
      'Containerised backend services with Docker and managed multi-container setups via Docker Compose.',
    ],
    tech: ['Spring Boot', 'REST APIs', 'React', 'Material UI', 'Docker', 'Docker Compose', 'Java'],
  },
  {
    company: 'Accenture Solutions Pvt. Ltd.',
    role: 'Application Development Analyst',
    period: 'Jun 2018 – Jun 2019',
    current: false,
    description: [
      'Built enterprise integration workflows with Java and Spring Boot, enabling reliable data exchange across distributed telecom systems.',
      'Designed RESTful services and SOA-based components to improve system interoperability.',
      'Wrote Python/Shell automation scripts that reduced manual validation effort by ~80%.',
      'Supported Jenkins-based CI/CD pipelines, build validation, and integration testing.',
    ],
    tech: ['Java', 'Spring Boot', 'Python', 'Shell', 'Jenkins', 'Oracle', 'MySQL', 'REST APIs', 'SOA'],
  },
  {
    company: 'Accenture Solutions Pvt. Ltd.',
    role: 'Application Development Associate',
    period: 'Nov 2016 – Jun 2018',
    current: false,
    description: [
      'Developed enterprise applications using Java, JSP, J2EE, and Spring framework (DI, MVC).',
      'Created automation scripts that reduced manual system-monitoring intervention by 90%.',
      'Built automated health-check tools for server environments, enabling proactive issue detection.',
      'Supported CI/CD using Jenkins and Git; contributed to incident resolution and root cause analysis.',
    ],
    tech: ['Java', 'JSP', 'J2EE', 'Spring', 'Oracle', 'SQL', 'Jenkins', 'Git'],
  },
]
