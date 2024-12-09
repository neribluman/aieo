'use client';

import { Card, Title, Text } from "@tremor/react";

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your analytics dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Title>Total Queries</Title>
            <Text className="mt-2">1,234</Text>
          </Card>
          
          <Card>
            <Title>Average Position</Title>
            <Text className="mt-2">#3.2</Text>
          </Card>
          
          <Card>
            <Title>Visibility Score</Title>
            <Text className="mt-2">78%</Text>
          </Card>
        </div>
      </div>
    </div>
  );
} 