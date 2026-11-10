package com.pathway.explorer.repository;

import com.pathway.explorer.database.DatabaseManager;
import com.pathway.explorer.model.*;
import java.util.*;
import java.util.stream.Collectors;

public class PathwayRepository {

    private final List<EducationLevel> levels = new ArrayList<>();
    private final List<Course> courses = new ArrayList<>();
    private final List<EntranceExam> exams = new ArrayList<>();
    private final List<Career> careers = new ArrayList<>();
    private final List<SwitchingRoute> switchingRoutes = new ArrayList<>();
    private final DatabaseManager databaseManager = new DatabaseManager();

    public PathwayRepository() {
        initData();
    }

    private void initData() {
        // Levels
        levels.add(new EducationLevel(
            "12th_pcm",
            "12th Science (PCM)",
            "Core Focus",
            "12th",
            "Physics, Chemistry & Mathematics Stream",
            "Widest range of technological, scientific, design, architectural, defence, and numerical career pathways.",
            "17 - 18 years",
            List.of("Engineering (B.Tech)", "Architecture (B.Arch)", "Design (B.Des)", "Pure & Applied Sciences", "Defence (NDA)", "Aviation & Marine"),
            List.of("btech_cse", "btech_ece", "btech_mech", "btech_aerospace", "btech_civil", "bdes_design", "barch", "bca_cs", "bsc_cs_ds", "bsc_math_stat", "bsc_physics", "nda_pcm", "commercial_pilot", "merchant_navy", "actuarial_science", "integrated_msc", "bba_ipm", "ballb_tech")
        ));

        levels.add(new EducationLevel(
            "10th_pass",
            "After 10th Standard",
            "Foundation",
            "10th",
            "Secondary School Certificate / Matriculation",
            "Critical fork where students choose their 10+2 stream (Science PCM, PCB, Commerce, Arts) or Polytechnic Diploma.",
            "15 - 16 years",
            List.of("11th Science (PCM / PCB / PCMB)", "11th Commerce", "11th Arts & Humanities", "3-Year Polytechnic Diploma (Lateral Entry to B.Tech)"),
            List.of("btech_cse", "bdes_design", "bca_cs", "nda_pcm", "bcom_fintech", "ballb_tech")
        ));

        levels.add(new EducationLevel(
            "12th_pcb",
            "12th Science (PCB/PCMB)",
            "Medical & Life Sci",
            "12th",
            "Physics, Chemistry & Biology Stream",
            "Gateways to clinical medicine, pharmacy, biotechnology, clinical research, bioinformatics, and healthcare innovation.",
            "17 - 18 years",
            List.of("Medicine (MBBS/BDS)", "Pharmacy (B.Pharm)", "Biotech & Bioinformatics", "Allied Health Sciences"),
            List.of("mbbs_medicine", "bdes_design", "ballb_tech", "bba_ipm")
        ));

        levels.add(new EducationLevel(
            "12th_commerce",
            "12th Commerce",
            "Business & Finance",
            "12th",
            "Accountancy, Business Studies, Economics & Math",
            "Finance, corporate strategy, investment banking, charter qualifications (CA/CS/CFA), and management paths.",
            "17 - 18 years",
            List.of("Chartered Accountancy (CA)", "BBA / IPMAT (IIM 5-yr)", "B.Com (FinTech / Analytics)", "Corporate Law (CLAT)"),
            List.of("bcom_fintech", "bba_ipm", "ballb_tech", "bdes_design", "bca_cs")
        ));

        levels.add(new EducationLevel(
            "12th_arts",
            "12th Arts & Humanities",
            "Creative & Policy",
            "12th",
            "History, Political Science, Psychology, Sociology & Literature",
            "Public policy, civil services, design, journalism, legal systems, behavioral sciences, and communications.",
            "17 - 18 years",
            List.of("Design (UCEED / NID)", "Integrated Law (CLAT)", "Psychology & Cognitive Sciences", "Journalism & Media"),
            List.of("bdes_design", "ballb_tech", "bba_ipm")
        ));

        levels.add(new EducationLevel(
            "college_grad",
            "College / Undergraduates",
            "Lateral & Switches",
            "college",
            "Pursuing or Completed Undergraduate Degree",
            "Switching domains, lateral career shifts, specialized Master's, product/business transitions, and public service.",
            "19 - 22 years",
            List.of("MBA (CAT / GMAT)", "M.Tech / MS Abroad", "Product Management / UI-UX Switch", "3-Year LLB (Law)", "Civil Services (UPSC CSE)"),
            List.of("btech_cse", "bdes_design", "bba_ipm", "ballb_tech")
        ));

        // Exams
        exams.add(new EntranceExam(
            "jee_main",
            "JEE (Main)",
            "Joint Entrance Examination (Main)",
            "National Testing Agency (NTA)",
            "10+2 with Physics, Mathematics, and Chemistry/Bio/Tech Vocational with min 75% aggregate for NITs/IIITs.",
            "Twice a year (Session 1: Jan/Feb, Session 2: Apr)",
            "November - December",
            "January & April",
            "Computer Based Test: 90 questions (Physics, Chem, Maths) with negative marking (+4 / -1).",
            "https://jeemain.nta.nic.in",
            "High",
            "Focus heavily on NCERT basics for Chemistry; consistent speed practice for Physics and Mathematics.",
            List.of("btech_cse", "btech_ece", "btech_mech", "btech_aerospace", "btech_civil", "barch")
        ));

        exams.add(new EntranceExam(
            "jee_adv",
            "JEE (Advanced)",
            "Joint Entrance Examination (Advanced)",
            "Indian Institutes of Technology (IITs)",
            "Top ~2.5 lakh rankers in JEE Main with requisite category cutoff.",
            "Once a year (May / June)",
            "Late April / Early May",
            "Late May",
            "Two mandatory 3-hour papers on same day testing deep multi-concept application.",
            "https://jeeadv.ac.in",
            "High",
            "Requires deep first-principles conceptual understanding rather than rote problem solving.",
            List.of("btech_cse", "btech_ece", "btech_mech", "btech_aerospace", "integrated_msc")
        ));

        exams.add(new EntranceExam(
            "uceed",
            "UCEED",
            "Undergraduate Common Entrance Examination for Design",
            "IIT Bombay",
            "Students from ANY stream (PCM, PCB, Commerce, Arts) who passed 10+2.",
            "Once a year (January)",
            "October - November",
            "January",
            "Part A (Computer-based test: Spatial ability, Logic) + Part B (Hand-drawn sketching).",
            "https://www.uceed.iitb.ac.in",
            "High",
            "Open to Science, Commerce, and Arts students! Unlocks IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad B.Des.",
            List.of("bdes_design")
        ));

        exams.add(new EntranceExam(
            "nid_dat",
            "NID DAT",
            "National Institute of Design Design Aptitude Test",
            "National Institute of Design (NID)",
            "10+2 in any stream (Science, Commerce, Humanities).",
            "Once a year (Prelims in Dec/Jan, Mains in April)",
            "September - November",
            "December / January",
            "Prelims (Objective & Drawing questions) followed by DAT Mains (Studio test & portfolio).",
            "https://admissions.nid.edu",
            "High",
            "India's premier institute for Industrial, Communication, Interaction, and Textile Design.",
            List.of("bdes_design")
        ));

        exams.add(new EntranceExam(
            "cuet_ug",
            "CUET-UG",
            "Common University Entrance Test (UG)",
            "National Testing Agency (NTA)",
            "10+2 passed or appearing for admission into Central and State Universities.",
            "Once a year (May)",
            "February - March",
            "May",
            "Section I (Languages), Section II (Domain-specific subjects), Section III (General Test).",
            "https://cuetug.ntaonline.in",
            "Moderate",
            "Gateway to Delhi University (DU), BHU, JNU for B.Sc, BCA, BA, and Integrated courses.",
            List.of("bsc_cs_ds", "bca_cs", "bsc_math_stat", "bsc_physics")
        ));

        exams.add(new EntranceExam(
            "nata",
            "NATA",
            "National Aptitude Test in Architecture",
            "Council of Architecture (COA)",
            "10+2 with Physics, Chemistry & Mathematics or 10+3 Diploma with Mathematics.",
            "Multiple attempts per year (April - July)",
            "March onwards",
            "April - July",
            "Assessment of drawing and visual observation skills, aesthetic sensitivity, and architectural awareness.",
            "https://www.nata.in",
            "Moderate",
            "Mandatory for admission to 5-year B.Arch in all government and private architecture colleges in India.",
            List.of("barch")
        ));

        exams.add(new EntranceExam(
            "nda_exam",
            "NDA & NA Exam",
            "National Defence Academy Examination",
            "Union Public Service Commission (UPSC)",
            "Unmarried candidates aged 16.5 - 19.5 with 12th PCM for Air Force/Navy.",
            "Twice a year (April & September)",
            "Dec - Jan / May - June",
            "April & September",
            "Written exam (Maths + GAT: 900 marks) followed by 5-day SSB interview and medicals.",
            "https://upsc.gov.in",
            "High",
            "Cadet gets full B.Tech / B.Sc degree fully funded with salary and commissioned as Military Officer.",
            List.of("nda_pcm")
        ));

        exams.add(new EntranceExam(
            "bitsat",
            "BITSAT",
            "BITS Admission Test",
            "BITS Pilani",
            "12th PCM with min 75% aggregate and min 60% in Physics, Chemistry, and Math.",
            "Twice a year (May & June)",
            "January - March",
            "May & June",
            "130 questions in 3 hours: Physics, Chemistry, Math, English, and Logical Reasoning.",
            "https://www.bitsadmission.com",
            "High",
            "Admission to BITS Pilani, Goa, and Hyderabad campuses (Tier 1 equivalent to top IITs).",
            List.of("btech_cse", "btech_ece", "btech_mech", "integrated_msc")
        ));

        exams.add(new EntranceExam(
            "imu_cet",
            "IMU-CET",
            "Indian Maritime University Common Entrance Test",
            "Indian Maritime University",
            "10+2 with min 60% in PCM and 50% in English; strict 6/6 medical eye standards.",
            "Once a year (June)",
            "April - May",
            "June",
            "Online CBT covering English, Aptitude, Physics, Chemistry, and Mathematics.",
            "https://www.imu.edu.in",
            "Moderate",
            "Direct gateway to high-paying Merchant Navy careers (Deck Cadet, Marine Engineer).",
            List.of("merchant_navy")
        ));

        exams.add(new EntranceExam(
            "isi_admission",
            "ISI Admission Test",
            "Indian Statistical Institute Admission Test",
            "Indian Statistical Institute (Kolkata & Bengaluru)",
            "10+2 with Mathematics and English.",
            "Once a year (May)",
            "February - March",
            "May",
            "Paper 1 (MCQ in advanced math) and Paper 2 (Subjective proof-based math).",
            "https://www.isical.ac.in",
            "High",
            "Offers 100% free tuition with monthly stipend. Alumni dominate global Quant hedge funds and AI research.",
            List.of("bsc_math_stat")
        ));

        exams.add(new EntranceExam(
            "clat",
            "CLAT (UG)",
            "Common Law Admission Test",
            "Consortium of National Law Universities (NLUs)",
            "10+2 in any stream (Science, Commerce, Arts) with min 45% marks.",
            "Once a year (December)",
            "July - October",
            "December",
            "120 passage-based questions evaluating English, Current Affairs, Legal Reasoning, and Logic.",
            "https://consortiumofnlus.ac.in",
            "High",
            "Gateway to premier NLUs. Science students excel in tech-law, patents, and AI regulation.",
            List.of("ballb_tech")
        ));

        exams.add(new EntranceExam(
            "ipmat",
            "IPMAT",
            "Integrated Programme in Management Aptitude Test",
            "IIM Indore / IIM Rohtak",
            "10+2 with min 60% in any stream.",
            "Once a year (May)",
            "February - April",
            "May",
            "Quantitative Ability and Verbal Ability, followed by Personal Interview.",
            "https://www.iimidr.ac.in",
            "High",
            "Direct 5-year BBA + MBA program into IIMs straight after 12th without waiting for CAT.",
            List.of("bba_ipm")
        ));

        exams.add(new EntranceExam(
            "neet_ug",
            "NEET (UG)",
            "National Eligibility cum Entrance Test",
            "National Testing Agency (NTA)",
            "10+2 with Physics, Chemistry, Biology/Biotech min 50%.",
            "Once a year (May)",
            "February - March",
            "May",
            "Pen & Paper test: 200 questions in Physics, Chemistry, Botany, and Zoology.",
            "https://neet.ntaonline.in",
            "High",
            "Single national entrance for MBBS, BDS, and AYUSH admissions across AIIMS and state colleges.",
            List.of("mbbs_medicine")
        ));

        // Courses
        courses.add(new Course(
            "btech_cse", "B.Tech CSE / IT / AI",
            "Bachelor of Technology in Computer Science & Engineering",
            "B.Tech", "4 Years", "10+2 PCM min 60-75% aggregate.",
            "Rs 2.5L - Rs 8L", "Rs 8L - Rs 22L",
            List.of("jee_main", "jee_adv", "bitsat"),
            List.of("software_engineer", "data_scientist", "cyber_security", "product_manager", "game_developer"),
            List.of("M.Tech in AI / Systems (GATE)", "MS in CS abroad", "MBA (CAT)", "Direct PhD"),
            "The premier technology degree covering algorithms, software architecture, distributed systems, AI, and operating systems.",
            List.of("Data Structures & Algorithms", "Operating Systems & Networks", "Database Management & Cloud Computing", "Artificial Intelligence & ML", "Software System Design"),
            List.of("Technology & Software", "AI & Data Science"),
            true
        ));

        courses.add(new Course(
            "btech_ece", "B.Tech ECE / EE",
            "B.Tech in Electronics & Communication Engineering",
            "B.Tech", "4 Years", "10+2 with PCM.",
            "Rs 2.5L - Rs 8L", "Rs 7L - Rs 18L",
            List.of("jee_main", "jee_adv", "bitsat"),
            List.of("robotics_engineer", "software_engineer", "defense_officer"),
            List.of("M.Tech in VLSI / Embedded Systems", "MS in Microelectronics", "MBA"),
            "Bridges physical electronics and computing: semiconductors, chip design (VLSI), embedded IoT, and wireless communication.",
            List.of("Digital Electronics & Microprocessors", "VLSI Design & Semiconductors", "Embedded Systems & IoT", "Control Systems & Robotics"),
            List.of("Engineering & Hardware", "Technology & Software"),
            true
        ));

        courses.add(new Course(
            "btech_mech", "B.Tech Mech",
            "B.Tech in Mechanical & Mechatronics Engineering",
            "B.Tech", "4 Years", "10+2 with PCM.",
            "Rs 2.5L - Rs 7L", "Rs 6L - Rs 16L",
            List.of("jee_main", "jee_adv", "bitsat"),
            List.of("robotics_engineer", "product_manager"),
            List.of("M.Tech in Robotics / Automotive", "MS in Mechatronics", "MBA"),
            "Design, manufacturing, and mechanics of physical machines, autonomous electric vehicles (EV), and robotics.",
            List.of("Thermodynamics & Fluid Mechanics", "CAD / CAM & Rapid Prototyping", "Mechatronics & Automation", "Automotive Systems & EV"),
            List.of("Engineering & Hardware"),
            true
        ));

        courses.add(new Course(
            "btech_aerospace", "B.Tech Aero",
            "B.Tech in Aerospace & Avionics Engineering",
            "B.Tech", "4 Years", "10+2 with PCM min 60-75%.",
            "Rs 3L - Rs 8L", "Rs 8L - Rs 20L",
            List.of("jee_main", "jee_adv", "bitsat"),
            List.of("aerospace_engineer", "defense_officer", "scientific_researcher"),
            List.of("M.Tech Aerospace (IITs / IISc)", "MS abroad in Propulsion", "ISRO / DRDO Scientist exams"),
            "Engineering of aircraft, spacecraft, satellites, rocket propulsion, aerodynamics, and avionics control.",
            List.of("Aerodynamics & Flight Mechanics", "Rocket Propulsion & Spacecraft Dynamics", "Avionics & Navigation", "CFD Simulations"),
            List.of("Engineering & Hardware", "Defence & Aviation", "Sciences & Research"),
            true
        ));

        courses.add(new Course(
            "btech_civil", "B.Tech Civil",
            "B.Tech in Civil & Infrastructure Engineering",
            "B.Tech", "4 Years", "10+2 with PCM.",
            "Rs 2L - Rs 6L", "Rs 5L - Rs 14L",
            List.of("jee_main", "jee_adv"),
            List.of("civil_engineer", "architect_planner"),
            List.of("M.Tech in Structural Engineering", "UPSC Indian Engineering Services (IES)", "NICMAR", "MBA"),
            "Design and construction of megastructures, smart cities, highways, tunnels, bridges, and environmental systems.",
            List.of("Structural Analysis & RCC Design", "Geotechnical Mechanics", "Surveying & GIS Mapping", "Project Management & BIM"),
            List.of("Engineering & Hardware"),
            true
        ));

        courses.add(new Course(
            "bdes_design", "B.Des",
            "Bachelor of Design (Interaction, UX, Product & Visual)",
            "B.Des", "4 Years", "10+2 in ANY stream (PCM is fantastic for UX/Interaction).",
            "Rs 3L - Rs 9L (NID / IITs)", "Rs 12L - Rs 26L",
            List.of("uceed", "nid_dat"),
            List.of("ux_designer", "game_developer", "product_manager"),
            List.of("M.Des (IIT Bombay IDC, NID)", "Master in HCI abroad", "MBA in Design Management"),
            "Focuses on user experience (UX/UI), product ergonomics, visual storytelling, and human-computer interaction (HCI).",
            List.of("Design Thinking & User Research", "Visual Identity & Typography", "HCI & UI Wireframing", "Interactive Digital Systems"),
            List.of("Design & Creative", "Technology & Software"),
            true
        ));

        courses.add(new Course(
            "barch", "B.Arch",
            "Bachelor of Architecture",
            "B.Arch", "5 Years", "10+2 with PCM min 50% + NATA qualification.",
            "Rs 3L - Rs 8L", "Rs 10L - Rs 22L",
            List.of("nata", "jee_main"),
            List.of("architect_planner", "ux_designer"),
            List.of("M.Arch (Urban Design, Landscape)", "Master of Urban Planning (MUP)"),
            "Professional qualification licensing individuals to design physical spaces, sustainable buildings, and urban habitats.",
            List.of("Architectural Studios", "Building Materials & Climatology", "Structural Systems", "1-Year Practical Internship"),
            List.of("Engineering & Hardware", "Design & Creative"),
            true
        ));

        courses.add(new Course(
            "bca_cs", "BCA",
            "Bachelor of Computer Applications",
            "BCA", "3 Years", "10+2 in any stream (often with Math/CS).",
            "Rs 60,000 - Rs 2L", "Rs 2.5L - Rs 8L",
            List.of("cuet_ug"),
            List.of("software_engineer", "data_scientist", "cyber_security"),
            List.of("MCA via NIMCET", "M.Sc CS", "MBA"),
            "Fast-track software degree emphasizing web development, database management, and mobile apps.",
            List.of("Programming in C++, Java & Python", "Web App Development", "Database Systems (SQL)", "Software Testing"),
            List.of("Technology & Software"),
            true
        ));

        courses.add(new Course(
            "bsc_cs_ds", "B.Sc CS / Data Science",
            "B.Sc (Hons) in Computer Science, Data Science & AI",
            "B.Sc", "3-4 Years", "10+2 with Mathematics.",
            "Rs 40,000 - Rs 1.5L", "Rs 3L - Rs 9L",
            List.of("cuet_ug"),
            List.of("data_scientist", "software_engineer", "quant_analyst"),
            List.of("M.Sc Data Science", "MCA", "MS abroad in ML", "MBA"),
            "Rigorous analytical foundation combining mathematics, statistics, algorithmic coding, and machine learning.",
            List.of("Math Foundations of AI", "Probability & Statistics", "ML Algorithms", "Big Data Analytics"),
            List.of("AI & Data Science", "Technology & Software"),
            true
        ));

        courses.add(new Course(
            "bsc_math_stat", "B.Stat / B.Math",
            "Bachelor of Statistics / Mathematics (ISI / Central Universities)",
            "B.Sc", "3-4 Years", "10+2 with Mathematics.",
            "Free with Stipend at ISI; Rs 30k - Rs 1.2L in Univs", "Rs 3L - Rs 8L",
            List.of("isi_admission", "cuet_ug"),
            List.of("quant_analyst", "data_scientist", "actuary_risk", "scientific_researcher"),
            List.of("M.Stat / M.Math at ISI", "MS Quantitative Finance abroad", "PhD at Ivy League"),
            "Elite quantitative curriculum producing the highest-paid algorithmic traders, risk modelers, and AI researchers.",
            List.of("Real Analysis & Algebra", "Probability & Stochastic Processes", "Statistical Inference", "Financial Econometrics"),
            List.of("AI & Data Science", "Finance & Management", "Sciences & Research"),
            true
        ));

        courses.add(new Course(
            "nda_pcm", "NDA & Naval Academy",
            "National Defence Academy (Army, Air Force, Navy)",
            "Defence Academy", "4 Years", "Unmarried candidates aged 16.5 - 19.5 with 12th PCM.",
            "Fully Funded by Govt of India (Free + Monthly allowance)", "N/A",
            List.of("nda_exam"),
            List.of("defense_officer", "naval_officer", "commercial_pilot"),
            List.of("Defence Services Staff College (DSSC)", "Sponsored M.Tech / M.Sc"),
            "The pinnacle of military leadership. Cadets receive formal B.Tech / B.Sc degree and are commissioned as gazetted military officers.",
            List.of("Military Strategy & Leadership", "Weapons & Radar Systems", "Navigation & Signals", "Survival & Combatives"),
            List.of("Defence & Aviation"),
            true
        ));

        courses.add(new Course(
            "commercial_pilot", "CPL Training",
            "Commercial Pilot License & Flight Training",
            "Professional License", "18-24 Months", "10+2 with Physics & Math min 50% + DGCA Class 1 Medical.",
            "Rs 35L - Rs 45L (IGRUA)", "Rs 45L - Rs 65L",
            List.of("cuet_ug"),
            List.of("commercial_pilot"),
            List.of("Type Rating (Airbus A320 / Boeing 737)", "Airline Captain / LTC", "DGCA Flight Instructor"),
            "Ground aviation theory exams (DGCA) and 200 hours of instrument and multi-engine flying to pilot commercial airliners.",
            List.of("Air Navigation & Flight Planning", "Aviation Meteorology", "Air Regulations", "Multi-Engine Instrument Flying"),
            List.of("Defence & Aviation"),
            true
        ));

        courses.add(new Course(
            "merchant_navy", "B.Sc Nautical / Marine Eng",
            "Merchant Navy (B.Sc Nautical Science / Marine Engineering)",
            "B.Sc", "3-4 Years", "10+2 PCM min 60% and English min 50% + 6/6 vision.",
            "Rs 5L - Rs 9L (IMU)", "Rs 10L - Rs 18L",
            List.of("imu_cet"),
            List.of("naval_officer"),
            List.of("Chief Mate & Master Mariner (Captain)", "Maritime Law / Ship Logistics"),
            "Prepares officers to navigate and operate international cargo ships, oil tankers, and container vessels with tax-free salaries.",
            List.of("Ship Stability & Cargo Work", "Electronic Navigation (ECDIS, Radar)", "Marine Engineering Systems", "Seamanship"),
            List.of("Defence & Aviation", "Engineering & Hardware"),
            true
        ));

        courses.add(new Course(
            "actuarial_science", "Actuarial Science",
            "Actuarial Science & Mathematical Risk Modeling",
            "Professional License", "3 Years + IAI Papers", "10+2 with strong Mathematics proficiency.",
            "Rs 1L - Rs 3L", "Rs 4L - Rs 10L",
            List.of("cuet_ug"),
            List.of("actuary_risk", "quant_analyst", "fintech_analyst"),
            List.of("Fellow of Institute of Actuaries of India (FIAI)", "CERA"),
            "High-math discipline analyzing risk in life insurance, health insurance, pensions, and capital investments.",
            List.of("Financial Mathematics", "Actuarial Statistics", "Loss Distributions", "Life Contingencies"),
            List.of("Finance & Management", "AI & Data Science"),
            true
        ));

        courses.add(new Course(
            "bba_ipm", "IPM (BBA+MBA)",
            "Integrated Programme in Management (5-Year Dual Degree at IIMs)",
            "Integrated", "5 Years", "10+2 in ANY stream min 60%.",
            "Rs 30L - Rs 38L (IIM Indore/Rohtak)", "Rs 18L - Rs 28L",
            List.of("ipmat"),
            List.of("product_manager", "fintech_analyst"),
            List.of("Executive MBA", "CFA", "PhD in Management"),
            "Skips the fierce CAT exam, taking students right after 12th into Indian Institutes of Management for top corporate strategy roles.",
            List.of("Economics & Game Theory", "Corporate Finance & Accounting", "Marketing & Consumer Behavior", "Strategic Leadership"),
            List.of("Finance & Management"),
            true
        ));

        courses.add(new Course(
            "ballb_tech", "B.A. / BBA LL.B",
            "5-Year Integrated Law (Cyber, Tech & Corporate Law)",
            "Integrated", "5 Years", "10+2 in any stream (Science background is heavily valued in patent law).",
            "Rs 8L - Rs 14L (NLUs)", "Rs 12L - Rs 24L",
            List.of("clat"),
            List.of("cyber_lawyer"),
            List.of("LL.M abroad (Harvard, Cambridge)", "Judicial Services", "General Counsel"),
            "Integrated legal training in constitutional, corporate, intellectual property (patent law), privacy regulations, and AI ethics.",
            List.of("Constitutional Law", "IPR & Patents", "Cyber Law & DPDP Privacy Act", "Corporate Mergers & Acquisitions"),
            List.of("Law & Policy"),
            true
        ));

        // Careers
        careers.add(new Career(
            "software_engineer",
            "Software Engineer / Full-Stack Architect",
            "Technology & Software",
            "Designs, codes, tests, and deploys high-scale software applications, APIs, and cloud microservices.",
            List.of("Write clean modular code in TypeScript, Go, Python, or Java.", "Optimize database query latency and architecture.", "Debug production outages and automate CI/CD pipelines.", "Translate product roadmaps into scalable code."),
            List.of("Data Structures & Algorithms", "System Architecture", "React / Next.js", "Go / Java / Node.js", "Docker & Kubernetes", "PostgreSQL / NoSQL"),
            "Rs 8L - Rs 22L / year", "Rs 25L - Rs 60L+ / year",
            "Very High", "Exponential digitization across Indian enterprises, global SaaS, and high-growth fintechs.",
            List.of("btech_cse", "bca_cs", "bsc_cs_ds"),
            List.of(
                new RouteStep("Route 1: Traditional B.Tech CSE Path", "Direct / Traditional", "Structured campus placement pathway into top tech firms.", List.of("Pass 12th PCM", "Clear JEE Main / BITSAT", "Enroll in 4-Year B.Tech CSE", "Build DSA & open source profile", "Join tech companies via campus hiring"), "4 Years", "JEE Main or BITSAT"),
                new RouteStep("Route 2: BCA + MCA Fast-Track", "Alternative Route", "Affordable coding-focused journey with equal placement eligibility.", List.of("Pass 12th", "Pursue 3-Year BCA", "Appear for NIMCET", "Complete 2-Year MCA from top NIT", "Join tier-1 tech firms"), "5 Years (3 + 2)", "NIMCET"),
                new RouteStep("Route 3: B.Sc CS + GitHub Portfolio", "Lateral / Bridge", "Build demonstrable open-source projects, web apps, and freelance experience.", List.of("Pass 12th with Math", "Take 3-year B.Sc CS", "Build real-world GitHub apps", "Apply directly to startups"), "3 Years", "CUET-UG")
            )
        ));

        careers.add(new Career(
            "data_scientist",
            "Data Scientist & AI / ML Engineer",
            "AI & Data Science",
            "Extracts predictive insights from massive datasets and builds generative AI, LLM agents, and statistical machine learning systems.",
            List.of("Design, train, and evaluate ML models (Transformers, gradient boosting, RL).", "Clean and preprocess massive terabyte-scale data pipelines.", "Deploy models in production using MLOps frameworks.", "Present quantifiable ROI insights to executive leaders."),
            List.of("Python & PyTorch / TensorFlow", "Applied Statistics & Linear Algebra", "SQL & Spark", "LLMs & Fine-Tuning", "MLOps"),
            "Rs 9L - Rs 25L / year", "Rs 30L - Rs 70L+ / year",
            "Very High", "The Generative AI revolution is forcing every enterprise to transform their core products with AI models.",
            List.of("btech_cse", "bsc_cs_ds", "bsc_math_stat"),
            List.of(
                new RouteStep("Route 1: B.Tech in CSE / Artificial Intelligence", "Direct / Traditional", "Standard engineering path with deep learning and neural network electives.", List.of("Pass 12th PCM", "Clear JEE Main / BITSAT", "Complete 4-Year B.Tech CSE (AI/ML)", "Complete Kaggle competitions & internships", "Recruited as AI/ML Engineer"), "4 Years", "JEE Main, Python, Kaggle"),
                new RouteStep("Route 2: Elite Quantitative Route (B.Stat / B.Math at ISI)", "Alternative Route", "The golden pathway for elite high-math AI research and quantitative modeling.", List.of("Pass 12th with advanced Math", "Clear ISI Admission Test (Free + Stipend)", "Complete B.Stat or B.Math", "Joined as Senior Quantitative Modeler or Research Scientist"), "3 to 5 Years", "ISI Admission Test"),
                new RouteStep("Route 3: B.Sc Statistics + Certifications", "Lateral / Bridge", "Mathematical degree followed by hands-on ML portfolio.", List.of("Pass 12th with Math", "Take B.Sc Stats via CUET", "Master Scikit-learn and Deep Learning", "Publish Kaggle workflows", "Hired as Data Scientist"), "3 to 4 Years", "CUET-UG")
            )
        ));

        careers.add(new Career(
            "ux_designer",
            "UX / Product Designer (UI/UX & HCI)",
            "Design & Creative",
            "Designs intuitive, beautiful, and accessible software interfaces, design systems, and seamless user experiences.",
            List.of("Conduct user interviews and usability testing to identify friction points.", "Create wireframes, high-fidelity prototypes, and design systems in Figma.", "Collaborate with frontend engineers to ensure design fidelity.", "Analyze product usage heatmaps and metrics."),
            List.of("Figma & Prototyping", "User Research & Personas", "Information Architecture", "Design Systems", "Interaction Design"),
            "Rs 7L - Rs 20L / year", "Rs 22L - Rs 50L+ / year",
            "Very High", "Software products live or die by their usability; top product designers command premium compensation.",
            List.of("bdes_design", "btech_cse", "barch"),
            List.of(
                new RouteStep("Route 1: Formal Design Degree (B.Des via UCEED / NID)", "Direct / Traditional", "Comprehensive 4-year design immersion at IIT Bombay, IIT Delhi, or NID.", List.of("Pass 12th in ANY stream", "Clear UCEED or NID DAT", "Graduate with B.Des in Interaction Design", "Showcase student design portfolio", "Recruited directly as Product Designer"), "4 Years", "UCEED / NID DAT"),
                new RouteStep("Route 2: Engineering Degree (B.Tech) + Self-Built Portfolio", "Lateral / Bridge", "Very common and lucrative! Tech-savvy designers who understand code are deeply sought after.", List.of("Pursue B.Tech CSE or ECE", "Learn Figma and UI psychology alongside college", "Build case studies on Behance/portfolio", "Intern as UI/UX intern in 3rd/4th year", "Graduate into Product Designer roles"), "4 Years", "Figma Portfolio"),
                new RouteStep("Route 3: Architecture (B.Arch) to Digital UX", "Lateral / Bridge", "Architects possess superior spatial and systems thinking that translates into design systems.", List.of("Graduate with B.Arch", "Bridge spatial thinking into digital interaction systems", "Build digital UX case studies", "Transition into UX Architect"), "5 Years", "Portfolio Building")
            )
        ));

        careers.add(new Career(
            "robotics_engineer",
            "Robotics & Autonomous Systems Engineer",
            "Engineering & Hardware",
            "Integrates sensors, actuators, computer vision, and embedded control algorithms to build intelligent robots and autonomous drones.",
            List.of("Program microcontrollers and embedded computing units (ROS, Jetson).", "Design kinematic structures and feedback control loops.", "Implement SLAM and obstacle avoidance vision algorithms.", "Test prototypes on factory floors or field test beds."),
            List.of("C++ & Python", "Robot Operating System (ROS / ROS2)", "Embedded Electronics", "Control Systems (PID)", "Computer Vision (OpenCV)"),
            "Rs 7L - Rs 20L / year", "Rs 22L - Rs 55L / year",
            "High", "Surge in warehouse automation (Amazon, Flipkart), defense UAV drones, and autonomous electric vehicles.",
            List.of("btech_ece", "btech_mech", "btech_cse"),
            List.of(
                new RouteStep("Route 1: B.Tech in Electronics / Mechatronics", "Direct / Traditional", "Multi-disciplinary engineering path combining electrical hardware and mechanical dynamics.", List.of("Pass 12th PCM", "Take JEE Main / BITSAT", "Pursue B.Tech in Mechatronics or ECE", "Compete in Robocon / e-Yantra", "Join robotics and drone manufacturers"), "4 Years", "JEE Main, Hardware Prototyping"),
                new RouteStep("Route 2: B.Tech Mechanical to Robotics Specialization", "Alternative Route", "Master physical dynamics and CAD, then add software control loops.", List.of("Complete B.Tech Mechanical", "Learn ROS and embedded C++", "Pursue M.Tech / MS in Robotics", "Join autonomous vehicle or robotics firms"), "4 to 6 Years", "GATE / GRE")
            )
        ));

        careers.add(new Career(
            "commercial_pilot",
            "Commercial Airline Pilot",
            "Defence & Aviation",
            "Commands commercial passenger aircraft or cargo freighters on domestic and international flight routes.",
            List.of("Review weather charts, NOTAMs, flight dispatch logs, and fuel calculations.", "Perform pre-flight inspections of aircraft control surfaces and gear.", "Operate flight management systems and communicate with ATC.", "Handle cross-wind landings and instrument approaches."),
            List.of("Situational Awareness & Decisiveness", "Multi-tasking under Pressure", "Aerodynamics & Instrument Flying", "Crew Resource Management (CRM)", "Radio Telephony (RTR-A)"),
            "Rs 18L - Rs 30L / year (First Officer)", "Rs 60L - Rs 1.2Cr+ / year (Captain)",
            "Very High", "India is the fastest-growing aviation market in the world with over 1,500 new aircraft ordered by IndiGo, Air India, and Akasa.",
            List.of("commercial_pilot", "nda_pcm"),
            List.of(
                new RouteStep("Route 1: Cadet Pilot Programme (Airline Sponsored)", "Direct / Traditional", "Direct entry run by airlines with guaranteed employment upon license and type-rating.", List.of("Pass 12th PCM min 50-60%", "Clear Airline Cadet entrance & DGCA Class 1 Medical", "Complete Ground School & 200 flying hours", "Complete Type Rating on A320/B737", "Inducted as First Officer"), "18 to 24 Months", "ADAPT test, DGCA Exams"),
                new RouteStep("Route 2: Independent CPL via Flying Club (IGRUA / Abroad)", "Alternative Route", "Flexible training route where student self-finances 200 flying hours.", List.of("Clear DGCA Class 1 Medical", "Pass DGCA theory exams", "Complete 200 flight hours at IGRUA or abroad", "Convert to DGCA CPL and take airline vacancy tests"), "2 to 3 Years", "DGCA Theory Papers")
            )
        ));

        careers.add(new Career(
            "quant_analyst",
            "Quantitative Analyst / Algorithmic Trader",
            "AI & Data Science",
            "Builds complex mathematical models and ultra-low latency algorithmic systems to trade financial markets.",
            List.of("Formulate pricing and statistical arbitrage models for options and equities.", "Backtest algorithmic trading strategies on terabytes of order book data.", "Code ultra-low-latency execution engines in modern C++.", "Monitor real-time value-at-risk (VaR) and dynamic hedging."),
            List.of("Probability & Stochastic Calculus", "Modern C++ & Python", "Statistical Arbitrage & Time Series", "High Frequency Trading Systems"),
            "Rs 25L - Rs 60L+ / year (Top HFTs offer Rs 1Cr+)", "Rs 80L - Rs 2.5Cr+ / year",
            "Very High", "Quant funds (Tower Research, Jane Street, Graviton, WorldQuant, AlphaGrep) offer highest packages in Indian campuses.",
            List.of("bsc_math_stat", "btech_cse", "bsc_cs_ds", "actuarial_science"),
            List.of(
                new RouteStep("Route 1: ISI B.Stat / B.Math Elite Quantitative Track", "Direct / Traditional", "ISI graduates are among the most revered in global quant finance.", List.of("Pass 12th with supreme mathematical aptitude", "Clear ISI Admission Test", "Complete B.Stat / M.Stat", "Recruited directly by hedge funds and proprietary desks"), "3 to 5 Years", "ISI Admission Test"),
                new RouteStep("Route 2: IIT B.Tech CSE / Electrical + Competitive Coding", "Alternative Route", "Top rankers in IIT Computer Science recruited for algorithmic development.", List.of("Top JEE Advanced rank", "Complete B.Tech in CSE / EE at top-5 IIT", "Master probability and ultra-fast C++ coding", "HFT on-campus hiring in final year"), "4 Years", "JEE Advanced, Codeforces Master")
            )
        ));

        careers.add(new Career(
            "product_manager",
            "Product Manager (Tech & SaaS)",
            "Finance & Management",
            "Acts as the mini-CEO of a software product, defining what to build, why, and aligning engineering with business goals.",
            List.of("Define product strategy, write PRDs, and manage feature roadmaps.", "Conduct customer interviews and synthesize user pain points.", "Analyze product conversion funnels, retention cohorts, and revenue metrics.", "Lead sprint planning with engineers, designers, and sales."),
            List.of("Product Strategy & Roadmapping", "User Empathy & Research", "Data Analysis (SQL, Mixpanel)", "Technical Communication", "Business Unit Economics"),
            "Rs 12L - Rs 28L / year", "Rs 32L - Rs 75L+ / year",
            "Very High", "Tech companies need strategic leaders who bridge engineering complexity and business profitability.",
            List.of("btech_cse", "bba_ipm", "bdes_design"),
            List.of(
                new RouteStep("Route 1: B.Tech Engineering to Software Engineer to Internal PM", "Direct / Traditional", "Understand tech feasibility first, then step into product ownership.", List.of("Graduate with B.Tech CSE or engineering", "Work as Software Engineer for 1-2 years", "Actively take ownership of user problems and PRDs", "Transition to Associate Product Manager"), "4 Yrs UG + 2 Yrs Exp", "Product case study interviews"),
                new RouteStep("Route 2: IIM 5-Year IPM Program (Direct from 12th)", "Alternative Route", "Combines undergraduate business foundation with premier IIM management training.", List.of("Pass 12th in ANY stream", "Clear IPMAT", "Complete 5-Year IPM at IIM Indore / Rohtak", "Join tech firms or consulting as APM"), "5 Years", "IPMAT")
            )
        ));

        careers.add(new Career(
            "defense_officer",
            "Military Officer (Fighter Pilot / Army Engineer)",
            "Defence & Aviation",
            "Commands troops, pilots supersonic fighter jets (Rafale/Su-30), or oversees high-tech electronic warfare.",
            List.of("Lead combat squadrons, regiments, or missile defense batteries.", "Execute tactical operational planning, reconnaissance, and defense missions.", "Maintain rigorous physical readiness and troop welfare.", "Manage high-tech electronic warfare and tactical signals."),
            List.of("Courage under Fire & Absolute Leadership", "Strategic Tactics & Decisive Command", "Physical Fitness & Mental Resilience", "Weapons & Radar Technology"),
            "Rs 14L - Rs 22L / year + High perks, housing, pensions", "Rs 28L - Rs 45L / year (Colonel / Group Captain)",
            "Steady", "Permanent noble profession with unparalleled prestige, leadership training, and national service.",
            List.of("nda_pcm", "btech_aerospace", "btech_ece"),
            List.of(
                new RouteStep("Route 1: National Defence Academy (NDA) after 12th PCM", "Direct / Traditional", "The ultimate cradle of military leadership. Commissioned as an officer at age 21.", List.of("Pass 12th PCM", "Clear UPSC NDA Written exam", "Pass 5-day SSB interview and medicals", "Complete 3-year NDA + 1-year IMA/AFA/INA", "Commissioned as Lieutenant / Flying Officer"), "4 Years (Fully Funded)", "NDA exam + SSB"),
                new RouteStep("Route 2: B.Tech Engineering to TGC / AFCAT Technical Entry", "Lateral / Bridge", "Graduate with engineering degree and enter armed forces directly through technical entry.", List.of("Complete B.Tech in CSE, ECE, Mech, or Civil", "Apply for Army TGC or Navy Tech entry", "Direct call for SSB interview", "Commissioned as Technical Officer"), "4 Yrs UG + 1 Yr Academy", "SSB Interview")
            )
        ));

        careers.add(new Career(
            "cyber_lawyer",
            "Corporate & Cyber Technology Lawyer",
            "Law & Policy",
            "Advises tech conglomerates, venture capitals, and startups on data privacy (DPDP), intellectual property, AI governance, and mergers.",
            List.of("Draft and negotiate enterprise cloud contracts, cross-border IP licensing, and SaaS terms.", "Guide companies through data breach compliance under India's DPDP Act.", "File software and hardware patent applications.", "Represent clients in tech arbitration disputes."),
            List.of("Data Protection Law & GDPR", "Intellectual Property & Patents", "Contract Drafting & Negotiation", "Technology Fluency & AI Regulations"),
            "Rs 8L - Rs 22L / year (Tier 1 Law Firms)", "Rs 30L - Rs 75L+ / year",
            "Very High", "Strict privacy regulations, explosion of AI copyright issues, and soaring tech venture financings.",
            List.of("ballb_tech"),
            List.of(
                new RouteStep("Route 1: 5-Year Integrated B.A./BBA LL.B via CLAT", "Direct / Traditional", "Premier national law university track with tech law electives.", List.of("Pass 12th in ANY stream", "Clear CLAT exam", "Complete 5-Year BA/BBA LL.B at top NLU", "Join Tier-1 law firms or tech legal teams"), "5 Years", "CLAT UG"),
                new RouteStep("Route 2: B.Tech Engineering to 3-Year LL.B (Patent Attorney)", "Lateral / Bridge", "The ultimate unicorn profile! Technical science/engineering degree is mandatory to draft tech patents.", List.of("Complete B.Tech in CSE, ECE, Mech or Biotech", "Appear for 3-Year LL.B entrance (DU / IIT Kharagpur Law)", "Complete LL.B", "Command top fees drafting global tech patents"), "7 Years (4 + 3)", "Patent Agent Exam")
            )
        ));

        // Switching Routes
        switchingRoutes.add(new SwitchingRoute(
            "switch_eng_to_design",
            "From Engineering (PCM/B.Tech) to UX / Product Design",
            "Engineering & Technology", "Design & Creative",
            "Enrolled in B.Tech but passionate about visual aesthetics, psychology, and creative digital interfaces rather than raw code.",
            "Design does NOT require a traditional fine arts degree. Technical students are favored in UX because they understand code feasibility.",
            "Strong portfolio of 3-4 end-to-end case studies demonstrating problem definition, wireframing, and Figma prototypes.",
            "3 to 6 months of focused portfolio building, or 2-year M.Des post-graduation.",
            "Low",
            List.of("Master Figma, auto-layout, and design systems.", "Redesign an existing clunky app and publish an in-depth case study on Medium or LinkedIn.", "Take CEED / UCEED (IIT Bombay accepts all graduates for M.Des Interaction Design)."),
            List.of("Google UX Design Certificate", "Interaction Design Foundation", "CEED Exam")
        ));

        switchingRoutes.add(new SwitchingRoute(
            "switch_eng_to_pm",
            "From Engineering to Product Management",
            "Engineering & Technology", "Finance & Management",
            "Enjoy understanding 'why' features are built, talking to users, and steering business strategy instead of coding all day.",
            "Work as a software developer or data analyst for 1-2 years, take ownership of feature roadmaps, write PRDs, and transition internally.",
            "Demonstrated product sense, metric fluency (retention, CAC, LTV), and user empathy.",
            "6 to 18 months in industry or direct post-MBA (IIMs / ISB).",
            "Moderate",
            List.of("Deconstruct daily products: what is their north star metric?", "Volunteer to write PRD specs in your current team.", "Read 'Inspired' by Marty Cagan and 'Cracking the PM Interview'."),
            List.of("Reforge Product Strategy", "IIM 1-Year Executive MBA")
        ));

        switchingRoutes.add(new SwitchingRoute(
            "switch_science_to_data",
            "From Pure Science / Math (B.Sc) to Data Science & AI",
            "Sciences & Research", "AI & Data Science",
            "Did B.Sc in Maths, Physics, or Statistics, and wants high-paying industry tech roles without doing a 4-year B.Tech.",
            "Pure science students have superior mathematical foundations (calculus, probability, linear algebra) which makes advanced ML much easier.",
            "Learn Python, SQL, Pandas, Scikit-learn, and Git version control.",
            "4 to 8 months of self-study and building Kaggle projects, or 2-year M.Sc Data Science.",
            "Low",
            List.of("Emphasize your statistical rigor in your resume.", "Publish your ML workflows on Kaggle and GitHub with clean documentation.", "Apply to Junior Data Analyst roles as an entry stepping stone."),
            List.of("Andrew Ng Machine Learning (Coursera)", "IIT Madras BS in Data Science", "Fast.ai")
        ));

        switchingRoutes.add(new SwitchingRoute(
            "switch_diploma_to_btech",
            "Polytechnic Diploma to Direct 2nd Year B.Tech (Lateral Entry)",
            "Vocational & Diploma", "Engineering & Technology",
            "Chose a 3-year Polytechnic Diploma after 10th standard instead of traditional 11th-12th school, and wants an engineering degree.",
            "Take state lateral entry exams (LEET / JELET / UPSEE Lateral). Enter directly into the 3rd semester (2nd year) of B.Tech without losing any academic years!",
            "Completion of 3-year AICTE diploma with min 45-50% marks.",
            "Seamless transition; finish B.Tech in 3 years instead of 4.",
            "Low",
            List.of("Diploma students usually outperform standard 12th entrants in practical engineering labs.", "Revise calculus and differential equations for 2nd year B.Tech math.", "Target top state govt engineering colleges with reserved 10% lateral entry seats."),
            List.of("State Lateral Entry Tests (LEET / JELET / CET Lateral)")
        ));

        switchingRoutes.add(new SwitchingRoute(
            "switch_any_to_law",
            "From Any Degree (Science/Commerce) to Corporate & Tech Law",
            "Any Undergraduate Degree", "Law & Policy",
            "Completed or studying 12th/Graduation in non-law stream, but fascinated by contracts, patent law, policy debates, and advocacy.",
            "In India, you can enter law either via 5-year integrated law right after 12th (CLAT), or 3-year LL.B after graduation in any field!",
            "Clear CLAT (after 12th) or CUET-PG / NLSAT (after graduation).",
            "3 Years (after graduation) or 5 Years (after 12th).",
            "Moderate",
            List.of("Science/Engineering graduates who become lawyers are the most valuable patent attorneys in the world.", "Target NLSIU Bengaluru 3-Year LL.B (NLSAT) or Delhi University Faculty of Law.", "Focus on reading comprehension, current affairs, and logical reasoning."),
            List.of("CLAT-UG", "NLSAT (National Law School Admissions Test)", "Indian Patent Agent Examination")
        ));
    }

