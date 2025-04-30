
export interface Fault {
  id: number;
  issue: string;
  tenant: string;
  address: string;
  workOrder: number;
  type: string;
  status: string;
  communicationStatus: string;
  createdAt: string;
  unitId?: string; // Added optional unitId property
}

export interface FaultDetailsProps {
  fault: Fault | null;
}
