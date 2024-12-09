'use client';

import { Card, Title, BarChart, DonutChart, AreaChart, Grid, Text, Metric, Flex } from '@tremor/react';

export default function VisibilityDashboard() {
  // Mock data for charts
  const aiEngineRankings = [
    { engine: 'Perplexity', rank: 45, change: -2 },
    { engine: 'SearchGPT', rank: 78, change: +5 },
    { engine: 'Gemini', rank: 23, change: -8 },
    { engine: 'Claude', rank: 62, change: +12 },
    { engine: 'MetaAI', rank: 34, change: -4 },
  ];

  const citationsByCompany = [
    { company: 'Dataedo', citations: 842 },
    { company: 'Couchbase', citations: 756 },
    { company: 'Ariga.io', citations: 234 },
    { company: 'SchemaHero', citations: 567 },
    { company: 'Prisma', citations: 912 },
  ];

  const visibilityTrend = [
    { date: '2023-09', score: 45 },
    { date: '2023-10', score: 48 },
    { date: '2023-11', score: 42 },
    { date: '2023-12', score: 38 },
    { date: '2024-01', score: 52 },
    { date: '2024-02', score: 48 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ariga.io AI Visibility Dashboard</h1>
          <p className="text-gray-500">Database Schema-as-Code Platform</p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8">
          <Flex>
            <div>
              <Text>Overall AI Visibility Score</Text>
              <Metric>48.4/100</Metric>
              <Text className="text-red-500">↓ 12% from last month</Text>
            </div>
          </Flex>
        </Card>

        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mb-8">
          <Card>
            <Title>Query Appearances</Title>
            <Metric>234/1000</Metric>
            <Text>Queries where Ariga.io appears</Text>
          </Card>
          <Card>
            <Title>Average Position</Title>
            <Metric>4.8</Metric>
            <Text>When appearing in results</Text>
          </Card>
          <Card>
            <Title>Citation Rate</Title>
            <Metric>23.4%</Metric>
            <Text>Of total industry citations</Text>
          </Card>
        </Grid>

        {/* AI Engine Rankings */}
        <Card className="mb-8">
          <Title>AI Engine Rankings</Title>
          <BarChart
            data={aiEngineRankings}
            index="engine"
            categories={["rank"]}
            colors={["blue"]}
            valueFormatter={(value) => `${value}th`}
            yAxisWidth={48}
          />
        </Card>

        {/* Industry Citations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <Title>Industry Citations Distribution</Title>
            <DonutChart
              data={citationsByCompany}
              category="citations"
              index="company"
              valueFormatter={(value) => `${value} citations`}
              colors={["slate", "violet", "indigo", "rose", "cyan"]}
            />
          </Card>
          <Card>
            <Title>Visibility Trend</Title>
            <AreaChart
              data={visibilityTrend}
              index="date"
              categories={["score"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value}%`}
              yAxisWidth={40}
            />
          </Card>
        </div>

        {/* Regional Performance */}
        <Card className="mb-8">
          <Title>Regional Visibility Scores</Title>
          <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
            <div className="p-4">
              <Text>North America</Text>
              <Metric>62%</Metric>
            </div>
            <div className="p-4">
              <Text>Europe</Text>
              <Metric>45%</Metric>
            </div>
            <div className="p-4">
              <Text>Asia Pacific</Text>
              <Metric>28%</Metric>
            </div>
            <div className="p-4">
              <Text>Latin America</Text>
              <Metric>18%</Metric>
            </div>
          </Grid>
        </Card>
      </div>
    </div>
  );
} 