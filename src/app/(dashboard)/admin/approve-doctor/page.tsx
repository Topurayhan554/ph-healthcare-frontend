import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";

export default function DoctorApprovalPage() {
  return (
    <div className="space-y-6">
      <div className="pt-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Doctor Approval
        </h1>
        <p className="text-sm text-muted-foreground">
          Please review and make sure the given data is real.
        </p>
      </div>
      <DoctorApprovalTabs />
    </div>
  );
}
