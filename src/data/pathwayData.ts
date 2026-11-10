import { EducationLevel, Course, EntranceExam, Career, SwitchingRoute } from '../types';

export const EDUCATION_LEVELS: EducationLevel[] = [
  {
    id: '12th_pcm',
    name: '12th Science (PCM)',
    badge: 'Core Focus',
    category: '12th',
    tagline: 'Physics, Chemistry & Mathematics Stream',
    description: 'The widest range of technological, scientific, design, architectural, defence, and numerical career pathways.',
    typicalAge: '17 - 18 years',
    keyStreamsUnlocked: ['Engineering (B.Tech)', 'Architecture (B.Arch)', 'Design (B.Des)', 'Pure & Applied Sciences', 'Defence (NDA)', 'Aviation & Marine'],
    courseIds: [
      'btech_cse', 'btech_ece', 'btech_mech', 'btech_aerospace', 'btech_civil',
      'bdes_design', 'barch', 'bca_cs', 'bsc_cs_ds', 'bsc_math_stat',
      'bsc_physics', 'nda_pcm', 'commercial_pilot', 'merchant_navy',
      'actuarial_science', 'integrated_msc', 'bba_ipm', 'ballb_tech'
    ]
  },
  {
    id: '10th_pass',
    name: 'After 10th Standard',
    badge: 'Foundation',
    category: '10th',
    tagline: 'Secondary School Certificate / Matriculation',
    description: 'Critical fork where students choose their 10+2 stream (Science PCM, PCB, Commerce, Arts) or Polytechnic Diploma.',
    typicalAge: '15 - 16 years',
    keyStreamsUnlocked: ['11th Science (PCM / PCB / PCMB)', '11th Commerce (with/without Math)', '11th Arts & Humanities', '3-Year Polytechnic Diploma (Lateral Entry to B.Tech)'],
    courseIds: [
      'polytechnic_diploma', 'btech_cse', 'bdes_design', 'bca_cs', 'nda_pcm', 'bcom_fintech', 'ballb_tech'
    ]
  },
  {
    id: '12th_pcb',
    name: '12th Science (PCB/PCMB)',
    badge: 'Medical & Life Sci',
    category: '12th',
    tagline: 'Physics, Chemistry & Biology Stream',
    description: 'Gateways to clinical medicine, pharmacy, biotechnology, clinical research, bioinformatics, and healthcare innovation.',
    typicalAge: '17 - 18 years',
    keyStreamsUnlocked: ['Medicine (MBBS/BDS)', 'Pharmacy (B.Pharm)', 'Biotech & Bioinformatics', 'Allied Health Sciences', 'Psychology & Neuroscience'],
    courseIds: [
      'mbbs_medicine', 'bpharm_pharma', 'bsc_biotech', 'btech_biotech', 'bdes_design', 'ballb_tech', 'bba_ipm'
    ]
  },
  {
    id: '12th_commerce',
    name: '12th Commerce',
    badge: 'Business & Finance',
    category: '12th',
    tagline: 'Accountancy, Business Studies, Economics & Math',
    description: 'Finance, corporate strategy, investment banking, charter qualifications (CA/CS/CFA), and management paths.',
    typicalAge: '17 - 18 years',
    keyStreamsUnlocked: ['Chartered Accountancy (CA)', 'BBA / IPMAT (IIM 5-yr)', 'B.Com (FinTech / Analytics)', 'Corporate Law (CLAT)', 'Product Design'],
    courseIds: [
      'bcom_fintech', 'bba_ipm', 'ca_foundation', 'ballb_tech', 'bdes_design', 'bca_cs'
    ]
  },
  {
    id: '12th_arts',
    name: '12th Arts & Humanities',
    badge: 'Creative & Policy',
    category: '12th',
    tagline: 'History, Political Science, Psychology, Sociology & Literature',
    description: 'Public policy, civil services, design, journalism, legal systems, behavioral sciences, and communications.',
    typicalAge: '17 - 18 years',
    keyStreamsUnlocked: ['Design (UCEED / NID)', 'Integrated Law (CLAT)', 'Psychology & Cognitive Sciences', 'Journalism & Media', 'Liberal Arts'],
    courseIds: [
      'bdes_design', 'ballb_tech', 'bba_ipm', 'ba_psychology', 'ba_journalism'
    ]
  },
  {
    id: 'college_grad',
    name: 'College / Undergraduates',
    badge: 'Lateral & Switches',
    category: 'college',
    tagline: 'Pursuing or Completed Undergraduate Degree',
    description: 'Switching domains, lateral career shifts, specialized Master’s, product/business transitions, and public service.',
    typicalAge: '19 - 22 years',
    keyStreamsUnlocked: ['MBA (CAT / GMAT)', 'M.Tech / MS Abroad', 'Product Management / UI-UX Switch', '3-Year LLB (Law)', 'Civil Services (UPSC CSE)'],
    courseIds: [
      'mba_cat', 'mtech_ms', 'mdes_gate', 'llb_3yr', 'upsc_civil'
    ]
  }
];

export const ENTRANCE_EXAMS: EntranceExam[] = [
  {
    id: 'jee_main',
    name: 'JEE (Main)',
    fullName: 'Joint Entrance Examination (Main)',
    conductingBody: 'National Testing Agency (NTA)',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Bio/Technical Vocational with min 75% aggregate (or top 20 percentile) for NITs/IIITs.',
    frequency: 'Twice a year (Session 1: Jan/Feb, Session 2: Apr)',
    applicationMonths: 'November - December',
    examMonths: 'January & April',
    patternSummary: 'Computer Based Test (CBT): 90 questions (30 each in Physics, Chem, Maths) with negative marking (+4 / -1). Single-correct MCQs & Numerical response.',
    officialUrl: 'https://jeemain.nta.nic.in',
    difficulty: 'High',
    keyTips: 'Focus heavily on NCERT basics for Chemistry; consistent speed and accuracy practice for Physics and Mathematics.',
    unlockedCourseIds: ['btech_cse', 'btech_ece', 'btech_mech', 'btech_aerospace', 'btech_civil', 'barch']
  },
  {
    id: 'jee_adv',
    name: 'JEE (Advanced)',
    fullName: 'Joint Entrance Examination (Advanced)',
    conductingBody: 'One of the Indian Institutes of Technology (IITs) on rotation',
    eligibility: 'Top ~2.5 lakh rankers in JEE Main with requisite category cutoff; max 2 consecutive attempts.',
    frequency: 'Once a year (May / June)',
    applicationMonths: 'Late April / Early May',
    examMonths: 'Late May',
    patternSummary: 'Two mandatory 3-hour papers on same day. Tests deep analytical and multi-concept application in Physics, Chemistry, and Mathematics.',
    officialUrl: 'https://jeeadv.ac.in',
    difficulty: 'High',
    keyTips: 'Requires deep first-principles conceptual understanding rather than rote problem solving.',
    unlockedCourseIds: ['btech_cse', 'btech_ece', 'btech_mech', 'btech_aerospace', 'integrated_msc']
  },
  {
    id: 'uceed',
    name: 'UCEED',
    fullName: 'Undergraduate Common Entrance Examination for Design',
    conductingBody: 'IIT Bombay',
    eligibility: 'Students from ANY stream (PCM, PCB, Commerce, Arts) who passed 10+2 or equivalent.',
    frequency: 'Once a year (January)',
    applicationMonths: 'October - November',
    examMonths: 'Third Sunday of January',
    patternSummary: 'Part A (Computer-based test: Visualization, Spatial ability, Design sensitivity, Logic) + Part B (Hand-drawn sketching & creative perspective test).',
    officialUrl: 'https://www.uceed.iitb.ac.in',
    difficulty: 'High',
    keyTips: 'Open to Science, Commerce, and Arts students! Top ranks get into IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad, and IIITDM Jabalpur B.Des.',
    unlockedCourseIds: ['bdes_design']
  },
  {
    id: 'nid_dat',
    name: 'NID DAT (Prelims & Mains)',
    fullName: 'National Institute of Design Design Aptitude Test',
    conductingBody: 'National Institute of Design (NID)',
    eligibility: 'Passed or appearing in 10+2 in any stream (Science, Commerce, Humanities).',
    frequency: 'Once a year (Prelims in Dec/Jan, Mains in April)',
    applicationMonths: 'September - November',
    examMonths: 'December / January',
    patternSummary: 'Prelims (Objective & Drawing questions) followed by DAT Mains (Studio test & personal interview with portfolio).',
    officialUrl: 'https://admissions.nid.edu',
    difficulty: 'High',
    keyTips: 'India’s premier institute for Industrial, Communication, Interaction, and Textile Design.',
    unlockedCourseIds: ['bdes_design']
  },
  {
    id: 'cuet_ug',
    name: 'CUET-UG',
    fullName: 'Common University Entrance Test (UG)',
    conductingBody: 'National Testing Agency (NTA)',
    eligibility: '10+2 passed or appearing from recognized board for admission into Central and State Universities.',
    frequency: 'Once a year (May)',
    applicationMonths: 'February - March',
    examMonths: 'May',
    patternSummary: 'Section IA/IB (Languages), Section II (Domain-specific subjects like Maths, Physics, CS), Section III (General Test).',
    officialUrl: 'https://cuetug.ntaonline.in',
    difficulty: 'Moderate',
    keyTips: 'Admissions gateway to top universities like Delhi University (DU), BHU, JNU, Hyderabad Central University for B.Sc, BCA, BA, and Integrated courses.',
    unlockedCourseIds: ['bsc_cs_ds', 'bca_cs', 'bsc_math_stat', 'bsc_physics', 'ba_psychology']
  },
  {
    id: 'nata',
    name: 'NATA',
    fullName: 'National Aptitude Test in Architecture',
    conductingBody: 'Council of Architecture (COA)',
    eligibility: '10+2 with Physics, Chemistry & Mathematics or 10+3 Diploma with Mathematics.',
    frequency: 'Multiple attempts per year (April - July weekends)',
    applicationMonths: 'March onwards',
    examMonths: 'April - July',
    patternSummary: 'Comprehensive assessment of drawing and visual observation skills, visual perception, aesthetic sensitivity, and architectural awareness.',
    officialUrl: 'https://www.nata.in',
    difficulty: 'Moderate',
    keyTips: 'Required for admission to 5-year B.Arch in all government, state, and private architecture colleges (except IITs which use JEE Adv AAT).',
    unlockedCourseIds: ['barch']
  },
  {
    id: 'nda_exam',
    name: 'NDA & NA Exam',
    fullName: 'National Defence Academy & Naval Academy Examination',
    conductingBody: 'Union Public Service Commission (UPSC)',
    eligibility: 'Unmarried candidates aged 16.5 - 19.5 years. For Air Force & Navy: 12th with PCM required. For Army: 12th in any stream.',
    frequency: 'Twice a year (NDA I in April, NDA II in September)',
    applicationMonths: 'Dec - Jan (NDA I), May - June (NDA II)',
    examMonths: 'April & September',
    patternSummary: 'Written exam: Mathematics (300 marks) + General Ability Test (600 marks), followed by 5-day SSB (Services Selection Board) interview & medicals.',
    officialUrl: 'https://upsc.gov.in',
    difficulty: 'High',
    keyTips: 'Prestigious tri-services academy. Cadet gets a full B.Tech / B.Sc degree fully funded by Govt with salary/stipend and commissioned as Lieutenant / Sub-Lieutenant / Flying Officer.',
    unlockedCourseIds: ['nda_pcm']
  },
  {
    id: 'bitsat',
    name: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    conductingBody: 'BITS Pilani',
    eligibility: '12th PCM with min 75% aggregate and min 60% in each of Physics, Chemistry, and Math.',
    frequency: 'Twice a year (Session 1: May, Session 2: June)',
    applicationMonths: 'January - March',
    examMonths: 'May & June',
    patternSummary: '130 questions in 3 hours: Physics (30), Chemistry (30), Math (40), English (10), Logical Reasoning (20). Bonus questions available if all finished.',
    officialUrl: 'https://www.bitsadmission.com',
    difficulty: 'High',
    keyTips: 'Offers admission to BITS Pilani, Goa, and Hyderabad campuses (Tier 1 equivalent to top IITs/NITs with zero campus attendance rule).',
    unlockedCourseIds: ['btech_cse', 'btech_ece', 'btech_mech', 'integrated_msc']
  },
  {
    id: 'imu_cet',
    name: 'IMU-CET',
    fullName: 'Indian Maritime University Common Entrance Test',
    conductingBody: 'Indian Maritime University',
    eligibility: '10+2 with min 60% in PCM and 50% in English; strict medical and eye-sight standards.',
    frequency: 'Once a year (June)',
    applicationMonths: 'April - May',
    examMonths: 'June',
    patternSummary: 'Online CBT covering English, General Aptitude, Physics, Chemistry, and Mathematics.',
    officialUrl: 'https://www.imu.edu.in',
    difficulty: 'Moderate',
    keyTips: 'Direct gateway to High-paying Merchant Navy careers (Deck Cadet, Marine Engineer). Sponsorship from shipping companies before joining is strongly advised.',
    unlockedCourseIds: ['merchant_navy']
  },
  {
    id: 'isi_admission',
    name: 'ISI Admission Test',
    fullName: 'Indian Statistical Institute Admission Test',
    conductingBody: 'Indian Statistical Institute (Kolkata & Bengaluru)',
    eligibility: '10+2 with Mathematics and English.',
    frequency: 'Once a year (May)',
    applicationMonths: 'February - March',
    examMonths: 'May',
    patternSummary: 'Two papers: Paper 1 (MCQ in advanced math) and Paper 2 (Subjective proof-based mathematical reasoning).',
    officialUrl: 'https://www.isical.ac.in',
    difficulty: 'High',
    keyTips: 'Offers 100% free tuition with monthly government stipend for B.Stat / B.Math. Alumni dominate global Quant hedge funds, Data Science, and Machine Learning research.',
    unlockedCourseIds: ['bsc_math_stat']
  },
  {
    id: 'clat',
    name: 'CLAT (UG)',
    fullName: 'Common Law Admission Test',
    conductingBody: 'Consortium of National Law Universities (NLUs)',
    eligibility: '10+2 in any stream (Science, Commerce, Arts) with min 45% marks.',
    frequency: 'Once a year (December)',
    applicationMonths: 'July - October',
    examMonths: 'December',
    patternSummary: '120 passage-based questions evaluating English, Current Affairs & GK, Legal Reasoning, Logical Reasoning, and Quantitative Techniques.',
    officialUrl: 'https://consortiumofnlus.ac.in',
    difficulty: 'High',
    keyTips: 'Gateway to top NLUs (NLSIU Bengaluru, NALSAR Hyderabad, WBNUJS). Tech-law, Intellectual Property, and Cyber Law are exploding areas for Science students.',
    unlockedCourseIds: ['ballb_tech']
  },
  {
    id: 'ipmat',
    name: 'IPMAT',
    fullName: 'Integrated Programme in Management Aptitude Test',
    conductingBody: 'IIM Indore / IIM Rohtak',
    eligibility: '10+2 with min 60% in any stream.',
    frequency: 'Once a year (May)',
    applicationMonths: 'February - April',
    examMonths: 'May',
    patternSummary: 'Quantitative Ability (MCQ + Short Answer) and Verbal Ability, followed by Personal Assessment/Interview.',
    officialUrl: 'https://www.iimidr.ac.in',
    difficulty: 'High',
    keyTips: 'Direct 5-year BBA + MBA program straight into Indian Institutes of Management (IIM) without waiting for graduation and CAT.',
    unlockedCourseIds: ['bba_ipm']
  },
  {
    id: 'neet_ug',
    name: 'NEET (UG)',
    fullName: 'National Eligibility cum Entrance Test',
    conductingBody: 'National Testing Agency (NTA)',
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotech, and English min 50%.',
    frequency: 'Once a year (First Sunday of May)',
    applicationMonths: 'February - March',
    examMonths: 'May',
    patternSummary: 'Pen & Paper test: 200 questions (Physics, Chemistry, Botany, Zoology) attempting 180.',
    officialUrl: 'https://neet.ntaonline.in',
    difficulty: 'High',
    keyTips: 'Single national entrance for MBBS, BDS, AYUSH, and veterinary admissions across AIIMS, JIPMER, and state colleges.',
    unlockedCourseIds: ['mbbs_medicine']
  }
];

