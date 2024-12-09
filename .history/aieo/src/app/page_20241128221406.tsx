'use client';

import { Card, Title, LineChart, Grid, Text, Metric, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, Badge } from '@tremor/react';
import WorldMap from "react-svg-worldmap";
import { CountryContext } from "react-svg-worldmap";
import { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"

// First, let's define a type for the position
type Position = number | '-';

interface RegionalData {
  region: string;
  score: number;
  color: string;
  topQueries: string[];
  growth: string;
  marketPenetration: string;
}

interface ICPData {
  profile: string;
  visibilityProbability: number;
  recommendationProbability: number;
  avgRanking: number;
  citationAppearances: number;
  overallScore: number;
  color: string;
}

interface MapData {
  country: string;
  value: number;
}

interface PlatformRanking {
  name: string;
  position: Position;
  cited: boolean;
}

interface QueryPerformance {
  id: string;
  query: string;
  category: string;
  impact: "High" | "Medium" | "Low";
  userIntent: string;
  platforms: PlatformRanking[];
  averagePosition: number;
}

interface DetailedRanking {
  position: number;
  company: string;
}

// First, update the interface for citation data
interface CompetitorData {
  company: string;
  visibilityProbability: number;
  recommendationProbability: number;
  avgRanking: number;
  citationAppearances: number;
  overallScore: number;
  trend: string;
  demographics: {
    topICPs: Array<{ name: string; score: number }>;
    topVerticals: Array<{ name: string; score: number }>;
    topRegions: Array<{ name: string; score: number }>;
  };
  topSources: Array<{
    name: string;
    type: 'Documentation' | 'Blog' | 'Forum' | 'Social' | 'News';
    relevance: number;
  }>;
}

// Update the Citation interface to include more detailed metrics
interface Citation {
  id: string;
  title: string;
  url: string;
  source: {
    type: 'Documentation' | 'Blog' | 'GitHub' | 'Guide' | 'Tutorial';
    lastUpdated: string;
    section?: string; // e.g., "Schema Migration", "CLI Usage"
  };
  metrics: {
    totalQueryReferences: number; // out of 1000 queries
    queryBreakdown: {
      awareness: number;
      consideration: number;
      decision: number;
    };
    engineReferences: {
      platform: string;
      references: number; // how many times this engine referenced this article
      percentage: number; // % of total references
    }[];
  };
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  competitorMentions: {
    company: string;
    coMentionCount: number; // how many times mentioned together
    context: 'Alternative' | 'Comparison' | 'Integration' | 'Migration';
    sentiment: 'Positive' | 'Neutral' | 'Negative';
  }[];
  attention: {
    type: 'Opportunity' | 'Risk' | 'Monitor';
    message: string;
  } | null;
  quote: string;
}

// First, update the interface (add this if it doesn't exist):
interface AIEngine {
  engine: string;
  visibility: number;
  percentageRanked: number;
  recommendationProbability: number;
  avgRankingPosition: number;
  citationAppearance: number;
  avgCitationPosition: number;
  color: string;
}

// Add this type definition for the time series data
interface AIEngineTimeSeriesData {
  date: string;
  engine: string;
  avgSentiment: number;
  avgPosition: number;
  visibilityRate: number;
  recommendationProb: number;
}

// Add these new interfaces near the top with other interfaces
interface GeoRegion {
  id: string;
  name: string;
  score: number;
  trend: string;
  verticals: Vertical[];
}

interface Vertical {
  id: string;
  name: string;
  score: number;
  trend: string;
  personas: Persona[];
}

interface Persona {
  id: string;
  title: string;
  score: number;
  trend: string;
  journeyPhases: JourneyPhase[];
}

interface JourneyPhase {
  id: string;
  name: string;
  score: number;
  trend: string;
  queries: EnhancedQuery[];
}

interface EnhancedQuery extends QueryPerformance {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  recommendationProbability: number;
  sources: Array<{
    url: string;
    title: string;
    type: 'Documentation' | 'Blog' | 'Forum' | 'News';
  }>;
  citations: Array<{
    url: string;
    title: string;
    context: string;
  }>;
}

// Add this sample data after other const declarations
const buyingJourneyData: GeoRegion[] = [
  {
    id: 'americas',
    name: 'Americas',
    score: 78,
    trend: '+12%',
    verticals: [
      {
        id: 'saas',
        name: 'SaaS',
        score: 82,
        trend: '+15%',
        personas: [
          {
            id: 'devops-lead',
            title: 'DevOps Lead',
            score: 85,
            trend: '+18%',
            journeyPhases: [
              {
                id: 'problem-exploration',
                name: 'Problem Exploration',
                score: 88,
                trend: '+20%',
                queries: [
                  {
                    id: 'query-1',
                    query: 'What are the main challenges in database schema management?',
                    category: 'Problem Recognition',
                    impact: 'High',
                    userIntent: 'Research',
                    platforms: [
                      { name: 'Perplexity', position: 2, cited: true },
                      { name: 'Claude', position: 3, cited: true },
                      { name: 'Gemini', position: 4, cited: false }
                    ],
                    averagePosition: 3,
                    sentiment: 'Positive',
                    recommendationProbability: 75,
                    sources: [
                      {
                        url: 'https://docs.ariga.io/challenges',
                        title: 'Common Database Schema Challenges',
                        type: 'Documentation'
                      }
                    ],
                    citations: [
                      {
                        url: 'https://blog.ariga.io/schema-management',
                        title: 'Modern Schema Management',
                        context: 'Direct reference to solution approach'
                      }
                    ]
                  }
                  // Add more queries...
                ]
              }
              // Add more journey phases...
            ]
          }
          // Add more personas...
        ]
      }
      // Add more verticals...
    ]
  }
  // Add more regions...
];

// Add this new component after the existing imports
const FunnelLevel: React.FC<{
  title: string;
  items: Array<any>;
  onSelect: (item: any) => void;
  selectedId?: string;
}> = ({ title, items, onSelect, selectedId }) => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm mb-4">
      <Title className="mb-4">{title}</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`cursor-pointer transition-all duration-200 ${
              selectedId === item.id ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <Card 
              decoration="top" 
              decorationColor={selectedId === item.id ? "blue" : "gray"}
              className="bg-white"
            >
              <Flex>
                <div>
                  <Text className="font-medium">{item.name || item.title}</Text>
                  <Metric className="mt-1">{item.score}%</Metric>
                </div>
                <Badge color={item.trend.startsWith('+') ? 'green' : 'red'}>
                  {item.trend}
                </Badge>
              </Flex>
            </Card>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default function VisibilityDashboard() {
  // Monthly visibility scores
  const monthlyScores = [
    { 
      month: 'May 2024',
      percentageRanked: 25,
      avgRankingPosition: 4.2,
      citationAppearance: 15,
      avgCitationPosition: 8.5,
    },
    { 
      month: 'Jun 2024',
      percentageRanked: 28,
      avgRankingPosition: 3.8,
      citationAppearance: 18,
      avgCitationPosition: 7.8,
    },
    { 
      month: 'Jul 2024',
      percentageRanked: 32,
      avgRankingPosition: 3.5,
      citationAppearance: 22,
      avgCitationPosition: 6.5,
    },
    { 
      month: 'Aug 2024',
      percentageRanked: 35,
      avgRankingPosition: 3.2,
      citationAppearance: 28,
      avgCitationPosition: 5.2,
    },
    { 
      month: 'Sep 2024',
      percentageRanked: 42,
      avgRankingPosition: 2.8,
      citationAppearance: 35,
      avgCitationPosition: 4.5,
    },
    { 
      month: 'Oct 2024',
      percentageRanked: 45,
      avgRankingPosition: 2.5,
      citationAppearance: 38,
      avgCitationPosition: 3.8,
    },
  ];

  // Sample queries where Ariga.io appears
  const sampleQueries = [
    {
      category: "Problem Recognition",
      query: "What challenges do teams face with manual database schema changes?",
      platforms: [
        { name: "Perplexity", position: 2 as Position, cited: true },
        { name: "Claude", position: 4 as Position, cited: true },
        { name: "Gemini", position: '-' as Position, cited: false }
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
  const competitorData: CompetitorData[] = [
    {
      company: 'Redgate',
      visibilityProbability: 38,
      recommendationProbability: 42,
      avgRanking: 2.3,
      citationAppearances: 25,
      overallScore: 88,
      trend: '+15%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 85 },
          { name: 'Financial Services', score: 78 },
          { name: 'Healthcare', score: 72 }
        ],
        topVerticals: [
          { name: 'Banking', score: 82 },
          { name: 'Insurance', score: 76 },
          { name: 'Healthcare', score: 70 }
        ],
        topRegions: [
          { name: 'North America', score: 88 },
          { name: 'Europe', score: 82 },
          { name: 'Asia Pacific', score: 65 }
        ]
      },
      topSources: [
        { name: 'SQL Server Central', type: 'Documentation', relevance: 92 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 88 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 85 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 82 },
        { name: 'Tech Target', type: 'News', relevance: 78 }
      ]
    },
    {
      company: 'Hasura',
      visibilityProbability: 35,
      recommendationProbability: 40,
      avgRanking: 2.4,
      citationAppearances: 22,
      overallScore: 85,
      trend: '+28%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 82 },
          { name: 'Financial Services', score: 76 },
          { name: 'Healthcare', score: 70 }
        ],
        topVerticals: [
          { name: 'Banking', score: 80 },
          { name: 'Insurance', score: 74 },
          { name: 'Healthcare', score: 68 }
        ],
        topRegions: [
          { name: 'North America', score: 85 },
          { name: 'Europe', score: 80 },
          { name: 'Asia Pacific', score: 62 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 90 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 86 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 83 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 80 },
        { name: 'Tech Target', type: 'News', relevance: 76 }
      ]
    },
    {
      company: 'PlanetScale',
      visibilityProbability: 34,
      recommendationProbability: 38,
      avgRanking: 2.6,
      citationAppearances: 20,
      overallScore: 83,
      trend: '+22%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 80 },
          { name: 'Financial Services', score: 74 },
          { name: 'Healthcare', score: 68 }
        ],
        topVerticals: [
          { name: 'Banking', score: 78 },
          { name: 'Insurance', score: 72 },
          { name: 'Healthcare', score: 66 }
        ],
        topRegions: [
          { name: 'North America', score: 83 },
          { name: 'Europe', score: 78 },
          { name: 'Asia Pacific', score: 60 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 88 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 84 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 81 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 78 },
        { name: 'Tech Target', type: 'News', relevance: 74 }
      ]
    },
    {
      company: 'Ariga.io',
      visibilityProbability: 32,
      recommendationProbability: 35,
      avgRanking: 2.8,
      citationAppearances: 18,
      overallScore: 80,
      trend: '-8%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 78 },
          { name: 'Financial Services', score: 72 },
          { name: 'Healthcare', score: 66 }
        ],
        topVerticals: [
          { name: 'Banking', score: 76 },
          { name: 'Insurance', score: 70 },
          { name: 'Healthcare', score: 64 }
        ],
        topRegions: [
          { name: 'North America', score: 80 },
          { name: 'Europe', score: 76 },
          { name: 'Asia Pacific', score: 62 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 86 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 82 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 79 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 76 },
        { name: 'Tech Target', type: 'News', relevance: 72 }
      ]
    },
    {
      company: 'Atlas',
      visibilityProbability: 30,
      recommendationProbability: 32,
      avgRanking: 3.0,
      citationAppearances: 15,
      overallScore: 78,
      trend: '+18%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 76 },
          { name: 'Financial Services', score: 70 },
          { name: 'Healthcare', score: 64 }
        ],
        topVerticals: [
          { name: 'Banking', score: 74 },
          { name: 'Insurance', score: 68 },
          { name: 'Healthcare', score: 62 }
        ],
        topRegions: [
          { name: 'North America', score: 78 },
          { name: 'Europe', score: 74 },
          { name: 'Asia Pacific', score: 58 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 84 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 80 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 77 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 74 },
        { name: 'Tech Target', type: 'News', relevance: 70 }
      ]
    },
    {
      company: 'Alembic',
      visibilityProbability: 28,
      recommendationProbability: 30,
      avgRanking: 3.2,
      citationAppearances: 12,
      overallScore: 75,
      trend: '-5%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 72 },
          { name: 'Financial Services', score: 66 },
          { name: 'Healthcare', score: 60 }
        ],
        topVerticals: [
          { name: 'Banking', score: 70 },
          { name: 'Insurance', score: 64 },
          { name: 'Healthcare', score: 58 }
        ],
        topRegions: [
          { name: 'North America', score: 75 },
          { name: 'Europe', score: 70 },
          { name: 'Asia Pacific', score: 56 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 82 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 78 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 75 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 72 },
        { name: 'Tech Target', type: 'News', relevance: 68 }
      ]
    },
    {
      company: 'TypeORM',
      visibilityProbability: 25,
      recommendationProbability: 28,
      avgRanking: 3.4,
      citationAppearances: 10,
      overallScore: 72,
      trend: '+10%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 68 },
          { name: 'Financial Services', score: 62 },
          { name: 'Healthcare', score: 56 }
        ],
        topVerticals: [
          { name: 'Banking', score: 66 },
          { name: 'Insurance', score: 60 },
          { name: 'Healthcare', score: 54 }
        ],
        topRegions: [
          { name: 'North America', score: 72 },
          { name: 'Europe', score: 68 },
          { name: 'Asia Pacific', score: 52 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 78 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 74 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 71 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 68 },
        { name: 'Tech Target', type: 'News', relevance: 64 }
      ]
    },
    {
      company: 'DBmaestro',
      visibilityProbability: 22,
      recommendationProbability: 25,
      avgRanking: 3.6,
      citationAppearances: 8,
      overallScore: 70,
      trend: '-3%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 64 },
          { name: 'Financial Services', score: 58 },
          { name: 'Healthcare', score: 52 }
        ],
        topVerticals: [
          { name: 'Banking', score: 62 },
          { name: 'Insurance', score: 56 },
          { name: 'Healthcare', score: 50 }
        ],
        topRegions: [
          { name: 'North America', score: 70 },
          { name: 'Europe', score: 66 },
          { name: 'Asia Pacific', score: 48 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 74 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 70 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 67 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 64 },
        { name: 'Tech Target', type: 'News', relevance: 60 }
      ]
    },
    {
      company: 'SchemaHero',
      visibilityProbability: 20,
      recommendationProbability: 22,
      avgRanking: 3.8,
      citationAppearances: 6,
      overallScore: 68,
      trend: '+25%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 60 },
          { name: 'Financial Services', score: 54 },
          { name: 'Healthcare', score: 48 }
        ],
        topVerticals: [
          { name: 'Banking', score: 58 },
          { name: 'Insurance', score: 52 },
          { name: 'Healthcare', score: 46 }
        ],
        topRegions: [
          { name: 'North America', score: 68 },
          { name: 'Europe', score: 64 },
          { name: 'Asia Pacific', score: 44 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 70 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 66 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 63 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 60 },
        { name: 'Tech Target', type: 'News', relevance: 56 }
      ]
    },
    {
      company: 'Sequelize',
      visibilityProbability: 18,
      recommendationProbability: 20,
      avgRanking: 4.0,
      citationAppearances: 5,
      overallScore: 65,
      trend: '+8%',
      demographics: {
        topICPs: [
          { name: 'Enterprise DevOps', score: 56 },
          { name: 'Financial Services', score: 50 },
          { name: 'Healthcare', score: 44 }
        ],
        topVerticals: [
          { name: 'Banking', score: 54 },
          { name: 'Insurance', score: 48 },
          { name: 'Healthcare', score: 42 }
        ],
        topRegions: [
          { name: 'North America', score: 65 },
          { name: 'Europe', score: 62 },
          { name: 'Asia Pacific', score: 40 }
        ]
      },
      topSources: [
        { name: 'DB Server Central', type: 'Documentation', relevance: 66 },
        { name: 'DBA StackExchange', type: 'Forum', relevance: 62 },
        { name: 'DevOps Blog', type: 'Blog', relevance: 59 },
        { name: 'GitHub Discussions', type: 'Forum', relevance: 56 },
        { name: 'Tech Target', type: 'News', relevance: 52 }
      ]
    }
  ];

  // Enhanced AI Engine Rankings
  const aiEngineRankings: AIEngine[] = [
    { 
      engine: 'Perplexity',
      visibility: 45,
      percentageRanked: 45,
      recommendationProbability: 42,
      avgRankingPosition: 2.5,
      citationAppearance: 38,
      avgCitationPosition: 3.8,
      color: 'indigo'
    },
    { 
      engine: 'SearchGPT',
      visibility: 32,
      percentageRanked: 35,
      recommendationProbability: 38,
      avgRankingPosition: 3.2,
      citationAppearance: 28,
      avgCitationPosition: 5.2,
      color: 'emerald'
    },
    { 
      engine: 'Gemini',
      visibility: 38,
      percentageRanked: 42,
      recommendationProbability: 40,
      avgRankingPosition: 2.8,
      citationAppearance: 35,
      avgCitationPosition: 4.5,
      color: 'violet'
    },
    { 
      engine: 'Claude',
      visibility: 36,
      percentageRanked: 38,
      recommendationProbability: 35,
      avgRankingPosition: 3.0,
      citationAppearance: 32,
      avgCitationPosition: 4.8,
      color: 'amber'
    },
    { 
      engine: 'AIO',
      visibility: 24,
      percentageRanked: 25,
      recommendationProbability: 28,
      avgRankingPosition: 4.2,
      citationAppearance: 15,
      avgCitationPosition: 8.5,
      color: 'rose'
    },
  ];

  const regionalData: RegionalData[] = [
    {
      region: 'North America',
      score: 62,
      color: 'blue',
      topQueries: ['schema migration tools', 'database version control', 'CI/CD database integration'],
      growth: '+18%',
      marketPenetration: '34%'
    },
    {
      region: 'Europe',
      score: 45,
      color: 'emerald',
      topQueries: ['GDPR compliant schema management', 'enterprise database tools', 'multi-region database control'],
      growth: '+22%',
      marketPenetration: '28%'
    },
    {
      region: 'Asia Pacific',
      score: 28,
      color: 'amber',
      topQueries: ['cloud database management', 'schema automation tools', 'database DevOps'],
      growth: '+45%',
      marketPenetration: '15%'
    },
    {
      region: 'Latin America',
      score: 18,
      color: 'rose',
      topQueries: ['database migration solutions', 'schema version control', 'automated database updates'],
      growth: '+38%',
      marketPenetration: '12%'
    },
  ];

  const icpData: ICPData[] = [
    {
      profile: 'Enterprise DevOps Teams',
      visibilityProbability: 38,
      recommendationProbability: 42,
      avgRanking: 2.4,
      citationAppearances: 25,
      overallScore: 85,
      color: 'blue'
    },
    {
      profile: 'Cloud-Native Startups',
      visibilityProbability: 42,
      recommendationProbability: 48,
      avgRanking: 1.8,
      citationAppearances: 32,
      overallScore: 90,
      color: 'emerald'
    },
    {
      profile: 'Financial Services',
      visibilityProbability: 35,
      recommendationProbability: 40,
      avgRanking: 3.2,
      citationAppearances: 18,
      overallScore: 68,
      color: 'violet'
    },
    {
      profile: 'SaaS Providers',
      visibilityProbability: 45,
      recommendationProbability: 35,
      avgRanking: 2.6,
      citationAppearances: 28,
      overallScore: 78,
      color: 'amber'
    },
    {
      profile: 'Mid-Market Companies',
      visibilityProbability: 32,
      recommendationProbability: 38,
      avgRanking: 2.8,
      citationAppearances: 22,
      overallScore: 72,
      color: 'rose'
    },
    {
      profile: 'E-commerce Platforms',
      visibilityProbability: 40,
      recommendationProbability: 45,
      avgRanking: 2.2,
      citationAppearances: 30,
      overallScore: 82,
      color: 'indigo'
    },
    {
      profile: 'Healthcare Tech',
      visibilityProbability: 28,
      recommendationProbability: 32,
      avgRanking: 3.4,
      citationAppearances: 20,
      overallScore: 65,
      color: 'cyan'
    },
    {
      profile: 'Government & Public Sector',
      visibilityProbability: 25,
      recommendationProbability: 30,
      avgRanking: 3.8,
      citationAppearances: 15,
      overallScore: 60,
      color: 'slate'
    },
    {
      profile: 'Educational Institutions',
      visibilityProbability: 35,
      recommendationProbability: 40,
      avgRanking: 2.9,
      citationAppearances: 25,
      overallScore: 75,
      color: 'purple'
    }
  ];

  const visibilityMapData: MapData[] = [
    { country: "us", value: 62 },
    { country: "ca", value: 58 },
    { country: "mx", value: 15 },

    { country: "gb", value: 45 },
    { country: "de", value: 42 },
    { country: "fr", value: 40 },
    { country: "nl", value: 38 },
    { country: "se", value: 35 },
    { country: "es", value: 32 },
    { country: "it", value: 30 },
    { country: "ch", value: 36 },
    { country: "no", value: 33 },

    { country: "jp", value: 28 },
    { country: "au", value: 25 },
    { country: "sg", value: 22 },
    { country: "kr", value: 20 },
    { country: "in", value: 18 },
    { country: "cn", value: 15 },
    { country: "nz", value: 24 },

    { country: "br", value: 18 },
    { country: "mx", value: 15 },
    { country: "ar", value: 12 },
    { country: "cl", value: 14 },
    { country: "co", value: 10 },

    { country: "il", value: 30 },
    { country: "ae", value: 25 },
    { country: "sa", value: 20 },

    { country: "za", value: 15 },
    { country: "ng", value: 8 },
    { country: "eg", value: 12 }
  ];

  const platforms = ['Perplexity', 'Claude', 'Gemini', 'SearchGPT', 'AIO'] as const;

  const [queries, setQueries] = useState<QueryPerformance[]>(() => 
    Array.from({ length: 500 }, (_, i) => ({
      id: `query-${i}`,
      query: sampleQueries[i % sampleQueries.length].query,
      category: sampleQueries[i % sampleQueries.length].category,
      impact: sampleQueries[i % sampleQueries.length].impact as "High" | "Medium" | "Low",
      userIntent: sampleQueries[i % sampleQueries.length].userIntent,
      platforms: sampleQueries[i % sampleQueries.length].platforms.map(p => ({
        name: p.name,
        position: p.position,
        cited: p.cited
      })) as PlatformRanking[],
      averagePosition: Number((Math.random() * 10 + 1).toFixed(1))
    }))
  );

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: queries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });

  const getPositionBadgeColor = (position: Position): string => {
    if (position === '-') return "red";
    if (position <= 2) return "green";
    if (position <= 4) return "yellow";
    return "orange";
  };

  const getDetailedRankings = (position: Position): DetailedRanking[] => {
    if (position === '-') return [];
    
    // Fixed company rankings to ensure consistency
    const rankingMap: { [key: number]: string[] } = {
      1: ['Ariga.io', 'Redgate', 'Hasura', 'PlanetScale', 'Atlas'],
      2: ['Redgate', 'Ariga.io', 'PlanetScale', 'Hasura', 'Atlas'],
      3: ['Hasura', 'PlanetScale', 'Ariga.io', 'Atlas', 'Redgate'],
      4: ['PlanetScale', 'Atlas', 'Hasura', 'Ariga.io', 'Redgate'],
      5: ['Atlas', 'Hasura', 'PlanetScale', 'Redgate', 'Ariga.io'],
      6: ['TypeORM', 'Alembic', 'Atlas', 'Hasura', 'Ariga.io'],
      7: ['Alembic', 'DBmaestro', 'TypeORM', 'Atlas', 'Hasura'],
      8: ['SchemaHero', 'TypeORM', 'Alembic', 'DBmaestro', 'Atlas'],
      9: ['Sequelize', 'SchemaHero', 'TypeORM', 'Alembic', 'DBmaestro'],
      10: ['DBmaestro', 'Sequelize', 'SchemaHero', 'TypeORM', 'Alembic']
    };

    const numPosition = Number(position);
    const rankings: DetailedRanking[] = [];
    
    // Get 5 positions centered around the current position
    for (let i = Math.max(1, numPosition - 2); i <= Math.min(10, numPosition + 2); i++) {
      const companies = rankingMap[i] || rankingMap[1]; // Fallback to first ranking if position not found
      rankings.push({
        position: i,
        company: companies[0] // Always use the first company in the list for that position
      });
    }

    return rankings;
  };

  const getCompetitorsForICP = (profile: string): { name: string; trend: 'up' | 'down' | 'same' }[] => {
    const competitorsByProfile: { [key: string]: { name: string; trend: 'up' | 'down' | 'same' }[] } = {
      'Enterprise DevOps Teams': [
        { name: 'Redgate', trend: 'same' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'PlanetScale', trend: 'down' },
        { name: 'Hasura', trend: 'up' },
        { name: 'Atlas', trend: 'down' }
      ],
      'Cloud-Native Startups': [
        { name: 'Ariga.io', trend: 'up' },
        { name: 'PlanetScale', trend: 'same' },
        { name: 'Hasura', trend: 'down' },
        { name: 'Atlas', trend: 'up' },
        { name: 'Redgate', trend: 'down' }
      ],
      'Financial Services': [
        { name: 'Redgate', trend: 'same' },
        { name: 'Atlas', trend: 'up' },
        { name: 'PlanetScale', trend: 'down' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'Hasura', trend: 'down' }
      ],
      'SaaS Providers': [
        { name: 'PlanetScale', trend: 'up' },
        { name: 'Hasura', trend: 'up' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'Atlas', trend: 'same' },
        { name: 'Redgate', trend: 'down' }
      ],
      'Mid-Market Companies': [
        { name: 'PlanetScale', trend: 'up' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'Redgate', trend: 'down' },
        { name: 'Atlas', trend: 'same' },
        { name: 'Hasura', trend: 'down' }
      ],
      'E-commerce Platforms': [
        { name: 'Hasura', trend: 'up' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'PlanetScale', trend: 'down' },
        { name: 'Atlas', trend: 'same' },
        { name: 'Redgate', trend: 'down' }
      ],
      'Healthcare Tech': [
        { name: 'Redgate', trend: 'same' },
        { name: 'Atlas', trend: 'up' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'PlanetScale', trend: 'down' },
        { name: 'Hasura', trend: 'down' }
      ],
      'Government & Public Sector': [
        { name: 'Atlas', trend: 'up' },
        { name: 'Redgate', trend: 'same' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'Hasura', trend: 'down' },
        { name: 'PlanetScale', trend: 'down' }
      ],
      'Educational Institutions': [
        { name: 'PlanetScale', trend: 'up' },
        { name: 'Ariga.io', trend: 'up' },
        { name: 'Atlas', trend: 'down' },
        { name: 'Hasura', trend: 'same' },
        { name: 'Redgate', trend: 'down' }
      ]
    };

    return competitorsByProfile[profile] || [];
  };

  const topCitations: Citation[] = [
    {
      id: '1',
      title: 'Schema Migration Best Practices Guide',
      url: 'https://ariga.io/docs/guides/schema-migrations',
      source: {
        type: 'Documentation',
        lastUpdated: '2024-01-20',
        section: 'Schema Migration'
      },
      metrics: {
        totalQueryReferences: 142, // out of 1000 queries
        queryBreakdown: {
          awareness: 45,    // queries about understanding schema migration
          consideration: 68, // queries comparing solutions
          decision: 29      // queries about implementation
        },
        engineReferences: [
          { platform: 'Claude', references: 58, percentage: 41 },
          { platform: 'Perplexity', references: 42, percentage: 30 },
          { platform: 'Gemini', references: 28, percentage: 20 },
          { platform: 'SearchGPT', references: 14, percentage: 9 }
        ]
      },
      sentiment: 'Positive',
      competitorMentions: [
        {
          company: 'Redgate',
          coMentionCount: 12,
          context: 'Comparison',
          sentiment: 'Neutral'
        },
        {
          company: 'Liquibase',
          coMentionCount: 8,
          context: 'Alternative',
          sentiment: 'Neutral'
        }
      ],
      attention: {
        type: 'Opportunity',
        message: 'High citation rate in enterprise context - expand enterprise-focused content'
      },
      quote: "Atlas provides a unique approach to schema versioning through declarative schema definitions and version control integration, making it particularly suitable for teams using GitOps practices."
    },
    {
      id: '2',
      title: 'Atlas CLI Documentation',
      url: 'https://ariga.io/atlas/cli',
      source: {
        type: 'Documentation',
        lastUpdated: '2024-02-01',
        section: 'CLI Usage'
      },
      metrics: {
        totalQueryReferences: 98, // out of 1000 queries
        queryBreakdown: {
          awareness: 32,
          consideration: 45,
          decision: 21
        },
        engineReferences: [
          { platform: 'Perplexity', references: 42, percentage: 43 },
          { platform: 'Claude', references: 28, percentage: 29 },
          { platform: 'Gemini', references: 18, percentage: 18 },
          { platform: 'SearchGPT', references: 10, percentage: 10 }
        ]
      },
      sentiment: 'Positive',
      competitorMentions: [
        {
          company: 'Flyway',
          coMentionCount: 8,
          context: 'Comparison',
          sentiment: 'Neutral'
        },
        {
          company: 'DBmate',
          coMentionCount: 5,
          context: 'Alternative',
          sentiment: 'Neutral'
        }
      ],
      attention: {
        type: 'Monitor',
        message: 'CLI documentation frequently cited - monitor for user pain points'
      },
      quote: "The Atlas CLI offers powerful schema inspection and diff capabilities, enabling teams to validate schema changes before deployment."
    },
    {
      id: '3',
      title: 'Database Schema Versioning Blog Post',
      url: 'https://ariga.io/blog/schema-versioning',
      source: {
        type: 'Blog',
        lastUpdated: '2024-01-15',
        section: 'Schema Migration'
      },
      metrics: {
        totalQueryReferences: 76, // out of 1000 queries
        queryBreakdown: {
          awareness: 28,
          consideration: 35,
          decision: 13
        },
        engineReferences: [
          { platform: 'Gemini', references: 35, percentage: 46 },
          { platform: 'Claude', references: 22, percentage: 29 },
          { platform: 'Perplexity', references: 19, percentage: 25 }
        ]
      },
      sentiment: 'Neutral',
      competitorMentions: [
        {
          company: 'Redgate',
          coMentionCount: 15,
          context: 'Comparison',
          sentiment: 'Neutral'
        },
        {
          company: 'Liquibase',
          coMentionCount: 8,
          context: 'Alternative',
          sentiment: 'Neutral'
        },
        {
          company: 'Flyway',
          coMentionCount: 6,
          context: 'Comparison',
          sentiment: 'Neutral'
        }
      ],
      attention: {
        type: 'Risk',
        message: 'Competitors frequently cited alongside - need stronger differentiation'
      },
      quote: "Atlas provides a unique approach to schema versioning through declarative schema definitions and version control integration, making it particularly suitable for teams using GitOps practices."
    },
    {
      id: '4',
      title: 'Atlas GitHub Repository',
      url: 'https://github.com/ariga/atlas',
      source: {
        type: 'GitHub',
        lastUpdated: '2024-01-10',
        section: 'Schema Migration'
      },
      metrics: {
        totalQueryReferences: 65, // out of 1000 queries
        queryBreakdown: {
          awareness: 25,
          consideration: 28,
          decision: 12
        },
        engineReferences: [
          { platform: 'Claude', references: 30, percentage: 46 },
          { platform: 'Perplexity', references: 20, percentage: 31 },
          { platform: 'Gemini', references: 15, percentage: 23 }
        ]
      },
      sentiment: 'Positive',
      competitorMentions: [],
      attention: {
        type: 'Opportunity',
        message: 'Open source aspect resonates well - highlight community contributions'
      },
      quote: "Atlas provides a unique approach to schema versioning through declarative schema definitions and version control integration, making it particularly suitable for teams using GitOps practices."
    },
    {
      id: '5',
      title: 'Database CI/CD Integration Guide',
      url: 'https://ariga.io/docs/ci-cd',
      source: {
        type: 'Guide',
        lastUpdated: '2024-01-05',
        section: 'CI/CD Integration'
      },
      metrics: {
        totalQueryReferences: 58, // out of 1000 queries
        queryBreakdown: {
          awareness: 22,
          consideration: 25,
          decision: 11
        },
        engineReferences: [
          { platform: 'Perplexity', references: 25, percentage: 43 },
          { platform: 'Claude', references: 18, percentage: 31 },
          { platform: 'Gemini', references: 15, percentage: 26 }
        ]
      },
      sentiment: 'Positive',
      competitorMentions: [
        {
          company: 'DBmaestro',
          coMentionCount: 6,
          context: 'Comparison',
          sentiment: 'Neutral'
        },
        {
          company: 'Liquibase',
          coMentionCount: 4,
          context: 'Alternative',
          sentiment: 'Neutral'
        }
      ],
      attention: null,
      quote: "Atlas provides a unique approach to schema versioning through declarative schema definitions and version control integration, making it particularly suitable for teams using GitOps practices."
    }
  ];

  // Update the aiEngineTimeSeries data with more volatility
  const aiEngineTimeSeries: AIEngineTimeSeriesData[] = [
    // Perplexity - downward trend with volatility
    { date: '2024-01-01', engine: 'Perplexity', avgSentiment: 0.45, avgPosition: 4.2, visibilityRate: 28, recommendationProb: 25 },
    { date: '2024-02-01', engine: 'Perplexity', avgSentiment: 0.43, avgPosition: 4.9, visibilityRate: 23, recommendationProb: 24 },
    { date: '2024-03-01', engine: 'Perplexity', avgSentiment: 0.41, avgPosition: 4.7, visibilityRate: 25, recommendationProb: 21 },
    { date: '2024-04-01', engine: 'Perplexity', avgSentiment: 0.35, avgPosition: 5.3, visibilityRate: 19, recommendationProb: 18 },
    { date: '2024-05-01', engine: 'Perplexity', avgSentiment: 0.32, avgPosition: 5.1, visibilityRate: 21, recommendationProb: 15 },
    
    // Claude - upward trend with volatility
    { date: '2024-01-01', engine: 'Claude', avgSentiment: 0.30, avgPosition: 5.2, visibilityRate: 15, recommendationProb: 12 },
    { date: '2024-02-01', engine: 'Claude', avgSentiment: 0.28, avgPosition: 5.0, visibilityRate: 14, recommendationProb: 13 },
    { date: '2024-03-01', engine: 'Claude', avgSentiment: 0.35, avgPosition: 4.7, visibilityRate: 19, recommendationProb: 16 },
    { date: '2024-04-01', engine: 'Claude', avgSentiment: 0.33, avgPosition: 4.4, visibilityRate: 17, recommendationProb: 19 },
    { date: '2024-05-01', engine: 'Claude', avgSentiment: 0.40, avgPosition: 4.1, visibilityRate: 22, recommendationProb: 22 },
    
    // Gemini - stable low trend with volatility
    { date: '2024-01-01', engine: 'Gemini', avgSentiment: 0.25, avgPosition: 5.3, visibilityRate: 12, recommendationProb: 10 },
    { date: '2024-02-01', engine: 'Gemini', avgSentiment: 0.28, avgPosition: 5.6, visibilityRate: 11, recommendationProb: 9 },
    { date: '2024-03-01', engine: 'Gemini', avgSentiment: 0.24, avgPosition: 5.4, visibilityRate: 13, recommendationProb: 11 },
    { date: '2024-04-01', engine: 'Gemini', avgSentiment: 0.27, avgPosition: 5.7, visibilityRate: 10, recommendationProb: 8 },
    { date: '2024-05-01', engine: 'Gemini', avgSentiment: 0.23, avgPosition: 5.5, visibilityRate: 12, recommendationProb: 10 },
    
    // SearchGPT - very low trend with volatility
    { date: '2024-01-01', engine: 'SearchGPT', avgSentiment: 0.20, avgPosition: 5.8, visibilityRate: 8, recommendationProb: 6 },
    { date: '2024-02-01', engine: 'SearchGPT', avgSentiment: 0.18, avgPosition: 6.1, visibilityRate: 6, recommendationProb: 7 },
    { date: '2024-03-01', engine: 'SearchGPT', avgSentiment: 0.21, avgPosition: 5.9, visibilityRate: 9, recommendationProb: 5 },
    { date: '2024-04-01', engine: 'SearchGPT', avgSentiment: 0.17, avgPosition: 6.2, visibilityRate: 7, recommendationProb: 4 },
    { date: '2024-05-01', engine: 'SearchGPT', avgSentiment: 0.19, avgPosition: 6.0, visibilityRate: 8, recommendationProb: 3 },
    
    // AIO - very low trend with volatility
    { date: '2024-01-01', engine: 'AIO', avgSentiment: 0.15, avgPosition: 6.3, visibilityRate: 5, recommendationProb: 3 },
    { date: '2024-02-01', engine: 'AIO', avgSentiment: 0.17, avgPosition: 6.5, visibilityRate: 3, recommendationProb: 4 },
    { date: '2024-03-01', engine: 'AIO', avgSentiment: 0.14, avgPosition: 6.4, visibilityRate: 6, recommendationProb: 2 },
    { date: '2024-04-01', engine: 'AIO', avgSentiment: 0.16, avgPosition: 6.6, visibilityRate: 4, recommendationProb: 3 },
    { date: '2024-05-01', engine: 'AIO', avgSentiment: 0.13, avgPosition: 6.7, visibilityRate: 5, recommendationProb: 1 },
  ];

  // Add state for the selected metric
  const [selectedMetric, setSelectedMetric] = useState<
    'avgSentiment' | 'avgPosition' | 'visibilityRate' | 'recommendationProb'
  >('visibilityRate');

  // Metric configurations
  const metricConfig = {
    avgSentiment: {
      title: 'Average Sentiment',
      valueFormatter: (value: number) => `${(value * 100).toFixed(0)}%`,
      color: 'blue',
    },
    avgPosition: {
      title: 'Average Position',
      valueFormatter: (value: number) => `#${value.toFixed(1)}`,
      color: 'emerald',
    },
    visibilityRate: {
      title: 'Company Mentioned',
      valueFormatter: (value: number) => `${value}%`,
      color: 'violet',
    },
    recommendationProb: {
      title: 'Recommendation Probability',
      valueFormatter: (value: number) => `${value}%`,
      color: 'amber',
    },
  };

  // First, let's fix the transformDataForChart function to handle dates better
  const transformDataForChart = (metric: typeof selectedMetric) => {
    // Convert Set to Array to avoid iteration issues
    const uniqueDates = Array.from(new Set(aiEngineTimeSeries.map(item => item.date)));
    
    // Create formatted data array
    const formattedData = uniqueDates.map(date => {
      const entries = aiEngineTimeSeries.filter(item => item.date === date);
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      
      const dataPoint: any = {
        date: formattedDate,
      };

      entries.forEach(entry => {
        dataPoint[entry.engine] = Number(entry[metric]);
      });

      return dataPoint;
    });

    return formattedData.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  // Add these new state variables at the top of the component
  const [selectedRegion, setSelectedRegion] = useState<GeoRegion | null>(null);
  const [selectedVertical, setSelectedVertical] = useState<Vertical | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<JourneyPhase | null>(null);
  
  // Add this new section before the return statement
  const resetSelection = (level: 'region' | 'vertical' | 'persona' | 'phase') => {
    switch (level) {
      case 'region':
        setSelectedRegion(null);
        setSelectedVertical(null);
        setSelectedPersona(null);
        setSelectedPhase(null);
        break;
      case 'vertical':
        setSelectedVertical(null);
        setSelectedPersona(null);
        setSelectedPhase(null);
        break;
      case 'persona':
        setSelectedPersona(null);
        setSelectedPhase(null);
        break;
      case 'phase':
        setSelectedPhase(null);
        break;
    }
  };

  // Add this new section in the return statement, before the existing content
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ariga.io AI Visibility Dashboard</h1>
          <p className="text-gray-500 text-lg">Database Schema-as-Code Platform</p>
        </div>

        {/* Buying Journey Funnel */}
        <div className="mb-8">
          <Card className="bg-white/50 backdrop-blur-sm mb-6">
            <Title>Buying Journey Analysis</Title>
            <Text className="text-gray-500">Explore visibility metrics across the buying journey</Text>
          </Card>

          <FunnelLevel
            title="Geographic Regions"
            items={buyingJourneyData}
            onSelect={setSelectedRegion}
            selectedId={selectedRegion?.id}
          />

          {selectedRegion && (
            <FunnelLevel
              title="Industry Verticals"
              items={selectedRegion.verticals}
              onSelect={setSelectedVertical}
              selectedId={selectedVertical?.id}
            />
          )}

          {selectedVertical && (
            <FunnelLevel
              title="Buyer Personas"
              items={selectedVertical.personas}
              onSelect={setSelectedPersona}
              selectedId={selectedPersona?.id}
            />
          )}

          {selectedPersona && (
            <FunnelLevel
              title="Journey Phases"
              items={selectedPersona.journeyPhases}
              onSelect={setSelectedPhase}
              selectedId={selectedPhase?.id}
            />
          )}

          {selectedPhase && (
            <Card className="bg-white/50 backdrop-blur-sm">
              <Title className="mb-4">Queries in {selectedPhase.name}</Title>
              <div className="space-y-4">
                {selectedPhase.queries.map((query) => (
                  <details
                    key={query.id}
                    className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    {/* Existing query details structure */}
                  </details>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Rest of the existing dashboard content */}
      </div>
    </div>
  );
} 
