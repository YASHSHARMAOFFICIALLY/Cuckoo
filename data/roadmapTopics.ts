export interface Article {
  title: string;
  source: string;
  description: string;
  link: string;
}

export interface Video {
  id: string;
  title: string;
}

export interface Book {
  title: string;
  author: string;
  description: string;
  link?: string;
}

export interface RoadmapTopic {
  slug: string;
  title: string;
  badge: string;
  duration: string;
  overview: string;
  articles: Article[];
  videos: Video[];
  books: Book[];
  nextStep: string | null;
  prevStep: string | null;
}

export const ROADMAP_TOPICS: Record<string, RoadmapTopic> = {
  "budgeting-basics": {
    slug: "budgeting-basics",
    title: "Budgeting Basics",
    badge: "Foundation",
    duration: "~1 week",
    overview: "Understand where your money goes. Learn the 50/30/20 rule and build a simple monthly budget that sticks.",
    articles: [
      {
        title: "The 50/30/20 Budget Rule",
        source: "Investopedia",
        description: "A simple, intuitive way to allocate your income.",
        link: "https://www.investopedia.com/ask/answers/022916/what-502030-budget-rule.asp",
      },
      {
        title: "How to Build a Budget",
        source: "NerdWallet",
        description: "Step-by-step guide to tracking expenses and setting goals.",
        link: "https://www.nerdwallet.com/article/finance/how-to-build-a-budget",
      },
    ],
    videos: [
      { id: "T7JHfLGm_GY", title: "Budgeting for Beginners" },
      { id: "LKxOamnP8J4", title: "50/30/20 Rule Explained" },
    ],
    books: [
      {
        title: "Your Money or Your Life",
        author: "Vicki Robin",
        description: "Transform your relationship with money and achieve financial independence.",
      },
    ],
    nextStep: "emergency-fund",
    prevStep: null,
  },
  "emergency-fund": {
    slug: "emergency-fund",
    title: "Emergency Fund",
    badge: "Protection",
    duration: "~1 month",
    overview: "Before investing a single rupee, build 3–6 months of expenses in a liquid account. This is your financial foundation.",
    articles: [
      {
        title: "Why You Need an Emergency Fund",
        source: "Vanguard",
        description: "The importance of having cash ready for unexpected expenses.",
        link: "https://investor.vanguard.com/investor-resources-education/emergency-fund/why-you-need-one",
      },
      {
        title: "Where to Keep Your Emergency Fund",
        source: "Bankrate",
        description: "High-yield savings accounts and liquid options.",
        link: "https://www.bankrate.com/banking/savings/where-to-keep-emergency-fund/",
      },
    ],
    videos: [
      { id: "g-hir-4WzfU", title: "Building an Emergency Fund" },
    ],
    books: [
      {
        title: "The Total Money Makeover",
        author: "Dave Ramsey",
        description: "A proven plan for financial fitness, including emergency savings.",
      },
    ],
    nextStep: "mutual-funds-sips",
    prevStep: "budgeting-basics",
  },
  "mutual-funds-sips": {
    slug: "mutual-funds-sips",
    title: "Mutual Funds & SIPs",
    badge: "Investing",
    duration: "~2 weeks",
    overview: "Start your investment journey with ₹500/month. Learn how to pick mutual funds based on your risk profile and goals.",
    articles: [
      {
        title: "What is a Mutual Fund?",
        source: "Cleartax",
        description: "A comprehensive guide to mutual funds in India.",
        link: "https://cleartax.in/glossary/mutual-funds",
      },
      {
        title: "Power of SIP",
        source: "Groww",
        description: "How compounding works magic on your monthly SIPs.",
        link: "https://groww.in/p/sip-systematic-investment-plan",
      },
    ],
    videos: [
      { id: "ACpQo1a_RBk", title: "Mutual Funds for Beginners" },
    ],
    books: [
      {
        title: "Let's Talk Money",
        author: "Monika Halan",
        description: "A practical guide to financial security for Indians.",
      },
    ],
    nextStep: "stock-market-basics",
    prevStep: "emergency-fund",
  },
  "stock-market-basics": {
    slug: "stock-market-basics",
    title: "Stock Market Basics",
    badge: "Equities",
    duration: "~3 weeks",
    overview: "Understand how equity markets work. Learn about Nifty 50, how to read a balance sheet, and what makes a good stock.",
    articles: [
      {
        title: "How the Stock Market Works",
        source: "Zerodha Varsity",
        description: "The complete beginner's guide to Indian stock markets.",
        link: "https://zerodha.com/varsity/chapter/the-stock-markets/",
      },
      {
        title: "Reading a Balance Sheet",
        source: "Investopedia",
        description: "Demystifying company financials.",
        link: "https://www.investopedia.com/terms/b/balancesheet.asp",
      },
    ],
    videos: [
      { id: "by9_zHQzeZk", title: "Stock Market Basics Explained" },
    ],
    books: [
      {
        title: "The Intelligent Investor",
        author: "Benjamin Graham",
        description: "The definitive book on value investing.",
      },
      {
        title: "Coffee Can Investing",
        author: "Saurabh Mukherjea",
        description: "Low-risk path to stupendous wealth.",
      },
    ],
    nextStep: "long-term-wealth-building",
    prevStep: "mutual-funds-sips",
  },
  "long-term-wealth-building": {
    slug: "long-term-wealth-building",
    title: "Long-term Wealth Building",
    badge: "Advanced",
    duration: "Ongoing",
    overview: "Master asset allocation, portfolio rebalancing, tax-efficient investing (ELSS, PPF), and the psychology of staying the course.",
    articles: [
      {
        title: "Asset Allocation Strategies",
        source: "Morningstar",
        description: "How to divide your portfolio across asset classes.",
        link: "https://www.morningstar.in/posts/58263/3-asset-allocation-strategies.aspx",
      },
      {
        title: "Tax Planning in India",
        source: "Cleartax",
        description: "Understanding 80C, ELSS, and PPF.",
        link: "https://cleartax.in/s/what-is-tax-planning",
      },
    ],
    videos: [
      { id: "jPPzvuDIr1w", title: "Psychology of Money Summary" },
    ],
    books: [
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        description: "Timeless lessons on wealth, greed, and happiness.",
      },
    ],
    nextStep: null,
    prevStep: "stock-market-basics",
  },
};
