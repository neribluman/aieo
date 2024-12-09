'use client';

import { Card, Title, BarChart, DonutChart, AreaChart, Grid, Text, Metric, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge } from '@tremor/react';

export default function VisibilityDashboard() {
  // Monthly visibility scores
  const monthlyScores = [
    { 
      month: 'Sep 2023',
      ranking: 45,
      citations: 62,
      competition: 38,
      queries: 156,
      totalCitations: 78,
    },
    { 
      month: 'Oct 2023',
      ranking: 48,
      citations: 65,
      competition: 42,
      queries: 189,
      totalCitations: 92,
    },
    { 
      month: 'Nov 2023',
      ranking: 42,
      citations: 58,
      competition: 45,
      queries: 145,
      totalCitations: 67,
    },
    { 
      month: 'Dec 2023',
      ranking: 38,
      citations: 52,
      competition: 41,
      queries: 134,
      totalCitations: 59,
    },
    { 
      month: 'Jan 2024',
      ranking: 52,
      citations: 72,
      competition: 48,
      queries: 223,
      totalCitations: 115,
    },
    { 
      month: 'Feb 2024',
      ranking: 48,
      citations: 68,
      competition: 46,
      queries: 198,
      totalCitations: 94,
    },
  ];

  // Sample queries where Ariga.io appears
  const sampleQueries = [
    { query: "database schema management tools", position: 2, cited: true },
    { query: "schema migration automation", position: 1, cited: true },
    { query: "database version control solutions", position: 3, cited: false },
    { query: "schema-as-code platforms", position: 1, cited: true },
    { query: "database schema evolution tools", position: 4, cited: true },
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
      visibility: 85,
      mentions: 234,
      sentiment: 92,
      color: 'indigo'
    },
    { 
      engine: 'SearchGPT',
      visibility: 72,
      mentions: 189,
      sentiment: 78,
      color: 'emerald'
    },
    { 
      engine: 'Gemini',
      visibility: 68,
      mentions: 156,
      sentiment: 84,
      color: 'violet'
    },
    { 
      engine: 'Claude',
      visibility: 76,
      mentions: 198,
      sentiment: 88,
      color: 'amber'
    },
    { 
      engine: 'MetaAI',
      visibility: 64,
      mentions: 145,
      sentiment: 76,
      color: 'rose'
    },
  ];

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
                <Title>Monthly Visibility Performance</Title>
                <div className="flex gap-3">
                  <Badge color="blue">Ranking Score</Badge>
                  <Badge color="emerald">Citation Score</Badge>
                  <Badge color="amber">Competition Score</Badge>
                </div>
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
                        className="h-72"
                        data={monthlyScores}
                        index="month"
                        categories={["ranking", "citations", "competition"]}
                        colors={["indigo", "emerald", "amber"]}
                        valueFormatter={(value: number) => `${value}%`}
                        yAxisWidth={48}
                        showAnimation={true}
                        showLegend={true}
                        curveType="natural"
                        showGridLines={false}
                        showXAxis={true}
                        showYAxis={true}
                        minValue={0}
                        maxValue={100}
                        className="mt-6"
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
                    <span>Mentions: {engine.mentions}</span>
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
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Query</TableHeaderCell>
                  <TableHeaderCell>Position</TableHeaderCell>
                  <TableHeaderCell>Citation Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleQueries.map((query) => (
                  <TableRow key={query.query}>
                    <TableCell>{query.query}</TableCell>
                    <TableCell>
                      <Badge color={query.position <= 2 ? "green" : "yellow"}>
                        #{query.position}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {query.cited ? (
                        <Badge color="green">Cited</Badge>
                      ) : (
                        <Badge color="red">Not Cited</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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