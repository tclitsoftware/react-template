export interface AuditTrailChange {
  field: string;
  old_value: string;
  new_value: string;
}

export interface AuditTrailEntry {
  id: string;
  entity_type: string;
  entity_id: string;
  action: "CREATE" | "UPDATE" | "STATUS_CHANGE";
  changes: AuditTrailChange[];
  changed_by_name: string;
  timestamp: string;
}

export interface AuditTrailMeta {
  created_by_name: string;
  created_at: string;
  last_updated_by_name: string;
  last_updated_at: string;
  total: number;
  page: number;
  limit: number;
}

export interface AuditTrailResponse {
  data: AuditTrailEntry[];
  meta: AuditTrailMeta;
}
