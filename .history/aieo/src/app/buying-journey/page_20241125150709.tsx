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
      relevantQueries: 285,
      topQueryTypes: [
        {
          type: "Problem Recognition",
          count: 185,
          examples: [
            "database schema management problems",
            "how to handle schema migrations",
            "database version control issues",
            "team database changes coordination"
          ]
        },
        {
          type: "Solution Discovery",
          count: 100,
          examples: [
            "tools for database schema management",
            "database migration automation",
            "schema version control solutions",
            "modern database DevOps tools"
          ]
        }
      ]
    },
    queries: [
      {
        query: "What are common challenges in database schema management?",
        intent: "Problem Recognition",
        responses: [
          {
            platform: "Perplexity",
            response: "Lists common challenges like version control and team coordination. Mentions traditional solutions but doesn't reference Ariga.io",
            sentiment: "neutral",
            accuracy: 82,
            mentions: ["version control", "team coordination", "schema drift"]
          },
          {
            platform: "SearchGPT",
            response: "Discusses challenges and briefly mentions Ariga.io among other solutions",
            sentiment: "neutral",
            accuracy: 78,
            mentions: ["migration tools", "Ariga.io", "database management"]
          }
        ],
        impact: 65
      }
    ],
    aiReadiness: {
      score: 58,
      strengths: ["Technical accuracy", "Problem-solution alignment"],
      weaknesses: ["Low brand visibility", "Limited use case coverage", "Few customer testimonials"],
      recommendations: [
        "Increase technical content distribution",
        "Add more real-world examples",
        "Develop comprehensive problem-solution mapping"
      ]
    },
    sentiment: {
      positive: 15,
      neutral: 80,
      negative: 5
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 42,
        sentiment: 75,
        strengths: ["Market dominance", "Enterprise adoption", "Extensive documentation"]
      },
      {
        name: "Flyway",
        mentions: 38,
        sentiment: 70,
        strengths: ["Java ecosystem integration", "Simplicity", "Community support"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Low brand recognition",
        impact: 45,
        solution: "Increase presence in technical discussions and content"
      },
      {
        reason: "Competitor dominance",
        impact: 35,
        solution: "Develop clear differentiation in AI responses"
      }
    ]
  },
  {
    stage: "Consideration",
    customers: 285,
    queryEvolution: {
      totalQueries: 425,
      relevantQueries: 180,
      topQueryTypes: [
        {
          type: "Feature Comparison",
          count: 120,
          examples: [
            "Ariga vs Liquibase features",
            "Atlas vs traditional schema tools",
            "Ariga.io enterprise capabilities",
            "Atlas migration performance"
          ]
        },
        {
          type: "Technical Validation",
          count: 60,
          examples: [
            "Ariga.io schema validation",
            "Atlas migration safety",
            "Ariga database compatibility",
            "Atlas vs Liquibase performance"
          ]
        }
      ]
    },
    queries: [
      {
        query: "How does Ariga.io compare to Liquibase?",
        intent: "Comparison",
        responses: [
          {
            platform: "Perplexity",
            response: "Balanced comparison focusing on technical aspects, noting Liquibase's maturity and Ariga's modern approach",
            sentiment: "neutral",
            accuracy: 85,
            mentions: ["modern architecture", "enterprise features", "learning curve"]
          },
          {
            platform: "SearchGPT",
            response: "Comparison favoring Liquibase's track record while acknowledging Ariga's innovations",
            sentiment: "neutral",
            accuracy: 80,
            mentions: ["market presence", "innovation", "enterprise support"]
          }
        ],
        impact: 75
      }
    ],
    aiReadiness: {
      score: 62,
      strengths: ["Technical differentiation", "Modern architecture focus"],
      weaknesses: ["Limited enterprise proof points", "Few integration examples"],
      recommendations: [
        "Add enterprise case studies",
        "Create integration guides",
        "Highlight unique value propositions"
      ]
    },
    sentiment: {
      positive: 25,
      neutral: 65,
      negative: 10
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 85,
        sentiment: 72,
        strengths: ["Enterprise track record", "Wide tool integration", "Extensive documentation"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Insufficient enterprise validation",
        impact: 40,
        solution: "Develop and promote enterprise success stories"
      }
    ]
  },
  {
    stage: "Decision",
    customers: 180,
    queryEvolution: {
      totalQueries: 320,
      relevantQueries: 145,
      topQueryTypes: [
        {
          type: "Implementation Planning",
          count: 85,
          examples: [
            "Ariga.io implementation steps",
            "Atlas migration timeline",
            "Ariga enterprise deployment",
            "Atlas team onboarding"
          ]
        },
        {
          type: "ROI Assessment",
          count: 60,
          examples: [
            "Ariga.io pricing comparison",
            "Atlas migration costs",
            "Ariga vs Liquibase TCO",
            "schema management ROI"
          ]
        }
      ]
    },
    queries: [
      {
        query: "What's the total cost of ownership for Ariga.io?",
        intent: "Value Assessment",
        responses: [
          {
            platform: "Perplexity",
            response: "Limited pricing information available, focuses on feature value",
            sentiment: "neutral",
            accuracy: 65,
            mentions: ["enterprise pricing", "custom quotes", "support tiers"]
          },
          {
            platform: "SearchGPT",
            response: "Mentions value benefits but lacks specific pricing details",
            sentiment: "neutral",
            accuracy: 70,
            mentions: ["cost savings", "team efficiency", "support options"]
          }
        ],
        impact: 85
      }
    ],
    aiReadiness: {
      score: 55,
    strengths: ["Technical documentation", "Feature clarity"],
    weaknesses: ["Pricing transparency", "ROI quantification"],
    recommendations: [
      "Improve pricing visibility",
      "Add ROI calculator",
      "Create migration cost comparisons"
    ]
  },
  sentiment: {
    positive: 30,
    neutral: 55,
    negative: 15
  },
  competitorAnalysis: [
    {
      name: "Liquibase",
      mentions: 45,
      sentiment: 68,
      strengths: ["Clear pricing", "Established processes"]
    }
  ],
  dropoffReasons: [
    {
      reason: "Pricing uncertainty",
      impact: 42,
      solution: "Improve pricing transparency and ROI documentation"
    }
  ]
},
  {
    stage: "Purchase",
    customers: 85,
    queryEvolution: {
      totalQueries: 180,
      relevantQueries: 95,
      topQueryTypes: [
        {
          type: "Purchase Process",
          count: 55,
          examples: [
            "how to buy Ariga enterprise",
            "Atlas licensing options",
            "Ariga.io payment methods",
            "enterprise quote process"
          ]
        },
        {
          type: "Pre-purchase Validation",
          count: 40,
          examples: [
            "Ariga.io customer support",
            "Atlas enterprise SLA",
            "Ariga security compliance",
            "migration support scope"
          ]
        }
      ]
    },
    queries: [
      {
        query: "How to purchase Ariga.io enterprise license?",
        intent: "Purchase",
        responses: [
          {
            platform: "Perplexity",
            response: "Basic information about contacting sales, limited self-service details",
            sentiment: "neutral",
            accuracy: 60,
            mentions: ["contact sales", "enterprise features", "custom pricing"]
          },
          {
            platform: "SearchGPT",
            response: "Points to website but lacks specific purchase process details",
            sentiment: "neutral",
            accuracy: 55,
            mentions: ["sales contact", "enterprise plans", "custom quotes"]
          }
        ],
        impact: 90
      }
    ],
    aiReadiness: {
      score: 48,
      strengths: ["Enterprise feature set", "Technical capabilities"],
      weaknesses: ["Complex purchase process", "Limited self-service options"],
      recommendations: [
        "Streamline purchase process",
        "Add self-service options",
        "Improve pricing transparency"
      ]
    },
    sentiment: {
      positive: 25,
      neutral: 55,
      negative: 20
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 25,
        sentiment: 70,
        strengths: ["Simple purchase process", "Clear pricing tiers"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Purchase process friction",
        impact: 48,
        solution: "Implement streamlined self-service purchase flow"
      }
    ]
  },
  {
    stage: "Post-Purchase",
    customers: 65,
    queryEvolution: {
      totalQueries: 155,
      relevantQueries: 85,
      topQueryTypes: [
        {
          type: "Implementation",
          count: 45,
          examples: [
            "Ariga.io setup guide",
            "Atlas migration best practices",
            "enterprise configuration steps",
            "team onboarding process"
          ]
        },
        {
          type: "Support",
          count: 40,
          examples: [
            "Ariga.io troubleshooting",
            "Atlas error resolution",
            "migration support contact",
            "schema validation issues"
          ]
        }
      ]
    },
    queries: [
      {
        query: "How to troubleshoot Ariga.io schema validation errors?",
        intent: "Support",
        responses: [
          {
            platform: "Perplexity",
            response: "Limited troubleshooting information, mostly refers to documentation",
            sentiment: "neutral",
            accuracy: 58,
            mentions: ["documentation", "support contact", "common issues"]
          },
          {
            platform: "SearchGPT",
            response: "Basic troubleshooting steps, lacks detailed solutions",
            sentiment: "neutral",
            accuracy: 62,
            mentions: ["error codes", "basic fixes", "support channels"]
          }
        ],
        impact: 85
      }
    ],
    aiReadiness: {
      score: 45,
      strengths: ["Basic documentation", "Technical accuracy"],
      weaknesses: ["Limited troubleshooting content", "Few advanced guides"],
      recommendations: [
        "Expand troubleshooting guides",
        "Add advanced use cases",
        "Create user community content"
      ]
    },
    sentiment: {
      positive: 30,
      neutral: 50,
      negative: 20
    },
    competitorAnalysis: [
      {
        name: "Liquibase",
        mentions: 20,
        sentiment: 75,
        strengths: ["Comprehensive documentation", "Active community"]
      }
    ],
    dropoffReasons: [
      {
        reason: "Implementation challenges",
        impact: 38,
        solution: "Enhance implementation support and documentation"
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