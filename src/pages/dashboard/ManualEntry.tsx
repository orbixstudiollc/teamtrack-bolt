import { useState, type FormEvent } from "react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Toggle from "../../components/Toggle";
import Button from "../../components/Button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface EntryFormState {
  project: string;
  task: string;
  date: string;
  startTime: string;
  endTime: string;
  billable: boolean;
  notes: string;
}

/* ------------------------------------------------------------------ */
/*  Static options                                                     */
/* ------------------------------------------------------------------ */

const PROJECT_OPTIONS = [
  "Design System",
  "API Integration",
  "Code Review",
  "Team Meetings",
  "Bug Fixes",
  "Documentation",
  "Research & Development",
] as const;

const TASK_OPTIONS: Record<string, string[]> = {
  "Design System": [
    "Component Library Updates",
    "Design Tokens",
    "Accessibility Audit",
  ],
  "API Integration": [
    "REST Endpoint Development",
    "GraphQL Schema",
    "Auth Flow",
  ],
  "Code Review": ["PR Review & Feedback", "Architecture Review"],
  "Team Meetings": ["Sprint Planning", "Daily Standup", "Retrospective"],
  "Bug Fixes": [
    "Critical Issue Resolution",
    "Performance Optimization",
    "UI Defects",
  ],
  Documentation: ["API Docs & Guides", "Onboarding Docs", "Changelog"],
  "Research & Development": [
    "Proof of Concept",
    "Technology Evaluation",
    "Prototyping",
  ],
};

const INITIAL_STATE: EntryFormState = {
  project: "",
  task: "",
  date: "2025-11-15",
  startTime: "09:00",
  endTime: "10:00",
  billable: true,
  notes: "",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ManualEntry() {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState<EntryFormState>(INITIAL_STATE);

  /* ----- helpers -------------------------------------------------- */

  function update<K extends keyof EntryFormState>(
    key: K,
    value: EntryFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // In a real app this would POST to an API
    console.info("[ManualEntry] save", form);
    setOpen(false);
  }

  function handleCancel() {
    setForm(INITIAL_STATE);
    setOpen(false);
  }

  const availableTasks = form.project ? TASK_OPTIONS[form.project] ?? [] : [];

  /* ----- render --------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fallback content shown when the modal is dismissed */}
      {!open && (
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-24">
          <p className="font-secondary text-sm text-muted-foreground">
            Entry form closed.
          </p>
          <Button variant="primary" onClick={() => setOpen(true)}>
            New Entry
          </Button>
        </div>
      )}

      {/* Modal form */}
      <Modal
        open={open}
        onClose={handleCancel}
        title="Manual Time Entry"
        description="Log your work hours manually"
        footer={
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Entry
            </Button>
          </div>
        }
      >
        <form
          id="manual-entry-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Project */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="me-project"
              className="font-secondary text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Project
            </label>
            <Input
              id="me-project"
              as="select"
              value={form.project}
              onChange={(e) => {
                update("project", e.target.value);
                update("task", "");
              }}
            >
              <option value="" disabled>
                Select a project
              </option>
              {PROJECT_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Input>
          </div>

          {/* Task */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="me-task"
              className="font-secondary text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Task
            </label>
            <Input
              id="me-task"
              as="select"
              value={form.task}
              onChange={(e) => update("task", e.target.value)}
              disabled={availableTasks.length === 0}
            >
              <option value="" disabled>
                {form.project ? "Select a task" : "Select a project first"}
              </option>
              {availableTasks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Input>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="me-date"
              className="font-secondary text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Date
            </label>
            <Input
              id="me-date"
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
            />
          </div>

          {/* Start / End Time (side-by-side) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="me-start"
                className="font-secondary text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                Start Time
              </label>
              <Input
                id="me-start"
                type="time"
                value={form.startTime}
                onChange={(e) => update("startTime", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="me-end"
                className="font-secondary text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                End Time
              </label>
              <Input
                id="me-end"
                type="time"
                value={form.endTime}
                onChange={(e) => update("endTime", e.target.value)}
              />
            </div>
          </div>

          {/* Billable Toggle */}
          <div className="flex items-center justify-between border border-border bg-[#0A0A0A] px-4 py-3">
            <div>
              <p className="font-secondary text-sm font-medium text-foreground">
                Billable
              </p>
              <p className="font-secondary text-xs text-muted-foreground">
                Mark this entry as billable hours
              </p>
            </div>
            <Toggle
              checked={form.billable}
              onChange={(checked) => update("billable", checked)}
              aria-label="Billable toggle"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="me-notes"
              className="font-secondary text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Notes
            </label>
            <textarea
              id="me-notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full resize-none rounded-none border border-border bg-card px-3 py-2 font-secondary text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
