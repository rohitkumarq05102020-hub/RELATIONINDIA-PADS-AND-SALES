import { Product, JobOpening, NewsArticle, Employee, ContactEnquiry, JobApplication } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-secure-pads',
    name: 'RELATION-SECURE PADS (WITH ANION CHIP)',
    category: 'Personal Hygiene & Sanitary Care',
    shortDescription: 'All-day comfort, all-night protection. Sanitary pads with Anion Chip Technology, SAP layer, and secure wings.',
    fullDescription: 'RELATION-SECURE PADS WITH ANION CHIP (TECHNOLOGY & ULTRA) are engineered for all-day comfort and all-night protection. Featuring an advanced Anion Strip, SAP layer, secure absorbent center, and soft cottony cover, designed to help remove unpleasant odour, inhibit bacterial growth, and flow with confidence.',
    packSize: '6 PCS · XL 280mm · MRP ₹60.49',
    image: '/images/products/relation-secure-pads.svg',
    composition: 'Soft & cottony non-woven cover, Anion Chip strip with negative ions, SAP (Super Absorbent Polymer) core layer, protective wings, ventilated technology back sheet.',
    features: [
      'SECURE CENTER: Extra absorption where you need it most',
      'WING: Holds pad securely in place & helps prevent side leakage',
      'SOFT COVER: Soft & comfortable skin feel',
      'WITH SAP LAYER: Extra absorbency & extra hygiene',
      'ANION CHIP TECHNOLOGY: Reduces ammonia odour to 85% & destroys 99.9% of bacteria (staphylococcus aureus)',
      'XL 280mm with Fresh Fragrance for heavy flow protection',
      'Rated for Heavy Flow (5-droplet protection)',
      'MRP ₹60.49 (Pack of 6 Pieces)'
    ],
    storageInstructions: 'Store in a clean, cool, and dry place. Keep away from moisture and direct sunlight.',
    isFeatured: true,
  },
  {
    id: 'prod-ors',
    name: 'RELATION-ORS (Oral Electrolyte Formula)',
    category: 'Essential Healthcare',
    shortDescription: 'Oral rehydration salts powder formulation compliant with standard electrolyte replenishment guidelines.',
    fullDescription: 'RELATION-ORS is an oral electrolyte replenishing formula packaged in moisture-resistant foil sachets for preparation with potable drinking water.',
    packSize: '21.8g Sachet / Box of 25 Sachets',
    composition: 'Sodium Chloride IP 2.6g, Potassium Chloride IP 1.5g, Sodium Citrate IP 2.9g, Anhydrous Dextrose IP 13.5g.',
    features: [
      'Standard balanced electrolyte replenishment ratio',
      'Hermetically sealed foil laminate sachet',
      'Rapid dissolution in drinking water',
      'Batch tested for quality and purity'
    ],
    storageInstructions: 'Store in a dry place below 30°C. Protect from moisture. Discard reconstituted solution after 24 hours.',
    isFeatured: true,
  },
  {
    id: 'prod-derm-antiseptic',
    name: 'RELATION-DERM Antiseptic Solution',
    category: 'First Aid & Topical Solutions',
    shortDescription: 'First-aid topical antiseptic solution for general skin cleansing, minor cuts, and surface sanitation.',
    fullDescription: 'RELATION-DERM is a topical antiseptic liquid intended for first-aid skin cleansing, wound margins, and hygiene sanitization.',
    packSize: '100ml / 500ml Pharmaceutical HDPE Bottle',
    composition: 'Chlorhexidine Gluconate Solution IP 0.3% v/v, Cetrimide IP 0.6% w/v.',
    features: [
      'Broad-spectrum topical cleansing agent',
      'Tamper-evident pharmaceutical grade bottle',
      'For external first aid and surface hygiene use',
      'Non-staining clear amber formulation'
    ],
    storageInstructions: 'Keep bottle tightly closed. Store in a cool place protected from direct sunlight. For external use only.',
    isFeatured: true,
  },
  {
    id: 'prod-cal-d3',
    name: 'RELATION-CAL D3 Tablets',
    category: 'Nutritional & Dietary Supplements',
    shortDescription: 'Dietary supplement tablets supplying bioavailable Calcium Carbonate and Cholecalciferol (Vitamin D3).',
    fullDescription: 'RELATION-CAL D3 tablets provide essential calcium and vitamin D3 for daily dietary supplementation and bone health support.',
    packSize: 'Alu-Alu Blister Pack of 10 x 15 Tablets',
    composition: 'Calcium Carbonate IP 1250mg (eq. to elemental calcium 500mg), Vitamin D3 IP 250 IU.',
    features: [
      'Standardized elemental calcium delivery',
      'Alu-Alu moisture-barrier blister packaging',
      'Quality tested for disintegration and stability',
      'Nutritional dietary supplement'
    ],
    storageInstructions: 'Store protected from light and moisture at temperature not exceeding 25°C. Keep out of reach of children.',
    isFeatured: false,
  },
  {
    id: 'prod-vapo-capsules',
    name: 'RELATION-VAPO Inhalant Softgels',
    category: 'Respiratory Wellness',
    shortDescription: 'Aromatic steam inhalant softgel capsules for warm water inhalation and nasal soothing.',
    fullDescription: 'RELATION-VAPO capsules contain an aromatic blend of essential volatile oils designed to be snipped and added to hot steaming water for vapor inhalation.',
    packSize: 'Blister strip of 10 Softgel Capsules',
    composition: 'Camphor 25mg, Chlorothymol 5mg, Eucalyptol 125mg, Menthol 55mg, Terpineol 120mg.',
    features: [
      'Concentrated aromatic essential oil blend',
      'Hygienic single-use snip-tip softgel format',
      'Pleasant aromatic vapors for steam inhalation',
      'For vapor inhalation only - not to be swallowed'
    ],
    storageInstructions: 'Store in a cool dry place below 25°C. Do not freeze. Keep away from direct heat and children.',
    isFeatured: false,
  }
];

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'job-tso-jharkhand',
    title: 'Territory Sales Officer (Healthcare Products)',
    department: 'Sales & Distribution',
    location: 'Dhanbad / Bokaro / Ranchi, Jharkhand',
    experience: '1 - 3 Years in FMCG or Pharma Distribution',
    qualification: 'Graduate in Science, Commerce or Pharmacy (B.Pharm/B.Sc/B.Com)',
    description: 'Responsible for managing distributor relationships, chemist shop coverage, and retail supply expansion across designated territories in Jharkhand.',
    responsibilities: [
      'Expand pharmacy, retail chemist, and distribution reach in the territory',
      'Ensure timely stock replenishment and order processing',
      'Conduct regular stock audits with local stockists',
      'Collect feedback and report market trends to regional management'
    ],
    isActive: true,
    postedDate: '2026-09-15',
  },
  {
    id: 'job-qa-officer',
    title: 'Quality Assurance & Inspection Executive',
    department: 'Quality & Regulatory',
    location: 'Topchanchi, Dhanbad, Jharkhand',
    experience: '2 - 4 Years',
    qualification: 'B.Pharm or B.Sc / M.Sc in Chemistry',
    description: 'Oversee packaging inspection, batch verification, sampling protocols, and documentation for healthcare supplies at our facility.',
    responsibilities: [
      'Perform in-process packaging checks and finished product inspections',
      'Maintain batch record registers and quality documentation',
      'Ensure adherence to good storage and handling practices',
      'Coordinate with testing laboratories for standard conformity'
    ],
    isActive: true,
    postedDate: '2026-09-20',
  },
  {
    id: 'job-logistics-exec',
    title: 'Warehouse & Logistics Coordinator',
    department: 'Supply Chain',
    location: 'At-Mantand, Topchanchi, Dhanbad',
    experience: '1 - 3 Years',
    qualification: 'Any Graduate / Diploma in Supply Chain or Logistics',
    description: 'Coordinate dispatch, inventory management, consignment tracking, and warehouse dispatch operations.',
    responsibilities: [
      'Supervise incoming inventory receipts and outgoing dispatch consignments',
      'Maintain computer inventory logs and dispatch documentation',
      'Ensure proper FIFO (First-In, First-Out) stock rotation',
      'Coordinate with regional freight and transport carriers'
    ],
    isActive: true,
    postedDate: '2026-09-28',
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'RELATION INDIA Expands Healthcare Supply Network in Jharkhand',
    category: 'Company News',
    date: '2026-09-25',
    summary: 'Relation India enhances its distribution network across Dhanbad, Bokaro, and Giridih districts to improve timely delivery of personal hygiene and healthcare goods.',
    content: 'RELATION INDIA, headquartered at Topchanchi, Dhanbad, has initiated an expanded stockist and distribution initiative across Eastern Jharkhand. This step strengthens availability of essential healthcare products and personal hygiene supplies like RELATION-SECURE PADS directly to local chemists and community health dispensaries. The company is actively collaborating with regional transport partners to ensure consistent, uninterrupted supply chains.',
    readTime: '3 min read',
  },
  {
    id: 'news-2',
    title: 'Focus on Women’s Personal Hygiene Awareness & Safe Product Handling',
    category: 'Healthcare',
    date: '2026-09-10',
    summary: 'Relation India highlights proper hygiene practices and the importance of sealed, hygienic sanitary products for community well-being.',
    content: 'Hygiene education remains a core focus of community wellness in semi-urban and rural areas. RELATION INDIA emphasizes the importance of using moisture-protected, quality-verified sanitary pads such as RELATION-SECURE PADS. The company continues to prioritize affordable packaging options and clear disposal instructions to encourage safe everyday hygiene habits.',
    readTime: '4 min read',
  },
  {
    id: 'news-3',
    title: 'Quality Assurance Upgrades Implemented at Topchanchi Facility',
    category: 'Company News',
    date: '2026-08-18',
    summary: 'Standardized batch inspection protocols and improved warehouse environmental monitoring introduced at our Topchanchi unit.',
    content: 'To maintain the highest standards of reliability, RELATION INDIA has upgraded its incoming material inspection procedures and storage facility controls at At-Mantand, Topchanchi. These upgrades ensure complete traceability for all incoming packaging batches and finished health items before dispatch to pharmacies and distribution partners.',
    readTime: '2 min read',
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    employeeId: 'EMP-1024',
    fullName: 'Rajesh Kumar Mahato',
    department: 'Sales & Field Distribution',
    designation: 'Senior Area Executive',
    email: 'rajesh.kumar@relationindia.com',
    phone: '+91 98765 43210',
    joinDate: '2024-03-15',
    status: 'Active',
    leaveBalance: 14,
  },
  {
    id: 'emp-2',
    employeeId: 'EMP-1035',
    fullName: 'Pooja Kumari',
    department: 'Quality & Regulatory',
    designation: 'Quality Officer',
    email: 'pooja.kumari@relationindia.com',
    phone: '+91 98765 43211',
    joinDate: '2024-08-01',
    status: 'Active',
    leaveBalance: 12,
  },
  {
    id: 'emp-3',
    employeeId: 'EMP-1048',
    fullName: 'Amit Ranjan',
    department: 'Supply Chain & Logistics',
    designation: 'Inventory Coordinator',
    email: 'amit.ranjan@relationindia.com',
    phone: '+91 98765 43212',
    joinDate: '2025-01-10',
    status: 'Active',
    leaveBalance: 18,
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-tso-jharkhand',
    jobTitle: 'Territory Sales Officer (Healthcare Products)',
    fullName: 'Vikash Kumar Verma',
    mobileNumber: '9431234567',
    email: 'vikash.verma@example.com',
    qualification: 'B.Pharm, Vinoba Bhave University',
    experience: '2 Years in Pharmaceutical Distribution',
    resumeFileName: 'Vikash_Verma_Resume.pdf',
    message: 'I have 2 years of active field experience covering retail chemists across Dhanbad and Giridih districts.',
    submittedAt: '2026-10-02T14:30:00Z',
    status: 'Reviewed',
  }
];

export const INITIAL_ENQUIRIES: ContactEnquiry[] = [
  {
    id: 'enq-1',
    fullName: 'M/s Dhanbad Medicos',
    email: 'dhanbad.medicos@example.com',
    phone: '9835012345',
    subject: 'Distributorship Inquiry for RELATION-SECURE PADS',
    productOfInterest: 'RELATION-SECURE PADS',
    message: 'We operate wholesale supply to 40+ pharmacies across Dhanbad district. We would like to inquire about bulk supply terms.',
    submittedAt: '2026-10-04T11:15:00Z',
  }
];
