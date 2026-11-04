// Short labels for the tab strip and diagrams; full titles stay in the page front matter.
const SHORT: Record<string, string> = {
  'how-software-sales-work': 'Software sales',
  'how-ofs-sales-work': 'OFS sales',
  'sales-cycle': 'Sales cycle',
  'increase-software-sales-ep': 'E&P adoption',
  'long-term-strategy': 'Strategy',
  'target-a-client': 'Targeting',
  'keywords': 'Keywords',
  'sell-internally': 'Sell internally',
  'running-the-cycle': 'Running the cycle',
  'metrics': 'Metrics',
  'revenue-models': 'Revenue models',
  'digital-landscape-mena': 'Digital MENA',
  'digital-risk': 'Digital risk'
};

export const shortTitle = (slug: string) => SHORT[slug] ?? slug;
