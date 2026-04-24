import React, { useEffect, useRef } from "react";
import Button from "components/button";
import Typography from "components/typography";

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  testId?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  confirmLabel = "Save",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  open,
  testId,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl border border-border bg-white p-6 shadow-lg backdrop:bg-black/50 max-w-md w-full"
      onClick={handleBackdropClick}
      onClose={onCancel}
      data-testid={testId}
    >
      <div className="flex flex-col gap-4">
        <Typography variant="heading4" as="h2">
          {title}
        </Typography>
        <Typography variant="bodySmall" tone="muted">
          {message}
        </Typography>
        <div className="flex justify-end gap-3 mt-2">
          <Button
            type="button"
            variant="outline"
            color="tertiary"
            size="medium"
            onClick={onCancel}
            data-testid={testId ? `${testId}-cancel` : undefined}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="fill"
            color="primary"
            size="medium"
            onClick={onConfirm}
            data-testid={testId ? `${testId}-confirm` : undefined}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
