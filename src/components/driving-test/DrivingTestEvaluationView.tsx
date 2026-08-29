"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Text";
import {
  CheckIcon,
  ShieldIcon,
  AwardIcon,
  ArrowRightIcon,
  DownloadIcon,
  RotateCcwIcon,
} from "@/components/ui/Icons";

export interface DrivingTestEvaluationViewProps {
  onProceedToUpdatedLicence: () => void;
  onBackToDashboard?: () => void;
}

export function DrivingTestEvaluationView({
  onProceedToUpdatedLicence,
  onBackToDashboard,
}: DrivingTestEvaluationViewProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [testComplete, setTestComplete] = useState(true);

  const handleRetestSimulation = () => {
    setIsSimulating(true);
    setTestComplete(false);
    setTimeout(() => {
      setIsSimulating(false);
      setTestComplete(true);
    }, 1500);
  };

  const testSensors = [
    {
      id: "sensor_8",
      name: "Figure of '8' Track Maneuver",
      category: "Balance & Steering Control",
      metric: "Foot downs: 0 · Border sensor triggers: 0",
      score: "25 / 25",
      status: "PASSED",
      passColor: "var(--color-success)",
    },
    {
      id: "sensor_incline",
      name: "Gradient / Incline Restart",
      category: "Clutch & Rollback Sensor",
      metric: "Rollback: 0 mm (Statutory Max: 50 mm)",
      score: "25 / 25",
      status: "PASSED",
      passColor: "var(--color-success)",
    },
    {
      id: "sensor_brake",
      name: "Emergency Braking & Stopping Distance",
      category: "Sensor Speed & Halting Zone",
      metric: "Stop distance: 3.2m · Stop box accuracy: 100%",
      score: "23 / 25",
      status: "PASSED",
      passColor: "var(--color-success)",
    },
    {
      id: "sensor_signals",
      name: "Traffic Signal & Indicator Compliance",
      category: "Road Safety & Hand Signals",
      metric: "Turn indicators: 100% · RFID helmet verified",
      score: "25 / 25",
      status: "PASSED",
      passColor: "var(--color-success)",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* 1. Track & Session Banner */}
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-gradient-to-r from-[#003366] to-[#0B57D0] p-6 text-white shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[0.6875rem] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
                Automated Driving Test Track (ADTT)
              </span>
              <span className="text-xs text-white/80 font-mono">
                Track ID: ADTT-DEL-04-JNK
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              MCWG Driving Skill Test · Official Evaluation Results
            </h1>
            <p className="text-xs text-white/90">
              Sensor-based automated telemetry conducted at RTO Janakpuri Automated Testing Centre.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <div className="rounded-lg bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 text-center backdrop-blur-sm">
              <span className="text-[0.625rem] font-bold uppercase tracking-wider text-emerald-200 block">
                Official Result
              </span>
              <span className="text-lg font-black text-emerald-300">
                {isSimulating ? "EVALUATING..." : "TEST PASSED"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Candidate & Test Telemetry Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card padding="md" className="space-y-2 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
            Applicant & Licence Details
          </span>
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm text-[var(--color-ink)]">Advait Sharma</p>
            <p className="font-mono text-[var(--color-primary)] font-semibold">DL-0420110023456</p>
            <p className="text-[var(--color-muted)]">Test Class: <strong>MCWG (Two-Wheeler with Gear)</strong></p>
          </div>
        </Card>

        <Card padding="md" className="space-y-2 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
            Test Slot & Jurisdiction
          </span>
          <div className="text-xs space-y-1">
            <p className="font-bold text-[var(--color-ink)]">RTO Janakpuri, West Delhi (DL-04)</p>
            <p className="text-[var(--color-muted)]">Date: <strong>Mon, 16 Sep 2024 (09:30 AM)</strong></p>
            <p className="text-[var(--color-muted)]">App Ref: <span className="font-mono font-bold">SJ-MCWG-2048</span></p>
          </div>
        </Card>

        <Card padding="md" className="space-y-2 bg-[var(--color-surface)] border border-[var(--color-border)]">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-muted)] block">
            Automated Score Summary
          </span>
          <div className="text-xs space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-black text-emerald-600">98 / 100 Points</span>
              <Badge tone="success" size="sm">Min Pass: 80%</Badge>
            </div>
            <p className="text-[var(--color-muted)]">Sensor Penality Points: <strong>0</strong></p>
            <p className="text-emerald-700 font-semibold flex items-center gap-1">
              <CheckIcon size="sm" className="text-emerald-600" />
              Verified by Licensing Officer
            </p>
          </div>
        </Card>
      </div>

      {/* 3. Sensor-by-Sensor Automated Track Results */}
      <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
          <div>
            <Heading as="h2" variant="section" className="text-base font-bold text-[var(--color-ink)]">
              Automated Sensor Track Breakdown
            </Heading>
            <Text variant="caption" className="text-xs text-[var(--color-muted)]">
              Central Motor Vehicles Rules (CMVR) Rule 15 Skill Evaluation
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="success" icon={<CheckIcon size="sm" />}>
              4 of 4 Tracks Passed
            </Badge>
          </div>
        </div>

        {isSimulating ? (
          <div className="py-12 text-center space-y-3">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent align-[-0.125em]" />
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              Simulating sensor track evaluation telemetry...
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {testSensors.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 space-y-2 transition-all hover:border-[var(--color-primary)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[0.6875rem] font-bold text-[var(--color-muted)] uppercase tracking-wider">
                      Module {idx + 1} · {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--color-ink)]">
                      {item.name}
                    </h3>
                  </div>
                  <Badge tone="success" size="sm">
                    {item.status}
                  </Badge>
                </div>

                <p className="text-xs text-[var(--color-text)] font-medium">
                  {item.metric}
                </p>

                <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs">
                  <span className="text-[var(--color-muted)]">Score:</span>
                  <span className="font-bold text-emerald-700">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Central Portal Sync Confirmation Alert */}
        <div className="rounded-[var(--radius-sm)] border border-emerald-300 bg-emerald-50/80 p-4.5 flex items-start gap-3.5">
          <div className="rounded-full bg-emerald-100 p-2 text-emerald-700 shrink-0">
            <CheckIcon size="md" className="stroke-[2.5]" />
          </div>
          <div className="space-y-1 text-xs text-emerald-950">
            <p className="font-bold text-sm text-emerald-900">
              Test Result Synchronized with Sarathi Central Database
            </p>
            <p className="leading-relaxed text-emerald-800">
              Your test qualification has been digitally recorded and transmitted to the Sarathi Central Registry under Application <strong>SJ-MCWG-2048</strong>. The Licensing Authority has cleared your endorsement for final driving licence issuance.
            </p>
          </div>
        </div>

        {/* 5. Bottom Navigation Actions */}
        <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<RotateCcwIcon size="sm" />}
              onClick={handleRetestSimulation}
              disabled={isSimulating}
              className="text-xs"
            >
              Re-run Track Telemetry
            </Button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onBackToDashboard && (
              <Button
                variant="ghost"
                size="md"
                onClick={onBackToDashboard}
                className="text-xs font-semibold"
              >
                Back to Timeline
              </Button>
            )}

            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRightIcon size="md" />}
              onClick={onProceedToUpdatedLicence}
              className="w-full sm:w-auto font-bold shadow-md bg-emerald-600 hover:bg-emerald-700 border-emerald-700"
            >
              Proceed to Updated Driving Licence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
