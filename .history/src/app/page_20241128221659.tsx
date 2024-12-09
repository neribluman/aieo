import { Card, Title, AreaChart, Text, Flex, Grid } from "@tremor/react";
import { useState } from "react";

// ... existing code ...

const BuyingJourneyFunnel = () => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedData, setSelectedData] = useState({
    geo: "",
    vertical: "",
    persona: "",
    phase: "",
    query: ""
  });

  const geoData = [
    { name: "Americas", value: 450 },
    { name: "EMEA", value: 320 },
    { name: "APAC", value: 280 }
  ];

  const verticalData = {
    "SaaS": { value: 180, trend: "+12%" },
    "Financial Services": { value: 150, trend: "+8%" },
    "Healthcare": { value: 120, trend: "+15%" },
    "Retail": { value: 100, trend: "+5%" }
  };

  const personaData = {
    "C-Level": { value: 200, influence: "High" },
    "IT Decision Makers": { value: 180, influence: "High" },
    "Business Analysts": { value: 150, influence: "Medium" }
  };

  const phaseData = {
    "Problem Exploration": { count: 250, conversion: "85%" },
    "Solution Education": { count: 200, conversion: "75%" },
    "Solution Comparison": { count: 150, conversion: "60%" },
    "Solution Evaluation": { count: 100, conversion: "40%" },
    "Final Research": { count: 50, conversion: "90%" }
  };

  const queryData = {
    queries: [
      {
        text: "How to implement AI in financial services?",
        sentiment: 0.8,
        rank: 1,
        recommendation: 0.9,
        source: "https://example.com/ai-finance",
        citations: ["research-paper-1", "case-study-2"]
      },
      // More queries...
    ]
  };

  const renderLevel = () => {
    switch(selectedLevel) {
      case 0:
        return (
          <Card className="glass-card">
            <Title>Geographic Distribution</Title>
            <AreaChart
              className="mt-4 h-72"
              data={geoData}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value} queries`}
              onValueClick={(v) => {
                setSelectedData({...selectedData, geo: v.name});
                setSelectedLevel(1);
              }}
            />
          </Card>
        );
      case 1:
        return (
          <Card className="glass-card">
            <Title>Industry Verticals - {selectedData.geo}</Title>
            <Grid numItems={2} className="gap-4 mt-4">
              {Object.entries(verticalData).map(([name, data]) => (
                <Card key={name} className="metric-card cursor-pointer"
                      onClick={() => {
                        setSelectedData({...selectedData, vertical: name});
                        setSelectedLevel(2);
                      }}>
                  <Text>{name}</Text>
                  <Flex>
                    <Text className="font-semibold">{data.value} queries</Text>
                    <Text className="text-green-500">{data.trend}</Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Card>
        );
      case 2:
        return (
          <Card className="glass-card">
            <Title>Buyer Personas - {selectedData.vertical}</Title>
            <Grid numItems={3} className="gap-4 mt-4">
              {Object.entries(personaData).map(([name, data]) => (
                <Card key={name} className="metric-card cursor-pointer"
                      onClick={() => {
                        setSelectedData({...selectedData, persona: name});
                        setSelectedLevel(3);
                      }}>
                  <Text>{name}</Text>
                  <Flex className="mt-2">
                    <Text className="font-semibold">{data.value} queries</Text>
                    <Text className="text-blue-500">Influence: {data.influence}</Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Card>
        );
      case 3:
        return (
          <Card className="glass-card">
            <Title>Buying Journey Phases - {selectedData.persona}</Title>
            <div className="mt-4 space-y-4">
              {Object.entries(phaseData).map(([phase, data]) => (
                <Card key={phase} className="metric-card cursor-pointer"
                      onClick={() => {
                        setSelectedData({...selectedData, phase: phase});
                        setSelectedLevel(4);
                      }}>
                  <Flex>
                    <div>
                      <Text>{phase}</Text>
                      <Text className="text-sm text-gray-500">Queries: {data.count}</Text>
                    </div>
                    <Text className="text-green-500">Conversion: {data.conversion}</Text>
                  </Flex>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: data.conversion
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        );
      case 4:
        return (
          <Card className="glass-card">
            <Title>Queries - {selectedData.phase}</Title>
            <div className="mt-4 space-y-4">
              {queryData.queries.map((query, idx) => (
                <details key={idx} className="glass-card rounded-xl">
                  <summary className="p-4 cursor-pointer">
                    <Text>{query.text}</Text>
                  </summary>
                  <div className="p-4 space-y-3">
                    <Flex>
                      <Text>Sentiment</Text>
                      <Text className={query.sentiment > 0.5 ? "text-green-500" : "text-red-500"}>
                        {(query.sentiment * 100).toFixed(1)}%
                      </Text>
                    </Flex>
                    <Flex>
                      <Text>Position Ranked</Text>
                      <Text className="font-semibold">#{query.rank}</Text>
                    </Flex>
                    <Flex>
                      <Text>Recommendation Probability</Text>
                      <Text className="text-blue-500">{(query.recommendation * 100).toFixed(1)}%</Text>
                    </Flex>
                    <div>
                      <Text className="mb-2">Source</Text>
                      <a href={query.source} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-500 hover:underline">
                        {query.source}
                      </a>
                    </div>
                    <div>
                      <Text className="mb-2">Citations</Text>
                      <div className="space-y-1">
                        {query.citations.map((citation, cidx) => (
                          <Text key={cidx} className="text-sm text-gray-600">• {citation}</Text>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Title>Buying Journey Analysis</Title>
      <div className="flex space-x-2 mb-4">
        {["Geography", "Vertical", "Persona", "Journey Phase", "Queries"].map((step, idx) => (
          <button
            key={step}
            className={`px-4 py-2 rounded ${
              selectedLevel === idx
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setSelectedLevel(idx)}
          >
            {step}
          </button>
        ))}
      </div>
      {renderLevel()}
    </div>
  );
};

// ... existing code ...

export default function Home() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <BuyingJourneyFunnel />
      {/* ... existing components ... */}
    </main>
  );
} 