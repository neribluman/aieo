'use client';

import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  AreaChart,
  BarChart,
  Color,
  Flex,
  Badge,
  Grid,
  Metric,
  List,
  ListItem,
  Legend,
} from "@tremor/react";

interface StageMetrics {
  stage: string;
  effectiveness: number;
  queries: number;
  engagement: number;
  conversion: number;
}

interface CompetitorData {
  name: string;
  awareness: number;
  consideration: number;
  decision: number;
  purchase: number;
  postPurchase: number;
}

interface FunnelData {
  stage: string;
  customers: number;
  dropoff: number;
  previousStage: number;
}

const stageMetrics: StageMetrics[] = [
  {
    stage: "Awareness",
    effectiveness: 85,
    queries: 1200,
    engagement: 72,
    conversion: 45,
  },
  {
    stage: "Consideration",
    effectiveness: 78,
    queries: 850,
    engagement: 68,
    conversion: 38,
  },
  {
    stage: "Decision",
    effectiveness: 72,
    queries: 620,
    engagement: 65,
    conversion: 42,
  },
  {
    stage: "Purchase",
    effectiveness: 68,
    queries: 450,
    engagement: 58,
    conversion: 35,
  },
  {
    stage: "Post-Purchase",
    effectiveness: 82,
    queries: 380,
    engagement: 75,
    conversion: 88,
  },
];

const competitorData: CompetitorData[] = [
  {
    name: "Ariga.io",
    awareness: 85,
    consideration: 78,
    decision: 72,
    purchase: 68,
    postPurchase: 82,
  },
  {
    name: "Competitor A",
    awareness: 78,
    consideration: 72,
    decision: 68,
    purchase: 62,
    postPurchase: 75,
  },
  {
    name: "Competitor B",
    awareness: 72,
    consideration: 68,
    decision: 65,
    purchase: 58,
    postPurchase: 70,
  },
];

const funnelData: FunnelData[] = [
  {
    stage: "Awareness",
    customers: 1000,
    dropoff: 250,
    previousStage: 1000,
  },
  {
    stage: "Consideration",
    customers: 750,
    dropoff: 200,
    previousStage: 750,
  },
  {
    stage: "Decision",
    customers: 550,
    dropoff: 150,
    previousStage: 550,
  },
  {
    stage: "Purchase",
    customers: 400,
    dropoff: 100,
    previousStage: 400,
  },
  {
    stage: "Post-Purchase",
    customers: 300,
    dropoff: 50,
    previousStage: 300,
  },
];

const aiReadinessData = [
  { category: "Product Information", score: 92 },
  { category: "Pricing Details", score: 85 },
  { category: "Use Cases", score: 88 },
  { category: "Technical Specs", score: 95 },
  { category: "Customer Support", score: 78 },
];

export default function BuyingJourneyDashboard() {
  const getColorByScore = (score: number): Color => {
    if (score >= 80) return "emerald";
    if (score >= 60) return "yellow";
    return "red";
  };

  const calculateDropoffRate = (current: number, previous: number): string => {
    const rate = ((previous - current) / previous) * 100;
    return rate.toFixed(1);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI-Driven Buying Journey Analytics
          </h1>
          <p className="text-gray-500 text-lg">
            Understanding customer progression through AI platforms
          </p>
        </div>

        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mb-6">
          {stageMetrics.map((metric) => (
            <Card
              key={metric.stage}
              decoration="top"
              decorationColor={getColorByScore(metric.effectiveness)}
              className="bg-white/50 backdrop-blur-sm"
            >
              <Flex>
                <div>
                  <Text>{metric.stage}</Text>
                  <Metric>{metric.effectiveness}%</Metric>
                </div>
                <Badge color={getColorByScore(metric.effectiveness)} size="xl">
                  {metric.queries} Queries
                </Badge>
              </Flex>
              <div className="mt-4">
                <Text>Engagement Rate: {metric.engagement}%</Text>
                <Text>Conversion Rate: {metric.conversion}%</Text>
              </div>
            </Card>
          ))}
        </Grid>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>Journey Stage Performance</Title>
            <AreaChart
              className="h-72 mt-4"
              data={stageMetrics}
              index="stage"
              categories={["effectiveness", "engagement", "conversion"]}
              colors={["blue", "emerald", "amber"]}
              valueFormatter={(value: number) => `${value}%`}
              showLegend={true}
              showGridLines={false}
            />
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>Competitor Comparison</Title>
            <BarChart
              className="h-72 mt-4"
              data={competitorData}
              index="name"
              categories={["awareness", "consideration", "decision", "purchase", "postPurchase"]}
              colors={["blue", "emerald", "violet", "amber", "rose"]}
              valueFormatter={(value: number) => `${value}%`}
              showLegend={true}
              showGridLines={false}
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>Customer Journey Funnel</Title>
            <div className="mt-4 space-y-2">
              {funnelData.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div
                    className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg relative"
                    style={{
                      width: `${(stage.customers / funnelData[0].customers) * 100}%`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                      <span className="font-medium">{stage.stage}</span>
                      <span className="font-medium">{stage.customers} users</span>
                    </div>
                  </div>
                  {index < funnelData.length - 1 && (
                    <div className="text-sm text-red-500 mt-1">
                      Dropoff: {calculateDropoffRate(funnelData[index + 1].customers, stage.customers)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm">
            <Title>AI Platform Readiness</Title>
            <div className="mt-4 space-y-4">
              {aiReadinessData.map((item) => (
                <div key={item.category}>
                  <Flex>
                    <Text>{item.category}</Text>
                    <Text>{item.score}%</Text>
                  </Flex>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 