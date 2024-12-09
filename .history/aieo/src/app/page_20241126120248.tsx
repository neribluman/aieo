'use client';

import { Card, Title, AreaChart, Grid, Text, Metric, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, List, ListItem } from '@tremor/react';
import type { CustomTooltipProps } from '@tremor/react';
import WorldMap from "react-svg-worldmap";
import { CountryContext } from "react-svg-worldmap";

// First, let's define a type for the position
type Position = number | '-';

interface RegionalData {
  region: string;
  score: number;
  color: string;
  topQueries: string[];
  growth: string;
  marketPenetration: string;
}

interface ICPData {
  profile: string;
  score: number;
  color: string;
  characteristics: string[];
  engagement: string;
  conversionRate: string;
}

interface MapData {
  country: string;
  value: number;
}

interface MonthlyScore {
  month: string;
  percentageRanked: number;
  avgRankingPosition: number;
  citationAppearance: number;
  avgCitationPosition: number;
}

export default function VisibilityDashboard() {
  // Monthly visibility scores
  const monthlyScores = [
    { 
      month: 'May 2024',
      percentageRanked: 25,
      avgRankingPosition: 4.2,
      citationAppearance: 15,
      avgCitationPosition: 8.5,
    },
    { 
      month: 'Jun 2024',
      percentageRanked: 28,
      avgRankingPosition: 3.8,
      citationAppearance: 18,
      avgCitationPosition: 7.8,
    },
    { 
      month: 'Jul 2024',
      percentageRanked: 32,
      avgRankingPosition: 3.5,
      citationAppearance: 22,
      avgCitationPosition: 6.5,
    },
    { 
      month: 'Aug 2024',
      percentageRanked: 35,
      avgRankingPosition: 3.2,
      citationAppearance: 28,
      avgCitationPosition: 5.2,
    },
    { 
      month: 'Sep 2024',
      percentageRanked: 42,
      avgRankingPosition: 2.8,
      citationAppearance: 35,
      avgCitationPosition: 4.5,
    },
    { 
      month: 'Oct 2024',
      percentageRanked: 45,
      avgRankingPosition: 2.5,
      citationAppearance: 38,
      avgCitationPosition: 3.8,
    },
  ];

  // Sample queries where Ariga.io appears
  const sampleQueries = [
    {
      category: "Problem Recognition",
      query: "What challenges do teams face with manual database schema changes?",
      platforms: [
        { name: "Perplexity", position: 2, cited: true },
        { name: "Claude", position: 4, cited: true },
        { name: "Gemini", position: '-', cited: false }
      ],
      impact: "High",
      userIntent: "Research"
    },
    {
      category: "Research",
      query: "What tools are available for database schema management?",
      platforms: [
        { name: "Gemini", position: 1, cited: true },
        { name: "SearchGPT", position: 3, cited: true },
        { name: "Claude", position: 5, cited: false }
      ],
      impact: "High",
      userIntent: "Evaluation"
    },
    {
      category: "Vendor Analysis",
      query: "How does Ariga's solution compare to other vendors?",
      platforms: [
        { name: "Claude", position: 2, cited: true },
        { name: "Perplexity", position: '-', cited: false },
        { name: "Gemini", position: 4, cited: true }
      ],
      impact: "High",
      userIntent: "Comparison"
    },
    {
      category: "Deep Evaluation",
      query: "How does Ariga's tool handle complex schema migrations?",
      platforms: [
        { name: "Gemini", position: 3, cited: true },
        { name: "MetaAI", position: '-', cited: false },
        { name: "Perplexity", position: 6, cited: true }
      ],
      impact: "Medium",
      userIntent: "Technical"
    },
    {
      category: "Decision Support",
      query: "What is the projected ROI and payback period for adopting Ariga's platform?",
      platforms: [
        { name: "Perplexity", position: 1, cited: true },
        { name: "Claude", position: 3, cited: true },
        { name: "SearchGPT", position: '-', cited: false }
      ],
      impact: "High",
      userIntent: "Business"
    }
  ];

  // Citation leaderboard
  const citationLeaderboard = [
    { 
      company: 'Redgate', 
      citations: 876, 
      trend: '+8%',
      analysis: {
        strengths: [
          "SQL Server tooling specialist",
          "Enterprise compliance focus",
          "Comprehensive database lifecycle tools"
        ],
        citationContext: "Leader in SQL Server management",
        marketShare: "16%",
        recentUpdates: "Enhanced compliance automation features"
      }
    },
    { 
      company: 'Ariga.io', 
      citations: 864, 
      trend: '+32%',
      analysis: {
        strengths: [
          "Schema-as-code innovation",
          "Modern DevOps integration",
          "Strong versioning capabilities"
        ],
        citationContext: "Fast-growing in DevOps-focused searches",
        marketShare: "15%",
        recentUpdates: "Launched new schema visualization tools"
      }
    },
    { 
      company: 'Hasura', 
      citations: 845, 
      trend: '+25%',
      analysis: {
        strengths: [
          "GraphQL API automation",
          "Real-time subscription features",
          "Instant API generation"
        ],
        citationContext: "Top in GraphQL database solutions",
        marketShare: "14%",
        recentUpdates: "New real-time collaboration features"
      }
    },
    { 
      company: 'PlanetScale', 
      citations: 789, 
      trend: '+28%',
      analysis: {
        strengths: [
          "Serverless database platform",
          "Branch-based database workflow",
          "MySQL compatibility"
        ],
        citationContext: "Rising star in serverless databases",
        marketShare: "14%",
        recentUpdates: "Launched new branching features"
      }
    },
    { 
      company: 'Atlas', 
      citations: 654, 
      trend: '+20%',
      analysis: {
        strengths: [
          "Modern schema management",
          "Strong GraphQL integration",
          "Developer-friendly workflow"
        ],
        citationContext: "Growing in modern stack adoption",
        marketShare: "12%",
        recentUpdates: "New GraphQL schema features"
      }
    },
    { 
      company: 'Alembic', 
      citations: 543, 
      trend: '+10%',
      analysis: {
        strengths: [
          "Python ecosystem favorite",
          "SQLAlchemy integration",
          "Lightweight migration tool"
        ],
        citationContext: "Most cited Python migration tool",
        marketShare: "10%",
        recentUpdates: "Enhanced SQLAlchemy support"
      }
    },
    { 
      company: 'TypeORM', 
      citations: 498, 
      trend: '+15%',
      analysis: {
        strengths: [
          "TypeScript-first ORM",
          "Strong Node.js integration",
          "Active community support"
        ],
        citationContext: "Popular in TypeScript projects",
        marketShare: "9%",
        recentUpdates: "Improved TypeScript 5.0 support"
      }
    },
    { 
      company: 'DBmaestro', 
      citations: 456, 
      trend: '+5%',
      analysis: {
        strengths: [
          "Enterprise DevOps focus",
          "Strong security features",
          "Compliance automation"
        ],
        citationContext: "Referenced in enterprise DevOps",
        marketShare: "8%",
        recentUpdates: "New security compliance features"
      }
    },
    { 
      company: 'SchemaHero', 
      citations: 432, 
      trend: '+18%',
      analysis: {
        strengths: [
          "Kubernetes-native solution",
          "GitOps workflow support",
          "Cloud-native architecture"
        ],
        citationContext: "Growing in Kubernetes adoption",
        marketShare: "8%",
        recentUpdates: "Enhanced Kubernetes operator"
      }
    },
    { 
      company: 'Sequelize', 
      citations: 423, 
      trend: '+6%',
      analysis: {
        strengths: [
          "Mature Node.js ORM",
          "Multi-dialect support",
          "Large community"
        ],
        citationContext: "Established in Node.js ecosystem",
        marketShare: "7%",
        recentUpdates: "Added TypeScript enhancements"
      }
    },
    { 
      company: 'DataGrip', 
      citations: 387, 
      trend: '+8%',
      analysis: {
        strengths: [
          "IDE integration",
          "Multi-database support",
          "Developer productivity"
        ],
        citationContext: "Popular IDE-based solution",
        marketShare: "7%",
        recentUpdates: "New database visualization features"
      }
    },
    { 
      company: 'DbUp', 
      citations: 345, 
      trend: '+4%',
      analysis: {
        strengths: [
          ".NET ecosystem tool",
          "Simple deployment model",
          "SQL Server focus"
        ],
        citationContext: "Common in .NET projects",
        marketShare: "6%",
        recentUpdates: "Improved .NET Core support"
      }
    },
    { 
      company: 'Codebots', 
      citations: 289, 
      trend: '+15%',
      analysis: {
        strengths: [
          "Low-code approach",
          "Automated code generation",
          "Visual modeling"
        ],
        citationContext: "Growing in low-code segment",
        marketShare: "5%",
        recentUpdates: "New visual modeling features"
      }
    }
  ];

  // Enhanced AI Engine Rankings
  const aiEngineRankings = [
    { 
      engine: 'Perplexity',
      visibility: 45,
      percentageRanked: 45,
      avgRankingPosition: 2.5,
      citationAppearance: 38,
      avgCitationPosition: 3.8,
      color: 'indigo'
    },
    { 
      engine: 'SearchGPT',
      visibility: 32,
      percentageRanked: 35,
      avgRankingPosition: 3.2,
      citationAppearance: 28,
      avgCitationPosition: 5.2,
      color: 'emerald'
    },
    { 
      engine: 'Gemini',
      visibility: 38,
      percentageRanked: 42,
      avgRankingPosition: 2.8,
      citationAppearance: 35,
      avgCitationPosition: 4.5,
      color: 'violet'
    },
    { 
      engine: 'Claude',
      visibility: 36,
      percentageRanked: 38,
      avgRankingPosition: 3.0,
      citationAppearance: 32,
      avgCitationPosition: 4.8,
      color: 'amber'
    },
    { 
      engine: 'MetaAI',
      visibility: 24,
      percentageRanked: 25,
      avgRankingPosition: 4.2,
      citationAppearance: 15,
      avgCitationPosition: 8.5,
      color: 'rose'
    },
  ];

  // Helper function to get badge color based on position
  const getPositionBadgeColor = (position: Position): string => {
    if (position === '-') return "red";
    if (position <= 2) return "green";
    if (position <= 4) return "yellow";
    return "orange";
  };

  const regionalData: RegionalData[] = [
    {
      region: 'North America',
      score: 62,
      color: 'blue',
      topQueries: ['schema migration tools', 'database version control', 'CI/CD database integration'],
      growth: '+18%',
      marketPenetration: '34%'
    },
    {
      region: 'Europe',
      score: 45,
      color: 'emerald',
      topQueries: ['GDPR compliant schema management', 'enterprise database tools', 'multi-region database control'],
      growth: '+22%',
      marketPenetration: '28%'
    },
    {
      region: 'Asia Pacific',
      score: 28,
      color: 'amber',
      topQueries: ['cloud database management', 'schema automation tools', 'database DevOps'],
      growth: '+45%',
      marketPenetration: '15%'
    },
    {
      region: 'Latin America',
      score: 18,
      color: 'rose',
      topQueries: ['database migration solutions', 'schema version control', 'automated database updates'],
      growth: '+38%',
      marketPenetration: '12%'
    },
  ];

  const icpData: ICPData[] = [
    {
      profile: 'Enterprise DevOps Teams',
      score: 78,
      color: 'blue',
      characteristics: [
        'Large-scale deployments',
        'Multiple database types',
        'Complex CI/CD pipelines'
      ],
      engagement: 'High',
      conversionRate: '12%'
    },
    {
      profile: 'Cloud-Native Startups',
      score: 65,
      color: 'emerald',
      characteristics: [
        'Kubernetes-first',
        'Rapid iteration cycles',
        'Modern tech stack'
      ],
      engagement: 'Very High',
      conversionRate: '18%'
    },
    {
      profile: 'Financial Services',
      score: 52,
      color: 'violet',
      characteristics: [
        'Strict compliance needs',
        'High security requirements',
        'Legacy system integration'
      ],
      engagement: 'Medium',
      conversionRate: '8%'
    },
    {
      profile: 'SaaS Providers',
      score: 44,
      color: 'amber',
      characteristics: [
        'Multi-tenant databases',
        'Automated scaling needs',
        'Continuous deployment'
      ],
      engagement: 'High',
      conversionRate: '15%'
    }
  ];

  const visibilityMapData: MapData[] = [
    { country: "us", value: 62 },
    { country: "ca", value: 58 },
    { country: "mx", value: 15 },

    { country: "gb", value: 45 },
    { country: "de", value: 42 },
    { country: "fr", value: 40 },
    { country: "nl", value: 38 },
    { country: "se", value: 35 },
    { country: "es", value: 32 },
    { country: "it", value: 30 },
    { country: "ch", value: 36 },
    { country: "no", value: 33 },

    { country: "jp", value: 28 },
    { country: "au", value: 25 },
    { country: "sg", value: 22 },
    { country: "kr", value: 20 },
    { country: "in", value: 18 },
    { country: "cn", value: 15 },
    { country: "nz", value: 24 },

    { country: "br", value: 18 },
    { country: "mx", value: 15 },
    { country: "ar", value: 12 },
    { country: "cl", value: 14 },
    { country: "co", value: 10 },

    { country: "il", value: 30 },
    { country: "ae", value: 25 },
    { country: "sa", value: 20 },

    { country: "za", value: 15 },
    { country: "ng", value: 8 },
    { country: "eg", value: 12 }
  ];

  // Fix the any type in the customTooltip
  const customTooltip = ({ payload, active }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;

    const monthlyData = payload[0].payload as MonthlyScore;

    return (
      <div className="p-2 bg-white/90 border border-gray-200 rounded-lg shadow-lg">
        <div className="text-sm font-medium">
          {monthlyData.month}
        </div>
        {payload.map((category) => (
          <div key={category.dataKey} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm capitalize">
              {category.dataKey as string}:
            </span>
            <span className="text-sm font-medium">
              {category.value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ariga.io AI Visibility Dashboard</h1>
          <p className="text-gray-500 text-lg">Database Schema-as-Code Platform</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Monthly Score Tracker - Spans 2 columns */}
          <div className="lg:col-span-2">
            <Card className="bg-white/50 backdrop-blur-sm shadow-glow h-full">
              <div className="flex items-center justify-between">
                <Title className="flex items-center gap-4">
                  Monthly Visibility Performance
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                  </div>
                </Title>
              </div>
              
              <AreaChart
                className="h-72 mt-6"
                data={monthlyScores}
                index="month"
                categories={["percentageRanked", "avgRankingPosition", "citationAppearance", "avgCitationPosition"]}
                colors={["blue", "emerald", "amber", "violet"]}
                valueFormatter={(value: number) => {
                  if (value === null) return "";
                  return value.toFixed(1) + (value < 10 ? "" : "%");
                }}
                yAxisWidth={56}
                showAnimation={true}
                showLegend={true}
                curveType="natural"
                showGridLines={false}
                showXAxis={true}
                showYAxis={true}
                minValue={0}
                maxValue={50}
                customTooltip={({ payload, active }) => {
                  if (!active || !payload?.length) return null;

                  return (
                    <div className="p-2 bg-white/90 border border-gray-200 rounded-lg shadow-lg">
                      <div className="text-sm font-medium mb-2">
                        {payload[0].payload.month}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-sm">Sources Ranking: {payload[0].payload.percentageRanked}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-sm">Avg Rank: #{payload[0].payload.avgRankingPosition.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="text-sm">Sources Citing: {payload[0].payload.citationAppearance}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-violet-500" />
                          <span className="text-sm">Avg Citation Pos: #{payload[0].payload.avgCitationPosition.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              
              {/* Metric cards below the chart */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                <Card decoration="top" decorationColor="blue">
                  <Text>Content Ranked</Text>
                  <Metric className="text-blue-600">
                    {monthlyScores[monthlyScores.length - 1].percentageRanked}%
                  </Metric>
                  <Text className="text-sm text-gray-500">Current ranking coverage</Text>
                </Card>
                
                <Card decoration="top" decorationColor="emerald">
                  <Text>Average Position</Text>
                  <Metric className="text-emerald-600">
                    #{monthlyScores[monthlyScores.length - 1].avgRankingPosition.toFixed(1)}
                  </Metric>
                  <Text className="text-sm text-gray-500">Current ranking position</Text>
                </Card>
                
                <Card decoration="top" decorationColor="amber">
                  <Text>Citations</Text>
                  <Metric className="text-amber-600">
                    {monthlyScores[monthlyScores.length - 1].citationAppearance}
                  </Metric>
                  <Text className="text-sm text-gray-500">Current month citations</Text>
                </Card>

                <Card decoration="top" decorationColor="violet">
                  <Text>Citation Position</Text>
                  <Metric className="text-violet-600">
                    #{monthlyScores[monthlyScores.length - 1].avgCitationPosition.toFixed(1)}
                  </Metric>
                  <Text className="text-sm text-gray-500">Current citation position</Text>
                </Card>
              </div>
            </Card>
          </div>

          {/* AI Engine Performance - Right side column */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>AI Engine Performance</Title>
            <div className="mt-4 space-y-2">
              {aiEngineRankings.map((engine) => (
                <Card key={engine.engine} className="bg-white">
                  <div className="flex items-center justify-between">
                    <Text className="font-medium">{engine.engine}</Text>
                    <div className="flex gap-6">
                      <Text 
                        className={`text-sm font-medium ${
                          engine.avgRankingPosition <= 3 ? 'text-green-600' : 
                          engine.avgRankingPosition <= 5 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}
                      >
                        #{engine.avgRankingPosition.toFixed(1)}
                      </Text>
                      <Text 
                        className={`text-sm font-medium ${
                          engine.percentageRanked >= 40 ? 'text-green-600' : 
                          engine.percentageRanked >= 30 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}
                      >
                        {engine.percentageRanked}%
                      </Text>
                      <Text 
                        className={`text-sm font-medium ${
                          engine.citationAppearance >= 30 ? 'text-green-600' : 
                          engine.citationAppearance >= 20 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}
                      >
                        {engine.citationAppearance}
                      </Text>
                      <Text 
                        className={`text-sm font-medium ${
                          engine.avgCitationPosition <= 4 ? 'text-green-600' : 
                          engine.avgCitationPosition <= 6 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}
                      >
                        #{engine.avgCitationPosition.toFixed(1)}
                      </Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-3 flex justify-end gap-6 text-xs text-gray-500">
              <span>Rank</span>
              <span>Content</span>
              <span>Citations</span>
              <span>Cit. Pos</span>
            </div>
          </Card>
        </div>

        {/* Second Row - Full Width Query Section */}
        <div className="mb-6">
          {/* Query Appearances - Full Width */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>Top Performing Queries</Title>
            <TabGroup>
              <TabList className="mt-4">
                <Tab>Overview</Tab>
                <Tab>Platform Details</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Query & Intent</TableHeaderCell>
                        <TableHeaderCell>Category</TableHeaderCell>
                        <TableHeaderCell>Best Position</TableHeaderCell>
                        <TableHeaderCell>Platform Rankings</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sampleQueries.map((query) => {
                        const validPositions = query.platforms
                          .map(p => p.position)
                          .filter((pos): pos is number => pos !== '-');
                        
                        const bestPosition = validPositions.length > 0 
                          ? Math.min(...validPositions)
                          : '-';
                        
                        return (
                          <TableRow key={query.query}>
                            <TableCell>
                              <div className="space-y-1">
                                <Text className="font-medium">{query.query}</Text>
                                <Badge color="gray" size="sm">{query.userIntent}</Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge color="blue" size="lg">{query.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                color={getPositionBadgeColor(bestPosition)}
                                size="lg"
                              >
                                {bestPosition === '-' ? "Not Listed" : `#${bestPosition}`}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-2">
                                {query.platforms.map((platform) => (
                                  <div 
                                    key={platform.name}
                                    className="flex items-center space-x-1"
                                  >
                                    <Text className="text-sm font-medium">{platform.name}:</Text>
                                    <Badge 
                                      color={getPositionBadgeColor(platform.position as number | '-')}
                                      size="sm"
                                    >
                                      {platform.position === '-' ? "NL" : `#${platform.position}`}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Query</TableHeaderCell>
                        <TableHeaderCell>Platform</TableHeaderCell>
                        <TableHeaderCell>Position</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sampleQueries.flatMap((query) =>
                        query.platforms.map((platform, idx) => (
                          <TableRow key={`${query.query}-${platform.name}`}>
                            {idx === 0 && (
                              <TableCell rowSpan={query.platforms.length}>
                                <Text className="font-medium">{query.query}</Text>
                                <Text className="text-xs text-gray-500">{query.category}</Text>
                              </TableCell>
                            )}
                            <TableCell>
                              <Badge color="blue">{platform.name}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge color={getPositionBadgeColor(platform.position as number | '-')}>
                                {platform.position === '-' ? "Not Listed" : `#${platform.position}`}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {platform.cited ? (
                                <Badge color="green">Cited</Badge>
                              ) : (
                                <Badge color="red">Not Cited</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </div>

        {/* Third Row - Citation Leaderboard with Analysis and ICP side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Citation Leaderboard */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>Industry Citation Leaderboard & Competitor Analysis</Title>
            <TabGroup>
              <TabList className="mt-4">
                <Tab>Overview</Tab>
                <Tab>Detailed Analysis</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Table className="mt-4">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Company</TableHeaderCell>
                        <TableHeaderCell>Citations</TableHeaderCell>
                        <TableHeaderCell>Market Share</TableHeaderCell>
                        <TableHeaderCell>Trend</TableHeaderCell>
                        <TableHeaderCell>Key Strength</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {citationLeaderboard.map((company) => (
                        <TableRow key={company.company}>
                          <TableCell>
                            <Text className={company.company === 'Ariga.io' ? 'font-bold text-blue-600' : ''}>
                              {company.company}
                            </Text>
                          </TableCell>
                          <TableCell>
                            <Text>{company.citations}</Text>
                          </TableCell>
                          <TableCell>
                            <Text>{company.analysis.marketShare}</Text>
                          </TableCell>
                          <TableCell>
                            <Badge color={company.trend.startsWith('+') ? 'green' : 'red'}>
                              {company.trend}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Text className="text-sm text-gray-600">
                              {company.analysis.strengths[0]}
                            </Text>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabPanel>
                <TabPanel>
                  <div className="space-y-6 mt-4">
                    {citationLeaderboard.map((company) => (
                      <Card key={company.company} className="bg-white/70">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Text className={`text-xl font-semibold ${company.company === 'Ariga.io' ? 'text-blue-600' : ''}`}>
                              {company.company}
                            </Text>
                            <Text className="text-sm text-gray-600">
                              Market Share: {company.analysis.marketShare}
                            </Text>
                          </div>
                          <Badge size="lg" color={company.trend.startsWith('+') ? 'green' : 'red'}>
                            {company.trend} Growth
                          </Badge>
                        </div>
                        
                        <Grid numItems={1} numItemsSm={2} className="gap-4 mt-4">
                          <Card decoration="top" decorationColor="blue">
                            <Title>Key Strengths</Title>
                            <List className="mt-2">
                              {company.analysis.strengths.map((strength, index) => (
                                <ListItem key={index}>
                                  <Text>{strength}</Text>
                                </ListItem>
                              ))}
                            </List>
                          </Card>
                          
                          <Card decoration="top" decorationColor="emerald">
                            <Title>Recent Updates</Title>
                            <Text className="mt-2">{company.analysis.recentUpdates}</Text>
                            <Text className="mt-2 text-sm text-gray-600">
                              Citation Context: {company.analysis.citationContext}
                            </Text>
                          </Card>
                        </Grid>
                      </Card>
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>

          {/* ICP Analysis */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>ICP Performance Analysis</Title>
            <div className="space-y-6 mt-4">
              {icpData.map((icp) => (
                <Card key={icp.profile} decoration="top" decorationColor={icp.color}>
                  <Flex alignItems="start">
                    <div>
                      <Text className="font-medium">{icp.profile}</Text>
                      <Metric className="mt-1">{icp.score}%</Metric>
                    </div>
                    <div className="space-y-1 text-right">
                      <Badge color={icp.color} size="lg">
                        {icp.engagement} Engagement
                      </Badge>
                      <Text className="text-sm">
                        Conv. Rate: {icp.conversionRate}
                      </Text>
                    </div>
                  </Flex>
                  <div className="mt-4">
                    <Text className="text-sm font-medium mb-2">Profile Characteristics:</Text>
                    <div className="flex flex-wrap gap-2">
                      {icp.characteristics.map((char, idx) => (
                        <Badge key={idx} color={icp.color} size="sm">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Fourth Row - Full Width Map Section */}
        <div className="mb-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>Global Market Presence</Title>
            <TabGroup>
              <TabList className="mt-4">
                <Tab>Map View</Tab>
                <Tab>Regional Details</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className="w-full h-[800px] flex justify-center items-center mt-4">
                    <div className="w-[95%] h-full">
                      <WorldMap
                        color="blue"
                        title="Global Visibility Scores"
                        valueSuffix="%"
                        size="xxl"
                        data={visibilityMapData}
                        richInteraction={true}
                        tooltipTextFunction={(context: CountryContext<number>) => {
                          return `${context.countryName}: ${context.countryValue ?? 0}% visibility`;
                        }}
                        styleFunction={(context: CountryContext<number>) => {
                          const calculatedValue = context.countryValue ?? 0;
                          const opacityLevel = calculatedValue 
                            ? 0.1 + (1.5 * (calculatedValue - context.minValue)) / (context.maxValue - context.minValue)
                            : 0.1;
                          
                          return {
                            fill: context.color,
                            fillOpacity: opacityLevel,
                            stroke: "#1d4ed8",
                            strokeWidth: 1,
                            strokeOpacity: 0.3,
                            cursor: "pointer",
                          };
                        }}
                        frame={true}
                        frameColor="#cbd5e1"
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {regionalData.map((region) => (
                      <Card key={region.region} decoration="left" decorationColor={region.color}>
                        <Flex>
                          <div>
                            <Text className="font-medium">{region.region}</Text>
                            <Metric className="mt-1">{region.score}%</Metric>
                          </div>
                          <div className="space-y-1">
                            <Badge color={region.color} size="xl">
                              Growth: {region.growth}
                            </Badge>
                            <Text className="text-sm">Market: {region.marketPenetration}</Text>
                          </div>
                        </Flex>
                        <Text className="mt-4 text-sm font-medium">Top Queries:</Text>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {region.topQueries.map((query, idx) => (
                            <Badge key={idx} color={region.color} size="sm">
                              {query}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </div>
      </div>
    </div>
  );
} 