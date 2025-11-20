import { taskPhases } from "@/lib/data";
import { TaskPhase } from "./TaskPhase";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";

type TaskDtlsProps = {
  employeeId: string;
};

export function TaskDtls({ employeeId }: TaskDtlsProps) {
  return taskPhases.map((phase) => (
    <div key={phase.id}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={phase.name} className="">
          <AccordionTrigger className="border-2 mx-2 px-3">
            {phase.name}
          </AccordionTrigger>
          <TaskPhase
            phaseId={phase.id}
            phaseName={phase.name}
            phaseColor={phase.color}
            employeeId={employeeId}
          />
        </AccordionItem>
      </Accordion>
    </div>
  ));
}
