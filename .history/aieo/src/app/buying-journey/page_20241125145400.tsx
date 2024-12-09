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
  DonutChart,
  Legend,
} from "@tremor/react";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced interfaces for more detailed data
interface AIResponse {
  platform: string;
  response: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  accuracy: number;
  mentions: string[];
}

interface StageQuery {
  query: string;
  intent: string;
  responses: AIResponse[];
  impact: number;
}

// Add a new interface for query evolution
interface QueryEvolution {
  totalQueries: number;
  relevantQueries: number;
  topQueryTypes: {
    type: string;
    count: number;
    examples: string[];
  }[];
}

// Update the EnhancedFunnelStage interface
interface EnhancedFunnelStage {
  stage: string;
  customers: number;
  queryEvolution: QueryEvolution;
  queries: StageQuery[];
  aiReadiness: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  competitorAnalysis: {
    name: string;
    mentions: number;
    sentiment: number;
    strengths: string[];
  }[];
  dropoffReasons: {
    reason: string;
    impact: number;
    solution: string;
  }[];
}

// Mock data for the enhanced funnel
const enhancedFunnelData: EnhancedFunnelStage[] = [
  {
    stage: "Awareness",
    customers: 1000,
    queryEvolution: {
      totalQueries: 1000,
      relevantQueries: 450,
      topQueryTypes: [
        {
          type: "Problem Recognition",
          count: 250,
          examples: [
            "how to write code faster",
            "best practices for code efficiency",
            "reduce coding time",
            "automate coding tasks"
          ]
        },
        {
          type: "Solution Discovery",
          count: 200,
          examples: [
            "AI code assistant tools",
            "smart code completion tools",
            "AI powered IDE",
            "code automation software"
          ]
        }
      ]
    },
    queries: [
      {
        query: "What are the best tools for faster coding?",
        intent: "Problem Recognition",
        responses: [
          {
            platform: "Perplexity",
            response: "Lists various coding tools including AI assistants, mentions Cursor AI among others",
            sentiment: "neutral",
            accuracy: 85,
            mentions: ["code completion", "AI assistance", "productivity tools"]
          },
          {
            platform: "SearchGPT",
            response: "Highlights AI-powered coding tools, with Cursor AI featured prominently",
            sentiment: "positive",
            accuracy: 92,
            mentions: ["Cursor AI", "code intelligence", "AI pair programming"]
          }
        ],
        impact: 85
      }
    ],
    aiReadiness: {
      score: 75,
      strengths: ["Clear product description", "Strong technical content"],
      weaknesses: ["Limited brand recognition", "Few case studies"],
      recommendations: ["Increase content distribution", "Add more use cases"]
    },
    sentiment: {
      positive: 20,
      neutral: 70,
      negative: 10
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 15,
        sentiment: 60,
        strengths: ["Market presence", "Enterprise adoption"]
      },
      {
        name: "Flyway",
        mentions: 10,
        sentiment: 50,
        strengths: ["Simplicity", "Java ecosystem"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Lack of brand awareness",
        impact: 40,
        solution: "Increase AI platform presence"
      }
    ]
  },
  {
    stage: "Consideration",
    customers: 750,
    queryEvolution: {
      totalQueries: 750,
      relevantQueries: 380,
      topQueryTypes: [
        {
          type: "Feature Exploration",
          count: 200,
          examples: [
            "Cursor AI features",
            "AI code completion capabilities",
            "Cursor AI vs traditional IDE",
            "AI pair programming features"
          ]
        },
        {
          type: "Use Case Research",
          count: 180,
          examples: [
            "Cursor AI for Python development",
            "AI code review capabilities",
            "team collaboration with Cursor AI",
            "code refactoring with AI"
          ]
        }
      ]
    },
    queries: [
      {
        query: "How does Cursor AI compare to other AI coding assistants?",
        intent: "Comparison",
        responses: [
          {
            platform: "Perplexity",
            response: "Detailed comparison of features and capabilities",
            sentiment: "neutral",
            accuracy: 88,
            mentions: ["code intelligence", "AI accuracy", "developer experience"]
          },
          {
            platform: "SearchGPT",
            response: "Highlights Cursor AI's unique features and benefits",
            sentiment: "positive",
            accuracy: 90,
            mentions: ["superior AI model", "seamless integration", "advanced features"]
          }
        ],
        impact: 90
      }
    ],
    aiReadiness: {
      score: 65,
      strengths: ["Detailed feature comparison", "Clear differentiation"],
      weaknesses: ["Limited customer testimonials", "Few enterprise case studies"],
      recommendations: ["Add more customer success stories", "Highlight enterprise features"]
    },
    sentiment: {
      positive: 50,
      neutral: 45,
      negative: 5
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 18,
        sentiment: 65,
        strengths: ["Enterprise features", "Market maturity"]
      },
      {
        name: "Flyway",
        mentions: 12,
        sentiment: 55,
        strengths: ["Easy setup", "Java integration"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Lack of enterprise proof points",
        impact: 35,
        solution: "Develop and showcase enterprise case studies"
      }
    ]
  },
  {
    stage: "Decision",
    customers: 500,
    queryEvolution: {
      totalQueries: 500,
      relevantQueries: 280,
      topQueryTypes: [
        {
          type: "Value Assessment",
          count: 150,
          examples: [
            "Cursor AI pricing worth it",
            "ROI of AI code assistant",
            "Cursor AI team pricing",
            "cost comparison AI coding tools"
          ]
        },
        {
          type: "Implementation Research",
          count: 130,
          examples: [
            "how to set up Cursor AI",
            "Cursor AI integration guide",
            "team onboarding Cursor AI",
            "Cursor AI security features"
          ]
        }
      ]
    },
    queries: [
      {
        query: "What is the ROI of implementing Ariga.io?",
        intent: "Value Assessment",
        responses: [
          {
            platform: "Perplexity",
            response: "Provides detailed analysis of benefits and costs",
            sentiment: "positive",
            accuracy: 82,
            mentions: ["time savings", "reduced errors", "team productivity"]
          },
          {
            platform: "SearchGPT",
            response: "Highlights cost benefits and implementation ease",
            sentiment: "positive",
            accuracy: 85,
            mentions: ["quick deployment", "cost efficiency", "team adoption"]
          }
        ],
        impact: 95
      }
    ],
    aiReadiness: {
      score: 60,
      strengths: ["Clear value proposition", "Technical superiority"],
      weaknesses: ["Limited ROI data", "Few implementation guides"],
      recommendations: ["Create ROI calculator", "Add implementation tutorials"]
    },
    sentiment: {
      positive: 55,
      neutral: 35,
      negative: 10
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 14,
        sentiment: 58,
        strengths: ["Established processes", "Wide adoption"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Unclear implementation process",
        impact: 45,
        solution: "Create detailed implementation guides and support resources"
      }
    ]
  },
  {
    stage: "Purchase",
    customers: 200,
    queryEvolution: {
      totalQueries: 200,
      relevantQueries: 150,
      topQueryTypes: [
        {
          type: "Purchase Process",
          count: 80,
          examples: [
            "how to buy Cursor AI",
            "Cursor AI enterprise license",
            "Cursor AI payment methods",
            "activate Cursor AI subscription"
          ]
        },
        {
          type: "Pre-purchase Validation",
          count: 70,
          examples: [
            "Cursor AI customer reviews",
            "Cursor AI enterprise support",
            "Cursor AI service level agreement",
            "Cursor AI deployment options"
          ]
        }
      ]
    },
    queries: [
      {
        query: "How to get started with Ariga.io enterprise?",
        intent: "Purchase Process",
        responses: [
          {
            platform: "Perplexity",
            response: "Explains enterprise features and contact process",
            sentiment: "neutral",
            accuracy: 75,
            mentions: ["enterprise plan", "support options", "pricing"]
          },
          {
            platform: "SearchGPT",
            response: "Details purchase process and enterprise benefits",
            sentiment: "positive",
            accuracy: 80,
            mentions: ["quick setup", "enterprise support", "flexible pricing"]
          }
        ],
        impact: 100
      }
    ],
    aiReadiness: {
      score: 50,
      strengths: ["Clear pricing tiers", "Enterprise features"],
      weaknesses: ["Complex purchase process", "Limited self-service"],
      recommendations: ["Simplify purchase flow", "Add self-service options"]
    },
    sentiment: {
      positive: 45,
      neutral: 40,
      negative: 15
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 10,
        sentiment: 52,
        strengths: ["Established sales process", "Clear pricing"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Complex purchase process",
        impact: 50,
        solution: "Streamline enterprise purchase flow"
      }
    ]
  },
  {
    stage: "Post-Purchase",
    customers: 150,
    queryEvolution: {
      totalQueries: 150,
      relevantQueries: 120,
      topQueryTypes: [
        {
          type: "Implementation",
          count: 70,
          examples: [
            "Cursor AI best practices",
            "optimize Cursor AI settings",
            "Cursor AI advanced features",
            "team training Cursor AI"
          ]
        },
        {
          type: "Support",
          count: 50,
          examples: [
            "Cursor AI troubleshooting",
            "update Cursor AI",
            "Cursor AI custom configurations",
            "Cursor AI performance tuning"
          ]
        }
      ]
    },
    queries: [
      {
        query: "Best practices for Ariga.io implementation",
        intent: "Implementation",
        responses: [
          {
            platform: "Perplexity",
            response: "Provides implementation guidelines and tips",
            sentiment: "positive",
            accuracy: 88,
            mentions: ["best practices", "setup guide", "optimization"]
          },
          {
            platform: "SearchGPT",
            response: "Details advanced features and use cases",
            sentiment: "positive",
            accuracy: 85,
            mentions: ["advanced features", "integration", "scaling"]
          }
        ],
        impact: 90
      }
    ],
    aiReadiness: {
      score: 40,
      strengths: ["Technical documentation", "API references"],
      weaknesses: ["Limited support content", "Few troubleshooting guides"],
      recommendations: ["Expand support documentation", "Add video tutorials"]
    },
    sentiment: {
      positive: 60,
      neutral: 30,
      negative: 10
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 8,
        sentiment: 55,
        strengths: ["Extensive documentation", "Community support"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Insufficient implementation support",
        impact: 35,
        solution: "Enhance support resources and documentation"
      }
    ]
  }
];