export const COURSES: Course[] = [
  {
    id: 'btech_cse',
    code: 'B.Tech CSE / IT / AI',
    name: 'Bachelor of Technology in Computer Science & Engineering',
    degreeType: 'B.Tech',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics & Mathematics (PCM) with min 60-75% aggregate.',
    costRangeGovt: '₹2.5 Lakh - ₹8 Lakh (Total 4 Years)',
    costRangePrivate: '₹8 Lakh - ₹22 Lakh (Total 4 Years)',
    examIds: ['jee_main', 'jee_adv', 'bitsat'],
    careerIds: ['software_engineer', 'data_scientist', 'cloud_architect', 'cyber_security', 'product_manager', 'game_developer'],
    furtherStudies: ['M.Tech in AI / Systems (GATE)', 'MS in Computer Science abroad (GRE/TOEFL)', 'MBA (CAT / GMAT)', 'Direct PhD'],
    description: 'The premier technology degree covering algorithms, software architecture, distributed systems, artificial intelligence, and operating systems.',
    curriculumHighlights: ['Data Structures & Algorithms', 'Operating Systems & Networks', 'Database Management & Cloud Computing', 'Artificial Intelligence & Machine Learning', 'Software Engineering & System Design'],
    domains: ['Technology & Software', 'AI & Data Science'],
    isPcmPrimary: true
  },
  {
    id: 'btech_ece',
    code: 'B.Tech ECE / EE',
    name: 'B.Tech in Electronics, Communication & Electrical Engineering',
    degreeType: 'B.Tech',
    duration: '4 Years',
    eligibility: '10+2 with PCM (Physics, Chemistry, Maths).',
    costRangeGovt: '₹2.5 Lakh - ₹8 Lakh',
    costRangePrivate: '₹7 Lakh - ₹18 Lakh',
    examIds: ['jee_main', 'jee_adv', 'bitsat'],
    careerIds: ['robotics_engineer', 'hardware_designer', 'software_engineer', 'defense_officer'],
    furtherStudies: ['M.Tech in VLSI / Embedded Systems', 'MS in Electrical / Microelectronics', 'MBA'],
    description: 'Bridges physical electronics and computing: semiconductors, chip design (VLSI), embedded IoT systems, robotics, and wireless communications.',
    curriculumHighlights: ['Digital Electronics & Microprocessors', 'VLSI Design & Semiconductor Physics', 'Signals & Systems', 'Embedded Systems & IoT', 'Control Systems & Robotics'],
    domains: ['Engineering & Hardware', 'Technology & Software'],
    isPcmPrimary: true
  },
  {
    id: 'btech_mech',
    code: 'B.Tech Mech',
    name: 'Bachelor of Technology in Mechanical & Mechatronics Engineering',
    degreeType: 'B.Tech',
    duration: '4 Years',
    eligibility: '10+2 with PCM.',
    costRangeGovt: '₹2.5 Lakh - ₹7 Lakh',
    costRangePrivate: '₹6 Lakh - ₹16 Lakh',
    examIds: ['jee_main', 'jee_adv', 'bitsat'],
    careerIds: ['robotics_engineer', 'hardware_designer', 'product_manager'],
    furtherStudies: ['M.Tech in Robotics / Automotive', 'MS abroad in Mechanical / Mechatronics', 'MBA'],
    description: 'Design, manufacturing, and mechanics of physical machines, autonomous electric vehicles (EV), robotics, and thermal-fluid energy systems.',
    curriculumHighlights: ['Thermodynamics & Fluid Mechanics', 'Kinematics & Machine Dynamics', 'CAD / CAM & Rapid Prototyping', 'Mechatronics & PLC Automation', 'Automotive Systems & EV Technology'],
    domains: ['Engineering & Hardware'],
    isPcmPrimary: true
  },
  {
    id: 'btech_aerospace',
    code: 'B.Tech Aero',
    name: 'Bachelor of Technology in Aerospace & Avionics Engineering',
    degreeType: 'B.Tech',
    duration: '4 Years',
    eligibility: '10+2 with PCM min 60-75%.',
    costRangeGovt: '₹3 Lakh - ₹8 Lakh',
    costRangePrivate: '₹8 Lakh - ₹20 Lakh',
    examIds: ['jee_main', 'jee_adv', 'bitsat'],
    careerIds: ['aerospace_engineer', 'defense_officer', 'scientific_researcher'],
    furtherStudies: ['M.Tech in Aerospace (IIT Madras, IIT Bombay, IISc)', 'MS abroad in Aerospace / Propulsion', 'ISRO / DRDO Scientist Exams'],
    description: 'Cutting-edge engineering of aircraft, spacecraft, satellites, rocket propulsion, aerodynamics, and avionics control systems.',
    curriculumHighlights: ['Aerodynamics & Flight Mechanics', 'Rocket Propulsion & Spacecraft Dynamics', 'Avionics & Flight Navigation Systems', 'Composite Structural Materials', 'Computational Fluid Dynamics (CFD)'],
    domains: ['Engineering & Hardware', 'Defence & Aviation', 'Sciences & Research'],
    isPcmPrimary: true
  },
  {
    id: 'btech_civil',
    code: 'B.Tech Civil',
    name: 'Bachelor of Technology in Civil & Infrastructure Engineering',
    degreeType: 'B.Tech',
    duration: '4 Years',
    eligibility: '10+2 with PCM.',
    costRangeGovt: '₹2 Lakh - ₹6 Lakh',
    costRangePrivate: '₹5 Lakh - ₹14 Lakh',
    examIds: ['jee_main', 'jee_adv'],
    careerIds: ['civil_engineer', 'architect_planner'],
    furtherStudies: ['M.Tech in Structural / Transportation Engineering', 'UPSC Indian Engineering Services (IES)', 'NICMAR (Construction Mgmt)', 'MBA'],
    description: 'Design and construction of megastructures, smart cities, highway networks, tunnels, bridges, airports, and environmental water systems.',
    curriculumHighlights: ['Structural Analysis & RCC Design', 'Geotechnical & Soil Mechanics', 'Surveying & GIS Mapping', 'Environmental & Hydrology Engineering', 'Project Management & BIM Software'],
    domains: ['Engineering & Hardware'],
    isPcmPrimary: true
  },
  {
    id: 'bdes_design',
    code: 'B.Des',
    name: 'Bachelor of Design (Interaction, UX, Product & Visual)',
    degreeType: 'B.Des',
    duration: '4 Years',
    eligibility: '10+2 in any stream (PCM is fantastic for UX/Interaction and Industrial design).',
    costRangeGovt: '₹3 Lakh - ₹9 Lakh (NID / IITs)',
    costRangePrivate: '₹12 Lakh - ₹26 Lakh',
    examIds: ['uceed', 'nid_dat'],
    careerIds: ['ux_designer', 'hardware_designer', 'game_developer', 'product_manager'],
    furtherStudies: ['M.Des (IIT Bombay IDC, NID, RCA London)', 'Master in Human-Computer Interaction (HCI)', 'MBA in Design Management'],
    description: 'Focuses on user experience (UX/UI), product ergonomics, visual storytelling, digital interfaces, and human-computer interaction (HCI).',
    curriculumHighlights: ['Design Thinking & User Research', 'Visual Identity & Typography', 'Human-Computer Interaction (HCI)', 'Tangible Product Prototyping', 'Interactive Digital Systems & Wireframing'],
    domains: ['Design & Creative', 'Technology & Software'],
    isPcmPrimary: true
  },
  {
    id: 'barch',
    code: 'B.Arch',
    name: 'Bachelor of Architecture',
    degreeType: 'B.Arch',
    duration: '5 Years (10 Semesters)',
    eligibility: '10+2 with Physics, Chemistry & Mathematics min 50% + NATA / JEE Paper 2 qualification.',
    costRangeGovt: '₹3 Lakh - ₹8 Lakh',
    costRangePrivate: '₹10 Lakh - ₹22 Lakh',
    examIds: ['nata', 'jee_main'],
    careerIds: ['architect_planner', 'ux_designer'],
    furtherStudies: ['M.Arch (Urban Design, Landscape, Sustainable Architecture)', 'Master of Urban Planning (MUP)', 'CEPT Ahmedabad'],
    description: 'Professional qualification licensing individuals to design physical spaces, sustainable buildings, landscapes, and urban habitats.',
    curriculumHighlights: ['Architectural Drawing & Design Studios', 'Building Materials & Construction Tech', 'History of Architecture & Heritage', 'Structural Systems & Climatology', '1-Year Practical Professional Training'],
    domains: ['Engineering & Hardware', 'Design & Creative'],
    isPcmPrimary: true
  },
  {
    id: 'bca_cs',
    code: 'BCA',
    name: 'Bachelor of Computer Applications (BCA)',
    degreeType: 'BCA',
    duration: '3 Years (or 4 Years under NEP)',
    eligibility: '10+2 in any stream (often requiring Mathematics or Computer Science as a subject).',
    costRangeGovt: '₹60,000 - ₹2 Lakh',
    costRangePrivate: '₹2.5 Lakh - ₹8 Lakh',
    examIds: ['cuet_ug'],
    careerIds: ['software_engineer', 'data_scientist', 'cloud_architect', 'cyber_security'],
    furtherStudies: ['MCA (Master of Computer Applications - 2 Years via NIMCET)', 'M.Sc Computer Science / IT', 'MBA'],
    description: 'Fast-track software application degree emphasizing web development, database management, app creation, and software tools.',
    curriculumHighlights: ['Programming in C++, Java & Python', 'Web Application Development', 'Database Management Systems (SQL)', 'Software Testing & Deployment', 'Mobile App Development'],
    domains: ['Technology & Software'],
    isPcmPrimary: true
  },
  {
    id: 'bsc_cs_ds',
    code: 'B.Sc CS / Data Science',
    name: 'B.Sc (Hons) in Computer Science, Data Science & AI',
    degreeType: 'B.Sc',
    duration: '3 or 4 Years (NEP Research Track)',
    eligibility: '10+2 with Mathematics.',
    costRangeGovt: '₹40,000 - ₹1.5 Lakh',
    costRangePrivate: '₹3 Lakh - ₹9 Lakh',
    examIds: ['cuet_ug'],
    careerIds: ['data_scientist', 'software_engineer', 'quant_analyst', 'ai_researcher'],
    furtherStudies: ['M.Sc Data Science / Statistics', 'MCA', 'MS abroad in Data Science / Machine Learning', 'MBA'],
    description: 'Rigorous analytical foundation combining discrete mathematics, statistical modeling, algorithmic coding, and big data analysis.',
    curriculumHighlights: ['Mathematical Foundations of AI', 'Probability & Inferential Statistics', 'Machine Learning Algorithms', 'Big Data Technologies (Hadoop, Spark)', 'Data Visualization & Ethics'],
    domains: ['AI & Data Science', 'Technology & Software'],
    isPcmPrimary: true
  },
  {
    id: 'bsc_math_stat',
    code: 'B.Stat / B.Math / B.Sc Stats',
    name: 'Bachelor of Statistics / Mathematics (ISI / CMI / Central Universities)',
    degreeType: 'B.Sc',
    duration: '3 or 4 Years',
    eligibility: '10+2 with Mathematics.',
    costRangeGovt: 'Free with Stipend at ISI/CMI; ₹30,000 - ₹1.2 Lakh in Universities',
    costRangePrivate: '₹3 Lakh - ₹8 Lakh',
    examIds: ['isi_admission', 'cuet_ug'],
    careerIds: ['quant_analyst', 'data_scientist', 'actuary_risk', 'ai_researcher', 'scientific_researcher'],
    furtherStudies: ['M.Stat / M.Math at ISI', 'Master in Quantitative Finance / Financial Engineering abroad', 'PhD at top Ivy League / European universities'],
    description: 'Elite quantitative curriculum producing the highest-paid algorithmic traders, risk modelers, econometricians, and theoretical AI researchers.',
    curriculumHighlights: ['Abstract Algebra & Real Analysis', 'Stochastic Processes & Probability Theory', 'Statistical Inference & Regression Modeling', 'Multivariate Analysis & Optimization', 'Time Series & Financial Econometrics'],
    domains: ['AI & Data Science', 'Finance & Management', 'Sciences & Research'],
    isPcmPrimary: true
  },
  {
    id: 'bsc_physics',
    code: 'B.Sc Physics',
    name: 'Bachelor of Science (Hons) in Physics & Astrophysics',
    degreeType: 'B.Sc',
    duration: '3 or 4 Years',
    eligibility: '10+2 with PCM.',
    costRangeGovt: '₹30,000 - ₹1.5 Lakh',
    costRangePrivate: '₹2 Lakh - ₹6 Lakh',
    examIds: ['cuet_ug', 'igate_iiser'],
    careerIds: ['scientific_researcher', 'data_scientist', 'quant_analyst'],
    furtherStudies: ['Integrated PhD / M.Sc at IIT-JAM, TIFR, IISc', 'Astrophysics at IUCAA', 'MS abroad in Quantum Computing'],
    description: 'Deep dive into fundamental laws of nature, quantum mechanics, electromagnetism, relativity, and computational simulation.',
    curriculumHighlights: ['Quantum Mechanics & Atomic Physics', 'Electromagnetism & Optics', 'Thermodynamics & Statistical Physics', 'Computational Physics & Numerical Simulation', 'Astrophysics & Cosmology Electives'],
    domains: ['Sciences & Research'],
    isPcmPrimary: true
  },
  {
    id: 'nda_pcm',
    code: 'NDA & Naval Academy',
    name: 'National Defence Academy (Army, Air Force, Navy Wings)',
    degreeType: 'Defence Academy',
    duration: '3 Years at NDA Khadakwasla + 1 Year at Service Academy (IMA / AFA / INA)',
    eligibility: 'Unmarried candidates aged 16.5 - 19.5 with 12th PCM for Air Force/Navy.',
    costRangeGovt: 'Fully Funded by Govt of India (Free boarding, lodging, uniform, plus monthly cadet allowance)',
    costRangePrivate: 'Not Applicable',
    examIds: ['nda_exam'],
    careerIds: ['defense_officer', 'naval_officer', 'commercial_pilot'],
    furtherStudies: ['Defence Services Staff College (DSSC)', 'Higher Command Course', 'M.Tech / M.Sc sponsored by armed forces'],
    description: 'The pinnacle of leadership and military prowess. Graduates receive a formal B.Tech or B.Sc degree (JNU) and are commissioned as gazetted military officers.',
    curriculumHighlights: ['Military Strategy & Leadership', 'Aeronautical / Marine / Weapons Systems', 'Survival Training, Drill & Weaponry', 'Navigation, Topography & Signals', 'Physical Conditioning & Combatives'],
    domains: ['Defence & Aviation'],
    isPcmPrimary: true
  },
  {
    id: 'commercial_pilot',
    code: 'CPL Training',
    name: 'Commercial Pilot License (CPL) & Flight Training',
    degreeType: 'Professional License',
    duration: '18 to 24 Months (Ground school + 200 Flying Hours)',
    eligibility: '10+2 with Physics and Mathematics min 50% + Class 1 DGCA Medical Certificate.',
    costRangeGovt: '₹35 Lakh - ₹45 Lakh (IGRUA - Indira Gandhi Rashtriya Uran Akademi)',
    costRangePrivate: '₹45 Lakh - ₹65 Lakh (Flying Clubs in India / Abroad - USA, South Africa, NZ)',
    examIds: ['cuet_ug'],
    careerIds: ['commercial_pilot'],
    furtherStudies: ['Type Rating (Airbus A320 / Boeing 737: ₹15L - ₹25L)', 'Airline Captain / Line Training Captain (LTC)', 'DGCA Flight Instructor Rating (FIR)'],
    description: 'Rigorous ground aviation theory exams (DGCA) and 200 hours of instrument and multi-engine flying training to pilot commercial airliners.',
    curriculumHighlights: ['Air Navigation & Flight Planning', 'Aviation Meteorology & Weather Radar', 'Air Regulations & International Civil Aviation Law', 'Aircraft Instruments, Engines & Systems', 'Simulator & Multi-Engine Instrument Flying'],
    domains: ['Defence & Aviation'],
    isPcmPrimary: true
  },
  {
    id: 'merchant_navy',
    code: 'B.Sc Nautical / Marine Eng',
    name: 'Merchant Navy (B.Sc Nautical Science / B.Tech Marine Engineering)',
    degreeType: 'B.Sc',
    duration: '3 Years (B.Sc Nautical Science) or 4 Years (Marine Engineering)',
    eligibility: '10+2 PCM min 60% and English min 50% + 6/6 eye vision (no color blindness).',
    costRangeGovt: '₹5 Lakh - ₹9 Lakh (IMU Campuses)',
    costRangePrivate: '₹10 Lakh - ₹18 Lakh (Tolani, Anglo-Eastern, Great Eastern)',
    examIds: ['imu_cet'],
    careerIds: ['naval_officer'],
    furtherStudies: ['Chief Mate & Master Mariner (Captain) DGCA/DG Shipping exams', 'Maritime Law / Ship Brokerage / Logistics'],
    description: 'Prepares officers to navigate and operate international cargo ships, oil tankers, and container vessels with tax-free global salaries.',
    curriculumHighlights: ['Ship Stability & Cargo Work', 'Celestial & Electronic Navigation (ECDIS, Radar)', 'Marine Engineering Systems & Boilers', 'Maritime Law & International Safety (SOLAS/MARPOL)', 'Seamanship & Fire Fighting Operations'],
    domains: ['Defence & Aviation', 'Engineering & Hardware'],
    isPcmPrimary: true
  },
  {
    id: 'actuarial_science',
    code: 'Actuarial Science',
    name: 'Actuarial Science & Mathematical Risk Modeling',
    degreeType: 'Professional License',
    duration: '3 Years Degree + Professional Exams (IAI / IFoA)',
    eligibility: '10+2 with strong Mathematics proficiency.',
    costRangeGovt: '₹1 Lakh - ₹3 Lakh (B.Sc) + Exam Fees (₹5k - ₹15k per paper)',
    costRangePrivate: '₹4 Lakh - ₹10 Lakh',
    examIds: ['cuet_ug'],
    careerIds: ['actuary_risk', 'quant_analyst', 'fintech_analyst'],
    furtherStudies: ['Fellow of Institute of Actuaries of India (FIAI)', 'Chartered Enterprise Risk Actuary (CERA)'],
    description: 'High-math discipline analyzing risk in life insurance, health insurance, pensions, banking, and capital investments using probability models.',
    curriculumHighlights: ['Financial Mathematics & Interest Theory', 'Actuarial Statistics & Survival Models', 'Loss Distributions & Credibility Theory', 'Life Contingencies & Pension Valuation', 'Data Science & Machine Learning in Insurance'],
    domains: ['Finance & Management', 'AI & Data Science'],
    isPcmPrimary: true
  },
  {
    id: 'integrated_msc',
    code: 'Integrated BS-MS',
    name: '5-Year Integrated BS-MS / M.Sc in Natural Sciences',
    degreeType: 'Integrated',
    duration: '5 Years',
    eligibility: '10+2 with Science stream via IAT (IISERs) or NEST (NISER).',
    costRangeGovt: '₹2 Lakh - ₹4 Lakh (Full 5 Years, with INSPIRE / KVPY fellowship support)',
    costRangePrivate: 'Not Applicable',
    examIds: ['jee_adv'],
    careerIds: ['scientific_researcher', 'data_scientist', 'ai_researcher'],
    furtherStudies: ['Direct PhD at Max Planck, MIT, Cambridge, Oxford', 'Postdoctoral fellowship', 'R&D Scientist in corporate labs'],
    description: 'Flagship research dual degree offered at IISERs, NISER, and IITs providing interdisciplinary exposure to Physics, Chemistry, Biology, and Data.',
    curriculumHighlights: ['Interdisciplinary Core Sciences', 'Advanced Experimental Laboratory Projects', 'Quantum Mechanics, Condensed Matter & Biophysics', 'Supercomputing & Numerical Algorithms', '1-Year Master Thesis Project'],
    domains: ['Sciences & Research'],
    isPcmPrimary: true
  },
  {
    id: 'bba_ipm',
    code: 'IPM (BBA+MBA)',
    name: 'Integrated Programme in Management (5-Year Dual Degree at IIMs)',
    degreeType: 'Integrated',
    duration: '5 Years (3 Years UG + 2 Years PGP/MBA)',
    eligibility: '10+2 in ANY stream (PCM, PCB, Commerce, Arts) min 60%.',
    costRangeGovt: '₹30 Lakh - ₹38 Lakh (Total 5 Years at IIM Indore / Rohtak / Ranchi)',
    costRangePrivate: '₹18 Lakh - ₹28 Lakh (Nirma, TAPMI)',
    examIds: ['ipmat'],
    careerIds: ['product_manager', 'fintech_analyst', 'technical_founder'],
    furtherStudies: ['Executive MBA later', 'CFA (Chartered Financial Analyst)', 'PhD in Management'],
    description: 'Elite program skipping the fierce CAT battle, taking students right after 12th into Indian Institutes of Management for top corporate strategy roles.',
    curriculumHighlights: ['Economics, Statistics & Game Theory', 'Corporate Finance & Accounting', 'Marketing, Behavioral Science & Consumer Psychology', 'Operations Management & Supply Chain', 'Strategic Leadership & Business Case Studies'],
    domains: ['Finance & Management'],
    isPcmPrimary: true
  },
  {
    id: 'ballb_tech',
    code: 'B.A. / BBA LL.B',
    name: '5-Year Integrated Law with Specialization in Cyber & Tech Law',
    degreeType: 'Integrated',
    duration: '5 Years',
    eligibility: '10+2 in any stream (Science background is heavily valued in Intellectual Property & AI governance).',
    costRangeGovt: '₹8 Lakh - ₹14 Lakh (National Law Universities - NLUs)',
    costRangePrivate: '₹12 Lakh - ₹24 Lakh (Jindal Global Law School, Symbiosis)',
    examIds: ['clat'],
    careerIds: ['cyber_lawyer', 'technical_founder'],
    furtherStudies: ['LL.M abroad (Harvard, Cambridge, NUS)', 'Judicial Services Exam', 'In-house General Counsel'],
    description: 'Integrated legal training in constitutional, corporate, intellectual property (patent law), privacy regulations, and artificial intelligence ethics.',
    curriculumHighlights: ['Constitutional & Administrative Law', 'Intellectual Property Rights (Patents, Trademarks)', 'Cyber Law, Data Protection (DPDP Act) & AI Policy', 'Corporate Mergers, Acquisitions & Securities Law', 'Moot Court & International Arbitration'],
    domains: ['Law & Policy'],
    isPcmPrimary: true
  },
  {
    id: 'bcom_fintech',
    code: 'B.Com (FinTech)',
    name: 'B.Com (Hons) in Financial Analytics & FinTech',
    degreeType: 'Other',
    duration: '3 or 4 Years',
    eligibility: '10+2 with Mathematics / Commerce.',
    costRangeGovt: '₹40,000 - ₹1.5 Lakh',
    costRangePrivate: '₹3 Lakh - ₹8 Lakh',
    examIds: ['cuet_ug'],
    careerIds: ['fintech_analyst', 'quant_analyst', 'actuary_risk'],
    furtherStudies: ['CFA (USA)', 'CA (ICAI)', 'MBA Finance', 'M.Sc Financial Engineering'],
    description: 'Modern commerce degree merging accounting principles with blockchain, algorithmic finance, Python scripting, and investment metrics.',
    curriculumHighlights: ['Financial Accounting & Auditing', 'Python for Finance & Algorithmic Trading', 'Blockchain & Cryptocurrency Frameworks', 'Corporate Financial Modeling', 'Investment Banking & Portfolio Management'],
    domains: ['Finance & Management'],
    isPcmPrimary: false
  },
  {
    id: 'mbbs_medicine',
    code: 'MBBS',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
    degreeType: 'Other',
    duration: '5.5 Years (4.5 Years Academic + 1 Year Mandatory Rotatory Internship)',
    eligibility: '10+2 with Physics, Chemistry, Biology & English min 50% + NEET qualification.',
    costRangeGovt: '₹50,000 - ₹2.5 Lakh (Total 5.5 Years in AIIMS & State Govt Colleges)',
    costRangePrivate: '₹45 Lakh - ₹1.1 Crore (Private / Deemed Universities)',
    examIds: ['neet_ug'],
    careerIds: ['scientific_researcher'],
    furtherStudies: ['MD / MS (via NEET-PG / INI-CET)', 'Super-specialty DM / M.Ch', 'USMLE (USA) / PLAB (UK)'],
    description: 'The foundation of medical science and surgery, diagnosing and treating human diseases, clinical research, and hospital medicine.',
    curriculumHighlights: ['Anatomy, Physiology & Biochemistry', 'Pathology, Pharmacology & Microbiology', 'Forensic Medicine & Community Medicine', 'General Medicine, Surgery, Obstetrics & Gynaecology', '1-Year Clinical Rotations & Emergency Trauma Care'],
    domains: ['Healthcare & Bio'],
    isPcmPrimary: false
  }
];

