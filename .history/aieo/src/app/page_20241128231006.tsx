'use client';

import { Card, Title, LineChart, Grid, Text, Metric, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, Badge } from '@tremor/react';
import WorldMap from "react-svg-worldmap";
import { CountryContext } from "react-svg-worldmap";
import { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { ChevronRightIcon, ChevronLeftIcon, GlobeAltIcon, BuildingOfficeIcon, UserIcon, MapIcon } from '@heroicons/react/24/outline';

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

// Add new interfaces for the funnel data structure
interface FunnelMetric {
  label: 'Average Sentiment' | 'Average Position' | 'Company Mentioned' | 'Recommendation Probability';
  value: number;
  trend?: string;
  color?: string;
}

interface FunnelLevel {
  id: string;
  name: string;
  metrics: FunnelMetric[];
  children?: FunnelNode[];
}

// First, let's update the FunnelNode interface to include all possible properties
interface FunnelNode {
  id: string;
  name: string;
  icon?: JSX.Element;
  metrics: FunnelMetric[];
  details?: {
    marketSize?: string;
    growthRate?: string;
    competitorCount?: number;
    topCompetitors?: Array<{ name: string; share: number }>;
    influence?: number;
    queries?: QueryPerformance[];
  };
}

interface BreadcrumbItem {
  id: string;
  name: string;
  level: string;
}

// Add this inside your VisibilityDashboard component
function BuyingJourneyFunnel() {
  const [activePath, setActivePath] = useState<BreadcrumbItem[]>([]);
  const [activeNode, setActiveNode] = useState<FunnelNode | null>(null);

  // Define queries first
  const queries: QueryPerformance[] = [
    {
      id: "q1",
      query: "What challenges do teams face with manual database schema changes?",
      category: "Problem Recognition",
      impact: "High",
      userIntent: "Research",
      platforms: [
        { name: "Perplexity", position: 2, cited: true },
        { name: "Claude", position: 4, cited: true },
        { name: "Gemini", position: '-', cited: false }
      ],
      averagePosition: 3
    },
    {
      id: "q2",
      query: "Database schema automation tools comparison",
      category: "Research",
      impact: "High",
      userIntent: "Evaluation",
      platforms: [
        { name: "Claude", position: 1, cited: true },
        { name: "Perplexity", position: 3, cited: true },
        { name: "Gemini", position: 4, cited: false }
      ],
      averagePosition: 2.7
    },
    {
      id: "q3",
      query: "Best practices for database schema versioning",
      category: "Problem Recognition",
      impact: "Medium",
      userIntent: "Research",
      platforms: [
        { name: "Perplexity", position: 1, cited: true },
        { name: "Claude", position: 3, cited: true },
        { name: "Gemini", position: 5, cited: false }
      ],
      averagePosition: 3.2
    },
    {
      id: "q4",
      query: "How to implement database CI/CD pipeline",
      category: "Research",
      impact: "High",
      userIntent: "Implementation",
      platforms: [
        { name: "Claude", position: 2, cited: true },
        { name: "Perplexity", position: 4, cited: true },
        { name: "Gemini", position: 3, cited: true }
      ],
      averagePosition: 2.9
    }
  ];

  // Sample funnel data structure
  const geographicRegions: FunnelLevel = {
    id: 'regions',
    name: 'Geographic Regions',
    metrics: [
      { label: 'Average Sentiment', value: 42, trend: '+15%', color: 'blue' },
      { label: 'Average Position', value: 3.2, trend: '+0.8', color: 'emerald' },
      { label: 'Company Mentioned', value: 38, trend: '+12%', color: 'violet' },
      { label: 'Recommendation Probability', value: 45, trend: '+18%', color: 'amber' }
    ],
    children: [
      {
        id: 'americas',
        name: 'Americas',
        metrics: [
          { label: 'Average Sentiment', value: 48, trend: '+18%' },
          { label: 'Average Position', value: 2.8, trend: '+1.2' },
          { label: 'Company Mentioned', value: 42, trend: '+15%' },
          { label: 'Recommendation Probability', value: 52, trend: '+20%' }
        ],
        details: {
          topMarkets: ['USA', 'Canada', 'Brazil']
        }
      },
      {
        id: 'emea',
        name: 'EMEA',
        metrics: [
          { label: 'Average Sentiment', value: 45, trend: '+15%' },
          { label: 'Average Position', value: 3.0, trend: '+0.9' },
          { label: 'Company Mentioned', value: 38, trend: '+10%' },
          { label: 'Recommendation Probability', value: 48, trend: '+16%' }
        ],
        details: {
          topMarkets: ['UK', 'Germany', 'France']
        }
      },
      // Add more regions...
    ]
  };

  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      {activePath.map((item, index) => (
        <div key={item.id} className="flex items-center">
          {index > 0 && <ChevronRightIcon className="w-4 h-4 mx-1" />}
          <button
            onClick={() => setActivePath(activePath.slice(0, index + 1))}
            className="hover:text-blue-600 transition-colors"
          >
            {item.name}
          </button>
        </div>
      ))}
    </div>
  );

  const renderMetrics = (metrics: FunnelMetric[]) => (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
          <Text className="text-sm text-gray-600">{metric.label}</Text>
          <div className="flex items-baseline gap-2 mt-1">
            <Text className="text-2xl font-semibold">
              {metric.label === 'Average Position' ? `#${metric.value}` : 
               metric.label === 'Average Sentiment' ? `${metric.value}%` :
               `${metric.value}%`}
            </Text>
            {metric.trend && (
              <Text className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Add vertical selection handling
  const renderVerticals = () => {
    const verticals: FunnelNode[] = [
      {
        id: 'enterprise',
        name: 'Enterprise Software',
        icon: <BuildingOfficeIcon className="w-6 h-6" />,
        metrics: [
          { label: 'Average Sentiment', value: 45, trend: '+12%' },
          { label: 'Average Position', value: 2.5, trend: '+1.5' },
          { label: 'Company Mentioned', value: 42, trend: '+8%' },
          { label: 'Recommendation Probability', value: 48, trend: '+15%' }
        ] as FunnelMetric[],
        details: {
          marketSize: '$12.5B',
          growthRate: '15.5% CAGR',
          competitorCount: 8,
          topCompetitors: [
            { name: 'Redgate', share: 28 },
            { name: 'Liquibase', share: 22 },
            { name: 'Flyway', share: 18 }
          ]
        }
      },
      {
        id: 'fintech',
        name: 'Financial Services',
        icon: <BuildingOfficeIcon className="w-6 h-6" />,
        metrics: [
          { label: 'Average Sentiment', value: 42, trend: '+10%' },
          { label: 'Average Position', value: 2.8, trend: '+1.2' },
          { label: 'Company Mentioned', value: 38, trend: '+5%' },
          { label: 'Recommendation Probability', value: 45, trend: '+12%' }
        ] as FunnelMetric[],
        details: {
          marketSize: '$8.5B',
          growthRate: '12.5% CAGR',
          competitorCount: 6,
          topCompetitors: [
            { name: 'Redgate', share: 25 },
            { name: 'Liquibase', share: 20 },
            { name: 'Flyway', share: 15 }
          ]
        }
      },
      {
        id: 'healthcare',
        name: 'Healthcare Tech',
        icon: <BuildingOfficeIcon className="w-6 h-6" />,
        metrics: [
          { label: 'Average Sentiment', value: 35, trend: '+12%' },
          { label: 'Average Position', value: 3.0, trend: '+20%' },
          { label: 'Company Mentioned', value: 32, trend: '+15%' },
          { label: 'Recommendation Probability', value: 38, trend: '+8%' }
        ] as FunnelMetric[],
        details: {
          marketSize: '$6.2B',
          growthRate: '18.5% CAGR',
          competitorCount: 5,
          topCompetitors: [
            { name: 'Redgate', share: 22 },
            { name: 'Liquibase', share: 18 },
            { name: 'Flyway', share: 12 }
          ]
        }
      }
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {verticals.map((vertical) => (
          <Card
            key={vertical.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setActiveNode(vertical);
              setActivePath([...activePath, { id: vertical.id, name: vertical.name, level: 'vertical' }]);
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              {vertical.icon}
              <Title>{vertical.name}</Title>
            </div>
            {renderMetrics(vertical.metrics)}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <Text className="text-sm text-gray-600">View Buyer Personas</Text>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // Update renderFunnelLevel to handle different levels
  const renderFunnelLevel = () => {
    const currentLevel = activePath[activePath.length - 1]?.level;

    if (!activeNode) {
      // Initial view - Regions
      return (
        <div className="grid grid-cols-2 gap-6">
          {geographicRegions.children?.map((region) => (
            <Card
              key={region.id}
              className="cursor-pointer hover:shadow-md transition-shadow bg-white p-6"
              onClick={() => {
                setActiveNode(region);
                setActivePath([...activePath, { id: region.id, name: region.name, level: 'region' }]);
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <GlobeAltIcon className="w-6 h-6 text-blue-500" />
                </div>
                <Title className="text-xl">{region.name}</Title>
              </div>
              {renderMetrics(region.metrics)}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <Text className="text-sm text-gray-600">Click to explore verticals</Text>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      );
    }

    if (currentLevel === 'region') {
      return (
        <div className="space-y-6">
          <Card className="bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <GlobeAltIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <Text className="text-sm text-gray-500">{activeNode.name}</Text>
                  <Title className="text-xl">Overview</Title>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveNode(null);
                  setActivePath(activePath.slice(0, -1));
                }}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Back to Regions
              </button>
            </div>

            {/* Region metrics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {activeNode.metrics.map((metric, index) => (
                <div key={index} className="bg-white border rounded-lg p-4">
                  <Text className="text-sm text-gray-600">{metric.label}</Text>
                  <div className="flex items-baseline gap-2 mt-1">
                    <Text className="text-3xl font-semibold">{metric.value}</Text>
                    {metric.trend && (
                      <Text className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.trend}
                      </Text>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Region details */}
            <div className="grid grid-cols-2 gap-6">
              <Card decoration="left" decorationColor="blue" className="bg-white/50">
                <Title className="text-lg mb-4">Top Markets</Title>
                <div className="space-y-3">
                  {activeNode.details.topMarkets?.map((market: string) => (
                    <div key={market} className="flex items-center justify-between">
                      <Text>{market}</Text>
                      <Badge color="blue" className="bg-blue-50 text-blue-700">
                        {Math.round(Math.random() * 30 + 20)}% Share
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card decoration="left" decorationColor="emerald" className="bg-white/50">
                <Title className="text-lg mb-4">Performance Metrics</Title>
                <div className="space-y-4">
                  {activeNode.details.performance && Object.entries(activeNode.details.performance).map(([key, value]) => {
                    const numericValue = value as number;
                    return (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-1">
                          <Text className="capitalize">{key}</Text>
                          <Text>{numericValue}%</Text>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${numericValue}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </Card>

          {/* Industry Verticals section */}
          <div>
            <Title className="text-xl mb-4">Industry Verticals</Title>
            {renderVerticals()}
          </div>
        </div>
      );
    }

    if (currentLevel === 'vertical') {
      return (
        <div className="space-y-6">
          <Card className="bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BuildingOfficeIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <Text className="text-sm text-gray-500">{activeNode.name}</Text>
                  <Title className="text-xl">Vertical Overview</Title>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveNode(null);
                  setActivePath(activePath.slice(0, -1));
                }}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Back to Verticals
              </button>
            </div>

            {/* Vertical metrics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {activeNode.metrics.map((metric, index) => (
                <div key={index} className="bg-white border rounded-lg p-4">
                  <Text className="text-sm text-gray-600">{metric.label}</Text>
                  <div className="flex items-baseline gap-2 mt-1">
                    <Text className="text-3xl font-semibold">{metric.value}</Text>
                    {metric.trend && (
                      <Text className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.trend}
                      </Text>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Vertical details */}
            <div className="grid grid-cols-2 gap-6">
              <Card decoration="left" decorationColor="blue" className="bg-white/50">
                <Title className="text-lg mb-4">Market Overview</Title>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Text>Market Size</Text>
                    <Text className="font-medium">{activeNode.details.marketSize}</Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text>Growth Rate</Text>
                    <Text className="font-medium">{activeNode.details.growthRate}</Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text>Competitors</Text>
                    <Text className="font-medium">{activeNode.details.competitorCount}</Text>
                  </div>
                </div>
              </Card>

              <Card decoration="left" decorationColor="emerald" className="bg-white/50">
                <Title className="text-lg mb-4">Top Competitors</Title>
                <div className="space-y-3">
                  {activeNode.details.topCompetitors?.map((competitor: { name: string; share: number }) => (
                    <div key={competitor.name} className="flex justify-between items-center">
                      <Text>{competitor.name}</Text>
                      <Badge color="emerald">{competitor.share}% Share</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Card>

          {/* Buyer Personas section */}
          <div>
            <Title className="text-xl mb-4">Buyer Personas</Title>
            {renderPersonas()}
          </div>
        </div>
      );
    }

    if (currentLevel === 'persona') {
      return (
        <div className="space-y-6">
          <Card className="bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {activeNode.icon}
                </div>
                <div>
                  <Text className="text-sm text-gray-500">{activeNode.name}</Text>
                  <Title className="text-xl">Persona Overview</Title>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveNode(null);
                  setActivePath(activePath.slice(0, -1));
                }}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Back to Personas
              </button>
            </div>

            {renderMetrics(activeNode.metrics)}
            {renderQueryTable(activeNode.details?.queries || [])}
          </Card>
        </div>
      );
    }

    return null;
  };

  // First, let's create an interface for the persona structure
  interface Persona {
    id: string;
    title: string;
    icon: JSX.Element;
    metrics: FunnelMetric[];
    queries: QueryPerformance[];
    details: {
      influence: number;
    };
  }

  // Update the renderPersonas function
  const renderPersonas = () => {
    const personas: FunnelNode[] = [
      {
        id: 'devops-lead',
        name: 'DevOps Lead',
        icon: <UserIcon className="w-6 h-6" />,
        metrics: [
          { label: 'Average Sentiment', value: 48, trend: '+18%' },
          { label: 'Average Position', value: 2.2, trend: '+1.8' },
          { label: 'Company Mentioned', value: 45, trend: '+12%' },
          { label: 'Recommendation Probability', value: 52, trend: '+25%' }
        ] as FunnelMetric[],
        details: {
          influence: 85,
          queries: queries.filter(q => q.category === "Problem Recognition")
        }
      },
      {
        id: 'db-architect',
        name: 'Database Architect',
        icon: <UserIcon className="w-6 h-6" />,
        metrics: [
          { label: 'Average Sentiment', value: 45, trend: '+15%' },
          { label: 'Average Position', value: 2.5, trend: '+1.5' },
          { label: 'Company Mentioned', value: 42, trend: '+10%' },
          { label: 'Recommendation Probability', value: 48, trend: '+20%' }
        ],
        details: {
          influence: 75,
          queries: queries.filter(q => q.category === "Research")
        }
      },
      {
        id: 'tech-lead',
        name: 'Tech Lead',
        icon: <UserIcon className="w-6 h-6" />,
        metrics: [
          { label: 'Average Sentiment', value: 42, trend: '+12%' },
          { label: 'Average Position', value: 2.8, trend: '+1.2' },
          { label: 'Company Mentioned', value: 40, trend: '+8%' },
          { label: 'Recommendation Probability', value: 45, trend: '+15%' }
        ],
        details: {
          influence: 70,
          queries: queries.filter(q => q.category === "Research")
        }
      }
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className="cursor-pointer hover:shadow-lg transition-shadow bg-white p-6"
            onClick={() => {
              setActiveNode(persona);
              setActivePath([...activePath, { id: persona.id, name: persona.name, level: 'persona' }]);
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                {persona.icon}
              </div>
              <Title className="text-xl">{persona.name}</Title>
            </div>
            {renderMetrics(persona.metrics)}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <Text className="text-sm text-gray-600">Related Queries</Text>
                  <Text className="font-medium">{persona.details.queries?.length || 0}</Text>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // Update the back button click handler
  const handleBack = () => {
    const newPath = activePath.slice(0, -1);
    const previousLevel = newPath[newPath.length - 1];
    
    if (!previousLevel) {
      setActiveNode(null);
      setActivePath([]);
      return;
    }

    let previousNode: FunnelNode | null = null;
    
    if (previousLevel.level === 'region') {
      previousNode = geographicRegions.children?.find(r => r.id === previousLevel.id) || null;
    } else if (previousLevel.level === 'vertical') {
      previousNode = verticals.find(v => v.id === previousLevel.id) || null;
    }

    setActiveNode(previousNode);
    setActivePath(newPath);
  };

  // Main return of BuyingJourneyFunnel
  return (
    <div className="space-y-6">
      <Card className="bg-white p-6">
        <div className="mb-6">
          <Title className="text-2xl mb-2">Buying Journey Analysis</Title>
          <Text className="text-gray-500">
            Explore performance metrics across regions, industries, and buyer personas
          </Text>
        </div>

        {activePath.length > 0 && renderBreadcrumbs()}
        {renderFunnelLevel()}
      </Card>
    </div>
  );
}

// Update your VisibilityDashboard component to include the new funnel
export default function VisibilityDashboard() {
  // Move all the state and functions inside the component
  const [selectedMetric, setSelectedMetric] = useState<
    'avgSentiment' | 'avgPosition' | 'visibilityRate' | 'recommendationProb'
  >('visibilityRate');

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

  const transformDataForChart = (metric: typeof selectedMetric) => {
    const uniqueDates = Array.from(new Set(aiEngineTimeSeries.map(item => item.date)));
    
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

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ariga.io AI Visibility Dashboard</h1>
          <p className="text-gray-500 text-lg">Database Schema-as-Code Platform</p>
        </div>

        {/* AI Engine Performance Chart */}
        <Card className="bg-white/50 backdrop-blur-sm shadow-glow mb-6">
          <div className="p-4">
            <Tabs value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as typeof selectedMetric)}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <Title className="text-xl font-semibold">AI Engine Performance Over Time</Title>
                <TabsList>
                  {Object.entries(metricConfig).map(([key, config]) => (
                    <TabsTrigger key={key} value={key}>
                      {config.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {Object.entries(metricConfig).map(([key, config]) => (
                <TabsContent key={key} value={key}>
                  <LineChart
                    className="h-96"
                    data={transformDataForChart(key as typeof selectedMetric)}
                    index="date"
                    categories={['Perplexity', 'Claude', 'Gemini', 'SearchGPT', 'AIO']}
                    colors={['blue', 'violet', 'emerald', 'amber', 'rose']}
                    valueFormatter={config.valueFormatter}
                    yAxisWidth={56}
                    showAnimation={true}
                    showLegend={true}
                    curveType="linear"
                    showGridLines={true}
                    showXAxis={true}
                    showYAxis={true}
                    minValue={key === 'avgSentiment' ? 0 : undefined}
                    maxValue={key === 'avgSentiment' ? 1 : undefined}
                    enableLegendSlider={true}
                    connectNulls={true}
                    noDataText="No data available"
                    rotateLabelX={{
                      angle: -45,
                      verticalShift: 20,
                      xAxisHeight: 60
                    }}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </Card>

        {/* Move BuyingJourneyFunnel here */}
        <div className="mb-6">
          <BuyingJourneyFunnel />
        </div>

        {/* Rest of your dashboard components */}
                                      </div>
                                    </div>
                                  );
} 
