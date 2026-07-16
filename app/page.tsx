import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Bot,
  Brain,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "No-Code Bot Builder",
    description:
      "Describe your business in natural language and our AI Bot Architect creates a complete WhatsApp bot.",
  },
  {
    icon: Brain,
    title: "AI-Powered Responses",
    description:
      "Advanced AI models understand context and provide accurate, helpful responses to your customers.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description:
      "Seamlessly connect to WhatsApp and start serving customers in minutes.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Get your bot running in minutes, not months. No coding required.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with end-to-end encryption and compliance built-in.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track performance, conversation metrics, and customer satisfaction in real-time.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">SoftwBot AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            AI-Powered WhatsApp{" "}
            <span className="text-primary">Employees</span> for Every Business
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create intelligent WhatsApp chatbots without writing a single line
            of code. Describe your business, and our AI builds a complete,
            production-ready bot.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-background rounded-lg p-6 border"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2026 SoftwBot AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
