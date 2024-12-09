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
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface EnhancedFunnelData extends FunnelData {
  insights: {
    dropoffReasons: string[];
    recommendations: string[];
    benchmarkComparison: number;
    sentiment: number;
  };
  subMetrics: {
    topQueries: string[];
    averageTimeSpent: number;
    conversionRate: number;
  };
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

const enhancedFunnelData: EnhancedFunnelData[] = [
  {
    stage: "Awareness",
    customers: 1000,
    dropoff: 250,
    previousStage: 1000,
    insights: {
      dropoffReasons: [
        "Limited brand recognition in AI context",
        "Competitive market noise",
        "Unclear value proposition in initial touchpoints"
      ],
      recommendations: [
        "Increase AI platform presence",
        "Enhance brand messaging clarity",
        "Expand technical content distribution"
      ],
      benchmarkComparison: 1.2, // 20% above industry average
      sentiment: 0.85
    },
    subMetrics: {
      topQueries: [
        "database schema management tools",
        "automated schema migration",
        "modern database DevOps"
      ],
      averageTimeSpent: 2.5, // minutes
      conversionRate: 0.25
    }
  },
  // ... Add similar enhanced data for other stages
];

const aiReadinessData = [
  { category: "Product Information", score: 92 },
  { category: "Pricing Details", score: 85 },
  { category: "Use Cases", score: 88 },
  { category: "Technical Specs", score: 95 },
  { category: "Customer Support", score: 78 },
];

function EnhancedFunnel({ data, selectedStage, onStageSelect }: {
  data: EnhancedFunnelData[];
  selectedStage: string | null;
  onStageSelect: (stage: string | null) => void;
}) {
  const getStageColor = useCallback((stage: EnhancedFunnelData) => {
    const retentionRate = (stage.customers - stage.dropoff) / stage.customers;
    if (retentionRate >= 0.8) return "from-emerald-500 to-emerald-600";
    if (retentionRate >= 0.6) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  }, []);

  return (
    <div className="space-y-4">
      {data.map((stage, index) => (
        <motion.div
          key={stage.stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <button
            onClick={() => onStageSelect(selectedStage === stage.stage ? null : stage.stage)}
            className="w-full focus:outline-none"
          >
            <div
              className={`h-16 bg-gradient-to-r ${getStageColor(stage)} rounded-lg relative 
                         transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              style={{
                width: `${(stage.customers / data[0].customers) * 100}%`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{stage.stage}</span>
                  {stage.insights.benchmarkComparison > 1 && (
                    <Badge color="emerald">
                      +{((stage.insights.benchmarkComparison - 1) * 100).toFixed(0)}% vs Industry
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{stage.customers} users</span>
                  <motion.div
                    animate={{ rotate: selectedStage === stage.stage ? 180 : 0 }}
                    className="w-5 h-5"
                  >
                    ↓
                  </motion.div>
                </div>
              </div>
            </div>
          </button>

          <AnimatePresence>
            {selectedStage === stage.stage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <Grid numItems={1} numItemsSm={2} className="gap-4">
                  <Card>
                    <Title>Key Insights</Title>
                    <List className="mt-2">
                      {stage.insights.dropoffReasons.map((reason, idx) => (
                        <ListItem key={idx}>
                          <Text>{reason}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                  <Card>
                    <Title>Recommendations</Title>
                    <List className="mt-2">
                      {stage.insights.recommendations.map((rec, idx) => (
                        <ListItem key={idx}>
                          <Text>{rec}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                </Grid>

                <div className="mt-4">
                  <Title>Top Queries</Title>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {stage.subMetrics.topQueries.map((query, idx) => (
                      <Badge key={idx} color="blue">
                        {query}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {index < data.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500 mt-1 flex items-center space-x-2"
            >
              <span>Dropoff: {calculateDropoffRate(data[index + 1].customers, stage.customers)}%</span>
              <div className="flex-1 h-px bg-red-200" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function BuyingJourneyDashboard() {
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<string | null>(null);

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
            <Text className="mt-2 text-gray-600">
              Click on any stage to see detailed insights and recommendations
            </Text>
            <div className="mt-4">
              <EnhancedFunnel
                data={enhancedFunnelData}
                selectedStage={selectedFunnelStage}
                onStageSelect={setSelectedFunnelStage}
              />
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