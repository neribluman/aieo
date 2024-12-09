'use client';

import { Card, Title, BarChart, DonutChart, AreaChart, Grid, Text, Metric, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge } from '@tremor/react';

// First, let's define a type for the position
type Position = number | '-';

interface Platform {
  name: string;
  position: Position;
  cited: boolean;
}

export default function VisibilityDashboard() {
  // Monthly visibility scores
  const monthlyScores = [
    { 
      month: 'May 2024',
      ranking: 45,
      citations: 35,
      competition: 38,
      queries: 156,
      totalCitations: 78,
    },
    { 
      month: 'Jun 2024',
      ranking: 52,
      citations: 42,
      competition: 45,
      queries: 189,
      totalCitations: 92,
    },
    { 
      month: 'Jul 2024',
      ranking: 58,
      citations: 48,
      competition: 52,
      queries: 145,
      totalCitations: 67,
    },
    { 
      month: 'Aug 2024',
      ranking: 65,
      citations: 45,
      competition: 68,
      queries: 134,
      totalCitations: 59,
    },
    { 
      month: 'Sep 2024',
      ranking: 72,
      citations: 38,
      competition: 82,
      queries: 223,
      totalCitations: 115,
    },
    { 
      month: 'Oct 2024',
      ranking: 78,
      citations: 32,
      competition: 88,
      queries: 198,
      totalCitations: 94,
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
    { company: 'Prisma', citations: 912, trend: '+15%' },
    { company: 'Dataedo', citations: 842, trend: '+8%' },
    { company: 'Couchbase', citations: 756, trend: '-3%' },
    { company: 'SchemaHero', citations: 567, trend: '+5%' },
    { company: 'Ariga.io', citations: 234, trend: '+22%' },
  ];

  // Enhanced AI Engine Rankings
  const aiEngineRankings = [
    { 
      engine: 'Perplexity',
      visibility: 45,
      mentions: 134,
      sentiment: 52,
      color: 'indigo'
    },
    { 
      engine: 'SearchGPT',
      visibility: 32,
      mentions: 89,
      sentiment: 48,
      color: 'emerald'
    },
    { 
      engine: 'Gemini',
      visibility: 38,
      mentions: 96,
      sentiment: 44,
      color: 'violet'
    },
    { 
      engine: 'Claude',
      visibility: 36,
      mentions: 98,
      sentiment: 48,
      color: 'amber'
    },
    { 
      engine: 'MetaAI',
      visibility: 24,
      mentions: 75,
      sentiment: 36,
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
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  </div>
                </Title>
              </div>
              
              <TabGroup>
                <TabList className="mt-4">
                  <Tab>Performance Metrics</Tab>
                  <Tab>Detailed Data</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className="mt-4">
                      <AreaChart
                        className="h-72 mt-6"
                        data={monthlyScores}
                        index="month"
                        categories={["ranking", "citations", "competition"]}
                        colors={["indigo", "emerald", "amber"]}
                        valueFormatter={(value: number) => `${value}%`}
                        yAxisWidth={40}
                        showAnimation={true}
                        showLegend={true}
                        curveType="natural"
                        showGridLines={false}
                        showXAxis={true}
                        showYAxis={true}
                        minValue={0}
                        maxValue={100}
                        customTooltip={({ payload }) => {
                          if (!payload?.[0]) return null;
                          return (
                            <div className="p-2 bg-white/90 border border-gray-200 rounded-lg shadow-lg">
                              <div className="text-sm font-medium">{payload[0].payload.month}</div>
                              {payload.map((category: any) => (
                                <div key={category.dataKey} className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
                                  <span className="text-sm capitalize">{category.dataKey}:</span>
                                  <span className="text-sm font-medium">{category.value}%</span>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      />
                      
                      {/* Add metric cards below the chart */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <Card decoration="top" decorationColor="blue">
                          <Text>Average Ranking</Text>
                          <Metric className="text-blue-600">
                            {(monthlyScores.reduce((acc, curr) => acc + curr.ranking, 0) / monthlyScores.length).toFixed(1)}%
                          </Metric>
                          <Text className="text-sm text-gray-500">Based on AI platform visibility</Text>
                        </Card>
                        
                        <Card decoration="top" decorationColor="emerald">
                          <Text>Citation Growth</Text>
                          <Metric className="text-emerald-600">
                            {(monthlyScores.reduce((acc, curr) => acc + curr.citations, 0) / monthlyScores.length).toFixed(1)}%
                          </Metric>
                          <Text className="text-sm text-gray-500">Average monthly citation rate</Text>
                        </Card>
                        
                        <Card decoration="top" decorationColor="amber">
                          <Text>Competitive Position</Text>
                          <Metric className="text-amber-600">
                            {(monthlyScores.reduce((acc, curr) => acc + curr.competition, 0) / monthlyScores.length).toFixed(1)}%
                          </Metric>
                          <Text className="text-sm text-gray-500">Market share indicator</Text>
                        </Card>
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel>
                    <Table className="mt-4">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>Month</TableHeaderCell>
                          <TableHeaderCell>Ranking Score</TableHeaderCell>
                          <TableHeaderCell>Citation Score</TableHeaderCell>
                          <TableHeaderCell>Competition Score</TableHeaderCell>
                          <TableHeaderCell>Total Citations</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {monthlyScores.map((item) => (
                          <TableRow key={item.month}>
                            <TableCell>{item.month}</TableCell>
                            <TableCell>
                              <Badge color="blue">{item.ranking}%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge color="emerald">{item.citations}%</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge color="amber">{item.competition}%</Badge>
                            </TableCell>
                            <TableCell>{item.totalCitations}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </Card>
          </div>

          {/* AI Engine Performance - Right side column */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>AI Engine Performance</Title>
            <div className="space-y-4 mt-4">
              {aiEngineRankings.map((engine) => (
                <div key={engine.engine} className="p-4 rounded-lg bg-gradient-to-r from-white to-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <Text className="font-medium">{engine.engine}</Text>
                    <Badge color={engine.color}>{engine.visibility}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-${engine.color}-500`}
                      style={{ width: `${engine.visibility}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Citations: {engine.mentions}</span>
                    <span>Sentiment: {engine.sentiment}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Second Row - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Query Appearances */}
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
                        <TableHeaderCell>Query</TableHeaderCell>
                        <TableHeaderCell>Category</TableHeaderCell>
                        <TableHeaderCell>Best Position</TableHeaderCell>
                        <TableHeaderCell>Citation Rate</TableHeaderCell>
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
                              <Text className="font-medium">{query.query}</Text>
                              <Text className="text-xs text-gray-500">{query.userIntent}</Text>
                            </TableCell>
                            <TableCell>
                              <Badge color="blue">{query.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge color={getPositionBadgeColor(bestPosition)}>
                                {bestPosition === '-' ? "Not Listed" : `#${bestPosition}`}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {query.platforms.map((platform, idx) => (
                                <Badge 
                                  key={platform.name}
                                  color={getPositionBadgeColor(platform.position as number | '-')}
                                  className={idx > 0 ? "ml-1" : ""}
                                >
                                  {platform.name.slice(0, 3)}: {platform.position === '-' ? '-' : `#${platform.position}`}
                                </Badge>
                              ))}
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

          {/* Citation Leaderboard */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>Industry Citation Leaderboard</Title>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Company</TableHeaderCell>
                  <TableHeaderCell>Citations</TableHeaderCell>
                  <TableHeaderCell>Trend</TableHeaderCell>
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
                      <Badge color={company.trend.startsWith('+') ? 'green' : 'red'}>
                        {company.trend}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Third Row - Regional Performance */}
        <Card className="mb-6 bg-white/50 backdrop-blur-sm">
          <Title>Regional Visibility Scores</Title>
          <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4 mt-4">
            {[
              { region: 'North America', score: 62, color: 'blue' },
              { region: 'Europe', score: 45, color: 'green' },
              { region: 'Asia Pacific', score: 28, color: 'yellow' },
              { region: 'Latin America', score: 18, color: 'red' },
            ].map((region) => (
              <Card key={region.region} decoration="top" decorationColor={region.color} className="bg-gradient-to-br from-white to-gray-50">
                <Text>{region.region}</Text>
                <Metric>{region.score}%</Metric>
              </Card>
            ))}
          </Grid>
        </Card>
      </div>
    </div>
  );
} 