    // Accessors
    public List<EducationLevel> getAllLevels() { return levels; }
    public Optional<EducationLevel> getLevelById(String id) {
        return levels.stream().filter(l -> l.id().equalsIgnoreCase(id)).findFirst();
    }

    public List<Course> getAllCourses() { return courses; }
    public Optional<Course> getCourseById(String id) {
        return courses.stream().filter(c -> c.id().equalsIgnoreCase(id)).findFirst();
    }

    public List<EntranceExam> getAllExams() { return exams; }
    public Optional<EntranceExam> getExamById(String id) {
        return exams.stream().filter(e -> e.id().equalsIgnoreCase(id)).findFirst();
    }

    public List<Career> getAllCareers() { return careers; }
    public Optional<Career> getCareerById(String id) {
        return careers.stream().filter(c -> c.id().equalsIgnoreCase(id)).findFirst();
    }

    public List<SwitchingRoute> getAllSwitchingRoutes() { return switchingRoutes; }

    // Persistent database & shortlist management
    public List<ShortlistItem> getShortlist() {
        return databaseManager.getShortlist();
    }

    public ShortlistItem saveShortlistItem(ShortlistItem item) {
        return databaseManager.saveShortlist(item);
    }

    public boolean removeShortlistItem(String type, String id) {
        return databaseManager.removeShortlist(type, id);
    }

    public void clearShortlist() {
        databaseManager.clearShortlist();
    }

    public DatabaseManager getDatabaseManager() {
        return databaseManager;
    }
}
