const SKILL_CATEGORIES = {
    'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
    'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
    'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
    'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest']
};

const ROUND_TEMPLATES = {
    enterprise: [
        { name: 'Online Assessment', focus: 'DSA + Aptitude', why: 'To filter candidates based on problem-solving speed and accuracy.' },
        { name: 'Technical Interview I', focus: 'Core DSA + Complexity', why: 'Deep dive into fundamental algorithms and data structures.' },
        { name: 'Technical Interview II', focus: 'System Design + Projects', why: 'Evaluating your ability to build scalable and maintainable systems.' },
        { name: 'Managerial / HR', focus: 'Culture + Goals', why: 'Ensuring alignment with company values and long-term vision.' }
    ],
    startup: [
        { name: 'Practical Coding', focus: 'Project Stack + Implementation', why: 'Startups need engineers who can hit the ground running with their stack.' },
        { name: 'System Discussion', focus: 'Architecture + Scalability', why: 'Evaluating how you think about building features from scratch.' },
        { name: 'Culture Fit', focus: 'Ownership + Communication', why: 'Ensuring you can thrive in a fast-paced, high-ownership environment.' }
    ]
};

const ENTERPRISE_COMPANIES = ['amazon', 'google', 'microsoft', 'meta', 'apple', 'netflix', 'infosys', 'tcs', 'wipro', 'hcl', 'accenture', 'capgemini', 'ibm', 'oracle', 'salesforce'];

export const analyzeJD = (company, role, jdText) => {
    const normalizedJD = jdText.toLowerCase();
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
    let totalCategories = 0;

    const MAPPING = {
        'Core CS': 'coreCS',
        'Languages': 'languages',
        'Web': 'web',
        'Data': 'data',
        'Cloud/DevOps': 'cloud',
        'Testing': 'testing'
    };

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const key = MAPPING[category];
        const foundKeywords = skills.filter(skill => {
            const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
            return regex.test(normalizedJD);
        });

        if (foundKeywords.length > 0) {
            extractedSkills[key] = foundKeywords;
            totalCategories++;
        }
    });

    // Default behavior if no skills detected
    const hasSkills = Object.values(extractedSkills).some(arr => arr.length > 0);
    if (!hasSkills) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    // 1. Company Intel Generation
    const isEnterprise = ENTERPRISE_COMPANIES.some(c => company.toLowerCase().includes(c));
    const companyIntel = {
        name: company || '',
        industry: normalizedJD.includes('finance') || normalizedJD.includes('bank') ? 'FinTech' :
            normalizedJD.includes('medical') || normalizedJD.includes('health') ? 'HealthTech' :
                'Technology Services',
        size: isEnterprise ? 'Enterprise (2000+)' : 'Startup (<200)',
        hiringFocus: isEnterprise ? 'Structured DSA + Core Fundamentals' : 'Practical Problem Solving + Stack Depth'
    };

    // 2. Dynamic Round Mapping
    const roundMapping = (isEnterprise ? [...ROUND_TEMPLATES.enterprise] : [...ROUND_TEMPLATES.startup]).map(r => ({
        roundTitle: r.name,
        focusAreas: [r.focus],
        whyItMatters: r.why
    }));

    if (!isEnterprise && extractedSkills.coreCS.length > 0) {
        roundMapping.splice(1, 0, {
            roundTitle: 'Technical Screening',
            focusAreas: ['Fundamentals + Logic'],
            whyItMatters: 'Startups often add an early screen if core CS skills are required.'
        });
    }

    // Score stability rules: baseScore computed only on analyze
    let baseScore = 35;
    baseScore += Math.min(totalCategories * 5, 30);
    if (company.trim()) baseScore += 10;
    if (role.trim()) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    const checklist = [
        { roundTitle: 'Round 1: Aptitude', items: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'] },
        { roundTitle: 'Round 2: Tech Foundation', items: ['Data Structures', 'Algorithms', 'OOPs Concepts'] },
        { roundTitle: 'Round 3: Specialization', items: ['Project Discussion', 'Tech Stack'] },
        { roundTitle: 'Round 4: HR', items: ['Behavioral', 'Goals'] }
    ];

    // Adapt checklist based on skills
    if (extractedSkills.web.length > 0) {
        checklist[2].items.push(...extractedSkills.web.map(s => `${s} Principles`));
    }

    const plan7Days = [
        { day: 'Day 1–2', focus: 'Basics & Core CS', tasks: ['OS Basics', 'Computer Networks', 'DBMS Fundamentals'] },
        { day: 'Day 3–4', focus: 'DSA & Coding', tasks: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs'] },
        { day: 'Day 5', focus: 'Projects & Alignment', tasks: ['Project Architecture', 'Resume Proofreading'] },
        { day: 'Day 6', focus: 'Mock Interviews', tasks: ['Behavioral Questions', 'Whiteboard Coding'] },
        { day: 'Day 7', focus: 'Final Revision', tasks: ['Sorting Algorithms', 'Weak Areas Review'] }
    ];

    const questions = [];
    if (normalizedJD.includes('sql')) questions.push('Explain indexing and when it helps optimization.');
    if (normalizedJD.includes('react')) questions.push('Explain state management options in React (Context vs Redux).');

    while (questions.length < 10) {
        const defaults = [
            'Describe a challenging project you worked on.',
            'How do you stay updated with latest technologies?',
            'Explain a time you resolved a conflict in a team.',
            'What are your strengths and weaknesses?',
            'Why do you want to join our company?'
        ];
        questions.push(defaults[questions.length % defaults.length]);
    }

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText: jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions: questions.slice(0, 10),
        baseScore: baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore,
        companyIntel
    };
};

export const saveAnalysis = (analysis) => {
    const history = JSON.parse(localStorage.getItem('prep_history') || '[]');
    history.unshift(analysis);
    localStorage.setItem('prep_history', JSON.stringify(history));
    localStorage.setItem('latest_analysis', JSON.stringify(analysis));
};

export const updateHistoryEntry = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(entry => entry.id === id);
    if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem('prep_history', JSON.stringify(history));

        // Also update latest_analysis if it's the one being modified
        const latest = getLatestAnalysis();
        if (latest && latest.id === id) {
            localStorage.setItem('latest_analysis', JSON.stringify(history[index]));
        }
    }
};

export const getHistory = () => JSON.parse(localStorage.getItem('prep_history') || '[]');
export const getLatestAnalysis = () => JSON.parse(localStorage.getItem('latest_analysis') || 'null');
