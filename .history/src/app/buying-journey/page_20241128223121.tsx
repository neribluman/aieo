import { Card, Title, Text, Badge, AreaChart, BarChart, LineChart, DonutChart } from "@tremor/react";
import { useState } from "react";

interface QueryData {
  query: string;
  impact: number;
  frequency: number;
  platforms: {
    name: string;
    response: string;
    sentiment: string;
    accuracy: number;
    mentions: string[];
  }[];
}

interface StageMetrics {
  totalQueries: number;
  avgImpact: number;
  topPlatforms: {
    name: string;
    accuracy: number;
    coverage: number;
  }[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface QueryEvolution {
  topQueryTypes: {
    type: string;
    count: number;
    examples: string[];
  }[];
  trends: {
    date: string;
    queryCount: number;
    avgImpact: number;
  }[];
}

interface EnhancedFunnelStage {
  id: string;
  name: string;
  description: string;
  metrics: StageMetrics;
  queries: QueryData[];
  queryEvolution: QueryEvolution;
  nextStages: string[];
}

// Sample data for the funnel stages
const funnelData: EnhancedFunnelStage[] = [
  {
    id: "geographic",
    name: "Geographic Regions",
    description: "Analysis of performance across global regions",
    metrics: {
      totalQueries: 1200,
      avgImpact: 85,
      topPlatforms: [
        { name: "SearchGPT", accuracy: 92, coverage: 88 },
        { name: "Perplexity", accuracy: 90, coverage: 85 },
        { name: "Gemini", accuracy: 88, coverage: 82 }
      ],
      sentiment: { positive: 65, neutral: 25, negative: 10 }
    },
    queries: [
      {
        query: "Database schema management tools in North America",
        impact: 90,
        frequency: 150,
        platforms: [
          {
            platform: "SearchGPT",
            response: "Detailed analysis with specific product mentions",
            sentiment: "positive",
            accuracy: 92,
            mentions: ["product features", "use cases", "benefits"]
          }
        ]
      }
    ],
    queryEvolution: {
      topQueryTypes: [
        {
          type: "Regional Availability",
          count: 450,
          examples: ["North America coverage", "EMEA support", "APAC presence"]
        }
      ],
      trends: [
        { date: "2024-01", queryCount: 380, avgImpact: 82 },
        { date: "2024-02", queryCount: 420, avgImpact: 85 }
      ]
    },
    nextStages: ["industry"]
  },
  {
    id: "industry",
    name: "Industry Verticals",
    description: "Breakdown by industry sectors",
    metrics: {
      totalQueries: 950,
      avgImpact: 82,
      topPlatforms: [
        { name: "SearchGPT", accuracy: 90, coverage: 85 },
        { name: "Perplexity", accuracy: 88, coverage: 82 },
        { name: "Gemini", accuracy: 86, coverage: 80 }
      ],
      sentiment: { positive: 60, neutral: 30, negative: 10 }
    },
    queries: [
      {
        query: "Schema management in financial services",
        impact: 88,
        frequency: 120,
        platforms: [
          {
            platform: "SearchGPT",
            response: "Industry-specific analysis",
            sentiment: "positive",
            accuracy: 90,
            mentions: ["compliance", "security", "scalability"]
          }
        ]
      }
    ],
    queryEvolution: {
      topQueryTypes: [
        {
          type: "Industry Requirements",
          count: 380,
          examples: ["Financial compliance", "Healthcare data", "Retail scaling"]
        }
      ],
      trends: [
        { date: "2024-01", queryCount: 320, avgImpact: 80 },
        { date: "2024-02", queryCount: 350, avgImpact: 82 }
      ]
    },
    nextStages: ["persona"]
  },
  {
    id: "persona",
    name: "Buyer Personas",
    description: "Analysis by role and responsibility",
    metrics: {
      totalQueries: 800,
      avgImpact: 78,
      topPlatforms: [
        { name: "SearchGPT", accuracy: 88, coverage: 82 },
        { name: "Perplexity", accuracy: 86, coverage: 80 },
        { name: "Gemini", accuracy: 84, coverage: 78 }
      ],
      sentiment: { positive: 55, neutral: 35, negative: 10 }
    },
    queries: [
      {
        query: "Schema management for DevOps teams",
        impact: 85,
        frequency: 100,
        platforms: [
          {
            platform: "SearchGPT",
            response: "Role-specific solutions",
            sentiment: "positive",
            accuracy: 88,
            mentions: ["automation", "CI/CD", "collaboration"]
          }
        ]
      }
    ],
    queryEvolution: {
      topQueryTypes: [
        {
          type: "Role-Specific Needs",
          count: 320,
          examples: ["DevOps workflows", "DBA requirements", "Developer tools"]
        }
      ],
      trends: [
        { date: "2024-01", queryCount: 280, avgImpact: 76 },
        { date: "2024-02", queryCount: 300, avgImpact: 78 }
      ]
    },
    nextStages: ["journey"]
  },
  {
    id: "journey",
    name: "Journey Phases",
    description: "Analysis across buying journey stages",
    metrics: {
      totalQueries: 600,
      avgImpact: 75,
      topPlatforms: [
        { name: "SearchGPT", accuracy: 86, coverage: 80 },
        { name: "Perplexity", accuracy: 84, coverage: 78 },
        { name: "Gemini", accuracy: 82, coverage: 76 }
      ],
      sentiment: { positive: 50, neutral: 40, negative: 10 }
    },
    queries: [
      {
        query: "Schema management ROI calculation",
        impact: 82,
        frequency: 80,
        platforms: [
          {
            platform: "SearchGPT",
            response: "Journey stage analysis",
            sentiment: "positive",
            accuracy: 86,
            mentions: ["evaluation", "comparison", "decision"]
          }
        ]
      }
    ],
    queryEvolution: {
      topQueryTypes: [
        {
          type: "Journey Stage Queries",
          count: 250,
          examples: ["Initial research", "Vendor comparison", "Final evaluation"]
        }
      ],
      trends: [
        { date: "2024-01", queryCount: 220, avgImpact: 73 },
        { date: "2024-02", queryCount: 240, avgImpact: 75 }
      ]
    },
    nextStages: ["query"]
  },
  {
    id: "query",
    name: "Query Details",
    description: "Detailed query analysis",
    metrics: {
      totalQueries: 400,
      avgImpact: 72,
      topPlatforms: [
        { name: "SearchGPT", accuracy: 84, coverage: 78 },
        { name: "Perplexity", accuracy: 82, coverage: 76 },
        { name: "Gemini", accuracy: 80, coverage: 74 }
      ],
      sentiment: { positive: 45, neutral: 45, negative: 10 }
    },
    queries: [
      {
        query: "Specific feature comparison",
        impact: 80,
        frequency: 60,
        platforms: [
          {
            platform: "SearchGPT",
            response: "Detailed feature analysis",
            sentiment: "positive",
            accuracy: 84,
            mentions: ["features", "benefits", "limitations"]
          }
        ]
      }
    ],
    queryEvolution: {
      topQueryTypes: [
        {
          type: "Detailed Queries",
          count: 180,
          examples: ["Feature details", "Technical specs", "Integration guides"]
        }
      ],
      trends: [
        { date: "2024-01", queryCount: 160, avgImpact: 70 },
        { date: "2024-02", queryCount: 180, avgImpact: 72 }
      ]
    },
    nextStages: []
  }
];

// Component for the enhanced funnel visualization
function EnhancedFunnel({ data, selectedStage, onStageSelect }: {
  data: EnhancedFunnelStage[];
  selectedStage: string | null;
  onStageSelect: (stage: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      {data.map((stage, index) => (
        <div key={stage.id} className={`relative ${
          selectedStage && selectedStage !== stage.id ? 'opacity-50' : ''
        }`}>
          <Card 
            className="cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => onStageSelect(stage.id === selectedStage ? null : stage.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <Title>{stage.name}</Title>
                <Text className="text-gray-500">{stage.description}</Text>
              </div>
              <div className="flex gap-2">
                <Badge color="blue">
                  {stage.metrics.totalQueries} Queries
                </Badge>
                <Badge color="green">
                  {stage.metrics.avgImpact}% Impact
                </Badge>
              </div>
            </div>

            {selectedStage === stage.id && (
              <div className="mt-6 space-y-6">
                {/* Stage Metrics */}
                <Card>
                  <Title>Stage Metrics</Title>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Text className="font-medium">Platform Performance</Text>
                      <BarChart
                        className="mt-2"
                        data={stage.metrics.topPlatforms}
                        index="name"
                        categories={["accuracy", "coverage"]}
                        colors={["blue", "green"]}
                      />
                    </div>
                    <div>
                      <Text className="font-medium">Sentiment Analysis</Text>
                      <DonutChart
                        className="mt-2"
                        data={[
                          { name: "Positive", value: stage.metrics.sentiment.positive },
                          { name: "Neutral", value: stage.metrics.sentiment.neutral },
                          { name: "Negative", value: stage.metrics.sentiment.negative }
                        ]}
                        category="value"
                        index="name"
                        colors={["emerald", "blue", "rose"]}
                      />
                    </div>
                    <div>
                      <Text className="font-medium">Query Trends</Text>
                      <LineChart
                        className="mt-2"
                        data={stage.queryEvolution.trends}
                        index="date"
                        categories={["queryCount", "avgImpact"]}
                        colors={["blue", "green"]}
                      />
                    </div>
                  </div>
                </Card>

                {/* Query Evolution */}
                <Card>
                  <Title>Query Evolution</Title>
                  <div className="space-y-6">
                    {stage.queryEvolution.topQueryTypes.map((type, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <Text className="font-medium">{type.type}</Text>
                          <Badge color="blue">{type.count} queries</Badge>
                        </div>
                        <div className="mt-2">
                          <Text className="text-sm text-gray-600 mb-2">Example Queries:</Text>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example, eIdx) => (
                              <Badge key={eIdx} color="gray">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* AI Platform Responses */}
                <Card>
                  <Title>AI Platform Responses</Title>
                  <div className="mt-4">
                    {stage.queries.map((query, idx) => (
                      <div key={idx} className="mb-6 p-4 rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <Text className="font-medium">{query.query}</Text>
                          <Badge color="blue">Impact: {query.impact}%</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {query.platforms.map((platform, pIdx) => (
                            <Card key={pIdx} className="bg-white">
                              <div className="flex justify-between items-center mb-2">
                                <Text className="font-medium">{platform.platform}</Text>
                                <Badge color={
                                  platform.sentiment === "positive" ? "green" :
                                  platform.sentiment === "neutral" ? "blue" : "red"
                                }>
                                  {platform.accuracy}% Accuracy
                                </Badge>
                              </div>
                              <Text className="text-sm text-gray-600 mb-2">{platform.response}</Text>
                              <div className="flex flex-wrap gap-1">
                                {platform.mentions.map((mention, mIdx) => (
                                  <Badge key={mIdx} color="gray" size="sm">
                                    {mention}
                                  </Badge>
                                ))}
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </Card>
          
          {index < data.length - 1 && (
            <div className="h-8 w-1 bg-blue-200 mx-auto my-2" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BuyingJourneyPage() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Buying Journey Analysis</h1>
          <p className="text-gray-500">Hierarchical analysis of customer buying journey through AI visibility data</p>
        </div>

        <EnhancedFunnel
          data={funnelData}
          selectedStage={selectedStage}
          onStageSelect={setSelectedStage}
        />
      </div>
    </div>
  );
} 