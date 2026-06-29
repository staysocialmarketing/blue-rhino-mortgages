export interface TeamMember {
  name: string
  title: string
  license?: string
  phone?: string
  email?: string
  specialty: string
  bio: string
  role: 'agent' | 'support'
}

export const team: TeamMember[] = [
  {
    name: 'Scott Pattinson',
    title: 'Mortgage Agent, Level 2',
    license: 'M15002602',
    phone: '416-220-0231',
    email: 'scott@bluerhinomortgages.com',
    specialty: 'Entrepreneurs · Self-Employed · GTA Families',
    bio: 'Former business owner and dad. Scott understands corporate draws, retained earnings, and what it means to make decisions with real money on the line. He built Blue Rhino to do mortgages differently.',
    role: 'agent',
  },
  {
    name: 'Neil Pajpani',
    title: 'Mortgage Agent, Level 2',
    email: 'neil@bluerhinomortgages.com',
    specialty: 'First-Time Buyers · Refinancing · Investment Properties',
    bio: 'Neil brings deep knowledge of the Toronto market to every file. Whether you\'re stepping into homeownership for the first time or restructuring a portfolio, he finds the path forward.',
    role: 'agent',
  },
  {
    name: 'Meghna Dhamani',
    title: 'Mortgage Agent, Level 2',
    email: 'meghna@bluerhinomortgages.com',
    specialty: 'Newcomers to Canada · Alternative Lending · Pre-Approvals',
    bio: 'Meghna specializes in serving clients whose situations don\'t fit the standard bank mould: newcomers, those with non-traditional income, and buyers who need a smarter path to approval.',
    role: 'agent',
  },
  {
    name: 'Mitt Kapadia',
    title: 'Technology Manager',
    specialty: 'Operations · Technology',
    bio: 'Mitt keeps the Blue Rhino engine running. From systems to client processes, he ensures every file moves efficiently from start to close.',
    role: 'support',
  },
  {
    name: 'Christina Ali',
    title: 'Office Manager',
    specialty: 'Client Coordination · Administration',
    bio: 'Christina is the organizational backbone of Blue Rhino. She coordinates between agents, lenders, and clients to make sure nothing gets missed and everything closes on time.',
    role: 'support',
  },
]

export const site = {
  name: 'Blue Rhino Mortgages',
  tagline: "Could've been any broker. Wasn't.",
  brokerage: 'Premiere Mortgage Centre Inc.',
  brokerageAddress: '1655 Dupont St, Suite 101, Toronto, ON M6P 3T1',
  brokerageLicense: '10317',
  phone: '416-220-0231',
  email: 'info@bluerhinomortgages.com',
  instagram: 'https://instagram.com/bluerhinomortgages',
  compliance: 'Blue Rhino Mortgages · Premiere Mortgage Centre Inc., ON Brokerage Licence #10317',
  nav: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: [
    {
      heading: 'Tools',
      links: [
        { label: 'Mortgage Calculators', href: '/calculators' },
        { label: 'Should I Refinance?', href: '/should-i-refinance' },
      ],
    },
    {
      heading: 'Learn',
      links: [
        { label: 'Services', href: '/services' },
        { label: 'Resources', href: '/resources' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
}
