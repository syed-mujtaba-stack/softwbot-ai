import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageSquare, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Bots",
    value: "0",
    icon: Bot,
    change: "+0 this month",
  },
  {
    title: "Conversations",
    value: "0",
    icon: MessageSquare,
    change: "+0 this week",
  },
  {
    title: "Contacts",
    value: "0",
    icon: Users,
    change: "+0 this month",
  },
  {
    title: "Messages Today",
    value: "0",
    icon: TrendingUp,
    change: "0% from yesterday",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to SoftwBot AI. Here&apos;s an overview of your bots.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Welcome to SoftwBot AI! Here&apos;s how to get started:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Create your first bot</li>
              <li>Configure your bot&apos;s knowledge base</li>
              <li>Connect to WhatsApp</li>
              <li>Test your bot</li>
              <li>Deploy and start serving customers</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
