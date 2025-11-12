// Comprehensive knowledge base for the AI chatbot - Dallas Group of Companies
export const chatbotKnowledge = {
  company: {
    name: "Dallas Group of Companies",
    tagline: "Trusted electrical products and industrial solutions provider in the GCC",
    founded: "1995",
    founder: "Mr. Prakash Ahuja",

    about: `Welcome to Dallas Group of Companies - a trusted name in the trading and distribution of high-quality electrical products and industrial solutions across the GCC.

Founded in 1995 under the visionary leadership of Mr. Prakash Ahuja, Dallas Group has evolved from its roots in Dubai into a multi-regional enterprise with a strong presence in the UAE, Oman, and Bahrain, and a growing footprint through an associated company in Dammam, Saudi Arabia.

Over the years, Dallas has built a reputation for reliability, efficiency, and customer-focused service. Guided by a well-structured management framework - with Mr. Prakash Ahuja at the helm and each division led by experienced General Managers and Directors - the Group ensures streamlined operations and consistent excellence across all regions.`,

    values: `At Dallas, we believe in partnership-driven growth. Our customers are our collaborators, and we go beyond supplying products by offering technical expertise, cost-effective solutions, and end-to-end support. Our centralized sales coordination and sourcing teams based in Dubai, Oman, and Bahrain work closely to ensure timely deliveries, technical assistance, and superior after-sales service.

We are deeply committed to innovation, sustainability, and alignment with government initiatives aimed at building a more energy-efficient and sustainable future. Through continuous research, collaboration with consultants, and a focus on operational efficiency, Dallas Group continues to expand its capabilities — delivering value, fostering trust, and driving long-term success across the Middle East.`,

    stats: {
      customers: "1,000+",
      countries: "10+",
      products: "200+",
      suppliers: "150+",
      experience: "28+ years"
    },

    certifications: [
      "ISO 9001:2008 Certified",
      "First Electrical Trading Company in UAE to receive ISO 9001:2008 Certification"
    ]
  },

  team: [
    {
      name: "Prakash Ahuja",
      position: "Chairman & Founder",
      bio: "Prakash Ahuja is a pioneering figure in the electrical industry with over three decades of entrepreneurial experience. Known for his visionary leadership and deep business acumen, he has built Dallas Group of Companies on the foundations of trust, innovation, and excellence. Business is not just a profession for him — It is his passion and lifelong pursuit."
    },
    {
      name: "Ibrahim Somji",
      position: "Director",
      bio: "A first-generation entrepreneur, Ibrahim Somji has made his mark in the electrical products sector as well as the real estate industry, having developed several prestigious towers. Highly regarded within the business community, he is known for his integrity, strategic insight, and straightforward approach to leadership."
    },
    {
      name: "Jay Ahuja",
      position: "Executive Director",
      bio: "As Executive Director of Dallas Group, Jay Ahuja brings over two decades of diverse experience within the organization. He oversees the Group's overall operations and IT infrastructure across all branches in the Middle East. His hands-on leadership and commitment to operational excellence have been instrumental in strengthening Dallas's regional presence and efficiency."
    },
    {
      name: "Vijay Ahuja",
      position: "Director – Oman Operations",
      bio: "Vijay Ahuja has an educational background in Management Information Systems and Accounting, combined with extensive training and experience in branding, business development, and marketing in both the US and Indian markets. Since 2015, as the leader of operations in Oman, his experience includes strategic planning, team management, and fostering relationships with key stakeholders. This combination of academic qualifications and practical experience underscores his capability to drive growth and expansion in Oman's market."
    },
    {
      name: "Amjad Ali",
      position: "General Manager – UAE & Bahrain",
      bio: "Amjad Ali, a qualified Electrical Engineer, has been an integral part of Dallas for over 30 years. Widely recognized by clients for his articulate technical guidance, his solutions have consistently delivered cost efficiency, reliability, and performance optimization. His long-standing commitment and deep product knowledge make him one of the most respected professionals in the industry."
    }
  ],

  locations: {
    dubai: {
      name: "Dubai Office & Warehouse",
      country: "United Arab Emirates",
      type: "Headquarters & Main Distribution Center",
      address: "Dubai Industrial City, Phase 1, Block J-08, P.O.Box 2028",
      phone: "+971 4 3635500",
      fax: "+971 4 4290088",
      email: "info@dallastrading.net",
      manager: "Amjad Ali (General Manager)"
    },
    oman: {
      name: "Oman (Muscat Office)",
      country: "Sultanate of Oman",
      type: "Regional Office",
      address: "PC 111, Ghala Industrial Area, Muscat",
      phone: "+968 2 459 3041",
      email: "vijay@dallastrading.net",
      manager: "Vijay Ahuja (Director – Oman Operations)"
    },
    bahrain: {
      name: "Hidd - Kingdom of Bahrain",
      country: "Kingdom of Bahrain",
      type: "Warehouse Facility",
      address: "Majaal 4, Bldg 1988, Unit 13, Road 1527, Block 115, BIW, Hidd Industrial Area",
      phone: "+973 3398 8702",
      email: "info@dallastrading.net",
      manager: "Amjad Ali (General Manager)"
    },
    saudi: {
      name: "Saudi Arabia (Associated Company)",
      country: "Kingdom of Saudi Arabia",
      type: "Associated Company",
      location: "Dammam",
      description: "Growing footprint through associated company"
    }
  },

  productCategories: [
    {
      id: "industrial_plugs_and_sockets",
      title: "Industrial Plugs & Sockets",
      description: "Industrial Plugs & Sockets provide a connection to the electrical mains rated at higher voltages and currents than household Plugs & Sockets.",
      company: "PCE",
      products: ["Industrial Plug & Socket"],
      path: "/our-products/industrial_plugs_and_sockets",
      detailedInfo: "PCE Industrial Plugs & Sockets are designed for heavy-duty industrial applications with ratings from 16A to 125A. Available in various configurations including 2P+E, 3P+E, and 3P+N+E. IP44 and IP67 protection ratings available. Suitable for construction sites, factories, and outdoor installations.",
      productDetails: [
        {
          name: "Industrial Plug & Socket",
          path: "/our-products/industrial_plugs_and_sockets/Industrial_Plug_And_Socket",
          company: "PCE",
          specs: "Heavy-duty industrial plugs and sockets rated from 16A to 125A. Available configurations: 2P+E, 3P+E, 3P+N+E. Protection: IP44 and IP67. Applications: Construction sites, factories, outdoor installations."
        }
      ]
    },
    {
      id: "cable_jointing_kit",
      title: "Cable Jointing Kit / Termination",
      description: "3M™ Wire Pulling Lubricants are designed for specific applications such as cable pulling, moisture and corrosion protection, and preventing build up of glues, wax, inks, and paint.",
      company: "3M",
      products: [
        "3M LV Resin Joint Kit",
        "3M Wire Pulling Lubricant",
        "Cold Shrink Termination",
        "Heat Shrink Accessories",
        "Heat Shrink Termination",
        "LV 3M Cold Shrink Straight Cable Joint"
      ],
      path: "/our-products/cable_jointing_kit"
    },
    {
      id: "flexiblerigid_conduit_and_accessories",
      title: "Flexible/Rigid Conduit & Accessories",
      description: "Rigid metal conduit is a thick-walled threaded tubing, usually made of coated steel, stainless steel or aluminum. Galvanized rigid conduit is a tubing wall that is thick enough to allow it to be threaded.",
      company: "Barton",
      products: [
        "Flexible Conduit & Accessories",
        "Rigid Conduit & Accessories"
      ],
      path: "/our-products/flexiblerigid_conduit_and_accessories"
    },
    {
      id: "Resin_Jointing_Kits",
      title: "Resin Jointing Kits",
      description: "Resin-filled joints Type TSJ-SC for armoured and unarmoured power and control cables up to 1kV",
      company: "Raychem",
      products: ["Resin-filled joints Type TSJ-SC"],
      path: "/our-products/Resin_Jointing_Kits"
    },
    {
      id: "industrial_cable_glands",
      title: "Industrial Cable Glands",
      description: "Cable Glands are suitable for terminating any types of armored or unarmored cables. Moreover, the type of glands are chosen based on the environment ex. Indoor, Outdoor or Hazardous.",
      companies: ["Elite", "Hex"],
      products: [
        "A1/A2 Cable Gland",
        "BW Cable Gland",
        "CW Cable Gland",
        "E1W Cable Gland"
      ],
      path: "/our-products/industrial_cable_glands",
      detailedInfo: {
        "A1/A2 Cable Gland": "Supplied by Elite and Hex. A1 glands are for unarmoured cables, A2 for armoured cables. Brass construction with nickel plating. IP68 rated. Available in metric and PG thread sizes from M12 to M75. Suitable for both indoor and outdoor applications. Temperature range: -40°C to +100°C.",
        "BW Cable Gland": "Brass cable glands with locknut and washer. Suitable for use in both indoor and outdoor applications. Available in various thread sizes. IP68 protection rating.",
        "CW Cable Gland": "Brass cable glands for control and instrumentation cables. Suitable for industrial control panels. IP68 rated.",
        "E1W Cable Gland": "Brass cable glands for earth continuity. Ensures proper earthing for armoured cables. IP68 protection. Meets international standards."
      },
      productDetails: [
        {
          name: "A1/A2 Cable Gland (Elite)",
          path: "/our-products/industrial_cable_glands/A1A2_Cable_Gland",
          company: "Elite",
          specs: "A1 for unarmoured cables, A2 for armoured. Brass with nickel plating. IP68. Thread: M12-M75. Temp: -40°C to +100°C. Indoor/outdoor."
        },
        {
          name: "A1/A2 Cable Glands (Hex)",
          path: "/our-products/industrial_cable_glands/A1A2_Cable_Glands",
          company: "Hex",
          specs: "A1 for unarmoured cables, A2 for armoured. Brass with nickel plating. IP68. Thread: M12-M75. Temp: -40°C to +100°C. Indoor/outdoor."
        },
        {
          name: "BW Cable Gland (Elite)",
          path: "/our-products/industrial_cable_glands/BW_Cable_Gland",
          company: "Elite",
          specs: "Brass cable glands with locknut and washer. IP68. Indoor/outdoor. Various thread sizes."
        },
        {
          name: "BW Cable Gland (Hex)",
          path: "/our-products/industrial_cable_glands/BW_Cable_Glands",
          company: "Hex",
          specs: "Brass cable glands with locknut and washer. IP68. Indoor/outdoor. Various thread sizes."
        },
        {
          name: "CW Cable Gland (Elite)",
          path: "/our-products/industrial_cable_glands/CW_Cable_Gland",
          company: "Elite",
          specs: "Brass cable glands for control and instrumentation cables. IP68. For industrial control panels."
        },
        {
          name: "CW Cable Gland (Hex)",
          path: "/our-products/industrial_cable_glands/CW_Cable_Glands",
          company: "Hex",
          specs: "Brass cable glands for control and instrumentation cables. IP68. For industrial control panels."
        },
        {
          name: "E1W Cable Gland (Elite)",
          path: "/our-products/industrial_cable_glands/E1W_Cable_Gland",
          company: "Elite",
          specs: "Brass cable glands for earth continuity. IP68. Ensures proper earthing for armoured cables."
        },
        {
          name: "E1W Cable Gland (Hex)",
          path: "/our-products/industrial_cable_glands/E1W_Cable_Glands",
          company: "Hex",
          specs: "Brass cable glands for earth continuity. IP68. Ensures proper earthing for armoured cables."
        }
      ]
    },
    {
      id: "cables",
      title: "Cables",
      description: "Can be used indoors or outdoors in cable ducts, cable trays, conduits or underground locations under mechanical stresses in power and switching stations, local distribution systems, industrial plants and commercial buildings.",
      companies: ["Mesc", "Oxford Cavi"],
      products: [
        "Armoured Cables",
        "Control Cables",
        "Multi Conductor XLPE Unshielded",
        "Rubber Cable Ho7RNF"
      ],
      path: "/our-products/cables"
    },
    {
      id: "wires",
      title: "Wires",
      description: "These cables are used for the purpose of lighting in residential and commercial building in surface mounted or embedded conduits.",
      company: "Mesc",
      products: [
        "Panel Wire",
        "PVC Flexible Wire",
        "Single Core Wire/Building Wire"
      ],
      path: "/our-products/wires"
    },
    {
      id: "high_voltage_connectors",
      title: "High Voltage Connectors",
      description: "High Voltage Connectors are designed for hazardous areas, with protection mode. They comply with the ATEX 94/9/CE Directive. They are certified according to IECEx standards.",
      company: "Marechal Electric",
      products: [
        "DS4 High Current Connectors",
        "DX Metal Decontactor",
        "PF High Current Plugs and Socket Outlets",
        "Single Pole Power Connectors"
      ],
      path: "/our-products/high_voltage_connectors"
    },
    {
      id: "cable_management_system",
      title: "Cable Management System",
      description: "Each system is supported by a fully integrated range of time saving fixings and fittings that make it quick and easy to install, both internally and externally.",
      company: "Legrand Swift",
      products: [
        "Cable Ladder",
        "Cable Tray"
      ],
      path: "/our-products/cable_management_system"
    },
    {
      id: "pvc_conduits",
      title: "PVC Conduits",
      description: "Decoduct conduits are manufactured from super high impact uPVC compound suitable to withstand harsh environments. Conduits can be bent with the use of a bending spring.",
      company: "Decoduct",
      products: ["PVC Conduits"],
      path: "/our-products/pvc_conduits"
    },
    {
      id: "cable_ties",
      title: "Cable Ties",
      description: "Cable Ties are manufactured with special additives imparting resistant to UV radiation. Provides a secure locking which will not slip, come off or slacken.",
      company: "3M",
      products: ["Nylon Cable Tie"],
      path: "/our-products/cable_ties"
    },
    {
      id: "gi_boxes",
      title: "GI Boxes",
      description: "Re-galvanised switch & socket boxes are available with or without brass earth terminals and with or without adjustable lug. The boxes are packed in standard tray type packing.",
      company: "Barton",
      products: ["SWITCH AND SOCKET BOXES"],
      path: "/our-products/gi_boxes"
    },
    {
      id: "scotch_tapes_and_mastics",
      title: "Scotch Tapes & Mastics",
      description: "All Premium Tapes for industrial and factory used are available with wide range according to the various application",
      company: "3M",
      products: [
        "PCS Phase Identification Tape",
        "Scotch 22 Heavy Duty Tape",
        "Scotch 33 Tape",
        "Scotch 35 Tape",
        "Scotch Super 88 All Weather Tape",
        "Scotch T2228 Rubber Mastic Tape",
        "Scotch Vinyl Mastic Tape",
        "Scotchfil Insulation Putty"
      ],
      path: "/our-products/scotch_tapes_and_mastics"
    },
    {
      id: "industrial_cable_lugs_and_connectors",
      title: "Industrial Cable Lugs & Connectors",
      description: "The unique design of the inspection hole, helps the conductor to insert fully. The stopper at the end of the insertion allows the conductor to place itself rightly inside the surface area of the crimp.",
      path: "/our-products/industrial_cable_lugs_and_connectors"
    },
    {
      id: "industrial_fans",
      title: "Industrial Fans",
      description: "As a leading supplier of Industrial and Commercial Grade Air Circulators, BREEZE® is recognized throughout the industry for the superior quality and performance of its products.",
      company: "Breeze",
      products: ["Industrial Fans"],
      path: "/our-products/industrial_fans"
    },
    {
      id: "wiring_devices",
      title: "Wiring Devices",
      description: "They are easy to install and available through our extensive distributor network. The range is backed by MK's quality and reliability and provides the largest selection of wiring devices in any single range.",
      companies: ["Legrand", "MK Logic Plus"],
      products: [
        "Arteor",
        "Belanko",
        "Ceiling Rose",
        "Mallia",
        "Plexo",
        "Synergy",
        "Wiring Devices"
      ],
      path: "/our-products/wiring_devices"
    },
    {
      id: "switchgear_assembly",
      title: "Switchgear Assembly",
      description: "We have successfully supplied to challenging projects in reputable organizations like DEWA, ADDC, MEDC (DCRP), PDO, MOD, KAHRAMAA, QEWC & Refinery projects.",
      companies: ["ABB", "Eaton (Moeller)", "Hager", "Legrand", "Schneider", "Seimens"],
      products: ["Switchgear Assembly"],
      path: "/our-products/switchgear_assembly"
    },
    {
      id: "switchgear_accessories",
      title: "Switchgear Accessories",
      description: "Construction, Power distribution and Automation systems. In the hi-tech field of Industrial control and Automation, we are involved in Electrical & Electronic Controls, Automation and related areas.",
      companies: ["ABB", "Hager"],
      products: ["Switchgear Accessories"],
      path: "/our-products/switchgear_accessories"
    },
    {
      id: "laser_marking_machine",
      title: "Laser Marking Machine",
      description: "Laser Machines are ideally used for itching & marking over any metal or PVC Plates.",
      company: "Rayon",
      products: ["Laser Marking Machine"],
      path: "/our-products/laser_marking_machine"
    }
  ],

  brands: [
    "3M",
    "ABB",
    "Barton",
    "Breeze",
    "Decoduct",
    "Eaton (Moeller)",
    "Elite",
    "Hager",
    "Hex",
    "Legrand",
    "Legrand Swift",
    "Marechal Electric",
    "Mesc",
    "MK Logic Plus",
    "Oxford Cavi",
    "PCE",
    "Raychem",
    "Rayon",
    "Schneider Electric",
    "Siemens"
  ],

  services: {
    technical: "Our qualified electrical engineers provide comprehensive technical guidance for cost-effective, efficient, and reliable solutions tailored to your specific requirements.",
    consultation: "We work closely with consultants to suggest efficient and economical products, conducting R&D to continuously expand our product profile and stay ahead of industry demands.",
    delivery: "Centralized sales coordination and sourcing teams based in Dubai, Oman, and Bahrain ensure timely deliveries across all regions.",
    support: "Superior after-sales service with technical assistance and ongoing support for all products. Our team is available to help with installation, troubleshooting, and maintenance.",
    customization: "End-to-end support for custom solutions tailored to specific project requirements. From consultation to installation, we guide you through every step."
  },

  websitePages: {
    home: {
      path: "/home",
      title: "Home",
      description: "Main homepage with company overview, featured products, achievements, and partners"
    },
    about: {
      path: "/about",
      title: "About Us",
      description: "Detailed company history, values, vision, and information about Dallas Group"
    },
    products: {
      path: "/our-products",
      title: "Our Products",
      description: "Browse all 19 product categories with detailed specifications and company information"
    },
    management: {
      path: "/management",
      title: "Management Team",
      description: "Meet our leadership team - Chairman, Directors, and General Managers"
    },
    certificates: {
      path: "/certificates",
      title: "Certificates",
      description: "View our certifications including ISO 9001:2008 and quality standards"
    },
    projects: {
      path: "/our-projects",
      title: "Our Projects",
      description: "See our completed projects and case studies with reputable organizations"
    },
    careers: {
      path: "/career-opportunities",
      title: "Career Opportunities",
      description: "Explore career opportunities and join the Dallas Group team"
    },
    contact: {
      path: "/contact-us",
      title: "Contact Us",
      description: "Get in touch with our offices in Dubai, Oman, or Bahrain"
    }
  },

  brochure: {
    name: "DALLAS CATALOGUE & COMPANY PROFILE.pdf",
    description: "Comprehensive product catalogue featuring all our electrical products, company profile, certifications, and technical specifications. Available for download on our website.",
    howToAccess: "Visit our website and click the 'Download Brochure' button to get the complete catalogue in PDF format."
  },

  projectExperience: [
    "DEWA (Dubai Electricity and Water Authority)",
    "ADDC (Abu Dhabi Distribution Company)",
    "MEDC (DCRP)",
    "PDO (Petroleum Development Oman)",
    "MOD (Ministry of Defence)",
    "KAHRAMAA (Qatar General Electricity & Water Corporation)",
    "QEWC (Qatar Electricity & Water Company)",
    "Various Refinery Projects across the GCC"
  ]
};
