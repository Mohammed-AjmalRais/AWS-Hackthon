"use client";

import React from "react";
import { X, CheckCircle2, ShieldCheck, Terminal, Bot, Server, Database, Cloud } from "lucide-react";

interface AwsArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AwsArchitectureModal: React.FC<AwsArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Title & Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-indigo-100 px-3 py-1 font-mono text-xs font-semibold text-indigo-800">
            WeMakeDevs × AWS First Commit Architecture
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="size-3" /> Ship It & Build It Dual Compliant
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          JanSetu AI: Technical Architecture & AWS Tech Stack
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          How JanSetu AI integrates AWS open-source tools with AWS Cloud services to eliminate hallucination in civic policy decisions.
        </p>

        {/* Architecture Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* AWS Cedar */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
              <ShieldCheck className="size-5" />
              AWS Cedar Policy Engine
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Deterministic rule evaluation. Prevents LLM hallucination on legal income ceilings, caste categories, and educational stages using declarative <code className="text-indigo-600 font-mono">permit(...)</code> policies.
            </p>
            <div className="mt-3 rounded bg-indigo-950 p-2 font-mono text-[10px] text-indigo-200">
              cedar/policies/scholarships.cedar
            </div>
          </div>

          {/* Amazon Bedrock */}
          <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4">
            <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm">
              <Bot className="size-5" />
              Amazon Bedrock (Claude 3.5)
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Powers the vernacular voice/text assistant. Synthesizes dense government gazettes into empathetic, plain-language explanations in English and Hindi.
            </p>
            <div className="mt-3 rounded bg-purple-950 p-2 font-mono text-[10px] text-purple-200">
              BedrockRuntimeClient.invokeModel()
            </div>
          </div>

          {/* SAM & LocalStack */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
              <Terminal className="size-5" />
              AWS SAM CLI & LocalStack
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Complete serverless declaration in <code className="font-mono text-amber-700">template.yaml</code>. Enables 100% free local execution of API Gateway, Lambda, and DynamoDB without cloud bills.
            </p>
            <div className="mt-3 rounded bg-amber-950 p-2 font-mono text-[10px] text-amber-200">
              sam local start-api (Build It Track)
            </div>
          </div>

          {/* DynamoDB */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
              <Database className="size-5 text-blue-600" />
              Amazon DynamoDB
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Serverless single-table storage for scheme metadata, CSC directory, and user application dossiers. Scales to zero with zero idle cost.
            </p>
            <div className="mt-3 rounded bg-slate-900 p-2 font-mono text-[10px] text-slate-300">
              JanSetuSchemes & JanSetuDossiers
            </div>
          </div>

          {/* S3 Storage */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
              <Server className="size-5 text-emerald-600" />
              Amazon S3 Storage
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Stores official government gazette PDFs, official bank mandate forms (NPCI Annexure I), and ephemeral pre-flight document scans with Aadhaar masking.
            </p>
            <div className="mt-3 rounded bg-slate-900 p-2 font-mono text-[10px] text-slate-300">
              jansetu-templates-bucket
            </div>
          </div>

          {/* AWS Amplify */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
              <Cloud className="size-5 text-indigo-600" />
              AWS Amplify Hosting
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Next.js App Router deployed live via <code className="font-mono text-slate-700">amplify.yml</code>. Global CDN, SSL certificates, and zero-downtime updates.
            </p>
            <div className="mt-3 rounded bg-slate-900 p-2 font-mono text-[10px] text-slate-300">
              Amplify Hosting (Ship It Track)
            </div>
          </div>
        </div>

        {/* Verification of Open Source & Cloud Synergy */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <h4 className="font-semibold text-emerald-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            Why this architecture wins: Decoupling Policy from AI
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-emerald-800">
            A major mistake in civic tech is letting an LLM decide who gets a scholarship. If an LLM hallucinates an income cutoff, a poor student is denied education. In JanSetu AI, <strong>AWS Cedar policies make 100% deterministic, audit-trail verified legal decisions</strong>, while <strong>Amazon Bedrock provides human empathy, translation, and conversational guidance</strong>.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
