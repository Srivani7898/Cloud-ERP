"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScmTable } from "@/components/scm/ScmTable";
import { useScmStore } from "@/store/scm-store";

export default function WarehousesPage() {
  const warehouses = useScmStore(
    (state) => state.warehouses
  );

  const warehouseMetrics =
    warehouses.map((warehouse) => {
      const occupied = Math.round(
        (warehouse.capacity *
          warehouse.utilization) /
          100
      );

      const available =
        warehouse.capacity - occupied;

      const status =
        warehouse.utilization >= 90
          ? "Critical"
          : warehouse.utilization >= 75
          ? "High"
          : warehouse.utilization >= 50
          ? "Normal"
          : "Low";

      return {
        ...warehouse,
        occupied,
        available,
        status,
      };
    });

  const totalCapacity =
    warehouseMetrics.reduce(
      (sum, warehouse) =>
        sum + warehouse.capacity,
      0
    );

  const totalOccupied =
    warehouseMetrics.reduce(
      (sum, warehouse) =>
        sum + warehouse.occupied,
      0
    );

  const totalAvailable =
    warehouseMetrics.reduce(
      (sum, warehouse) =>
        sum + warehouse.available,
      0
    );

  const averageUtilization =
    warehouseMetrics.length > 0
      ? Math.round(
          warehouseMetrics.reduce(
            (sum, warehouse) =>
              sum +
              warehouse.utilization,
            0
          ) /
            warehouseMetrics.length
        )
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Warehouse Management
        </h2>

        <p className="text-sm text-slate-500">
          Capacity, utilization,
          storage efficiency and
          regional warehouse visibility.
        </p>
      </div>

      {/* KPI Cards */}

      <section className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle>
              Warehouses
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                warehouseMetrics.length
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Capacity
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {totalCapacity}
            </p>

            <p className="text-xs text-slate-500">
              Total Units
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Occupied
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {totalOccupied}
            </p>

            <p className="text-xs text-slate-500">
              Units Used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Available
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {totalAvailable}
            </p>

            <p className="text-xs text-slate-500">
              Units Free
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Avg Utilization
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {
                averageUtilization
              }
              %
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Warehouse Cards */}

      <section className="grid gap-4 md:grid-cols-3">
        {warehouseMetrics.map(
          (warehouse) => (
            <Card
              key={warehouse.id}
              className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]"
            >
              <CardHeader>
                <CardTitle>
                  {warehouse.name}
                </CardTitle>

                <CardDescription>
                  {warehouse.region}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>
                      Capacity
                    </span>

                    <span>
                      {
                        warehouse.capacity
                      }{" "}
                      Units
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>
                      Occupied
                    </span>

                    <span>
                      {
                        warehouse.occupied
                      }{" "}
                      Units
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>
                      Available
                    </span>

                    <span>
                      {
                        warehouse.available
                      }{" "}
                      Units
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>
                      Utilization
                    </span>

                    <span>
                      {
                        warehouse.utilization
                      }
                      %
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-500"
                      style={{
                        width: `${warehouse.utilization}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span>
                      Status
                    </span>

                    <span>
                      {
                        warehouse.status
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </section>

      {/* Detailed Table */}

      <ScmTable
        title="Warehouse Overview"
        description="Warehouse capacity, occupancy and utilization metrics."
        headers={[
          "Warehouse",
          "Region",
          "Capacity",
          "Occupied",
          "Available",
          "Utilization",
          "Status",
        ]}
        rows={warehouseMetrics.map(
          (warehouse) => [
            warehouse.name,
            warehouse.region,
            warehouse.capacity,
            warehouse.occupied,
            warehouse.available,
            `${warehouse.utilization}%`,
            warehouse.status,
          ]
        )}
      />
    </div>
  );
}