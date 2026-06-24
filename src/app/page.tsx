"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  Cloud,
  Factory,
  FileCheck2,
  Fingerprint,
  Gauge,
  LockKeyhole,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";

const navItems = ["Home", "Features", "Modules", "AI Engine", "Pricing", "Solutions", "About"];

const modules = [
  ["Finance", BarChart3],
  ["HRMS", UsersRound],
  ["CRM", Building2],
  ["Inventory", Boxes],
  ["Procurement", Workflow],
  ["Sales", Gauge],
  ["Manufacturing", Factory],
  ["Analytics", Radar],
  ["Compliance", FileCheck2],
  ["Audit", ShieldCheck],
  ["Projects", Network],
  ["Asset Management", Cloud],
];

const aiCards: [
  string,
  string,
  ComponentType<{ className?: string }>
][] = [
    ["Predictive Analytics", "Forecast revenue, demand, margin, and operational risk before they affect boardroom decisions.", BrainCircuit],
    ["Demand Forecasting", "Predict SKU, region, channel, and seasonal demand using live enterprise signals.", Radar],
    ["Smart Inventory Optimization", "Balance reorder points, warehouses, vendors, and working capital automatically.", Boxes],
    ["Automated Decision Support", "Recommend approvals, escalations, and workflow actions with explainable AI.", Workflow],
    ["AI Chat Assistant", "Ask questions across Finance, HR, SCM, Payroll, Projects, Audit, and Analytics.", Bot],
    ["Fraud Detection", "Detect unusual access, payments, payroll, and procurement behavior with anomaly scoring.", Fingerprint],
  ];

