import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Creators onboarded", value: "12k+" },
  { label: "Bookmarks shared", value: "180k" },
  { label: "Listings published", value: "8.6k" },
];

const values = [
  { title: "Curated by people", description: "We believe trusted recommendations beat endless feeds." },
  { title: "Designed for focus", description: "Clear, calm UI helps you find the next best resource fast." },
  { title: "Built to share", description: "Collections make collaboration and knowledge flow effortless." },
];

const features = [
  {
    title: "Structured Press Releases",
    description: "Professional formatting that meets industry standards and ensures maximum readability.",
    icon: "📝"
  },
  {
    title: "Media Distribution",
    description: "Reach journalists, bloggers, and media outlets with our targeted distribution network.",
    icon: "📡"
  },
  {
    title: "Analytics & Insights",
    description: "Track performance, engagement, and reach of your press releases in real-time.",
    icon: "📊"
  },
  {
    title: "Archive Management",
    description: "Maintain a searchable, organized archive of all your company announcements and news.",
    icon: "📚"
  },
  {
    title: "Multi-format Support",
    description: "Support for text, images, videos, and attachments to enrich your press releases.",
    icon: "🎨"
  },
  {
    title: "SEO Optimization",
    description: "Built-in SEO tools to ensure your news ranks well in search engines.",
    icon: "🔍"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "PR Director at TechCorp",
    content: "NewsTapy transformed how we handle press releases. The distribution network is unmatched and the analytics help us prove ROI.",
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    name: "Michael Chen",
    role: "Communications Manager at StartupHub",
    content: "The structured formatting and archive features save us hours every week. Our media outreach has never been more effective.",
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Lead at InnovateCo",
    content: "Finally, a press distribution platform that understands what modern PR teams need. Clean, fast, and results-driven.",
    avatar: "/placeholder.svg?height=60&width=60"
  }
];

const technologies = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", 
  "PostgreSQL", "Redis", "AWS", "Cloudflare"
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern platform for creators, communities, and curated business discovery.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/team">Meet the Team</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A single home for knowledge, discovery, and community.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} brings together publishing, listings, and social bookmarking so teams can move faster
              and keep their best resources close.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="border-border bg-card transition-transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
              <p className="mt-3 text-xs text-muted-foreground">{member.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission & Vision Section */}
      <div className="mt-16">
        <Card className="border-border bg-card">
          <CardContent className="p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4">Our Mission</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Empowering clear, effective communication between organizations and their audiences.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that press releases should be accessible, well-formatted, and easily discoverable. 
                  NewsTapy bridges the gap between organizations and the media, ensuring that important news 
                  reaches the right people at the right time.
                </p>
              </div>
              <div>
                <Badge variant="outline" className="mb-4">Our Vision</Badge>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  The future of press distribution is structured and intelligent.
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're building a world where every press release is optimized for discovery, 
                  where analytics provide actionable insights, and where organizations can maintain 
                  meaningful connections with their audience through clear, professional communication.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">Features & Capabilities</Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need for effective press distribution
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From creation to distribution to analysis, we've built the tools modern PR teams need to succeed.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">Success Stories</Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by PR teams worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how organizations are using NewsTapy to transform their press distribution strategy.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Section */}
      <div className="mt-16">
        <Card className="border-border bg-card">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4">Technology Stack</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Built with modern, reliable technology
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We use cutting-edge technology to ensure reliability, security, and performance for all our users.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