// Component for the enhanced funnel visualization
function EnhancedFunnel({ data, selectedStage, onStageSelect }: {
  data: EnhancedFunnelStage[];
  selectedStage: string | null;
  onStageSelect: (stage: string | null) => void;
}) {
  const getStageColor = useCallback((stage: EnhancedFunnelStage) => {
    const sentiment = stage.sentiment;
    const positiveRatio = sentiment.positive / (sentiment.positive + sentiment.neutral + sentiment.negative);
    
    if (positiveRatio >= 0.6) return "from-emerald-500 to-emerald-600";
    if (positiveRatio >= 0.4) return "from-yellow-500 to-yellow-600";
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
              className={`h-20 bg-gradient-to-r ${getStageColor(stage)} rounded-lg relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              style={{
                width: `${(stage.customers / data[0].customers) * 100}%`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
                <div className="flex flex-col">
                  <span className="font-medium text-lg">{stage.stage}</span>
                  <span className="text-sm opacity-90">AI Readiness: {stage.aiReadiness.score}%</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">{stage.customers} users</div>
                    <div className="text-sm opacity-90">
                      {stage.queries.length} queries
                    </div>
                  </div>
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
                className="mt-4 space-y-4"
              >
                <Card>
                  <Title>Query Evolution</Title>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <Text className="text-sm text-gray-600">Total Queries</Text>
                        <Metric>{stage.queryEvolution.totalQueries}</Metric>
                      </div>
                      <div>
                        <Text className="text-sm text-gray-600">Relevant Queries</Text>
                        <Metric>{stage.queryEvolution.relevantQueries}</Metric>
                      </div>
                      <div>
                        <Text className="text-sm text-gray-600">Relevance Rate</Text>
                        <Metric>
                          {Math.round((stage.queryEvolution.relevantQueries / stage.queryEvolution.totalQueries) * 100)}%
                        </Metric>
                      </div>
                    </div>

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
                  </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <Title>AI Platform Responses</Title>
                    <div className="mt-4">
                      {stage.queries.map((query, idx) => (
                        <div key={idx} className="mb-4 p-4 rounded-lg bg-gray-50">
                          <Text className="font-medium">{query.query}</Text>
                          <div className="mt-2 space-y-2">
                            {query.responses.map((response, rIdx) => (
                              <div key={rIdx} className="flex justify-between items-center">
                                <Badge color={
                                  response.sentiment === 'positive' ? 'emerald' :
                                  response.sentiment === 'neutral' ? 'yellow' : 'red'
                                }>
                                  {response.platform}
                                </Badge>
                                <Text>{response.accuracy}% accurate</Text>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card>
                    <Title>Sentiment Analysis</Title>
                    <DonutChart
                      className="mt-4 h-40"
                      data={[
                        { name: 'Positive', value: stage.sentiment.positive },
                        { name: 'Neutral', value: stage.sentiment.neutral },
                        { name: 'Negative', value: stage.sentiment.negative }
                      ]}
                      category="value"
                      index="name"
                      colors={["emerald", "yellow", "red"]}
                      showAnimation={true}
                    />
                  </Card>
                </div>

                <Card>
                  <Title>AI Readiness Assessment</Title>
                  <Grid numItems={1} numItemsSm={2} className="gap-4 mt-4">
                    <div>
                      <Title>Strengths</Title>
                      <List className="mt-2">
                        {stage.aiReadiness.strengths.map((strength, idx) => (
                          <ListItem key={idx}>
                            <Text>{strength}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                    <div>
                      <Title>Recommendations</Title>
                      <List className="mt-2">
                        {stage.aiReadiness.recommendations.map((rec, idx) => (
                          <ListItem key={idx}>
                            <Text>{rec}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  </Grid>
                </Card>

                {stage.dropoffReasons.length > 0 && (
                  <Card>
                    <Title>Drop-off Analysis</Title>
                    <div className="mt-4 space-y-4">
                      {stage.dropoffReasons.map((reason, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-2">
                            <Text className="font-medium">{reason.reason}</Text>
                            <Badge color={reason.impact > 30 ? "red" : "yellow"}>
                              {reason.impact}% impact
                            </Badge>
                          </div>
                          <Text className="text-sm text-gray-600">
                            Solution: {reason.solution}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function BuyingJourneyDashboard() {
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<string | null>(null);

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

        <Card className="bg-white/50 backdrop-blur-sm mb-6">
          <Title>Customer Journey Funnel</Title>
          <Text className="mt-2 text-gray-600">
            Click on any stage to see detailed insights and AI platform analysis
          </Text>
          <div className="mt-6">
            <EnhancedFunnel
              data={enhancedFunnelData}
              selectedStage={selectedFunnelStage}
              onStageSelect={setSelectedFunnelStage}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}