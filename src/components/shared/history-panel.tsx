import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Typography from "components/typography";
import Icon from "components/icon";
import Select from "components/select";
import Pagination from "components/table/pagination";
import { useAppTranslation } from "locale/useAppTranslation";;
import { AuditTrailResponse, AuditTrailEntry } from "_interfaces/audit-trail.interfaces";
import { DateGroup } from "hooks/shared/useHistoryPanel";

interface HistoryPanelProps {
  open: boolean;
  onClose: () => void;
  historyData: AuditTrailResponse | null;
  groupedEntries: DateGroup[];
  filterAction: string;
  onFilterChange: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  testIdPrefix?: string;
}

const actionColorMap: Record<string, { bg: string; text: string }> = {
  CREATE: { bg: "bg-success-100", text: "text-success-600" },
  UPDATE: { bg: "bg-info-100", text: "text-info-600" },
  STATUS_CHANGE: { bg: "bg-warning-100", text: "text-warning-600" },
};

const actionLabelMap: Record<string, string> = {
  CREATE: "action-create",
  UPDATE: "action-update",
  STATUS_CHANGE: "action-status-change",
};

const formatTime = (timestamp: string): string => {
  const d = new Date(timestamp);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

const formatMetaDate = (timestamp: string): string => {
  if (timestamp === "—") return "—";
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const HistoryTimelineEntry: React.FC<{
  entry: AuditTrailEntry;
  t: (key: any, opts?: any) => string;
}> = ({ entry, t }) => {
  const colors = actionColorMap[entry.action] ?? actionColorMap.UPDATE;
  const labelKey = actionLabelMap[entry.action] ?? "action-update";

  return (
    <div className="flex gap-3 pb-4">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1 ${colors.bg} border-2 border-current ${colors.text}`} />
        <div className="w-px flex-1 bg-border" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
            {t(labelKey)}
          </span>
          <Typography variant="bodyExtraSmall" tone="muted">
            {formatTime(entry.timestamp)}
          </Typography>
        </div>

        {entry.action === "CREATE" ? (
          <Typography variant="bodySmall">
            {t("data-created")}
          </Typography>
        ) : (
          <div className="flex flex-col gap-1">
            {entry.changes.map((change, idx) => (
              <Typography key={idx} variant="bodySmall">
                {t("change-description", {
                  field: change.field,
                  oldValue: change.old_value,
                  newValue: change.new_value,
                })}
              </Typography>
            ))}
            {entry.changes.length > 0 && (
              <Typography variant="bodyExtraSmall" tone="muted">
                {t("fields-label")}: {entry.changes.map((c) => c.field).join(", ")}
              </Typography>
            )}
          </div>
        )}

        <Typography variant="bodyExtraSmall" tone="muted" className="mt-1">
          {entry.changed_by_name}
        </Typography>
      </div>
    </div>
  );
};

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  open,
  onClose,
  historyData,
  groupedEntries,
  filterAction,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  testIdPrefix = "history-panel",
}) => {
  const { t } = useAppTranslation("historyPanel");

  // Escape key close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filterOptions = [
    { label: t("filter-all"), value: "all" },
    { label: t("filter-create"), value: "CREATE" },
    { label: t("filter-update"), value: "UPDATE" },
    { label: t("filter-status-change"), value: "STATUS_CHANGE" },
  ];

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[997] bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        data-testid={`${testIdPrefix}-backdrop`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[997] h-screen w-[480px] bg-white shadow-lg flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid={testIdPrefix}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-border">
          <div>
            <Typography variant="heading5" as="h2">
              {t("title")}
            </Typography>
            <Typography variant="bodyExtraSmall" tone="muted" className="mt-1">
              {t("subtitle")}
            </Typography>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-greyScale-90 rounded-lg transition-colors cursor-pointer"
            data-testid={`${testIdPrefix}-close`}
          >
            <Icon name="close-2" size={20} />
          </button>
        </div>

        {/* Meta info */}
        {historyData && (
          <div className="px-6 py-3 border-b border-border grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-0.5">
              <Typography variant="bodyExtraSmall" tone="muted">
                {t("created-by")}
              </Typography>
              <Typography variant="bodySmall">
                {historyData.meta.created_by_name}, {formatMetaDate(historyData.meta.created_at)}
              </Typography>
            </div>
            <div className="flex flex-col gap-0.5">
              <Typography variant="bodyExtraSmall" tone="muted">
                {t("last-update-by")}
              </Typography>
              <Typography variant="bodySmall">
                {historyData.meta.last_updated_by_name}, {formatMetaDate(historyData.meta.last_updated_at)}
              </Typography>
            </div>
          </div>
        )}

        {/* Filter + Pagination */}
        <div className="px-6 py-3 border-b border-border flex items-center justify-between gap-3">
          <div className="w-40">
            <Select
              options={filterOptions}
              value={filterAction}
              onValueChange={(val) => onFilterChange(val as string)}
              data-testid={`${testIdPrefix}-filter`}
            />
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>

        {/* Timeline entries */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {groupedEntries.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Typography variant="bodySmall" tone="muted">
                No history data
              </Typography>
            </div>
          ) : (
            groupedEntries.map((group) => (
              <div key={group.date} className="mb-4">
                <Typography variant="bodyExtraSmall" className="font-semibold mb-3 text-text-secondary">
                  {group.dateLabel}
                </Typography>
                {group.entries.map((entry) => (
                  <HistoryTimelineEntry key={entry.id} entry={entry} t={t} />
                ))}
              </div>
            ))
          )}
        </div>
      </aside>
    </>,
    document.body,
  );
};

export default HistoryPanel;
