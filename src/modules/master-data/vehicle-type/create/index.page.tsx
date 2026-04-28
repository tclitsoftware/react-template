import { useNavigate } from "react-router-dom";
import Button from "components/button";
import Icon from "components/icon";
import Typography from "components/typography";
import { useVehicleTypeCreate } from "./useVehicleTypeCreate";
import VehicleTypeFormCard from "./VehicleTypeFormCard";

export const vehicleTypeCreatePageRouteName = "/master-data/vehicle-type/create";

const VehicleTypeCreatePage = () => {
  const navigate = useNavigate();
  const { form, fields, append, remove, onSave, isSaving } = useVehicleTypeCreate();

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Page Header Section */}
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group flex w-fit items-center gap-2 text-primary-600 transition-all hover:text-primary-700"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100">
                <Icon name="arrow-left" size={12} />
              </div>
              <Typography variant="bodySmall" className="font-bold uppercase tracking-widest">
                Back to List
              </Typography>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon name="add-square" size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <Typography variant="heading3" className="leading-none">
                  Add more data
                </Typography>
                <Typography variant="bodySmall" tone="muted">
                  Configure multiple vehicle types and save them all at once.
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pb-1">
            <Button
              variant="outline"
              color="tertiary"
              onClick={() => navigate(-1)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="fill"
              color="primary"
              onClick={onSave}
              disabled={isSaving}
              iconLeft={
                isSaving ? (
                  <Icon name="loader" size={18} className="animate-spin" />
                ) : (
                  <Icon name="save-2" size={18} />
                )
              }
            >
              Save All ({fields.length})
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Form Content Section */}
      <section className="rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {fields.map((field, index) => (
            <VehicleTypeFormCard
              key={field.id}
              index={index}
              form={form}
              onRemove={() => remove(index)}
              showRemove={fields.length > 1}
            />
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                vehicle_type: "",
                category_id: "",
                is_chassis: false,
                is_container: false,
                temp_type_id: "",
                is_active: false,
              })
            }
            className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-greyScale-200 bg-greyScale-50/30 transition-all hover:border-primary-400 hover:bg-primary-50 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-greyScale-100 text-greyScale-400 transition-colors group-hover:bg-primary-100 group-hover:text-primary-600">
              <Icon name="plus" size={32} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <Typography
                variant="body"
                className="font-bold text-greyScale-500 group-hover:text-primary-600"
              >
                Add Another
              </Typography>
              <Typography variant="body" tone="secondary">
                Click to add a new vehicle type entry
              </Typography>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default VehicleTypeCreatePage;
