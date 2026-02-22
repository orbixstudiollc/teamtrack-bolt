import React, { useState } from "react";
import {
  MessageSquare,
  Clock,
  Send,
  ChevronLeft,
  Image as ImageIcon,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ReviewStatus = "Approved" | "In Review" | "Needs Changes";

interface Reviewer {
  name: string;
  avatarColor: string;
}

interface Comment {
  id: string;
  author: string;
  avatarColor: string;
  content: string;
  timestamp: string;
}

interface DesignCard {
  id: string;
  title: string;
  description: string;
  status: ReviewStatus;
  reviewers: Reviewer[];
  commentCount: number;
  date: string;
  comments: Comment[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const designCards: DesignCard[] = [
  {
    id: "dr1",
    title: "Dashboard Analytics Redesign",
    description:
      "Updated analytics dashboard with new chart components, KPI cards, and real-time data indicators. Includes dark/light theme variants.",
    status: "Approved",
    reviewers: [
      { name: "Alice Johnson", avatarColor: "bg-[#7B61FF]" },
      { name: "Bob Smith", avatarColor: "bg-[#00C2FF]" },
    ],
    commentCount: 8,
    date: "Nov 8, 2025",
    comments: [
      {
        id: "c1",
        author: "Alice Johnson",
        avatarColor: "bg-[#7B61FF]",
        content:
          "The KPI cards look great. I like the subtle gradient on the metric values. Approved from my side.",
        timestamp: "Nov 8, 2025 at 2:34 PM",
      },
      {
        id: "c2",
        author: "Bob Smith",
        avatarColor: "bg-[#00C2FF]",
        content:
          "Agreed. The chart hover states are a nice touch. Ship it!",
        timestamp: "Nov 8, 2025 at 3:12 PM",
      },
      {
        id: "c3",
        author: "Carol Lee",
        avatarColor: "bg-[#FFB800]",
        content:
          "One small note: the tooltip on the bar chart could use slightly more padding on the left side. Otherwise looks perfect.",
        timestamp: "Nov 8, 2025 at 4:01 PM",
      },
    ],
  },
  {
    id: "dr2",
    title: "Employee Profile Page",
    description:
      "Complete employee profile view with personal info, team assignments, performance metrics, and activity timeline.",
    status: "In Review",
    reviewers: [
      { name: "Carol Lee", avatarColor: "bg-[#FFB800]" },
      { name: "David Kim", avatarColor: "bg-[#FF5C33]" },
      { name: "Eva Martinez", avatarColor: "bg-[#BFFF00]" },
    ],
    commentCount: 5,
    date: "Nov 10, 2025",
    comments: [
      {
        id: "c4",
        author: "Carol Lee",
        avatarColor: "bg-[#FFB800]",
        content:
          "The activity timeline component is well structured. Can we add filtering by activity type?",
        timestamp: "Nov 10, 2025 at 10:15 AM",
      },
      {
        id: "c5",
        author: "David Kim",
        avatarColor: "bg-[#FF5C33]",
        content:
          "Looking good overall. The performance chart needs axis labels to improve readability.",
        timestamp: "Nov 10, 2025 at 11:42 AM",
      },
    ],
  },
  {
    id: "dr3",
    title: "Mobile Navigation Patterns",
    description:
      "Navigation redesign for the mobile app including bottom tab bar, side drawer, and contextual action menus.",
    status: "Needs Changes",
    reviewers: [
      { name: "Frank Chen", avatarColor: "bg-[#7B61FF]" },
      { name: "Grace Liu", avatarColor: "bg-[#00C2FF]" },
    ],
    commentCount: 12,
    date: "Nov 6, 2025",
    comments: [
      {
        id: "c6",
        author: "Frank Chen",
        avatarColor: "bg-[#7B61FF]",
        content:
          "The bottom tab bar icons need to be 24px to meet touch target requirements. Currently they appear to be 20px.",
        timestamp: "Nov 6, 2025 at 9:20 AM",
      },
      {
        id: "c7",
        author: "Grace Liu",
        avatarColor: "bg-[#00C2FF]",
        content:
          "The side drawer animation feels too fast. Can we increase the transition duration to 300ms? Also, the overlay opacity should be 60% not 40%.",
        timestamp: "Nov 6, 2025 at 10:05 AM",
      },
      {
        id: "c8",
        author: "Frank Chen",
        avatarColor: "bg-[#7B61FF]",
        content:
          "Additionally, the active state on the tab bar items needs better contrast. Consider using the primary green for the active icon.",
        timestamp: "Nov 6, 2025 at 11:30 AM",
      },
    ],
  },
  {
    id: "dr4",
    title: "Onboarding Flow Screens",
    description:
      "Step-by-step onboarding wizard with progress indicator, form validation states, and completion celebration animation.",
    status: "In Review",
    reviewers: [
      { name: "Henry Park", avatarColor: "bg-[#FFB800]" },
      { name: "Iris Wang", avatarColor: "bg-[#FF5C33]" },
    ],
    commentCount: 3,
    date: "Nov 11, 2025",
    comments: [
      {
        id: "c9",
        author: "Henry Park",
        avatarColor: "bg-[#FFB800]",
        content:
          "The progress indicator is clean and intuitive. Nice use of the step completion checkmarks.",
        timestamp: "Nov 11, 2025 at 1:00 PM",
      },
      {
        id: "c10",
        author: "Iris Wang",
        avatarColor: "bg-[#FF5C33]",
        content:
          "Form validation error states should use the destructive red. Currently they look like they are using a different shade.",
        timestamp: "Nov 11, 2025 at 2:15 PM",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStatusStyle(status: ReviewStatus): { bg: string; text: string } {
  switch (status) {
    case "Approved":
      return { bg: "bg-[#BFFF00]/10", text: "text-[#BFFF00]" };
    case "In Review":
      return { bg: "bg-[#00C2FF]/10", text: "text-[#00C2FF]" };
    case "Needs Changes":
      return { bg: "bg-[#FF5C33]/10", text: "text-[#FF5C33]" };
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ---------------------------------------------------------------------------
// Design Review Card
// ---------------------------------------------------------------------------

const ReviewCard: React.FC<{
  card: DesignCard;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ card, isSelected, onSelect }) => {
  const statusStyle = getStatusStyle(card.status);

  return (
    <div
      onClick={onSelect}
      className={`bg-[#111] border rounded-none cursor-pointer transition-colors flex flex-col ${
        isSelected
          ? "border-[#BFFF00]"
          : "border-[#1A1A1A] hover:border-[#333]"
      }`}
    >
      {/* Placeholder image area (16:9) */}
      <div className="relative aspect-video bg-[#0A0A0A] flex items-center justify-center border-b border-[#1A1A1A]">
        <div className="flex flex-col items-center gap-2 text-[#6e6e6e]">
          <ImageIcon className="w-8 h-8 opacity-40" />
          <span className="font-[Inter] text-[11px] opacity-60">
            Design Preview
          </span>
        </div>

        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <Badge
            className={`${statusStyle.bg} ${statusStyle.text} rounded-none text-[10px] font-medium px-2 py-0.5 backdrop-blur-sm`}
          >
            {card.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title & Description */}
        <div className="flex flex-col gap-1">
          <h3 className="font-[JetBrains_Mono] text-sm font-semibold text-white leading-tight">
            {card.title}
          </h3>
          <p className="font-[Inter] text-xs text-[#6e6e6e] leading-relaxed line-clamp-2">
            {card.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          {/* Reviewer avatars */}
          <div className="flex -space-x-1.5">
            {card.reviewers.map((reviewer) => (
              <Avatar
                key={reviewer.name}
                fallback={getInitials(reviewer.name)}
                className={`w-6 h-6 rounded-none border-2 border-[#111] text-[8px] font-semibold text-black ${reviewer.avatarColor}`}
              />
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#6e6e6e]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-[JetBrains_Mono] text-[11px]">
                {card.commentCount}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#6e6e6e]">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-[Inter] text-[11px]">{card.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Comment Thread
// ---------------------------------------------------------------------------

const CommentThread: React.FC<{
  card: DesignCard;
  onClose: () => void;
}> = ({ card, onClose }) => {
  const [newComment, setNewComment] = useState("");
  const statusStyle = getStatusStyle(card.status);

  return (
    <div className="bg-[#111] border border-[#1A1A1A] rounded-none flex flex-col">
      {/* Thread header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1A1A1A]">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="text-[#6e6e6e] hover:text-white transition-colors lg:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="font-[JetBrains_Mono] text-sm font-semibold text-white truncate">
              {card.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                className={`${statusStyle.bg} ${statusStyle.text} rounded-none text-[10px] font-medium px-1.5 py-0.5`}
              >
                {card.status}
              </Badge>
              <span className="font-[Inter] text-[11px] text-[#6e6e6e]">
                {card.comments.length} comments
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 max-h-[500px]">
        {card.comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar
              fallback={getInitials(comment.author)}
              className={`w-7 h-7 rounded-none text-[9px] font-semibold text-black shrink-0 ${comment.avatarColor}`}
            />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-[JetBrains_Mono] text-xs font-medium text-white">
                  {comment.author}
                </span>
                <span className="font-[Inter] text-[10px] text-[#6e6e6e]">
                  {comment.timestamp}
                </span>
              </div>
              <p className="font-[Inter] text-sm text-[#6e6e6e] leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* New comment input */}
      <div className="p-4 border-t border-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none px-3 py-2 font-[Inter] text-sm text-white placeholder:text-[#6e6e6e] focus:outline-none focus:border-[#BFFF00] transition-colors"
          />
          <Button
            className="bg-[#BFFF00] text-black rounded-none p-2 hover:bg-[#BFFF00]/90 transition-colors"
            aria-label="Send comment"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const DesignReview: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const selectedCard = designCards.find((c) => c.id === selectedCardId) ?? null;

  // Summary counts
  const approvedCount = designCards.filter(
    (c) => c.status === "Approved"
  ).length;
  const inReviewCount = designCards.filter(
    (c) => c.status === "In Review"
  ).length;
  const needsChangesCount = designCards.filter(
    (c) => c.status === "Needs Changes"
  ).length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <PageHeader
          title="Design Review"
          subtitle="Sprint 14 deliverables"
        />

        {/* Summary chips */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#111] border border-[#1A1A1A] rounded-none px-3 py-2">
            <span className="w-2 h-2 rounded-none bg-[#BFFF00]" />
            <span className="font-[JetBrains_Mono] text-xs text-[#6e6e6e]">
              Approved
            </span>
            <span className="font-[JetBrains_Mono] text-xs text-white font-medium">
              {approvedCount}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#111] border border-[#1A1A1A] rounded-none px-3 py-2">
            <span className="w-2 h-2 rounded-none bg-[#00C2FF]" />
            <span className="font-[JetBrains_Mono] text-xs text-[#6e6e6e]">
              In Review
            </span>
            <span className="font-[JetBrains_Mono] text-xs text-white font-medium">
              {inReviewCount}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#111] border border-[#1A1A1A] rounded-none px-3 py-2">
            <span className="w-2 h-2 rounded-none bg-[#FF5C33]" />
            <span className="font-[JetBrains_Mono] text-xs text-[#6e6e6e]">
              Needs Changes
            </span>
            <span className="font-[JetBrains_Mono] text-xs text-white font-medium">
              {needsChangesCount}
            </span>
          </div>
        </div>

        {/* Main content layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Design cards grid */}
          <div
            className={`${
              selectedCard ? "lg:w-3/5" : "w-full"
            } transition-all duration-300`}
          >
            <div
              className={`grid gap-4 ${
                selectedCard
                  ? "grid-cols-1 xl:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {designCards.map((card) => (
                <ReviewCard
                  key={card.id}
                  card={card}
                  isSelected={selectedCardId === card.id}
                  onSelect={() =>
                    setSelectedCardId(
                      selectedCardId === card.id ? null : card.id
                    )
                  }
                />
              ))}
            </div>
          </div>

          {/* Comment thread panel (Desktop) */}
          {selectedCard && (
            <div className="hidden lg:block lg:w-2/5 lg:sticky lg:top-8 lg:self-start">
              <CommentThread
                card={selectedCard}
                onClose={() => setSelectedCardId(null)}
              />
            </div>
          )}
        </div>

        {/* Comment thread (Mobile - full width below cards) */}
        {selectedCard && (
          <div className="lg:hidden">
            <CommentThread
              card={selectedCard}
              onClose={() => setSelectedCardId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignReview;
