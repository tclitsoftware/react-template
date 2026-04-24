import { useMemo, useState } from "react";
import { generateMockAuditTrail } from "data/audit-trail-mock";
import { AuditTrailEntry, AuditTrailResponse } from "_interfaces/audit-trail.interfaces";

export interface DateGroup {
  date: string;
  dateLabel: string;
  entries: AuditTrailEntry[];
}

const formatDateLabel = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatted = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (isSameDay(date, today)) return `Today, ${formatted.split(", ").slice(1).join(", ")}`;
  if (isSameDay(date, yesterday)) return `Yesterday, ${formatted.split(", ").slice(1).join(", ")}`;
  return formatted;
};

const getDateKey = (timestamp: string): string => {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const ITEMS_PER_PAGE = 5;

const useHistoryPanel = (entityType: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState<string | number | null>(null);
  const [selectedEntityLabel, setSelectedEntityLabel] = useState<string>("");
  const [filterAction, setFilterAction] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const openPanel = (entityId: string | number, entityLabel?: string) => {
    setSelectedEntityId(entityId);
    setSelectedEntityLabel(entityLabel ?? "");
    setFilterAction("all");
    setCurrentPage(1);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setSelectedEntityId(null);
    setSelectedEntityLabel("");
  };

  // TODO: replace with API call GET /audit-trails?entity_type=...&entity_id=...
  const historyData: AuditTrailResponse | null = useMemo(() => {
    if (selectedEntityId == null) return null;
    return generateMockAuditTrail(entityType, selectedEntityId);
  }, [entityType, selectedEntityId]);

  const filteredEntries = useMemo(() => {
    if (!historyData) return [];
    if (filterAction === "all") return historyData.data;
    return historyData.data.filter((e) => e.action === filterAction);
  }, [historyData, filterAction]);

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE);

  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEntries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEntries, currentPage]);

  const groupedEntries: DateGroup[] = useMemo(() => {
    const groups: Record<string, AuditTrailEntry[]> = {};
    for (const entry of paginatedEntries) {
      const key = getDateKey(entry.timestamp);
      if (!groups[key]) groups[key] = [];
      groups[key].push(entry);
    }

    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([dateKey, entries]) => ({
        date: dateKey,
        dateLabel: formatDateLabel(entries[0].timestamp),
        entries,
      }));
  }, [paginatedEntries]);

  return {
    isOpen,
    openPanel,
    closePanel,
    selectedEntityId,
    selectedEntityLabel,
    historyData,
    groupedEntries,
    filterAction,
    setFilterAction,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};

export default useHistoryPanel;
