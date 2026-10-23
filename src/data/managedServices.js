// Content for the Managed Services pages (one entry per page).
// Sections: hero, what, problems, delivers, steps, tools, benefits, suits, cta.
// `delivers` items may be a plain string or [lead, text].

export const contact = {
  phones: [
    { label: '+91 22-20811955', href: 'tel:+912220811955' },
    { label: '+91 98675 09470', href: 'tel:+919867509470' },
  ],
  site: { label: 'www.pbmpl.com', href: 'https://www.pbmpl.com' },
};

export const managedServices = {
  noc: {
    slug: 'network-operations-center',
    name: 'Network Operations Centre',
    seoTitle: 'Network Operations Centre (NOC) Services | PACE Business Machines',
    hero: {
      headline: 'Know about network problems before your team does.',
      sub: "PACE's Network Operations Centre watches the performance of your network, so slowdowns and failures are found and fixed early.",
      button: 'Talk to us about NOC',
    },
    what: [
      'A Network Operations Centre, or NOC, is a team and set of tools that continuously monitors the health and performance of your network: switches, routers, links, Wi-Fi and the devices connected to them. When something drifts out of its normal range, the NOC sees it, investigates and acts.',
    ],
    problems: [
      'Slow internet and network congestion that no one can pin down.',
      'Links and devices that fail without warning.',
      'Staff reporting problems only after work has already stopped.',
      'No record of what changed when something broke.',
    ],
    delivers: [
      'Continuous monitoring of network devices and links.',
      'Alerts when performance falls or a device stops responding.',
      'Investigation and resolution of network incidents.',
      'Performance and availability reports.',
      'Coordination with your internet and link providers.',
      'Recommendations for upgrades and configuration changes.',
    ],
    steps: [
      'We map your network and agree what to monitor.',
      'We set up monitoring and alert thresholds.',
      'Our team watches, investigates and resolves issues as alerts arrive.',
      'You receive regular reports and improvement suggestions.',
    ],
    tools: [
      'Network monitoring and alerting tools',
      'Switches, routers and wireless controllers',
      'WAN and internet links',
      'Reporting dashboards',
    ],
    benefits: [
      'Problems found early, not after users complain.',
      'Less network downtime.',
      'Clear visibility into how the network performs.',
      'Better-informed upgrade decisions.',
    ],
    suits:
      'Organisations with many users, several locations or systems that must stay online, such as offices, schools, hospitals, factories and retail chains.',
    cta: {
      headline: 'Want to see what is really happening on your network?',
      text: 'Start with a network audit or talk to our team.',
      button: 'Request a consultation',
    },
  },

  soc: {
    slug: 'security-operations-center-soc',
    name: 'Security Operations Centre',
    seoTitle: 'Security Operations Centre (SOC) Services | PACE Business Machines',
    hero: {
      headline: 'Spot cyber threats early. Act before they become incidents.',
      sub: "PACE's Security Operations Centre keeps watch over your systems for suspicious activity, so threats are detected and handled quickly.",
      button: 'Talk to us about SOC',
    },
    what: [
      'A Security Operations Centre, or SOC, is a team and set of tools focused on cybersecurity. It collects security signals from your network, devices and applications, spots activity that looks wrong, and guides the response. Where a NOC looks after performance, a SOC looks after protection.',
    ],
    problems: [
      'Threats that sit unnoticed because nobody is watching security logs.',
      'Firewalls and antivirus installed but never reviewed.',
      'No clear steps to follow when something suspicious happens.',
      'Pressure to show customers, auditors or management that security is being monitored.',
    ],
    delivers: [
      'Continuous monitoring for suspicious activity across your network and systems.',
      'Alert review, so your team sees real concerns instead of noise.',
      'Guidance and support when an incident is detected.',
      'Regular security reports with findings and recommendations.',
      'Review of firewall and device security settings.',
      'Advice on closing gaps found along the way.',
    ],
    steps: [
      'We review your environment and agree what to protect.',
      'We connect the monitoring tools to your devices and network.',
      'Our team reviews alerts and investigates anything suspicious.',
      'You get incident guidance and regular reports with next steps.',
    ],
    tools: [
      'Security monitoring and log analysis tools',
      'Firewalls and network security devices',
      'Endpoint protection',
      'Reporting dashboards',
    ],
    benefits: [
      'Suspicious activity found earlier.',
      'Clearer view of your security position.',
      'Less guesswork when an incident happens.',
      'Evidence of monitoring for customers and auditors.',
    ],
    suits:
      'Organisations that handle sensitive data or depend on constant availability, such as financial firms, hospitals, schools, manufacturers and growing enterprises.',
    cta: {
      headline: 'Not sure how secure you are?',
      text: 'Start with a security audit and a clear report.',
      button: 'Book a security audit',
    },
  },

  rim: {
    slug: 'manage-your-infrastructure-remotely-with-pace',
    name: 'Remote Infrastructure Management',
    seoTitle: 'Remote Infrastructure Management (RIM) Services | PACE Business Machines',
    hero: {
      headline: 'Your servers, storage and systems, managed from wherever our team sits.',
      sub: 'PACE manages and monitors your IT infrastructure remotely, so routine issues are handled quickly without waiting for a site visit.',
      button: 'Talk to us about RIM',
    },
    what: [
      "Remote Infrastructure Management means PACE's engineers look after your servers, storage, backup, network and other core systems over a secure remote connection. Routine monitoring, updates, troubleshooting and fixes happen without anyone travelling to your site. If hardware needs hands-on attention, we send an engineer.",
    ],
    problems: [
      'No in-house team to monitor servers and systems.',
      'Waiting for a site visit to fix issues that could be solved remotely.',
      'Updates, patches and housekeeping that get postponed.',
      'Several locations with different setups and no single point of care.',
    ],
    delivers: [
      'Remote monitoring of servers, storage and backup systems.',
      'Routine health checks and housekeeping.',
      'Updates and patches planned with your approval.',
      'Remote troubleshooting and incident resolution.',
      'Escalation to an on-site engineer when hardware needs attention.',
      'Periodic reports on system health and activity.',
    ],
    steps: [
      'We list the systems and locations to be managed.',
      'We set up a secure remote access and monitoring.',
      'Our engineers run routine checks and respond to alerts.',
      'We report regularly and send an engineer on site when required.',
    ],
    tools: [
      'Remote monitoring and management tools',
      'Servers, storage and virtualisation',
      'Backup and recovery systems',
      'Secure remote access',
    ],
    benefits: [
      'Faster fixes for routine problems.',
      'Fewer interruptions for your own staff.',
      'Consistent upkeep across all locations.',
      'Predictable support instead of one-off emergency calls.',
    ],
    suits:
      'Small and mid-sized organisations without a full IT team, and multi-location businesses that want one standard of care.',
    cta: {
      headline: 'Want your infrastructure looked after without the headcount?',
      text: 'Tell us what you run and where.',
      button: 'Request a consultation',
    },
  },

  'service-desk': {
    slug: 'it-service-desk',
    name: 'IT Service Desk',
    seoTitle: 'IT Service Desk and Helpdesk Support | PACE Business Machines',
    hero: {
      headline: 'One place for every IT problem. One team to solve it.',
      sub: "PACE's IT Service Desk gives your staff a single point to report issues and get them resolved, so work gets back on track.",
      button: 'Talk to us about the Service Desk',
    },
    what: [
      "An IT Service Desk is the first point of contact for everything IT: a laptop that won't start, an email that won't send, a printer that has stopped, a new joiner who needs access. Each request is logged, assigned, tracked and closed, so nothing gets lost and you can see how issues are handled.",
    ],
    problems: [
      'Staff chasing different people for IT help.',
      'Issues forgotten because they were raised on calls or in passing.',
      'No record of how often the same problem repeats.',
      'IT work interrupting the people who should be doing something else.',
    ],
    delivers: [
      'A single contact route for your staff: phone, email or ticket.',
      'Logging and tracking of every request.',
      'First-level troubleshooting, with escalation to specialists when needed.',
      'On-site visits when an issue needs hands-on work.',
      'New user setup and access requests.',
      'Regular reports on volumes, response and repeat issues.',
    ],
    steps: [
      'We agree the services, contacts and working hours.',
      'Your staff raise issues through the agreed channel.',
      'Each ticket is assigned, worked on and updated until closed.',
      'We review reports with you and fix the causes of repeat issues.',
    ],
    tools: [
      'Ticketing and service management tools',
      'Remote support tools',
      'Knowledge base for common fixes',
      'Reporting dashboards',
    ],
    benefits: [
      'Faster resolution of everyday issues.',
      'Less time lost by staff waiting for help.',
      'A clear record of requests and outcomes.',
      'Insight into recurring problems.',
    ],
    suits:
      'Any organisation where staff depend on laptops, email, printers and business applications, and where there is no dedicated IT helpdesk.',
    cta: {
      headline: 'Tired of IT problems eating into your day?',
      text: 'Let us take the calls.',
      button: 'Request a consultation',
    },
  },

  amc: {
    slug: 'annual-maintenance-contracts',
    name: 'AMC & Multi Vendor Support',
    seoTitle: 'Annual Maintenance Contracts (AMC) and Multi Vendor IT Support | PACE',
    hero: {
      headline: "Don't wait for a breakdown. Maintain your IT on a plan.",
      sub: "PACE's Annual Maintenance Contracts cover your IT equipment on a schedule, across all the brands you use, under one agreement and one point of contact.",
      button: 'Talk to us about AMC',
    },
    what: [
      'An Annual Maintenance Contract, or AMC, is a yearly agreement for the regular care of your IT equipment: computers, servers, printers, networking gear and more. Multi Vendor Support means PACE looks after equipment from many manufacturers, including devices we did not sell, so you deal with one partner instead of many.',
    ],
    problems: [
      'Equipment that is only looked at after it fails.',
      'Expensive, unplanned repairs.',
      'Chasing a different vendor for each brand and each warranty.',
      'No clear record of what equipment you have and when it was last serviced.',
    ],
    delivers: [
      'Scheduled preventive maintenance visits.',
      'Breakdown support under the agreed scope.',
      'Support across multiple brands under one contract.',
      'Coordination with manufacturers for warranty and spare parts where applicable.',
      'An equipment inventory and service history.',
      'A defined scope, so you know what is covered.',
    ],
    steps: [
      'We list your equipment and agree the scope of cover.',
      'We schedule preventive maintenance visits.',
      'When something fails, you raise a call and we respond under the agreed terms.',
      'We keep service records and review the contract with you each year.',
    ],
    tools: [
      'Desktops, laptops and servers',
      'Printers and multifunction devices',
      'Switches, routers and Wi-Fi',
      'CCTV and surveillance',
      'Backup systems and UPS',
      'Equipment inventory and ticketing tools',
    ],
    benefits: [
      'Problems caught before they become breakdowns.',
      'More predictable IT costs.',
      'One contact for every brand.',
      'A longer, healthier life for your equipment.',
    ],
    suits:
      'Organisations with a mix of equipment and brands and no full-time IT team: offices, schools, clinics, factories and retail outlets.',
    cta: {
      headline: 'Maintain smarter with PACE AMC.',
      text: 'Share a list of your equipment and we will suggest a plan.',
      button: 'Get an AMC quote',
    },
  },

  fms: {
    slug: 'facility-management-services',
    name: 'Facility Management Services',
    seoTitle: 'Facility Management Services (FMS) | PACE Business Machines',
    hero: {
      headline: 'Optimise your space. Enhance efficiency.',
      sub: "Ensure the smooth operation of your facilities, delivered by PACE's team of expert engineers and proven best practices.",
      button: 'Talk to us about FMS',
    },
    what: [
      'Managing facilities efficiently is crucial for any business, but it can be complex and time-consuming. PACE Facility Management Services take that burden off your shoulders. Our engineers, help desk and processes look after your facilities day to day, so you can focus on your core business.',
    ],
    problems: [
      'Too much management time spent on upkeep instead of the business.',
      'Equipment that is repaired only after it breaks.',
      'Uncertain staffing for technical roles on site.',
      'Limited visibility into how facilities actually perform.',
    ],
    delivers: [
      ['Expert staff.', 'Domain-specific engineers who provide technical support for your facility needs.'],
      ['Monitoring and support, 24/7.', 'Round-the-clock monitoring and support to address issues promptly and minimise downtime.'],
      ['Manpower management.', 'Skilled personnel such as Resident Engineers, Maintenance Engineers and Database Administrators (DBA) as needed.'],
      ['Help desk, 24/7.', 'A dedicated help desk for any facility-related inquiries or issues.'],
      ['Preventive maintenance.', 'A program to identify and address potential problems before they cause disruption.'],
      ['Monitoring and feedback.', 'Real-time insight into facility performance, with regular feedback loops so the service keeps pace with your needs.'],
    ],
    steps: [
      'We review your facilities, current pain points and existing maintenance practices.',
      'We propose an FMS scope covering staffing, monitoring and maintenance, matched to your sites.',
      'Your dedicated account manager and on-site engineers take over.',
      'Standard processes, ongoing training and regular feedback keep the service consistent.',
    ],
    tools: [
      'Facility monitoring and alerting tools',
      'Help desk and ticketing systems',
      'Preventive maintenance schedules and records',
      'Reporting and review dashboards',
    ],
    benefits: [
      'Efficiency and cost savings through better use of resources and manpower.',
      'Better uptime and productivity from proactive maintenance and monitoring.',
      'Longer life for building equipment and infrastructure.',
      'Comfort and safety for employees and visitors.',
      'Peace of mind and more focus on the core business.',
    ],
    suits:
      'Organisations that operate buildings, campuses, plants or multiple sites and want one accountable partner for technical upkeep. Facilities of all sizes, since the service scales with the site.',
    cta: {
      headline: "Let's design your facility management.",
      text: 'A short conversation is usually enough to scope where PACE can take the most weight off your team.',
      button: 'Talk to us about Facility Management',
    },
  },

  cloud: {
    slug: 'cloud-managed-services',
    name: 'Cloud Managed Services',
    seoTitle: 'Cloud Managed Services | PACE Business Machines',
    hero: {
      headline: 'Use the cloud with a partner who runs it with you.',
      sub: 'PACE helps you plan, move to and manage cloud services, so you get the flexibility of the cloud without the guesswork.',
      button: 'Talk to us about cloud',
    },
    what: [
      'Cloud Managed Services means PACE plans, sets up and looks after your cloud environment: servers, storage, backup, email and business applications hosted in the cloud. We help you decide what belongs in the cloud and what stays on-premise, and then keep it monitored, secured and supported.',
    ],
    problems: [
      'Unsure what should move to the cloud and what should not.',
      'Cloud services set up once and never reviewed.',
      'Bills and usage that no one tracks.',
      'No one accountable when a cloud service has a problem.',
      'Backup and security assumed rather than checked.',
    ],
    delivers: [
      'Assessment of which workloads suit the cloud.',
      'Planning and migration support.',
      'Monitoring of cloud services and performance.',
      'Backup and recovery for cloud workloads.',
      'Security configuration and access review.',
      'Ongoing support and regular reviews of usage and cost.',
    ],
    steps: [
      'We assess your current setup and goals.',
      'We design the cloud plan and agree what moves and when.',
      'We migrate in stages, with testing at each step.',
      'We monitor, support and review the environment on a regular schedule.',
    ],
    tools: [
      'Public and hybrid cloud platforms',
      'Cloud storage and backup',
      'Virtual servers and virtual desktops',
      'Identity and access controls',
      'Monitoring and reporting tools',
    ],
    benefits: [
      'Capacity that can grow or shrink with the business.',
      'Clear ownership for cloud operations.',
      'Protected data with tested recovery.',
      'Better control over cloud spending.',
    ],
    suits:
      'Growing businesses, multi-location teams and organisations moving from on-premise servers who want a guided, staged approach.',
    cta: {
      headline: 'Thinking about the cloud but not sure where to start?',
      text: 'Talk to us about what you run today and where you want to go.',
      button: 'Request a consultation',
    },
  },
};