export const CAREERS: Career[] = [
  {
    id: 'software_engineer',
    title: 'Software Engineer / Full-Stack Architect',
    domain: 'Technology & Software',
    shortDesc: 'Designs, codes, tests, and deploys high-scale software applications, APIs, and cloud microservices.',
    dayToDay: [
      'Write clean, modular code in TypeScript, Go, Python, or Java for backend and frontend systems.',
      'Participate in architecture design reviews and optimize database query latency.',
      'Debug production outages, write unit/integration tests, and automate CI/CD pipelines.',
      'Collaborate with Product Managers and UX Designers to translate user needs into technical roadmaps.'
    ],
    skills: ['Data Structures & Algorithms', 'System Architecture', 'React / Next.js', 'Go / Node.js / Java', 'Docker & Kubernetes', 'PostgreSQL / NoSQL'],
    salaryEntry: '₹8 Lakh - ₹22 Lakh / year',
    salaryMid: '₹25 Lakh - ₹60 Lakh+ / year',
    growthOutlook: 'Very High',
    growthReason: 'Exponential digitization across Indian enterprises, global SaaS companies, and high-growth fintechs.',
    courseIds: ['btech_cse', 'bca_cs', 'bsc_cs_ds'],
    routes: [
      {
        title: 'Route 1: Traditional B.Tech CSE / IT Path',
        type: 'Direct / Traditional',
        description: 'The most direct, structured, and highest-volume recruitment pathway through on-campus placements.',
        steps: ['Pass 12th PCM', 'Clear JEE Main / BITSAT / State CET', 'Enroll in 4-Year B.Tech CSE', 'Build projects & competitive programming profile', 'Join tech companies via campus recruitment'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'JEE Main or BITSAT, LeetCode / DSA practice'
      },
      {
        title: 'Route 2: BCA + MCA Fast-Track',
        type: 'Alternative Route',
        description: 'Ideal if you did not clear JEE or want an affordable, practical coding-focused journey.',
        steps: ['Pass 12th', 'Pursue 3-Year BCA', 'Appear for NIMCET / State MCA Entrance', 'Complete 2-Year MCA from top NIT', 'Equal placement eligibility alongside B.Tech grads'],
        typicalDuration: '5 Years total (3 + 2)',
        requiredExamsOrPrep: 'NIMCET for NITs'
      },
      {
        title: 'Route 3: B.Sc Computer Science + Portfolio Route',
        type: 'Lateral / Bridge',
        description: 'Focus on pure fundamentals and build demonstrable open-source projects, web apps, and freelance experience.',
        steps: ['Pass 12th with Math', 'Take 3-year B.Sc Computer Science / IT', 'Build real-world GitHub open-source apps & hackathon wins', 'Apply directly to startups and global remote tech firms'],
        typicalDuration: '3 Years',
        requiredExamsOrPrep: 'CUET-UG, Strong GitHub Portfolio'
      }
    ]
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist & AI / ML Engineer',
    domain: 'AI & Data Science',
    shortDesc: 'Extracts predictive insights from massive datasets and builds generative AI, LLM agents, and statistical machine learning systems.',
    dayToDay: [
      'Design, train, and evaluate machine learning models (Transformers, gradient boosted trees, reinforcement learning).',
      'Clean, preprocess, and feature-engineer massive gigabyte-to-terabyte scale data pipelines.',
      'Deploy and monitor models in production environments using MLOps frameworks.',
      'Present quantifiable insights and ROI models to executive decision-makers.'
    ],
    skills: ['Python & PyTorch / TensorFlow', 'Applied Statistics & Linear Algebra', 'SQL & Distributed Data (Spark)', 'LLMs & Prompt / Fine-Tuning', 'MLOps & Vector Databases'],
    salaryEntry: '₹9 Lakh - ₹25 Lakh / year',
    salaryMid: '₹30 Lakh - ₹70 Lakh+ / year',
    growthOutlook: 'Very High',
    growthReason: 'The Generative AI revolution is forcing every enterprise to transform their core products with AI models.',
    courseIds: ['btech_cse', 'bsc_cs_ds', 'bsc_math_stat', 'integrated_msc'],
    routes: [
      {
        title: 'Route 1: B.Tech in CSE / Artificial Intelligence',
        type: 'Direct / Traditional',
        description: 'Standard engineering path with specialized electives in deep learning, neural networks, and computer vision.',
        steps: ['Pass 12th PCM', 'Take JEE Main / BITSAT', 'Complete 4-Year B.Tech CSE (AI/ML specialization)', 'Complete Kaggle competitions & AI internships', 'Recruited as AI/ML Engineer'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'JEE Main, Python, Kaggle'
      },
      {
        title: 'Route 2: Elite Quantitative Route (B.Stat / B.Math at ISI)',
        type: 'Alternative Route',
        description: 'The golden pathway for the most elite, high-math AI research and quantitative modeling roles.',
        steps: ['Pass 12th with advanced Math', 'Clear ISI Admission Test (Free tuition + Stipend)', 'Complete 3-Year B.Stat or B.Math', 'Complete M.Stat or direct placement', 'Joined as Senior Quantitative Modeler or Research Scientist'],
        typicalDuration: '3 to 5 Years',
        requiredExamsOrPrep: 'ISI Admission Test, Olympiad-level Math'
      },
      {
        title: 'Route 3: B.Sc Data Science / Statistics ➔ Master’s / Certifications',
        type: 'Lateral / Bridge',
        description: 'A mathematical science degree followed by hands-on ML certification or specialized Master’s.',
        steps: ['Pass 12th with Math', 'Take B.Sc Statistics / Data Science via CUET', 'Learn Python, Pandas, Scikit-learn, and Deep Learning', 'Build portfolio on Kaggle / Hugging Face', 'Join analytics teams as Junior Data Scientist'],
        typicalDuration: '3 to 4 Years',
        requiredExamsOrPrep: 'CUET-UG'
      }
    ]
  },
  {
    id: 'ux_designer',
    title: 'UX / Product Designer (UI/UX & HCI)',
    domain: 'Design & Creative',
    shortDesc: 'Designs intuitive, beautiful, and accessible software interfaces, design systems, and seamless user experiences.',
    dayToDay: [
      'Conduct user interviews, usability testing, and qualitative research to identify friction points.',
      'Create low-fidelity wireframes, high-fidelity prototypes, and design systems in Figma.',
      'Collaborate closely with frontend engineers to ensure design fidelity in production.',
      'Analyze product usage heatmaps and metrics to continually iterate flows.'
    ],
    skills: ['Figma & Prototyping', 'User Research & Personas', 'Information Architecture', 'Design Systems (Tokens, Auto Layout)', 'Interaction Design & Micro-animations', 'Basic HTML/CSS understanding'],
    salaryEntry: '₹7 Lakh - ₹20 Lakh / year',
    salaryMid: '₹22 Lakh - ₹50 Lakh+ / year',
    growthOutlook: 'Very High',
    growthReason: 'Software products live or die by their usability; every tech unicorn pays premium compensation for top product designers.',
    courseIds: ['bdes_design', 'btech_cse', 'barch'],
    routes: [
      {
        title: 'Route 1: Formal Design Degree (B.Des via UCEED / NID)',
        type: 'Direct / Traditional',
        description: 'Comprehensive 4-year design immersion with world-class faculty at IIT Bombay, IIT Delhi, or NID.',
        steps: ['Pass 12th in ANY stream (PCM is an advantage)', 'Clear UCEED or NID DAT', 'Graduate with B.Des in Interaction / Product Design', 'Showcase stellar student design portfolio', 'Recruited directly as Product Designer in top product firms'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'UCEED / NID DAT'
      },
      {
        title: 'Route 2: Engineering Degree (B.Tech) + Self-Built Design Portfolio',
        type: 'Lateral / Bridge',
        description: 'Very common and lucrative! Tech-savvy designers who understand code are deeply sought after by product teams.',
        steps: ['Pursue B.Tech CSE or ECE', 'Learn Figma, Design Thinking, and UI psychology alongside college', 'Redesign existing apps, build case studies on Behance/Dribbble/personal portfolio', 'Intern as UI/UX intern during 3rd and 4th year', 'Graduate into full-time Product Designer roles'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'Figma, Behance/Webflow Portfolio'
      },
      {
        title: 'Route 3: Architecture (B.Arch) ➔ Digital UX Transition',
        type: 'Lateral / Bridge',
        description: 'Architects possess superior spatial and visual systems thinking that translates seamlessly into software design systems.',
        steps: ['Graduate with B.Arch', 'Bridge spatial thinking into digital interaction systems', 'Take specialized UX bootcamps or self-directed HCI projects', 'Transition into UX/UI Architect'],
        typicalDuration: '5 Years',
        requiredExamsOrPrep: 'Portfolio building'
      }
    ]
  },
  {
    id: 'robotics_engineer',
    title: 'Robotics & Autonomous Systems Engineer',
    domain: 'Engineering & Hardware',
    shortDesc: 'Integrates sensors, actuators, computer vision, and embedded control algorithms to build intelligent robots and autonomous drones.',
    dayToDay: [
      'Program microcontrollers and embedded computing units (ROS, Raspberry Pi, Nvidia Jetson).',
      'Design kinematic structures, motor drivers, and feedback control loops.',
      'Implement simultaneous localization and mapping (SLAM) and obstacle avoidance vision algorithms.',
      'Test prototypes on factory floors or field test beds.'
    ],
    skills: ['C++ & Python', 'Robot Operating System (ROS / ROS2)', 'Embedded Electronics & Microcontrollers', 'Control Systems (PID, Kalman Filters)', 'Computer Vision (OpenCV)'],
    salaryEntry: '₹7 Lakh - ₹20 Lakh / year',
    salaryMid: '₹22 Lakh - ₹55 Lakh / year',
    growthOutlook: 'High',
    growthReason: 'Surge in warehouse automation (Amazon, Flipkart), defense unmanned aerial vehicles (UAVs), and autonomous electric vehicles.',
    courseIds: ['btech_ece', 'btech_mech', 'btech_cse'],
    routes: [
      {
        title: 'Route 1: B.Tech in Electronics / Mechatronics Engineering',
        type: 'Direct / Traditional',
        description: 'Direct multi-disciplinary engineering path combining electrical hardware and mechanical dynamics.',
        steps: ['Pass 12th PCM', 'Take JEE Main / BITSAT', 'Pursue B.Tech in Mechatronics or ECE', 'Participate in collegiate robotics competitions (Robocon / e-Yantra)', 'Join robotics and drone manufacturers'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'JEE Main, Hands-on hardware prototyping'
      },
      {
        title: 'Route 2: B.Tech Mechanical ➔ Master’s / Robotics Specialization',
        type: 'Alternative Route',
        description: 'Master physical dynamics, CAD, and materials, then add software control loops via postgrad.',
        steps: ['Complete B.Tech Mechanical', 'Learn ROS and embedded C++', 'Pursue M.Tech / MS in Robotics or Autonomous Systems', 'Join autonomous vehicle or industrial robotics firms'],
        typicalDuration: '4 to 6 Years',
        requiredExamsOrPrep: 'GATE or GRE'
      }
    ]
  },
  {
    id: 'aerospace_engineer',
    title: 'Aerospace & Propulsion Engineer',
    domain: 'Engineering & Hardware',
    shortDesc: 'Designs, analyzes, and tests flight vehicles, satellite launch systems, rocket engines, and aerodynamic structures.',
    dayToDay: [
      'Perform computational fluid dynamics (CFD) and finite element stress analysis (FEA).',
      'Optimize aerodynamic lift-to-drag ratios and propulsion combustion chamber designs.',
      'Conduct wind tunnel tests and vibration acoustic assessments.',
      'Ensure strict aerospace safety, redundancy, and spaceflight qualification standards.'
    ],
    skills: ['Aerodynamics & Propulsion', 'ANSYS Fluent / OpenFOAM', 'SolidWorks / CATIA', 'MATLAB & Simulink', 'Thermal & Stress Analysis'],
    salaryEntry: '₹6.5 Lakh - ₹18 Lakh / year',
    salaryMid: '₹20 Lakh - ₹45 Lakh / year',
    growthOutlook: 'High',
    growthReason: 'India’s private space boom (Skyroot, Agnikul, Pixxel) plus expanding commercial aviation and defense modernization.',
    courseIds: ['btech_aerospace', 'btech_mech'],
    routes: [
      {
        title: 'Route 1: B.Tech Aerospace Engineering (IITs / IIST)',
        type: 'Direct / Traditional',
        description: 'Direct entry into premier institutions like IIT Kanpur, IIT Madras, IIT Bombay, or IIST (direct feeder to ISRO).',
        steps: ['Pass 12th PCM', 'Top JEE Advanced rank', 'Complete 4-Year B.Tech Aerospace Engineering', 'Join ISRO, DRDO, or space tech startups like Skyroot and Agnikul'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'JEE Advanced'
      },
      {
        title: 'Route 2: B.Tech Mechanical ➔ M.Tech / MS Aerospace',
        type: 'Alternative Route',
        description: 'Mechanical engineers have strong foundational fluid mechanics and thermodynamics and easily transition into aerospace.',
        steps: ['Graduate with B.Tech Mechanical', 'Take GATE in Aerospace or Mechanical', 'Complete M.Tech in Aerospace at IISc / IITs', 'Enter propulsion and defense R&D'],
        typicalDuration: '6 Years (4 + 2)',
        requiredExamsOrPrep: 'GATE exam'
      }
    ]
  },
  {
    id: 'cyber_security',
    title: 'Cyber Security Analyst & Ethical Hacker',
    domain: 'Technology & Software',
    shortDesc: 'Protects critical infrastructure, financial networks, and corporate servers from ransomware, breaches, and cyber espionage.',
    dayToDay: [
      'Conduct penetration testing and red-team vulnerability assessments on web apps and cloud servers.',
      'Monitor Security Operations Center (SOC) telemetry and investigate suspicious intrusion alerts.',
      'Implement cryptographic safeguards, zero-trust network access, and identity controls.',
      'Lead incident response and forensic analysis after security breaches.'
    ],
    skills: ['Network Protocols (TCP/IP, Wireshark)', 'Ethical Hacking & Burp Suite', 'Linux Administration & Bash', 'Cloud Security (AWS/Azure IAM)', 'Digital Forensics & SIEM tools'],
    salaryEntry: '₹7 Lakh - ₹20 Lakh / year',
    salaryMid: '₹24 Lakh - ₹55 Lakh+ / year',
    growthOutlook: 'Very High',
    growthReason: 'Exponential surge in global cyber threats, government mandate for data protection, and critical infrastructure safeguarding.',
    courseIds: ['btech_cse', 'bca_cs', 'bsc_cs_ds'],
    routes: [
      {
        title: 'Route 1: B.Tech CSE with Cyber Security Specialization',
        type: 'Direct / Traditional',
        description: 'Structured computer science degree paired with network security and cryptography coursework.',
        steps: ['Pass 12th PCM', 'Complete B.Tech in CSE', 'Earn industry certifications (CEH, CompTIA Security+, OSCP)', 'Join corporate security teams or CERT-In'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'JEE Main, OSCP certification'
      },
      {
        title: 'Route 2: BCA / B.Sc IT + Practical Bug Bounty Portfolio',
        type: 'Lateral / Bridge',
        description: 'Focus heavily on hands-on security challenges (TryHackMe, Hack The Box) and reporting vulnerabilities via HackerOne.',
        steps: ['Pass 12th', 'Take BCA or B.Sc IT', 'Practice on Hack The Box and submit real bug bounties', 'Build undeniable proof-of-work in ethical hacking', 'Hired as Junior Security Analyst / Pentester'],
        typicalDuration: '3 Years',
        requiredExamsOrPrep: 'Practical certs like CEH / OSCP'
      }
    ]
  },
  {
    id: 'commercial_pilot',
    title: 'Commercial Airline Pilot',
    domain: 'Defence & Aviation',
    shortDesc: 'Commands commercial passenger aircraft or cargo freighters on domestic and international flight routes.',
    dayToDay: [
      'Review weather charts, NOTAMs, flight dispatch logs, and calculate fuel consumption requirements.',
      'Perform thorough pre-flight walkaround inspections of aircraft control surfaces and landing gear.',
      'Operate multi-million dollar glass-cockpit flight management systems and communicate with ATC.',
      'Handle emergency procedures, cross-wind landings, and instrument approaches in low visibility.'
    ],
    skills: ['Situational Awareness & Decisiveness', 'Multi-tasking under Pressure', 'Aerodynamics & Instrument Flying', 'CRM (Crew Resource Management)', 'Radio Telephony (RTR-A)'],
    salaryEntry: '₹18 Lakh - ₹30 Lakh / year (First Officer)',
    salaryMid: '₹60 Lakh - ₹1.2 Crore+ / year (Captain / LTC)',
    growthOutlook: 'Very High',
    growthReason: 'India is the fastest-growing aviation market in the world with over 1,500 new aircraft ordered by IndiGo, Air India, and Akasa.',
    courseIds: ['commercial_pilot', 'nda_pcm'],
    routes: [
      {
        title: 'Route 1: Cadet Pilot Programme (Airline Sponsored)',
        type: 'Direct / Traditional',
        description: 'Direct entry program run by airlines (IndiGo, Air India) offering guaranteed employment upon successful license and type-rating completion.',
        steps: ['Pass 12th with PCM min 50-60%', 'Clear Airline Cadet Pilot entrance assessments & DGCA Class 1 Medical', 'Complete Ground School & CPL flying training abroad/India', 'Complete Type Rating on A320 or B737', 'Inducted as Junior First Officer in airline'],
        typicalDuration: '18 to 24 Months',
        requiredExamsOrPrep: 'ADAPT test, DGCA Ground Exams, Airline Entrance'
      },
      {
        title: 'Route 2: Independent CPL via Flying Club (IGRUA / Private / Abroad)',
        type: 'Alternative Route',
        description: 'More flexible training route where student self-finances 200 flying hours and converts foreign license to DGCA CPL.',
        steps: ['Clear DGCA Class 1 Medical and 12th PCM verification', 'Clear DGCA theory exams (Nav, Met, Regs, Tech)', 'Complete 200 hours flight training at IGRUA or abroad (USA/NZ)', 'Obtain DGCA CPL and take Airline First Officer vacancy tests'],
        typicalDuration: '2 to 3 Years',
        requiredExamsOrPrep: 'DGCA Theory Papers, Flight Tests'
      },
      {
        title: 'Route 3: Indian Air Force Fighter / Transport Pilot ➔ Civil Aviation',
        type: 'Lateral / Bridge',
        description: 'Serve country with honor for 10-14 years in Indian Air Force, then transition to commercial airlines as high-seniority Captain.',
        steps: ['Join IAF via NDA after 12th PCM or CDS after graduation', 'Commissioned as Flying Officer; log thousands of high-performance flight hours', 'Retire/PMR after bond and obtain civil ALTP license', 'Direct entry as airline Captain'],
        typicalDuration: 'Military career then civil transition',
        requiredExamsOrPrep: 'NDA / AFCAT / CDS Exam'
      }
    ]
  },
  {
    id: 'naval_officer',
    title: 'Naval Officer (Defence & Merchant Navy)',
    domain: 'Defence & Aviation',
    shortDesc: 'Commands warships, submarines, or massive commercial container vessels navigating international waters.',
    dayToDay: [
      'Direct ship navigation, radar surveillance, bridge watches, and collision avoidance protocols.',
      'Oversee marine engineering propulsion plants, diesel power generators, and ballast water systems.',
      'Conduct tactical maritime patrols or coordinate complex cargo loading in foreign seaports.',
      'Lead multinational ship crews in high-stress maritime conditions.'
    ],
    skills: ['Maritime Navigation & Seamanship', 'Leadership under Extreme Conditions', 'Marine Propulsion & Systems', 'International Maritime Law (STCW)', 'Crisis Management'],
    salaryEntry: '₹12 Lakh - ₹28 Lakh / year (Merchant Navy often tax-free NRI)',
    salaryMid: '₹35 Lakh - ₹85 Lakh+ / year (Captain / Chief Engineer)',
    growthOutlook: 'High',
    growthReason: 'Over 90% of global trade travels by sea; India provides over 10% of the world’s qualified mariners.',
    courseIds: ['merchant_navy', 'nda_pcm'],
    routes: [
      {
        title: 'Route 1: Merchant Navy Deck Cadet / B.Sc Nautical Science',
        type: 'Direct / Traditional',
        description: 'Direct entry into commercial global shipping lines (Maersk, Anglo-Eastern, Synergy, Scorpio).',
        steps: ['Pass 12th PCM with min 60%', 'Clear IMU-CET and Company Sponsorship exam', 'Complete 3-Year B.Sc Nautical Science', 'Complete 12-18 months onboard sea training', 'Clear 2nd Mate exams and become 3rd Officer'],
        typicalDuration: '3 Years + Sea Time',
        requiredExamsOrPrep: 'IMU-CET, Company Sponsorship interview'
      },
      {
        title: 'Route 2: Indian Navy Officer via NDA / Naval Academy',
        type: 'Alternative Route',
        description: 'Military command track defending maritime borders and commanding frigates, destroyers, and submarines.',
        steps: ['Pass 12th PCM', 'Clear UPSC NDA & NA exam', 'Undergo 3 years training at NDA + 1 year at Indian Naval Academy (INA Ezhimala)', 'Commissioned as Sub-Lieutenant in Indian Navy with B.Tech degree'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'NDA Written + 5-Day SSB Interview'
      }
    ]
  },
  {
    id: 'quant_analyst',
    title: 'Quantitative Analyst / Algorithmic Trader',
    domain: 'AI & Data Science',
    shortDesc: 'Builds complex mathematical models and ultra-low latency algorithmic systems to trade financial markets.',
    dayToDay: [
      'Formulate mathematical pricing and statistical arbitrage models for options, futures, and equities.',
      'Backtest algorithmic trading strategies on terabytes of high-frequency order book data.',
      'Code ultra-low-latency execution engines in modern C++.',
      'Monitor real-time value-at-risk (VaR) and dynamic hedging parameters.'
    ],
    skills: ['Advanced Probability & Stochastic Calculus', 'Modern C++ (C++20) & Python', 'Statistical Arbitrage & Time Series', 'Linear Algebra & Optimization', 'High Frequency Trading Systems'],
    salaryEntry: '₹25 Lakh - ₹60 Lakh+ / year (Top HFTs offer ₹1 Cr+)',
    salaryMid: '₹80 Lakh - ₹2.5 Crore+ / year',
    growthOutlook: 'Very High',
    growthReason: 'Quant funds (Tower Research, Jane Street, Graviton, WorldQuant, AlphaGrep) offer highest packages in Indian campuses.',
    courseIds: ['bsc_math_stat', 'btech_cse', 'bsc_cs_ds', 'actuarial_science'],
    routes: [
      {
        title: 'Route 1: ISI B.Stat / B.Math Elite Quantitative Track',
        type: 'Direct / Traditional',
        description: 'Indian Statistical Institute graduates are among the most revered in global quant finance.',
        steps: ['Pass 12th with supreme mathematical aptitude', 'Clear ISI Admission Test', 'Complete B.Stat / M.Stat', 'Recruited directly by global hedge funds and proprietary trading desks'],
        typicalDuration: '3 to 5 Years',
        requiredExamsOrPrep: 'ISI Admission Test'
      },
      {
        title: 'Route 2: IIT B.Tech CSE / Electrical + Competitive Coding & Math',
        type: 'Alternative Route',
        description: 'Top rankers in IIT Computer Science / Electrical recruited for algorithmic development.',
        steps: ['Top JEE Advanced rank', 'Complete B.Tech in CSE / EE at top-5 IIT', 'Master advanced probability and fast C++ coding', 'HFT on-campus hiring in final year'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'JEE Advanced, Codeforces Candidate Master+'
      }
    ]
  },
  {
    id: 'product_manager',
    title: 'Product Manager (Tech & SaaS)',
    domain: 'Finance & Management',
    shortDesc: 'Acts as the mini-CEO of a software feature or product, defining what to build, why, and aligning engineering with business goals.',
    dayToDay: [
      'Define product strategy, write detailed PRDs (Product Requirement Documents), and manage feature roadmaps.',
      'Conduct deep customer interviews and synthesize user pain points.',
      'Analyze product conversion funnels, retention cohorts, and revenue growth metrics in Amplitude / Mixpanel.',
      'Lead sprint planning with engineers, designers, and sales teams.'
    ],
    skills: ['Product Strategy & Roadmapping', 'User Empathy & Research', 'Data Analysis (SQL, Mixpanel)', 'Technical Communication', 'Business Model & Unit Economics'],
    salaryEntry: '₹12 Lakh - ₹28 Lakh / year',
    salaryMid: '₹32 Lakh - ₹75 Lakh+ / year',
    growthOutlook: 'Very High',
    growthReason: 'Tech companies need strategic thinkers who can bridge engineering complexity and business profitability.',
    courseIds: ['btech_cse', 'bba_ipm', 'bdes_design'],
    routes: [
      {
        title: 'Route 1: B.Tech Engineering ➔ Software Engineer ➔ Internal Product Transition',
        type: 'Direct / Traditional',
        description: 'The most popular path into product management. Understand tech feasibility first, then step into product ownership.',
        steps: ['Graduate with B.Tech CSE or any engineering branch', 'Work as Software Engineer or Data Analyst for 2-3 years', 'Actively take ownership of user problems and PRD drafting', 'Transition to Associate Product Manager (APM)'],
        typicalDuration: '4 Years UG + 2 Years Industry experience',
        requiredExamsOrPrep: 'Technical fluency & product case study interviews'
      },
      {
        title: 'Route 2: IIM 5-Year IPM Program (Direct from 12th)',
        type: 'Alternative Route',
        description: 'Combines undergraduate business foundation with premier IIM management training straight after 12th.',
        steps: ['Pass 12th in ANY stream', 'Clear IPMAT', 'Complete 5-Year IPM at IIM Indore / Rohtak', 'Join tech conglomerates or consulting firms as APM / Consultant'],
        typicalDuration: '5 Years',
        requiredExamsOrPrep: 'IPMAT entrance test'
      },
      {
        title: 'Route 3: Design (B.Des) ➔ Product Management',
        type: 'Lateral / Bridge',
        description: 'Designers have world-class user empathy. Moving into Product Management allows them to control strategy and business decisions.',
        steps: ['Complete B.Des or UX career', 'Learn business metrics and software engineering scoping', 'Transition directly into Product Manager'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'Business fundamentals'
      }
    ]
  },
  {
    id: 'architect_planner',
    title: 'Architect & Sustainable Urban Designer',
    domain: 'Engineering & Hardware',
    shortDesc: 'Designs eco-friendly buildings, modern residences, commercial complexes, and master plans for resilient smart cities.',
    dayToDay: [
      'Create 3D structural building concepts, spatial layouts, and BIM models in Revit and Rhino.',
      'Consult with structural, plumbing, and electrical engineers to ensure code safety.',
      'Conduct solar irradiance, natural ventilation, and green building environmental simulations.',
      'Inspect construction sites to verify contractor adherence to architectural blueprints.'
    ],
    skills: ['Revit & BIM Modeling', 'AutoCAD & Rhino / Grasshopper', 'Sustainable Building Design (GRIHA / LEED)', 'Building Bye-laws & Structural Norms', 'Aesthetic & Spatial Sensibility'],
    salaryEntry: '₹4.5 Lakh - ₹10 Lakh / year',
    salaryMid: '₹14 Lakh - ₹35 Lakh+ / year (High upside for private practice)',
    growthOutlook: 'Steady',
    growthReason: 'Rapid urbanization across Tier 1 & Tier 2 Indian cities plus push for green, zero-carbon building standards.',
    courseIds: ['barch', 'btech_civil'],
    routes: [
      {
        title: 'Route 1: 5-Year B.Arch through NATA / JEE Paper 2',
        type: 'Direct / Traditional',
        description: 'Mandatory professional council (COA) licensing path required to sign architectural blueprints in India.',
        steps: ['Pass 12th PCM', 'Clear NATA or JEE Main Paper 2', 'Complete 5-Year B.Arch at SPA Delhi / CEPT / IIT Kharagpur', 'Register with Council of Architecture (COA)', 'Join architectural firms or launch independent studio'],
        typicalDuration: '5 Years',
        requiredExamsOrPrep: 'NATA / JEE Main Paper 2'
      }
    ]
  },
  {
    id: 'game_developer',
    title: 'Game Developer & Interactive 3D Engineer',
    domain: 'Technology & Software',
    shortDesc: 'Builds immersive video games, real-time physics engines, VR/AR simulations, and interactive 3D worlds.',
    dayToDay: [
      'Code gameplay mechanics, combat systems, and AI opponent behavior in Unreal Engine or Unity.',
      'Write custom shaders (HLSL/GLSL) for real-time lighting and volumetric particle effects.',
      'Profile frame rates and optimize memory allocations for PC, console, and mobile devices.',
      'Collaborate with 3D artists, sound designers, and level creators.'
    ],
    skills: ['C++ & C#', 'Unreal Engine 5 & Unity', '3D Math, Vectors & Quaternions', 'Graphics Programming (DirectX / OpenGL / Vulkan)', 'Shader Programming'],
    salaryEntry: '₹6 Lakh - ₹16 Lakh / year',
    salaryMid: '₹18 Lakh - ₹45 Lakh+ / year',
    growthOutlook: 'High',
    growthReason: 'India is one of the world’s largest gaming markets; global studios (Ubisoft, Rockstar, EA) have huge engineering hubs in India.',
    courseIds: ['btech_cse', 'bca_cs', 'bdes_design'],
    routes: [
      {
        title: 'Route 1: B.Tech CSE + Game Engine Specialization',
        type: 'Direct / Traditional',
        description: 'Master computer graphics, linear algebra, and data structures while building indie games in Unreal Engine.',
        steps: ['Pass 12th PCM', 'Pursue B.Tech CSE', 'Specialize in computer graphics and game mechanics', 'Publish playable demos on itch.io and Steam', 'Recruited by AAA or mobile gaming studios'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'Portfolio of playable prototypes'
      }
    ]
  },
  {
    id: 'defense_officer',
    title: 'Military Officer (Air Force Fighter Pilot / Army Engineer)',
    domain: 'Defence & Aviation',
    shortDesc: 'Commands troops, pilots supersonic fighter jets (Rafale/Su-30), or oversees high-tech electronic warfare and tactical signals.',
    dayToDay: [
      'Lead combat squadrons, regiments, or missile defense batteries.',
      'Execute tactical operational planning, reconnaissance, and security defense missions.',
      'Maintain rigorous physical readiness and troop welfare.',
      'Manage high-tech electronic warfare, satellite communication, and advanced weapons systems.'
    ],
    skills: ['Courage under Fire & Absolute Leadership', 'Strategic Tactics & Decisive Command', 'Physical Fitness & Mental Resilience', 'Weapons & Radar Technology', 'Protocol & Discipline'],
    salaryEntry: '₹14 Lakh - ₹22 Lakh / year + High perks, housing, pensions, canteen & medical',
    salaryMid: '₹28 Lakh - ₹45 Lakh / year (Colonel / Group Captain / Commodore)',
    growthOutlook: 'Steady',
    growthReason: 'Permanent noble profession with unparalleled prestige, leadership training, and national service.',
    courseIds: ['nda_pcm', 'btech_aerospace', 'btech_ece'],
    routes: [
      {
        title: 'Route 1: National Defence Academy (NDA) right after 12th PCM',
        type: 'Direct / Traditional',
        description: 'The ultimate cradle of military leadership. Commissioned as an officer at age 21.',
        steps: ['Pass 12th PCM', 'Clear UPSC NDA Written exam', 'Pass 5-day SSB interview and medical board', 'Complete 3-year NDA + 1-year IMA/AFA/INA training', 'Commissioned as Lieutenant / Flying Officer'],
        typicalDuration: '4 Years (Fully Funded)',
        requiredExamsOrPrep: 'NDA exam + SSB'
      },
      {
        title: 'Route 2: B.Tech Engineering ➔ University Entry Scheme (UES) / TGC / AFCAT',
        type: 'Lateral / Bridge',
        description: 'Graduate with an engineering degree and enter armed forces directly through technical entry without written exam.',
        steps: ['Complete B.Tech in CSE, ECE, Mech, or Civil', 'Apply for Army Technical Graduate Course (TGC) or Navy Executive/Tech entry', 'Direct call for SSB interview', 'Join Indian Military Academy / Naval Academy as Technical Officer'],
        typicalDuration: '4 Years UG + 1 Year Academy',
        requiredExamsOrPrep: 'SSB Interview'
      }
    ]
  },
  {
    id: 'actuary_risk',
    title: 'Certified Actuary & Risk Modeler',
    domain: 'Finance & Management',
    shortDesc: 'Uses probability theory, mortality statistics, and financial mathematics to calculate risk and price multi-billion dollar insurance policies.',
    dayToDay: [
      'Calculate insurance reserves, premiums, and life annuity values using stochastic models.',
      'Analyze catastrophic risk probabilities (hurricanes, pandemics, financial crashes).',
      'Ensure pension funds and insurance firms comply with solvency margin regulations.',
      'Design new underwriting policies and insurance products.'
    ],
    skills: ['Financial Mathematics & Compound Interest', 'Actuarial Modeling (Prophet / R / Python)', 'Survival Analysis & Contingencies', 'Solvency II & IRDAI Regulations', 'Statistical Inference'],
    salaryEntry: '₹9 Lakh - ₹22 Lakh / year',
    salaryMid: '₹35 Lakh - ₹80 Lakh+ / year (Fully qualified Fellows earn ₹1 Cr+)',
    growthOutlook: 'High',
    growthReason: 'Extremely scarce qualification; fewer than 600 fully certified actuaries exist in all of India.',
    courseIds: ['actuarial_science', 'bsc_math_stat', 'bcom_fintech'],
    routes: [
      {
        title: 'Route 1: B.Sc in Math / Statistics / Actuarial Science + IAI Exams',
        type: 'Direct / Traditional',
        description: 'Clear Core Principles (CB1, CB2, CS1, CS2, CM1, CM2) papers alongside college.',
        steps: ['Pass 12th with high marks in Math', 'Enroll in B.Sc Math / Statistics or Actuarial Science', 'Register with Institute of Actuaries of India (IAI) or IFoA UK', 'Clear 3 to 6 papers during college', 'Hired by global insurance consultancies (Aon, Willis Towers Watson, Swiss Re)'],
        typicalDuration: '3 to 5 Years',
        requiredExamsOrPrep: 'ACET / IAI Professional Papers'
      }
    ]
  },
  {
    id: 'cyber_lawyer',
    title: 'Corporate & Cyber Technology Lawyer',
    domain: 'Law & Policy',
    shortDesc: 'Advises tech conglomerates, venture capitals, and startups on data privacy (DPDP), intellectual property, AI governance, and mergers.',
    dayToDay: [
      'Draft and negotiate cloud enterprise contracts, cross-border IP licensing, and SaaS terms.',
      'Guide companies through data breach compliance under India’s Digital Personal Data Protection Act.',
      'File software and hardware patent applications before patent offices.',
      'Represent tech clients in technology arbitration and antitrust disputes.'
    ],
    skills: ['Data Protection Law & GDPR', 'Intellectual Property & Patents', 'Contract Drafting & Negotiation', 'Technology Fluency & AI Regulations', 'Legal Research & Advocacy'],
    salaryEntry: '₹8 Lakh - ₹22 Lakh / year (Tier 1 Law Firms: Trilegal, CAM, SAM)',
    salaryMid: '₹30 Lakh - ₹75 Lakh+ / year',
    growthOutlook: 'Very High',
    growthReason: 'Strict privacy regulations, explosion of AI copyright issues, and soaring tech venture financings.',
    courseIds: ['ballb_tech'],
    routes: [
      {
        title: 'Route 1: 5-Year Integrated B.A./BBA LL.B through CLAT',
        type: 'Direct / Traditional',
        description: 'Premier national law university track with tech law electives.',
        steps: ['Pass 12th in ANY stream (Science students have massive advantage in patent law)', 'Clear CLAT exam', 'Complete 5-Year BA/BBA LL.B at top National Law University', 'Join Tier-1 law firms or multinational tech in-house legal teams'],
        typicalDuration: '5 Years',
        requiredExamsOrPrep: 'CLAT UG'
      },
      {
        title: 'Route 2: B.Tech Engineering ➔ 3-Year LL.B (Elite Patent Attorney Path)',
        type: 'Lateral / Bridge',
        description: 'The ultimate unicorn profile! To become a registered Patent Agent/Attorney for tech inventions, a technical science/engineering degree is mandatory.',
        steps: ['Complete B.Tech in CSE, ECE, Mech or Biotech', 'Appear for 3-Year LL.B entrance (DU / IIT Kharagpur Rajiv Gandhi School of IP Law)', 'Complete LL.B', 'Command astronomical fees drafting global tech patents and IP litigation'],
        typicalDuration: '7 Years (4 + 3)',
        requiredExamsOrPrep: 'Indian Patent Agent Exam, 3-Yr LLB Entrance'
      }
    ]
  },
  {
    id: 'fintech_analyst',
    title: 'FinTech & Investment Banking Analyst',
    domain: 'Finance & Management',
    shortDesc: 'Evaluates corporate valuations, builds DCF models, and analyzes decentralized finance and modern payment infrastructures.',
    dayToDay: [
      'Build dynamic three-statement financial models and discounted cash flow (DCF) projections.',
      'Prepare pitch decks and confidential information memorandums (CIM) for corporate mergers and acquisitions.',
      'Analyze payment gateway transaction margins and credit underwriting algorithms.',
      'Track macroeconomic interest rate trends and venture capital rounds.'
    ],
    skills: ['Financial Modeling & Excel', 'Corporate Valuation & M&A', 'Python for Finance & SQL', 'Accounting Principles', 'Pitch Deck Storytelling'],
    salaryEntry: '₹10 Lakh - ₹25 Lakh / year (Global banks: Goldman Sachs, Morgan Stanley, J.P. Morgan)',
    salaryMid: '₹35 Lakh - ₹90 Lakh+ / year',
    growthOutlook: 'Very High',
    growthReason: 'India is a global financial technology leader (UPI, digital lending, wealthtech) and top destination for global investment banks.',
    courseIds: ['bcom_fintech', 'bba_ipm', 'bsc_math_stat', 'btech_cse'],
    routes: [
      {
        title: 'Route 1: B.Com (Hons) / BBA Finance ➔ CFA / Investment Banking',
        type: 'Direct / Traditional',
        description: 'Focused finance fundamentals paired with international CFA charter exams.',
        steps: ['Pass 12th Commerce or Science', 'Enroll in premier B.Com (Hons) at DU / Christ / NMIMS', 'Clear CFA Level 1 in final year', 'Join investment banking or private equity analyst programs'],
        typicalDuration: '3 to 4 Years',
        requiredExamsOrPrep: 'CUET-UG, CFA Level 1'
      },
      {
        title: 'Route 2: Engineering Degree (B.Tech) ➔ Top MBA (CAT / IIMs)',
        type: 'Alternative Route',
        description: 'The classic Indian power route: high analytical capability from B.Tech followed by IIM Ahmedabad/Bangalore/Calcutta finance specialization.',
        steps: ['Complete B.Tech', 'Crack CAT exam with 99+ percentile', 'Complete 2-Year PGP/MBA at top IIM', 'Hired as Front-Office Investment Banker or Private Equity Associate'],
        typicalDuration: '6 Years (4 + 2)',
        requiredExamsOrPrep: 'CAT Exam'
      }
    ]
  },
  {
    id: 'scientific_researcher',
    title: 'Research Scientist / Deep-Tech Innovator',
    domain: 'Sciences & Research',
    shortDesc: 'Pushes the boundaries of human knowledge in quantum physics, materials science, astrophysics, or biomolecular therapeutics.',
    dayToDay: [
      'Design laboratory experiments and run high-precision spectroscopic and cryogenic instruments.',
      'Derive theoretical equations and model quantum simulations on supercomputing clusters.',
      'Write peer-reviewed research papers and defend findings at international scientific symposia.',
      'Secure government and private research grants to fund lab equipment and doctoral students.'
    ],
    skills: ['First-Principles Scientific Method', 'Experimental Lab Instrumentation', 'Python / MATLAB Simulations', 'Academic Writing & LaTeX', 'Statistical Validation'],
    salaryEntry: '₹7 Lakh - ₹15 Lakh / year (Postdoc / Junior Scientist in Govt Labs like CSIR/ISRO/TIFR)',
    salaryMid: '₹20 Lakh - ₹50 Lakh+ / year (Higher in corporate deep-tech labs like IBM Research, Microsoft Research)',
    growthOutlook: 'High',
    growthReason: 'Massive investments in National Quantum Mission, semiconductor fabrication, and clean green energy storage.',
    courseIds: ['integrated_msc', 'bsc_physics', 'bsc_math_stat'],
    routes: [
      {
        title: 'Route 1: 5-Year BS-MS at IISERs / NISER ➔ PhD Abroad / India',
        type: 'Direct / Traditional',
        description: 'The golden research track built specifically by the Govt of India to produce world-class scientists.',
        steps: ['Pass 12th PCM with top marks', 'Clear IAT (IISER Aptitude Test) or NEST', 'Complete 5-Year Integrated BS-MS', 'Obtain fully funded PhD fellowship at top international institutions (Max Planck, MIT, Caltech) or TIFR/IISc', 'Become Principal Investigator / Staff Scientist'],
        typicalDuration: '5 Years BS-MS + 4-5 Years PhD',
        requiredExamsOrPrep: 'IAT / NEST, GRE / TOEFL'
      }
    ]
  },
  {
    id: 'civil_engineer',
    title: 'Senior Civil & Infrastructure Project Manager',
    domain: 'Engineering & Hardware',
    shortDesc: 'Directs the engineering and execution of high-speed rail corridors, underground metros, sea links, and skyscraper structures.',
    dayToDay: [
      'Review structural integrity calculations, load stress curves, and earthquake seismic resistance.',
      'Coordinate with site engineers, concrete mix plants, and heavy tunneling machinery operators.',
      'Manage multi-crore infrastructure project schedules using Primavera and BIM software.',
      'Ensure zero-tolerance safety and quality control compliance on active mega-sites.'
    ],
    skills: ['Structural Analysis (ETABS / STAAD.Pro)', 'Building Information Modeling (BIM)', 'Contract Administration & FIDIC norms', 'Geotechnical Mechanics', 'Project Scheduling (Primavera P6)'],
    salaryEntry: '₹5 Lakh - ₹12 Lakh / year',
    salaryMid: '₹18 Lakh - ₹40 Lakh+ / year',
    growthOutlook: 'Steady',
    growthReason: 'Unprecedented government infrastructure spending (National Infrastructure Pipeline, Bullet Train, Expressway network).',
    courseIds: ['btech_civil'],
    routes: [
      {
        title: 'Route 1: B.Tech Civil ➔ Mega-Contractors (L&T, Tata Projects)',
        type: 'Direct / Traditional',
        description: 'Join premier engineering giants on-campus and rise through execution engineering.',
        steps: ['Pass 12th PCM', 'Complete B.Tech in Civil Engineering', 'Recruited as Graduate Engineer Trainee (GET) at L&T, Shapoorji Pallonji, or Afcons', 'Manage flagship infrastructure sites'],
        typicalDuration: '4 Years',
        requiredExamsOrPrep: 'JEE Main'
      },
      {
        title: 'Route 2: UPSC Indian Engineering Services (IES) / Central Govt',
        type: 'Alternative Route',
        description: 'Elite gazetted officer positions in Indian Railways, Central Public Works Dept (CPWD), and Border Roads Organisation (BRO).',
        steps: ['Graduate with B.Tech Civil', 'Crack UPSC Engineering Services Exam (ESE)', 'Appointed as Assistant Executive Engineer (Group A Gazetted)', 'Direct massive public infrastructure works'],
        typicalDuration: '4 Years UG + 1 Year Exam Prep',
        requiredExamsOrPrep: 'UPSC ESE / IES'
      }
    ]
  },
  {
    id: 'technical_founder',
    title: 'Technical Founder / Startup CTO',
    domain: 'Technology & Software',
    shortDesc: 'Builds innovative tech products from zero to one, raises venture capital funding, and scales revolutionary technology companies.',
    dayToDay: [
      'Architect the minimum viable product (MVP) and code core proprietary intellectual property.',
      'Pitch venture capital funds and angel investors to secure funding rounds.',
      'Recruit initial rockstar engineering, design, and marketing talent.',
      'Talk directly to first 100 paying customers to find product-market fit.'
    ],
    skills: ['Rapid Prototyping & Full-Stack Tech', 'Vision & Storytelling', 'Customer Discovery', 'Venture Fundraising', 'Hiring & Resilience'],
    salaryEntry: 'Equity Driven / ₹6 Lakh - ₹18 Lakh early stipend',
    salaryMid: '₹50 Lakh+ / Multimillion Dollar Net Worth upon exit',
    growthOutlook: 'Very High',
    growthReason: 'India is the 3rd largest startup ecosystem in the world with over 110 unicorns and massive domestic venture capital.',
    courseIds: ['btech_cse', 'bdes_design', 'bba_ipm'],
    routes: [
      {
        title: 'Route 1: Technical Degrees + Startup Incubator / Hackathons',
        type: 'Direct / Traditional',
        description: 'Build projects during college, find co-founders, and launch directly or after 1-2 years in a fast-paced startup.',
        steps: ['Learn full-stack programming or hardware design in college', 'Win national hackathons and launch real side projects with active users', 'Apply to incubators (Y Combinator, Antler, IIT Innovation Cells)', 'Raise seed funding and scale full-time'],
        typicalDuration: 'College to Post-College',
        requiredExamsOrPrep: 'Proof-of-work, Traction, Grit'
      }
    ]
  }
];

export const SWITCHING_ROUTES: SwitchingRoute[] = [
  {
    id: 'switch_eng_to_design',
    title: 'From Engineering (PCM/B.Tech) ➔ UX / Product Design',
    fromDomain: 'Engineering & Technology',
    toDomain: 'Design & Creative',
    commonScenario: 'Enrolled in B.Tech (or completed 12th PCM) but passionate about visual aesthetics, psychology, and creative digital interfaces rather than raw code.',
    howToSwitch: 'Design does NOT require a traditional fine arts degree. Technical students are favored in UX because they understand code feasibility and systemic logic.',
    requirements: 'Strong portfolio of 3-4 end-to-end case studies demonstrating problem definition, wireframing, and Figma prototypes.',
    timeline: '3 to 6 months of focused portfolio building, or 2-year M.Des post-graduation.',
    difficulty: 'Low',
    proTips: [
      'Master Figma, auto-layout, components, and design systems.',
      'Redesign an existing clunky Indian app (e.g. IRCTC, bank portals) and publish an in-depth case study on Medium or LinkedIn.',
      'Take CEED / UCEED (IIT Bombay accepts all graduates for M.Des Interaction Design).'
    ],
    recommendedCoursesOrCerts: ['Google UX Design Professional Certificate', 'Interaction Design Foundation (IxDF)', 'CEED Exam for IIT M.Des']
  },
  {
    id: 'switch_eng_to_pm',
    title: 'From Engineering ➔ Product Management',
    fromDomain: 'Engineering & Technology',
    toDomain: 'Finance & Management',
    commonScenario: 'Enjoy understanding "why" features are built, talking to users, and steering business strategy instead of coding all day.',
    howToSwitch: 'Work as a software developer or data analyst for 1-2 years, take ownership of feature roadmaps, write PRDs, and transition internally or via APM cohorts.',
    requirements: 'Demonstrated product sense, metric fluency (retention, CAC, LTV), and user empathy.',
    timeline: '6 to 18 months in industry or direct post-MBA (IIMs / ISB).',
    difficulty: 'Moderate',
    proTips: [
      'Deconstruct products you use daily: what is their north star metric? Why did they add this button?',
      'Volunteer to write product requirement specs (PRDs) in your current team.',
      'Read "Inspired" by Marty Cagan and "Cracking the PM Interview".'
    ],
    recommendedCoursesOrCerts: ['Reforge Product Strategy', 'Pragmatic Institute', 'IIM 1-Year Executive MBA (for mid-career)']
  },
  {
    id: 'switch_science_to_data',
    title: 'From Pure Science / Math (B.Sc) ➔ Data Science & AI',
    fromDomain: 'Sciences & Research',
    toDomain: 'AI & Data Science',
    commonScenario: 'Did B.Sc in Maths, Physics, Statistics, or Chemistry, and wants high-paying industry tech roles without doing a 4-year B.Tech.',
    howToSwitch: 'Pure science students have superior mathematical foundations (calculus, probability, linear algebra) which makes advanced machine learning much easier for them than average coders.',
    requirements: 'Learn Python, SQL, Pandas, Scikit-learn, and Git version control.',
    timeline: '4 to 8 months of self-study and building Kaggle projects, or 2-year M.Sc Data Science.',
    difficulty: 'Low',
    proTips: [
      'Emphasize your statistical rigor in your resume; companies are tired of "code-only" applicants who don’t understand model math.',
      'Publish your machine learning workflows on Kaggle and GitHub with clean documentation.',
      'Apply to Junior Data Analyst roles as an entry stepping stone.'
    ],
    recommendedCoursesOrCerts: ['Andrew Ng Machine Learning Specialization (Coursera)', 'IIT Madras BS in Data Science (Online degree)', 'Fast.ai Deep Learning']
  },
  {
    id: 'switch_any_to_law',
    title: 'From Any Degree (Science/Commerce) ➔ Corporate & Tech Law',
    fromDomain: 'Any Undergraduate Degree',
    toDomain: 'Law & Policy',
    commonScenario: 'Completed or studying 12th/Graduation in non-law stream, but fascinated by contracts, patent law, policy debates, and high-stakes advocacy.',
    howToSwitch: 'In India, you can enter law at two stages: (1) 5-year integrated law right after 12th in ANY stream via CLAT, or (2) 3-year LL.B after graduation in any field!',
    requirements: 'Clear CLAT (after 12th) or CUET-PG / DU LL.B / NLSAT (after graduation).',
    timeline: '3 Years (after graduation) or 5 Years (after 12th).',
    difficulty: 'Moderate',
    proTips: [
      'Science/Engineering graduates who become lawyers are the most valuable patent attorneys in the world because only they can read technical patents.',
      'Target NLSIU Bengaluru 3-Year LL.B (NLSAT) or Delhi University Faculty of Law.',
      'Focus on reading comprehension, current affairs, and logical reasoning.'
    ],
    recommendedCoursesOrCerts: ['CLAT-UG prep', 'NLSAT (National Law School Admissions Test for 3-yr LL.B)', 'Indian Patent Agent Examination']
  },
  {
    id: 'switch_diploma_to_btech',
    title: 'Polytechnic Diploma ➔ Direct 2nd Year B.Tech (Lateral Entry)',
    fromDomain: 'Vocational & Diploma',
    toDomain: 'Engineering & Technology',
    commonScenario: 'Chose a 3-year Polytechnic Diploma after 10th standard instead of traditional 11th-12th school, and wants an elite engineering degree.',
    howToSwitch: 'Take state lateral entry entrance exams (such as JELET in West Bengal, LEET in Haryana/Punjab, UPSEE Lateral, TANCET). Enter directly into the 3rd semester (2nd year) of B.Tech without losing any academic years!',
    requirements: 'Completion of 3-year AICTE-approved diploma with min 45-50% marks.',
    timeline: 'Seamless transition; finish B.Tech in 3 years instead of 4.',
    difficulty: 'Low',
    proTips: [
      'Diploma students usually outperform standard 12th entrants in practical engineering labs and workshop mechanics.',
      'Focus on revising engineering mathematics (calculus, differential equations) as 2nd year B.Tech math is rigorous.',
      'Look out for top state government engineering colleges that reserve 10% seats for lateral entry.'
    ],
    recommendedCoursesOrCerts: ['State Lateral Entry Entrance Tests (LEET / JELET / CET Lateral)']
  },
  {
    id: 'switch_commerce_to_fintech',
    title: 'From Traditional Commerce (B.Com) ➔ FinTech & Algorithmic Trading',
    fromDomain: 'Finance & Management',
    toDomain: 'AI & Data Science',
    commonScenario: 'Studied Commerce or Accountancy, but wants to enter the high-paying world of automated trading, digital payment infrastructure, and financial engineering.',
    howToSwitch: 'Add computational programming skills (Python for Finance, SQL, APIs) to your core accounting and financial acumen.',
    requirements: 'Understanding of financial instruments + proficiency in Python data analysis libraries.',
    timeline: '4 to 6 months of targeted scripting practice.',
    difficulty: 'Moderate',
    proTips: [
      'Build automated trading paper bots using Zerodha Kite Connect API or Upstox API.',
      'Learn how to backtest moving average and momentum strategies in Python.',
      'Combine CFA Level 1 with Python coding to stand out dramatically from traditional commerce peers.'
    ],
    recommendedCoursesOrCerts: ['Python for Financial Analysis and Algorithmic Trading (Udemy)', 'CFA Institute Investment Foundations', 'Zerodha Varsity']
  },
  {
    id: 'switch_any_to_upsc',
    title: 'From Any Background ➔ Civil Services (IAS / IPS / IFS / IRS)',
    fromDomain: 'Any Discipline',
    toDomain: 'Public Policy & Administration',
    commonScenario: 'Desire to serve the country at the highest administrative, diplomatic, or police levels with immense public policy impact.',
    howToSwitch: 'Any recognized graduate degree (B.Tech, MBBS, B.A, B.Com, B.Sc) makes you 100% eligible for the UPSC Civil Services Examination.',
    requirements: 'Graduation degree in any discipline + minimum 21 years of age.',
    timeline: '1 to 2 years of dedicated preparation.',
    difficulty: 'Challenging',
    proTips: [
      'Choose an optional subject that aligns with your graduation strength (e.g. Mathematics, Electrical Engineering, Geography, Political Science).',
      'Engineers consistently make up over 50-60% of selected candidates in recent UPSC CSE batches.',
      'Maintain a Plan B: acquire industry-relevant skills or pursue a Master’s degree alongside prep.'
    ],
    recommendedCoursesOrCerts: ['NCERT 6th to 12th foundational books', 'The Hindu / Indian Express daily editorial analysis', 'UPSC CSE Prelims & Mains test series']
  },
  {
    id: 'switch_mech_to_embedded',
    title: 'From Mechanical / Civil ➔ Embedded Systems & Software',
    fromDomain: 'Engineering & Hardware',
    toDomain: 'Technology & Software',
    commonScenario: 'Graduated in core engineering (Mechanical, Civil, Chemical) with limited on-campus core jobs, wanting to transition into software or IoT.',
    howToSwitch: 'Mechanical and core engineers have strong physical problem-solving skills. Learn embedded C/C++, Arduino/STM32 microcontrollers, and Linux.',
    requirements: 'C / C++ programming, data structures, and microcontroller interfacing.',
    timeline: '4 to 6 months.',
    difficulty: 'Moderate',
    proTips: [
      'Focus on Automotive EV companies (Ola Electric, Ather Energy, Tata Motors) where mechanical knowledge of vehicles combined with embedded software is a superpower!',
      'Build physical projects: drone flight controller, automated robotic arm, or CAN-bus telemetry reader.'
    ],
    recommendedCoursesOrCerts: ['Embedded Systems Programming on ARM Cortex-M (Udemy)', 'CDAC Post Graduate Diploma in Embedded Systems']
  }
];
