'use client';

import { Card, Title, BarChart, DonutChart, AreaChart, Grid, Text, Metric, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, Legend, LineChart } from '@tremor/react';

export default function VisibilityDashboard() {
  // Enhanced mock data
  const aiEngineRankings = [
    { engine: 'Perplexity', rank: 45, change: -2, queries: 156, citations: 23 },
    { engine: 'SearchGPT', rank: 78, change: +5, queries: 89, citations: 12 },
    { engine: 'Gemini', rank: 23, change: -8, queries: 234, citations: 45 },
    { engine: 'Claude', rank: 62, change: +12, queries: 167, citations: 34 },
    { engine: 'MetaAI', rank: 34, change: -4, queries: 198, citations: 28 },
  ];

  const competitorAnalysis = [
    { company: 'Market Leader', score: 89, strength: 'Enterprise Adoption' },
    { company: 'Ariga.io', score: 48, strength: 'Developer Experience' },
    { company: 'Competitor C', score: 67, strength: 'Cloud Integration' },
    { company: 'Competitor D', score: 72, strength: 'Legacy Support' },
  ];

  const icpVisibility = [
    { segment: 'Enterprise Architects', score: 67, trend: '+5%' },
    { segment: 'DevOps Teams', score: 42, trend: '-8%' },
    { segment: 'Database Admins', score: 58, trend: '+2%' },
    { segment: 'Backend Developers', score: 71, trend: '+15%' },
  ];

  const visibilityTrend = [
    { date: '2023-09', overall: 45, enterprise: 42, startup: 48 },
    { date: '2023-10', overall: 48, enterprise: 45, startup: 51 },
    { date: '2023-11', overall: 42, enterprise: 40, startup: 44 },
    { date: '2023-12', overall: 38, enterprise: 35, startup: 41 },
    { date: '2024-01', overall: 52, enterprise: 48, startup: 56 },
    { date: '2024-02', overall: 48, enterprise: 45, startup: 51 },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ariga.io AI Visibility Dashboard</h1>
          <p className="text-gray-600 text-lg">Database Schema-as-Code Platform</p>
        </div>

        {/* Main Score Card with Trend */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <Flex>
            <div>
              <Text className="text-lg">Overall AI Visibility Score</Text>
              <Metric className="text-6xl mb-2">48.4/100</Metric>
              <Text className="text-red-500 text-lg font-medium">↓ 12% from last month</Text>
              <Text className="text-gray-600 mt-2">Based on 1,000 query analysis across major AI engines</Text>
            </div>
          </Flex>
        </Card>

        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6 mb-8">
          <Card decoration="top" decorationColor="blue">
            <Text>Query Appearances</Text>
            <Metric>234/1000</Metric>
            <Text className="text-gray-500">23.4% appearance rate</Text>
          </Card>
          <Card decoration="top" decorationColor="green">
            <Text>Average Position</Text>
            <Metric>4.8</Metric>
            <Text className="text-green-500">↑ 0.3 from last month</Text>
          </Card>
          <Card decoration="top" decorationColor="purple">
            <Text>Citation Quality</Text>
            <Metric>7.2/10</Metric>
            <Text className="text-gray-500">Based on sentiment analysis</Text>
          </Card>
          <Card decoration="top" decorationColor="orange">
            <Text>Market Position</Text>
            <Metric>4th</Metric>
            <Text className="text-gray-500">In database schema category</Text>
          </Card>
        </Grid>

        {/* AI Engine Performance */}
        <Card className="mb-8">
          <Title>AI Engine Performance</Title>
          <TabGroup>
            <TabList className="mt-8">
              <Tab>Rankings</Tab>
              <Tab>Queries</Tab>
              <Tab>Citations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <BarChart
                  data={aiEngineRankings}
                  index="engine"
                  categories={["rank"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value}th`}
                  yAxisWidth={48}
                  className="mt-8"
                />
              </TabPanel>
              <TabPanel>
                <BarChart
                  data={aiEngineRankings}
                  index="engine"
                  categories={["queries"]}
                  colors={["green"]}
                  valueFormatter={(value) => `${value}`}
                  yAxisWidth={48}
                  className="mt-8"
                />
              </TabPanel>
              <TabPanel>
                <BarChart
                  data={aiEngineRankings}
                  index="engine"
                  categories={["citations"]}
                  colors={["purple"]}
                  valueFormatter={(value) => `${value}`}
                  yAxisWidth={48}
                  className="mt-8"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>

        {/* Visibility Trends */}
        <Card className="mb-8">
          <Title>Visibility Trends by Segment</Title>
          <LineChart
            data={visibilityTrend}
            index="date"
            categories={["overall", "enterprise", "startup"]}
            colors={["blue", "amber", "green"]}
            valueFormatter={(value) => `${value}%`}
            yAxisWidth={40}
            className="mt-8"
          >
            <Legend />
          </LineChart>
        </Card>

        {/* ICP Analysis */}
        <Grid numItems={1} numItemsSm={2} className="gap-6 mb-8">
          <Card>
            <Title>ICP Visibility Scores</Title>
            <BarChart
              data={icpVisibility}
              index="segment"
              categories={["score"]}
              colors={["indigo"]}
              valueFormatter={(value) => `${value}%`}
              yAxisWidth={48}
              className="mt-8"
            />
          </Card>
          <Card>
            <Title>Competitor Analysis</Title>
            <BarChart
              data={competitorAnalysis}
              index="company"
              categories={["score"]}
              colors={["rose"]}
              valueFormatter={(value) => `${value}%`}
              yAxisWidth={48}
              className="mt-8"
            />
          </Card>
        </Grid>

        {/* Regional Performance */}
        <Card className="mb-8">
          <Title>Regional Visibility Scores</Title>
          <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4 mt-4">
            <Card decoration="left" decorationColor="green">
              <Flex>
                <div>
                  <Text>North America</Text>
                  <Metric>62%</Metric>
                  <Text className="text-green-500">↑ 4% MoM</Text>
                </div>
              </Flex>
            </Card>
            <Card decoration="left" decorationColor="yellow">
              <Flex>
                <div>
                  <Text>Europe</Text>
                  <Metric>45%</Metric>
                  <Text className="text-red-500">↓ 2% MoM</Text>
                </div>
              </Flex>
            </Card>
            <Card decoration="left" decorationColor="red">
              <Flex>
                <div>
                  <Text>Asia Pacific</Text>
                  <Metric>28%</Metric>
                  <Text className="text-red-500">↓ 5% MoM</Text>
                </div>
              </Flex>
            </Card>
            <Card decoration="left" decorationColor="purple">
              <Flex>
                <div>
                  <Text>Latin America</Text>
                  <Metric>18%</Metric>
                  <Text className="text-green-500">↑ 2% MoM</Text>
                </div>
              </Flex>
            </Card>
          </Grid>
        </Card>
      </div>
    </div>
  );
} 