const dashboards = {
  Finance: ["Finance Control Tower", "$48.2M", "Revenue YTD", ["Cashflow forecast +9.2%", "Close cycle 3.4 days faster", "Invoice risk reduced 18%"]],
  Inventory: ["Inventory Intelligence", "14", "Critical SKU risks", ["Bengaluru DC needs replenishment", "Vendor SLA 96.4%", "Stockout exposure down 22%"]],
  "AI Insights": ["AI Executive Insights", "82%", "Decision confidence", ["Margin anomaly detected", "Demand spike in APAC", "Resource allocation optimized"]],
  CRM: ["Customer Revenue Cloud", "31%", "Pipeline growth", ["Enterprise pipeline accelerated", "Renewal risk reduced", "Expansion opportunities detected"]],
} as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${compact ? "h-10 w-10" : "h-12 w-12"} rounded-2xl bg-[#D4AF37]/10 p-1 ring-1 ring-[#D4AF37]/30`}>
        <svg viewBox="0 0 120 90" className="h-full w-full">
          <defs>
            <linearGradient id="rustGoldLogo" x1="0" x2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="54%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path d="M32 58C17 58 8 47 8 35c0-13 11-24 26-24 10 0 18 5 24 13 7-12 18-19 32-19 16 0 28 12 28 27 0 16-12 28-29 28H32Z" fill="none" stroke="url(#rustGoldLogo)" strokeWidth="9" strokeLinecap="round" />
          <path d="M25 48c19 25 41-34 70-5" fill="none" stroke="url(#rustGoldLogo)" strokeWidth="9" strokeLinecap="round" />
          <circle cx="29" cy="48" r="6" fill="#7C3AED" />
          <circle cx="90" cy="42" r="6" fill="#EC4899" />
        </svg>
      </div>
      <div>
        <p className={`${compact ? "text-lg" : "text-xl"} font-semibold tracking-wide text-[#F8F4E3]`}>Infinity Cloud</p>
        {!compact ? <p className="text-xs uppercase tracking-[0.34em] text-[#D4AF37]">AI ERP Suite</p> : null}
      </div>
    </div>
  );
}

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-[#7C3AED]/20 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="landing-float relative mx-auto max-w-2xl">
      <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-r from-[#7C3AED]/35 via-[#EC4899]/25 to-[#06B6D4]/15 blur-3xl" />
      <Glass className="relative overflow-hidden p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Logo compact />
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#EC4899]" />
            <span className="h-3 w-3 rounded-full bg-[#06B6D4]" />
            <span className="h-3 w-3 rounded-full bg-[#A855F7]" />
          </div>
        </div>
        <div className="grid gap-4 pt-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
            <p className="text-sm text-[#06B6D4]">AI Command Signal</p>
            <p className="mt-2 text-4xl font-semibold">$48.2M</p>
            <p className="mt-1 text-sm text-emerald-300">+12.4% revenue intelligence</p>
            <svg viewBox="0 0 420 150" className="mt-6 h-36 w-full">
              <defs>
                <linearGradient id="goldChart" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="55%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              {[30, 65, 100, 135].map((y) => <line key={y} x1="0" x2="420" y1={y} y2={y} stroke="#2a2017" />)}
              <polyline points="0,120 45,98 90,104 135,76 180,82 225,48 270,58 315,32 360,40 410,18" fill="none" stroke="url(#goldChart)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#030712]/80 p-5">
              <div className="flex items-center gap-3">
                <Bot className="h-8 w-8 text-[#06B6D4]" />
                <div>
                  <p className="font-semibold">AI Assistant</p>
                  <p className="text-sm text-[#F8F4E3]/60">3 actions recommended</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {["Approve vendor batch", "Rebalance inventory", "Escalate project risk"].map((item) => (
                  <div key={item} className="rounded-lg bg-[#F8F4E3]/[0.06] p-3 text-sm">{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-[#F8F4E3]/60">Workflow Automation</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {["Event", "AI", "Action"].map((item) => (
                  <span key={item} className="rounded-full bg-[#7C3AED]/25 px-3 py-2 text-xs font-semibold text-white">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
}

export default function LandingPage() {
  const [activeDashboard, setActiveDashboard] = useState<keyof typeof dashboards>("Finance");
  const [title, metric, label, rows] = dashboards[activeDashboard];

  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white">
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @keyframes floatSoft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .landing-float { animation: floatSoft 6s ease-in-out infinite; }
        .landing-marquee { animation: marquee 28s linear infinite; }
      `}</style>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(124,58,237,0.34),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(236,72,153,0.20),transparent_32%),radial-gradient(circle_at_50%_82%,rgba(6,182,212,0.16),transparent_32%),linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:auto,auto,auto,72px_72px,72px_72px]" />

      <header className="fixed left-4 right-4 top-4 z-50 rounded-3xl border border-white/10 bg-[#030712]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Logo compact />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#F8F4E3]/70 lg:flex">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="transition hover:text-[#D4AF37]">{item}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="rounded-lg bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] px-5 py-2.5 font-semibold text-white shadow-lg shadow-[#7C3AED]/30 transition hover:scale-[1.02]">Login</Link>
          </div>
        </div>
      </header>

      <section id="home" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4" /> Fortune 500 AI ERP operating suite
          </div>
          <h1 className="mt-10 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Transform Enterprise Operations with AI-Powered Cloud ERP
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F8F4E3]/72 md:text-xl">
            Automate Finance, HR, Inventory, Procurement, CRM, Analytics and Operations from a single intelligent platform.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/auth/register" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] px-6 py-4 font-semibold text-white shadow-2xl shadow-[#7C3AED]/35 transition hover:scale-[1.02]">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
            {[["500+", "Enterprises"], ["1M+", "Transactions Daily"], ["99.99%", "Uptime"], ["AI", "Automation Engine"]].map(([value, stat]) => (
              <Glass key={stat} className="p-4"><p className="text-2xl font-semibold text-[#D4AF37]">{value}</p><p className="mt-1 text-sm text-[#F8F4E3]/60">{stat}</p></Glass>
            ))}
          </div>
        </div>
        <DashboardMockup />
      </section>

      <section className="relative border-y border-[#D4AF37]/15 bg-[#F8F4E3]/[0.035] py-8">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">Trusted by Enterprises Worldwide</p>
        <div className="mt-6 overflow-hidden">
          <div className="landing-marquee flex w-max gap-4">
            {[...["Northstar", "Apex Global", "HelioGrid", "Meridian Health", "Orion Logistics", "VoltEdge", "BluePeak", "SOC 2", "ISO 27001", "GDPR"], ...["Northstar", "Apex Global", "HelioGrid", "Meridian Health", "Orion Logistics", "VoltEdge", "BluePeak", "SOC 2", "ISO 27001", "GDPR"]].map((name, index) => (
              <div key={`${name}-${index}`} className="rounded-xl border border-[#D4AF37]/15 bg-[#F8F4E3]/[0.06] px-8 py-4 text-lg font-semibold">{name}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="relative mx-auto max-w-7xl px-5 py-24">
        <SectionHeading eyebrow="Features" title="Enterprise workflows that feel intelligent from day one" />
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Unified Command Center", "One operating layer for every ERP module.", Gauge],
            ["Real-Time Event Fabric", "Every mutation can trigger workflows, alerts, AI, and audit events.", Zap],
            ["Workflow Automation", "Approval chains, escalations, exceptions, and cross-module actions.", Workflow],
            ["Executive Reporting", "Board-ready PDFs, analytics packs, and operational snapshots.", FileCheck2],
            ["Tenant Security", "RBAC, SSO, MFA, session governance, and audit trails.", ShieldCheck],
            ["Cloud Scale", "High-volume transactions for global enterprise teams.", Cloud],
          ].map(([cardTitle, description, Icon]: any) => (
            <FeatureCard
              key={cardTitle}
              title={cardTitle}
              description={description}
              Icon={Icon}
            />
          ))}
        </div>
      </section>

      <section id="modules" className="relative bg-[#1a120d]/70 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Modules" title="One ERP suite. Every enterprise function." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(([name, Icon]) => (
              <Glass key={name as string} className="group p-5 transition hover:-translate-y-1 hover:border-[#D4AF37]/50">
                <Icon className="h-7 w-7 text-[#D4AF37] transition group-hover:scale-110" />
                <p className="mt-5 text-lg font-semibold">{name as string}</p>
              </Glass>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-engine" className="relative mx-auto max-w-7xl px-5 py-24">
        <SectionHeading eyebrow="AI Engine" title="The AI Brain Behind Your Business" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aiCards.map(([cardTitle, description, Icon]: any) => (
            <FeatureCard
              key={cardTitle}
              title={cardTitle}
              description={description}
              Icon={Icon}
            />
          ))}
        </div>
      </section>

      <section className="relative bg-[#F8F4E3]/[0.035] py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="How It Works" title="Connect. Integrate. Automate. Scale." />
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {["Connect", "Integrate", "Automate", "Scale"].map((step, index) => (
              <Glass key={step} className="p-5"><p className="text-sm text-[#D4AF37]">0{index + 1}</p><h3 className="mt-5 text-xl font-semibold">{step}</h3><div className="mt-6 h-1 rounded-full bg-gradient-to-r from-[#B7410E] to-[#D4AF37]" /></Glass>
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="text-center"><SectionHeading eyebrow="Dashboard Showcase" title="Interactive executive previews" /></div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {Object.keys(dashboards).map((tab) => (
            <button key={tab} onClick={() => setActiveDashboard(tab as keyof typeof dashboards)} className={`rounded-xl px-5 py-3 font-semibold transition ${activeDashboard === tab ? "bg-gradient-to-r from-[#B7410E] to-[#D4AF37] text-[#0F0F0F]" : "border border-[#D4AF37]/20 bg-[#F8F4E3]/[0.06] hover:border-[#D4AF37]"}`}>{tab}</button>
          ))}
        </div>
        <Glass className="mx-auto mt-8 max-w-5xl p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div><p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">{activeDashboard}</p><h3 className="mt-3 text-3xl font-semibold">{title}</h3><p className="mt-6 text-6xl font-semibold text-[#D4AF37]">{metric}</p><p className="mt-2 text-[#F8F4E3]/60">{label}</p></div>
            <div className="space-y-3">{rows.map((row) => <div key={row} className="rounded-xl border border-[#D4AF37]/15 bg-[#0F0F0F]/60 p-4"><Check className="mr-2 inline h-5 w-5 text-emerald-300" />{row}</div>)}</div>
          </div>
        </Glass>
      </section>

      <section id="solutions" className="relative bg-[#1a120d]/70 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Solutions" title="Built for complex enterprise operating models" />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {["Global Finance Operations", "People & Payroll Cloud", "Supply Chain Intelligence", "Governance & Compliance"].map((solution) => (
              <Glass key={solution} className="p-6"><h3 className="text-xl font-semibold">{solution}</h3><p className="mt-3 leading-7 text-[#F8F4E3]/70">Deploy a secure, AI-powered operating layer for enterprise teams, workflows, evidence, and executive decisions.</p></Glass>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="text-center"><SectionHeading eyebrow="Pricing" title="Scale from pilot to global ERP transformation" /></div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[["Starter", "$499", "For growing ERP teams"], ["Professional", "$1,499", "For multi-module operations"], ["Enterprise", "Custom", "For global enterprises"]].map(([plan, price, subtitle]) => (
            <Glass key={plan} className={`p-7 ${plan === "Enterprise" ? "border-[#D4AF37]/60 bg-[#D4AF37]/10" : ""}`}>
              <p className="text-xl font-semibold">{plan}</p><p className="mt-4 text-4xl font-semibold text-[#D4AF37]">{price}</p><p className="mt-2 text-[#F8F4E3]/60">{subtitle}</p>
              <div className="mt-7 space-y-3">{["AI automation", "Enterprise dashboards", "SSO + MFA", "Audit-ready reporting"].map((feature) => <p key={feature} className="flex items-center gap-2"><Check className="h-5 w-5 text-emerald-300" /> {feature}</p>)}</div>
            </Glass>
          ))}
        </div>
      </section>

      <section className="relative bg-[#1a120d]/70 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading eyebrow="Security" title="Enterprise-grade security and compliance by design" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["End-to-End Encryption", "RBAC", "SSO", "MFA", "Audit Logs", "GDPR Compliance"].map((item) => <Glass key={item} className="p-5"><LockKeyhole className="h-6 w-6 text-[#D4AF37]" /><p className="mt-4 font-semibold">{item}</p></Glass>)}
          </div>
        </div>
      </section>

      <section id="about" className="relative mx-auto max-w-7xl px-5 py-24">
        <SectionHeading eyebrow="About" title="A modern ERP vision for AI-native enterprises" />
        <div className="mx-auto mt-10 max-w-4xl space-y-5 text-center text-lg leading-8 text-[#F8F4E3]/72">
          <p>Infinity Cloud is designed as a premium enterprise operating platform where every business event becomes intelligence: a workflow, notification, forecast, audit record, or executive insight.</p>
          <p>It brings cloud ERP modules, secure identity, analytics, compliance, automation, and AI assistance into one cohesive experience for global teams.</p>
        </div>
      </section>

      <section id="customer-proof" className="relative border-y border-white/10 bg-white/[0.025] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Customer Proof" title="Trusted by enterprise leaders" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ["A board-ready ERP platform with the polish of a premium SaaS product.", "Global Manufacturing CEO", "42% faster close cycle"],
              ["AI recommendations reduced manual escalation cycles across finance, supply chain, and projects.", "Chief Operations Officer", "31% fewer manual approvals"],
              ["Secure, beautiful, scalable, and built for real enterprise complexity.", "Group CIO", "99.99% platform uptime"],
            ].map(([quote, role, metric]) => (
              <Glass key={quote} className="p-7 transition hover:-translate-y-2 hover:border-[#A855F7]/50">
                <p className="text-xl font-semibold leading-8 text-white">“{quote}”</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-semibold text-[#06B6D4]">{role}</p>
                  <p className="mt-1 text-sm text-slate-300">Fortune 500 ERP Transformation</p>
                  <p className="mt-4 rounded-full bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white">{metric}</p>
                </div>
              </Glass>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[#D4AF37]/15 px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div><Logo /><p className="mt-4 max-w-sm text-[#F8F4E3]/60">AI-powered Cloud ERP for modern enterprise operations.</p></div>
          {["Product", "Company", "Resources", "Support"].map((col) => <div key={col}><p className="font-semibold text-[#D4AF37]">{col}</p><div className="mt-4 space-y-2 text-sm text-[#F8F4E3]/55"><p>Platform</p><p>Security</p><p>Docs</p><p>Contact</p></div></div>)}
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#D4AF37]/15 pt-6 text-sm text-[#F8F4E3]/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Infinity Cloud. All rights reserved.</p><p>Privacy Policy · Terms · Security</p>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mx-auto max-w-5xl text-center space-y-6">
      <p className="text-base font-extrabold uppercase tracking-[0.34em] text-[#06B6D4] md:text-lg">
        {eyebrow}
      </p>

      <h2 className="font-['Outfit','Inter',sans-serif] text-4xl font-extrabold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>

      <div className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-[#A855F7] to-transparent" />
    </div>
  );
}

function FeatureCard({ title, description, Icon }: { title: string; description: string; Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Glass className="group p-6 transition duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50">
      <Icon className="h-8 w-8 text-[#D4AF37]" />
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-[#F8F4E3]/70">{description}</p>
    </Glass>
  );
}
