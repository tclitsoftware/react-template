import { AuditTrailEntry, AuditTrailResponse } from "_interfaces/audit-trail.interfaces";

const vehicleTypeHistory: AuditTrailEntry[] = [
  {
    id: "at-001",
    entity_type: "vehicle_type",
    entity_id: "1",
    action: "UPDATE",
    changes: [
      { field: "vehicle_type_name", old_value: "Truk", new_value: "CDD Box" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T10:30:00Z",
  },
  {
    id: "at-002",
    entity_type: "vehicle_type",
    entity_id: "1",
    action: "STATUS_CHANGE",
    changes: [
      { field: "status", old_value: "inactive", new_value: "active" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T09:15:00Z",
  },
  {
    id: "at-003",
    entity_type: "vehicle_type",
    entity_id: "1",
    action: "UPDATE",
    changes: [
      { field: "temp_option", old_value: "Freezer", new_value: "Dry" },
    ],
    changed_by_name: "Yuda",
    timestamp: "2026-03-24T14:20:00Z",
  },
  {
    id: "at-004",
    entity_type: "vehicle_type",
    entity_id: "1",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-23T08:00:00Z",
  },
  {
    id: "at-005",
    entity_type: "vehicle_type",
    entity_id: "2",
    action: "UPDATE",
    changes: [
      { field: "vehicle_type_name", old_value: "CDD Reefer", new_value: "CDD Freezer" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T11:00:00Z",
  },
  {
    id: "at-006",
    entity_type: "vehicle_type",
    entity_id: "2",
    action: "STATUS_CHANGE",
    changes: [
      { field: "status", old_value: "inactive", new_value: "active" },
    ],
    changed_by_name: "Yuda",
    timestamp: "2026-03-24T16:45:00Z",
  },
  {
    id: "at-007",
    entity_type: "vehicle_type",
    entity_id: "2",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-22T09:30:00Z",
  },
  {
    id: "at-008",
    entity_type: "vehicle_type",
    entity_id: "3",
    action: "UPDATE",
    changes: [
      { field: "vehicle_type_name", old_value: "CDE Dry", new_value: "CDE Box" },
      { field: "is_chassis", old_value: "true", new_value: "false" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T08:45:00Z",
  },
  {
    id: "at-009",
    entity_type: "vehicle_type",
    entity_id: "3",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-21T10:00:00Z",
  },
  {
    id: "at-010",
    entity_type: "vehicle_type",
    entity_id: "4",
    action: "STATUS_CHANGE",
    changes: [
      { field: "status", old_value: "active", new_value: "inactive" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T07:30:00Z",
  },
  {
    id: "at-011",
    entity_type: "vehicle_type",
    entity_id: "4",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-20T11:15:00Z",
  },
  {
    id: "at-012",
    entity_type: "vehicle_type",
    entity_id: "5",
    action: "UPDATE",
    changes: [
      { field: "vehicle_type_name", old_value: "Fuso Dry", new_value: "Fuso Box" },
    ],
    changed_by_name: "Yuda",
    timestamp: "2026-03-25T13:00:00Z",
  },
  {
    id: "at-013",
    entity_type: "vehicle_type",
    entity_id: "5",
    action: "STATUS_CHANGE",
    changes: [
      { field: "status", old_value: "inactive", new_value: "active" },
    ],
    changed_by_name: "Yuda",
    timestamp: "2026-03-24T10:30:00Z",
  },
  {
    id: "at-014",
    entity_type: "vehicle_type",
    entity_id: "5",
    action: "CREATE",
    changes: [],
    changed_by_name: "Yuda",
    timestamp: "2026-03-19T09:00:00Z",
  },
];

const vehicleModelHistory: AuditTrailEntry[] = [
  {
    id: "at-vm-001",
    entity_type: "vehicle_model",
    entity_id: "1",
    action: "UPDATE",
    changes: [
      { field: "vehicle_model_name", old_value: "Colt Diesel", new_value: "Colt Diesel FE 74" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T10:00:00Z",
  },
  {
    id: "at-vm-002",
    entity_type: "vehicle_model",
    entity_id: "1",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-20T08:00:00Z",
  },
  {
    id: "at-vm-003",
    entity_type: "vehicle_model",
    entity_id: "2",
    action: "STATUS_CHANGE",
    changes: [
      { field: "status", old_value: "active", new_value: "inactive" },
    ],
    changed_by_name: "Yuda",
    timestamp: "2026-03-24T15:00:00Z",
  },
  {
    id: "at-vm-004",
    entity_type: "vehicle_model",
    entity_id: "2",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-18T09:00:00Z",
  },
];

const vehicleAuxiliaryHistory: AuditTrailEntry[] = [
  {
    id: "at-va-001",
    entity_type: "vehicle_auxiliary",
    entity_id: "1",
    action: "UPDATE",
    changes: [
      { field: "auxiliary_name", old_value: "GPS Tracker v1", new_value: "GPS Tracker v2" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T11:30:00Z",
  },
  {
    id: "at-va-002",
    entity_type: "vehicle_auxiliary",
    entity_id: "1",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-19T08:00:00Z",
  },
  {
    id: "at-va-003",
    entity_type: "vehicle_auxiliary",
    entity_id: "2",
    action: "STATUS_CHANGE",
    changes: [
      { field: "status", old_value: "active", new_value: "inactive" },
    ],
    changed_by_name: "Yuda",
    timestamp: "2026-03-24T09:00:00Z",
  },
  {
    id: "at-va-004",
    entity_type: "vehicle_auxiliary",
    entity_id: "2",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-17T10:00:00Z",
  },
];

const freezerModelHistory: AuditTrailEntry[] = [
  {
    id: "at-fm-001",
    entity_type: "freezer_model",
    entity_id: "1",
    action: "UPDATE",
    changes: [
      { field: "freezer_model_name", old_value: "T-600R", new_value: "T-680R" },
      { field: "fuel_efficiency", old_value: "3.5", new_value: "4.2" },
    ],
    changed_by_name: "Admin",
    timestamp: "2026-03-25T14:00:00Z",
  },
  {
    id: "at-fm-002",
    entity_type: "freezer_model",
    entity_id: "1",
    action: "CREATE",
    changes: [],
    changed_by_name: "Admin",
    timestamp: "2026-03-21T08:00:00Z",
  },
  {
    id: "at-fm-003",
    entity_type: "freezer_model",
    entity_id: "2",
    action: "STATUS_CHANGE",
    changes: [
      { field: "status", old_value: "inactive", new_value: "active" },
    ],
    changed_by_name: "Yuda",
    timestamp: "2026-03-24T12:00:00Z",
  },
  {
    id: "at-fm-004",
    entity_type: "freezer_model",
    entity_id: "2",
    action: "CREATE",
    changes: [],
    changed_by_name: "Yuda",
    timestamp: "2026-03-18T11:00:00Z",
  },
];

const historyMap: Record<string, AuditTrailEntry[]> = {
  vehicle_type: vehicleTypeHistory,
  vehicle_model: vehicleModelHistory,
  vehicle_auxiliary: vehicleAuxiliaryHistory,
  freezer_model: freezerModelHistory,
};

export const generateMockAuditTrail = (
  entityType: string,
  entityId: string | number,
): AuditTrailResponse => {
  const allEntries = historyMap[entityType] ?? [];
  const entityEntries = allEntries.filter(
    (e) => e.entity_id === String(entityId),
  );

  const sorted = [...entityEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const createEntry = sorted.find((e) => e.action === "CREATE");
  const latestEntry = sorted[0];

  return {
    data: sorted,
    meta: {
      created_by_name: createEntry?.changed_by_name ?? "—",
      created_at: createEntry?.timestamp ?? "—",
      last_updated_by_name: latestEntry?.changed_by_name ?? "—",
      last_updated_at: latestEntry?.timestamp ?? "—",
      total: sorted.length,
      page: 1,
      limit: 10,
    },
  };
};
