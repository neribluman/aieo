'use client';

import { Card, Title, BarChart, DonutChart, AreaChart, Grid, Text, Metric, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, List, ListItem } from '@tremor/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function VisibilityDashboard() {
  // Monthly visibility scores
  const monthlyScores = [
    { month: 'Sep 2023', score: 45, queries: 156, citations: 78 },
    { month: 'Oct 2023', score: 48, queries: 189, citations: 92 },
    { month: 'Nov 2023', score: 42, queries: 145, citations: 67 },
    { month: 'Dec 2023', score: 38, queries: 134, citations: 59 },
    { month: 'Jan 2024', score: 52, queries: 223, citations: 115 },
    { month: 'Feb 2024', score: 48, queries: 198, citations: 94 },
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

  // AI Engine Rankings with more detail
  const aiEngineRankings = [
    { engine: 'Perplexity', rank: 45, change: -2, color: 'blue' },
    { engine: 'SearchGPT', rank: 78, change: +5, color: 'green' },
    { engine: 'Gemini', rank: 23, change: -8, color: 'purple' },
    { engine: 'Claude', rank: 62, change: +12, color: 'orange' },
    { engine: 'MetaAI', rank: 34, change: -4, color: 'pink' },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ariga.io AI Visibility Dashboard</h1>
          <p className="text-gray-500 text-lg">Database Schema-as-Code Platform</p>
        </div>

        {/* Monthly Score Tracker */}
        <Card className="mb-8 bg-white/50 backdrop-blur-sm shadow-glow">
          <Title>Monthly Visibility Performance</Title>
          <TabGroup>
            <TabList className="mt-4">
              <Tab>Score Trend</Tab>
              <Tab>Detailed Metrics</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AreaChart
                  className="mt-4 h-72"
                  data={monthlyScores}
                  index="month"
                  categories={["score"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value}%`}
                  yAxisWidth={40}
                  showAnimation={true}
                />
              </TabPanel>
              <TabPanel>
                <Table className="mt-4">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Month</TableHeaderCell>
                      <TableHeaderCell>Score</TableHeaderCell>
                      <TableHeaderCell>Queries</TableHeaderCell>
                      <TableHeaderCell>Citations</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthlyScores.map((item) => (
                      <TableRow key={item.month}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell>{item.score}%</TableCell>
                        <TableCell>{item.queries}</TableCell>
                        <TableCell>{item.citations}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>

        {/* Query Appearances Section */}
        <Card className="mb-8">
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
        <Card className="mb-8">
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

        {/* AI Engine Performance */}
        <Card className="mb-8">
          <Title>AI Engine Performance</Title>
          <BarChart
            className="mt-4 h-80"
            data={aiEngineRankings}
            index="engine"
            categories={["rank"]}
            colors={["blue"]}
            valueFormatter={(value) => `${value}th`}
            yAxisWidth={48}
            showAnimation={true}
          />
        </Card>

        {/* Regional Performance with enhanced visuals */}
        <Card className="mb-8">
          <Title>Regional Visibility Scores</Title>
          <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4 mt-4">
            {[
              { region: 'North America', score: 62, color: 'blue' },
              { region: 'Europe', score: 45, color: 'green' },
              { region: 'Asia Pacific', score: 28, color: 'yellow' },
              { region: 'Latin America', score: 18, color: 'red' },
            ].map((region) => (
              <Card key={region.region} decoration="top" decorationColor={region.color}>
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